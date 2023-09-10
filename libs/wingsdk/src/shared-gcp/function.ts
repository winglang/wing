import { PolicyStatement } from "../shared-gcp/types";
import { IInflightHost } from "../std";

/**
 * A shared interface for GCP functions.
 */
export interface IGcpFunction {
  /**
   * Add an environment variable to the function.
   */
  addEnvironment(key: string, value: string): void;
  /**
   * Add policy statements to the function's IAM role.
   */
  addPolicyStatements(policies: PolicyStatement): void;
}

/**
 * A helper class for working with GCP functions.
 */
export class Function {
  public static from(host: IInflightHost): IGcpFunction | undefined {
    if (this.isGcpFunction(host)) {
      return host;
    }

    return undefined;
  }

  private static isGcpFunction(obj: any): obj is IGcpFunction {
    return (
      typeof obj.addPolicyStatements === "function" &&
      typeof obj.addEnvironment === "function"
    );
  }
}
