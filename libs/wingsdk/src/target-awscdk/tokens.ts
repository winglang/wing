import { Fn, Token } from "aws-cdk-lib";
import { Function } from "../cloud";
import { Tokens } from "../core/tokens";
import { IInflightHost } from "../std";

/**
 * Represents values that can only be resolved after the app is synthesized.
 * Tokens values are captured as environment variable, and resolved through the compilation target token mechanism.
 */
export class CdkTokens extends Tokens {
  /**
   * Returns true is the given value is a CDK token.
   */
  public isToken(value: any): boolean {
    return Token.isUnresolved(value);
  }

  /**
   * "Lifts" a value into an inflight context.
   */
  public lift(value: any): string {
    if (value == null) {
      throw new Error(`Unable to lift null token`);
    }

    const envName = JSON.stringify(this.envName(value.toString()));
    switch (typeof value) {
      case "string":
        return `process.env[${envName}]`;
      case "number":
        return `parseFloat(process.env[${envName}], 10)`;
      case "object":
        if (Array.isArray(value)) {
          return `JSON.parse(process.env[${envName}])`;
        }
    }
    throw new Error(`Unable to lift token ${value}`);
  }

  /**
   * Binds the given token to the host.
   */
  public bindValue(host: IInflightHost, value: any) {
    if (!(host instanceof Function)) {
      throw new Error(`Tokens can only be bound by a Function for now`);
    }

    let envValue;
    switch (typeof value) {
      case "string":
        envValue = value;
        break;
      case "number":
        envValue = value.toString();
        break;
      case "object":
        if (Array.isArray(value)) {
          envValue = Fn.toJsonString(value);
          break;
        }
    }

    if (envValue === undefined) {
      throw new Error(`Unable to bind token ${value}`);
    }

    const envName = this.envName(value.toString());
    // the same token might be bound multiple times by different variables/inflight contexts
    host.addEnvironment(envName, envValue, true);
  }
}
