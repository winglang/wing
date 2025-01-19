import { TerraformOutput } from "cdktf";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import { Endpoint as AwsEndpoint } from "../shared-aws/endpoint";
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

    new TerraformOutput(this, "Url", {
      value: this.url,
    });
  }
}
