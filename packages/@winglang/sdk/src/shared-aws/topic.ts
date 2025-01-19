import { AwsInflightHost } from "./inflight-host";
import { calculateTopicPermissions } from "./permissions";
import { cloud } from "..";
import {
  TopicSubscribeQueueOptions,
  ITopicOnMessageHandler,
  TopicOnMessageOptions,
} from "../cloud/topic";
import { InflightClient, lift, LiftMap } from "../core";
import { IInflightHost } from "../std";

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
 * Base class for AWS Topics
 */
export abstract class Topic extends cloud.Topic implements IAwsTopic {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(
      __filename.replace("topic", "topic.inflight"),
      "TopicClient"
    );
  }

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

  public abstract get topicArn(): string;
  public abstract get topicName(): string;

  /**
   * Run an inflight whenever an message is published to the topic.
   * @abstract
   */
  public abstract onMessage(
    inflight: ITopicOnMessageHandler,
    props?: TopicOnMessageOptions
  ): cloud.Function;

  /**
   * Subscribing queue to the topic
   * @abstract
   */
  public abstract subscribeQueue(
    queue: cloud.Queue,
    props?: TopicSubscribeQueueOptions
  ): void;

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!AwsInflightHost.isAwsInflightHost(host)) {
      throw new Error("Host is expected to implement `IAwsInfightHost`");
    }

    host.addPolicyStatements(...calculateTopicPermissions(this.topicArn, ops));

    host.addEnvironment(this.envName(), this.topicArn);

    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return {
      $topicArn: `process.env["${this.envName()}"]`,
    };
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.TopicInflightMethods.PUBLISH]: [],
    };
  }

  private envName(): string {
    return `TOPIC_ARN_${this.node.addr.slice(-8)}`;
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
