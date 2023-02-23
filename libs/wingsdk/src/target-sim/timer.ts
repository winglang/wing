import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { TimerSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";

/**
 * Simulator implementation of `cloud.Timer`.
 *
 * @inflight `@winglang/sdk.cloud.ITimerClient`
 */
export class Timer extends cloud.TimerBase implements ISimulatorResource {
  constructor(scope: Construct, id: string, props: cloud.TimerProps = {}) {
    super(scope, id, props);
  }

  public toSimulator(): BaseResourceSchema {
    const schema: TimerSchema = {
      type: cloud.TIMER_TYPE,
      path: this.node.path,
      props: {},
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    bindSimulatorResource("timer", this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient("timer", this);
  }
}

Timer._annotateInflight("set_timeout", {});
