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
 * Shared interface for resource simulations.
 */
export interface ISimulatorResourceInstance {
  /**
   * Perform any async initialization required by the resource. Return a map of
   * the resource's runtime attributes.
   */
  init(): Promise<Record<string, any>>;

  /**
   * Stop the resource and clean up any physical resources it may have created
   * (files, ports, etc).
   */
  cleanup(): Promise<void>;
}
