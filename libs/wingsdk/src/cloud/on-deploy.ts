import { Construct } from "constructs";
import { FunctionProps } from "./function";
import { fqnForType } from "../constants";
import { App } from "../core";
import { IResource, Node, Resource } from "../std";

/**
 * Global identifier for `OnDeploy`.
 */
export const ON_DEPLOY_FQN = fqnForType("cloud.OnDeploy");

/**
 * Options for `OnDeploy`.
 */
export interface OnDeployProps extends FunctionProps {
  /**
   * Execute this trigger only after these resources have been provisioned.
   * @default - no additional dependencies
   */
  readonly executeAfter?: Construct[];

  /**
   * Adds this trigger as a dependency on other constructs.
   * @default - no additional dependencies
   */
  readonly executeBefore?: Construct[];
}

/**
 * Run code every time the app is deployed.
 *
 * @inflight `@winglang/sdk.cloud.IOnDeployClient`
 */
export abstract class OnDeploy extends Resource {
  /**
   * Create a new OnDeploy instance.
   * @internal
   */
  public static _newOnDeploy(
    scope: Construct,
    id: string,
    handler: IOnDeployHandler,
    props: OnDeployProps = {}
  ): OnDeploy {
    return App.of(scope).newAbstract(ON_DEPLOY_FQN, scope, id, handler, props);
  }

  constructor(
    scope: Construct,
    id: string,
    handler: IOnDeployHandler,
    props: OnDeployProps = {}
  ) {
    super(scope, id);

    Node.of(this).title = "OnDeploy";
    Node.of(this).description = "Run code during the app's deployment.";

    handler;
    props;
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [];
  }
}

/**
 * A resource with an inflight "handle" method that can be used by `cloud.OnDeploy`.
 *
 * @inflight `@winglang/sdk.cloud.IOnDeployHandlerClient`
 */
export interface IOnDeployHandler extends IResource {}

/**
 * Inflight client for `IOnDeployHandler`.
 */
export interface IOnDeployHandlerClient {
  /**
   * Entrypoint function that will be called when the app is deployed.
   * @inflight
   */
  handle(): Promise<void>;
}

/**
 * Inflight interface for `OnDeploy`.
 */
export interface IOnDeployClient {}
