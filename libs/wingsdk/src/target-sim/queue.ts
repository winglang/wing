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
    const hash = inflight.node.addr.slice(-8);

    /**
     * IQueueOnMessageHandler needs to wrap the function that the user provided
     * so that it will be called one for each message in the batch.
     * `convertBetweenHandlers` is creates a dummy resource that looks like
     * this so that it can be passed to `cloud.Function`:
     *
     * resource Handler {
     *   init(handler: cloud.IFunctionHandler) {
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
     * user's tree by creating a single `Handler` resource that extends from
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
      `${this.node.id}-OnMessage-${inflight.node.addr.slice(-8)}`,
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
  public _bind(host: core.Resource, ops: string[]): void {
    bindSimulatorResource("queue", this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _inflightJsClient(): core.Code {
    // TODO: assert that `env` is added to the `host` resource
    const env = `QUEUE_HANDLE_${this.node.addr.slice(-8)}`;
    return core.NodeJsCode.fromInline(
      `$simulator.findInstance(process.env["${env}"])`
    );
  }
}

core.Resource._annotateInflight(Queue, "push", {});
