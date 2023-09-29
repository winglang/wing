import { T1 } from "./generics";
import { Json, JsonValidationOptions } from "./json";
import { JsonSchema } from "./json_schema";
import { InflightClient } from "../core";

/**
 * Shared behavior for all structs
 *
 * @typeparam T1
 */
export class Struct {
  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * Converts a Json to a Struct
   *
   * @macro ((json, validateOptions) => ($self$._fromJson(json, validateOptions)))($args$)
   */
  public static fromJson(json: Json, options?: JsonValidationOptions): T1 {
    json;
    options;
    throw new Error("Macro");
  }

  /**
   * Converts a Json to a Struct, returning nil if the Json is not valid
   *
   * @macro ((json) => ($self$._tryFromJson(json)))($args$)
   */
  public static tryFromJson(json: Json): T1 | undefined {
    json;
    throw new Error("Macro");
  }

  /**
   * Retrieve the schema for this struct
   * @macro ($self$)
   */
  public static schema(): JsonSchema {
    throw new Error("Macro");
  }

  /**
   * Create an instance of a StructSchema from a JsonSchema
   *
   * @internal
   */
  public static _createJsonSchema(schema: Json): JsonSchema {
    return new JsonSchema(schema);
  }

  private constructor() {}
}
