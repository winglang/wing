import { Construct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code, InflightClient, Resource } from "../core";
import { Function } from "./function";
import { addBindConnections } from "./util";

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
  public _bind(captureScope: Resource, _metadata: CaptureMetadata): Code {
    if (!(captureScope instanceof Function)) {
      throw new Error("loggers can only be captured by tfaws.Function for now");
    }

    addBindConnections(this, captureScope);

    return InflightClient.for(__filename, "LoggerClient", [
      `"/aws/lambda/${captureScope.node.id}"`,
    ]);
  }
}
