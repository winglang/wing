import Ajv from "ajv";
import { Construct } from "constructs";
import { loadPlatformSpecificValues } from "./util";
import { Node } from "../std";

/**
 * Parameter Registrar
 *
 * This class is used to register and lookup parameter values.
 */
export class ParameterRegistrar extends Construct {
  /** Cache for parameter lookups */
  private parameterValueByPath: { [key: string]: any } = {};
  /** List of all registered parameter schemas */
  private parameterSchemas: any[] = [];

  /** @internal */
  public readonly _rawParameters: { [key: string]: any } =
    loadPlatformSpecificValues();

  constructor(scope: Construct, id: string) {
    super(scope, id);
    Node.of(this).hidden = true;
  }

  /**
   * Retrieve a parameter value by its path
   *
   * @param path the path of the parameter
   * @returns the value of the parameter
   */
  public getValue(path: string): any {
    if (this.parameterValueByPath[path] === undefined) {
      // attempt to read the value from the raw parameters, then cache it
      this.parameterValueByPath[path] = resolveValueFromPath(
        this._rawParameters,
        path
      );
    }

    return this.parameterValueByPath[path];
  }

  /**
   * Add parameter schema to registrar
   *
   * @param schema schema to add to the registrar
   */
  public addSchema(schema: any) {
    // If a JsonSchema object is passed in, extract the jsonSchema from it
    if (schema.rawSchema) {
      this.parameterSchemas.push(schema.rawSchema);
      return;
    }

    this.parameterSchemas.push(schema);
  }

  /**
   * Helper method to add a parameter schema at a given path.
   * This method will nest the schema under the given path, making it easier to nest schemas.
   *
   * @param schema the schema to add
   * @param path the path to nest the schema under
   * @param recursiveRequire whether or not to require all the nested properties
   */
  public addSchemaAtPath(schema: any, path: string, recursiveRequire = false) {
    this.addSchema(this._nestSchemaUnderPath(schema, path, recursiveRequire));
  }

  /**
   * This is a helper method to nest a schema under a path.
   *
   * I.E. if you have a json schema that looks like this:
   * { type: "object", properties: { foo: { type: "string" } } }
   *
   * And we want to nest it under the path "bar/baz", then this method will return:
   * { type: "object", properties: { bar: { type: "object", properties: { baz: { type: "object", properties: { foo: { type: "string" } } } } } } }
   *
   * making it easier to nest schemas under paths, without writing out the object boilerplate.
   *
   * @internal
   */
  public _nestSchemaUnderPath(
    schema: any,
    path: string,
    recursiveRequire = false
  ): any {
    const parts = path.split("/");

    if (parts.length === 0 || path === "") {
      // base case just return the schema
      return schema;
    }

    const currentKey = parts[0];

    // Create and return the schema
    return {
      type: "object",
      properties: {
        // recurse for the next part of the path
        [currentKey]: this._nestSchemaUnderPath(
          schema,
          parts.slice(1).join("/"),
          recursiveRequire
        ),
      },
      required: recursiveRequire ? [currentKey] : [],
    };
  }

  /**
   * @internal
   */
  public _preSynthesize() {
    if (this.parameterSchemas.length === 0) {
      return;
    }

    const platformParameterSchema = {
      allOf: [...this.parameterSchemas],
    };

    const ajv = new Ajv({ allErrors: true });
    const validator = ajv.compile(platformParameterSchema);
    const valid = validator(this._rawParameters);

    if (!valid) {
      throw new Error(
        `Parameter validation errors:\n- ${validator.errors
          ?.map((error: any) => error.message)
          .join("\n- ")}

(hint: make sure to use --values to provide the required parameters file)
        `
      );
    }
  }
}

/**
 * Retrieves a value from an object using a given path
 *
 * @param rawParameters the object to retrieve the value from
 * @param path the path to the value (I.E. "foo/bar/baz")
 * @internal
 */
export function resolveValueFromPath(
  rawParameters: { [key: string]: any },
  path: string
): any {
  if (!rawParameters) {
    return undefined;
  }

  const pathParts = path.split("/");

  if (pathParts.length === 1) {
    return rawParameters[pathParts[0]];
  }

  // recurse
  const nextPath = pathParts.slice(1).join("/");
  return resolveValueFromPath(rawParameters[pathParts[0]], nextPath);
}
