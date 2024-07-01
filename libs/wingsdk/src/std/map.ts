// These classes are used by Wing to provide JSII subsets of the JS Map class.
// They should not be consumed directly by users.
// TODO: These should be interfaces, currently Wing does not support interface JSII imports

import { Array } from "./array";
import { T1 } from "./generics";
import { InflightClient } from "../core";

/**
 * Array entry representation
 *
 * @typeparam T1
 */
export interface ArrayEntry {
  /** The entry key */
  readonly key: string;
  /** The entry value */
  readonly value: T1;
}

/**
 * Immutable Map
 *
 * @typeparam T1
 */
export class Map {
  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  private constructor() {}

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
   * @macro ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })($self$, $args$)
   *
   * @param key The key of the element to return.
   * @returns The element associated with the specified key, or throw an error if the key can't be found
   */
  public get(key: string): T1 {
    key;
    throw new Error("Macro");
  }

  /**
   * Optionally returns a specified element from the map.
   *
   * @macro ($self$)?.[$args$]
   *
   * @param key The key of the element to return.
   * @returns The element associated with the specified key, or undefined if the key can't be found
   */
  public tryGet(key: string): T1 | undefined {
    key;
    throw new Error("Macro");
  }

  /**
   * Returns a boolean indicating whether an element with the specified key exists or not.
   * @param key The key of the element to test for presence
   * @returns true if an element with the specified key exists in the map; otherwise false.
   */
  public has(key: string): boolean {
    key;
    throw new Error("Abstract");
  }

  /**
   * Create a mutable shallow copy of this map
   *
   * @macro {...($self$)}
   *
   * @returns a MutableMap with the same values as this map
   */
  public copyMut(): MutMap {
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
  public values(): Array {
    throw new Error("Macro");
  }

  /**
   * Returns the entries from the map.
   *
   * @macro Object.entries($self$).map(([key, value]) => ({ key, value }))
   *
   * @returns the entries as Array<ArrayEntry>
   */
  public entries(): ArrayEntry[] {
    throw new Error("Macro");
  }
}

/**
 * Mutable Map
 *
 * @typeparam T1
 */
export class MutMap {
  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  private constructor() {}

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
   * @macro ({...($self$)})
   *
   * @returns an ImmutableMap with the same values as this map
   */
  public copy(): Map {
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
   * @macro ((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })($self$, $args$)
   *
   * @param key The key of the element to return.
   * @returns The element associated with the specified key, or throw an error if the key can't be found
   */
  public get(key: string): T1 {
    key;
    throw new Error("Macro");
  }

  /**
   * Optionally returns a specified element from the map.
   *
   * @macro ($self$)?.[$args$]
   *
   * @param key The key of the element to return.
   * @returns The element associated with the specified key, or undefined if the key can't be found
   */
  public tryGet(key: string): T1 | undefined {
    key;
    throw new Error("Macro");
  }

  /**
   * Returns a boolean indicating whether an element with the specified key exists or not.
   * @param key The key of the element to test for presence
   * @returns true if an element with the specified key exists in the map; otherwise false.
   */
  public has(key: string): boolean {
    key;
    throw new Error("Abstract");
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
  public values(): Array {
    throw new Error("Macro");
  }

  /**
   * Returns the entries from the map.
   *
   * @macro Object.entries($self$).map(([key, value]) => ({ key, value }))
   *
   * @returns the entries as Array<ArrayEntry>
   */
  public entries(): ArrayEntry[] {
    throw new Error("Macro");
  }
}
