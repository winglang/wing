import { cloud } from "..";

/**
 * A shared interface for AWS topics.
 */
export interface IAwsTopic {
  /**
   * AWS Topic arn
   */
  readonly topicArn: string;

  /**
   * AWS Topic name
   */
  readonly topicName: string;
}

/**
 * A helper class for working with AWS topics.
 */
export class Topic {
  /**
   * If the topic is an AWS SNS, return a helper interface for
   * working with it.
   * @param topic The cloud.Topic.
   */
  public static from(topic: cloud.Topic): IAwsTopic | undefined {
    if (this.isAwsTopic(topic)) {
      return topic;
    }
    return undefined;
  }

  private static isAwsTopic(obj: any): obj is IAwsTopic {
    return (
      typeof obj.topicArn === "string" && typeof obj.topicName === "string"
    );
  }
}
