import { ITokenResolver, tokenEnvName } from "../core/tokens";
import { IInflightHost, IResource } from "../std";

/**
 * Produce a token that will be replaced with the handle of a resource
 * when the simulator is started. This can be inserted to an environment variable
 * so that the real value can be used by an inflight function.
 */
export function simulatorHandleToken(resource: IResource): string {
  return simulatorAttrToken(resource, "handle");
}

/**
 * Produce a token that will be replaced with a deploy-time resource attribute
 * when the simulator is started.
 */
export function simulatorAttrToken(
  resource: IResource,
  attrName: string
): string {
  return `\${wsim#${resource.node.path}#attrs.${attrName}}`;
}

/**
 * Regular expression that matches a simulator token. This is a sequence of
 * characters that can appear in the middle of any string in the following format:
 *
 * ${wsim#path/to/resource#property.path}
 */
export const SIMULATOR_TOKEN_REGEX = /\$\{wsim#[^#\{\}]+#[a-zA-Z0-9_\-\/\.]+\}/;

/**
 * The same as SIMULATOR_TOKEN_REGEX, but it must match the entire string.
 */
export const SIMULATOR_TOKEN_REGEX_FULL = new RegExp(
  `^${SIMULATOR_TOKEN_REGEX.source}$`
);

/**
 * Returns true is the given value is a Simulator token.
 */
export function isSimulatorToken(value: string) {
  return SIMULATOR_TOKEN_REGEX.test(value);
}

/**
 * Represents values that can only be resolved after the app is synthesized.
 * Tokens values are captured as environment variable, and resolved through the compilation target token mechanism.
 */
export class SimTokens implements ITokenResolver {
  /**
   * Returns true is the given value is a Simulator token.
   */
  public isToken(value: any): boolean {
    if (typeof value === "string") {
      return isSimulatorToken(value);
    }

    return false;
  }

  /**
   * Lifts a value into an inflight context.
   */
  public lift(value: any): string {
    switch (typeof value) {
      case "string":
        return `process.env[${JSON.stringify(tokenEnvName(value))}]`;
      default:
        throw new Error(`Unsupported token type`);
    }
  }

  /**
   * Lifts the given token to the host.
   */
  public onLiftValue(host: IInflightHost, value: any) {
    switch (typeof value) {
      case "string":
        const envName = tokenEnvName(value);
        host.addEnvironment(envName, value);
        break;
      default:
        throw new Error(`Unable to lift token ${value}`);
    }
  }
}
