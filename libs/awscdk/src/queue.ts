import { join } from "path";
import { Duration } from "aws-cdk-lib";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { Queue as SQSQueue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import { Function } from "./function";
import { App } from "./app";
import { std, core, cloud } from "@winglang/sdk";
import { convertBetweenHandlers } from "@winglang/sdk/lib/shared/convert";
import { calculateQueuePermissions } from "@winglang/sdk/lib/shared-aws/permissions";
import { IAwsQueue } from "@winglang/sdk/lib/shared-aws/queue";

/**
 * AWS implementation of `cloud.Queue`.
 *
 * @inflight `@winglang/sdk.cloud.IQueueClient`
 */
export class Queue extends cloud.Queue implements IAwsQueue {
  private readonly queue: SQSQueue;
  private readonly timeout: std.Duration;

  constructor(scope: Construct, id: string, props: cloud.QueueProps = {}) {
    super(scope, id, props);
    this.timeout = props.timeout ?? std.Duration.fromSeconds(30);

    this.queue = new SQSQueue(this, "Default", {
      visibilityTimeout: props.timeout
        ? Duration.seconds(props.timeout?.seconds)
        : Duration.seconds(30),
      retentionPeriod: props.retentionPeriod
        ? Duration.seconds(props.retentionPeriod?.seconds)
        : Duration.hours(1),
    });
  }

  public setConsumer(
    inflight: cloud.IQueueSetConsumerHandler,
    props: cloud.QueueSetConsumerOptions = {}
  ): cloud.Function {
    const functionHandler = convertBetweenHandlers(
      inflight,
      join(
        __dirname.replace("target-awscdk", "shared-aws"),
        "queue.setconsumer.inflight.js"
      ),
      "QueueSetConsumerHandlerClient"
    );

    const fn = new Function(
      // ok since we're not a tree root
      this.node.scope!,
      App.of(this).makeId(this, `${this.node.id}-SetConsumer`),
      functionHandler,
      {
        ...props,
        timeout: this.timeout,
      }
    );

    // TODO: remove this constraint by adding generic permission APIs to cloud.Function
    if (!(fn instanceof Function)) {
      throw new Error("Queue only supports creating awscdk.Function right now");
    }

    const eventSource = new SqsEventSource(this.queue, {
      batchSize: props.batchSize ?? 1,
    });
    fn._addEventSource(eventSource);

    std.Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "setConsumer()",
    });

    return fn;
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

  public onLift(host: std.IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("queues can only be bound by tfaws.Function for now");
    }

    const env = this.envName();

    host.addPolicyStatements(
      ...calculateQueuePermissions(this.queue.queueArn, ops)
    );

    // The queue url needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(env, this.queue.queueUrl);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-awscdk", "shared-aws"),
      __filename,
      "QueueClient",
      [`process.env["${this.envName()}"]`]
    );
  }

  private envName(): string {
    return `SCHEDULE_EVENT_${this.node.addr.slice(-8)}`;
  }

  public get queueArn(): string {
    return this.queue.queueArn;
  }

  public get queueName(): string {
    return this.queue.queueName;
  }

  public get queueUrl(): string {
    return this.queue.queueUrl;
  }
}
