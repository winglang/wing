import { join } from "path";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import { convertBetweenHandlers } from "../convert";
import * as core from "../core";
import * as std from "../std";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { QueueSchema, QueueSubscriber } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";

/**
 * Simulator implementation of `cloud.Queue`.
 *
 * @inflight `@winglang/wingsdk.cloud.IQueueClient`
 */
export class Queue extends cloud.QueueBase implements ISimulatorResource {
  private readonly timeout: std.Duration;
  private readonly subscribers: QueueSubscriber[];
  private readonly initialMessages: string[] = [];
  constructor(scope: Construct, id: string, props: cloud.QueueProps = {}) {
    super(scope, id, props);

    this.timeout = props.timeout ?? std.Duration.fromSeconds(30);
    this.subscribers = [];
    this.initialMessages.push(...(props.initialMessages ?? []));
  }

  public onMessage(
    inflight: core.Inflight, // cloud.IQueueOnMessageHandler
    props: cloud.QueueOnMessageProps = {}
  ): cloud.Function {
    const hash = inflight.node.addr.slice(-8);

    /**
     * The handle method the user provided (via the `inflight` parameter) needs
     * to be wrapped in some extra logic to handle batching.
     * `convertBetweenHandlers` creates a dummy resource that provides the
     * wrapper code. In Wing psuedocode, this looks like:
     *
     * resource Handler impl cloud.IFunctionHandler {
     *   init(handler: cloud.IQueueOnMessageHandler) {
     *     this.handler = handler;
     *   }
     *   inflight handle(event: string) {
     *     for (const message of JSON.parse(event).messages) {
     *       this.handler.handle(message);
     *     }
     *   }
     * }
     *
     * It's possible we could optimize this and create one less construct in the
     * user's tree by creating a single `Handler` resource that subclasses from
     * `cloud.Function` and overrides the `invoke` inflight method with the
     * wrapper code directly.
     */
    const functionHandler = convertBetweenHandlers(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnMessageHandler-${hash}`,
      inflight,
      join(__dirname, "queue.onmessage.inflight.js"),
      "QueueOnMessageHandlerClient"
    );

    const fn = new cloud.Function(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnMessage-${hash}`,
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

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    bindSimulatorResource("queue", this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient("queue", this);
  }
}

Queue._annotateInflight("push", {});
Queue._annotateInflight("purge", {});
Queue._annotateInflight("approxSize", {});
