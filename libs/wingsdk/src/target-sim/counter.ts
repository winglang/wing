import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code } from "../core";
import { IResource } from "./resource";
import { CounterSchema } from "./schema-resources";
import { bindSimulatorResource } from "./util";

/**
 * Simulator implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/wingsdk.cloud.ICounterClient`
 */
export class Counter extends cloud.CounterBase implements IResource {
  private readonly inbound = new Array<string>();
  private readonly outbound = new Array<string>();
  public readonly initialValue: number;
  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    this.initialValue = props.initialValue ?? 0;
  }

  /** @internal */
  public _toResourceSchema(): CounterSchema {
    return {
      type: cloud.COUNTER_TYPE,
      props: {
        initialValue: this.initialValue,
      },
      inbound: this.inbound,
      outbound: this.outbound,
    };
  }

  /** @internal */
  public _addInbound(...resources: string[]) {
    this.inbound.push(...resources);
  }

  /** @internal */
  public _bind(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    return bindSimulatorResource("counter", this, captureScope);
  }
}
