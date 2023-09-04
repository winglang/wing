import { Validator } from "jsonschema";
import { Json } from "./json";
import { InflightClient } from "../core";

/**
 * Struct Schema
 */
export class StructSchema {
  /**
   * @internal
   */
  public static _toInflightType(schema: any) {
    return InflightClient.forType(
      __filename,
      `${this.name}._createStructSchema(${JSON.stringify(schema)})`
    );
  }

  /**
   * Static method for creating a StructSchema used for lifting a struct to an inflight type
   *
   * @internal
   */
  public static _createStructSchema(schema: any): StructSchema {
    return new StructSchema(schema);
  }

  private jsonSchema: any;
  private validator: Validator;

  constructor(schema: any) {
    this.jsonSchema = schema;
    this.validator = new Validator();
  }

  /**
   * Attempt to validate a json object against the schema
   *
   * @param obj the json object to validate
   * @throws an error if the json object is not valid
   */
  public validate(obj: Json) {
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
  public _fromJson(obj: Json) {
    this.validate(obj);
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
    return StructSchema._toInflightType(this.jsonSchema);
  }
}
