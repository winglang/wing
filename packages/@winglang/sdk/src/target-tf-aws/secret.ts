import { TerraformOutput } from "cdktf";
import { Construct } from "constructs";
import { DataAwsSecretsmanagerSecret } from "../.gen/providers/aws/data-aws-secretsmanager-secret";
import { SecretsmanagerSecret } from "../.gen/providers/aws/secretsmanager-secret";
import * as cloud from "../cloud";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { Secret as AwsSecret } from "../shared-aws";

/**
 * The secret name can contain ASCII letters, numbers, and the following characters: /_+=.@-
 */
const NAME_OPTS: NameOptions = {
  disallowedRegex: /[^\w/+=.@-]+/g,
};

/**
 * AWS implementation of `cloud.Secret`
 */
export class Secret extends AwsSecret {
  private readonly secret: DataAwsSecretsmanagerSecret | SecretsmanagerSecret;

  constructor(scope: Construct, id: string, props: cloud.SecretProps = {}) {
    super(scope, id, props);

    if (props.name) {
      this.secret = new DataAwsSecretsmanagerSecret(this, "Default", {
        name: props.name,
      });
    } else {
      (this._name = ResourceNames.generateName(this, NAME_OPTS)),
        (this.secret = new SecretsmanagerSecret(this, "Default", {
          name: this._name,
        }));

      new TerraformOutput(this, "SecretArn", {
        value: this.secret.arn,
      });
    }
  }

  public get secretArn(): string {
    return this.secret.arn;
  }
}
