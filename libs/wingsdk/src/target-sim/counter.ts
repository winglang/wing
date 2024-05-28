import { Construct } from "constructs";
import { Resource, ResourceInflightMethods } from "./resource";
import { bindSimulatorResource, makeSimulatorJsClientV2 } from "./util";
import * as cloud from "../cloud";
import { LiftMap, lift } from "../core";
import { Node, IInflightHost } from "../std";

/**
 * Simulator implementation of `cloud.Counter`.
 *
 * @inflight `@winglang/sdk.cloud.ICounterClient`
 */
export class Counter extends cloud.Counter {
  public readonly initial: number;
  private readonly backend: Resource;

  constructor(scope: Construct, id: string, props: cloud.CounterProps = {}) {
    super(scope, id, props);

    this.initial = props.initial ?? 0;

    const factory = lift({
      initial: this.initial,
    }).inflight(async (liftCtx, simContext) => {
      // TODO: make CounterBackend liftable so we can add it to the list of captures
      const CounterBackend =
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@winglang/sdk/lib/target-sim/counter.inflight").CounterBackend;
      const backend = new CounterBackend(simContext, {
        initial: liftCtx.initial,
      });
      await backend.onStart();
      return backend;
    });

    this.backend = new Resource(this, "Resource", factory);
    Node.of(this.backend).hidden = true;
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.CounterInflightMethods.INC]: [
        [this.backend, [ResourceInflightMethods.CALL]],
      ],
      [cloud.CounterInflightMethods.DEC]: [
        [this.backend, [ResourceInflightMethods.CALL]],
      ],
      [cloud.CounterInflightMethods.PEEK]: [
        [this.backend, [ResourceInflightMethods.CALL]],
      ],
      [cloud.CounterInflightMethods.SET]: [
        [this.backend, [ResourceInflightMethods.CALL]],
      ],
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this.backend, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClientV2(__filename, this.backend);
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
