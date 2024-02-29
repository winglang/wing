import { Construct } from "constructs";
import { VisualComponent } from "./base";
import { Function } from "../cloud";
import { fqnForType } from "../constants";
import { App, UIComponent } from "../core";
import { IInflight } from "../std";

/**
 * Global identifier for `Button`.
 */
export const BUTTON_FQN = fqnForType("ui.Button");

/**
 * A button can be used to perform an action.
 */
export class Button extends VisualComponent {
  /**
   * Creates a new ui.Button instance through the app.
   * @internal
   */
  public static _newButton(
    scope: Construct,
    id: string,
    label: string,
    handler: IButtonHandler,
  ): Button {
    return App.of(scope).newAbstract(BUTTON_FQN, scope, id, label, handler);
  }

  private readonly fn: Function;
  private readonly label: string;

  constructor(
    scope: Construct,
    id: string,
    label: string,
    handler: IButtonHandler,
  ) {
    super(scope, id);
    this.label = label;
    this.fn = new Function(this, "Handler", handler);
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "button",
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
 * `Button`.
 *
 * @inflight `@winglang/sdk.ui.IButtonHandlerClient`
 */
export interface IButtonHandler extends IInflight {}

/**
 * Inflight client for `IButtonHandler`.
 */
export interface IButtonHandlerClient {
  /**
   * Function that peforms an action.
   * @inflight
   */
  handle(): Promise<void>;
}
