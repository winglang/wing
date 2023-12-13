import { join } from "path";
import { Duration } from "aws-cdk-lib";
import { Rule, Schedule as EventSchedule } from "aws-cdk-lib/aws-events";
import {
  LambdaFunction,
  addLambdaPermission,
} from "aws-cdk-lib/aws-events-targets";
import { Construct } from "constructs";
import { Function } from "./function";
import { App } from "./app";
import { cloud, core, std } from "@winglang/sdk";
import { convertBetweenHandlers } from "@winglang/sdk/lib/shared/convert";

/**
 * AWS implementation of `cloud.Schedule`.
 *
 * @inflight `@winglang/sdk.cloud.IScheduleClient`
 */
export class Schedule extends cloud.Schedule {
  private readonly scheduleExpression: EventSchedule;
  private readonly rule: Rule;

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
    if (cron) {
      const cronArr = cron.split(" ");
      let cronOpt: { [k: string]: string } = {
        minute: cronArr[0],
        hour: cronArr[1],
        month: cronArr[3],
        year: "*",
      };
      if (cronArr[2] !== "?") {
        cronOpt.day = cronArr[2];
      }
      if (cronArr[4] !== "?") {
        cronOpt.weekDay = cronArr[4];
      }

      this.scheduleExpression = EventSchedule.cron(cronOpt);
    } else {
      this.scheduleExpression = EventSchedule.rate(
        Duration.minutes(rate!.minutes)
      );
    }

    this.rule = new Rule(this, "Schedule", {
      enabled: true,
      schedule: this.scheduleExpression,
    });
  }

  public onTick(
    inflight: cloud.IScheduleOnTickHandler,
    props?: cloud.ScheduleOnTickOptions | undefined
  ): cloud.Function {
    const functionHandler = convertBetweenHandlers(
      inflight,
      join(
        __dirname.replace("target-awscdk", "shared-aws"),
        "schedule.ontick.inflight.js"
      ),
      "ScheduleOnTickHandlerClient"
    );

    const fn = new Function(
      // ok since we're not a tree root
      this.node.scope!,
      App.of(this).makeId(this, `${this.node.id}-OnTick`),
      functionHandler,
      props
    );

    // TODO: remove this constraint by adding generic permission APIs to cloud.Function
    if (!(fn instanceof Function)) {
      throw new Error(
        "Schedule only supports creating awscdk.Function right now"
      );
    }

    this.rule.addTarget(new LambdaFunction(fn._function));
    addLambdaPermission(this.rule, fn._function);

    std.Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "onTick()",
    });

    return fn;
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-awscdk", "shared-aws"),
      __filename,
      "ScheduleClient",
      [`process.env["${this.envName()}"]`]
    );
  }

  private envName(): string {
    return `SCHEDULE_EVENT_${this.node.addr.slice(-8)}`;
  }
}
