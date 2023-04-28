import { IFunctionClient, IScheduleClient, TraceType } from "../cloud";
import { ISimulatorContext, ISimulatorResourceInstance } from "../testing";
import { IEventPublisher } from "./event-mapping";
import { EventSubscription, SCHEDULE_TYPE, ScheduleAttributes, ScheduleSchema, ScheduleTask } from "./schema-resources";

export class Schedule implements IScheduleClient, ISimulatorResourceInstance, IEventPublisher {
  private readonly context: ISimulatorContext;
  private readonly intervalId: NodeJS.Timeout;
  private tasks = new Array<ScheduleTask>();

  constructor(props: ScheduleSchema["props"], context: ISimulatorContext) {
    props;
    this.context = context;
    this.intervalId = setInterval(() => this.runTasks(), 1000); // every 1 second TODO: care about cron expression
  }

  public async init(): Promise<ScheduleAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {
    clearInterval(this.intervalId);
  }

  public async addEventSubscription(subscriber: string, subscriptionProps: EventSubscription) {
    const task = {
      functionHandle: subscriber,
      ...subscriptionProps,
    } as ScheduleTask;
    this.tasks.push(task);
  };

  private async runTasks() {
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
          message: `Running task for function ${task.functionHandle}.`,
        },
        sourcePath: this.context.resourcePath,
        sourceType: SCHEDULE_TYPE,
        timestamp: new Date().toISOString(),
      });

      void (await fnClient.invoke("").catch((err) => {
        console.log(err);
        this.context.addTrace({
          data: {
            message: `Schedule error: ${err}`,
          },
          sourcePath: this.context.resourcePath,
          sourceType: SCHEDULE_TYPE,
          timestamp: new Date().toISOString(),
          type: TraceType.RESOURCE,
        })
      }))
    }
  }

}