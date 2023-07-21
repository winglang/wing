import { ITerraformDependable } from "cdktf";
import { Construct, IConstruct } from "constructs";
import { Function as AwsFunction } from "./function";
import { DataAwsLambdaInvocation } from "../.gen/providers/aws/data-aws-lambda-invocation";
import * as cloud from "../cloud";
import * as core from "../core";

function isTerraformDependable(
  x: IConstruct
): x is ITerraformDependable & IConstruct {
  return "fqn" in x;
}

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

    let fn = cloud.Function._newFunction(this, "Function", handler, props);
    const awsFn = fn as AwsFunction;

    const dependencies: Array<ITerraformDependable> = [];
    for (const c of props.executeAfter ?? []) {
      // add all of the children of the construct to the dependencies
      for (const child of c.node.findAll()) {
        if (isTerraformDependable(child)) {
          dependencies.push(child);
        }
      }
    }

    new DataAwsLambdaInvocation(this, "Invocation", {
      functionName: awsFn.functionName,
      input: JSON.stringify({}), // call the function with an empty object
      dependsOn: dependencies,
    });
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "OnDeployClient",
      []
    );
  }
}
