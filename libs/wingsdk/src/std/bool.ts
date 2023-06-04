import { Json } from "./json";
import { Code, InflightClient } from "../core";

/**
 * Boolean
 */
export class Boolean {
  /**
   * Parse a boolean from Json.
   *
   * @param json to parse boolean from.
   * @returns a boolean.
   */
  public static fromJson(json: Json): boolean {
    if (typeof json !== "boolean") {
      throw new Error(
        "unable to parse " + typeof json + " " + json + " as a boolean"
      );
    }
    return JSON.parse(JSON.stringify(json));
  }

  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, "Boolean");
  }
}
