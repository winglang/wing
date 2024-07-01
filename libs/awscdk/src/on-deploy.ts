import { Trigger } from "aws-cdk-lib/triggers";
import { Construct } from "constructs";
import { cloud, core } from "@winglang/sdk";
import { isAwsCdkFunction } from "./function";

/**
 * AWS implementation of `cloud.OnDeploy`.
 *
 * @inflight `@winglang/sdk.cloud.IOnDeployClient`
 */
export class OnDeploy extends cloud.OnDeploy {
  constructor(
    scope: Construct,
    id: string,
    handler: cloud.IOnDeployHandler,
    props: cloud.OnDeployProps = {}
  ) {
    super(scope, id, handler, props);

    let fn = new cloud.Function(this, "Function", handler as cloud.IFunctionHandler, props);

    if (!isAwsCdkFunction(fn)) {  
      throw new Error("Expected function to implement 'IAwsCdkFunction' method");
    }

    let trigger = new Trigger(this, "Trigger", {
      handler: fn.awscdkFunction,
    });

    trigger.executeAfter(...(props.executeAfter ?? []));
    trigger.executeBefore(...(props.executeBefore ?? []));
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname,
      __filename,
      "OnDeployClient",
      []
    );
  }
}
