import { join } from "path";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import { convertBetweenHandlers } from "../convert";
import * as core from "../core";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { QueueSchema, QueueSubscriber } from "./schema-resources";
import { bindSimulatorResource } from "./util";

/**
 * Simulator implementation of `cloud.Queue`.
 *
 * @inflight `@winglang/wingsdk.cloud.IQueueClient`
 */
export class Queue extends cloud.QueueBase implements ISimulatorResource {
  /** @internal */
  public readonly _policies = {
    [cloud.QueueInflightMethods.PUSH]: {},
  };

  private readonly timeout: core.Duration;
  private readonly subscribers: QueueSubscriber[];
  private readonly initialMessages: string[] = [];
  constructor(scope: Construct, id: string, props: cloud.QueueProps = {}) {
    super(scope, id, props);

    this.timeout = props.timeout ?? core.Duration.fromSeconds(30);
    this.subscribers = [];
    this.initialMessages.push(...(props.initialMessages ?? []));
  }

  public onMessage(
    inflight: cloud.IQueueOnMessageHandler,
    props: cloud.QueueOnMessageProps = {}
  ): cloud.Function {
    const functionHandler: cloud.IFunctionHandler = convertBetweenHandlers(
      inflight,
      join(__dirname, "queue.onmessage.inflight.js"),
      "QueueOnMessageHandlerClient"
    );

    const fn = new cloud.Function(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnMessage-${functionHandler.node.addr.slice(-8)}`,
      functionHandler,
      props
    );

    // At the time the queue is created in the simulator, it needs to be able to
    // call subscribed functions.
    this.node.addDependency(fn);

    const functionHandle = `\${${fn.node.path}#attrs.handle}`; // TODO: proper token mechanism
    this.subscribers.push({
      functionHandle,
      batchSize: props.batchSize ?? 1,
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

  public toSimulator(): BaseResourceSchema {
    const schema: QueueSchema = {
      type: cloud.QUEUE_TYPE,
      path: this.node.path,
      props: {
        timeout: this.timeout.seconds,
        subscribers: this.subscribers,
        initialMessages: this.initialMessages,
      },
      attrs: {} as any,
    };
    return schema;
  }

  protected bindImpl(host: core.Resource, _ops: string[]): core.Code {
    return bindSimulatorResource("queue", this, host);
  }
}
