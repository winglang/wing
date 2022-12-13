import { Construct } from "constructs";
import { Polycons } from "polycons";
import { Code, Duration, Inflight, Policy, Resource } from "../core";
import { Function, FunctionProps } from "./function";

/**
 * Global identifier for `Queue`.
 */
export const QUEUE_TYPE = "wingsdk.cloud.Queue";

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
 * Functionality shared between all `Queue` implementations.
 */
export abstract class QueueBase extends Resource {
  public readonly stateful = true;
  constructor(scope: Construct, id: string, props: QueueProps = {}) {
    super(scope, id);
    if (!scope) {
      return;
    }

    props;
  }

  /**
   * Create a function to consume messages from this queue.
   */
  public abstract onMessage(
    inflight: Inflight,
    props?: QueueOnMessageProps
  ): Function;
}

/**
 * Options for Queue.onMessage.
 */
export interface QueueOnMessageProps extends FunctionProps {
  /**
   * The maximum number of messages to send to subscribers at once.
   * @default 1
   */
  readonly batchSize?: number;
}

/**
 * Represents a queue.
 *
 * @inflight `@winglang/wingsdk.cloud.IQueueClient`
 */
export class Queue extends QueueBase {
  constructor(scope: Construct, id: string, props: QueueProps = {}) {
    super(null as any, id, props);
    return Polycons.newInstance(QUEUE_TYPE, scope, id, props) as Queue;
  }

  /**
   * @internal
   */
  public _bind(_host: Resource, _policy: Policy): Code {
    throw new Error("Method not implemented.");
  }

  public onMessage(
    inflight: Inflight,
    props: QueueOnMessageProps = {}
  ): Function {
    inflight;
    props;
    throw new Error("Method not implemented.");
  }
}

/**
 * Inflight interface for `Queue`.
 */
export interface IQueueClient {
  /**
   * Push a message to the queue.
   * @param message Payload to send to the queue.
   */
  push(message: string): Promise<void>;
}

/**
 * List of inflight operations available for `Queue`.
 */
export enum QueueInflightMethods {
  /** `Queue.push` */
  PUSH = "push",
}
