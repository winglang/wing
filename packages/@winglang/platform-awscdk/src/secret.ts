import { CfnOutput } from "aws-cdk-lib";
import {
  ISecret as ICdkSecret,
  Secret as CdkSecret,
} from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { cloud } from "@winglang/sdk";
import { Secret as AwsSecret } from "@winglang/sdk/shared-aws";

/**
 * AWS Implemntation of `cloud.Secret`
 */
export class Secret extends AwsSecret {
  private readonly secret: ICdkSecret;

  constructor(scope: Construct, id: string, props: cloud.SecretProps = {}) {
    super(scope, id, props);

    if (props.name) {
      this.secret = CdkSecret.fromSecretNameV2(this, "Default", props.name);
    } else {
      this.secret = new CdkSecret(this, "Default");
      new CfnOutput(this, "SecretArn", { value: this.secret.secretName });
    }
  }

  public get secretArn(): string {
    return this.secret.secretArn;
  }
}
