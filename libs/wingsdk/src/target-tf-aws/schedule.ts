import { join } from "path";
import { Construct } from "constructs";
import { App } from "./app";
import { Function } from "./function";
import { CloudwatchEventRule } from "../.gen/providers/aws/cloudwatch-event-rule";
import { CloudwatchEventTarget } from "../.gen/providers/aws/cloudwatch-event-target";
import * as cloud from "../cloud";
import * as core from "../core";
import { convertBetweenHandlers } from "../shared/convert";
import { convertUnixCrontoAWSCron } from "../shared-aws/schedule";
import { Node } from "../std";

/**
 * AWS implementation of `cloud.Schedule`.
 *
 * @inflight `@winglang/sdk.cloud.IScheduleClient`
 */
export class Schedule extends cloud.Schedule {
  private readonly scheduleExpression: string;
  private readonly rule: CloudwatchEventRule;
  private readonly handlers: Record<string, Function> = {};

  constructor(scope: Construct, id: string, props: cloud.ScheduleProps = {}) {
    super(scope, id, props);

    const { rate, cron } = props;

    this.scheduleExpression = rate
      ? rate.minutes === 1
        ? `rate(${rate.minutes} minute)`
        : `rate(${rate.minutes} minutes)`
      : `cron(${convertUnixCrontoAWSCron(cron!)})`;

    this.rule = new CloudwatchEventRule(this, "Schedule", {
      isEnabled: true,
      scheduleExpression: this.scheduleExpression,
    });
  }

  public onTick(
    inflight: cloud.IScheduleOnTickHandler,
    props: cloud.ScheduleOnTickOptions = {}
  ): cloud.Function {
    const functionHandler = convertBetweenHandlers(
      inflight,
      join(
        __dirname.replace("target-tf-aws", "shared-aws"),
        "schedule.ontick.inflight.js"
      ),
      "ScheduleOnTickHandlerClient"
    );

    let fn = this.handlers[inflight._id];
    if (fn) {
      return fn;
    }

    fn = new Function(
      this,
      App.of(this).makeId(this, "OnTick"),
      functionHandler,
      props
    );
    this.handlers[inflight._id] = fn;

    // TODO: remove this constraint by adding generic permission APIs to cloud.Function
    if (!(fn instanceof Function)) {
      throw new Error(
        "Schedule only supports creating tfaws.Function right now"
      );
    }

    fn.addPermissionToInvoke(this, "events.amazonaws.com", this.rule.arn);

    new CloudwatchEventTarget(
      this,
      App.of(this).makeId(this, "ScheduleTarget"),
      {
        arn: fn.qualifiedArn,
        rule: this.rule.name,
      }
    );

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "onTick()",
    });

    return fn;
  }

  /** @internal */
  public _toInflight(): string {
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
