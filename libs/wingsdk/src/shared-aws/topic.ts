import { cloud } from "..";
import { lift } from "../core";

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

/**
 * A helper class for working with AWS topic on message handlers.
 */
export class TopicOnMessageHandler {
  /**
   * Returns a `cloud.Function` handler for handling messages from a `cloud.Topic`.
   * @param handler The `onMessage` handler.
   * @returns The `cloud.Function` handler.
   */
  public static toFunctionHandler(
    handler: cloud.ITopicOnMessageHandler
  ): cloud.IFunctionHandler {
    return lift({ handler }).inflight(async (ctx, event) => {
      for (const record of (event as any).Records ?? []) {
        await ctx.handler(record.Sns.Message);
        return undefined;
      }
    });
  }
}
