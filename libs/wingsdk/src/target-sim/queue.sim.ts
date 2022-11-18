import { IFunctionClient, IQueueClient, QUEUE_TYPE } from "../cloud";
import { ISimulatorContext, TraceType } from "../testing/simulator";
import { ISimulatorResource } from "./resource";
import { QueueSchema, QueueSubscriber } from "./schema-resources";
import { RandomArrayIterator } from "./util.sim";

export class Queue implements IQueueClient, ISimulatorResource {
  private readonly messages = new Array<string>();
  private readonly subscribers = new Array<QueueSubscriber>();
  private readonly intervalId: NodeJS.Timeout;
  private readonly context: ISimulatorContext;

  constructor(props: QueueSchema["props"], context: ISimulatorContext) {
    for (const sub of props.subscribers ?? []) {
      this.subscribers.push({ ...sub });
    }

    if (props.initialMessages) {
      this.messages.push(...props.initialMessages);
    }

    this.intervalId = setInterval(() => this.processMessages(), 100); // every 0.1 seconds
    this.context = context;
  }

  public async init(): Promise<void> {
    return;
  }

  public async cleanup(): Promise<void> {
    clearInterval(this.intervalId);
  }

  public async push(message: string): Promise<void> {
    // TODO: enforce maximum queue message size?
    return this.context.withTrace({
      message: `Push (message=${message}).`,
      activity: async () => {
        this.messages.push(message);
      },
    });
  }

  private processMessages() {
    let processedMessages = false;
    do {
      processedMessages = false;
      // Randomize the order of subscribers to avoid user code making
      // assumptions on the order that subscribers process messages.
      for (const subscriber of new RandomArrayIterator(this.subscribers)) {
        const messages = this.messages.splice(0, subscriber.batchSize);
        if (messages.length === 0) {
          continue;
        }
        const fnClient = this.context.findInstance(
          subscriber.functionHandle!
        ) as IFunctionClient & ISimulatorResource;
        if (!fnClient) {
          throw new Error("No function client found");
        }
        this.context.addTrace({
          type: TraceType.RESOURCE,
          data: {
            message: `Sending messages (messages=${JSON.stringify(
              messages
            )}, subscriber=${subscriber.functionHandle}).`,
          },
          sourcePath: this.context.resourcePath,
          sourceType: QUEUE_TYPE,
          timestamp: new Date().toISOString(),
        });
        void fnClient.invoke(JSON.stringify({ messages })).catch((_err) => {
          // If the function returns an error, put the message back on the queue
          this.context.addTrace({
            data: {
              message: `Subscriber error - returning ${messages.length} messages to queue.`,
            },
            sourcePath: this.context.resourcePath,
            sourceType: QUEUE_TYPE,
            type: TraceType.RESOURCE,
            timestamp: new Date().toISOString(),
          });
          this.messages.push(...messages);
        });
        processedMessages = true;
      }
    } while (processedMessages);
  }
}
