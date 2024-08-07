import { CfnOutput } from "aws-cdk-lib";
import {
  ISecret as ICdkSecret,
  Secret as CdkSecret,
} from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { addPolicyStatements, isAwsCdkFunction } from "./function";
import { cloud, std } from "@winglang/sdk";
import { calculateSecretPermissions } from "@winglang/sdk/lib/shared-aws/permissions";
import { InflightClient, LiftMap } from "@winglang/sdk/lib/core";

/**
 * AWS Implemntation of `cloud.Secret`
 *
 * @inflight `@winglang/sdk.cloud.ISecretClient`
 */
export class Secret extends cloud.Secret {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(
      __filename.replace("secret", "secret.inflight"),
      "SecretClient"
    );
  }

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

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.SecretInflightMethods.VALUE]: [],
      [cloud.SecretInflightMethods.VALUE_JSON]: [],
    };
  }

  /**
   * Secret's arn
   */
  public get arn(): string {
    return this.secret.secretArn;
  }

  public onLift(host: std.IInflightHost, ops: string[]): void {
    if (!isAwsCdkFunction(host)) {
      throw new Error("Expected 'host' to implement 'isAwsCdkFunction' method");
    }

    addPolicyStatements(
      host.awscdkFunction,
      calculateSecretPermissions(this.arnForPolicies, ops)
    );

    host.addEnvironment(this.envName(), this.secret.secretArn);

    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return {
      $secretArn: `process.env["${this.envName()}"]`,
    };
  }

  private envName(): string {
    return `SECRET_ARN_${this.node.addr.slice(-8)}`;
  }
}
