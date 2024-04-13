import { join } from "path";
import { Construct } from "constructs";
import { App } from "./app";
import { EventMapping } from "./event-mapping";
import {
  Function,
  FunctionInflightMethods as SimFunctionInflightMethods,
} from "./function";
import { Policy } from "./policy";
import { ISimulatorResource } from "./resource";
import { QueueSchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { NotImplementedError } from "../core/errors";
import { convertBetweenHandlers } from "../shared/convert";
import { ToSimulatorOutput } from "../simulator";
import { Duration, IInflightHost, Node, SDK_SOURCE_MODULE } from "../std";

/**
 * Simulator implementation of `cloud.Queue`.
 *
 * @inflight `@winglang/sdk.cloud.IQueueClient`
 */
export class Queue extends cloud.Queue implements ISimulatorResource {
  private readonly timeout: Duration;
  private readonly retentionPeriod: Duration;
  private readonly dlq?: cloud.DeadLetterQueueProps;
  private readonly policy: Policy;

  constructor(scope: Construct, id: string, props: cloud.QueueProps = {}) {
    super(scope, id, props);

    if (props.timeout) {
      throw new NotImplementedError(
        "Queue.timeout is not supported on the sim platform yet.",
        {
          issue: "https://github.com/winglang/wing/issues/1980",
          resource: this.constructor.name,
          operation: "timeout",
        }
      );
    }

    this.timeout = props.timeout ?? Duration.fromSeconds(30);
    this.retentionPeriod = props.retentionPeriod ?? Duration.fromHours(1);

    if (this.retentionPeriod.seconds < this.timeout.seconds) {
      throw new Error(
        "Retention period must be greater than or equal to timeout"
      );
    }

    this.policy = new Policy(this, "Policy", { principal: this });

    if (props.dlq && props.dlq.queue) {
      this.dlq = props.dlq;

      this.policy.addStatement(this.dlq.queue, cloud.QueueInflightMethods.PUSH);

      Node.of(this).addConnection({
        source: this,
        target: this.dlq.queue,
        name: "dead-letter queue",
      });
    }
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      cloud.QueueInflightMethods.PUSH,
      cloud.QueueInflightMethods.PURGE,
      cloud.QueueInflightMethods.APPROX_SIZE,
      cloud.QueueInflightMethods.POP,
    ];
  }

  public setConsumer(
    inflight: cloud.IQueueSetConsumerHandler,
    props: cloud.QueueSetConsumerOptions = {}
  ): cloud.Function {
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
      inflight,
      join(__dirname, "queue.setconsumer.inflight.js"),
      "QueueSetConsumerHandlerClient"
    );

    const fn = new Function(
      this,
      App.of(this).makeId(this, "SetConsumer"),
      functionHandler,
      props
    );
    const fnNode = Node.of(fn);
    fnNode.sourceModule = SDK_SOURCE_MODULE;
    fnNode.title = "setConsumer()";

    const mapping = new EventMapping(
      this,
      App.of(this).makeId(this, "QueueEventMapping"),
      {
        subscriber: fn,
        publisher: this,
        subscriptionProps: {
          batchSize: props.batchSize ?? 1,
        },
      }
    );

    this.policy.addStatement(fn, cloud.FunctionInflightMethods.INVOKE);
    this.policy.addStatement(
      fn,
      SimFunctionInflightMethods.HAS_AVAILABLE_WORKERS
    );
    mapping.node.addDependency(this.policy);

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "setConsumer()",
    });

    return fn;
  }

  public toSimulator(): ToSimulatorOutput {
    const props: QueueSchema = {
      timeout: this.timeout.seconds,
      retentionPeriod: this.retentionPeriod.seconds,
      dlq: this.dlq
        ? {
            dlqHandler: simulatorHandleToken(this.dlq.queue),
            maxDeliveryAttemps:
              this.dlq.maxDeliveryAttemps ?? cloud.DEFAULT_DELIVERY_ATTEMPS,
          }
        : undefined,
    };
    return {
      type: cloud.QUEUE_FQN,
      props,
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
