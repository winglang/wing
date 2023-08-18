import { Construct } from "constructs";
import { Function, FunctionProps } from "./function";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Display, IInflightConstruct } from "../std";

export const TOPIC_FQN = fqnForType("cloud.Topic");

/**
 * Options for `Topic`.
 */
export interface TopicProps {}

/**
 * A topic.
 *
 * @inflight `@winglang/sdk.cloud.ITopicClient`
 */
export abstract class Topic extends Construct {
  /**
   * Create a new topic.
   * @internal
   */
  public static _newTopic(
    scope: Construct,
    id: string,
    props: TopicProps = {}
  ): Topic {
    return App.of(scope).newAbstract(TOPIC_FQN, scope, id, props);
  }

  constructor(scope: Construct, id: string, props: TopicProps = {}) {
    super(scope, id);

    Display.of(this).title = "Topic";
    Display.of(this).description = "A pub/sub notification topic";

    props;
  }

  /** @internal */
  public _getInflightOps(): string[] {
    return [TopicInflightMethods.PUBLISH];
  }

  /**
   * Run an inflight whenever an message is published to the topic.
   */
  public abstract onMessage(
    inflight: ITopicOnMessageHandler,
    props?: TopicOnMessageProps
  ): Function;
}

/**
 * Options for `Topic.onMessage`.
 */
export interface TopicOnMessageProps extends FunctionProps {}

/**
 * Inflight interface for `Topic`.
 */
export interface ITopicClient {
  /**
   * Publish message to topic
   * @param message Payload to publish to Topic
   * @inflight
   */
  publish(message: string): Promise<void>;
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `Topic.on_message`.
 *
 * @inflight `@winglang/sdk.cloud.ITopicOnMessageHandlerClient`
 */
export interface ITopicOnMessageHandler extends IInflightConstruct {}

/**
 * Inflight client for `ITopicOnMessageHandler`.
 */
export interface ITopicOnMessageHandlerClient {
  /**
   * Function that will be called when a message is received from the topic.
   * @inflight
   */
  handle(event: string): Promise<void>;
}

/**
 * List of inflight operations available for `Topic`.
 * @internal
 */
export enum TopicInflightMethods {
  /** `Topic.publish` */
  PUBLISH = "publish",
}
