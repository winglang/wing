import { Construct } from "constructs";
import { FunctionProps, IFunctionHandler } from "./function";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Resource } from "../std";

/**
 * Global identifier for `OnDeploy`.
 */
export const ON_DEPLOY_FQN = fqnForType("cloud.OnDeploy");

/**
 * Options for `OnDeploy`.
 */
export interface OnDeployProps extends FunctionProps {}

/**
 * A cloud object store.
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
    handler: IFunctionHandler,
    props: OnDeployProps = {}
  ): OnDeploy {
    return App.of(scope).newAbstract(ON_DEPLOY_FQN, scope, id, handler, props);
  }

  constructor(scope: Construct, id: string, props: OnDeployProps = {}) {
    super(scope, id);

    this.display.title = "OnDeploy";
    this.display.description = "Run code during the app's deployment.";

    props;
  }
}

/**
 * Inflight interface for `OnDeploy`.
 */
export interface IOnDeployClient {}
