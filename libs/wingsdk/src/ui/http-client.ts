import { Construct } from "constructs";
import { VisualComponent } from "./base";
import { fqnForType } from "../constants";
import { App, UIComponent } from "../core";

/**
 * Global identifier for `HttpClient`.
 */
export const API_FQN = fqnForType("ui.HttpClient");

/**
 * Props for `HttpClient`.
 */
export interface httpClientProps {
  /**
   * The URL of the API.
   */
  readonly url: string;

  /**
   * The OpenAPI spec of the API.
   */
  readonly openApiSpec: string;
}

/**
 * A button can be used to perform an action.
 */
export class HttpClient extends VisualComponent {
  /**
   * Creates a new ui.HttpClient instance through the app.
   * @internal
   */
  public static _newHttpClient(
    scope: Construct,
    id: string,
    httpClientProps: {}
  ): HttpClient {
    return App.of(scope).newAbstract(API_FQN, scope, id, httpClientProps);
  }

  private readonly url: string;
  private readonly openApiSpec: string;

  constructor(scope: Construct, id: string, httpClientProps: httpClientProps) {
    super(scope, id);
    this.url = httpClientProps.url;
    this.openApiSpec = httpClientProps.openApiSpec;
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "http-client",
      url: this.url,
      openApiSpec: this.openApiSpec,
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
