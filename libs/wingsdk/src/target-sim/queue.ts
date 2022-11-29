import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { Direction, Resource } from "../core";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { QueueSchema, QueueSubscriber } from "./schema-resources";
import { bindSimulatorResource } from "./util";

/**
 * Simulator implementation of `cloud.Queue`.
 *
 * @inflight `@winglang/wingsdk.cloud.IQueueClient`
 */
export class Queue extends cloud.QueueBase implements ISimulatorResource {
  private readonly timeout: core.Duration;
  private readonly subscribers: QueueSubscriber[];
  private readonly initialMessages: string[] = [];
  constructor(scope: Construct, id: string, props: cloud.QueueProps = {}) {
    super(scope, id, props);

    this.timeout = props.timeout ?? core.Duration.fromSeconds(30);
    this.subscribers = [];
    this.initialMessages.push(...(props.initialMessages ?? []));
  }

  public onMessage(
    inflight: core.Inflight,
    props: cloud.QueueOnMessageProps = {}
  ): cloud.Function {
    const code: string[] = [];
    code.push(inflight.code.text);
    code.push(`async function $queueEventWrapper($cap, event) {`);
    code.push(`  event = JSON.parse(event);`);
    code.push(
      `  if (!event.messages) throw new Error('No "messages" field in event.');`
    );
    code.push(`  for (const $message of event.messages) {`);
    code.push(`    await ${inflight.entrypoint}($cap, $message);`);
    code.push(`  }`);
    code.push(`}`);

    const newInflight = new core.Inflight({
      entrypoint: `$queueEventWrapper`,
      code: core.NodeJsCode.fromInline(code.join("\n")),
      captures: inflight.captures,
    });

    const fn = new cloud.Function(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnMessage-${inflight.code.hash.slice(0, 16)}`,
      newInflight,
      props
    );

    // At the time the queue is created in the simulator, it needs to be able to
    // call subscribed functions.
    this.node.addDependency(fn);

    const functionHandle = `\${${fn.node.path}#attrs.handle}`; // TODO: proper token mechanism
    this.subscribers.push({
      functionHandle,
      batchSize: props.batchSize ?? 1,
    });

    this.addConnection({
      direction: Direction.OUTBOUND,
      relationship: "on_message",
      resource: fn,
    });
    fn.addConnection({
      direction: Direction.INBOUND,
      relationship: "on_message",
      resource: this,
    });

    return fn;
  }

  public toSimulator(): BaseResourceSchema {
    const schema: QueueSchema = {
      type: cloud.QUEUE_TYPE,
      path: this.node.path,
      props: {
        timeout: this.timeout.seconds,
        subscribers: this.subscribers,
        initialMessages: this.initialMessages,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(
    captureScope: Resource,
    _metadata: core.CaptureMetadata
  ): core.Code {
    return bindSimulatorResource("queue", this, captureScope);
  }
}
