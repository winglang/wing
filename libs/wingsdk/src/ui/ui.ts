import { Construct, IConstruct } from "constructs";
import { FUNCTION_FQN, type Function } from "../cloud/function";
import { fqnForType } from "../constants";
import { App, UIComponent } from "../core";
import { Duration, IResource, Node, Resource } from "../std";

const VISUAL_COMPONENT_SYMBOL = Symbol.for("@winglang/sdk.ui.VisualComponent");

/**
 * A visual component is a class specifies how a class is rendered in the Wing Console.
 * This is a base class for all UI components.
 */
export abstract class VisualComponent extends Resource {
  /**
   * Returns true if the given construct is a visual component.
   */
  public static isVisualComponent(c: IConstruct): c is VisualComponent {
    return (c as any)[VISUAL_COMPONENT_SYMBOL] !== undefined;
  }

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

/**
 * Global identifier for `Section`.
 */
export const SECTION_FQN = fqnForType("ui.Section");

/**
 * Props for `Section`.
 */
export interface SectionProps {
  /**
   * The label of the section.
   */
  readonly label?: string;
}

/**
 * A section can be used to group other visual components.
 */
export class Section extends VisualComponent {
  /**
   * Creates a new ui.Section instance through the app.
   * @internal
   */
  public static _newSection(
    scope: Construct,
    id: string,
    props: SectionProps = {}
  ): Section {
    return App.of(scope).newAbstract(SECTION_FQN, scope, id, props);
  }

  private readonly label: string | undefined;

  constructor(scope: Construct, id: string, props: SectionProps = {}) {
    super(scope, id);
    this.label = props.label;
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "section",
      label: this.label,
      children: this.node.children
        .filter(VisualComponent.isVisualComponent)
        .map((c) => c._toUIComponent()),
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
 * Global identifier for `Field`.
 */
export const FIELD_FQN = fqnForType("ui.Field");

/**
 * Props for `Field`.
 */
export interface FieldProps {
  /**
   * How often the field should be refreshed.
   * Use nil to disable automatic refresh.
   */
  readonly refreshRate?: Duration;
}

/**
 * A field can be used to display a value.
 */
export class Field extends VisualComponent {
  /**
   * Creates a new ui.Field instance through the app.
   * @internal
   */
  public static _newField(
    scope: Construct,
    id: string,
    label: string,
    handler: IFieldHandler,
    props: FieldProps = {}
  ): Section {
    return App.of(scope).newAbstract(
      SECTION_FQN,
      scope,
      id,
      label,
      handler,
      props
    );
  }

  private readonly fn: Function | undefined;
  private readonly label: string;
  private readonly refreshRate: number | undefined;

  constructor(
    scope: Construct,
    id: string,
    label: string,
    handler: IFieldHandler,
    props: FieldProps = {}
  ) {
    super(scope, id);

    this.label = label;
    this.refreshRate = props.refreshRate?.seconds;

    if (App.of(this)._target === "sim") {
      this.fn = App.of(scope).newAbstract(
        FUNCTION_FQN,
        this,
        "Handler",
        handler
      );
    }
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "field",
      label: this.label,
      handlerPath: this.fn!.node.path,
      refreshRate: this.refreshRate,
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
 * `addField`.
 *
 * @inflight `@winglang/sdk.ui.IFieldHandlerClient`
 */
export interface IFieldHandler extends IResource {}

/**
 * Inflight client for `IFieldHandler`.
 */
export interface IFieldHandlerClient {
  /**
   * Function that returns a string to display.
   * @inflight
   */
  handle(): Promise<string>;
}

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
    handler: IButtonHandler
  ): Section {
    return App.of(scope).newAbstract(SECTION_FQN, scope, id, label, handler);
  }

  private readonly fn: Function | undefined;
  private readonly label: string;

  constructor(
    scope: Construct,
    id: string,
    label: string,
    handler: IButtonHandler
  ) {
    super(scope, id);

    this.label = label;

    if (App.of(this)._target === "sim") {
      this.fn = App.of(scope).newAbstract(
        FUNCTION_FQN,
        this,
        "Handler",
        handler
      );
    }
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "button",
      label: this.label,
      handlerPath: this.fn!.node.path,
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
export interface IButtonHandler extends IResource {}

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
