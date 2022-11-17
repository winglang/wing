import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { Function } from "./function";
import { IResource } from "./resource";
import { QueueSchema, QueueSubscriber } from "./schema-resources";
import { captureSimulatorResource } from "./util";

/**
 * Simulator implementation of `cloud.Queue`.
 *
 * @inflight `@winglang/wingsdk.sim.IQueueClient`
 */
export class Queue extends cloud.QueueBase implements IResource {
  private readonly inbound = new Array<string>();
  private readonly outbound = new Array<string>();
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
      this,
      `OnMessage-${inflight.code.hash.slice(0, 16)}`,
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

    this.outbound.push(fn.node.path);
    (fn as Function)._addInbound(this.node.path);

    return fn;
  }

  /** @internal */
  public _toResourceSchema(): QueueSchema {
    return {
      type: cloud.QUEUE_TYPE,
      props: {
        timeout: this.timeout.seconds,
        subscribers: this.subscribers,
        initialMessages: this.initialMessages,
      },
      attrs: {} as any,
      inbound: this.inbound,
      outbound: this.outbound,
    };
  }

  /** @internal */
  public _addInbound(...resources: string[]) {
    this.inbound.push(...resources);
  }

  /** @internal */
  public _bind(
    captureScope: IConstruct,
    _metadata: core.CaptureMetadata
  ): core.Code {
    return captureSimulatorResource("queue", this, captureScope);
  }
}

/**
 * Simulator implementation of inflight client for `cloud.Queue`
 */
export interface IQueueClient extends cloud.IQueueClient {}
