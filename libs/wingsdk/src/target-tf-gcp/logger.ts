import * as cloud from "../cloud";
import * as core from "../core";

/**
 * GCP implementation of `cloud.Logger`
 *
 * @inflight `@winglang/sdk.cloud.ILoggerClient`
 */
export class Logger extends cloud.LoggerBase {
  /** @internal */
  public _bind(host: core.Resource, ops: string[]): void {
    host;
    ops;
    throw new Error("logger not yet bindable to any resource");
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__filename, "LoggerClient", []);
  }
}
