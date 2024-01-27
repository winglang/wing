import { PlatformParameter } from "./platform-parameter";
import { loadPlatformSpecificValues } from "./util";
import { Construct } from "constructs";

/**
 * Parameter Registrar
 * 
 * This construct is used to register and validate platform parameters.
 */
export class ParameterRegistrar extends Construct {
  private synthed: boolean = false;
  private inputValueByPath: { [key: string]: any } = {};
  private invalidInputMessages: string[] = [];

  /** @internal */
  public readonly _rawParameters: { [key: string]: any } = {};

  constructor(id: string) {
    super(undefined as any, id);
    this._rawParameters = loadPlatformSpecificValues();
  }

  public registerInvalidInputMessage(message: string) {
    this.invalidInputMessages.push(message);
  }

  public readParameterValue(path: string): any {
    if (!this.synthed) {
      throw new Error("Cannot get parameter value before synthing registrar");
    }
    
    return this.inputValueByPath[path];
  }

  /**
   * Synth the registrar
   */
  public synth() {
    if (this.synthed) {
      return;
    }
    
    const isParameter = (node: Construct) => node instanceof PlatformParameter;

    const inputs: PlatformParameter[] = this.node.findAll().filter(isParameter) as PlatformParameter[];

    for (let input of inputs) {
      input.reportValidationErrorsToRegistrar(this);
      this.inputValueByPath[input.path] = input.value;
    }

    // If any invalid input messages were registered, then throw an error
    if (this.invalidInputMessages.length > 0) {
      let message = "Invalid input values were provided the following errors were recorded:\n\t- ";
      throw new Error(message + this.invalidInputMessages.join("\n\t- "));
    }
    this.synthed = true;
  }
}