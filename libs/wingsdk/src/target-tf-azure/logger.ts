import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";

/**
 * Azure implementation of `cloud.Logger`
 *
 * @inflight `@winglang/sdk.cloud.ILoggerClient`
 */
export class Logger extends cloud.LoggerBase {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__filename, "LoggerClient", []);
  }
}

Logger._annotateInflight("print", {});
