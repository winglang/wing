// This class is used by Wing to provide JSII subsets of the JS string object.
// They should not be consumed directly by users.
// TODO: This should be an interface, currently Wing does not support interface JSII imports

import { Json } from "./json";
import { Code, InflightClient } from "../core";

/**
 * String
 */
export class String {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * Parse string from Json.
   *
   * @macro ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })($args$)
   *
   * @param json to create string from.
   * @returns a string.
   */
  public static fromJson(json: Json): string {
    json;
    throw new Error("Macro");
  }

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
  public concat(strN: string): string {
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
  public endsWith(searchString: string): boolean {
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
    throw new Error("Macro");
  }

  /**
   * Returns this string in lower case.
   *
   * @macro $self$.toLocaleLowerCase()
   *
   * @returns a new lower case string.
   */
  public lowercase(): string {
    throw new Error("Macro");
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
  public startsWith(searchString: string): boolean {
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
   * @macro $self$.toLocaleUpperCase()
   *
   * @returns a new upper case string.
   */
  public uppercase(): string {
    throw new Error("Macro");
  }
}
