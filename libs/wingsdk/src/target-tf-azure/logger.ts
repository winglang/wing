import * as cloud from "../cloud";
import * as core from "../core";

/**
 * Azure implementation of `cloud.Logger`
 *
 * @inflight `@winglang/sdk.cloud.ILoggerClient`
 */
export class Logger extends cloud.Logger {
  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__dirname, __filename, "LoggerClient", []);
  }
}

Logger._annotateInflight("print", {});
