import { PolicyStatement } from "./types";
import { IInflightHost } from "../std";
import { Function as AwsCdkFunction } from "../target-awscdk";
import { Function as TfAwsFunction } from "../target-tf-aws";

/**
 * A helper interface for working with AWS functions.
 */
export interface IAwsFunction {
  /**
   * Add an environment variable to the function.
   */
  addEnvironment(key: string, value: string): void;
  /**
   * Add a policy statement to the function's IAM role.
   */
  addIamPolicy(policy: PolicyStatement): void;
}

/**
 * A helper class for working with AWS functions.
 */
export class AwsFunction {
  /**
   * If the inflight host is an AWS function, return a helper interface for
   * working with it.
   * @param host The inflight host.
   */
  public static from(host: IInflightHost): IAwsFunction | undefined {
    if (host instanceof TfAwsFunction) {
      return {
        addEnvironment(key: string, value: string): void {
          host.addEnvironment(key, value);
        },
        addIamPolicy(policy: PolicyStatement): void {
          host.addPolicyStatements(policy);
        },
      };
    }

    if (host instanceof AwsCdkFunction) {
      return {
        addEnvironment(key: string, value: string): void {
          host.addEnvironment(key, value);
        },
        addIamPolicy(policy: PolicyStatement): void {
          host.addPolicyStatements(policy);
        },
      };
    }

    return undefined;
  }
}
