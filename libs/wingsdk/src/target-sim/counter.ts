import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { CounterSchema, COUNTER_TYPE } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";

/**
 * Simulator implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/sdk.cloud.ICounterClient`
 */
export class Counter extends cloud.Counter implements ISimulatorResource {
  public readonly initial: number;
  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    this.initial = props.initial ?? 0;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: CounterSchema = {
      type: COUNTER_TYPE,
      path: this.node.path,
      props: {
        initial: this.initial,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }
}

Counter._annotateInflight("inc", {});
Counter._annotateInflight("dec", {});
Counter._annotateInflight("peek", {});
Counter._annotateInflight("reset", {});
