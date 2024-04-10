import { InflightClient } from "../core";

/**
 * Regex utilities and functions
 */
export class Util {
  /**
   * Checks whether a given string matches a specified regex pattern.
   * @param pattern The regex pattern to match against.
   * @param text The input string to check for a match.
   * @returns `true` if the pattern matches the input string, otherwise `false`.
   */
  public static match(pattern: string, text: string): boolean {
    return new RegExp(pattern).test(text);
  }

  /**
   * Compiles the provided regex pattern into a `Regex` object.
   * @param pattern The regex pattern to compile.
   * @returns A new `Regex` object representing the compiled pattern.
   */
  public static compile(pattern: string): Regex {
    return new Regex(pattern);
  }

  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }
  private constructor() {}
}

/**
 * Represents a compiled regular expression pattern.
 * @wingType regex
 */
export class Regex {
  private regex: RegExp;

  /**
   * Constructs a new `Regex` object with the specified pattern.
   * @param pattern The regular expression pattern.
   */
  constructor(pattern: string) {
    this.regex = new RegExp(pattern);
  }

  /**
   * Checks if the regular expression matches the provided text.
   * @param text The text to check against.
   * @returns true if there is a match, otherwise false.
   */
  public test(text: string): boolean {
    return this.regex.test(text);
  }

  /**
   * Finds the first occurrence of the pattern within the text.
   * @param text The text to search within.
   * @returns The first match if found, otherwise `undefined`.
   */
  public find(text: string): string | undefined {
    const result = text.match(this.regex);
    return result ? result[0] : undefined;
  }

  /**
   * Finds the start and end index of the first match within the text.
   * @param text The text to search within.
   * @returns An array containing the start and end index of the match if found, otherwise `undefined`.
   */
  public findIndex(text: string): number[] | undefined {
    const result = this.regex.exec(text);
    return result ? [result.index, result.index + result[0].length] : undefined;
  }

  /**
   * Finds the first match and its submatches.
   * @param text The text to search within.
   * @returns An array containing the match and all submatches.
   */
  public findSubmatch(text: string): string[] | undefined {
    const result = text.match(this.regex);
    return result ?? undefined;
  }

  /**
   * Finds the start and end index of the match and all submatches.
   * @param text The text to search within.
   * @returns An array containing arrays of start and end indices for the match and all submatches.
   */
  public findSubmatchIndex(text: string): number[][] | undefined {
    const result = this.regex.exec(text);
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

    let match;
    while ((match = globalRegex.exec(text)) !== null) {
      matches.push([match.index, match.index + match[0].length]);
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
    return this.regex.global ? this.regex : new RegExp(this.regex, "g");
  }
}
