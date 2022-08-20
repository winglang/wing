import { Polycons } from "@monadahq/polycons";
import { Construct } from "constructs";
import { Capture, Code, Duration } from "../core";
import { IResource, Resource } from "./resource";

export interface IQueue extends IResource {}

/**
 * Global identifier for `Queue`.
 */
export const QUEUE_ID = "wingsdk.cloud.Queue";

/**
 * Properties for `Queue`.
 */
export interface QueueProps {
  readonly timeout?: Duration;
}

/**
 * Functionality shared between all `Queue` implementations.
 */
export abstract class QueueBase extends Resource implements IQueue {
  public readonly stateful = true;
  constructor(scope: Construct, id: string, props: QueueProps) {
    super(scope, id);
    if (!scope) {
      return;
    }

    props;
  }

  public abstract capture(consumer: any, capture: Capture): Code;
}

/**
 * Represents a serverless queue.
 */
export class Queue extends QueueBase {
  constructor(scope: Construct, id: string, props: QueueProps) {
    super(null as any, id, props);
    return Polycons.newInstance(QUEUE_ID, scope, id, props) as Queue;
  }

  public capture(_consumer: any, _capture: Capture): Code {
    throw new Error("Method not implemented.");
  }
}
