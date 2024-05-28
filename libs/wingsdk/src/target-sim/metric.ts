import { Construct } from "constructs";
import { MetricSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { LiftMap } from "../core";
import { ToSimulatorOutput } from "../simulator";
import { IInflightHost } from "../std";

/**
 * Simulator implementation of `cloud.Metric`
 */
export class Metric extends cloud.Metric {
  constructor(scope: Construct, id: string, props: cloud.MetricProps) {
    super(scope, id, props);
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.MetricInflightMethods.PUBLISH]: [],
      [cloud.MetricInflightMethods.QUERY]: [],
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

  public toSimulator(): ToSimulatorOutput {
    const props: MetricSchema = {};
    return {
      type: cloud.METRIC_FQN,
      props,
    };
  }
}
