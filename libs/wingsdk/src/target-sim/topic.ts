import { join } from "path";
import { Construct } from "constructs";
import { App } from "./app";
import { EventMapping } from "./event-mapping";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";
import { TopicSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { convertBetweenHandlers } from "../shared/convert";
import { Testing } from "../simulator";
import { BaseResourceSchema } from "../simulator/simulator";
import { IInflightHost, Node, SDK_SOURCE_MODULE } from "../std";

const QUEUE_PUSH_METHOD = "push";

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
    const functionHandler = convertBetweenHandlers(
      inflight,
      join(__dirname, "topic.onmessage.inflight.js"),
      "TopicOnMessageHandlerClient"
    );

    const fn = new Function(
      this,
      App.of(this).makeId(this, "OnMessage"),
      functionHandler,
      props
    );
    Node.of(fn).sourceModule = SDK_SOURCE_MODULE;
    Node.of(fn).title = "onMessage()";

    new EventMapping(this, App.of(this).makeId(this, "TopicEventMapping"), {
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

  public subscribeQueue(
    queue: cloud.Queue,
    props: cloud.TopicOnMessageOptions = {}
  ): void {
    const functionHandler = convertBetweenHandlers(
      Testing.makeHandler(
        "async handle(event) { return await this.queue.push(event); }",
        {
          queue: {
            obj: queue,
            ops: [QUEUE_PUSH_METHOD],
          },
        }
      ),
      join(__dirname, "topic.onmessage.inflight.js"),
      "TopicOnMessageHandlerClient"
    );

    const fn = new Function(
      this,
      App.of(this).makeId(this, "subscribeQueue"),
      functionHandler,
      props
    );
    Node.of(fn).sourceModule = SDK_SOURCE_MODULE;
    Node.of(fn).title = "subscribeQueue()";

    new EventMapping(this, App.of(this).makeId(this, "TopicEventMapping"), {
      subscriber: fn,
      publisher: this,
      subscriptionProps: {},
    });

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "subscribeQueue()",
    });
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [cloud.QueueInflightMethods.PUSH, cloud.TopicInflightMethods.PUBLISH];
  }

  public toSimulator(): BaseResourceSchema {
    const schema: TopicSchema = {
      type: cloud.TOPIC_FQN,
      path: this.node.path,
      addr: this.node.addr,
      props: {},
      attrs: {} as any,
    };
    return schema;
  }
}
