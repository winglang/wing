import { join } from "path";
import { Construct } from "constructs";
import { App } from "./app";
import { Function } from "./function";
import { CloudSchedulerJob } from "../.gen/providers/google/cloud-scheduler-job";
import { ProjectService } from "../.gen/providers/google/project-service";
import { ServiceAccount } from "../.gen/providers/google/service-account";
import * as cloud from "../cloud";
import * as core from "../core";
import { convertBetweenHandlers } from "../shared/convert";
// import {
//   CaseConventions,
//   NameOptions,
//   ResourceNames,
// } from "../shared/resource-names";
// import { IInflightHost } from "../std";

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

    const cloudSchedulerApi = new ProjectService(this, "CloudSchedulerAPI", {
      service: "cloudscheduler.googleapis.com",
      disableOnDestroy: false,
    });

    const functionHandler = convertBetweenHandlers(
      inflight,
      join(
        __dirname.replace("target-tf-gcp", "shared-gcp"),
        "schedule.ontick.inflight.js"
      ),
      "ScheduleOnTickHandlerClient"
    );

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

    // const cronFunction = new CloudfunctionsFunction(this, "CronFunction", {
    //   name: `cron-function-${uniqueId}`,
    //   region: gcpProvider.region!,
    //   runtime: "nodejs20",
    //   sourceArchiveBucket: cronFunctionSourceBucket.name,
    //   sourceArchiveObject: cronFunctionSourceObject.name,
    //   entryPoint: "handler",
    //   triggerHttp: true,
    //   httpsTriggerSecurityLevel: "SECURE_ALWAYS",
    //   serviceAccountEmail: cronFunctionServiceAccount.email,
    // });

    const schedulerServiceAccount = new ServiceAccount(
      this,
      "SchedulerServiceAccount",
      {
        accountId: `scheduler-${uniqueId}-sa`,
        displayName: `Service Account for scheduler-${uniqueId}`,
      }
    );

    cronFunction.addPermissionToInvoke(schedulerServiceAccount);

    new CloudSchedulerJob(this, "Scheduler", {
      name: `scheduler-${uniqueId}`,
      description: `Trigger ${cronFunction.name}`,
      schedule: this.scheduleExpression,
      timeZone: "Etc/UTC",
      attemptDeadline: "300s",
      httpTarget: {
        httpMethod: "GET",
        uri: cronFunction.httpsTriggerUrl,
        oidcToken: { serviceAccountEmail: schedulerServiceAccount.email },
      },
      dependsOn: [cloudSchedulerApi],
    });
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-gcp", "shared-gcp"),
      __filename,
      "ScheduleClient",
      [`process.env["${this.envName()}"]`]
    );
  }

  private envName(): string {
    return `SCHEDULER_JOB_${this.node.addr.slice(-8)}`;
  }
}
