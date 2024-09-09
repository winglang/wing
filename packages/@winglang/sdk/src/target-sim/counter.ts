import { Construct } from "constructs";
import { Resource } from "./resource";
import {
  bindSimulatorResource,
  makeSimulatorJsClientTypeProxy,
  simulatorLiftedFieldsFor,
} from "./util";
import * as cloud from "../cloud";
import { LiftMap, lift } from "../core";
import { Node, IInflightHost } from "../std";

/**
 * Simulator implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/sdk.cloud.ICounterClient`
 */
export class Counter extends cloud.Counter {
  /** @internal */
  public static _toInflightType(): string {
    return makeSimulatorJsClientTypeProxy("Counter", cloud.Counter._methods);
  }

  public readonly initial: number;
  private readonly backend: Resource;

  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    this.initial = props.initial ?? 0;

    const factory = lift({
      initial: this.initial,
    }).inflight(async (ctx, simContext) => {
      // TODO: make CounterBackend liftable so we can add it to the list of captures
      const CounterBackend =
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@winglang/sdk/lib/target-sim/counter.inflight").CounterBackend;
      const backend = new CounterBackend(simContext, { initial: ctx.initial });
      await backend.onStart();
      return backend;
    });

    this.backend = new Resource(this, "Resource", factory);
    Node.of(this.backend).hidden = true;
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.CounterInflightMethods.INC]: [[this.backend, ["call"]]],
      [cloud.CounterInflightMethods.DEC]: [[this.backend, ["call"]]],
      [cloud.CounterInflightMethods.PEEK]: [[this.backend, ["call"]]],
      [cloud.CounterInflightMethods.SET]: [[this.backend, ["call"]]],
    };
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return simulatorLiftedFieldsFor(this.backend);
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(this.backend, host, ops);
    super.onLift(host, ops);
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
