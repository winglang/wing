import { join } from "path";
import { Construct } from "constructs";
import { App } from "./app";
import { EventMapping } from "./event-mapping";
import { Function } from "./function";
import { Policy } from "./policy";
import { ISimulatorResource } from "./resource";
import { TopicSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { LiftMap } from "../core";
import { convertBetweenHandlers } from "../shared/convert";
import { Testing, ToSimulatorOutput } from "../simulator";
import { IInflightHost, Node, SDK_SOURCE_MODULE } from "../std";

const QUEUE_PUSH_METHOD = "push";

/**
 * Simulator implementation of `cloud.Topic`
 *
 * @inflight `@winglang/sdk.cloud.ITopicClient`
 */
export class Topic extends cloud.Topic implements ISimulatorResource {
  public readonly policy: Policy;
  constructor(scope: Construct, id: string, props: cloud.TopicProps = {}) {
    super(scope, id, props);
    this.policy = new Policy(this, "Policy", { principal: this });
  }

  public onMessage(
    inflight: cloud.ITopicOnMessageHandler,
    props: cloud.TopicOnMessageOptions = {}
  ): cloud.Function {
    const functionHandler = TopicOnMessageHandler.toFunctionHandler(inflight);
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

    this.policy.addStatement(fn, cloud.FunctionInflightMethods.INVOKE_ASYNC);

    return fn;
  }

  public subscribeQueue(queue: cloud.Queue): void {
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
      {}
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

    this.policy.addStatement(fn, cloud.FunctionInflightMethods.INVOKE_ASYNC);
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.QueueInflightMethods.PUSH]: [],
      [cloud.TopicInflightMethods.PUBLISH]: [],
    };
  }

  public toSimulator(): ToSimulatorOutput {
    const props: TopicSchema = {};
    return {
      type: cloud.TOPIC_FQN,
      props,
    };
  }
}

/**
 * Utility class to work with topic message handlers.
 */
export class TopicOnMessageHandler {
  /**
   * Converts a `cloud.ITopicOnMessageHandler` to a `cloud.IFunctionHandler`
   * @param handler the handler to convert
   * @returns the function handler
   */
  public static toFunctionHandler(
    handler: cloud.ITopicOnMessageHandler
  ): cloud.IFunctionHandler {
    return convertBetweenHandlers(
      handler,
      join(__dirname, "topic.onmessage.inflight.js"),
      "TopicOnMessageHandlerClient"
    );
  }
}
