import { join } from "path";
import { Construct } from "constructs";
import { EventMapping } from "./event-mapping";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";
import { ScheduleSchema } from "./schema-resources";
import {
  bindSimulatorResource,
  makeSimulatorJsClient,
  convertDurationToCronExpression,
} from "./util";
import * as cloud from "../cloud";
import { convertBetweenHandlers } from "../shared/convert";
import { BaseResourceSchema } from "../simulator";
import { IInflightHost, Node, SDK_SOURCE_MODULE } from "../std";

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
    props: cloud.ScheduleOnTickOptions = {}
  ): cloud.Function {
    const hash = inflight.node.addr.slice(-8);
    const functionHandler = convertBetweenHandlers(
      this,
      `${this.node.id}OnTickHandler${hash}`,
      inflight,
      join(__dirname, "schedule.ontick.inflight.js"),
      "ScheduleOnTickHandlerClient"
    );

    const fn = Function._newFunction(
      this,
      `${this.node.id}-OnTick-${hash}`,
      functionHandler,
      props
    );
    Node.of(fn).sourceModule = SDK_SOURCE_MODULE;
    Node.of(fn).title = "onTick()";

    new EventMapping(this, `${this.node.id}-OnTickMapping-${hash}`, {
      subscriber: fn,
      publisher: this,
      subscriptionProps: {},
    });

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "onTick()",
    });

    return fn;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: ScheduleSchema = {
      type: cloud.SCHEDULE_FQN,
      path: this.node.path,
      props: {
        cronExpression: this.cronExpression,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.onLift(host, ops);
  }
}
