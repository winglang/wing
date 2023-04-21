import { Construct } from "constructs";
import { Function } from "./function";
import { fqnForType } from "../constants";
import { App } from "../core";
import { IResource, Resource } from "../std";

export const TOPIC_FQN = fqnForType("cloud.Topic");

/**
 * Properties for `Topic`.
 */
export interface TopicProps {}

/**
 * Represents a topic.
 *
 * @inflight `@winglang/sdk.cloud.ITopicClient`
 */
export abstract class Topic extends Resource {
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

  public readonly stateful = true;

  constructor(scope: Construct, id: string, props: TopicProps = {}) {
    super(scope, id);

    this.display.title = "Topic";
    this.display.description = "A pub/sub notification topic";

    this._inflightOps.push(TopicInflightMethods.PUBLISH);

    props;
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
export interface TopicOnMessageProps {}

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
 * Represents a resource with an inflight "handle" method that can be passed to
 * `Topic.on_message`.
 *
 * @inflight `@winglang/sdk.cloud.ITopicOnMessageHandlerClient`
 */
export interface ITopicOnMessageHandler extends IResource {}

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
