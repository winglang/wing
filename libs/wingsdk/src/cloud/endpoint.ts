import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { Node, Resource } from "../std";

/**
 * Global identifier for `Endpoint`.
 */
export const ENDPOINT_FQN = fqnForType("cloud.Endpoint");

/**
 * Options for `Endpoint`.
 */
export interface EndpointProps {
  /**
   * The endpoint's label. For UI purposes.
   * @example "My Dashboard"
   * @default undefined
   */
  readonly label?: string;

  /**
   * Whether the endpoint is supported through browsers. For UI purposes.
   * @default undefined
   */
  readonly browserSupport?: boolean;
}

/**
 * A cloud Endpoint
 * @inflight `@winglang/sdk.cloud.IEndpointClient`
 * @abstract
 */
export class Endpoint extends Resource {
  /** @internal */
  private _url!: string;

  /** @internal */
  protected _label: string | undefined;

  /** @internal */
  protected _browserSupport: boolean | undefined;

  /**
   * The endpoint url.
   * @param url
   */
  constructor(
    scope: Construct,
    id: string,
    url: string,
    props?: EndpointProps
  ) {
    if (new.target === Endpoint) {
      return Node.of(scope).app.platform.newAbstract(
        ENDPOINT_FQN,
        scope,
        id,
        url,
        props
      );
    }

    super(scope, id);

    Node.of(this).title = "Endpoint";
    Node.of(this).description = props?.label ?? "A cloud endpoint";

    this._url = url;
    this._label = props?.label;
    this._browserSupport = props?.browserSupport;
  }

  /**
   * The endpoint url.
   */
  public get url(): string {
    return this._url;
  }

  /**
   * The endpoint label.
   */
  protected get label(): string | undefined {
    return this._label;
  }

  /**
   * The endpoint browser support.
   */
  protected get browserSupport(): boolean | undefined {
    return this._browserSupport;
  }
}

/**
 * Inflight interface for `Endpoint`.
 */
export interface IEndpointClient {}
