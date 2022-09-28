import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { Function } from "./function";
import { IResource } from "./resource";
import { BucketSchema, QueueSubscriber } from "./schema";

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
    const fn = new cloud.Function(
      this,
      `OnMessage-${inflight.code.hash.slice(0, 16)}`,
      inflight,
      props
    );

    this.subscribers.push({
      subscriberFunctionId: fn.node.addr,
      batchSize: props.batchSize ?? 1,
    });

    return fn;
  }

  /** @internal */
  public _toResourceSchema(): BucketSchema {
    return {
      id: this.node.id,
      type: "cloud.Bucket",
      path: this.node.path,
      props: {
        timeout: this.timeout,
        subscribers: this.subscribers,
      },
      callers: [],
      callees: [],
    };
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
    // FIXME
    return core.InflightClient.for(__filename, "QueueClient", [
      `"${this.node.id}"`,
    ]);
  }
}
