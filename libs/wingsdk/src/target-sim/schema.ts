/** Schema for simulator.json */
export interface WingSimulatorSchema {
  /** The list of resources. */
  readonly resources: BaseResourceSchema[];
  /** The version of the Wing SDK used to synthesize the .wx file. */
  readonly sdkVersion: string;
}

/** Schema for individual resources */
export interface BaseResourceSchema {
  /** The resource ID. */
  readonly id: string;
  /** The type of the resource. */
  readonly type: string;
  /** The resource-specific properties needed to create this resource. */
  readonly props?: { [key: string]: any };
  /** The resource-specific attributes that are set after the resource is created. */
  readonly attrs?: BaseResourceAttributes;
  /** IDs of resources that this resource is called, triggered, or referenced by. */
  readonly inbound?: string[];
  /** IDs of resources that this resource calls, triggers, or references. */
  readonly outbound?: string[];
}

/** Schema for resource attributes */
export interface BaseResourceAttributes {
  /** The resource's simulator-unique id. */
  readonly handle: string;

  /** Any other attributes. */
  [key: string]: unknown;
}
