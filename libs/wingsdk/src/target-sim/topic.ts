import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { TopicSchema, TopicSubscriber } from "./schema-resources";
import { bindSimulatorResource } from "./util";

/**
 * Simulator implementation of `cloud.Topic`
 *
 * @inflight `@winglang/wingsdk.cloud.ITopicClient`
 */
export class Topic extends cloud.TopicBase implements ISimulatorResource {
  /** @internal */
  public readonly _policies = {
    [cloud.TopicInflightMethods.PUBLISH]: {},
  };

  private readonly subscribers: TopicSubscriber[];
  constructor(scope: Construct, id: string, props: cloud.TopicProps = {}) {
    super(scope, id, props);

    this.subscribers = [];
  }

  public onMessage(
    inflight: cloud.ITopicOnMessageHandler,
    props: cloud.TopicOnMessageProps = {}
  ): cloud.Function {
    const fn = new cloud.Function(
      this.node.scope!,
      `${this.node.id}-OnMessage-${inflight.node.addr.slice(-8)}`,
      // ITopicOnMessageHandler has the same inflight signature as IFunctionHandler
      // so its safe to reuse the inflight directly
      inflight,
      props
    );

    this.node.addDependency(fn);

    const functionHandle = `\${${fn.node.path}#attrs.handle}`;
    this.subscribers.push({
      functionHandle,
    });

    this.addConnection({
      direction: core.Direction.OUTBOUND,
      relationship: "on_message",
      resource: fn,
    });

    fn.addConnection({
      direction: core.Direction.INBOUND,
      relationship: "on_message",
      resource: this,
    });

    return fn;
  }

  protected bindImpl(
    host: core.Resource,
    _policy: core.OperationPolicy
  ): core.Code {
    return bindSimulatorResource("topic", this, host);
  }

  toSimulator(): BaseResourceSchema {
    const schema: TopicSchema = {
      type: cloud.TOPIC_TYPE,
      path: this.node.path,
      props: {
        subscribers: this.subscribers,
      },
      attrs: {} as any,
    };
    return schema;
  }
}
