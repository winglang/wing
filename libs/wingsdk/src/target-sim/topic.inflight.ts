import { IEventPublisher } from "./event-mapping";
import {
  TopicAttributes,
  TopicSchema,
  TopicSubscriber,
  EventSubscription,
  FunctionHandle,
} from "./schema-resources";
import { IFunctionClient, ITopicClient, TOPIC_FQN } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../simulator/simulator";
import { TraceType } from "../std";

export class Topic
  implements ITopicClient, ISimulatorResourceInstance, IEventPublisher
{
  private readonly subscribers = new Array<TopicSubscriber>();
  private readonly context: ISimulatorContext;

  constructor(props: TopicSchema["props"], context: ISimulatorContext) {
    this.context = context;
    props;
  }

  public async init(): Promise<TopicAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async save(): Promise<void> {}

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
    subscriber: FunctionHandle,
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
