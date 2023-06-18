import { join } from "path";
import { Duration } from "aws-cdk-lib";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { Queue as SQSQueue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import { Function } from "./function";
import * as cloud from "../cloud";
import * as core from "../core";
import { convertBetweenHandlers } from "../shared/convert";
import { calculateQueuePermissions } from "../shared-aws/permissions";
import { IInflightHost, Resource } from "../std";

/**
 * AWS implementation of `cloud.Queue`.
 *
 * @inflight `@winglang/sdk.cloud.IQueueClient`
 */
export class Queue extends cloud.Queue {
  private readonly queue: SQSQueue;

  constructor(scope: Construct, id: string, props: cloud.QueueProps = {}) {
    super(scope, id, props);

    this.queue = new SQSQueue(this, "Default", {
      visibilityTimeout: props.timeout
        ? Duration.seconds(props.timeout?.seconds)
        : undefined,
      retentionPeriod: props.retentionPeriod
        ? Duration.seconds(props.retentionPeriod?.seconds)
        : undefined,
    });

    if ((props.initialMessages ?? []).length) {
      throw new Error(
        "initialMessages not supported yet for AWS target - https://github.com/winglang/wing/issues/281"
      );
    }
  }

  public setConsumer(
    inflight: cloud.IQueueSetConsumerHandler,
    props: cloud.QueueSetConsumerProps = {}
  ): cloud.Function {
    const hash = inflight.node.addr.slice(-8);
    const functionHandler = convertBetweenHandlers(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-SetConsumerHandler-${hash}`,
      inflight,
      join(
        __dirname.replace("target-awscdk", "shared-aws"),
        "queue.setconsumer.inflight.js"
      ),
      "QueueSetConsumerHandlerClient"
    );

    const fn = Function._newFunction(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-SetConsumer-${hash}`,
      functionHandler,
      props
    );

    // TODO: remove this constraint by adding generic permission APIs to cloud.Function
    if (!(fn instanceof Function)) {
      throw new Error("Queue only supports creating awscdk.Function right now");
    }

    const eventSource = new SqsEventSource(this.queue, {
      batchSize: props.batchSize ?? 1,
    });
    fn._addEventSource(eventSource);

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: "consumer",
    });

    return fn;
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
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

    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
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
}
