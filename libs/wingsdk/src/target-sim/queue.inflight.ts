import { IEventPublisher } from "./event-mapping";
import type { Function as FunctionClient } from "./function.inflight";
import {
  QueueAttributes,
  QueueSchema,
  QueueSubscriber,
  EventSubscription,
  ResourceHandle,
} from "./schema-resources";
import { IFunctionClient, IQueueClient, QUEUE_FQN } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator/simulator";
import { Json, TraceType } from "../std";

export class Queue
  implements IQueueClient, ISimulatorResourceInstance, IEventPublisher
{
  private readonly messages = new Array<QueueMessage>();
  private readonly subscribers = new Array<QueueSubscriber>();
  private readonly processLoop: LoopController;
  private _context: ISimulatorContext | undefined;
  private readonly timeoutSeconds: number;
  private readonly retentionPeriod: number;

  constructor(props: QueueSchema) {
    this.timeoutSeconds = props.timeout;
    this.retentionPeriod = props.retentionPeriod;
    this.processLoop = runEvery(100, async () => this.processMessages()); // every 0.1 seconds
  }

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  public async init(context: ISimulatorContext): Promise<QueueAttributes> {
    this._context = context;
    await this.processLoop.start();
    return {};
  }

  public async cleanup(): Promise<void> {
    await this.processLoop.stop();
  }

  public async save(): Promise<void> {}

  public async plan() {
    return UpdatePlan.AUTO;
  }

  public async addEventSubscription(
    subscriber: ResourceHandle,
    subscriptionProps: EventSubscription
  ): Promise<void> {
    const s = {
      functionHandle: subscriber,
      ...subscriptionProps,
    } as QueueSubscriber;
    this.subscribers.push(s);
  }

  public async removeEventSubscription(
    subscriber: ResourceHandle
  ): Promise<void> {
    const index = this.subscribers.findIndex(
      (s) => s.functionHandle === subscriber
    );
    if (index >= 0) {
      this.subscribers.splice(index, 1);
    }
  }

  // TODO: enforce maximum queue message size?
  public async push(...messages: string[]): Promise<void> {
    return this.context.withTrace({
      message: `Push (messages=${messages}).`,
      activity: async () => {
        if (messages.includes("")) {
          throw new Error("Empty messages are not allowed");
        }
        for (const message of messages) {
          this.messages.push(new QueueMessage(this.retentionPeriod, message));
        }
      },
    });
  }

  public async purge(): Promise<void> {
    return this.context.withTrace({
      message: `Purge ().`,
      activity: async () => {
        this.messages.length = 0;
      },
    });
  }

  public async approxSize(): Promise<number> {
    return this.context.withTrace({
      message: `ApproxSize ().`,
      activity: async () => {
        return this.messages.length;
      },
    });
  }

  public async pop(): Promise<string | undefined> {
    return this.context.withTrace({
      message: `Pop ().`,
      activity: async () => {
        // extract a random message from the queue
        const message = this.messages.splice(
          Math.floor(Math.random() * this.messages.length),
          1
        )[0];
        return message?.payload;
      },
    });
  }

  private async processMessages() {
    let processedMessages = false;
    do {
      processedMessages = false;
      // Remove messages that have expired
      const currentTime = new Date();
      for (let index = this.messages.length - 1; index >= 0; index--) {
        const message = this.messages[index];
        if (message.retentionTimeout < currentTime) {
          await this.context.withTrace({
            activity: async () => this.messages.splice(index, 1),
            message: `Removing expired message (message=${message.payload}).`,
          });
        }
      }
      // Randomize the order of subscribers to avoid user code making
      // assumptions on the order that subscribers process messages.
      for (const subscriber of new RandomArrayIterator(this.subscribers)) {
        // Extract random messages from the queue
        const messages = new Array<QueueMessage>();
        for (let i = 0; i < subscriber.batchSize; i++) {
          const message = this.messages.splice(
            Math.floor(Math.random() * this.messages.length),
            1
          )[0];
          if (message) {
            messages.push(message);
          }
        }
        const messagesPayload = messages.map((m) => m.payload);
        if (messagesPayload.length === 0) {
          continue;
        }

        const fnClient = this.context.getClient(
          subscriber.functionHandle
        ) as IFunctionClient;
        if (!fnClient) {
          throw new Error("No function client found");
        }

        // If the function we picked is at capacity, keep the messages in the queue
        const hasWorkers = await (
          fnClient as FunctionClient
        ).hasAvailableWorkers();
        if (!hasWorkers) {
          this.messages.push(...messages);
          continue;
        }

        this.context.addTrace({
          type: TraceType.RESOURCE,
          data: {
            message: `Sending messages (messages=${JSON.stringify(
              messagesPayload
            )}, subscriber=${subscriber.functionHandle}).`,
          },
          sourcePath: this.context.resourcePath,
          sourceType: QUEUE_FQN,
          timestamp: new Date().toISOString(),
        });

        // we don't use invokeAsync here because we want to wait for the function to finish
        // and requeue the messages if it fails
        void fnClient
          .invoke({ messages: messagesPayload } as unknown as Json)
          .catch((err) => {
            // If the function is at a concurrency limit, pretend we just didn't call it
            if (
              err.message ===
              "Too many requests, the function has reached its concurrency limit."
            ) {
              this.messages.push(...messages);
              return;
            }
            // If the function returns an error, put the message back on the queue after timeout period
            this.context.addTrace({
              data: {
                message: `Subscriber error - returning ${messagesPayload.length} messages to queue: ${err.message}`,
              },
              sourcePath: this.context.resourcePath,
              sourceType: QUEUE_FQN,
              type: TraceType.RESOURCE,
              timestamp: new Date().toISOString(),
            });
            this.pushMessagesBackToQueue(messages);
          });
        processedMessages = true;
      }
    } while (processedMessages);
  }

  public pushMessagesBackToQueue(messages: Array<QueueMessage>): void {
    setTimeout(() => {
      // Don't push back messages with retention timeouts that have expired
      const retainedMessages = messages.filter(
        (message) => message.retentionTimeout > new Date()
      );
      this.messages.push(...retainedMessages);
      this.context.addTrace({
        data: {
          message: `${retainedMessages.length} messages pushed back to queue after visibility timeout.`,
        },
        sourcePath: this.context.resourcePath,
        sourceType: QUEUE_FQN,
        type: TraceType.RESOURCE,
        timestamp: new Date().toISOString(),
      });
    }, this.timeoutSeconds * 1000);
  }
}

