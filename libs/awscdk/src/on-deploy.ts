import { Trigger } from "aws-cdk-lib/triggers";
import { Construct } from "constructs";
import { Function as AwsFunction } from "./function";
import { cloud, core } from "@winglang/sdk";

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

    let fn = new cloud.Function(this, "Function", handler, props);
    const awsFn = fn as AwsFunction;

    let trigger = new Trigger(this, "Trigger", {
      handler: awsFn._function,
    });

    trigger.executeAfter(...(props.executeAfter ?? []));
    trigger.executeBefore(...(props.executeBefore ?? []));
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-awscdk", "shared-aws"),
      __filename,
      "OnDeployClient",
      []
    );
  }
}
