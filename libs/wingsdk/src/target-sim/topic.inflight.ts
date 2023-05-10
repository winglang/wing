import { IEventPublisher } from "./event-mapping";
import {
  TopicAttributes,
  TopicSchema,
  TopicSubscriber,
  TOPIC_TYPE,
  EventSubscription,
  FunctionHandle,
} from "./schema-resources";
import { IFunctionClient, ITopicClient, TraceType } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../testing/simulator";

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

  private async publishMessage(message: string) {
    for (const subscriber of this.subscribers) {
      const fnClient = this.context.findInstance(
        subscriber.functionHandle!
      ) as IFunctionClient & ISimulatorResourceInstance;

      if (!fnClient) {
        throw new Error("No function client found!");
      }

      this.context.addTrace({
        type: TraceType.RESOURCE,
        data: {
          message: `Sending message (message=${message}, subscriber=${subscriber.functionHandle}).`,
        },
        sourcePath: this.context.resourcePath,
        sourceType: TOPIC_TYPE,
        timestamp: new Date().toISOString(),
      });

      await fnClient.invoke(message).catch((err) => {
        this.context.addTrace({
          data: {
            message: `Subscriber error: ${err}`,
          },
          sourcePath: this.context.resourcePath,
          sourceType: TOPIC_TYPE,
          type: TraceType.RESOURCE,
          timestamp: new Date().toISOString(),
        });
      });
    }
  }

  async addEventSubscription(
    subscriber: FunctionHandle,
    subscriptionProps: EventSubscription
  ): Promise<void> {
    let s = {
      functionHandle: subscriber,
      ...subscriptionProps,
    } as TopicSubscriber;
    this.subscribers.push(s);
  }

  async publish(message: string): Promise<void> {
    this.context.addTrace({
      data: {
        message: `Publish (message=${message}).`,
      },
      sourcePath: this.context.resourcePath,
      sourceType: TOPIC_TYPE,
      type: TraceType.RESOURCE,
      timestamp: new Date().toISOString(),
    });

    return this.publishMessage(message);
  }
}
