import { join } from "path";
import { Construct } from "constructs";
import { EventMapping } from "./event-mapping";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";
import { TopicSchema, TOPIC_TYPE } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { convertBetweenHandlers } from "../shared/convert";
import { Display, IInflightHost, Resource } from "../std";
import { BaseResourceSchema } from "../testing/simulator";

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
    props: cloud.TopicOnMessageProps = {}
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
    fn.display.sourceModule = Display.SDK_SOURCE_MODULE;
    fn.display.title = "onMessage()";

    new EventMapping(this, `${this.node.id}-TopicEventMapping-${hash}`, {
      subscriber: fn,
      publisher: this,
      subscriptionProps: {},
    });

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: "onMessage()",
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
      props: {},
      attrs: {} as any,
    };
    return schema;
  }
}
