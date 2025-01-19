import { cloud } from "..";
import { InflightClient } from "../core";

/**
 * Preflight interface for `OnDeploy`.
 */
export interface IAwsOnDeploy {

}

/**
 * AWS implementation of `cloud.OnDeploy`.
 */
export abstract class OnDeploy extends cloud.OnDeploy implements IAwsOnDeploy {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(
      __filename.replace("on-deploy", "on-deploy.inflight"),
      "OnDeployClient"
    );
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return {
      $constructPath: `"${this.node.path}"`,
    };
  }
}
