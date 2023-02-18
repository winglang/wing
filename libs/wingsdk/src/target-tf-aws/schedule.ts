import { join } from "path";
import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { IamRolePolicy } from "@cdktf/provider-aws/lib/iam-role-policy";
import { SchedulerSchedule } from "@cdktf/provider-aws/lib/scheduler-schedule";
import { Construct } from "constructs";
import { Function } from "./function";
import * as cloud from "../cloud";
import { convertBetweenHandlers } from "../convert";
import * as core from "../core";

/**
 * AWS implementation of `cloud.Schedule`.
 *
 * @inflight `@winglang/sdk.cloud.IScheduleClient`
 */
export class Schedule extends cloud.ScheduleBase {
  private readonly scheduleExpression: string;

  constructor(scope: Construct, id: string, props: cloud.ScheduleProps = {}) {
    super(scope, id, props);

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

    /*
     * The schedule cron string is Unix cron format: [minute] [hour] [day of month] [month] [day of week]
     * AWS EventBridge Schedule uses a 6 field format which includes year: [minute] [hour] [day of month] [month] [day of week] [year]
     * https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#cron-based
     *
     * We append * to the cron string for year field.
     */
    this.scheduleExpression = rate
      ? `rate(${rate.minutes} minutes)`
      : `cron(${cron} *)`;
  }

  public onTick(
    inflight: core.Inflight,
    props: cloud.ScheduleOnTickProps = {}
  ): cloud.Function {
    const hash = inflight.node.addr.slice(-8);
    const functionHandler = convertBetweenHandlers(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnTickHandler-${hash}`,
      inflight,
      join(__dirname, "schedule.ontick.inflight.js"),
      "ScheduleOnTickHandlerClient"
    );

    const fn = new cloud.Function(
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

    core.Resource.addConnection({
      from: this,
      to: fn,
      relationship: "on_tick",
    });

    const role = new IamRole(this, `${this.node.id}-ScheduleRole-${hash}`, {
      assumeRolePolicy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: ["sts:AssumeRole"],
            Principal: {
              Service: "scheduler.amazonaws.com",
            },
          },
        ],
      }),
    });
    new IamRolePolicy(this, `${this.node.id}-SchedulePolicy-${hash}`, {
      role: role.name,
      policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: "lambda:InvokeFunction",
            Resource: fn.arn,
          },
        ],
      }),
    });

    new SchedulerSchedule(this, `${this.node.id}-ScheduleEvent-${hash}`, {
      flexibleTimeWindow: { mode: "OFF" },
      scheduleExpression: this.scheduleExpression,
      target: {
        arn: fn.arn,
        roleArn: role.arn,
      },
    });

    return fn;
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__filename, "ScheduleClient", [
      `process.env["${this.envName()}"]`,
    ]);
  }

  private envName(): string {
    return `SCHEDULE_EVENT_${this.node.addr.slice(-8)}`;
  }
}
