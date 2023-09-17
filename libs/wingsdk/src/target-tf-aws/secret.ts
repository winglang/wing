import { TerraformOutput } from "cdktf";
import { Construct } from "constructs";
import { Function } from "./function";
import { SsmParameter } from "../.gen/providers/aws/ssm-parameter";
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
  private readonly secret: SsmParameter;

  constructor(scope: Construct, id: string, props: cloud.SecretProps = {}) {
    super(scope, id, props);

    if (props.name) {
      this.secret = new SsmParameter(this, "Default", {
        name: props.name,
        value: "test",
        type: "SecureString",
        tier: "Intelligent-Tiering",
      });
    } else {
      this.secret = new SsmParameter(this, "Default", {
        name: ResourceNames.generateName(this, NAME_OPTS),
        value: "test",
        type: "SecureString",
        tier: "Intelligent-Tiering",
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
