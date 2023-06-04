import { Json } from "./json";
import { Code, InflightClient } from "../core";

/**
 * Number
 */
export class Number {
  /**
   * Parse a number from Json.
   *
   * @macro ((args) => { if (typeof args !== "number") {throw new Error("unable to parse " + typeof args + " " + args + " as a number")}; return JSON.parse(JSON.stringify(args)) })($args$)
   *
   * @param json to parse number from.
   * @returns a number.
   */
  public static fromJson(json: Json): number {
    json;
    throw new Error("Macro");
  }

  /**
   * Parse a number from string.
   *
   * @macro ((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })($args$)
   *
   * @param str to parse number from.
   * @returns a number.
   */
  public static fromStr(str: string): number {
    str;
    throw new Error("Macro");
  }

  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, "Number");
  }
}
