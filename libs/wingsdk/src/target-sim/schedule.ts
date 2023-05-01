import { join } from "path";
import { Construct } from "constructs";
import { EventMapping } from "./event-mapping";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";
import { SCHEDULE_TYPE, ScheduleSchema } from "./schema-resources";
import {
  bindSimulatorResource,
  makeSimulatorJsClient,
  convertDurationToCronExpression,
} from "./util";
import * as cloud from "../cloud";
import { Code } from "../core";
import { IInflightHost, Resource } from "../std";
import { BaseResourceSchema } from "../testing";
import { convertBetweenHandlers } from "../utils/convert";

/**
 * Simulator implementation of `cloud.Schedule`.
 *
 * @inflight `@winglang/sdk.cloud.IScheduleClient`
 */
export class Schedule extends cloud.Schedule implements ISimulatorResource {
  private readonly cronExpression: string;

  constructor(scope: Construct, id: string, props: cloud.ScheduleProps = {}) {
    super(scope, id, props);
    const { rate, cron } = props;

    this.cronExpression = cron ?? convertDurationToCronExpression(rate!);
  }

  public onTick(
    inflight: cloud.IScheduleOnTickHandler,
    props: cloud.ScheduleOnTickProps = {}
  ): cloud.Function {
    const hash = inflight.node.addr.slice(-8);
    const functionHandler = convertBetweenHandlers(
      this.node.scope!,
      `${this.node.id}OnTickHandler${hash}`,
      inflight,
      join(__dirname, "schedule.ontick.inflight.js"),
      "ScheduleOnTickHandlerClient"
    );

    const fn = Function._newFunction(
      this.node.scope!,
      `${this.node.id}-OnTick-${hash}`,
      functionHandler,
      props
    );

    new EventMapping(this, `${this.node.id}-OnTickMapping-${hash}`, {
      subscriber: fn,
      publisher: this,
      subscriptionProps: {},
    });

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: "on_tick",
    });

    return fn;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: ScheduleSchema = {
      type: SCHEDULE_TYPE,
      path: this.node.path,
      props: {
        cronExpression: this.cronExpression,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _toInflight(): Code {
    return makeSimulatorJsClient(__filename, this);
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super._bind(host, ops);
  }
}
