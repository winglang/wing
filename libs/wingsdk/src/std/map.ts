// These classes are used by Wing to provide JSII subsets of the JS Map class.
// They should not be consumed directly by users.
// TODO: These should be interfaces, currently Wing does not support interface JSII imports

import { ImmutableArray } from "./array";
import { T1 } from "./generics";
import { Code, InflightClient } from "../core";

/**
 * Immutable Map
 *
 * @typeparam T1
 */
export class ImmutableMap {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * Returns the number of elements in the map.
   *
   * TODO: For now this has to be a method rather than a getter as macros only work on methods https://github.com/winglang/wing/issues/1658
   * @macro Object.keys($self$).length
   *
   * @returns The number of elements in map
   */
  public size(): number {
    throw new Error("Macro");
  }

  /**
   * Returns a specified element from the map.
   *
   * If the value that is associated to the provided key is an object, then you will get a reference
   * to that object and any change made to that object will effectively modify it inside the map.
   *
   * @macro ($self$)[$args$]
   *
   * @param key The key of the element to return.
   * @returns The element associated with the specified key, or undefined if the key can't be found
   */
  public get(key: string): T1 {
    key;
    throw new Error("Macro");
  }

  /**
   * Returns a boolean indicating whether an element with the specified key exists or not.
   *
   * @macro ($args$ in ($self$))
   *
   * @param key The key of the element to test for presence
   * @returns true if an element with the specified key exists in the map; otherwise false.
   */
  public has(key: string): boolean {
    key;
    throw new Error("Macro");
  }

  /**
   * Create a mutable shallow copy of this map
   *
   * @macro {...($self$)}
   *
   * @returns a MutableMap with the same values as this map
   */
  public copyMut(): MutableMap {
    throw new Error("Macro");
  }

  /**
   * Returns the keys of this map
   *
   * @macro Object.keys($self$)
   *
   * @returns an array containing the keys of this map
   */
  public keys(): string[] {
    throw new Error("Macro");
  }

  /**
   * Returns the values of this map
   *
   * @macro Object.values($self$)
   *
   * @returns an array of type T containing the values of this map
   */
  public values(): ImmutableArray {
    throw new Error("Macro");
  }
}

/**
 * Mutable Map
 *
 * @typeparam T1
 */
export class MutableMap {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * Returns the number of elements in the map.
   *
   * TODO: For now this has to be a method rather than a getter as macros only work on methods https://github.com/winglang/wing/issues/1658
   * @macro Object.keys($self$).length
   *
   * @returns The number of elements in map
   */
  public size(): number {
    throw new Error("Macro");
  }

  /**
   * Removes all elements
   *
   * @macro ((map) => { for(const k in map){delete map[k]}; })($self$)
   */
  public clear(): void {
    throw new Error("Macro");
  }

  /**
   * Create an immutable shallow copy of this map
   *
   * @macro Object.freeze({...($self$)})
   *
   * @returns an ImmutableMap with the same values as this map
   */
  public copy(): ImmutableMap {
    throw new Error("Macro");
  }

  /**
   * Removes the specified element from a map.
   *
   * @macro (delete ($self$)[$args$])
   *
   * @param key The key
   * @returns true if the given key is no longer present
   */
  public delete(key: string): boolean {
    key;
    throw new Error("Macro");
  }

  /**
   * Returns a specified element from the map.
   *
   * If the value that is associated to the provided key is an object, then you will get a reference
   * to that object and any change made to that object will effectively modify it inside the map.
   *
   * @macro ($self$)[$args$]
   *
   * @param key The key of the element to return.
   * @returns The element associated with the specified key, or undefined if the key can't be found
   */
  public get(key: string): T1 {
    key;
    throw new Error("Macro");
  }

  /**
   * Returns a boolean indicating whether an element with the specified key exists or not.
   *
   * @macro ($args$ in ($self$))
   *
   * @param key The key of the element to test for presence
   * @returns true if an element with the specified key exists in the map; otherwise false.
   */
  public has(key: string): boolean {
    key;
    throw new Error("Macro");
  }

  /**
   * Adds or updates an entry in a Map object with a specified key and a value.
   *
   * TODO: revisit this macro after we support indexed args https://github.com/winglang/wing/issues/1659
   * @macro ((obj, args) => { obj[args[0]] = args[1]; })($self$, [$args$])
   *
   * @param key The key of the element to add
   * @param value The value of the element to add
   */
  public set(key: string, value: T1): void {
    key;
    value;
    throw new Error("Macro");
  }

  /**
   * Returns the keys of this map
   *
   * @macro Object.keys($self$)
   *
   * @returns an array containing the keys of this map
   */
  public keys(): string[] {
    throw new Error("Macro");
  }

  /**
   * Returns the values of this map
   *
   * @macro Object.values($self$)
   *
   * @returns an array containing of type T the values of this map
   */
  public values(): ImmutableArray {
    throw new Error("Macro");
  }
}
