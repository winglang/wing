import { mkdirSync, writeFileSync } from "fs";
import { join, relative } from "path";
import { Construct } from "constructs";
import { SimResourceSchema } from "./schema-resources";
import { simulatorAttrToken, simulatorHandleToken } from "./tokens";
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
  LogLevel,
} from "../std";

/**
 * Contract that a resource backend must implement.
 * @inflight
 */
export interface IResource {
  /**
   * Runs when the resource is stopped.
   */
  onStop(): Promise<void>;
}

// TODO: make statedir a property once Wing supports properties on interfaces

/**
 * Context for implementing a simulator resource.
 * @inflight
 */
export interface IResourceContext {
  /**
   * The directory for the resource's state.
   */
  statedir(): Promise<string>;

  /**
   * Resolves a token value. All tokens must be resolved during the
   * constructor of the resource.
   *
   * @param name The name of the token.
   * @param value The value of the token.
   * @inflight
   */
  resolveToken(name: string, value: string): Promise<void>;

  /**
   * Log a message at the current point in time. Defaults to `info` level.
   *
   * @param message The message to log.
   * @param level The severity of the message.
   * @inflight
   */
  log(message: string, level: LogLevel | undefined): Promise<void>;
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

    Node.of(this).title = "Resource";
    Node.of(this).description = "A simulated resource";
    Node.of(this).color = "emerald";

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

  /**
   * Obtain a token that can be used to reference an attribute of this
   * resource that is only resolved once the resource is started in the simulator.
   *
   * If the token is used in inflight code or in the configuration of a simulated
   * resource (e.g. as an environment variable), the relevant resource will
   * automatically take a dependency on the resource the token belongs to.
   *
   * @param name The name of the token.
   * @returns A string token.
   */
  public createToken(name: string): string {
    return simulatorAttrToken(this, name);
  }

  /** @internal */
  public _preSynthesize(): void {
    super._preSynthesize();
    const onStopMethod = "onStop";
    const inflightClient = this.factory._toInflight();
    const code = `\
        "use strict";
        let $klass;
        exports.start = async function(statedir) {
          if ($klass) {
            throw Error('resource already started');
          }
          const attrs = {};
          const ctx = {};
          ctx.statedir = async () => statedir;
          ctx.resolveToken = async (name, value) => attrs[name] = value;
          ctx.log = async (message, level) => {
            if (!level) level = 'info';
            console.log(level + ':' + message);
          };
          const client = ${inflightClient};
          const noop = { ${onStopMethod}: () => {} };
          const klass = (await client.handle(ctx)) ?? noop;
          ctx.resolveToken = () => {
            throw Error('cannot resolve attributes outside of onStop method');
          };
          $klass = klass;
          return attrs;
        };

        exports.call = async function(propName, ...args) {
          if (!$klass) {
            throw Error('Resource is not running (it may have crashed or stopped)');
          }
          if (propName === '${onStopMethod}') {
            throw Error('Cannot call "${onStopMethod}"');
          }
          const prop = $klass[propName];
          if (!prop) {
            throw Error('Method or property "' + propName + '" not found');
          }
          if (typeof prop !== 'function') {
            if (args.length > 0) {
              throw Error('Property "' + propName + '" is not a function');
            }
            return prop;
          }
          return await prop.call($klass, ...args);
        };

        exports.stop = async function() {
          if (!$klass) {
            throw Error('Resource is not running (it may have crashed or stopped)');
          }
          await $klass.${onStopMethod}();
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
   * @inflight
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
   * Function that will be called to initialize the simulator resource.
   *
   * To implement a shutdown sequence, return an object that implements the `IResource` inflight interface with an `onStop()` method.
   *
   * @inflight
   */
  handle(context: IResourceContext): Promise<IResource | undefined>;
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
