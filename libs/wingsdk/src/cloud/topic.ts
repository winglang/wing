import { Construct } from "constructs";
import { Polycons } from "polycons";
import { Code, Inflight, OperationPolicy, Resource } from "../core";
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
  /** @internal */
  public readonly _policies = {};

  constructor(scope: Construct, id: string, props: TopicProps = {}) {
    super(null as any, id, props);
    return Polycons.newInstance(TOPIC_TYPE, scope, id, props) as Topic;
  }

  protected _bind_impl(_host: Resource, _policy: OperationPolicy): Code {
    throw new Error("Method not implemented");
  }

  public onMessage(
    inflight: Inflight,
    props: TopicOnMessageProps = {}
  ): Function {
    inflight;
    props;
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
   */
  publish(message: string): Promise<void>;
}

/**
 * List of inflight operations available for `Topic`.
 */
export enum TopicInflightMethods {
  /** `Topic.publish` */
  PUBLISH = "publish",
}
