import { Construct } from "constructs";
import { validate } from "jsonschema";
import { loadPlatformSpecificValues } from "./util";

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
  }

  /**
   * Retrieve a parameter value by its path
   *
   * @param path the path of the parameter
   * @returns the value of the parameter
   */
  public getParameterValue(path: string): any {
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
  public addParameterSchema(schema: any) {
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
  public addParameterSchemaAtPath(
    schema: any,
    path: string,
    recursiveRequire = false
  ) {
    this.addParameterSchema(
      this._nestSchemaUnderPath(schema, path, recursiveRequire)
    );
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
      required: recursiveRequire,
    };
  }

  /**
   * @internal
   */
  public _preSynthesize() {
    // TODO: Rather than loop through each schema we should be able to generate a single schema using allOf,
    //      but I couldn't get this to work, nesting all the schemas under a single allOf was causing some
    //      undesired behaviors, I suspect it has to do with the jsonschema library we're using.
    //      Its a little dated and only supports draft-07, so we may want to consider switching to json-schema (https://www.npmjs.com/package/json-schema)
    let parameterValidationErrors: string[] = [];

    this.parameterSchemas.forEach((schema) => {
      const results = validate(this._rawParameters, schema, {
        nestedErrors: true,
      });
      results.errors.forEach((error) => {
        if (error.message.includes("does not match allOf schema")) {
          // These are just noise, so we can ignore them
          return;
        }
        parameterValidationErrors.push(
          `Parameter ${error.property.replace("instance.", "")} is invalid: ${
            error.message
          }`
        );
      });
    });

    if (parameterValidationErrors.length > 0) {
      throw new Error(
        `Parameter validation errors:\n- ${parameterValidationErrors.join(
          "\n- "
        )}`
      );
    }
  }
}

/** @internal */
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
