import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { QUEUE_ID } from "../cloud";
import * as core from "../core";
import { Function } from "./function";
import { IResource } from "./resource";
import { QueueSchema, QueueSubscriber } from "./schema";

/**
 * Simulator implementation of `cloud.Queue`.
 */
export class Queue extends cloud.QueueBase implements IResource {
  private readonly timeout: core.Duration;
  private readonly subscribers: QueueSubscriber[];
  constructor(scope: Construct, id: string, props: cloud.QueueProps = {}) {
    super(scope, id, props);

    this.timeout = props.timeout ?? core.Duration.fromSeconds(30);
    this.subscribers = [];
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
    code.push(`    await ${inflight.entrypoint}($cap, JSON.parse($message));`);
    code.push(`  }`);
    code.push(`}`);
    const newInflight = new core.Inflight({
      entrypoint: `$queueEventWrapper`,
      code: core.NodeJsCode.fromInline(code.join("\n")),
    });

    const fn = new cloud.Function(
      this,
      `OnMessage-${inflight.code.hash.slice(0, 16)}`,
      newInflight,
      props
    );
    // At the time the queue is initialized, the simulator needs to be
    // able to call subscribed functions.
    this.node.addDependency(fn);

    this.subscribers.push({
      functionId: fn.node.path,
      batchSize: props.batchSize ?? 1,
    });

    return fn;
  }

  /** @internal */
  public _toResourceSchema(): QueueSchema {
    return {
      type: QUEUE_ID,
      props: {
        timeout: this.timeout.seconds,
        subscribers: this.subscribers,
        initialMessages: [],
      },
      attrs: {} as any,
      callers: [],
      callees: [],
    };
  }

  private get addr(): string {
    return `\${${this.node.path}#attrs.queueAddr}`;
  }

  /**
   * @internal
   */
  public _capture(
    captureScope: IConstruct,
    _metadata: core.CaptureMetadata
  ): core.Code {
    if (!(captureScope instanceof Function)) {
      throw new Error("queues can only be captured by a sim.Function for now");
    }

    const env = `QUEUE_ADDR__${this.node.id}`;
    captureScope.addEnvironment(env, this.addr);

    return core.InflightClient.for(__filename, "QueueClient", [
      `process.env["${env}"]`,
    ]);
  }
}
