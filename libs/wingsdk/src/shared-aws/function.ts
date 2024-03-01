import { PolicyStatement } from "./types";
import { IInflightHost } from "../std";

export const externalLibraries = [
  "@aws-sdk/client-sso",
  "@aws-sdk/client-sso-oidc",
  "@aws-sdk/credential-provider-ini",
  "@aws-sdk/credential-provider-process",
  "@aws-sdk/credential-provider-sso",
  "@aws-sdk/credential-provider-web-identity",
  "@aws-sdk/token-providers",
];

/**
 * A shared interface for AWS functions.
 */
export interface IAwsFunction {
  /**
   * AWS Function arn
   */
  readonly functionArn: string;

  /**
   * AWS Function name
   */
  readonly functionName: string;

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
   * If the inflight host is an AWS Lambda, return a helper interface for
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
      typeof obj.addEnvironment === "function" &&
      typeof obj.functionArn === "string" &&
      typeof obj.functionName === "string"
    );
  }
}
