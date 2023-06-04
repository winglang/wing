// These classes are used by Wing to provide JSII subsets of the JS Set class.
// They should not be consumed directly by users.
// TODO: These should be interfaces, currently Wing does not support interface JSII imports

import { Code, InflightClient } from "../core";
import { T1 } from "./generics";

/**
 * Immutable Set
 *
 * @typeparam T1
 */
export class ImmutableSet {
  /**
   * The length of the set
   * @returns the length of the set
   */
  public get size(): number {
    throw new Error("Abstract");
  }

  /**
   * Returns a boolean indicating whether an element with the specified value exists in the set.
   * @param value The value to test for presence in the Set object.
   * @returns `true` if an element with the specified value exists in the set; otherwise `false`.
   */
  public has(value: T1): boolean {
    value;
    throw new Error("Abstract");
  }

  /**
   * Create a mutable shallow copy of this set
   *
   * @macro new Set($self$)
   *
   * @returns a MutableSet with the same values as this set
   */
  public copyMut(): MutableSet {
    throw new Error("Macro");
  }

  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, "ImmutableSet");
  }
}

/**
 * Mutable Set
 *
 * @typeparam T1
 */
export class MutableSet {
  /**
   * The length of the set
   * @returns the length of the set
   */
  public get size(): number {
    throw new Error("Abstract");
  }

  /**
   * Add value to set
   * @param value value to add
   * @returns true if the value was added, false if it was already in the set
   */
  public add(value: T1): MutableSet {
    value;
    throw new Error("Abstract");
  }

  /**
   * The clear() method removes all elements from a set.
   */
  public clear(): void {
    throw new Error("Abstract");
  }

  /**
   * Create an immutable shallow copy of this set
   *
   * @macro Object.freeze(new Set($self$))
   *
   * @returns an ImmutableSet with the same values as this set
   */
  public copy(): ImmutableSet {
    throw new Error("Macro");
  }

  /**
   * Removes a specified value from a set, if it is in the set.
   * @param value The value to remove from the set.
   * @returns Returns `true` if `value` was already in the set; otherwise `false`.
   */
  public delete(value: T1): boolean {
    value;
    throw new Error("Abstract");
  }

  /**
   * Returns a boolean indicating whether an element with the specified value exists in the set.
   * @param value The value to test for presence in the Set object.
   * @returns `true` if an element with the specified value exists in the set; otherwise `false`.
   */
  public has(value: T1): boolean {
    value;
    throw new Error("Abstract");
  }

  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, "MutableSet");
  }
}
