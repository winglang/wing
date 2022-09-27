import { Polycons } from "@monadahq/polycons";
import { Construct, IConstruct } from "constructs";
import { CaptureMetadata, Code, Duration, Inflight } from "../core";
import { Function, FunctionProps } from "./function";
import { Resource } from "./resource";

/**
 * Global identifier for `Queue`.
 */
export const QUEUE_ID = "wingsdk.cloud.Queue";

/**
 * Properties for `Queue`.
 */
export interface QueueProps {
  /**
   * How long a queue's consumers have to process a message.
   * @default Duration.fromSeconds(10)
   */
  readonly timeout?: Duration;
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
 * Represents a serverless queue.
 */
export class Queue extends QueueBase {
  constructor(scope: Construct, id: string, props: QueueProps = {}) {
    super(null as any, id, props);
    return Polycons.newInstance(QUEUE_ID, scope, id, props) as Queue;
  }

  /**
   * @internal
   */
  public _capture(_captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    throw new Error("Method not implemented.");
  }

  public onMessage(
    _inflight: Inflight,
    _props: QueueOnMessageProps = {}
  ): Function {
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
  PUSH = "push",
}
