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
   * Create a mutable shallow copy of this array
   *
   * @macro [...($self$)]
   *
   * @returns a MutableArray with the same values as this array
   */
  public copyMut(): MutableArray {
    throw new Error("Macro");
  }

  /**
   * Create an immutable shallow copy of this array
   *
   * @macro Object.freeze([...($self$)])
   *
   * @returns an ImmutableArray with the same values as this array
   */
  public copy(): ImmutableArray {
    throw new Error("Macro");
  }

  /**
   *  Creates and returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string.
   *
   * @param separator Specifies a string to separate each pair of adjacent elements of the array. The separator is converted to a string if necessary. If omitted, the array elements are separated with a comma (",").
   * @returns A string with all array elements joined. If the array has a length of 0, an empty string is returned.

   */
  public join(separator?: string): string {
    separator;
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
