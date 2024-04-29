import { Construct } from "constructs";
import { VisualComponent } from "./base";
import { Function } from "../cloud";
import { fqnForType } from "../constants";
import { App, LiftMap, UIComponent } from "../core";
import { IInflight } from "../std";

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
    getUrlHandler: IHttpClientGetUrlHandler,
    getApiSpecHandler: IHttpClientGetApiSpecHandler
  ): HttpClient {
    return App.of(scope).newAbstract(
      API_FQN,
      scope,
      id,
      label,
      getUrlHandler,
      getApiSpecHandler
    );
  }

  private readonly getUrlfn: Function;
  private readonly getApiSpecfn: Function;
  private readonly label: string;

  constructor(
    scope: Construct,
    id: string,
    label: string,
    getUrlHandler: IHttpClientGetUrlHandler,
    getApiSpecHandler: IHttpClientGetApiSpecHandler
  ) {
    super(scope, id);

    this.label = label;
    this.getUrlfn = new Function(this, "GetUrlHandler", getUrlHandler);
    this.getApiSpecfn = new Function(
      this,
      "GetApiSpecHandler",
      getApiSpecHandler
    );
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "http-client",
      label: this.label,
      getUrlHandler: this.getUrlfn.node.path,
      getApiSpecHandler: this.getApiSpecfn.node.path,
    };
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {};
  }

  /** @internal */
  public _toInflight(): string {
    throw new Error("Method not implemented.");
  }
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `IHttpClient`.
 *
 * @inflight `@winglang/sdk.ui.IHttpClientGetUrlHandlerClient`
 */
export interface IHttpClientGetUrlHandler extends IInflight {}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `IHttpClient`.
 *
 * @inflight `@winglang/sdk.ui.IHttpClientGetApiSpecHandlerClient`
 */
export interface IHttpClientGetApiSpecHandler extends IInflight {}

/**
 * Inflight client for `IHttpClientGetUrlHandler`.
 */
export interface IHttpClientGetUrlHandlerClient {
  /**
   * Function that returns the URL to make a request to.
   * @inflight
   */
  handle(): Promise<string>;
}
/**
 * Inflight client for `IHttpClientGetApiSpecHandler`.
 */
export interface IHttpClientGetApiSpecHandlerClient {
  /**
   * Function that returns the OpenAPI spec.
   * @inflight
   */
  handle(): Promise<string>;
}
