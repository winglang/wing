import { PolicyStatement } from "./types";
import { IInflightHost } from "../std";

/**
 * A shared interface for AWS functions.
 */
export interface IAwsFunction {
  /**
   * Add an environment variable to the function.
   */
  addEnvironment(key: string, value: string): void;

  /**
   * Add policy statements to the function's IAM role.
   */
  addPolicyStatements(...policies: PolicyStatement[]): void;
}

/**
 * A helper class for working with AWS functions.
 */
export class Function {
  /**
   * If the inflight host is an AWS function, return a helper interface for
   * working with it.
   * @param host The inflight host.
   */
  public static from(host: IInflightHost): IAwsFunction | undefined {
    if (this.isAwsFunction(host)) {
      return host;
    }
    return undefined;
  }

  private static isAwsFunction(obj: any): obj is IAwsFunction {
    return (
      typeof obj.addPolicyStatements === "function" &&
      typeof obj.addEnvironment === "function"
    );
  }
}
