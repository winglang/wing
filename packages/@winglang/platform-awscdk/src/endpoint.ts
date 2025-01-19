import { Construct } from "constructs";
import { cloud } from "@winglang/sdk";
import { Endpoint as AwsEndpoint } from "@winglang/sdk/lib/shared-aws/endpoint";
import { CfnOutput } from "aws-cdk-lib";

/**
 * AWS implementation of `cloud.Endpoint`.
 */
export class Endpoint extends AwsEndpoint {
  constructor(
    scope: Construct,
    id: string,
    url: string,
    props: cloud.EndpointProps = {}
  ) {
    super(scope, id, url, props);

    new CfnOutput(this, "Url", {
      value: this.url,
    });
  }
}
