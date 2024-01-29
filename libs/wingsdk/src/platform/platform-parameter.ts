import { Construct } from "constructs";
import { ParameterRegistrar } from "./parameter-registrar";

/**
 * Platform Parameter Props
 */
export interface PlatformParameterProps {
  /** The path the parameter will be read from */
  readonly path: string;
  /**
   * The description of the parameter
   * @default - no description
   */
  readonly description?: string;
  /**
   * Whether the parameter is required
   * @default - false
   */
  readonly required?: boolean;
  /**
   * Restrict choices for the parameter
   * @default - no choices
   */
  readonly choices?: any[];
}

/**
 * Platform Parameter
 *
 * This construct is used to register and validate platform parameters.
 *
 * Note: Parameters cannot be registered after app.synth() is called.
 */
export class PlatformParameter extends Construct {
  /** Parameter path */
  public readonly path: string;
  /** Parameter description */
  public readonly description?: string;
  /** Parameter value */
  public value?: any;

  private _required?: boolean;
  private choices?: any[];
  private dependentInputsByChoice: { [key: string]: PlatformParameter[] } = {};

  constructor(
    scope: ParameterRegistrar,
    id: string,
    props: PlatformParameterProps
  ) {
    super(scope, id);
    this.path = props.path;
    this.description = props.description;
    this._required = props.required;
    this.choices = props.choices;

    this.value = ParameterRegistrar.of(this).readParameterValue(this.path);
  }

  /**
   * Specify a parameter that is dependent on this parameter
   * The dependent parameter will be required if the choice is selected
   *
   * @param parameter the parameter that is dependent on this parameter
   * @param onChoice - default: * optionally specify a choice that the dependent parameter is dependent on
   */
  public addDependentParameter(
    parameter: PlatformParameter,
    onChoice: string = "*"
  ) {
    let choiceDependents = this.dependentInputsByChoice[onChoice] ?? [];
    choiceDependents.push(parameter);
    this.dependentInputsByChoice[onChoice] = choiceDependents;

    parameter.node.addDependency(this);
  }

  /**
   * Set whether the parameter is required
   */
  public set required(r: boolean) {
    this._required = r;
  }

  /**
   * Returns a list of validation errors with the parameter
   *
   * @returns a list of validation errors
   */
  public collectValidationErrors(): string[] {
    let errors: string[] = [];
    // If the value was required and not provided then we have an issue
    if (this._required && !this.value) {
      errors.push(`Parameters: "${this.path}" is required`);
    }

    // if the value was not required, and not provided, then we are done
    if (!this._required && !this.value) {
      return errors;
    }

    // If the value was provided, and we have limited choices, then we need to check
    // that the value is one of the choices
    if (this.choices && this.choices.length > 0) {
      if (!this.choices.includes(this.value)) {
        errors.push(
          `Parameters: "${
            this.path
          }", expects a value from the following choices: [ ${this.choices.join(
            ", "
          )} ]`
        );
      }
    }

    // If the value was provided, then we need to check if there are any dependent inputs
    // based on the choice that was provided
    if (this.value) {
      // Get the dependents for the value and for *
      let dependents = this.dependentInputsByChoice[this.value] ?? [];
      dependents = dependents.concat(this.dependentInputsByChoice["*"] ?? []);
      // Just toggle the input to required
      for (let dependent of dependents) {
        dependent.required = true;
      }
    }

    return errors;
  }
}
