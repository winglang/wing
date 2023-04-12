import { join } from "path";
import { Construct } from "constructs";
import { EventMapping } from "./event-mapping";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";
import { QueueSchema, QueueSubscriber, QUEUE_TYPE } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { Duration, IInflightHost, Resource } from "../std";
import { BaseResourceSchema } from "../testing/simulator";
import { convertBetweenHandlers } from "../utils/convert";

/**
 * Simulator implementation of `cloud.Queue`.
 *
 * @inflight `@winglang/sdk.cloud.IQueueClient`
 */
export class Queue extends cloud.Queue implements ISimulatorResource {
  private readonly timeout: Duration;
  private readonly subscribers: QueueSubscriber[];
  private readonly initialMessages: string[] = [];
  constructor(scope: Construct, id: string, props: cloud.QueueProps = {}) {
    super(scope, id, props);

    this.timeout = props.timeout ?? Duration.fromSeconds(10);
    this.subscribers = [];
    this.initialMessages.push(...(props.initialMessages ?? []));
  }

  public addConsumer(
    inflight: cloud.IQueueAddConsumerHandler,
    props: cloud.QueueAddConsumerProps = {}
  ): cloud.Function {
    const hash = inflight.node.addr.slice(-8);

    /**
     * The inflight function the user provided (via the `inflight` parameter) needs
     * to be wrapped in some extra logic to handle batching.
     * `convertBetweenHandlers` creates a dummy resource that provides the
     * wrapper code. In Wing psuedocode, this looks like:
     *
     * resource Handler impl cloud.IFunctionHandler {
     *   init(handler: cloud.IQueueAddConsumerHandler) {
     *     this.handler = handler;
     *   }
     *   inflight handle(event: string) {
     *     for (const message of JSON.parse(event).messages) {
     *       this.handler.handle(message);
     *     }
     *   }
     * }
     *
     * TODO: can we optimize this and create one less construct in the
     * user's tree by creating a single `Handler` resource that subclasses from
     * `cloud.Function` and overrides the `invoke` inflight method with the
     * wrapper code directly?
     */
    const functionHandler = convertBetweenHandlers(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-AddConsumerHandler-${hash}`,
      inflight,
      join(__dirname, "queue.addconsumer.inflight.js"),
      "QueueAddConsumerHandlerClient"
    );

    const fn = Function._newFunction(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-AddConsumer-${hash}`,
      functionHandler,
      props
    );

    new EventMapping(this, `${this.node.id}-QueueEventMapping-${hash}`, {
      subscriber: fn,
      publisher: this,
      eventSubscription: {
        functionHandle: simulatorHandleToken(fn),
        batchSize: props.batchSize ?? 1,
      },
    });

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: "add_consumer",
    });

    return fn;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: QueueSchema = {
      type: QUEUE_TYPE,
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
  public _bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }
}

Queue._annotateInflight("push", {});
Queue._annotateInflight("purge", {});
Queue._annotateInflight("approx_size", {});
