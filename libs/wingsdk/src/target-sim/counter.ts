import { Construct } from "constructs";
import { Resource } from "./resource";
import { bindSimulatorResource, makeSimulatorJsClientV2 } from "./util";
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
  private readonly resource: Resource;

  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    this.initial = props.initial ?? 0;

    const factory = lift({
      initial: this.initial,
    }).inflight(async (ctx) => {
      // TODO: make CounterBackend liftable so we can add it to the list of captures
      const CounterBackend =
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@winglang/sdk/lib/target-sim/counter.backend").CounterBackend;
      return new CounterBackend({ initial: ctx.initial });
    });

    this.resource = new Resource(this, "Resource", factory);
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.CounterInflightMethods.INC]: [[this.resource, ["call"]]],
      [cloud.CounterInflightMethods.DEC]: [[this.resource, ["call"]]],
      [cloud.CounterInflightMethods.PEEK]: [[this.resource, ["call"]]],
      [cloud.CounterInflightMethods.SET]: [[this.resource, ["call"]]],
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this.resource, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClientV2(__filename, this.resource);
  }
}

/**
 * Props for CounterBackend
 * @internal
 */
export interface CounterBackendProps {
  readonly initial: number;
}

/**
 * Runtime attributes for CounterBackend
 * @internal
 */
export interface CounterAttributes {}
