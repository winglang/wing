import { Construct } from "constructs";
import { VisualComponent } from "./base";
import { Function } from "../cloud";
import { fqnForType } from "../constants";
import { App, UIComponent, lift } from "../core";
import { Duration, IInflight } from "../std";

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
   * @default - no automatic refresh
   */
  readonly refreshRate?: Duration;

  /**
   * Indicates that this field is a link.
   *
   * @default false
   */
  readonly link?: boolean;
}

/**
 * A field can be used to display a value.
 * @noinflight
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
  ): Field {
    return App.of(scope).platform.newAbstract(
      FIELD_FQN,
      scope,
      id,
      label,
      handler,
      props
    );
  }

  private readonly fn: Function;
  private readonly label: string;
  private readonly refreshRate: number | undefined;
  private readonly link: boolean | undefined;

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
    this.fn = new Function(this, "Handler", handler);
    this.link = props.link;
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "field",
      label: this.label,
      handler: this.fn.node.path,
      refreshRate: this.refreshRate,
      link: this.link,
    };
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
export interface IFieldHandler extends IInflight {}

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
 * A value field can be used to display a string value.
 * @noinflight
 */
export class ValueField extends Field {
  constructor(scope: Construct, id: string, label: string, value: string) {
    const handler = lift({ value }).inflight(async (ctx) => {
      return ctx.value;
    });

    super(scope, id, label, handler);
  }
}
