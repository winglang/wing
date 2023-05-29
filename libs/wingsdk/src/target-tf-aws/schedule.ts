import { join } from "path";
import { Construct } from "constructs";
import { Function } from "./function";
import { CloudwatchEventRule } from "../.gen/providers/aws/cloudwatch-event-rule";
import { CloudwatchEventTarget } from "../.gen/providers/aws/cloudwatch-event-target";
import * as cloud from "../cloud";
import * as core from "../core";
import { convertBetweenHandlers } from "../shared/convert";
import { Resource } from "../std";

/**
 * AWS implementation of `cloud.Schedule`.
 *
 * @inflight `@winglang/sdk.cloud.IScheduleClient`
 */
export class Schedule extends cloud.Schedule {
  private readonly scheduleExpression: string;
  private readonly rule: CloudwatchEventRule;

  constructor(scope: Construct, id: string, props: cloud.ScheduleProps = {}) {
    super(scope, id, props);

    const { rate, cron } = props;

    /*
     * The schedule cron string is Unix cron format: [minute] [hour] [day of month] [month] [day of week]
     * AWS EventBridge Schedule uses a 6 field format which includes year: [minute] [hour] [day of month] [month] [day of week] [year]
     * https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#cron-based
     *
     * We append * to the cron string for year field.
     */
    this.scheduleExpression = rate
      ? rate.minutes === 1
        ? `rate(${rate.minutes} minute)`
        : `rate(${rate.minutes} minutes)`
      : `cron(${cron} *)`;

    this.rule = new CloudwatchEventRule(this, "Schedule", {
      isEnabled: true,
      scheduleExpression: this.scheduleExpression,
    });
  }

  public onTick(
    inflight: cloud.IScheduleOnTickHandler,
    props: cloud.ScheduleOnTickProps = {}
  ): cloud.Function {
    const hash = inflight.node.addr.slice(-8);
    const functionHandler = convertBetweenHandlers(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnTickHandler-${hash}`,
      inflight,
      join(
        __dirname.replace("target-tf-aws", "shared-aws"),
        "schedule.ontick.inflight.js"
      ),
      "ScheduleOnTickHandlerClient"
    );

    const fn = Function._newFunction(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnTick-${hash}`,
      functionHandler,
      props
    );

    // TODO: remove this constraint by adding generic permission APIs to cloud.Function
    if (!(fn instanceof Function)) {
      throw new Error(
        "Schedule only supports creating tfaws.Function right now"
      );
    }

    fn.addPermissionToInvoke(this, "events.amazonaws.com", this.rule.arn);

    new CloudwatchEventTarget(this, `ScheduleTarget-${hash}`, {
      arn: fn.qualifiedArn,
      rule: this.rule.name,
    });

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: "on_tick",
    });

    return fn;
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "ScheduleClient",
      [`process.env["${this.envName()}"]`]
    );
  }

  private envName(): string {
    return `SCHEDULE_EVENT_${this.node.addr.slice(-8)}`;
  }
}
