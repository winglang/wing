import { Construct } from "constructs";
import { FunctionProps } from "./function";
import { fqnForType } from "../constants";
import { INFLIGHT_SYMBOL } from "../core/types";
import { IInflight, Node, Resource } from "../std";

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
 * @abstract
 */
export class OnDeploy extends Resource {
  /** @internal */
  public [INFLIGHT_SYMBOL]?: IOnDeployClient;

  constructor(
    scope: Construct,
    id: string,
    handler: IOnDeployHandler,
    props: OnDeployProps = {}
  ) {
    if (new.target === OnDeploy) {
      return Node.of(scope).app.platform.newAbstract(
        ON_DEPLOY_FQN,
        scope,
        id,
        handler,
        props
      );
    }

    super(scope, id);

    Node.of(this).title = "OnDeploy";
    Node.of(this).description = "Run code during the app's deployment.";

    handler;
    props;
  }
}

/**
 * A resource with an inflight "handle" method that can be used by `cloud.OnDeploy`.
 *
 * @inflight `@winglang/sdk.cloud.IOnDeployHandlerClient`
 */
export interface IOnDeployHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: IOnDeployHandlerClient["handle"];
}

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
