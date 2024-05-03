import { Construct } from "constructs";
import { Function } from "./function";
import { calculateSecretPermissions } from "./permissions";
import { isValidArn } from "./util";
import { cloud } from "..";
import { ISecretClient } from "../cloud";
import { InflightClient, LiftMap } from "../core";
import { INFLIGHT_SYMBOL } from "../core/types";
import { IInflightHost, Resource } from "../std";

/**
 * A reference to an existing secret.
 *
 * @inflight `@winglang/sdk.cloud.ISecretClient`
 */
export class SecretRef extends Resource {
  /** @internal */
  public [INFLIGHT_SYMBOL]?: ISecretClient;
  /** The ARN of the secret */
  public readonly secretArn: string;

  constructor(scope: Construct, id: string, secretArn: string) {
    super(scope, id);

    if (!isValidArn(secretArn, "secretsmanager")) {
      throw new Error(`"${secretArn}" is not a valid secretsmanager arn`);
    }

    this.secretArn = secretArn;
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    const fn = Function.from(host);
    if (fn) {
      fn.addPolicyStatements(
        ...calculateSecretPermissions(this.secretArn, ops)
      );
    }

    host.addEnvironment(this.envName(), this.secretArn);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return InflightClient.for(__dirname, __filename, "SecretClient", [
      `process.env["${this.envName()}"]`,
    ]);
  }

  private envName(): string {
    return `SECRET_ARN_${this.node.addr.slice(-8)}`;
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.SecretInflightMethods.VALUE]: [],
      [cloud.SecretInflightMethods.VALUE_JSON]: [],
    };
  }
}
