import { join } from "path";
import { Construct } from "constructs";
import { App } from "./app";
import { EventMapping } from "./event-mapping";
import {
  Function,
  FunctionInflightMethods as SimFunctionInflightMethods,
} from "./function";
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
  private readonly consumers: Function[] = [];

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

    new EventMapping(this, App.of(this).makeId(this, "QueueEventMapping"), {
      subscriber: fn,
      publisher: this,
      subscriptionProps: {
        batchSize: props.batchSize ?? 1,
      },
    });

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "setConsumer()",
    });

    this.consumers.push(fn);
    return fn;
  }

  public toSimulator(): ToSimulatorOutput {
    const props: QueueSchema = {
      timeout: this.timeout.seconds,
      retentionPeriod: this.retentionPeriod.seconds,
    };
    return {
      type: cloud.QUEUE_FQN,
      policy: this.consumers.flatMap((fn) => [
        {
          operation: cloud.FunctionInflightMethods.INVOKE,
          resourceHandle: simulatorHandleToken(fn),
        },
        {
          operation: SimFunctionInflightMethods.HAS_AVAILABLE_WORKERS,
          resourceHandle: simulatorHandleToken(fn),
        },
      ]),
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
