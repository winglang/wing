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
import { convertUnixCronToAWSCron } from "@winglang/sdk/lib/shared-aws/schedule";

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

    if (cron) {
      let cronOpt: { [k: string]: string } = {};
      const awsCron = convertUnixCronToAWSCron(cron);
      const cronArr = awsCron.split(" ");
      if (cronArr[0] !== "*" && cronArr[0] !== "?") { cronOpt.minute = cronArr[0]; }
      if (cronArr[1] !== "*" && cronArr[1] !== "?") { cronOpt.hour = cronArr[1]; }
      if (cronArr[2] !== "*" && cronArr[2] !== "?") { cronOpt.day = cronArr[2]; }
      if (cronArr[3] !== "*" && cronArr[3] !== "?") { cronOpt.month = cronArr[3]; }
      if (cronArr[4] !== "*" && cronArr[4] !== "?") { cronOpt.weekDay = cronArr[4]; }

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
        __dirname,
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
      __dirname,
      __filename,
      "ScheduleClient",
      [`process.env["${this.envName()}"]`]
    );
  }

  private envName(): string {
    return `SCHEDULE_EVENT_${this.node.addr.slice(-8)}`;
  }
}
