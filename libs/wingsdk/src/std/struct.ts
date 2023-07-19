import { T1 } from "./generics";
import { Code, InflightClient } from "../core";
import { Json } from "./json";

/**
 * Base class for all structs
 * 
 * @typeparam T1
 */
export class BaseStruct {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }

  private constructor() {}

  /**
   * Converts a json to struct
   * 
   * @macro ((j, s) => {for (const key in s) {const expectedType = s[key];const actualType = typeof j[key]; if (!expectedType.includes(actualType)) {throw new Error(`key "${key}" expected type of "${expectedType}", but received type of: "${actualType}"`);}}; return j;})($args$, $self$)
   */
  public static fromJson(json: Json): T1 {
    json;
    throw new Error("Macro")
  }
}