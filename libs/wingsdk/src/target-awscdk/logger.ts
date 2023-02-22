import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";

/**
 * AWS implementation of `cloud.Logger`.
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
    return core.InflightClient.for(
      __filename.replace("awscdk", "tf-aws"),
      "LoggerClient",
      []
    );
  }
}

Logger._annotateInflight("print", {});
