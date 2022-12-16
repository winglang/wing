import { LambdaEventSourceMapping } from "@cdktf/provider-aws/lib/lambda-event-source-mapping";
import { SqsQueue } from "@cdktf/provider-aws/lib/sqs-queue";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { Function } from "./function";
import { addConnections } from "./util";

/**
 * AWS implementation of `cloud.Queue`.
 *
 * @inflight `@winglang/wingsdk.cloud.IQueueClient`
 */
export class Queue extends cloud.QueueBase {
  /** @internal */
  public readonly _policies = {
    [cloud.QueueInflightMethods.PUSH]: {},
  };

  private readonly queue: SqsQueue;
  constructor(scope: Construct, id: string, props: cloud.QueueProps = {}) {
    super(scope, id, props);

    this.queue = new SqsQueue(this, "Default", {
      visibilityTimeoutSeconds: props.timeout?.seconds,
    });

    if ((props.initialMessages ?? []).length) {
      throw new Error(
        "initialMessages not supported yet for AWS target - https://github.com/winglang/wing/issues/281"
      );
    }
  }

  public onMessage(
    inflight: cloud.IQueueOnMessageHandler,
    props: cloud.QueueOnMessageProps = {}
  ): cloud.Function {
    const fn = new cloud.Function(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnMessage-${inflight.node.addr.slice(-8)}`,
      // IQueueOnMessageHandler has the same signature as IFunctionHandler
      // (both have an inflight "handle" method that accepts a string)
      // so it's okay to pass it here
      inflight,
      props
    );

    // TODO: remove this constraint by adding generic permission APIs to cloud.Function
    if (!(fn instanceof Function)) {
      throw new Error("Queue only supports creating tfaws.Function right now");
    }

    new LambdaEventSourceMapping(this, "EventSourceMapping", {
      functionName: fn._functionName,
      eventSourceArn: this.queue.arn,
      batchSize: props.batchSize ?? 1,
    });

    this.addConnection({
      direction: core.Direction.OUTBOUND,
      relationship: "on_message",
      resource: fn,
    });
    fn.addConnection({
      direction: core.Direction.INBOUND,
      relationship: "on_message",
      resource: this,
    });

    return fn;
  }

  /** @internal */
  public _bind(host: core.Resource, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("queues can only be bound by tfaws.Function for now");
    }

    const env = `QUEUE_URL_${this.node.addr.slice(-8)}`;

    if (ops.includes(cloud.QueueInflightMethods.PUSH)) {
      host.addPolicyStatements({
        effect: "Allow",
        action: [
          "sqs:SendMessage",
          "sqs:GetQueueAttributes",
          "sqs:GetQueueUrl",
        ],
        resource: this.queue.arn,
      });
    }

    // The queue url needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(env, this.queue.url);

    addConnections(this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _inflightJsClient(): core.Code {
    // TODO: assert that `env` is added to the `host` resource
    const env = `QUEUE_URL_${this.node.addr.slice(-8)}`;
    return core.InflightClient.for(__filename, "QueueClient", [
      `process.env["${env}"]`,
    ]);
  }
}
