import { TerraformOutput } from "cdktf";
import { Construct } from "constructs";
import { Function } from "./function";
import { DataAwsSecretsmanagerSecret } from "../.gen/providers/aws/data-aws-secretsmanager-secret";
import { SecretsmanagerSecret } from "../.gen/providers/aws/secretsmanager-secret";
import * as cloud from "../cloud";
import * as core from "../core";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { calculateSecretPermissions } from "../shared-aws/permissions";
import { IInflightHost } from "../std";

/**
 * The secret name can contain ASCII letters, numbers, and the following characters: /_+=.@-
 */
const NAME_OPTS: NameOptions = {
  disallowedRegex: /[^\w/+=.@-]+/g,
};

/**
 * AWS implementation of `cloud.Secret`
 *
 * @inflight `@winglang/sdk.cloud.ISecretClient`
 */
export class Secret extends cloud.Secret {
  private readonly secret: DataAwsSecretsmanagerSecret | SecretsmanagerSecret;

  constructor(scope: Construct, id: string, props: cloud.SecretProps = {}) {
    super(scope, id, props);

    if (props.name) {
      this.secret = new DataAwsSecretsmanagerSecret(this, "Default", {
        name: props.name,
      });
    } else {
      this._name = ResourceNames.generateName(this, NAME_OPTS),
      this.secret = new SecretsmanagerSecret(this, "Default", {
        name: this._name
      });

      new TerraformOutput(this, "SecretArn", {
        value: this.secret.arn,
      });
    }
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      cloud.SecretInflightMethods.VALUE,
      cloud.SecretInflightMethods.VALUE_JSON,
    ];
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("secrets can only be bound by tfaws.Function for now");
    }

    host.addPolicyStatements(
      ...calculateSecretPermissions(this.secret.arn, ops)
    );

    host.addEnvironment(this.envName(), this.secret.arn);

    super.onLift(host, ops);
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
