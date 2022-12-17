import { join } from "path";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import { convertBetweenHandlers } from "../convert";
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

    const fn = new cloud.Function(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnMessage-${hash}`,
      functionHandler,
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

  /** @internal */
  public _bind(host: core.Resource, ops: string[]): void {
    bindSimulatorResource("topic", this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _inflightJsClient(): core.Code {
    // TODO: assert that `env` is added to the `host` resource
    const env = `TOPIC_HANDLE_${this.node.addr.slice(-8)}`;
    return core.NodeJsCode.fromInline(
      `$simulator.findInstance(process.env["${env}"])`
    );
  }

  public toSimulator(): BaseResourceSchema {
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

Topic._annotateInflight("publish", {});
