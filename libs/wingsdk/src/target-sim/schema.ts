/** Schema for simulator.json */
export interface WingSimulatorSchema {
  /** The list of resources. */
  readonly resources: BaseResourceSchema[];
  /** The version of the Wing SDK used to synthesize the .wsim file. */
  readonly sdkVersion: string;
}

/** Schema for individual resources */
export interface BaseResourceSchema {
  /** The resource path from the app's construct tree. */
  readonly path: string;
  /** The type of the resource. */
  readonly type: string;
  /** The resource-specific properties needed to create this resource. */
  readonly props: { [key: string]: any };
  /** The resource-specific attributes that are set after the resource is created. */
  readonly attrs: BaseResourceAttributes;
}

/** Schema for resource attributes */
export interface BaseResourceAttributes {
  /** The resource's simulator-unique id. */
  readonly handle: string;

  /** Any other attributes. */
  [key: string]: unknown;
}
