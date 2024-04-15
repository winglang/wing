import { Construct } from "constructs";
import { VisualComponent } from "./base";
import { fqnForType } from "../constants";
import { App, UIComponent } from "../core";
import { IInflight } from "../std";
import { Function } from "../cloud";

/**
 * Global identifier for `HttpClient`.
 */
export const API_FQN = fqnForType("ui.HttpClient");

/**
 * An HttpClient can be used to make HTTP requests.
 */
export class HttpClient extends VisualComponent {
  /**
   * Creates a new ui.HttpClient instance through the app.
   * @internal
   */
  public static _newHttpClient(
    scope: Construct,
    id: string,
    label: string,
    handler: IHttpClientHandler
  ): HttpClient {
    return App.of(scope).newAbstract(API_FQN, scope, id, label, handler);
  }

  private readonly fn: Function;
  private readonly label: string;

  constructor(
    scope: Construct,
    id: string,
    label: string,
    handler: IHttpClientHandler
  ) {
    super(scope, id);

    this.label = label;
    this.fn = new Function(this, "Handler", handler);
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "http-client",
      label: this.label,
      handler: this.fn.node.path,
    };
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [];
  }

  /** @internal */
  public _toInflight(): string {
    throw new Error("Method not implemented.");
  }
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `addHttpClient`.
 *
 * @inflight `@winglang/sdk.ui.IHttpClientHandlerClient`
 */
export interface IHttpClientHandler extends IInflight {}

/**
 * Inflight client for `IHttpClientHandler`.
 */
export interface IHttpClientHandlerClient {
  /**
   * Function that returns a stringified JSON that contains a url and a openApiSpe keys.
   * @inflight
   */
  handle(): Promise<string>;
}
