import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { Json, Node, Resource } from "../std";

/**
 * Global identifier for `Secret`.
 */
export const SECRET_FQN = fqnForType("cloud.Secret");

/**
 * Options for `Secret`.
 */
export interface SecretProps {
  /**
   * The secret's name.
   *
   * If no name is provided then a new secret is provisioned in the target.
   * If a name is provided then the resource will reference an existing
   * secret in the target.
   *
   * @default - a new secret is provisioned with a generated name
   */
  readonly name?: string;
}

/**
 * A cloud secret.
 *
 * @inflight `@winglang/sdk.cloud.ISecretClient`
 * @abstract
 */
export class Secret extends Resource {
  constructor(scope: Construct, id: string, props: SecretProps = {}) {
    if (new.target === Secret) {
      return Resource._newFromFactory(SECRET_FQN, scope, id, props);
    }

    super(scope, id);

    Node.of(this).title = "Secret";
    Node.of(this).description = "A cloud secret";

    props;
  }
}

/**
 * Options when getting a secret value
 */
export interface GetSecretValueOptions {
  /**
   * Whether to cache the value
   *
   * @default true
   */
  readonly cache?: boolean;
}

/**
 * Inflight interface for `Secret`.
 */
export interface ISecretClient {
  /**
   * Retrieve the value of the secret.
   * @Throws if the secret doesn't exist.
   * @Returns the secret value as string.
   * @inflight
   */
  value(options?: GetSecretValueOptions): Promise<string>;

  /**
   * Retrieve the Json value of the secret.
   * @Throws if the secret doesn't exist or cannot be parsed as Json
   * @Returns the secret value parsed as Json.
   * @inflight
   */
  valueJson(options?: GetSecretValueOptions): Promise<Json>;
}

/**
 * List of inflight operations available for `Secret`.
 * @internal
 */
export enum SecretInflightMethods {
  /** `Secret.value` */
  VALUE = "value",
  /** `Secret.valueJson` */
  VALUE_JSON = "valueJson",
}
