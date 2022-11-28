import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code } from "../core";
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
  public readonly initialValue: number;
  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    this.initialValue = props.initialValue ?? 0;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: CounterSchema = {
      type: cloud.COUNTER_TYPE,
      path: this.node.path,
      props: {
        initialValue: this.initialValue,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    return bindSimulatorResource("counter", this, captureScope);
  }
}
