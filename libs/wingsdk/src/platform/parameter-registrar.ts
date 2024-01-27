import { Construct } from "constructs";
import { PlatformParameter } from "./platform-parameter";
import { loadPlatformSpecificValues } from "./util";

/**
 * Parameter Registrar
 *
 * This construct is used to register and validate platform parameters.
 */
export class ParameterRegistrar extends Construct {
  private synthed: boolean = false;
  private parameterValueByPath: { [key: string]: any } = {};
  private invalidInputMessages: string[] = [];

  /** @internal */
  public readonly _rawParameters: { [key: string]: any } = {};

  constructor(id: string) {
    super(undefined as any, id);
    this._rawParameters = loadPlatformSpecificValues();
  }

  /**
   * Registers an invalid input message
   *
   * @param message the message to register
   */
  public registerInvalidInputMessage(message: string) {
    this.invalidInputMessages.push(message);
  }

  /**
   * Reads a parameter value from the registrar
   *
   * @param path the path of the parameter
   * @returns the value of the parameter
   */
  public readParameterValue(path: string): any {
    if (!this.synthed) {
      throw new Error("Cannot get parameter value before synthing registrar");
    }

    return this.parameterValueByPath[path];
  }

  /**
   * Synth the registrar
   */
  public synth() {
    if (this.synthed) {
      return;
    }

    const isParameter = (node: Construct) => node instanceof PlatformParameter;

    const parameters: PlatformParameter[] = this.node
      .findAll()
      .filter(isParameter) as PlatformParameter[];

    for (let param of parameters) {
      const validationErrors = param.collectValidationErrors();
      if (validationErrors.length > 0) {
        this.invalidInputMessages.push(...validationErrors);
      }
      this.parameterValueByPath[param.path] = param.value;
    }

    // If any invalid input messages were registered, then throw an error
    if (this.invalidInputMessages.length > 0) {
      let message =
        "Invalid input values were provided the following errors were recorded:\n\t- ";
      throw new Error(message + this.invalidInputMessages.join("\n\t- "));
    }
    this.synthed = true;
  }
}
