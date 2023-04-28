import { Construct } from "constructs";
import * as cloud from "../cloud";
import { Code } from "../core";
import { Function } from "./function";
import { convertBetweenHandlers } from "../utils/convert";
import { join } from "path";
import { EventMapping } from "./event-mapping";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "../testing";
import { IInflightHost, Resource } from "../std";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import { SCHEDULE_TYPE, ScheduleSchema } from "./schema-resources";


/**
 * Simulator implementation of `cloud.Schedule`.
 * 
 * @inflight `@winglang/sdk.cloud.IScheduleClient`
 */
export class Schedule extends cloud.Schedule implements ISimulatorResource {
  private readonly scheduleExpression: string;
  
  constructor(scope: Construct, id: string, props: cloud.ScheduleProps = {}) {
    super(scope, id, props)
    // TODO: support rate
    this.scheduleExpression = props.cron!;
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
      join(__dirname, "schedule.ontick.inflight.ts"),
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
        cronExpression: this.scheduleExpression
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