import { Validator } from "jsonschema";
import { T1 } from "./generics";
import { Json } from "./json";
import { Code, InflightClient } from "../core";

/**
 * Shared behavior for all structs
 *
 * @typeparam T1
 */
export class Struct {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * Converts a Json to a Struct
   *
   * @macro ($self$.fromJson($args$))
   */
  public static fromJson(json: Json): T1 {
    json;
    throw new Error("Macro");
  }

  /**
   * Converts a Json to a Struct, returning nil if the Json is not valid
   *
   * @macro (() => { try { return $self$.fromJson($args$); } catch { return undefined; }})();
   */
  public static tryFromJson(json: Json): T1 | undefined {
    json;
    throw new Error("Macro");
  }

  /**
   * Validates a Json object against a schema
   *
   * The expected schema format: https://json-schema.org/
   *
   * @param obj Json object to validate
   * @param schema schema to validate against
   *
   * @internal
   */
  public static _validate(obj: Json, schema: any): Json {
    const validator = new Validator();
    const result = validator.validate(obj, schema);
    if (result.errors.length > 0) {
      throw new Error(
        `unable to parse ${schema.id.replace("/", "")}:\n ${result.errors.join(
          "\n- "
        )}`
      );
    }
    return obj;
  }

  private constructor() {}
}
