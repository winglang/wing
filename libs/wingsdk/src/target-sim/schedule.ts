import { Construct } from "constructs";
import * as cloud from "../cloud";
import { Code } from "../core";
import { Function } from "./function";
import { convertBetweenHandlers } from "../utils/convert";
import { join } from "path";
import { EventMapping } from "./event-mapping";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "../testing";
import { Duration, IInflightHost, Resource } from "../std";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import { SCHEDULE_TYPE, ScheduleSchema } from "./schema-resources";

/**
 * Simulator implementation of `cloud.Schedule`.
 * 
 * @inflight `@winglang/sdk.cloud.IScheduleClient`
 */
export class Schedule extends cloud.Schedule implements ISimulatorResource {
  private readonly cronExpression: string;
  
  constructor(scope: Construct, id: string, props: cloud.ScheduleProps = {}) {
    super(scope, id, props)
    const { rate, cron } = props;

    if (rate && cron) {
      throw new Error("rate and cron cannot be configured simultaneously.");
    }
    if (!rate && !cron) {
      throw new Error("rate or cron need to be filled.");
    }
    if (rate && rate.seconds < 60) {
      throw new Error("rate can not be set to less than 1 minute.");
    }
    if (cron && cron.split(" ").length > 5) {
      throw new Error(
        "cron string must be UNIX cron format [minute] [hour] [day of month] [month] [day of week]"
      );
    }

    this.cronExpression = cron ?? this.convertDurationToCron(rate!);
  }

  // helper function to convert duration to a cron string
  private convertDurationToCron(dur: Duration): string {
    const m = Math.floor(dur.minutes);
    const h = Math.floor(dur.hours);

    const minute = m != 0 ? `*/${m}` : '*';
    const hour = h != 0 ? `*/${h}` : '*';
    // TODO: Support longer durations once we implement https://github.com/winglang/wing/issues/2243
    // for now we just use * for day, month and year
    const day = '*';
    const month = '*';
    const year = '*';

    // Generate cron string based on the duration
    const cronString = `${minute} ${hour} ${day} ${month} ${year}`;
    return cronString;
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
      `${this.node.id}-OnTickFunction-${hash}`,
      functionHandler,
      props
    );
      
    new EventMapping(this, `${this.node.id}-OnTickMapping-${hash}`, {
      subscriber: fn,
      publisher: this,
      subscriptionProps: {}
    });

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: "on_tick"
    });

    return fn;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: ScheduleSchema = {
      type: SCHEDULE_TYPE,
      path: this.node.path,
      props: {
        cronExpression: this.cronExpression
      },
      attrs: {} as any
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