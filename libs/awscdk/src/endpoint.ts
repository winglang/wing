import { CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import { cloud, std } from "@winglang/sdk";
import { InflightClient } from "@winglang/sdk/lib/core";

/**
 * AWS implementation of `cloud.Endpoint`.
 */
export class Endpoint extends cloud.Endpoint {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(
      __filename.replace("endpoint", "endpoint.inflight"),
      "EndpointClient"
    );
  }

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

  /** @internal */
  public onLift(host: std.IInflightHost, ops: string[]): void {
    host.addEnvironment(this.urlEnvName(), this.url);
    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return {
      $url: `process.env["${this.urlEnvName()}"]`,
    };
  }

  private urlEnvName(): string {
    return `ENDPOINT_NAME_${this.node.addr.slice(-8)}`;
  }
}
