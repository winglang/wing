import * as cloud from "../cloud";
import * as core from "../core";

/**
 * Azure implementation of `cloud.Logger`
 *
 * @inflight `@winglang/sdk.cloud.ILoggerClient`
 */
export class Logger extends cloud.LoggerBase {
  /** @internal */
  public _bind(host: core.Resource, ops: string[]): void {
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__filename, "LoggerClient", []);
  }
}
