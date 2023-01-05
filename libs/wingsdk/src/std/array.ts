// These classes are used by Wing to provide JSII subsets of the JS Array class.
// They should not be consumed directly by users.
// TODO: These should be interfaces, currently Wing does not support interface JSII imports

/**
 * Immutable Array
 */
export class Array {
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
  public at(index: number): any {
    index;
    throw new Error("Abstract");
  }
}

/**
 * Mutable Array
 */
export class MutArray extends Array {
  /**
   * Add value to end of array
   * @param value value to add
   */
  public push(value: any): void {
    value;
    throw new Error("Abstract");
  }

  /**
   * Remove value from end of array
   * @returns the value removed
   */
  public pop(): any {
    throw new Error("Abstract");
  }
}