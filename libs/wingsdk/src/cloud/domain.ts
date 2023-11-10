import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { App } from "../core";
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
 */
export class Domain extends Resource {
  /** @internal */
  protected _domain!: string;

  constructor(scope: Construct, id: string, props: DomainProps) {
    if (new.target === Domain) {
      return App.of(scope).newAbstract(DOMAIN_FQN, scope, id, props);
    }

    super(scope, id);

    Node.of(this).title = "Domain";
    Node.of(this).description = "A cloud domain";

    this._domain = props.domainName;
  }

  /** @internal */
  public _toInflight(): string {
    throw new Error("proxy");
  }

  /** @internal */
  public _supportedOps(): string[] {
    throw new Error("proxy");
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
