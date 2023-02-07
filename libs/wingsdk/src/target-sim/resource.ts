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
 * Resource context
 */
export interface ResourceContext {
  /**
   * Tracing metadata for the resource.
   */
  readonly tracing: TracingContext;
}

/**
 * Tracing context
 */
export interface TracingContext {
  /**
   * Tracing metadata for the resource.
   */
  readonly label: string;
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
}

/**
 * Base class for simulator resources.
 */
export abstract class SimulatorResource implements ISimulatorResourceInstance {
  /**
   * Metadata for the resource.
   */
  protected tracingContext: TracingContext | undefined;

  public async init(): Promise<void> {
    return;
  }

  public async cleanup(): Promise<void> {
    return;
  }

  /**
   * Add metadata to the resource.
   * @param ctx Tracing context
   */
  public addTracingContext(ctx?: TracingContext): void {
    this.tracingContext = ctx;
  }
}
