import { Construct } from "constructs";
import { Function, FunctionProps } from "./function";
import { fqnForType } from "../constants";
import { App } from "../core";
import { IResource, Node, Resource } from "../std";

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
export class Topic extends Resource {
  constructor(scope: Construct, id: string, props: TopicProps = {}) {
    if (new.target === Topic) {
      return App.of(scope)._newAbstract(TOPIC_FQN, scope, id, props);
    }

    super(scope, id);

    Node.of(this).title = "Topic";
    Node.of(this).description = "A pub/sub notification topic";

    props;
  }

  /** @internal */
  public _toInflight(): string {
    throw new Error("proxy");
  }

  /** @internal */
  public _supportedOps(): string[] {
    throw new Error("proxy");
  }

  /**
   * Run an inflight whenever an message is published to the topic.
   */
  public onMessage(
    inflight: ITopicOnMessageHandler,
    props?: TopicOnMessageOptions
  ): Function {
    inflight;
    props;
    throw new Error("proxy");
  }
}

/**
 * Options for `Topic.onMessage`.
 */
export interface TopicOnMessageOptions extends FunctionProps {}

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
