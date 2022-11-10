import { ISimulatorContext } from "../testing/simulator";
import { IFunctionClient } from "./function";
import { IQueueClient } from "./queue";
import { ISimulatorResource } from "./resource";
import { QueueSchema, QueueSubscriber } from "./schema-resources";
import { RandomArrayIterator } from "./util.inflight";

export class Queue implements IQueueClient, ISimulatorResource {
  private readonly messages = new Array<string>();
  private readonly subscribers = new Array<QueueSubscriber>();
  private readonly intervalId: NodeJS.Timeout;
  private readonly context: ISimulatorContext;

  constructor(props: QueueSchema["props"], context: ISimulatorContext) {
    for (const sub of props.subscribers) {
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
    this.messages.push(message);
    return;
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
        const event = JSON.stringify({ messages });
        void fnClient.invoke(event).catch((err) => {
          // If the function returns an error, put the message back on the queue
          this.messages.push(...messages);
          console.error(
            `Error invoking queue subscriber "${subscriber.functionHandle}" with event "${event}":`,
            err
          );
        });
        processedMessages = true;
      }
    } while (processedMessages);
  }
}
