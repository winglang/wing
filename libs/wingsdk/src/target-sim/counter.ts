import { Construct } from "constructs";
import * as cloud from "../cloud";
import { Code, OperationPolicy, Resource } from "../core";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { CounterSchema } from "./schema-resources";
import { bindSimulatorResource } from "./util";

/**
 * Simulator implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/wingsdk.cloud.ICounterClient`
 */
export class Counter extends cloud.CounterBase implements ISimulatorResource {
  /** @internal */
  public readonly _policies = {
    [cloud.CounterInflightMethods.INC]: {},
  };

  public readonly initial: number;
  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    this.initial = props.initial ?? 0;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: CounterSchema = {
      type: cloud.COUNTER_TYPE,
      path: this.node.path,
      props: {
        initial: this.initial,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(host: Resource, _policy: OperationPolicy): Code {
    return bindSimulatorResource("counter", this, host);
  }
}
