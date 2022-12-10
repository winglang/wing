import { Construct } from "constructs";
import * as cloud from "../cloud";
import { Code, InflightClient, Policies, Resource } from "../core";
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
  public _bind(host: Resource, _policies: Policies): Code {
    if (!(host instanceof Function)) {
      throw new Error("loggers can only be bound by tfaws.Function for now");
    }

    addBindConnections(this, host);

    return InflightClient.for(__filename, "LoggerClient", [
      `"/aws/lambda/${host.node.id}"`,
    ]);
  }
}
