import { Function } from "../cloud";
import { Tokens } from "../core/tokens";
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
  return `\${${resource.node.path}#attrs.${attrName}}`;
}

/**
 * Returns true is the given value is a Simulator token.
 */
export function isToken(value: string) {
  return /^\$\{.*\#(props\.|attrs\.).*\}/.test(value);
}

/**
 * Represents values that can only be resolved after the app is synthesized.
 * Tokens values are captured as environment variable, and resolved through the compilation target token mechanism.
 */
export class SimTokens extends Tokens {
  /**
   * Returns true is the given value is a Simulator token.
   */
  public isToken(value: any): boolean {
    if (typeof value === "string") {
      return isToken(value);
    }

    return false;
  }

  /**
   * "Lifts" a value into an inflight context.
   */
  public lift(value: any): string {
    switch (typeof value) {
      case "string":
        return `process.env[${JSON.stringify(this.envName(value))}]`;
      default:
        throw new Error(`Unsupported token type`);
    }
  }

  /**
   * Binds the given token to the host.
   */
  public bindValue(host: IInflightHost, value: any) {
    if (!(host instanceof Function)) {
      throw new Error(`Tokens can only be bound by a Function for now`);
    }

    switch (typeof value) {
      case "string":
        const envName = this.envName(value);
        // the same token might be bound multiple times by different variables/inflight contexts
        if (host.env[envName] === undefined) {
          host.addEnvironment(envName, value);
        }
        break;
      default:
        throw new Error(`Unable to bind token ${value}`);
    }
  }
}
