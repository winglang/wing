import { Construct } from "constructs";
import { VisualComponent } from "./base";
import { Button, IButtonHandler } from "./button";
import { Field, FieldProps, IFieldHandler } from "./field";
import { fqnForType } from "../constants";
import { App, LiftMap, UIComponent } from "../core";

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
   * @default - no label
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
  private readonly subcomponents: VisualComponent[] = [];
  private buttonIdx: number;
  private fieldIdx: number;

  constructor(scope: Construct, id: string, props: SectionProps = {}) {
    super(scope, id);
    this.label = props.label;
    this.buttonIdx = 1;
    this.fieldIdx = 1;
  }

  /**
   * Adds a visual component to the section. The components
   * will be rendered in the order they were added.
   */
  public add(...components: Array<VisualComponent>): void {
    for (const component of components) {
      if (component._newParent !== undefined) {
        throw new Error(
          `Cannot add ${component.node.path} to ${this.node.path} because it already belongs to ${component._newParent}.`
        );
      }
      component._newParent = this.node.path;
      this.subcomponents.push(component);
    }
  }

  /**
   * Adds a button to the section. Shorthand for `add(new ui.Button(...))`.
   */
  public addButton(label: string, handler: IButtonHandler): void {
    const id = `Button-${this.buttonIdx++}`;
    this.add(new Button(this, id, label, handler));
  }

  /**
   * Adds a field to the section. Shorthand for `add(new ui.Field(...))`.
   */
  public addField(
    label: string,
    handler: IFieldHandler,
    props: FieldProps = {}
  ): void {
    const id = `Field-${this.fieldIdx++}`;
    this.add(new Field(this, id, label, handler, props));
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "section",
      label: this.label,
      children: this.subcomponents.map((c) => c._toUIComponent()),
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
