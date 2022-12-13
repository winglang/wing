import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { Direction } from "../core";
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
    inflight: core.Inflight,
    props: cloud.TopicOnMessageProps = {}
  ): cloud.Function {
    const code: string[] = [];
    code.push(inflight.code.text);
    code.push(`async function $topicEventWrapper($cap, event) {`);
    code.push(` event = JSON.parse(event);`);
    code.push(
      `   if (!event.message) throw new Error('No "message" field in event.');`
    );
    code.push(` for (const $message of event.message) {`);
    code.push(` await ${inflight.entrypoint}($cap, $message);`);
    code.push(` }`);
    code.push(`}`);

    const newInflight = new core.Inflight({
      entrypoint: `$topicEventWrapper`,
      code: core.NodeJsCode.fromInline(code.join("\n")),
      bindings: inflight.bindings,
    });

    const fn = new cloud.Function(
      this.node.scope!,
      `${this.node.id}-OnMessage-${inflight.code.hash.slice(0, 16)}`,
      newInflight,
      props
    );

    this.node.addDependency(fn);

    const functionHandle = `\${${fn.node.path}#attrs.handle}`;
    this.subscribers.push({
      functionHandle,
    });

    this.addConnection({
      direction: Direction.OUTBOUND,
      relationship: "on_message",
      resource: fn,
    });

    fn.addConnection({
      direction: Direction.INBOUND,
      relationship: "on_message",
      resource: this,
    });

    return fn;
  }

  /** @internal */
  public _bind(host: core.Resource, _policy: core.Policy): core.Code {
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
