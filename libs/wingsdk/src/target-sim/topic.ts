import { join } from "path";
import { Construct } from "constructs";
import { EventMapping } from "./event-mapping";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";
import { TopicSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { convertBetweenHandlers } from "../shared/convert";
import { BaseResourceSchema } from "../simulator/simulator";
import { IInflightHost, Node, SDK_SOURCE_MODULE } from "../std";

/**
 * Simulator implementation of `cloud.Topic`
 *
 * @inflight `@winglang/sdk.cloud.ITopicClient`
 */
export class Topic extends cloud.Topic implements ISimulatorResource {
  constructor(scope: Construct, id: string, props: cloud.TopicProps = {}) {
    super(scope, id, props);
  }

  public onMessage(
    inflight: cloud.ITopicOnMessageHandler,
    props: cloud.TopicOnMessageOptions = {}
  ): cloud.Function {
    const hash = inflight.node.addr.slice(-8);
    const functionHandler = convertBetweenHandlers(
      this,
      `${this.node.id}-OnMessageHandler-${hash}`,
      inflight,
      join(__dirname, "topic.onmessage.inflight.js"),
      "TopicOnMessageHandlerClient"
    );

    const fn = Function._newFunction(
      this,
      `${this.node.id}-OnMessage-${hash}`,
      functionHandler,
      props
    );
    Node.of(fn).sourceModule = SDK_SOURCE_MODULE;
    Node.of(fn).title = "onMessage()";

    new EventMapping(this, `${this.node.id}-TopicEventMapping-${hash}`, {
      subscriber: fn,
      publisher: this,
      subscriptionProps: {},
    });

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "onMessage()",
    });

    return fn;
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }

  public toSimulator(): BaseResourceSchema {
    const schema: TopicSchema = {
      type: cloud.TOPIC_FQN,
      path: this.node.path,
      props: {},
      attrs: {} as any,
    };
    return schema;
  }
}
