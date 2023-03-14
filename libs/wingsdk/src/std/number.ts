import { Json } from "./json";

/**
 * Number
 */
export class Number {
  /**
   * Parse a number from Json.
   *
   * @macro ((args) => { if (typeof args !== "number") {throw new Error("unable to parse" + " " + typeof args + " " + args + " as a number")}; return JSON.parse(JSON.stringify(args)) })($args$)
   *
   * @param json to parse number from.
   * @returns a number.
   */
  public static fromJson(json: Json): number {
    json;
    throw new Error("Macro");
  }
}
