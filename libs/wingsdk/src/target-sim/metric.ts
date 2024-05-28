import { Construct } from "constructs";
import { Resource } from "./resource";
import { bindSimulatorResource, makeSimulatorJsClientV2 } from "./util";
import * as cloud from "../cloud";
import { LiftMap, lift } from "../core";
import { IInflightHost, Node } from "../std";

/**
 * Simulator implementation of `cloud.Metric`
 */
export class Metric extends cloud.Metric {
  private readonly backend: Resource;

  constructor(scope: Construct, id: string, props: cloud.MetricProps) {
    super(scope, id, props);

    const factory = lift({}).inflight(async (_liftCtx, simContext) => {
      // TODO: make MetricBackend liftable so we can add it to the list of captures
      const MetricBackend =
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@winglang/sdk/lib/target-sim/metric.inflight").MetricBackend;
      const backend = new MetricBackend(simContext, {});
      await backend.onStart();
      return backend;
    });

    this.backend = new Resource(this, "Resource", factory);
    Node.of(this.backend).hidden = true;
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.MetricInflightMethods.PUBLISH]: [[this.backend, ["call"]]],
      [cloud.MetricInflightMethods.QUERY]: [[this.backend, ["call"]]],
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
 * Props for MetricBackend
 * @internal
 */
export interface MetricBackendProps {}

/**
 * Runtime attributes for MetricAttributes
 * @internal
 */
export interface MetricAttributes {}
