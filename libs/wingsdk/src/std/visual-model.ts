/**
 * Visual Model Component Type.
 */
export enum ComponentType {
  /**
   * Link Component type.
   */
  LINK = "LINK",
}

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
