import { join } from "path";
import { Construct } from "constructs";
import { Function } from "./function";
import { LambdaEventSourceMapping } from "../.gen/providers/aws/lambda-event-source-mapping";
import { SqsQueue } from "../.gen/providers/aws/sqs-queue";
import * as cloud from "../cloud";
import * as core from "../core";
import { convertBetweenHandlers } from "../shared/convert";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { calculateQueuePermissions } from "../shared-aws/permissions";
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
 * @inflight `@winglang/sdk.cloud.IQueueClient`
 */
export class Queue extends cloud.Queue {
  private readonly queue: SqsQueue;

  constructor(scope: Construct, id: string, props: cloud.QueueProps = {}) {
    super(scope, id, props);

    this.queue = new SqsQueue(this, "Default", {
      visibilityTimeoutSeconds: props.timeout
        ? props.timeout.seconds
        : Duration.fromSeconds(30).seconds,
      messageRetentionSeconds: props.retentionPeriod
        ? props.retentionPeriod.seconds
        : Duration.fromHours(1).seconds,
      name: ResourceNames.generateName(this, NAME_OPTS),
    });
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
    props: cloud.QueueSetConsumerProps = {}
  ): cloud.Function {
    const hash = inflight.node.addr.slice(-8);
    const functionHandler = convertBetweenHandlers(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-SetConsumerHandler-${hash}`,
      inflight,
      join(
        __dirname.replace("target-tf-aws", "shared-aws"),
        "queue.setconsumer.inflight.js"
      ),
      "QueueSetConsumerHandlerClient"
    );

    const fn = Function._newFunction(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-SetConsumer-${hash}`,
      functionHandler,
      {
        ...props,
        timeout: Duration.fromSeconds(
          this.queue.visibilityTimeoutSeconds ?? 30
        ),
      }
    );

    // TODO: remove this constraint by adding generic permission APIs to cloud.Function
    if (!(fn instanceof Function)) {
      throw new Error("Queue only supports creating tfaws.Function right now");
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
      functionName: fn._functionName,
      eventSourceArn: this.queue.arn,
      batchSize: props.batchSize ?? 1,
    });

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "setConsumer()",
    });

    return fn;
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("queues can only be bound by tfaws.Function for now");
    }

    const env = this.envName();

    host.addPolicyStatements(...calculateQueuePermissions(this.queue.arn, ops));

    // The queue url needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(env, this.queue.url);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "QueueClient",
      [`process.env["${this.envName()}"]`]
    );
  }

  private envName(): string {
    return `QUEUE_URL_${this.node.addr.slice(-8)}`;
  }
}
