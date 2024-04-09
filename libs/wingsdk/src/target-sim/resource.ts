import { ToSimulatorOutput } from "../simulator/simulator";
import { IInflightHost, IResource } from "../std";

/**
 * Interfaces shared by all preflight classes that host inflight code.
 */
export interface ISimulatorInflightHost extends IInflightHost {
  /**
   * Add a simulated permission to this inflight host.
   * @param resource The resource to add
   * @param op The action to add
   */
  addPermission(resource: IResource, op: string): void;
}

export function isSimulatorInflightHost(
  obj: any
): obj is ISimulatorInflightHost {
  return (
    typeof obj == "object" &&
    typeof (obj as ISimulatorInflightHost).addPermission === "function"
  );
}

/**
 * Interfaces shared by all preflight classes targeting the simulator.
 */
export interface ISimulatorResource extends IResource {
  /**
   * Convert this resource to a resource schema for the simulator.
   */
  toSimulator(): ToSimulatorOutput;
}

export function isSimulatorResource(obj: any): obj is ISimulatorResource {
  return (
    typeof obj == "object" &&
    typeof (obj as ISimulatorResource).toSimulator === "function"
  );
}
