import { DataAwsSecretsmanagerSecret } from "@cdktf/provider-aws/lib/data-aws-secretsmanager-secret";
import { SecretsmanagerSecret } from "@cdktf/provider-aws/lib/secretsmanager-secret";
import { TerraformOutput } from "cdktf";
import { Construct } from "constructs";
import { Function } from "./function";
import * as cloud from "../cloud";
import * as core from "../core";
import { calculateSecretPermissions } from "../shared-aws/permissions";
import { IInflightHost } from "../std";
import { NameOptions, ResourceNames } from "../utils/resource-names";

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
      this.secret = new SecretsmanagerSecret(this, "Default", {
        name: ResourceNames.generateName(this, NAME_OPTS),
      });

      new TerraformOutput(this, "SecretArn", {
        value: this.secret.arn,
      });
    }
  }

  /**
   * Secret's arn
   */
  public get arn(): string {
    return this.secret.arn;
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("secrets can only be bound by tfaws.Function for now");
    }

    host.addPolicyStatements(
      ...calculateSecretPermissions(this.secret.arn, ops)
    );

    host.addEnvironment(this.envName(), this.secret.arn);

    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
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
