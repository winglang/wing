import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { Function } from "./function";
import { addConnections } from "./util";

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
  public _bind(host: core.IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("loggers can only be bound by tfaws.Function for now");
    }

    addConnections(this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__filename, "LoggerClient", []);
  }
}

Logger._annotateInflight("print", {});
