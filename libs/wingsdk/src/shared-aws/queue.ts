import { IResource } from "../std";

/**
 * A shared interface for AWS queues.
 */
export interface IAwsQueue {
  /**
   * AWS Queue arn
   */
  arn(): string;

  /**
   * AWS Queue name
   */
  queueName(): string;

  /**
   * AWS Queue url
   */
  queueUrl(): string;
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
    return (
      typeof obj.arn === "function" &&
      typeof obj.queueName === "function" &&
      typeof obj.queueUrl === "function"
    );
  }
}
