import { FunctionClient } from "./function.inflight";
import { RandomArrayIterator } from "./util.sim";

export const QUEUES = new Array<Queue | undefined>();

export interface QueueSubscriber {
  readonly client: FunctionClient;
  readonly batchSize: number;
}

export interface QueueProps {
  readonly subscribers: QueueSubscriber[];
  readonly initialMessages?: string[];
}

export async function init(props: QueueProps): Promise<{ queueId: number }> {
  const q = new Queue(props);
  const id = QUEUES.push(q) - 1;
  return {
    queueId: id,
  };
}

export async function cleanup(queueId: number) {
  const q = QUEUES[queueId];
  if (!q) {
    throw new Error(`Invalid queue id: ${queueId}`);
  }
  q.cleanup();
  QUEUES[queueId] = undefined;
}

export class Queue {
  private readonly messages = new Array<string>();
  private readonly subscribers = new Array<QueueSubscriber>();
  private readonly intervalId: NodeJS.Timeout;

  constructor(props: QueueProps) {
    this.subscribers.push(...props.subscribers);
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
        void subscriber.client
          .invoke(JSON.stringify({ messages }))
          .catch(() => {
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
