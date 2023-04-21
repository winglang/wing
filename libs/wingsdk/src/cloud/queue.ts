import { Construct } from "constructs";
import { Function, FunctionProps } from "./function";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Duration, IResource, Resource } from "../std";

/**
 * Global identifier for `Queue`.
 */
export const QUEUE_FQN = fqnForType("cloud.Queue");

/**
 * Properties for `Queue`.
 */
export interface QueueProps {
  /**
   * How long a queue's consumers have to process a message.
   * @default Duration.fromSeconds(10)
   */
  readonly timeout?: Duration;

  /**
   * Initialize the queue with a set of messages.
   * @default []
   */
  readonly initialMessages?: string[];
}

/**
 * Represents a queue.
 *
 * @inflight `@winglang/sdk.cloud.IQueueClient`
 */
export abstract class Queue extends Resource {
  /**
   * Create a new `Queue` instance.
   * @internal
   */
  public static _newQueue(
    scope: Construct,
    id: string,
    props: QueueProps = {}
  ): Queue {
    return App.of(scope).newAbstract(QUEUE_FQN, scope, id, props);
  }

  public readonly stateful = true;
  constructor(scope: Construct, id: string, props: QueueProps = {}) {
    super(scope, id);

    this.display.title = "Queue";
    this.display.description = "A distributed message queue";

    this._inflightOps.push(
      QueueInflightMethods.PUSH,
      QueueInflightMethods.PURGE,
      QueueInflightMethods.APPROX_SIZE
    );

    props;
  }

  /**
   * Create a function to consume messages from this queue.
   */
  public abstract addConsumer(
    handler: IQueueAddConsumerHandler,
    props?: QueueAddConsumerProps
  ): Function;
}

/**
 * Options for Queue.addConsumer.
 */
export interface QueueAddConsumerProps extends FunctionProps {
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
   * Push a message to the queue.
   * @param message Payload to send to the queue.
   * @inflight
   */
  push(message: string): Promise<void>;

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
}

/**
 * Represents a resource with an inflight "handle" method that can be passed to
 * `Queue.add_consumer`.
 *
 * @inflight `@winglang/sdk.cloud.IQueueAddConsumerHandlerClient`
 */
export interface IQueueAddConsumerHandler extends IResource {}

/**
 * Inflight client for `IQueueAddConsumerHandler`.
 */
export interface IQueueAddConsumerHandlerClient {
  /**
   * Function that will be called when a message is received from the queue.
   * @inflight
   */
  handle(message: string): Promise<void>;
}

/**
 * List of inflight operations available for `Queue`.
 * @internal
 */
export enum QueueInflightMethods {
  /** `Queue.push` */
  PUSH = "push",
  /** `Queue.purge` */
  PURGE = "purge",
  /** `Queue.approxSize` */
  APPROX_SIZE = "approx_size",
}
