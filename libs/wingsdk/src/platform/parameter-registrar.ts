import { Construct } from "constructs";
import { validate } from "jsonschema";
import { loadPlatformSpecificValues } from "./util";

const PARAMETER_REGISTRAR_SYMBOL = Symbol.for("wingsdk.parameterRegistrar");

/**
 * Parameter Registrar
 *
 * This construct is used to register and validate platform parameters.
 */
export class ParameterRegistrar extends Construct {
  /**
   * Returns the parameter registrar for the given scope
   * @param scope the scope to search for the parameter registrar
   * @returns the parameter registrar
   */
  public static of(scope: any): ParameterRegistrar {
    if (scope && scope[PARAMETER_REGISTRAR_SYMBOL]) {
      return scope as ParameterRegistrar;
    }

    if (!scope.node.scope) {
      throw new Error("Cannot find root parameter registrar");
    }

    return this.of(scope.node.scope);
  }

  /** @internal */
  public readonly [PARAMETER_REGISTRAR_SYMBOL] = true;
  private parameterValueByPath: { [key: string]: any } = {};
  private parameterSchemas: any[] = [];

  /** @internal */
  public readonly _rawParameters: { [key: string]: any } =
    loadPlatformSpecificValues();

  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  /**
   * Reads a parameter value from the registrar
   *
   * @param path the path of the parameter
   * @returns the value of the parameter
   */
  public readParameterValue(path: string): any {
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
   * @internal
   */
  public _preSynthesize() {
    // TODO: Rather than loop through each schema we should be able to generate a single schema using allOf,
    //      but I couldn't get this to work, and I suspect it has to do with the jsonschema library we're using.
    //      Its a little dated and only supports draft-07, so we may want to consider switching to json-schema (https://www.npmjs.com/package/json-schema)
    let parameterValidationErrors: string[] = [];

    this.parameterSchemas.forEach((schema) => {
      const results = validate(this._rawParameters, schema);
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
