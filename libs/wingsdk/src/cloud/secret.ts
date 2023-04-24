import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Json, Resource } from "../std";

/**
 * Global identifier for `Secret`.
 */
export const SECRET_FQN = fqnForType("cloud.Secret");

/**
 * Properties for `Secret`.
 */
export interface SecretProps {
  /**
   * The secret's name.
   *
   * If no name is provided then a new secret is provisioned in the target
   * cloud. If a name is provided then the resource will reference an existing
   * secret in the target cloud.
   *
   * @default - a new secret is provisioned with a generated name
   */
  readonly name?: string;
}

/**
 * Represents a cloud secret.
 *
 * @inflight `@winglang/sdk.cloud.ISecretClient`
 */
export abstract class Secret extends Resource {
  /**
   * Create a new secert.
   * @internal
   */
  public static _newSecret(
    scope: Construct,
    id: string,
    props: SecretProps = {}
  ): Secret {
    return App.of(scope).newAbstract(SECRET_FQN, scope, id, props);
  }

  public readonly stateful = true;

  constructor(scope: Construct, id: string, props: SecretProps = {}) {
    super(scope, id);

    this.display.title = "Secret";
    this.display.description = "A cloud secret";

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
  VALUE_JSON = "value_json",
}
