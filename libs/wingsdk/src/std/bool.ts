import { Json, JsonValidationOptions } from "./json";
import { JsonSchema } from "./json_schema";
import { InflightClient } from "../core";

/**
 * Boolean
 * @wingType bool
 */
export class Boolean {
  /**
   * Parse a boolean from Json.
   *
   * @param json to parse boolean from.
   * @returns a boolean.
   */
  public static fromJson(json: Json, options?: JsonValidationOptions): boolean {
    const schema = JsonSchema._createJsonSchema({
      $id: "bool",
      type: "boolean",
    } as any);
    schema.validate(json, options);
    return json as any;
  }

  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  private constructor() {}
}
