// These classes are used by Wing to provide JSII subsets of the JS Array class.
// They should not be consumed directly by users.
// TODO: These should be interfaces, currently Wing does not support interface JSII imports

import { T1 } from "./util";

/**
 * Immutable Array
 *
 * @typeparam T1
 */
export class ImmutableArray {
  /**
   * The length of the array
   * @returns the length of the array
   */
  public get length(): number {
    throw new Error("Abstract");
  }

  /**
   * Get the value at the given index
   * @param index index of the value to get
   * @returns the value at the given index
   */
  public at(index: number): T1 {
    index;
    throw new Error("Abstract");
  }

  /**
   * Create a mutable clone of this array
   * 
   * @macro [...($self$)]
   * 
   * @returns a MutableArray with the same values as this array
   */
  public mutClone(): MutableArray {
    throw new Error("Abstract");
  }

  /**
   * Create an immutable clone of this array
   * 
   * @macro Object.freeze([...($self$)])
   * 
   * @returns an ImmutableArray with the same values as this array
   */
  public clone(): ImmutableArray {
    throw new Error("Abstract");
  }
}

/**
 * Mutable Array
 *
 * @typeparam T1
 */
export class MutableArray extends ImmutableArray {
  /**
   * Add value to end of array
   * @param value value to add
   */
  public push(value: T1): void {
    value;
    throw new Error("Abstract");
  }

  /**
   * Remove value from end of array
   * @returns the value removed
   */
  public pop(): T1 {
    throw new Error("Abstract");
  }
}
