import { Construct } from "constructs";
import { LambdaEventSourceMapping } from "../.gen/providers/aws/lambda-event-source-mapping";
import { SqsQueue } from "../.gen/providers/aws/sqs-queue";
import * as cloud from "../cloud";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { Queue as AwsQueue, IAwsFunction } from "../shared-aws";
import { Duration } from "../std";

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
 */
export class Queue extends AwsQueue {
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

  protected addQueueEventSource(
    fn: IAwsFunction,
    props?: cloud.QueueSetConsumerOptions
  ): void {
    new LambdaEventSourceMapping(this, "EventSourceMapping", {
      functionName: fn.functionName,
      eventSourceArn: this.queueArn,
      batchSize: props?.batchSize ?? 1,
      functionResponseTypes: ["ReportBatchItemFailures"], // It allows the function to return the messages that failed to the queue
    });
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
