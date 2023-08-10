import { PolicyStatement } from "./types";
import { IInflightHost } from "../std";
import { Function as TfAwsFunction } from "../target-tf-aws";

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
   *
   * TODO: update this to accept a variadic parameter (...policies)
   * https://github.com/winglang/wing/issues/397
   */
  addPolicyStatements(policies: PolicyStatement[]): void;
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
    if (host instanceof TfAwsFunction) {
      return host;
    }

    return undefined;
  }
}
