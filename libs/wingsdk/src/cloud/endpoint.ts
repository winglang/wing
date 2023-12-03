import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { Node, Resource } from "../std";

/**
 * Global identifier for `Endpoint`.
 */
export const ENDPOINT_FQN = fqnForType("cloud.Endpoint");

/**
 * A cloud Endpoint
 * @abstract
 */
export class Endpoint extends Resource {
  /** @internal */
  private _url!: string;

  /**
   * The endpoint url.
   * @param url
   */
  constructor(scope: Construct, id: string, url: string) {
    if (new.target === Endpoint) {
      return Resource._newFromFactory(ENDPOINT_FQN, scope, id, url);
    }

    super(scope, id);

    Node.of(this).title = "Endpoint";
    Node.of(this).description = "A cloud endpoint";

    this._url = url;
  }

  /**
   * The endpoint url.
   */
  public get url(): string {
    return this._url;
  }
}

/**
 * Inflight interface for `Endpoint`.
 */
export interface IEndpointClient {}
