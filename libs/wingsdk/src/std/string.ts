// This class is used by Wing to provide JSII subsets of the JS string object.
// They should not be consumed directly by users.
// TODO: This should be an interface, currently Wing does not support interface JSII imports

/**
 * String
 */
export class String {
  /**
   * The length of the string
   */
  public get length(): number {
    throw new Error("Abstract");
  }

  /**
   * Split string by separator
   *
   * @param separator separator to split by
   * @returns array of strings
   */
  public split(separator: string): string[] {
    separator;
    throw new Error("Abstract");
  }

  /**
   * Check if string includes substring
   *
   * @param searchString substring to search for
   * @returns true if string includes substring
   */
  public includes(searchString: string): boolean {
    searchString;
    throw new Error("Abstract");
  }
}
