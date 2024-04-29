import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { Node, Resource } from "../std";

/**
 * Global identifier for `Domain`.
 */
export const DOMAIN_FQN = fqnForType("cloud.Domain");

/**
 * Options for `Domain`.
 */
export interface DomainProps {
  /**
   * The website's custom domain name.
   * @example "example.com"
   */
  readonly domainName: string;
}

/**
 * A cloud Domain
 * @inflight `@winglang/sdk.cloud.IDomainClient`
 * @abstract
 */
export class Domain extends Resource {
  /** @internal */
  protected _domain!: string;

  constructor(scope: Construct, id: string, props: DomainProps) {
    if (new.target === Domain) {
      return Resource._newFromFactory(DOMAIN_FQN, scope, id, props);
    }

    super(scope, id);

    Node.of(this).title = "Domain";
    Node.of(this).description = "A cloud domain";

    this._domain = props.domainName;
  }

  /**
   * The domain name.
   */
  public get domainName(): string {
    return this._domain;
  }
}

/**
 * Inflight interface for `Domain`.
 */
export interface IDomainClient {}
