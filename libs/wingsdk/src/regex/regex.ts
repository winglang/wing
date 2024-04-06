import { InflightClient } from "../core";

/**
 * Regex utilities and functions
 */
export class Util {
  /**
   * Check if a regex pattern is matched by a given string
   * @param pattern - regex pattern
   * @param text - given input string
   * @returns true if it matches the pattern, false otherwise
   */
  public static match(pattern: string, text: string): boolean {
    return new RegExp(pattern).test(text);
  }

  public static compile(pattern: string): Regexp {
    return new Regexp(pattern);
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
 * A regular expression
 */
export class Regexp {
  private regex: RegExp;

  /**
   * Constructs a new Regexp object with the specified pattern.
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
  public matches(text: string): boolean {
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
   * Finds all non-overlapping occurrences of the pattern within the text.
   * @param text The text to search within.
   * @returns An array containing all matches found.
   */
  public findAll(text: string): string[] {
    const globalRegex = new RegExp(this.regex, "g");
    return [...text.matchAll(globalRegex)].map((match) => match[0]);
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
   * Finds the start and end index of all matches within the text.
   * @param text The text to search within.
   * @returns An array containing arrays of start and end indices for each match found.
   */
  public findAllIndex(text: string): number[][] {
    const globalRegex = new RegExp(this.regex, "g");
    const matches = Array.from(text.matchAll(globalRegex));
    return matches.map((match) => [
      match.index as number,
      (match.index as number) + match[0].length,
    ]);
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
    const indices = [[result.index, result.index + result[0].length]];
    result.slice(1).forEach((submatch) => {
      const start = text.indexOf(submatch, indices[indices.length - 1][0]);
      const end = start + submatch.length;
      indices.push([start, end]);
    });
    return indices;
  }

  /**
   * Replaces all occurrences of the match with a replacement string.
   * @param text The text to search and replace within.
   * @param replacement The replacement string.
   * @returns The resulting text after all replacements.
   */
  public replaceAll(text: string, replacement: string): string {
    return text.replace(
      new RegExp(
        this.regex.source,
        this.regex.flags.includes("g")
          ? this.regex.flags
          : this.regex.flags + "g"
      ),
      replacement
    );
  }
}
