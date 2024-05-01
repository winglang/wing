import { Construct } from "constructs";
import { Resource } from "./resource";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { LiftMap, lift } from "../core";
import { IInflightHost } from "../std";

/**
 * Simulator implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/sdk.cloud.ICounterClient`
 */
export class Counter extends cloud.Counter {
  public readonly initial: number;

  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    this.initial = props.initial ?? 0;

    const factory = lift({
      initial: this.initial,
    }).inflight(async (ctx) => {
      const CounterBackend =
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@winglang/sdk/lib/target-sim/counter.inflight").CounterBackend;
      return new CounterBackend({ initial: ctx.initial });
    });

    new Resource(this, "Resource", factory);
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.CounterInflightMethods.INC]: [],
      [cloud.CounterInflightMethods.DEC]: [],
      [cloud.CounterInflightMethods.PEEK]: [],
      [cloud.CounterInflightMethods.SET]: [],
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
