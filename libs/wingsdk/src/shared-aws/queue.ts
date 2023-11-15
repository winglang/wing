import { IResource } from "../std";

/**
 * A shared interface for AWS queues.
 */
export interface IAwsQueue {
  /**
   * Get iinternal AWS Queue
   */
  innerAwsQueue(): any;
}

/**
 * A helper class for working with AWS queues.
 */
export class Queue {
  /**
   * If the queue is an AWS SQS, return a helper interface for
   * working with it.
   * @param queue The cloud.Queue.
   */
  public static from(queue: IResource): IAwsQueue | undefined {
    if (this.isAwsQueue(queue)) {
      return queue;
    }
    return undefined;
  }

  private static isAwsQueue(obj: any): obj is IAwsQueue {
    return typeof obj.innerAwsQueue === "function";
  }
}
