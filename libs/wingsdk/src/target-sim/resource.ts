import { mkdirSync, writeFileSync } from "fs";
import { join, relative } from "path";
import { Construct } from "constructs";
import { SimResourceSchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import { App, LiftMap, Lifting } from "../core";
import { CaseConventions, ResourceNames } from "../shared/resource-names";
import { PolicyStatement, ToSimulatorOutput } from "../simulator";
import {
  IInflight,
  IInflightHost,
  IResource as IStdResource,
  Resource as StdResource,
  Node,
  Json,
} from "../std";

/**
 * Contract that a resource backend must implement.
 * @inflightinterface
 */
export interface IResource {
  /**
   * Runs when the resource is started.
   * @param context Simulator context.
   */
  onStart(context: IResourceContext): Promise<void>;

  /**
   * Runs when the resource is stopped.
   */
  onStop(): Promise<void>;
}

// TODO: fill out IResourceContext

/**
 * Context for implementing a simulator resource.
 */
export interface IResourceContext {
  /**
   * The directory for the resource's state.
   */
  readonly statedir: string;
  // /**
  //  * Resolves a tokenized attribute value.
  //  * @param name The name of the attribute.
  //  * @param value The value of the attribute.
  //  * @inflight
  //  */
  // resolveAttribute(name: string, value: string): void;
}

/**
 * Global identifier for `sim.Resource`.
 */
export const SIM_RESOURCE_FQN = "@winglang/sdk.sim.Resource";

/**
 * A backend for a simulated resource.
 * @inflight `@winglang/sdk.sim.IResourceClient`
 */
export class Resource
  extends StdResource
  implements
    IStdResource,
    ISimulatorResource,
    IInflightHost,
    ISimulatorInflightHost
{
  private readonly permissions: Array<[IStdResource, string]> = [];
  private readonly _env: Record<string, string> = {};
  private readonly factory: IResourceFactory;
  private readonly entrypoint: string;

  constructor(scope: Construct, id: string, factory: IResourceFactory) {
    super(scope, id);

    Node.of(this).title = "Service";
    Node.of(this).description = "A cloud service";

    const assetName = ResourceNames.generateName(this, {
      disallowedRegex: /[><:"/\\|?*\s]/g, // avoid characters that may cause path issues
      case: CaseConventions.LOWERCASE,
      sep: "_",
    });

    const workdir = App.of(this).workdir;
    mkdirSync(workdir, { recursive: true });
    const entrypoint = join(workdir, `${assetName}.cjs`);
    this.entrypoint = entrypoint;

    if (process.env.WING_TARGET) {
      this.addEnvironment("WING_TARGET", process.env.WING_TARGET);
    }

    this.factory = factory;
  }

  public addPermission(resource: IStdResource, op: string): void {
    this.permissions.push([resource, op]);
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [ResourceInflightMethods.CALL]: [],
    };
  }

  /** @internal */
  public _preSynthesize(): void {
    super._preSynthesize();

    const inflightClient = this.factory._toInflight();
    const code = `\
        "use strict";
        let $klass;
        exports.start = async function(ctx) {
          if ($klass) {
            throw Error('resource already started');
          }
          const client = ${inflightClient};
          const noop = () => {};
          const klass = (await client.handle()) ?? noop;
          await klass.onStart(ctx);
          $klass = klass;
        };

        exports.call = async function(method, ...args) {
          if (!$klass) {
            throw Error('resource not started');
          }
          return await $klass[method](...args);
        };

        exports.stop = async function() {
          if (!$klass) {
            throw Error('resource not started');
          }
          await $klass.onStop();
          $klass = undefined;
        };
        `;

    writeFileSync(this.entrypoint, code);

    // indicates that we are calling the inflight constructor and the
    // inflight "handle" method on the handler resource.
    Lifting.lift(this.factory, this, ["handle"]);
  }

  /**
   * Add an environment variable to make available to the inflight code.
   */
  public addEnvironment(name: string, value: string) {
    if (this._env[name] !== undefined && this._env[name] !== value) {
      throw new Error(
        `Environment variable "${name}" already set with a different value.`
      );
    }
    this._env[name] = value;
  }

  public toSimulator(): ToSimulatorOutput {
    const policy: Array<PolicyStatement> = [];
    for (const [resource, operation] of this.permissions) {
      policy.push({
        operation,
        resourceHandle: simulatorHandleToken(resource),
      });
    }
    const props: SimResourceSchema = {
      environmentVariables: this._env,
      sourceCodeFile: relative(App.of(this).outdir, this.entrypoint),
      sourceCodeLanguage: "javascript",
    };
    return {
      type: SIM_RESOURCE_FQN,
      props,
      policy,
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}

/**
 * Inflight interface for `sim.Resource`.
 */
export interface IResourceClient {
  /**
   * Call a method on the resource.
   */
  call(method: string, args?: Array<Json>): Promise<Json>;
}

/**
 * List of inflight operations available for `Resource`.
 * @internal
 */
export enum ResourceInflightMethods {
  CALL = "call",
}

/**
 * A resource with an inflight "handle" method that can be passed to the
 * `sim.Resource` constructor.
 * @inflight `@winglang/sdk.sim.IResourceFactoryClient`
 */
export interface IResourceFactory extends IInflight {}

/**
 * A resource with an inflight "handle" method that can be passed to the
 * `sim.Resource` constructor.
 */
export interface IResourceFactoryClient {
  /**
   * Function that will be called to create the resource.
   * @inflight
   */
  handle(): Promise<IResource>;
}

/**
 * Interfaces shared by all preflight classes that host inflight code.
 */
export interface ISimulatorInflightHost extends IInflightHost {
  /**
   * Add a simulated permission to this inflight host.
   * @param resource The resource to add
   * @param op The action to add
   */
  addPermission(resource: IStdResource, op: string): void;
}

export function isSimulatorInflightHost(
  obj: any
): obj is ISimulatorInflightHost {
  return (
    typeof obj == "object" &&
    typeof (obj as ISimulatorInflightHost).addPermission === "function"
  );
}

/**
 * Interfaces shared by all preflight classes targeting the simulator.
 */
export interface ISimulatorResource extends IStdResource {
  /**
   * Convert this resource to a resource schema for the simulator.
   */
  toSimulator(): ToSimulatorOutput;
}

export function isSimulatorResource(obj: any): obj is ISimulatorResource {
  return (
    typeof obj == "object" &&
    typeof (obj as ISimulatorResource).toSimulator === "function"
  );
}
