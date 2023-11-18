import { cloud } from "..";

/**
 * A shared interface for AWS queues.
 */
export interface IAwsQueue {
  /**
   * AWS Queue arn
   */
  readonly queueArn: string;

  /**
   * AWS Queue name
   */
  readonly queueName: string;

  /**
   * AWS Queue url
   */
  readonly queueUrl: string;
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
  public static from(queue: cloud.Queue): IAwsQueue | undefined {
    if (this.isAwsQueue(queue)) {
      return queue;
    }
    return undefined;
  }

  private static isAwsQueue(obj: any): obj is IAwsQueue {
    return (
      typeof obj.queueArn === "string" &&
      typeof obj.queueName === "string" &&
      typeof obj.queueUrl === "string"
    );
  }
}
