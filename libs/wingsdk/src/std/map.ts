// These classes are used by Wing to provide JSII subsets of the JS Array class.
// They should not be consumed directly by users.
// TODO: These should be interfaces, currently Wing does not support interface JSII imports

/**
 * Immutable Map
 */
export class ImmutableMap {
  /**
   * Returns the number of elements in the map.
   */
  public get size(): number {
    throw new Error("Abstract");
  }

  /**
   * Returns a specified element from the map.
   *
   * If the value that is associated to the provided key is an object, then you will get a reference
   * to that object and any change made to that object will effectively modify it inside the map.
   *
   * @param key The key of the element to return.
   * @returns The element associated with the specified key, or undefined if the key can't be found
   */
  public get(key: string): any {
    key;
    throw new Error("Abstract");
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
}

/**
 * Mutable Map
 */
export class MutableMap extends ImmutableMap {
  /**
   * Removes all elements
   */
  public clear(): void {
    throw new Error("Abstract");
  }

  /**
   * Removes the specified element from a map.
   * @param key The key
   * @returns true if the element was in the map
   */
  public delete(key: string): boolean {
    key;
    throw new Error("Abstract");
  }

  /**
   * Adds or updates an entry in a Map object with a specified key and a value.
   * @param key The key of the element to add
   * @param value The value of the element to add
   */
  public set(key: string, value: any): void {
    key;
    value;
    throw new Error("Abstract");
  }
}
