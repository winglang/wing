import { TerraformOutput } from "cdktf";
import { Construct } from "constructs";
import { Function } from "./function";
import { DataAwsSsmParameter } from "../.gen/providers/aws/data-aws-ssm-parameter";
import * as cloud from "../cloud";
import * as core from "../core";
import { calculateSecretPermissions } from "../shared-aws/permissions";
import { IInflightHost } from "../std";

/**
 * AWS implementation of `cloud.Secret`
 *
 * @inflight `@winglang/sdk.cloud.ISecretClient`
 */
export class Secret extends cloud.Secret {
  private readonly secret: DataAwsSsmParameter;

  constructor(scope: Construct, id: string, props: cloud.SecretProps) {
    super(scope, id, props);

    this.secret = new DataAwsSsmParameter(this, "Default", {
      name: props.name,
    });

    new TerraformOutput(this, "SecretArn", {
      value: this.secret.arn,
    });
  }

  /**
   * Secret's arn
   */
  public get arn(): string {
    return this.secret.arn;
  }

  public bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("secrets can only be bound by tfaws.Function for now");
    }

    host.addPolicyStatements(
      ...calculateSecretPermissions(this.secret.arn, ops)
    );

    host.addEnvironment(this.envName(), this.secret.arn);

    super.bind(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "SecretClient",
      [`process.env["${this.envName()}"]`]
    );
  }

  private envName(): string {
    return `SECRET_ARN_${this.node.addr.slice(-8)}`;
  }
}
