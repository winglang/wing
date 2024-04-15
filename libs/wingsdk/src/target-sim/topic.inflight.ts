import { IEventPublisher } from "./event-mapping";
import {
  TopicAttributes,
  TopicSchema,
  TopicSubscriber,
  EventSubscription,
  ResourceHandle,
} from "./schema-resources";
import { IFunctionClient, ITopicClient, TOPIC_FQN } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator/simulator";
import { TraceType } from "../std";

export class Topic
  implements ITopicClient, ISimulatorResourceInstance, IEventPublisher
{
  private readonly subscribers = new Array<TopicSubscriber>();
  private _context: ISimulatorContext | undefined;

  constructor(_props: TopicSchema) {}

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  public async init(context: ISimulatorContext): Promise<TopicAttributes> {
    this._context = context;
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async save(): Promise<void> {}

  public async plan() {
    return UpdatePlan.AUTO;
  }

  private async publishMessage(message: string) {
    for (const subscriber of this.subscribers) {
      const fnClient = this.context.getClient(
        subscriber.functionHandle
      ) as IFunctionClient;
      this.context.addTrace({
        type: TraceType.RESOURCE,
        data: {
          message: `Sending message (message=${message}, subscriber=${subscriber.functionHandle}).`,
        },
        sourcePath: this.context.resourcePath,
        sourceType: TOPIC_FQN,
        timestamp: new Date().toISOString(),
      });

      await fnClient.invokeAsync(message);
    }
  }

  public async addEventSubscription(
    subscriber: ResourceHandle,
    subscriptionProps: EventSubscription
  ): Promise<void> {
    let s = {
      functionHandle: subscriber,
      ...subscriptionProps,
    } as TopicSubscriber;
    this.subscribers.push(s);
  }

  public async removeEventSubscription(subscriber: string): Promise<void> {
    const index = this.subscribers.findIndex(
      (s) => s.functionHandle === subscriber
    );
    if (index >= 0) {
      this.subscribers.splice(index, 1);
    }
  }

  public async publish(message: string): Promise<void> {
    this.context.addTrace({
      data: {
        message: `Publish (message=${message}).`,
      },
      sourcePath: this.context.resourcePath,
      sourceType: TOPIC_FQN,
      type: TraceType.RESOURCE,
      timestamp: new Date().toISOString(),
    });

    return this.publishMessage(message);
  }
}
