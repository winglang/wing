import { Construct } from "constructs";
import * as cloud from "../cloud";
import { Code, InflightClient, OperationPolicy, Resource } from "../core";
import { Function } from "./function";
import { addBindConnections } from "./util";

/**
 * AWS implementation of `cloud.Logger`.
 *
 * @inflight `@winglang/wingsdk.cloud.ILoggerClient`
 */
export class Logger extends cloud.LoggerBase {
  /** @internal */
  public readonly _policies = {
    [cloud.LoggerInflightMethods.PRINT]: {},
  };

  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  protected _bind_impl(host: Resource, _policy: OperationPolicy): Code {
    if (!(host instanceof Function)) {
      throw new Error("loggers can only be bound by tfaws.Function for now");
    }

    addBindConnections(this, host);

    return InflightClient.for(__filename, "LoggerClient", [
      `"/aws/lambda/${host.node.id}"`,
    ]);
  }
}
