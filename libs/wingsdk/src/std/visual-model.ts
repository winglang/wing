/**
 * Visual Model Component Type.
 */
export type ComponentType = "link";

/**
 * Visual Model Component.
 */
export interface VisualModelComponent {
  /**
   * The component type.
   */
  readonly type: ComponentType;

  /**
   * The component props.
   */
  readonly props: { [key: string]: any };
}

/**
 * Link Component props
 */
export interface LinkComponent {
  /**
   * The link href.
   */
  readonly href: string;
  /**
   * The link text.
   */
  readonly text: string;
}

/**
 * Visual Model. Used to generate the visual model for a resource.
 */
export interface VisualModel {
  /**
   * Visual Model Components.
   */
  readonly components: VisualModelComponent[];
}

/**
 * Visual Model Builder. Used to build a visual model.
 */
export class VisualModelBuilder {
  private readonly components: VisualModelComponent[] = [];

  /**
   * Adds a link component to the visual model.
   * @param href
   * @param text
   */
  public addLink(href: string, text: string): void {
    this.components.push({
      type: "link",
      props: {
        href,
        text,
      },
    });
  }

  /**
   * Builds the visual model.
   * @returns the visual model.
   */
  public buildVisualModel(): VisualModel {
    return {
      components: this.components,
    };
  }
}
