import { Construct, IConstruct } from "constructs";
import { UIComponent } from "../core";
import { Node } from "../std/node";
import { Resource } from "../std/resource";

export const VISUAL_COMPONENT_SYMBOL = Symbol.for(
  "@winglang/sdk.ui.VisualComponent"
);

/**
 * A visual component is used to customize the view of other classes in the Wing Console.
 * This is a base class for all other visual components.
 */
export abstract class VisualComponent extends Resource {
  /**
   * Returns whether the given construct is a visual component.
   */
  public static isVisualComponent(c: IConstruct): c is VisualComponent {
    return (c as any)[VISUAL_COMPONENT_SYMBOL] !== undefined;
  }

  /**
   * A flag set when a component is added to a grouping component (like "Section")
   * so that it's not rendered multiple times.
   * @internal
   */
  public _newParent: string | undefined;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    Node.of(this).hidden = true;
    Object.defineProperty(this, VISUAL_COMPONENT_SYMBOL, {
      value: this,
      enumerable: false,
      writable: false,
    });
  }

  /** @internal */
  public abstract _toUIComponent(): UIComponent;
}
