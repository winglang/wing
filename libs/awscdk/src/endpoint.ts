import { CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import { core, cloud, std } from "@winglang/sdk";

/**
 * AWS implementation of `cloud.Endpoint`.
 */
export class Endpoint extends cloud.Endpoint {
  constructor(scope: Construct, id: string, url: string, props: cloud.EndpointProps = {}) {
    super(scope, id, url, props);

    new CfnOutput(this, "Url", {
      value: this.url,
    });
  }

  /** @internal */
  public onLift(host: std.IInflightHost, ops: string[]): void {
    host.addEnvironment(this.urlEnvName(), this.url);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname,
      __filename,
      "EndpointClient",
      [`process.env["${this.urlEnvName()}"]`]
    );
  }

  private urlEnvName(): string {
    return `ENDPOINT_NAME_${this.node.addr.slice(-8)}`;
  }
}
