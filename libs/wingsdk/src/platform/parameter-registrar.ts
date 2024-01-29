import { Construct } from "constructs";
import { PlatformParameter } from "./platform-parameter";
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
  private invalidInputMessages: string[] = [];

  // These are "OR" relationships, i.e. if we need to require either
  // parameter A or B or C
  private orDependencies: Array<Array<PlatformParameter>> = [];

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
   * Define an "OR" relationship between parameters
   *
   * @param parameters the parameters that compose the "OR" relationship
   */
  public addOrDependency(parameters: PlatformParameter[]) {
    this.orDependencies.push(parameters);
  }

  private validateOrDependencies() {
    for (const group of this.orDependencies) {
      if (
        !group.some(
          (param) => this.parameterValueByPath[param.path] !== undefined
        )
      ) {
        // Construct a list of parameter paths for the error message
        const paramPaths = group.map((param) => `"${param.path}"`).join(" or ");
        this.invalidInputMessages.push(
          `At least one of the parameters ${paramPaths} must be provided.`
        );
      }
    }
  }

  /**
   * Synth the registrar
   * @internal
   */
  public _preSynthesize() {
    const parameters: PlatformParameter[] = this.node
      .children as PlatformParameter[];

    for (let param of parameters) {
      const validationErrors = param.collectValidationErrors();
      if (validationErrors.length > 0) {
        this.invalidInputMessages.push(...validationErrors);
      }
      this.parameterValueByPath[param.path] = param.value;
    }

    // Once we validate all individual parameters, we need to validate the "OR" relationships
    this.validateOrDependencies();

    // If any invalid input messages were registered, then throw an error
    if (this.invalidInputMessages.length > 0) {
      let message =
        "Invalid input values were provided the following errors were recorded:\n\t- ";
      throw new Error(message + this.invalidInputMessages.join("\n\t- "));
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
