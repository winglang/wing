import { IConstruct } from "constructs";
import { BaseResourceSchema } from "./schema";

/**
 * Interfaces shared by all polycon implementations (preflight classes)
 * targeting the simulator.
 */
export interface ISimulatorResource extends IConstruct {
  /**
   * Convert this resource to a resource schema for the simulator.
   */
  toSimulator(): BaseResourceSchema;
}

export function isSimulatorResource(obj: any): obj is ISimulatorResource {
  return (
    typeof obj == "object" &&
    typeof (obj as ISimulatorResource).toSimulator === "function"
  );
}

/**
 * Resource configuration
 */
export interface ResourceMetadata {
  readonly tracing: object;
}

/**
 * Shared interface for resource simulations.
 */
export interface ISimulatorResourceInstance {
  /**
   * Perform any async initialization required by the resource.
   */
  init(): Promise<void>;

  /**
   * Stop the resource and clean up any physical resources it may have created
   * (files, ports, etc).
   */
  cleanup(): Promise<void>;

   /**
    * Set the metadata for this resource.
    * @param metadata
    */
   addMetadata(metadata: ResourceMetadata): void;
}
