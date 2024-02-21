import { CronExpression, parseExpression } from "cron-parser";
import { IEventPublisher } from "./event-mapping";
import {
  EventSubscription,
  ScheduleAttributes,
  ScheduleSchema,
  ScheduleTask,
} from "./schema-resources";
import { IFunctionClient, IScheduleClient, SCHEDULE_FQN } from "../cloud";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";
import { TraceType } from "../std";

export class Schedule
  implements IScheduleClient, ISimulatorResourceInstance, IEventPublisher
{
  private readonly context: ISimulatorContext;
  private tasks = new Array<ScheduleTask>();
  private interval: CronExpression;
  private intervalTimeout?: NodeJS.Timeout;

  constructor(props: ScheduleSchema["props"], context: ISimulatorContext) {
    this.context = context;
    this.interval = parseExpression(props.cronExpression, { utc: true });
    this.scheduleFunction();
  }

  // Calculate the delay for the next execution
  private nextDelay(interval: CronExpression) {
    return interval.next().toDate().getTime() - Date.now();
  }

  // Recursively schedule the function to be executed
  private scheduleFunction() {
    this.intervalTimeout = setTimeout(() => {
      this.runTasks();
      this.scheduleFunction();
    }, this.nextDelay(this.interval));
  }

  public async init(): Promise<ScheduleAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {
    clearTimeout(this.intervalTimeout);
  }

  public async save(): Promise<void> {}

  public async addEventSubscription(
    subscriber: string,
    subscriptionProps: EventSubscription
  ) {
    const task = {
      functionHandle: subscriber,
      ...subscriptionProps,
    } as ScheduleTask;
    this.tasks.push(task);
  }

  public async removeEventSubscription(subscriber: string): Promise<void> {
    const index = this.tasks.findIndex((s) => s.functionHandle === subscriber);
    if (index >= 0) {
      this.tasks.splice(index, 1);
    }
  }

  private runTasks() {
    for (const task of this.tasks) {
      const fnClient = this.context.findInstance(
        task.functionHandle!
      ) as IFunctionClient & ISimulatorResourceInstance;
      if (!fnClient) {
        throw new Error("No function client found for task.");
      }

      this.context.addTrace({
        type: TraceType.RESOURCE,
        data: {
          message: `Running task with function handle: ${task.functionHandle}.`,
        },
        sourcePath: this.context.resourcePath,
        sourceType: SCHEDULE_FQN,
        timestamp: new Date().toISOString(),
      });

      void fnClient.invoke().catch((err) => {
        this.context.addTrace({
          data: {
            message: `Schedule error: ${err}`,
          },
          sourcePath: this.context.resourcePath,
          sourceType: SCHEDULE_FQN,
          timestamp: new Date().toISOString(),
          type: TraceType.RESOURCE,
        });
      });
    }
  }
}
