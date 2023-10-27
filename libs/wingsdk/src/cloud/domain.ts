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
export abstract class Domain extends Resource {
  /**
   * Create a new website.
   * @internal
   */
  public static _newDomain(
    scope: Construct,
    id: string,
    props: DomainProps
  ): Domain {
    return App.of(scope).newAbstract(DOMAIN_FQN, scope, id, props);
  }
  /** @internal */
  protected _domain: string;

  constructor(scope: Construct, id: string, props: DomainProps) {
    super(scope, id);

    Node.of(this).title = "Domain";
    Node.of(this).description = "A cloud domain";

    this._domain = props.domainName;
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [];
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
