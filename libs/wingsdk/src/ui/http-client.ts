import { Construct } from "constructs";
import { VisualComponent } from "./base";
import { fqnForType } from "../constants";
import { App, UIComponent } from "../core";

/**
 * Global identifier for `HttpClient`.
 */
export const API_FQN = fqnForType("ui.HttpClient");

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
    label: string,
    url: string,
    openApiSpec: string
  ): HttpClient {
    return App.of(scope).newAbstract(
      API_FQN,
      scope,
      id,
      label,
      url,
      openApiSpec
    );
  }

  private readonly label: string;
  private readonly url: string;
  private readonly openApiSpec: string;

  constructor(
    scope: Construct,
    id: string,
    label: string,
    url: string,
    openApiSpec: string
  ) {
    super(scope, id);
    this.label = label;
    this.url = url;
    this.openApiSpec = openApiSpec;
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "http-client",
      label: this.label,
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
