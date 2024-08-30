import { ITerraformDependable, ITerraformResource } from "cdktf";
import { Construct, IConstruct } from "constructs";
import { Function as AwsFunction } from "./function";
import { DataAwsLambdaInvocation } from "../.gen/providers/aws/data-aws-lambda-invocation";
import * as cloud from "../cloud";
import { IInflight } from "../std";

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

    let fn = new cloud.Function(this, "Function", handler as IInflight, props);
    const awsFn = fn as AwsFunction;

    // add all of the children of the construct to the dependencies
    const dependsOn: Array<ITerraformDependable> = [];
    for (const c of props.executeAfter ?? []) {
      for (const child of c.node.findAll()) {
        if (isTerraformDependable(child)) {
          dependsOn.push(child);
        }
      }
      this.node.addDependency(c);
    }

    // currently using the aws_lambda_invocation *data source* since it runs on every terraform apply.
    // if we want OnDeploy to only run code conditionally,
    // we can use the aws_lambda_invocation *resource* instead.
    const lambdaInvocation = new DataAwsLambdaInvocation(this, "Invocation", {
      functionName: awsFn.functionName,
      input: JSON.stringify({}), // call the function with an empty object
      dependsOn,
    });

    for (const c of props.executeBefore ?? []) {
      // add the invocation as a dependency on all of the children of the construct
      for (const child of c.node.findAll()) {
        if (isTerraformResource(child)) {
          if (child.dependsOn === undefined) {
            child.dependsOn = [];
          }
          child.dependsOn.push(lambdaInvocation.fqn);
        }
      }
      c.node.addDependency(this);
    }
  }
}

function isTerraformDependable(
  x: IConstruct
): x is ITerraformDependable & IConstruct {
  return "fqn" in x;
}

function isTerraformResource(
  x: IConstruct
): x is ITerraformResource & IConstruct {
  return "terraformResourceType" in x;
}
