import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { Function } from "./function";
import { IResource } from "./resource";
import { QueueSchema, QueueSubscriber } from "./schema-resources";

/**
 * Simulator implementation of `cloud.Queue`.
 *
 * @inflight `@monadahq/wingsdk.sim.IQueueClient`
 */
export class Queue extends cloud.QueueBase implements IResource {
  private readonly callers = new Array<string>();
  private readonly callees = new Array<string>();
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

    this.subscribers.push({
      functionId: fn.node.path,
      batchSize: props.batchSize ?? 1,
    });

    this.callees.push(fn.node.path);
    (fn as Function)._addCallers(this.node.path);

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
      callers: this.callers,
      callees: this.callees,
    };
  }

  private get ref(): string {
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

    this.callers.push(captureScope.node.path);

    const env = `QUEUE_ADDR__${this.node.id}`;
    captureScope.addEnvironment(env, this.ref);

    return core.InflightClient.for(__filename, "QueueClient", [
      `process.env["${env}"]`,
    ]);
  }
}

/**
 * Simulator implementation of inflight client for `cloud.Queue`
 */
export interface IQueueClient extends cloud.IQueueClient {}
