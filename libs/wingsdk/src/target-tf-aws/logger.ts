import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code, InflightClient } from "../core";
import { Function } from "./function";

/**
 * AWS implementation of `cloud.Logger`.
 *
 * @inflight `@winglang/wingsdk.cloud.ILoggerClient`
 */
export class Logger extends cloud.LoggerBase {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  /** @internal */
  public _bind(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    if (!(captureScope instanceof Function)) {
      throw new Error("loggers can only be captured by tfaws.Function for now");
    }

    return InflightClient.for(__filename, "LoggerClient", [
      `"/aws/lambda/${captureScope.node.id}"`,
    ]);
  }
}
