import { Construct } from "constructs";
import { Function, FunctionProps } from "./function";
import { fqnForType } from "../constants";
import { AbstractMemberError } from "../core/errors";
import { INFLIGHT_SYMBOL } from "../core/types";
import { Duration, IInflight, Node, Resource } from "../std";

/**
 * Global identifier for `Queue`.
 */
export const QUEUE_FQN = fqnForType("cloud.Queue");

/**
 * List of inflight operations available for `Queue`.
 * @internal
 */
export enum QueueInflightMethods {
  PUSH = "push",
  PURGE = "purge",
  APPROX_SIZE = "approxSize",
  POP = "pop",
}

/**
 * Dead-letter queue default retries
 */
export const DEFAULT_DELIVERY_ATTEMPTS = 1;

/**
 * Dead letter queue options.
 */
export interface DeadLetterQueueProps {
  /**
   * Queue to receive messages that failed processing.
   */
  readonly queue: Queue;
  /**
   * Number of times a message will be processed before being
   * sent to the dead-letter queue.
   * @default 1
   */
  readonly maxDeliveryAttempts?: number;
}

/**
 * Options for `Queue`.
 */
export interface QueueProps {
  /**
   * How long a queue's consumers have to process a message.
   * @default 30s
   */
  readonly timeout?: Duration;

  /**
   * How long a queue retains a message.
   * @default 1h
   */
  readonly retentionPeriod?: Duration;

  /**
   * A dead-letter queue.
   * @default - no dead letter queue
   */
  readonly dlq?: DeadLetterQueueProps;
}

/**
 * A queue.
 *
 * @inflight `@winglang/sdk.cloud.IQueueClient`
 * @abstract
 */
export class Queue extends Resource {
  /** @internal */
  public static _methods = [
    QueueInflightMethods.PUSH,
    QueueInflightMethods.PURGE,
    QueueInflightMethods.APPROX_SIZE,
    QueueInflightMethods.POP,
  ];

  /** @internal */
  public [INFLIGHT_SYMBOL]?: IQueueClient;

  constructor(scope: Construct, id: string, props: QueueProps = {}) {
    if (new.target === Queue) {
      return Resource._newFromFactory(QUEUE_FQN, scope, id, props);
    }

    super(scope, id);

    Node.of(this).title = "Queue";
    Node.of(this).description = "A distributed message queue";

    props;
  }

  /**
   * Create a function to consume messages from this queue.
   * @abstract
   */
  public setConsumer(
    handler: IQueueSetConsumerHandler,
    props?: QueueSetConsumerOptions
  ): Function {
    handler;
    props;
    throw new AbstractMemberError();
  }
}

/**
 * Options for Queue.setConsumer.
 */
export interface QueueSetConsumerOptions extends FunctionProps {
  /**
   * The maximum number of messages to send to subscribers at once.
   * @default 1
   */
  readonly batchSize?: number;
}

/**
 * Inflight interface for `Queue`.
 */
export interface IQueueClient {
  /**
   * Push one or more messages to the queue.
   * @param messages Payload to send to the queue. Each message must be non-empty.
   * @inflight
   */
  push(...messages: string[]): Promise<void>;

  /**
   * Purge all of the messages in the queue.
   * @inflight
   */
  purge(): Promise<void>;

  /**
   * Retrieve the approximate number of messages in the queue.
   * @inflight
   */
  approxSize(): Promise<number>;

  /**
   * Pop a message from the queue.
   * @returns The message, or `nil` if the queue is empty.
   * @inflight
   */
  pop(): Promise<string | undefined>;
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `Queue.setConsumer`.
 *
 * @inflight `@winglang/sdk.cloud.IQueueSetConsumerHandlerClient`
 */
export interface IQueueSetConsumerHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: IQueueSetConsumerHandlerClient["handle"];
}

/**
 * Inflight client for `IQueueSetConsumerHandler`.
 */
export interface IQueueSetConsumerHandlerClient {
  /**
   * Function that will be called when a message is received from the queue.
   * @inflight
   */
  handle(message: string): Promise<void>;
}
