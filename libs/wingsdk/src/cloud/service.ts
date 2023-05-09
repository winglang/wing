import { Construct } from "constructs";
import { FunctionProps } from "./function";
import { fqnForType } from "../constants";
import { App } from "../core";
import { IResource, Resource } from "../std";

/**
 * Global identifier for `Service`.
 */
export const SERVICE_FQN = fqnForType("cloud.Service");

/**
 * Properties for `Service`.
 */
export interface ServiceProps {
  /**
   * Handler to run with the service starts.
   */
  readonly onStart: IServiceOnEventHandler;
  /**
   * Handler to run with the service stops.
   * @default undefined
   */
  readonly onStop?: IServiceOnEventHandler;
  /**
   * Whether the service should start automatically.
   * @default true
   */
  readonly autoStart?: boolean;
}

/**
 * Represents a service.
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

    this.display.title = "Service";
    this.display.description = "A cloud service";

    this._addInflightOps(
      ServiceInflightMethods.START,
      ServiceInflightMethods.STOP
    );

    props;
  }
}

/**
 * Options for Service.onStart.
 */
export interface ServiceOnStartProps extends FunctionProps {
}

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
 * Represents a resource with an inflight "handle" method that can be passed to
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
