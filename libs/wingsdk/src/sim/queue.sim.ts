import { IResourceResolver } from "../testing/simulator";
import { FunctionClient } from "./function.inflight";
import { QueueSchema, QueueSubscriber } from "./schema";
import { RandomArrayIterator } from "./util.sim";

export const QUEUES = new Array<Queue | undefined>();

interface QueueSubscriberInternal extends QueueSubscriber {
  functionClient?: FunctionClient;
}

export async function init(
  props: QueueSchema["props"] & { _resolver: IResourceResolver }
): Promise<QueueSchema["attrs"]> {
  const q = new Queue(props);
  const addr = QUEUES.push(q) - 1;
  return {
    queueAddr: addr,
  };
}

export async function cleanup(attrs: QueueSchema["attrs"]) {
  const queueAddr = attrs.queueAddr;
  const q = QUEUES[queueAddr];
  if (!q) {
    throw new Error(`Invalid queue id: ${queueAddr}`);
  }
  q.cleanup();
  QUEUES[queueAddr] = undefined;
}

export class Queue {
  private readonly messages = new Array<string>();
  private readonly subscribers = new Array<QueueSubscriberInternal>();
  private readonly intervalId: NodeJS.Timeout;

  constructor(props: QueueSchema["props"] & { _resolver: IResourceResolver }) {
    this.subscribers.push(...props.subscribers);
    for (const subscriber of this.subscribers) {
      const functionId = subscriber.functionId;
      // TODO: how to make this more type safe? ("lookup" returns any)
      const functionAddr = props._resolver.lookup(functionId).functionAddr;
      subscriber.functionClient = new FunctionClient(functionAddr);
    }

    if (props.initialMessages) {
      this.messages.push(...props.initialMessages);
    }

    this.intervalId = setInterval(() => this.processMessages(), 100); // every 0.1 seconds
  }

  public push(message: string) {
    this.messages.push(message);
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
        const fnClient = subscriber.functionClient;
        if (!fnClient) {
          throw new Error("No function client found");
        }
        void fnClient.invoke(JSON.stringify({ messages })).catch(() => {
          // If the function returns an error, put the message back on the queue
          this.messages.push(...messages);
        });
        processedMessages = true;
      }
    } while (processedMessages);
  }

  public cleanup() {
    clearInterval(this.intervalId);
  }
}
