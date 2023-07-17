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
   * @macro (function validateSchema(j, s, p = "") { for (const key in s) { const type = s[key]; let jsonValueAtKey = j[key]; let jsonValueType = typeof jsonValueAtKey; if(typeof type === "object") {const valid = validateSchema(jsonValueAtKey, type, `${p}.${key}`); continue;}; if (!type.includes(jsonValueType)) {throw new Error(`key \"${p}.${key}\" expected type of \"${type}\", but received type of: \"${jsonValueType}\"`);}}return j;})($args$, $struct_fields$, "$struct_name$")
   */
  public static fromJson(json: Json): T1 {
    json;
    throw new Error("Macro")
  }
}