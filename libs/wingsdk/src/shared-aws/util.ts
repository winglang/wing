import { InflightClient } from "../core";

/**
 * The aws module is used for programming with AWS cloud resources.
 */
export class Util {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * Returns the current Lambda invocation context.
   * @see https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
   * @inflight
   * @returns The current Lambda invocation context.
   */
  public static context(): ILambdaContext {
    const obj = (globalThis as any).$context;
    if (!obj) {
      throw new Error("No Lambda context available.");
    }
    // workaround for the fact that JSII doesn't allow methods to start with "get"
    obj.remainingTimeInMillis = obj.getRemainingTimeInMillis;
    return obj;
  }

  private constructor() {}
}

/**
 * The AWS Lambda context object.
 * @inflight
 */
export interface ILambdaContext {
  /**
   * The name of the Lambda function.
   */
  readonly functionName: string;
  /**
   * The version of the function.
   */
  readonly functionVersion: string;
  /**
   * The Amazon Resource Name (ARN) that's used to invoke the function.
   * Indicates if the invoker specified a version number or alias.
   */
  readonly invokedFunctionArn: string;
  /**
   * The amount of memory that's allocated for the function.
   */
  readonly memoryLimitInMB: string;
  /**
   * The identifier of the invocation request.
   */
  readonly awsRequestId: string;
  /**
   * The log group for the function.
   */
  readonly logGroupName: string;
  /**
   * The log stream for the function instance.
   */
  readonly logStreamName: string;
  /**
   * Returns the number of milliseconds left before the execution times out.
   */
  remainingTimeInMillis(): number;
}

export function isValidArn(arn: string, service: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Token } = require("cdktf");

  // if the ARN is an unresolved token, we can't validate it so assume it's valid
  if (Token.isUnresolved(arn)) {
    return true;
  }

  // ARN format: arn:partition:service:region:account-id:resource-type?:resource
  // e.g. arn:aws:lambda:us-east-1:111111111111:function:Function-11111111
  // or,  arn:aws:sqs:us-east-1:111111111111:Queue-11111111
  const parts = arn.split(":");
  if (parts.length < 6 || parts.length > 7) {
    return false;
  }

  if (parts[0] !== "arn") {
    return false;
  }

  if (parts[2] !== service) {
    return false;
  }

  return true;
}
