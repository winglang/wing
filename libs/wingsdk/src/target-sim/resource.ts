import { BaseResourceSchema } from "../simulator/simulator";
import { IResource } from "../std";

/**
 * Interfaces shared by all polycon implementations (preflight classes)
 * targeting the simulator.
 */
export interface ISimulatorResource extends IResource {
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
