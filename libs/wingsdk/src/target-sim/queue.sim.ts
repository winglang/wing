import { IFunctionClient, IQueueClient } from "../cloud";
import { ISimulatorContext } from "../testing/simulator";
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
    return;
  }

  public async push(message: string): Promise<void> {
    // TODO: enforce maximum queue message size?
    this.messages.push(message);
    this.context.addTrace({
      message: "Push operation succeeded.",
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
          message: `Sending ${messages.length} messages to subscriber ${subscriber.functionHandle}.`,
        });
        const event = JSON.stringify({ messages });
        void fnClient.invoke(event).catch((err) => {
          // If the function returns an error, put the message back on the queue
          this.context.addTrace({
            message: `Subscriber error (${err}) - returning ${messages.length} messages to queue.`,
          });
          this.messages.push(...messages);
        });
        processedMessages = true;
      }
    } while (processedMessages);
  }
}
