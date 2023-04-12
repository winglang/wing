import { join } from "path";
import { Construct } from "constructs";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";
import { TopicSchema, TopicSubscriber, TOPIC_TYPE } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { IInflightHost, Resource } from "../std";
import { BaseResourceSchema } from "../testing/simulator";
import { convertBetweenHandlers } from "../utils/convert";
import { EventMapping } from "./event-mapping";

/**
 * Simulator implementation of `cloud.Topic`
 *
 * @inflight `@winglang/sdk.cloud.ITopicClient`
 */
export class Topic extends cloud.Topic implements ISimulatorResource {
  private readonly subscribers: TopicSubscriber[];
  constructor(scope: Construct, id: string, props: cloud.TopicProps = {}) {
    super(scope, id, props);

    this.subscribers = [];
  }

  public onMessage(
    inflight: cloud.ITopicOnMessageHandler,
    props: cloud.TopicOnMessageProps = {}
  ): cloud.Function {
    const hash = inflight.node.addr.slice(-8);
    const functionHandler = convertBetweenHandlers(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnMessageHandler-${hash}`,
      inflight,
      join(__dirname, "topic.onmessage.inflight.js"),
      "TopicOnMessageHandlerClient"
    );

    const fn = Function._newFunction(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnMessage-${hash}`,
      functionHandler,
      props
    );
    
    new EventMapping(this, `${this.node.id}-TopicEventMapping-${hash}`, {
      consumer: fn,
      producer: this,
      payload: {
        functionHandle: simulatorHandleToken(fn),  
      }
    })

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: "on_message",
    });

    return fn;
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }

  public toSimulator(): BaseResourceSchema {
    const schema: TopicSchema = {
      type: TOPIC_TYPE,
      path: this.node.path,
      props: {
        subscribers: this.subscribers,
      },
      attrs: {} as any,
    };
    return schema;
  }
}

Topic._annotateInflight("publish", {});
