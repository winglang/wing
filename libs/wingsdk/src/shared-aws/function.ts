import { Construct } from "constructs";
import { AwsInflightHost, IAwsInflightHost } from "./inflight-host";
import { isValidArn } from "./util";
import { FunctionInflightMethods, IFunctionClient } from "../cloud";
import { InflightClient, lift, LiftMap } from "../core";
import { INFLIGHT_SYMBOL } from "../core/types";
import { IInflightHost, Node, Resource } from "../std";
import * as ui from "../ui";

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
export interface IAwsFunction extends IAwsInflightHost {
  /**
   * AWS Function arn
   */
  readonly functionArn: string;

  /**
   * AWS Function name
   */
  readonly functionName: string;
}

/**
 * A helper class for working with AWS functions.
 */
export class Function {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(
      __filename.replace("function", "function.inflight"),
      "FunctionClient"
    );
  }

  /**
   * Returns the current Lambda invocation context, if the host is an AWS Lambda.
   * @see https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
   * @inflight
   * @returns The current Lambda invocation context.
   */
  public static async context(): Promise<ILambdaContext | undefined> {
    // The implementation of this method is in function.inflight.ts
    throw new Error("Not implemented");
  }

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
      typeof obj.functionArn === "string" &&
      typeof obj.functionName === "string"
    );
  }
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

/**
 * A reference to an external Lambda function.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export class FunctionRef extends Resource {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(
      __filename.replace("function", "function.inflight"),
      "FunctionClient"
    );
  }

  /** @internal */
  public [INFLIGHT_SYMBOL]?: IFunctionClient;

  /**
   * The ARN of this function.
   */
  public readonly functionArn: string;

  constructor(scope: Construct, id: string, functionArn: string) {
    super(scope, id);

    if (!isValidArn(functionArn, "lambda")) {
      throw new Error(`"${functionArn}" is not a valid Amazon Lambda ARN`);
    }

    this.functionArn = functionArn;

    this.addUserInterface();
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (AwsInflightHost.isAwsInflightHost(host)) {
      if (
        ops.includes(FunctionInflightMethods.INVOKE) ||
        ops.includes(FunctionInflightMethods.INVOKE_ASYNC)
      ) {
        host.addPolicyStatements({
          actions: ["lambda:InvokeFunction"],
          resources: [this.functionArn],
        });
      }
    }

    host.addEnvironment(this.envName(), this.functionArn);
    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedFields(): Record<string, string> {
    return {
      $functionArn: `process.env["${this.envName()}"]`,
      $constructPath: `${this.node.path}`,
    };
  }

  private envName(): string {
    return `FUNCTION_NAME_${this.node.addr.slice(-8)}`;
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [FunctionInflightMethods.INVOKE]: [],
      [FunctionInflightMethods.INVOKE_ASYNC]: [],
    };
  }

  private addUserInterface() {
    Node.of(this).color = "pink";

    const functionArn = this.functionArn;

    const awsConsoleHandler = lift({ functionArn }).inflight(async (ctx) => {
      try {
        const parts = ctx.functionArn.split(":");
        const region = parts[3];
        const name = parts[6];
        return (
          "https://" +
          region +
          ".console.aws.amazon.com/lambda/home?region=" +
          region +
          "#/functions/" +
          name
        );
      } catch (e: any) {
        return e.message;
      }
    });

    new ui.Field(this, "AwsConsoleField", "AWS Console", awsConsoleHandler, {
      link: true,
    });

    new ui.ValueField(
      this,
      "FunctionArnField",
      "Function ARN",
      this.functionArn
    );
  }
}
