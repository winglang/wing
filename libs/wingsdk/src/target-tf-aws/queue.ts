import { Construct } from "constructs";
import { App } from "./app";
import { Function } from "./function";
import { LambdaEventSourceMapping } from "../.gen/providers/aws/lambda-event-source-mapping";
import { SqsQueue } from "../.gen/providers/aws/sqs-queue";
import * as cloud from "../cloud";
import * as core from "../core";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { AwsInflightHost, IAwsQueue } from "../shared-aws";
import { calculateQueuePermissions } from "../shared-aws/permissions";
import {
  Queue as AwsQueue,
  QueueSetConsumerHandler,
} from "../shared-aws/queue";
import { Duration, IInflightHost, Node } from "../std";

/**
 * Queue names are limited to 80 characters.
 * You can use alphanumeric characters, hyphens (-), and underscores (_).
 */
const NAME_OPTS: NameOptions = {
  maxLen: 80,
  disallowedRegex: /[^a-zA-Z0-9\_\-]+/g,
};

/**
 * AWS implementation of `cloud.Queue`.
 *
 * @inflight `@winglang/sdk.aws.IAwsQueueClient`
 */
export class Queue extends cloud.Queue implements IAwsQueue {
  /** @internal */
  public static _toInflightType(): string {
    return core.InflightClient.forType(
      __filename
        .replace("target-tf-aws", "shared-aws")
        .replace("queue", "queue.inflight"),
      "QueueClient"
    );
  }

  private readonly queue: SqsQueue;

  constructor(scope: Construct, id: string, props: cloud.QueueProps = {}) {
    super(scope, id, props);

    const queueOpt = props.dlq
      ? {
          visibilityTimeoutSeconds: props.timeout
            ? props.timeout.seconds
            : Duration.fromSeconds(30).seconds,
          messageRetentionSeconds: props.retentionPeriod
            ? props.retentionPeriod.seconds
            : Duration.fromHours(1).seconds,
          name: ResourceNames.generateName(this, NAME_OPTS),
          redrivePolicy: JSON.stringify({
            deadLetterTargetArn: AwsQueue.from(props.dlq.queue)?.queueArn,
            maxReceiveCount:
              props.dlq.maxDeliveryAttempts ?? cloud.DEFAULT_DELIVERY_ATTEMPTS,
          }),
        }
      : {
          visibilityTimeoutSeconds: props.timeout
            ? props.timeout.seconds
            : Duration.fromSeconds(30).seconds,
          messageRetentionSeconds: props.retentionPeriod
            ? props.retentionPeriod.seconds
            : Duration.fromHours(1).seconds,
          name: ResourceNames.generateName(this, NAME_OPTS),
        };

    this.queue = new SqsQueue(this, "Default", queueOpt);
  }

  /** @internal */
  public get _liftMap(): core.LiftMap {
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
    const fn = new Function(
      // ok since we're not a tree root
      this.node.scope!,
      App.of(this).makeId(this, `${this.node.id}-SetConsumer`),
      functionHandler,
      {
        ...props,
        timeout: Duration.fromSeconds(
          this.queue.visibilityTimeoutSeconds ?? 30
        ),
      }
    );

    if (!AwsInflightHost.isAwsInflightHost(fn)) {
      throw new Error("Host is expected to implement `IAwsInfightHost`");
    }

    fn.addPolicyStatements({
      actions: [
        "sqs:ReceiveMessage",
        "sqs:ChangeMessageVisibility",
        "sqs:GetQueueUrl",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes",
      ],
      resources: [this.queue.arn],
    });

    new LambdaEventSourceMapping(this, "EventSourceMapping", {
      functionName: fn.functionName,
      eventSourceArn: this.queue.arn,
      batchSize: props.batchSize ?? 1,
      functionResponseTypes: ["ReportBatchItemFailures"], // It allows the function to return the messages that failed to the queue
    });

    Node.of(this).addConnection({
      source: this,
      sourceOp: cloud.QueueInflightMethods.PUSH,
      target: fn,
      targetOp: cloud.FunctionInflightMethods.INVOKE,
      name: "setConsumer()",
    });

    return fn;
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    const env = this.envName();

    if (!AwsInflightHost.isAwsInflightHost(host)) {
      throw new Error("Host is expected to implement `IAwsInfightHost`");
    }

    host.addPolicyStatements(...calculateQueuePermissions(this.queue.arn, ops));

    // The queue url needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(env, this.queue.url);

    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return {
      $queueUrlOrArn: `process.env["${this.envName()}"]`,
    };
  }

  private envName(): string {
    return `QUEUE_URL_${this.node.addr.slice(-8)}`;
  }

  public get queueArn(): string {
    return this.queue.arn;
  }

  public get queueName(): string {
    return this.queue.name;
  }

  public get queueUrl(): string {
    return this.queue.url;
  }
}
