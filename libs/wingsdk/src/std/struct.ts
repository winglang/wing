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
   * This macro takes a Json object and the Struct definition file name then calls the validate method
   *
   * @macro ((j, s) => {return s._validate(j)})($args$, $self$)
   */
  public static fromJson(json: Json): T1 {
    json;
    throw new Error("Macro");
  }

  /** @internal */
  public static _getValidator(deps?: { [key: string]: any }): Validator {
    const validator = new Validator();

    if (deps !== undefined) {
      for (const [key, value] of Object.entries(deps)) {
        validator.addSchema(value, key);
      }
    }

    return validator;
  }

  private constructor() {}
}