class QueueMessage {
  public readonly retentionTimeout: Date;
  public readonly payload: string;

  constructor(retentionPeriod: number, message: string) {
    const currentTime = new Date();
    currentTime.setSeconds(retentionPeriod + currentTime.getSeconds());
    this.retentionTimeout = currentTime;
    this.payload = message;
  }
}

class RandomArrayIterator<T = any> implements Iterable<T> {
  private length: number;
  constructor(private readonly values: T[]) {
    this.length = this.values.length;
  }

  public next(): IteratorResult<T> {
    if (this.length === 0) {
      return { done: true, value: undefined };
    }

    const i = Math.floor(Math.random() * this.length);
    const j = --this.length;
    const value = this.values[i];

    this.values[i] = this.values[j];
    this.values[j] = value;

    return { value };
  }

  public [Symbol.iterator]() {
    return this;
  }
}

interface LoopController {
  stop(): Promise<void>;
  start(): Promise<void>;
}

/**
 * Runs an asynchronous function every `interval` milliseconds.
 * If the function takes longer than `interval` to run, it will be run again immediately.
 * Otherwise, it will wait until `interval` milliseconds have passed before running again.
 * @param interval The interval in milliseconds
 * @param fn The function to run
 * @returns A controller that can be used to stop the loop
 */
function runEvery(interval: number, fn: () => Promise<void>): LoopController {
  let keepRunning = true;
  let resolveStopPromise: (value?: unknown) => void;
  let stopCalled = false; // in case it is called multiple times
  let stopPromise = new Promise((resolve) => {
    resolveStopPromise = resolve;
  });

  async function loop() {
    while (keepRunning) {
      const startTime = Date.now();
      try {
        await fn();
      } catch (err) {
        console.error(err);
        keepRunning = false;
      }
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      await new Promise((resolve) =>
        setTimeout(resolve, Math.max(interval - elapsedTime, 0))
      );
    }
    resolveStopPromise(); // resolve the promise when the loop exits
  }

  const controller = {
    async stop() {
      if (!stopCalled) {
        stopCalled = true;
        keepRunning = false;
        await stopPromise; // wait for the loop to finish
      }
    },
    async start() {
      void loop();
    },
  };

  return controller;
}
