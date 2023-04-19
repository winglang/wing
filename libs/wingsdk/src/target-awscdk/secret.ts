import { Secret as CdkSecret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { Function } from "./function";
import * as cloud from "../cloud";
import * as core from "../core";
import { calculateSecretPermissions } from "../shared-aws/permissions";
import { IInflightHost } from "../std";

/**
 * AWS Implemntation of `cloud.Secret`
 *
 * @inflight `@winglang/sdk.cloud.ISecretClient`
 */
export class Secret extends cloud.Secret {
  private readonly secret: CdkSecret;

  constructor(scope: Construct, id: string, props: cloud.SecretProps = {}) {
    super(scope, id, props);

    this.secret = new CdkSecret(this, "Default");
  }

  /**
   * Secret's arn
   */
  public get arn(): string {
    return this.secret.secretArn;
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("secrets can only be bound by awscdk.Function for now");
    }

    host.addPolicyStatements(
      ...calculateSecretPermissions(this.secret.secretArn, ops)
    );

    host.addEnvironment(this.envName(), this.secret.secretArn);

    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(
      __dirname.replace("target-awscdk", "shared-aws"),
      __filename,
      "SecretClient",
      [`process.env["${this.envName()}"]`]
    );
  }

  private envName(): string {
    return `SECRET_ARN_${this.node.addr.slice(-8)}`;
  }
}

Secret._annotateInflight(cloud.SecretInflightMethods.VALUE, {});
Secret._annotateInflight(cloud.SecretInflightMethods.VALUE_JSON, {});
