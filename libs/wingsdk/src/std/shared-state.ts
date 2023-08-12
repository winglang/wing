import { Construct } from "constructs";
import { IResource, Resource } from "./resource";
import { fqnForType } from "../constants";
import { App } from "../core";

/**
 * Global identifier for `SharedState`.
 */
export const SHARED_STATE_FQN = fqnForType("std.SharedState");

/**
 * A container for a value that can be shared and mutated across inflight consumers.
 * Only supported in the `sim` compilation target.
 *
 * @inflight `@winglang/sdk.std.ISharedStateClient`
 */
export abstract class SharedState extends Resource implements IResource {
  /**
   * Create a new SharedState instance.
   * @internal
   */
  public static _newSharedState(
    scope: Construct,
    id: string,
    initial: any
  ): SharedState {
    return App.of(scope).newAbstract(SHARED_STATE_FQN, scope, id, initial);
  }

  constructor(scope: Construct, id: string, initial: any) {
    super(scope, id);

    initial;

    this.display.title = "SharedState";
    this.display.description =
      "A container that can share a value across inflight consumers.";

    this._addInflightOps(SharedStateMethods.GET, SharedStateMethods.SET);
  }
}

/**
 * Inflight interface for `SharedState`.
 */
export interface ISharedStateClient {
  /**
   * Get the inner value.
   * @inflight
   */
  get(): Promise<any>;

  /**
   * Replace the inner value with a new value.
   * @inflight
   */
  set(value: any): Promise<void>;
}

/**
 * List of inflight operations available for `SharedState`.
 * @internal
 */
export enum SharedStateMethods {
  /** `SharedState.get` */
  GET = "get",
  /** `SharedState.set` */
  SET = "set",
}
