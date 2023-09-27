import { Construct } from "constructs";
import * as cloud from "../cloud";

/**
 * GCP implementation of `cloud.Secret`.
 *
 * @inflight `@winglang/sdk.cloud.ISecretClient`
 */
export class Secret extends cloud.Secret {
  private readonly secret: string;

  constructor(scope: Construct, id: string, props: cloud.SecretProps) {
    super(scope, id, props);
    this.secret = props.name;
  }

  // TODO: implement
  public _toInflight(): string {
    throw new Error(
      "cloud.Secret cannot be used as an Inflight resource on GCP yet"
    );
  }
}
