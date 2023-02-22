// This class is used by Wing to provide JSII subsets of the JS string object.
// They should not be consumed directly by users.
// TODO: This should be an interface, currently Wing does not support interface JSII imports

/**
 * String
 */
export class String {
  /**
   * The length of the string.
   */
  public get length(): number {
    throw new Error("Abstract");
  }

  /**
   * Returns the character at the specified index.
   *
   * @param index position of the character.
   * @returns string at the specified index.
   */
  public at(index: number): string {
    index;
    throw new Error("Abstract");
  }

  /**
   * Combines the text of two (or more) strings and returns a new string.
   *
   * @param strN one or more strings to concatenate to this string.
   * @returns a new combined string.
   */
  public concat(...strN: string[]): string {
    strN;
    throw new Error("Abstract");
  }

  /**
   * Checks if string includes substring.
   *
   * @macro $self$.includes($args$)
   *
   * @param searchString substring to search for.
   * @returns true if string includes substring.
   */
  public contains(searchString: string): boolean {
    searchString;
    throw new Error("Macro");
  }

  /**
   * Does this string end with the given searchString?
   *
   * @macro $self$.endsWith($args$)
   *
   * @param searchString substring to search for.
   * @returns true if string ends with searchString.
   */
  public ends(searchString: string): boolean {
    searchString;
    throw new Error("Abstract");
  }

  /**
   * Returns the index of the first occurrence of searchString found.
   *
   * @macro $self$.indexOf($args$)
   *
   * @param searchString substring to search for.
   * @returns the index of the first occurrence of searchString found, or -1 if not found.
   */
  public indexOf(searchString: string): number {
    searchString;
    throw new Error("Abstract");
  }

  /**
   * Returns this string in lower case.
   *
   * @macro $self$.toLowerCase()
   *
   * @returns a new lower case string.
   */
  public lCase(): string {
    throw new Error("Abstract");
  }

  /**
   * Splits string by separator.
   *
   * @param separator separator to split by.
   * @returns array of strings.
   */
  public split(separator: string): string[] {
    separator;
    throw new Error("Abstract");
  }

  /**
   * Does this string start with the given searchString?
   *
   * @macro $self$.startsWith($args$)
   *
   * @param searchString substring to search for.
   * @returns true if string starts with searchString.
   */
  public starts(searchString: string): boolean {
    searchString;
    throw new Error("Abstract");
  }

  /**
   * Returns a string between indexStart, indexEnd.
   *
   * @param indexStart index of the character we slice at.
   * @param indexEnd optional - index of the character we end slicing at.
   * @returns the string contained from indexStart to indexEnd.
   */
  public substring(indexStart: number, indexEnd?: number): string {
    indexStart;
    indexEnd;
    throw new Error("Abstract");
  }

  /**
   * Removes white spaces from start and end of this string.
   *
   * @returns a new string with white spaces removed from start and end.
   */
  public trim(): string {
    throw new Error("Abstract");
  }

  /**
   * Returns this string in upper case.
   *
   * @macro $self$.toUpperCase()
   *
   * @returns a new upper case string.
   */
  public uCase(): string {
    throw new Error("Abstract");
  }
}
