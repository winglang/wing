import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { LoggerSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";

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
  public _bind(host: core.Resource, ops: string[]): void {
    bindSimulatorResource("logger", this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _inflightJsClient(): core.Code {
    return makeSimulatorJsClient("logger", this);
  }
}

Logger._annotateInflight("print", {});
