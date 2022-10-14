/** Schema for simulator.json */
export interface WingSimulatorSchema {
  /** The resource at the root of the tree. */
  readonly root: BaseResourceSchema;
  /**
   * The order resources in which resources should be initialized based on
   * dependency relationships.
   */
  readonly startOrder: string[];
}

/** Schema for individual resources */
export interface BaseResourceSchema {
  /** The full path of the resource in the construct tree. */
  readonly path?: string;
  /** The type of the resource. */
  readonly type: string;
  /** The resource-specific properties needed to create this resource. */
  readonly props?: { [key: string]: any };
  /** The resource-specific attributes that are set after the resource is created. */
  readonly attrs?: { [key: string]: any };
  /** IDs of resources that this resource is called, triggered, or captured by. */
  readonly callers?: string[];
  /** IDs of resources that this resource calls, triggers, or captures. */
  readonly callees?: string[];
  /** The resource's children indexed by their IDs. */
  readonly children?: { [key: string]: BaseResourceSchema };
}
