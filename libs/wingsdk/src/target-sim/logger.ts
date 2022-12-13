import { Construct } from "constructs";
import * as cloud from "../cloud";
import { Code, Policy, Resource } from "../core";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { LoggerSchema } from "./schema-resources";
import { bindSimulatorResource } from "./util";

/**
 * Simulator implementation of `cloud.Logger`.
 *
 * @inflight `@winglang/wingsdk.cloud.ILoggerClient`
 */
export class Logger extends cloud.LoggerBase implements ISimulatorResource {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  public toSimulator(): BaseResourceSchema {
    const schema: LoggerSchema = {
      type: cloud.LOGGER_TYPE,
      path: this.node.path,
      props: {},
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(host: Resource, _policy: Policy): Code {
    return bindSimulatorResource("logger", this, host);
  }
}
