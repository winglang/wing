import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import { FunctionProps } from "./function";
import { fqnForType } from "../constants";
import { App } from "../core";
import { CaseConventions, ResourceNames } from "../shared/resource-names";
import { IInflightHost, IResource, Node, Resource } from "../std";

/**
 * Global identifier for `Service`.
 */
export const SERVICE_FQN = fqnForType("cloud.Service");

/**
 * Options for `Service`.
 */
export interface ServiceProps {
  /**
   * Environment variables to pass to the function.
   * @default - No environment variables.
   */
  readonly env?: { [key: string]: string };

  /**
   * Whether the service should start automatically. If `false`, the service will need to be started
   * manually by calling the inflight `start()` method.
   *
   * @default true
   */
  readonly autoStart?: boolean;
}

/**
 * A long-running service.
 *
 * @inflight `@winglang/sdk.cloud.IServiceClient`
 */
export abstract class Service extends Resource implements IInflightHost {
  /**
   * Create a new `Service` instance.
   * @internal
   */
  public static _newService(
    scope: Construct,
    id: string,
    handler: IServiceHandler,
    props: ServiceProps = {}
  ): Service {
    return App.of(scope).newAbstract(SERVICE_FQN, scope, id, handler, props);
  }

  /**
   * The entrypoint of the service.
   */
  protected readonly entrypoint: string;

  private readonly _env: Record<string, string> = {};

  constructor(
    scope: Construct,
    id: string,
    handler: IServiceHandler,
    props: ServiceProps = {}
  ) {
    super(scope, id);

    for (const [key, value] of Object.entries(props.env ?? {})) {
      this.addEnvironment(key, value);
    }

    Node.of(this).title = "Service";
    Node.of(this).description = "A cloud service";

    // indicates that we are calling the inflight constructor and the
    // inflight "handle" method on the handler resource.
    handler._registerOnLift(this, ["handle", "$inflight_init"]);

    const inflightClient = handler._toInflight();
    const lines = new Array<string>();

    lines.push('"use strict";');
    lines.push("let $obj;");

    lines.push("async function $initOnce() {");
    lines.push(`  $obj = $obj || (await (${inflightClient}));`);
    lines.push("  return $obj;");
    lines.push("};");

    lines.push("exports.handle = async function() {");
    lines.push("  return (await $initOnce()).handle();");
    lines.push("};");

    const assetName = ResourceNames.generateName(this, {
      disallowedRegex: /[><:"/\\|?*\s]/g, // avoid characters that may cause path issues
      case: CaseConventions.LOWERCASE,
      sep: "_",
    });

    const workdir = App.of(this).workdir;
    mkdirSync(workdir, { recursive: true });
    const entrypoint = join(workdir, `${assetName}.js`);
    writeFileSync(entrypoint, lines.join("\n"));
    this.entrypoint = entrypoint;

    if (process.env.WING_TARGET) {
      this.addEnvironment("WING_TARGET", process.env.WING_TARGET);
    }
  }

  /**
   * Add an environment variable to the function.
   */
  public addEnvironment(name: string, value: string) {
    if (this._env[name] !== undefined && this._env[name] !== value) {
      throw new Error(
        `Environment variable "${name}" already set with a different value.`
      );
    }
    this._env[name] = value;
  }

  /**
   * Returns the set of environment variables for this function.
   */
  public get env(): Record<string, string> {
    return { ...this._env };
  }

  /** @internal */
  public abstract _supportedOps(): string[];
}

/**
 * Options for Service.onStart.
 */
export interface ServiceOnStartProps extends FunctionProps {}

/**
 * Inflight interface for `Service`.
 */
export interface IServiceClient {
  /**
   * Start the service.
   * @inflight
   */
  start(): Promise<void>;

  /**
   * Stop the service
   * @inflight
   */
  stop(): Promise<void>;

  /**
   * Indicates whether the service is started.
   * @inflight
   */
  started(): Promise<boolean>;
}

/**
 * Executed when a `cloud.Service` is started.
 *
 * @inflight `@winglang/sdk.cloud.IServiceHandlerClient`
 */
export interface IServiceHandler extends IResource {}

/**
 * Inflight client for `IServiceHandler`.
 */
export interface IServiceHandlerClient {
  /**
   * Handler to run when the service starts. This is where you implement the initialization logic of
   * the service, start any activities asynchronously.
   *
   * DO NOT BLOCK! This handler should return as quickly as possible. If you need to run a long
   * running process, start it asynchronously.
   *
   *
   * @returns an optional function that can be used to cleanup any resources when the service is
   * stopped.
   *
   * @example
   *
   * bring cloud;
   *
   * new cloud.Service(inflight () => {
   *   log("starting service...");
   *   return () => {
   *     log("stoping service...");
   *   };
   * });
   *
   */
  handle(): Promise<IServiceStopHandler | undefined>;
}

/**
 * Executed when a `cloud.Service` is stopped.
 *
 * @inflight `@winglang/sdk.cloud.IServiceStopHandlerClient`
 */
export interface IServiceStopHandler extends IResource {}

/**
 * Inflight client for `IServiceStopHandler`.
 */
export interface IServiceStopHandlerClient {
  /**
   * Handler to run when the service stops. This is where you implement the cleanup logic of
   * the service, stop any activities asychronously.
   *
   * @inflight
   */
  handle(): Promise<void>;
}

/**
 * List of inflight operations for `Service`.
 * @internal
 */
export enum ServiceInflightMethods {
  START = "start",
  STOP = "stop",
  STARTED = "started",
}
