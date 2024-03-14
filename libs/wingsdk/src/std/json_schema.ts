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

  /** @internal */
  public _rawSchema: any;
  private validator: Validator;

  constructor(schema: Json) {
    this._rawSchema = schema;
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

    const result = this.validator.validate(obj, this._rawSchema);
    if (result.errors.length > 0) {
      throw new Error(
        `unable to parse ${this._rawSchema.$id.replace(
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
    return JSON.stringify(this._rawSchema);
  }

  /** @internal */
  public _fromJson(obj: Json, validateOptions?: JsonValidationOptions) {
    this.validate(obj, validateOptions);
    const fields = this.extractFieldsFromSchema(this._rawSchema);
    // Filter rawParameters based on the schema
    const filteredParameters = this.filterParametersBySchema(fields, obj);
    return filteredParameters;
  }

  /**
   * Extracts the field names from the JSON Schema.
   */
  private extractFieldsFromSchema(schema: any): Set<string> {
    const fields = new Set<string>();

    if (schema.properties) {
      for (const key of Object.keys(schema.properties)) {
        fields.add(key);
      }
    }

    // Add handling for other schema constructs as necessary, such as nested objects or arrays

    return fields;
  }

  /**
   * Filters the parameters object to only include fields that are present in the schema.
   */
  private filterParametersBySchema(fields: Set<string>, parameters: any): any {
    const filtered: any = {};

    for (const field of fields) {
      if (parameters.hasOwnProperty(field)) {
        filtered[field] = parameters[field];
      }
    }

    return filtered;
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
  public _tryParseJson(json: string | undefined) {
    try {
      return this._fromJson(JSON.parse(json!));
    } catch {
      return undefined;
    }
  }

  /** @internal */
  public _toInflightType() {
    return JsonSchema._toInflightType(this._rawSchema);
  }
}
