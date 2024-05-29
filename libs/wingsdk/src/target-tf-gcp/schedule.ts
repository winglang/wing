import { Construct } from "constructs";
import { App } from "./app";
import { Function } from "./function";
import { CloudSchedulerJob } from "../.gen/providers/google/cloud-scheduler-job";
import { ServiceAccount } from "../.gen/providers/google/service-account";
import * as cloud from "../cloud";
import * as core from "../core";
import { Node } from "../std";

/**
 * GCP implementation of `cloud.Schedule`.
 *
 * @inflight `@winglang/sdk.cloud.IScheduleClient`
 */
export class Schedule extends cloud.Schedule {
  private readonly scheduleExpression: string;
  // private readonly scheduler: CloudSchedulerJob;
  private readonly handlers: Record<string, Function> = {};

  constructor(scope: Construct, id: string, props: cloud.ScheduleProps = {}) {
    super(scope, id, props);

    const { rate, cron } = props;

    /*
     * A schedule is defined using the unix-cron string format (* * * * *) which
     * is a set of five fields in a line, indicating when the job should be executed.
     * https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules
     */
    this.scheduleExpression = (
      rate ? `*/${rate.minutes} * * * *` : cron
    ) as string;
  }

  public onTick(
    inflight: cloud.IScheduleOnTickHandler,
    props: cloud.ScheduleOnTickOptions = {}
  ): cloud.Function {
    const uniqueId = this.node.addr.substring(0, 8);

    const functionHandler = core.lift({ inflight }).inflight(async (ctx) => {
      await ctx.inflight();
    });

    let cronFunction = this.handlers[inflight._id];
    if (cronFunction) {
      return cronFunction;
    }

    cronFunction = new Function(
      this,
      App.of(this).makeId(this, "OnTick"),
      functionHandler,
      props
    );
    this.handlers[inflight._id] = cronFunction;

    // create scheduler service account
    const schedulerServiceAccount = new ServiceAccount(
      this,
      "SchedulerServiceAccount",
      {
        accountId: `scheduler-${uniqueId}-sa`,
        displayName: `Service Account for scheduler-${uniqueId}`,
      }
    );

    // allow scheduler service account to invoke cron function
    cronFunction._addPermissionToInvoke(schedulerServiceAccount);

    // create scheduler
    new CloudSchedulerJob(this, "Scheduler", {
      name: `scheduler-${uniqueId}`,
      description: `Trigger ${cronFunction.functionName}`,
      schedule: this.scheduleExpression,
      timeZone: "Etc/UTC",
      attemptDeadline: "300s",
      httpTarget: {
        httpMethod: "GET",
        uri: cronFunction._getHttpsTriggerUrl(),
        oidcToken: {
          serviceAccountEmail: schedulerServiceAccount.email,
        },
      },
    });

    Node.of(this).addConnection({
      source: this,
      sourceOp: cloud.ScheduleInflightMethods.TICK,
      target: cronFunction,
      targetOp: cloud.FunctionInflightMethods.INVOKE,
      name: "onTick()",
    });

    return cronFunction;
  }
}
