import { Fn, Token } from "aws-cdk-lib";
import { tokenEnvName, ITokenResolver } from "@winglang/sdk/lib/core/tokens";
import { IInflightHost } from "@winglang/sdk/lib/std";
import { isAwsCdkFunction } from "./function";

/**
 * Represents values that can only be resolved after the app is synthesized.
 * Tokens values are captured as environment variable, and resolved through the compilation target token mechanism.
 */
export class CdkTokens implements ITokenResolver {
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

    const envName = JSON.stringify(tokenEnvName(value.toString()));
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
  public onLiftValue(host: IInflightHost, value: any) {
    if (!isAwsCdkFunction(host)) {
      throw new Error("Expected 'host' to implement 'isAwsCdkFunction' method");
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

    const envName = tokenEnvName(value.toString());

    // the same token might be bound multiple times by different variables/inflight contexts
    host.addEnvironment(envName, envValue);
  }
}
