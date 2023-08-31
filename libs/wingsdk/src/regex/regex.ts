import { InflightClient } from "../core";

/**
 * Regex utilities and functions
 *
 */
export class Util {
  /**
   * regex pattern matching 
   * @param pattern - regex pattern 
   * @param userString - given input string 
   * @returns boolean value true or false;
   */
  public static match(pattern: string , userString: string ): boolean {
    const regex = new RegExp(pattern);
    if (userString.match(regex) == null ) {
        return false;  
    }
    return true;
  }

  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }
  private constructor() {}
}
