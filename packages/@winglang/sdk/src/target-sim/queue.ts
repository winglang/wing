import { Construct } from "constructs";
import { App } from "./app";
import { EventMapping } from "./event-mapping";
import { FunctionInflightMethods as SimFunctionInflightMethods } from "./function";
import { Policy } from "./policy";
import { ISimulatorResource } from "./resource";
import { QueueSchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import {
  bindSimulatorResource,
  makeSimulatorJsClientType,
  simulatorLiftedFieldsFor,
} from "./util";
import * as cloud from "../cloud";
import { lift, LiftMap } from "../core";
import { NotImplementedError } from "../core/errors";
import { ToSimulatorOutput } from "../simulator";
import { Duration, IInflightHost, Json, Node, SDK_SOURCE_MODULE } from "../std";

/**
 * Simulator implementation of `cloud.Queue`.
 *
 * @inflight `@winglang/sdk.cloud.IQueueClient`
 */
export class Queue extends cloud.Queue implements ISimulatorResource {
  /** @internal */
  public static _toInflightType(): string {
    return makeSimulatorJsClientType("Queue", cloud.Queue._methods);
  }

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
        sourceOp: cloud.QueueInflightMethods.POP,
        target: this.dlq.queue,
        targetOp: cloud.QueueInflightMethods.PUSH,
        name: "dead-letter queue",
      });
    }
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.QueueInflightMethods.PUSH]: [],
      [cloud.QueueInflightMethods.PURGE]: [],
      [cloud.QueueInflightMethods.APPROX_SIZE]: [],
      [cloud.QueueInflightMethods.POP]: [],
    };
  }

  public setConsumer(
    inflight: cloud.IQueueSetConsumerHandler,
    props: cloud.QueueSetConsumerOptions = {}
  ): cloud.Function {
    const functionHandler = QueueSetConsumerHandler.toFunctionHandler(inflight);
    const fn = new cloud.Function(
      this,
      App.of(this).makeId(this, "Consumer"),
      functionHandler,
      props
    );
    const fnNode = Node.of(fn);
    fnNode.sourceModule = SDK_SOURCE_MODULE;
    fnNode.title = "Consumer";

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
      sourceOp: cloud.QueueInflightMethods.PUSH,
      target: fn,
      targetOp: cloud.FunctionInflightMethods.INVOKE,
      name: "consumer",
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
            maxDeliveryAttempts:
              this.dlq.maxDeliveryAttempts ?? cloud.DEFAULT_DELIVERY_ATTEMPTS,
          }
        : undefined,
    };
    return {
      type: cloud.QUEUE_FQN,
      props,
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return simulatorLiftedFieldsFor(this);
  }
}

/**
 * Utility class to work with queue set consumer handlers.
 */
export class QueueSetConsumerHandler {
  /**
   * Converts from a `cloud.IQueueSetConsumerHandler` to a `cloud.IFunctionHandler`.
   * @param handler The handler to convert.
   * @returns The function handler.
   */
  public static toFunctionHandler(
    handler: cloud.IQueueSetConsumerHandler
  ): cloud.IFunctionHandler {
    return lift({ handler }).inflight(async (ctx, event) => {
      const batchItemFailures = [];

      const eventWithMessages = event as unknown as {
        messages: { payload: string }[];
      };
      if (eventWithMessages.messages) {
        for (const $message of eventWithMessages.messages) {
          try {
            await ctx.handler($message.payload);
          } catch (error) {
            batchItemFailures.push($message);
          }
        }
      } else {
        throw new Error('No "messages" field in event.');
      }

      return batchItemFailures.length > 0
        ? (batchItemFailures as unknown as Json)
        : undefined;
    });
  }
}
