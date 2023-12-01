import { Json, JsonValidationOptions } from "./json";
import { JsonSchema } from "./json_schema";
import { InflightClient } from "../core";

/**
 * Number
 * @wingType num
 */
export class Number {
  /**
   * Parse a number from Json.
   *
   * @param json to parse number from.
   * @returns a number.
   */
  public static fromJson(json: Json, options?: JsonValidationOptions): number {
    const schema = JsonSchema._createJsonSchema({
      id: "num",
      type: "number",
    } as any);
    schema.validate(json, options);
    return json as any;
  }

  /**
   * Parse a number from string.
   *
   * @macro ((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return new Number(args) })($args$)
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
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  private constructor() {}
}
