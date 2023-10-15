/**
 * Display meta component.
 */
export class DisplayMetaComponent {
  constructor(
    /**
     * The component type.
     */
    public readonly type: string,
    /**
     * The component props.
     */
    public readonly props: { [key: string]: any }
  ) {}
}

/**
 * Display meta link props
 */
export interface LinkProps {
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
 * Display meta link component.
 */
export class DisplayMetaLink extends DisplayMetaComponent {
  constructor(props: LinkProps) {
    super("link", props);
  }
}

/**
 * Display meta
 */
export class DisplayMeta {
  private readonly _components: DisplayMetaComponent[];
  constructor() {
    this._components = [];
  }

  /**
   * Returns the meta components.
   */
  public get components(): DisplayMetaComponent[] | undefined {
    return [...this._components];
  }

  private addComponent(component: DisplayMetaComponent) {
    this._components.push(component);
  }

  /**
   * Add a link to the array of meta components.
   * @param href
   * @param text
   */
  public addLink(href: string, text: string) {
    this.addComponent(new DisplayMetaLink({ href, text }));
  }
}
