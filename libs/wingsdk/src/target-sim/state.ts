import { ISimulatorResource } from "./resource";
import { SIMULATOR_STATE_TYPE } from "./schema-resources";
import { simulatorAttrToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import { fqnForType } from "../constants";
import { BaseResourceSchema } from "../simulator/simulator";
import { IInflightHost, Resource } from "../std";

/**
 * Global identifier for `State`.
 */
export const STATE_FQN = fqnForType("sim.State");

/**
 * Key/value in-memory state for the simulator.
 *
 * Use the preflight method `token(key)` to obtain a token that can be used to reference the value
 * of the state at runtime.
 *
 * During deployment (i.e. `cloud.OnDeploy` or `cloud.Service` startup), you must call the inflight
 * method `set(key, value)` to set the runtime value. The value will be available at runtime through
 * the inflight method `get(key)` (or resolved as a token).
 * 
 * See tests for examples.
 *
 * @inflight `@winglang/sdk.sim.IStateClient`
 */
export class State extends Resource implements ISimulatorResource {
  /**
   * Returns a token that can be used to retrieve the value of the state after the simulation has
   * run.
   * @param key The object key retrieved through the inflight `state.get()`.
   */
  public token(key: string): string {
    return simulatorAttrToken(this, key);
  }

  /** @internal */
  public _getInflightOps(): string[] {
    return [StateInflightMethods.GET, StateInflightMethods.SET];
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }

  public bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.bind(host, ops);
  }

  public toSimulator(): BaseResourceSchema {
    return {
      type: SIMULATOR_STATE_TYPE,
      path: this.node.path,
      props: {},
      attrs: {},
    };
  }
}

/**
 * Inflight interface for `State`.
 */
export interface IStateClient {
  /**
   * Sets the runtime state of this object.
   * @param key The object's key
   * @param value The object's value
   */
  set(key: string, value: any): Promise<void>;

  /**
   * Gets the runtime state of this object. Throws if there is no value for the given key.
   * @param key The object's key
   */
  get(key: string): Promise<any>;
}

/**
 * List of inflight operations available for `State`.
 * @internal
 */
export enum StateInflightMethods {
  /** `State.set` */
  SET = "set",
  /** `State.get` */
  GET = "get",
}
