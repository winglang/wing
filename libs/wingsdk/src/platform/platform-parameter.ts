import { Construct } from "constructs";
import { ParameterRegistrar } from "./parameter-registrar";

export interface PlatformParameterProps {
  readonly path: string;
  readonly description?: string;
  readonly required?: boolean;
  readonly choices?: any[];
}

export class PlatformParameter extends Construct {
  public readonly path: string;
  public readonly description?: string;
  private _required?: boolean;
  private choices?: any[];
  public value?: any;

  private dependentInputsByChoice: { [key: string]: PlatformParameter[] } = {};

  constructor(scope: ParameterRegistrar, id: string, props: PlatformParameterProps) {
    super(scope, id);
    this.path = props.path;
    this.description = props.description;
    this._required = props.required;
    this.choices = props.choices;


    this.value = this.resolveValueFromPath(scope._rawParameters, this.path);
  }

  public addDependentInput(input: PlatformParameter, onChoice: string = "*") {
    let choiceDependents = this.dependentInputsByChoice[onChoice] ?? [];
    choiceDependents.push(input);
    this.dependentInputsByChoice[onChoice] = choiceDependents;

    input.node.addDependency(this);
  }

  private resolveValueFromPath(parameters: { [key: string]: any }, path: string): any {
    if (!parameters) {
      return undefined;
    }

    const pathParts = path.split("/");
    
    if (pathParts.length === 1) {
      return parameters[pathParts[0]];
    }

    // recurse
    const nextPath = pathParts.slice(1).join("/");
    return this.resolveValueFromPath(parameters[pathParts[0]], nextPath);
  }

  public set required(r: boolean) {
    this._required = r;
  }


  reportValidationErrorsToRegistrar(registrar: ParameterRegistrar): any {
    // If the value was required and not provided then we have an issue
    if (this._required && !this.value) {
      registrar.registerInvalidInputMessage(`Input: "${this.path}" is required`);
    }

    // if the value was not required, and not provided, then we are done
    if (!this._required && !this.value) {
      return;
    }

    // If the value was provided, and we have limited choices, then we need to check
    // that the value is one of the choices
    if (this.choices && this.choices.length > 0) {
      if (!this.choices.includes(this.value)) {
        registrar.registerInvalidInputMessage(`Input: "${this.path}", expects a value from the following choices: [ ${this.choices.join(", ")} ]`);
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
  }
}
