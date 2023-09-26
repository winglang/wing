// These classes are used by Wing to provide JSII subsets of the JS Array class.
// They should not be consumed directly by users.
// TODO: These should be interfaces, currently Wing does not support interface JSII imports

import { T1 } from "./generics";
import { InflightClient } from "../core";

/**
 * Immutable Array
 *
 * @typeparam T1
 */
export class Array {
  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  private constructor() {}

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
   * Get the value at the given index, returning nil if the index is out of bounds.
   *
   * @macro ($self$.at($args$))
   *
   * @param index index of the value to get
   * @returns the value at the given index, or undefined if the index is out of bounds
   */
  public tryAt(index: number): T1 | undefined {
    index;
    throw new Error("Macro");
  }

  /**
   * Merge arr to the end of this array
   * @param arr array to merge
   *
   * @returns a new ImmutableArray with the values of this array followed by the values of arr
   */
  public concat(arr: Array): Array {
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
  public copyMut(): MutArray {
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
export class MutArray {
  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  private constructor() {}

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
  public concat(arr: MutArray): MutArray {
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
   * @macro [...($self$)]
   *
   * @returns an ImmutableArray with the same values as this array
   */
  public copy(): Array {
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

  /**
   * Removes value from the given index of an array
   *
   * @macro ((obj, args) => { if (args[0] < 0 || args[0] >= $self$.length) throw new Error("Index out of bounds"); return obj.splice(args[0], 1)[0]; })($self$, [$args$])
   *
   * @param index the index to remove the value at
   * @returns the value removed
   * @throws index out of bounds error if the given index does not exist for the array
   */
  public popAt(index: number): T1 {
    index;
    throw new Error("Macro");
  }

  /**
   * Sets a new value at the given index of an array
   *
   * @macro ((obj, args) => { if (args[0] < 0 || args[0] >= $self$.length) throw new Error("Index out of bounds"); obj[args[0]] = args[1]; })($self$, [$args$])
   *
   * @param index the index to set the value at
   * @param value the value to set at the given index
   * @throws index out of bounds error if the given index does not exist for the array
   */
  public set(index: number, value: T1): void {
    index;
    value;
    throw new Error("Macro");
  }

  /**
   * Inserts a new value at the given index of an array
   *
   * @macro ((obj, args) => { if (args[0] < 0 || args[0] > $self$.length) throw new Error("Index out of bounds"); obj.splice(args[0], 0, args[1]); })($self$, [$args$])
   *
   * @param index the index to insert the value at
   * @param value the value to insert at the given index
   * @throws index out of bounds error if the given index isn't valid
   */
  public insert(index: number, value: T1): void {
    index;
    value;
    throw new Error("Macro");
  }

  /**
   * Removes first occurence of a given value in an array
   *
   * @macro ((obj, args) => { if (obj.indexOf(args[0]) !== -1) { obj.splice(obj.indexOf(args[0]), 1); return true; } return false; })($self$, [$args$])
   *
   * @param value the value to remove
   * @returns true if value was removed
   */
  public removeFirst(value: T1): boolean {
    value;
    throw new Error("Macro");
  }
}
