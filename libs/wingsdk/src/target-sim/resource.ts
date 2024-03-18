import { mkdirSync, writeFileSync } from "fs";
import { join, relative } from "path";
import { ResourceSchema } from "./schema-resources";
import { simulatorAttrToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import { fqnForType } from "../constants";
import { App, LiftDepsMatrixRaw, Lifting } from "../core";
import { Construct, INFLIGHT_SYMBOL } from "../core/types";
import { CaseConventions, ResourceNames } from "../shared/resource-names";
import { BaseResourceSchema } from "../simulator/simulator";
import * as std from "../std";

/**
 * Global identifier for `sim.Resource`.
 */
export const SIM_RESOURCE_FQN = fqnForType("sim.Resource");

/**
 * Interfaces shared by all polycon implementations (preflight classes)
 * targeting the simulator.
 */
export interface ISimulatorResource extends std.IResource {
  /**
   * Convert this resource to a resource schema for the simulator.
   */
  toSimulator(): BaseResourceSchema;
}

export function isSimulatorResource(obj: any): obj is ISimulatorResource {
  return (
    typeof obj == "object" &&
    typeof (obj as ISimulatorResource).toSimulator === "function"
  );
}

/**
 * Represents a resource in the simulator.
 *
 * @inflight `@winglang/sdk.sim.IResourceClient`
 */
export class Resource
  extends std.Resource
  implements ISimulatorResource, std.IInflightHost
{
  /**
   * @internal
   */
  public static _toInflightType(): string {
    throw new Error("Not implemented");
  }

  /** @internal */
  public readonly _isSimResource = true;

  /** @internal */
  public [INFLIGHT_SYMBOL]?: IResourceClient;

  /**
   * The path where the entrypoint of the service source code will be eventually written to.
   */
  protected readonly entrypoint!: string;

  private readonly environmentVariables: Record<string, string> = {};

  constructor(scope: Construct, id: string) {
    super(scope, id);

    if (App.of(this)._target !== "sim") {
      throw new Error(
        'Class "sim.Resource" can only be used on the simulator ("sim") target.'
      );
    }

    const assetName = ResourceNames.generateName(this, {
      disallowedRegex: /[><:"/\\|?*\s]/g, // avoid characters that may cause path issues
      case: CaseConventions.LOWERCASE,
      sep: "_",
    });

    const workdir = App.of(this).workdir;
    mkdirSync(workdir, { recursive: true });
    const entrypoint = join(workdir, `${assetName}.js`);
    this.entrypoint = entrypoint;
  }

  /**
   * Returns a token that can be used to reference an attribute of this resource.
   *
   * All attributes must be resolved via a call to `attributeResolve(key)` during `inflight start()`.
   *
   * @param key A key to identify this attribute.
   */
  protected attributeToken(key: string): string {
    return simulatorAttrToken(this, key);
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [ResourceInflightMethods.START, ResourceInflightMethods.STOP];
  }

  /**
   * Adds an environment variable to the host.
   */
  public addEnvironment(name: string, value: string): void {
    this.environmentVariables[name] = value;
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }

  /** @internal */
  public get _liftMap(): LiftDepsMatrixRaw {
    return {
      [ResourceInflightMethods.START]: [],
      [ResourceInflightMethods.STOP]: [],
    };
  }

  /** @internal */
  public _simulatorClient(): string {
    throw new Error("Expected _simulatorClient to be implemented by subclass.");
  }

  /** @internal */
  public _simulatorLiftMap(): LiftDepsMatrixRaw {
    throw new Error(
      "Expected _simulatorLiftMap to be implemented by subclass."
    );
  }

  public onLift(host: std.IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.onLift(host, ops);
  }

  public toSimulator(): BaseResourceSchema {
    return {
      type: SIM_RESOURCE_FQN,
      path: this.node.path,
      addr: this.node.addr,
      props: {
        sourceCodeFile: relative(App.of(this).outdir, this.entrypoint),
        environmentVariables: this.environmentVariables,
      },
      attrs: {},
    } as ResourceSchema;
  }

  /** @internal */
  public _preSynthesize(): void {
    super._preSynthesize();

    const inflightClient = this._simulatorClient();
    const lines = new Array<string>();

    lines.push('"use strict";');
    lines.push("let $obj;");

    lines.push("async function $initOnce() {");
    lines.push(`  $obj = $obj || (await (${inflightClient}));`);
    lines.push("  return $obj;");
    lines.push("};");

    const methods = Object.keys(this._liftMap ?? {});

    for (const method of methods) {
      lines.push(`exports.${method} = async function(...args) {`);
      lines.push(`  return (await $initOnce()).${method}(...args);`);
      lines.push("};");
    }

    writeFileSync(this.entrypoint, lines.join("\n"));

    // lift the resource onto itself
    Lifting.lift(this, this, [
      ResourceInflightMethods.START,
      ResourceInflightMethods.STOP,
    ]);
  }
}

export interface IResourceContext {
  /**
   * The directory for the resource's state.
   */
  readonly statedir: string;

  /**
   * Resolves a tokenized attribute value.
   * @param name The name of the attribute.
   * @param value The value of the attribute.
   * @inflight
   */
  resolveAttribute(name: string, value: string): void;
}

/**
 * Inflight interface for `sim.Resource`.
 */
export interface IResourceClient {
  /**
   * Starts the resource.
   * @param context Simulator context.
   */
  start(context: IResourceContext): Promise<void>;

  /**
   * Stops the resource.
   */
  stop(): Promise<void>;
}

/**
 * List of inflight operations available for `sim.Resource`.
 * @internal
 */
export enum ResourceInflightMethods {
  /** `State.start` */
  START = "start",
  /** `State.stop` */
  STOP = "stop",
}
