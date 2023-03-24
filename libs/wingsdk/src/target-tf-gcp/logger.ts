import { Construct } from "constructs";
import * as cloud from "../cloud";
import { LoggerInflightMethods } from "../cloud";
import * as core from "../core";

/**
 * GCP implementation of `cloud.Logger`
 *
 * @inflight `@winglang/sdk.cloud.ILoggerClient`
 */
export class Logger extends cloud.Logger {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    host;
    ops;
    throw new Error("logger not yet bindable to any resource");
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__dirname, __filename, "LoggerClient", []);
  }
}

Logger._annotateInflight(LoggerInflightMethods.LOG, {});
