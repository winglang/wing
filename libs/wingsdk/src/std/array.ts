// These classes are used by Wing to provide JSII subsets of the JS Array class.
// They should not be consumed directly by users.
// TODO: These should be interfaces, currently Wing does not support interface JSII imports

import { T1 } from "./generics";
import { Code, InflightClient } from "../core";

/**
 * Immutable Array
 *
 * @typeparam T1
 */
export class ImmutableArray {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }

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
   * Merge arr to the end of this array
   * @param arr array to merge
   *
   * @returns a new ImmutableArray with the values of this array followed by the values of arr
   */
  public concat(arr: ImmutableArray): ImmutableArray {
    arr;
    throw new Error("Abstract");
  }

  /**
   * Checks if this array includes searchElement.
   *
   * @macro $self$.includes($args$)
   *
   * @param searchElement to search for.
   * @returns true if this array includes searchElement.
   */
  public contains(searchElement: T1): boolean {
    searchElement;
    throw new Error("Macro");
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
   * Returns the index of the first occurrence of searchElement found.
   *
   * @macro $self$.indexOf($args$)
   *
   * @param searchElement to search for.
   * @returns the index of the first occurrence of searchElement found, or -1 if not found.
   */
  public indexOf(searchElement: T1): number {
    searchElement;
    throw new Error("Macro");
  }

  /**
   * Returns a new string containing the concatenated values in this array,
   * separated by commas or a specified separator string. If the array has only
   * one item, then that item will be returned without using the separator.
   *
   * @returns a string containing the concatenated values in this array,
   * separated by commas or a specified separator string.
   */
  public join(separator?: string): string {
    separator;
    throw new Error("Abstract");
  }

  /**
   * Returns the index of the last occurrence of searchElement found.
   *
   * @macro $self$.lastIndexOf($args$)
   *
   * @param searchElement to search for.
   * @returns the index of the last occurrence of searchElement found, or -1 if not found.
   */
  public lastIndexOf(searchElement: T1): number {
    searchElement;
    throw new Error("Macro");
  }
}

/**
 * Mutable Array
 *
 * @typeparam T1
 */
export class MutableArray {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }

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
   * Merge arr to the end of this array
   * @param arr array to merge
   *
   * @returns a new MutableArray with the values of this array followed by the values of arr
   */
  public concat(arr: MutableArray): MutableArray {
    arr;
    throw new Error("Abstract");
  }

  /**
   * Checks if this array includes searchElement.
   *
   * @macro $self$.includes($args$)
   *
   * @param searchElement to search for.
   * @returns true if this array includes searchElement.
   */
  public contains(searchElement: T1): boolean {
    searchElement;
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
   * Returns the index of the first occurrence of searchElement found.
   *
   * @macro $self$.indexOf($args$)
   *
   * @param searchElement to search for.
   * @returns the index of the first occurrence of searchElement found, or -1 if not found.
   */
  public indexOf(searchElement: T1): number {
    searchElement;
    throw new Error("Macro");
  }

  /**
   * Returns a new string containing the concatenated values in this array,
   * separated by commas or a specified separator string. If the array has only
   * one item, then that item will be returned without using the separator.
   *
   * @returns a string containing the concatenated values in this array,
   * separated by commas or a specified separator string.
   */
  public join(separator?: string): string {
    separator;
    throw new Error("Abstract");
  }

  /**
   * Returns the index of the last occurrence of searchElement found.
   *
   * @macro $self$.lastIndexOf($args$)
   *
   * @param searchElement to search for.
   * @returns the index of the last occurrence of searchElement found, or -1 if not found.
   */
  public lastIndexOf(searchElement: T1): number {
    searchElement;
    throw new Error("Macro");
  }

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
