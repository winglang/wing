import { Construct } from "constructs";
import { FunctionProps } from "./function";
import { fqnForType } from "../constants";
import { App } from "../core";
import { IResource, Node, Resource } from "../std";

/**
 * Global identifier for `Service`.
 */
export const SERVICE_FQN = fqnForType("cloud.Service");

/**
 * Options for `Service`.
 */
export interface ServiceProps {
  /**
   * Handler to run when the service starts. This is where you implement the initialization logic of
   * the service, start any activities asychronously.
   *
   * DO NOT BLOCK! This handler should return as quickly as possible. If you need to run a long
   * running process, start it asynchronously.
   */
  readonly onStart: IServiceOnEventHandler;

  /**
   * Handler to run in order to stop the service. This is where you implement the shutdown logic of
   * the service, stop any activities, and clean up any resources.
   *
   * @default - no special activity at shutdown
   */
  readonly onStop?: IServiceOnEventHandler;

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
export abstract class Service extends Resource {
  /**
   * Create a new `Service` instance.
   * @internal
   */
  public static _newService(
    scope: Construct,
    id: string,
    props: ServiceProps
  ): Service {
    return App.of(scope).newAbstract(SERVICE_FQN, scope, id, props);
  }

  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id);

    Node.of(this).title = "Service";
    Node.of(this).description = "A cloud service";

    props;
  }

  /** @internal */
  public _getInflightOps(): string[] {
    return [ServiceInflightMethods.START, ServiceInflightMethods.STOP];
  }
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
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `ServiceProps.on_start` || `ServiceProps.on_stop`.
 *
 * @inflight `@winglang/sdk.cloud.IServiceOnEventClient`
 */
export interface IServiceOnEventHandler extends IResource {}

/**
 * Inflight client for `IServiceOnEventHandler`.
 */
export interface IServiceOnEventClient {
  /**
   * Function that will be called for service events.
   * @returns a context object that will be passed into the `onStop(context)` handler.
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
}
