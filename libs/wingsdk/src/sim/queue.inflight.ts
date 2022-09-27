import { IQueueClient } from "../cloud";
import { FunctionClient } from "./function.inflight";

// TODO: move core logic of queue simulation to queue.sim.ts

interface QueueSubscriber {
  readonly client: FunctionClient;
  readonly batchSize: number;
}

export class QueueClient implements IQueueClient {
  private readonly messages = new Array<string>();
  private readonly intervalId: NodeJS.Timer;
  constructor(
    private readonly subscribers: QueueSubscriber[],
    initialMessages: string[] = []
  ) {
    this.messages.push(...initialMessages);
    this.intervalId = setInterval(() => this.poll(), 100); // every 0.1 seconds
  }

  public async push(message: string): Promise<void> {
    this.messages.push(message);
  }

  private poll() {
    let processedMessages = false;
    do {
      processedMessages = false;
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

  public close() {
    clearInterval(this.intervalId);
  }
}

class RandomArrayIterator<T = any> implements Iterable<T> {
  private length: number;
  constructor(private readonly values: T[]) {
    this.length = this.values.length;
  }

  next() {
    if (this.length === 0) {
      return { done: true, value: undefined } as { done: true; value: T };
    }

    const i = Math.floor(Math.random() * this.length);
    const j = --this.length;
    const value = this.values[i];

    this.values[i] = this.values[j];
    this.values[j] = value;

    return { done: false, value } as { done: false; value: T };
  }

  [Symbol.iterator]() {
    return this;
  }
}
