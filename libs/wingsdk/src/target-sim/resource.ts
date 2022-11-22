import { IConstruct } from "constructs";
import { BaseResourceSchema } from "./schema";

/**
 * Interfaces shared by all polycon implementations (preflight classes)
 * targeting the simulator.
 */
export interface IResource extends IConstruct {
  /**
   * Annotate this resource with information about another resource that calls,
   * triggers, or otherwise depends on this resource at runtime.
   *
   * @internal
   */
  _addInbound(...resources: string[]): void;

  /**
   * Convert this resource to a resource schema for the simulator.
   *
   * @internal
   */
  _toResourceSchema(): BaseResourceSchema;
}

export function isResource(obj: any): obj is IResource {
  return (
    typeof obj == "object" &&
    typeof (obj as IResource)._toResourceSchema === "function"
  );
}

/**
 * Shared interface for resource simulations.
 */
export interface ISimulatorResource {
  /**
   * Perform any async initialization required by the resource.
   */
  init(): Promise<void>;

  /**
   * Stop the resource and clean up any physical resources it may have created
   * (files, ports, etc).
   */
  cleanup(): Promise<void>;
}
