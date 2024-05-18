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
 * A reference to an external Lambda function.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export class FunctionRef extends Resource {
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
  public _toInflight(): string {
    return InflightClient.for(__dirname, __filename, "FunctionClient", [
      `process.env["${this.envName()}"]`,
    ]);
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
