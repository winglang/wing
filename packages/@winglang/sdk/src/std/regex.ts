import { ILiftable } from "./resource";
import { InflightClient } from "../core";
import { normalPath } from "../shared/misc";

/**
 * Represents a compiled regular expression pattern.
 * @wingType regex
 */
export class Regex implements ILiftable {
  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * Compiles the provided regex pattern into a `Regex` object.
   * @param pattern The regex pattern to compile.
   * @returns A new `Regex` object representing the compiled pattern.
   */
  public static compile(pattern: string): Regex {
    return new Regex(pattern);
  }

  /** @internal */
  private readonly _regex: RegExp;

  /**
   * Constructs a new `Regex` object with the specified pattern.
   * @param pattern The regular expression pattern.
   */
  private constructor(pattern: string) {
    this._regex = new RegExp(pattern);
  }

  /** @internal */
  public _toInflight(): string {
    return `(new (require("${normalPath(__filename)}").Regex)(${this._regex}))`;
  }

  /**
   * Checks if the regular expression matches the provided text.
   * @param text The text to check against.
   * @returns `true` if there is a match, otherwise `false`.
   */
  public test(text: string): boolean {
    return this._regex.test(text);
  }

  /**
   * Finds the first occurrence of the pattern within the text.
   * @param text The text to search within.
   * @returns The first match if found, otherwise `undefined`.
   */
  public find(text: string): string | undefined {
    const result = text.match(this._regex);
    return result ? result[0] : undefined;
  }

  /**
   * Finds the start and end index of the first match within the text.
   * @param text The text to search within.
   * @returns An array containing the start and end index of the match if found, otherwise `undefined`.
   */
  public findIndex(text: string): number[] | undefined {
    const result = this._regex.exec(text);
    return result ? [result.index, result.index + result[0].length] : undefined;
  }

  /**
   * Finds the first match and its submatches.
   * @param text The text to search within.
   * @returns An array containing the match and all submatches.
   */
  public findSubmatch(text: string): string[] | undefined {
    const result = text.match(this._regex);
    if (result) {
      return [result[0], ...result.slice(1)];
    }
    return undefined;
  }

  /**
   * Finds the start and end index of the match and all submatches.
   * @param text The text to search within.
   * @returns An array containing arrays of start and end indices for the match and all submatches.
   */
  public findSubmatchIndex(text: string): number[][] | undefined {
    const result = this._regex.exec(text);
    if (!result) {
      return undefined;
    }

    // Initialize the array with the match's start and end indices
    const indices = [[result.index, result.index + result[0].length]];

    // Add submatch indices
    result.slice(1).forEach((submatch) => {
      const start = text.indexOf(submatch, indices[indices.length - 1][0]);
      const end = start + submatch.length;
      indices.push([start, end]);
    });

    return indices;
  }

  /**
   * Finds all non-overlapping occurrences of the pattern within the text.
   * Returns an empty array if no matches are found.
   * @param text The text to search within.
   * @returns An array containing all matches found.
   */
  public findAll(text: string): string[] {
    const globalRegex = this.getGlobalRegex();
    return [...text.matchAll(globalRegex)].map((match) => match[0]);
  }

  /**
   * Finds the start and end index of all matches within the text.
   * Indices are zero-based.
   * @param text The text to search within.
   * @returns An array containing arrays of start and end indices for each match found.
   */
  public findAllIndex(text: string): number[][] {
    const matches: number[][] = [];
    const globalRegex = this.getGlobalRegex();

    for (const match of text.matchAll(globalRegex)) {
      if (match.index !== undefined) {
        matches.push([match.index, match.index + match[0].length]);
      }
    }

    return matches;
  }

  /**
   * Replaces all occurrences of the match with a replacement string.
   * @param text The text to search and replace within.
   * @param replacement The replacement string.
   * @returns The resulting text after all replacements.
   */
  public replaceAll(text: string, replacement: string): string {
    const globalRegex = this.getGlobalRegex();
    return text.replace(globalRegex, replacement);
  }

  /**
   * Helper method to get the global version of a regex.
   * @returns The current regex if it's already global, otherwise a new global regex.
   */
  private getGlobalRegex(): RegExp {
    return this._regex.global ? this._regex : new RegExp(this._regex, "g");
  }
}
