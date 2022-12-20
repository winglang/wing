import { IFunctionClient, ITopicClient, TOPIC_TYPE } from "../cloud";
import { ISimulatorContext, TraceType } from "../testing/simulator";
import { ISimulatorResourceInstance } from "./resource";
import { TopicSchema, TopicSubscriber } from "./schema-resources";

export class Topic implements ITopicClient, ISimulatorResourceInstance {
  private readonly subscribers = new Array<TopicSubscriber>();
  private readonly context: ISimulatorContext;

  constructor(props: TopicSchema["props"], context: ISimulatorContext) {
    for (const sub of props.subscribers ?? []) {
      this.subscribers.push({ ...sub });
    }
    this.context = context;
  }

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

      void (await fnClient.invoke(message).catch((err) => {
        this.context.addTrace({
          data: {
            message: `Subscriber error: ${err}`,
          },
          sourcePath: this.context.resourcePath,
          sourceType: TOPIC_TYPE,
          type: TraceType.RESOURCE,
          timestamp: new Date().toISOString(),
        });
      }));
    }
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

  public async init(): Promise<void> {
    return;
  }
  public async cleanup(): Promise<void> {
    return;
  }
}
