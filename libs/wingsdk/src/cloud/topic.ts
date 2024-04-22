import { Construct } from "constructs";
import { Function, FunctionProps } from "./function";
import { Queue, QueueProps } from "./queue";
import { fqnForType } from "../constants";
import { AbstractMemberError } from "../core/errors";
import { INFLIGHT_SYMBOL } from "../core/types";
import { Node, Resource, IInflight } from "../std";

export const TOPIC_FQN = fqnForType("cloud.Topic");

/**
 * Options for `Topic`.
 */
export interface TopicProps {}

/**
 * A topic.
 *
 * @inflight `@winglang/sdk.cloud.ITopicClient`
 * @abstract
 */
export class Topic extends Resource {
  /** @internal */
  public [INFLIGHT_SYMBOL]?: ITopicClient;

  constructor(scope: Construct, id: string, props: TopicProps = {}) {
    if (new.target === Topic) {
      return Resource._newFromFactory(TOPIC_FQN, scope, id, props);
    }

    super(scope, id);

    Node.of(this).title = "Topic";
    Node.of(this).description = "A pub/sub notification topic";

    props;
  }

  /**
   * Run an inflight whenever an message is published to the topic.
   * @abstract
   */
  public onMessage(
    inflight: ITopicOnMessageHandler,
    props?: TopicOnMessageOptions
  ): Function {
    inflight;
    props;
    throw new AbstractMemberError();
  }

  /**
   * Subscribing queue to the topic
   * @abstract
   */
  public subscribeQueue(
    queue: Queue,
    props?: TopicSubscribeQueueOptions
  ): void {
    queue;
    props;
    throw new AbstractMemberError();
  }
}

/**
 * Options for `Topic.onMessage`.
 */
export interface TopicOnMessageOptions extends FunctionProps {}
/**
 * Options for `Topic.subscribeQueue`.
 */
export interface TopicSubscribeQueueOptions extends QueueProps {}

/**
 * Inflight interface for `Topic`.
 */
export interface ITopicClient {
  /**
   * Publish messages to topic, if multiple messages are passed then they
   * will be published as a batch if supported by the target platform
   * @param messages Payload to publish to Topic
   * @inflight
   */
  publish(...messages: string[]): void;
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `Topic.on_message`.
 *
 * @inflight `@winglang/sdk.cloud.ITopicOnMessageHandlerClient`
 */
export interface ITopicOnMessageHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: ITopicOnMessageHandlerClient["handle"];
}

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
