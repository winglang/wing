import Ajv from "ajv";
import { Json, JsonValidationOptions } from "./json";
import { Duration } from "./duration";
import { Regex } from "./regex";
import { InflightClient } from "../core";
import {
  extractFieldsFromSchema,
  filterParametersBySchema,
} from "../platform/util";

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
      `${this.name}._createJsonSchema(${JSON.stringify(schema)})`,
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
  private validator: Ajv;

  constructor(schema: Json) {
    this._rawSchema = schema;
    this.validator = new Ajv({ allErrors: true, allowUnionTypes: true });
    // register the custom formats used to mark `duration`/`regex` struct fields
    // in the schema (their string representation is always considered valid)
    this.validator.addFormat("duration", true);
    this.validator.addFormat("regex", true);
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
    const validator = this.validator.compile(this._rawSchema);
    const valid = validator(obj);
    if (!valid) {
      const schemaId = this._rawSchema.$id.replace("/", "");
      throw new Error(
        `unable to parse ${schemaId}:\n- ${validator.errors
          ?.map(
            (error: any) => schemaId + error.instancePath + " " + error.message,
          )
          .join("\n- ")}`,
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
    const fields = extractFieldsFromSchema(this._rawSchema);
    // Filter rawParameters based on the schema
    const filteredParameters = filterParametersBySchema(fields, obj);

    // Remove all `null` values (recursively), then convert any `duration`/`regex`
    // values from their string representation into their corresponding objects.
    const cleanedParameters = convertValuesBySchema(
      removeNullValues(filteredParameters),
      this._rawSchema,
    );
    return cleanedParameters;
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

function removeNullValues(obj: any): any {
  if (typeof obj === "object" && !Array.isArray(obj)) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== null) {
        result[key] = removeNullValues(value);
      }
    }
    return result;
  }

  return obj;
}

/**
 * Walks a value alongside the corresponding JSON schema and converts any
 * `duration` or `regex` fields (represented as strings) into their winged
 * counterpart objects so that structs produced by `fromJson` hold real
 * `Duration`/`Regex` instances rather than raw strings.
 */
function convertValuesBySchema(value: any, schema: any): any {
  if (value === undefined || value === null) {
    return value;
  }

  const format = schema?.format;
  if (format === "duration") {
    return Duration.fromMilliseconds(parseInt(value, 10));
  }
  if (format === "regex") {
    // strip the leading "/" and trailing "/" (and any trailing flags) of a
    // JavaScript RegExp string representation, e.g. "/p[a-z]+ch/" -> "p[a-z]+ch"
    const match = /^\/(.*)\/([a-z]*)$/.exec(String(value));
    const pattern = match ? match[1] : String(value);
    return Regex.compile(pattern);
  }

  if (Array.isArray(value)) {
    const items = schema?.items;
    return value.map((item) => convertValuesBySchema(item, items));
  }

  if (Array.isArray(schema?.oneOf)) {
    // oneOf is used for optional fields: pick the branch that isn't `null`
    const nonNull = schema.oneOf.find((s: any) => s.type !== "null");
    return convertValuesBySchema(value, nonNull);
  }

  if (typeof value === "object" && value !== null) {
    const properties = schema?.properties;
    const patternProperties = schema?.patternProperties;
    const result: any = {};
    for (const [key, val] of Object.entries(value)) {
      const fieldSchema =
        properties?.[key] ??
        (patternProperties
          ? Object.values(patternProperties).find((_) => true)
          : undefined);
      result[key] = convertValuesBySchema(val, fieldSchema);
    }
    return result;
  }

  return value;
}
