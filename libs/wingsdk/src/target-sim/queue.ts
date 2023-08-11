import { join } from "path";
import { Construct } from "constructs";
import { EventMapping } from "./event-mapping";
import { Function } from "./function";
import { ISimulatorResource } from "./resource";
import { QueueSchema, QUEUE_TYPE } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { convertBetweenHandlers } from "../shared/convert";
import { Display, Duration, IInflightHost, Resource } from "../std";
import { BaseResourceSchema } from "../testing/simulator";

/**
 * Simulator implementation of `cloud.Queue`.
 *
 * @inflight `@winglang/sdk.cloud.IQueueClient`
 */
export class Queue extends cloud.Queue implements ISimulatorResource {
  private readonly timeout: Duration;
  private readonly retentionPeriod: Duration;
  private readonly initialMessages: string[] = [];
  constructor(scope: Construct, id: string, props: cloud.QueueProps = {}) {
    super(scope, id, props);

    this.timeout = props.timeout ?? Duration.fromSeconds(10);
    this.retentionPeriod = props.retentionPeriod ?? Duration.fromHours(1);

    if (this.retentionPeriod < this.timeout) {
      throw new Error(
        "Retention period must be greater than or equal to timeout"
      );
    }

    this.initialMessages.push(...(props.initialMessages ?? []));
  }

  public setConsumer(
    inflight: cloud.IQueueSetConsumerHandler,
    props: cloud.QueueSetConsumerProps = {}
  ): cloud.Function {
    const hash = inflight.node.addr.slice(-8);

    /**
     * The inflight function the user provided (via the `inflight` parameter) needs
     * to be wrapped in some extra logic to handle batching.
     * `convertBetweenHandlers` creates a dummy resource that provides the
     * wrapper code. In Wing psuedocode, this looks like:
     *
     * resource Handler impl cloud.IFunctionHandler {
     *   init(handler: cloud.IQueueSetConsumerHandler) {
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
      this,
      `${this.node.id}-SetConsumerHandler-${hash}`,
      inflight,
      join(__dirname, "queue.setconsumer.inflight.js"),
      "QueueSetConsumerHandlerClient"
    );

    const fn = Function._newFunction(
      this,
      `${this.node.id}-SetConsumer-${hash}`,
      functionHandler,
      props
    );
    fn.display.sourceModule = Display.SDK_SOURCE_MODULE;
    fn.display.title = "setConsumer()";

    new EventMapping(this, `${this.node.id}-QueueEventMapping-${hash}`, {
      subscriber: fn,
      publisher: this,
      subscriptionProps: {
        batchSize: props.batchSize ?? 1,
      },
    });

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: "setConsumer()",
    });

    return fn;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: QueueSchema = {
      type: QUEUE_TYPE,
      path: this.node.path,
      props: {
        timeout: this.timeout.seconds,
        retentionPeriod: this.retentionPeriod.seconds,
        initialMessages: this.initialMessages,
      },
      attrs: {} as any,
    };
    return schema;
  }

  public bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }
}
