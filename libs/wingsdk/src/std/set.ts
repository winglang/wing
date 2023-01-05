// These classes are used by Wing to provide JSII subsets of the JS Set class.
// They should not be consumed directly by users.
// TODO: These should be interfaces, currently Wing does not support interface JSII imports

/**
 * Immutable Set
 */
export class Set {
  /**
   * The length of the set
   * @returns the length of the set
   */
  public get length(): number {
    throw new Error("Abstract");
  }
}

/**
 * Mutable Set
 */
export class MutSet extends Set {
  /**
   * Add value to set
   * @param value value to add
   * @returns true if the value was added, false if it was already in the set
   */
  public add(value: any): MutSet {
    value;
    throw new Error("Abstract");
  }
}