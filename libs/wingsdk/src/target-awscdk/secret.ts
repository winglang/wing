import { CfnOutput } from "aws-cdk-lib";
import {
  ISecret as ICdkSecret,
  Secret as CdkSecret,
} from "aws-cdk-lib/aws-secretsmanager";
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
  private readonly secret: ICdkSecret;
  private readonly arnForPolicies: string;

  constructor(scope: Construct, id: string, props: cloud.SecretProps = {}) {
    super(scope, id, props);

    if (props.name) {
      this.secret = CdkSecret.fromSecretNameV2(this, "Default", props.name);
      this.arnForPolicies = `${this.secret.secretArn}-??????`;
    } else {
      this.secret = new CdkSecret(this, "Default");

      this.arnForPolicies = this.secret.secretArn;

      new CfnOutput(this, "SecretArn", { value: this.secret.secretName });
    }
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
      ...calculateSecretPermissions(this.arnForPolicies, ops)
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
