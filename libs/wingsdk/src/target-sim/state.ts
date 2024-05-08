import { ISimulatorResource } from "./resource";
import { StateSchema } from "./schema-resources";
import { simulatorcreateToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import { fqnForType } from "../constants";
import { LiftMap } from "../core";
import { INFLIGHT_SYMBOL } from "../core/types";
import { ToSimulatorOutput } from "../simulator";
import { IInflightHost, Json, Resource } from "../std";

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
  /** @internal */
  public [INFLIGHT_SYMBOL]?: IStateClient;

  /**
   * Returns a token that can be used to retrieve the value of the state after the simulation has
   * run.
   * @param key The object key retrieved through the inflight `state.get()`.
   */
  public token(key: string): string {
    return simulatorcreateToken(this, key);
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [StateInflightMethods.GET]: [],
      [StateInflightMethods.SET]: [],
      [StateInflightMethods.TRY_GET]: [],
    };
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  public toSimulator(): ToSimulatorOutput {
    const props: StateSchema = {};
    return {
      type: STATE_FQN,
      props,
    };
  }
}

/**
 * Inflight interface for `State`.
 */
export interface IStateClient {
  /**
   * Sets the state of runtime a runtime object.
   * @param key The object's key
   * @param value The object's value
   * @inflight
   */
  set(key: string, value: Json): Promise<void>;

  /**
   * Gets the runtime state of this object. Throws if there is no value for the given key.
   * @param key The object's key
   * @inflight
   */
  get(key: string): Promise<Json>;

  /**
   * Checks if runtime state exists for this object and returns it's value. If no value exists,
   * returns `nil`.
   *
   * @param key The object's key
   * @inflight
   */
  tryGet(key: string): Promise<Json | undefined>;
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
  /**`State.tryGet` */
  TRY_GET = "tryGet",
}
