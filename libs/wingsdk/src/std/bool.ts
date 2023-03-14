import { Json } from "./json";

/**
 * Boolean
 */
export class Boolean {
  /**
   * Parse a boolean from Json.
   *
   * @macro ((args) => { if (typeof args !== "boolean") {throw new Error("unable to parse " + typeof args + " " + args + " as a boolean")}; return JSON.parse(JSON.stringify(args)) })($args$)
   *
   * @param json to parse boolean from.
   * @returns a boolean.
   */
  public static fromJson(json: Json): boolean {
    json;
    throw new Error("Macro");
  }
}
