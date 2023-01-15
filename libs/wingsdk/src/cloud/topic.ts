import { Construct } from "constructs";
import { Polycons } from "polycons";
import { Code, IResource, Inflight, Resource } from "../core";
import { Function } from "./function";

export const TOPIC_TYPE = "wingsdk.cloud.Topic";

/**
 * Properties for `Topic`.
 */
export interface TopicProps {}

/**
 * Topic base class
 */
export abstract class TopicBase extends Resource {
  public readonly stateful = true;
  constructor(scope: Construct, id: string, props: TopicProps = {}) {
    super(scope, id);

    this.display.title = "Topic";
    this.display.description = "A pub/sub notification topic";

    if (!scope) {
      return;
    }

    props;
  }

  /**
   * Creates function to send messages when published
   */
  public abstract onMessage(
    inflight: Inflight,
    props?: TopicOnMessageProps
  ): Function;
}

/**
 * Options for Topic.onMessage
 */
export interface TopicOnMessageProps {}

/**
 * Represents a topic.
 *
 * @inflight `@winglang/wingsdk.cloud.ITopicClient`
 */
export class Topic extends TopicBase {
  constructor(scope: Construct, id: string, props: TopicProps = {}) {
    super(null as any, id, props);
    return Polycons.newInstance(TOPIC_TYPE, scope, id, props) as Topic;
  }

  public onMessage(
    inflight: Inflight,
    props: TopicOnMessageProps = {}
  ): Function {
    inflight;
    props;
    throw new Error("Method not implemented.");
  }

  /** @internal */
  public _toInflight(): Code {
    throw new Error("Method not implemented.");
  }
}

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
 * @inflight `wingsdk.cloud.ITopicOnMessageHandlerClient`
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
