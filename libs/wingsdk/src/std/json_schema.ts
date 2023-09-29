import { Validator } from "jsonschema";
import { Json, JsonValidationOptions } from "./json";
import { InflightClient } from "../core";

/**
 * Struct Schema
 */
export class JsonSchema {
  /**
   * @internal
   */
  public static _toInflightType(schema: Json) {
    return InflightClient.forType(
      __filename,
      `${this.name}._createJsonSchema(${JSON.stringify(schema)})`
    );
  }

  /**
   * Static method for creating a StructSchema used for lifting a struct to an inflight type
   *
   * @internal
   */
  public static _createJsonSchema(schema: Json): JsonSchema {
    return new JsonSchema(schema);
  }

  private jsonSchema: any;
  private validator: Validator;

  constructor(schema: Json) {
    this.jsonSchema = schema;
    this.validator = new Validator();
  }

  /**
   * Attempt to validate a json object against the schema
   *
   * @param obj the Json object to validate
   * @throws an error if the json object is not valid
   */
  public validate(obj: Json, options?: JsonValidationOptions) {
    if (options?.unsafe) {
      return; // skip validation
    }

    const result = this.validator.validate(obj, this.jsonSchema);
    if (result.errors.length > 0) {
      throw new Error(
        `unable to parse ${this.jsonSchema.id.replace(
          "/",
          ""
        )}:\n- ${result.errors.join("\n- ")}`
      );
    }
  }

  /**
   * Retrieve the json schema as a string
   *
   * @returns the schema as a string
   */
  public asStr(): String {
    return JSON.stringify(this.jsonSchema);
  }

  /** @internal */
  public _fromJson(obj: Json, validateOptions?: JsonValidationOptions) {
    this.validate(obj, validateOptions);
    return obj;
  }

  /** @internal */
  public _tryFromJson(obj: Json) {
    try {
      return this._fromJson(obj);
    } catch {
      return undefined;
    }
  }

  /** @internal */
  public _toInflightType() {
    return JsonSchema._toInflightType(this.jsonSchema);
  }
}
