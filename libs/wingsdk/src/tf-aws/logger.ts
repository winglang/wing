import { DataAwsCallerIdentity } from "@cdktf/provider-aws/lib/data-aws-caller-identity";
import { DataAwsRegion } from "@cdktf/provider-aws/lib/data-aws-region";
import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { LoggerInflightMethods } from "../cloud";
import { CaptureMetadata, Code, InflightClient } from "../core";
import { Function } from "./function";

/**
 * AWS implementation of `cloud.Logger`.
 *
 * @inflight `@winglang/wingsdk.tfaws.ILoggerClient`
 */
export class Logger extends cloud.LoggerBase {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  /** @internal */
  public _capture(captureScope: IConstruct, metadata: CaptureMetadata): Code {
    if (!(captureScope instanceof Function)) {
      throw new Error("loggers can only be captured by tfaws.Function for now");
    }

    const methods = new Set(metadata.methods ?? []);
    if (methods.has(LoggerInflightMethods.FETCH_LATEST_LOGS)) {
      const regionData = new DataAwsRegion(this, "AwsRegion");
      const callerData = new DataAwsCallerIdentity(this, "AwsCallerIdentity");
      const region = regionData.name;
      const accountId = callerData.accountId;
      const logGroupArn = `arn:aws:logs:${region}:${accountId}:log-group:/aws/lambda/${captureScope.node.id}`;

      captureScope.addPolicyStatements({
        effect: "Allow",
        action: ["logs:DescribeLogStreams", "logs:GetLogEvents"],
        resource: [logGroupArn, `${logGroupArn}:*`],
      });
    }

    return InflightClient.for(__filename, "LoggerClient", [
      `"/aws/lambda/${captureScope.node.id}"`,
    ]);
  }
}

/**
 * AWS implementation of inflight client for `cloud.Logger`.
 */
export interface ILoggerClient extends cloud.ILoggerClient {}
