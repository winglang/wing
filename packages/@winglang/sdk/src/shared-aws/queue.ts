import { Construct } from "constructs";
import { Function as AwsFunction, IAwsFunction } from "./function";
import { AwsInflightHost } from "./inflight-host";
import { calculateQueuePermissions } from "./permissions";
import { isValidArn } from "./util";
import { cloud, ui } from "..";
import { lift, LiftMap, InflightClient, App } from "../core";
import { INFLIGHT_SYMBOL } from "../core/types";
import { Duration, IInflightHost, Node, Resource } from "../std";

/**
 * A shared interface for AWS queues.
 */
export interface IAwsQueue {
  /**
   * AWS Queue arn
   */
  readonly queueArn: string;

  /**
   * AWS Queue name
   */
  readonly queueName: string;

  /**
   * AWS Queue url
   */
  readonly queueUrl: string;
}

/**
 * Base class for AWS Queues
 */
export abstract class Queue extends cloud.Queue implements IAwsQueue {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(
      __filename.replace("queue", "queue.inflight"),
      "QueueClient"
    );
  }

  /**
   * If the queue is an AWS SQS, return a helper interface for
   * working with it.
   * @param queue The cloud.Queue.
   */
  public static from(queue: cloud.Queue): IAwsQueue | undefined {
    if (this.isAwsQueue(queue)) {
      return queue;
    }
    return undefined;
  }

  private static isAwsQueue(obj: any): obj is IAwsQueue {
    return (
      typeof obj.queueArn === "string" &&
      typeof obj.queueName === "string" &&
      typeof obj.queueUrl === "string"
    );
  }

  public abstract get queueArn(): string;
  public abstract get queueName(): string;
  public abstract get queueUrl(): string;

  private readonly _timeout?: Duration;

  constructor(scope: Construct, id: string, props: cloud.QueueProps) {
    super(scope, id, props);

    this._timeout = props.timeout;
  }

  public setConsumer(
    handler: cloud.IQueueSetConsumerHandler,
    props?: cloud.QueueSetConsumerOptions
  ): cloud.Function {
    const functionHandler = QueueSetConsumerHandler.toFunctionHandler(handler);

    const fn = new cloud.Function(
      // ok since we're not a tree root
      this.node.scope!,
      App.of(this).makeId(this, `${this.node.id}-SetConsumer`),
      functionHandler,
      {
        ...props,
        timeout: this._timeout ?? Duration.fromSeconds(30),
      }
    );

    const awsFunction = AwsFunction.from(fn);

    if (!awsFunction) {
      throw new Error("Queue only supports creating IAwsFunction right now");
    }

    awsFunction.addPolicyStatements({
      actions: [
        "sqs:ReceiveMessage",
        "sqs:ChangeMessageVisibility",
        "sqs:GetQueueUrl",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes",
      ],
      resources: [this.queueArn],
    });

    this.addQueueEventSource(awsFunction, props);

    Node.of(this).addConnection({
      source: this,
      sourceOp: cloud.QueueInflightMethods.PUSH,
      target: fn,
      targetOp: cloud.FunctionInflightMethods.INVOKE,
      name: "consumer",
    });

    return fn;
  }

  protected abstract addQueueEventSource(
    awsFunction: IAwsFunction,
    props?: cloud.QueueSetConsumerOptions
  ): void;

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.QueueInflightMethods.PUSH]: [],
      [cloud.QueueInflightMethods.PURGE]: [],
      [cloud.QueueInflightMethods.APPROX_SIZE]: [],
      [cloud.QueueInflightMethods.POP]: [],
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    const env = this.envName();

    if (!AwsInflightHost.isAwsInflightHost(host)) {
      throw new Error("Host is expected to implement `IAwsInfightHost`");
    }

    host.addPolicyStatements(...calculateQueuePermissions(this.queueArn, ops));

    // The queue url needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(env, this.queueUrl);

    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return {
      $queueUrlOrArn: `process.env["${this.envName()}"]`,
    };
  }

  private envName(): string {
    return `QUEUE_URL_${this.node.addr.slice(-8)}`;
  }
}

/**
 * The inflight API for AWS queues.
 */
export interface IAwsQueueClient extends cloud.IQueueClient {
  /**
   * Get the queue URL.
   * @inflight
   */
  queueUrl(): Promise<string>;
}

/**
 * A reference to an external SQS queue.
 *
 * @inflight `@winglang/sdk.aws.IAwsQueueClient`
 */
export class QueueRef extends Resource {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(
      __filename.replace("queue", "queue.inflight"),
      "QueueClient"
    );
  }

  /** @internal */
  public [INFLIGHT_SYMBOL]?: IAwsQueueClient;

  /**
   * The ARN of this queue.
   */
  public readonly queueArn: string;

  constructor(scope: Construct, id: string, queueArn: string) {
    super(scope, id);

    if (!isValidArn(queueArn, "sqs")) {
      throw new Error(`"${queueArn}" is not a valid Amazon SQS ARN`);
    }

    this.queueArn = queueArn;

    const target = App.of(this)._target;
    if (target === "sim") {
      this.addUserInterface();
    }
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    // if this is an AWS function, add the necessary IAM permissions
    if (AwsInflightHost.isAwsInflightHost(host)) {
      host.addPolicyStatements(
        ...calculateQueuePermissions(this.queueArn, ops)
      );
    }

    host.addEnvironment(this.envName(), this.queueArn);

    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return {
      $queueUrlOrArn: `process.env["${this.envName()}"]`,
    };
  }

  private envName(): string {
    return `QUEUE_ARN_${this.node.addr.slice(-8)}`;
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      ["queueUrl"]: [], // AWS-specific
      [cloud.QueueInflightMethods.PUSH]: [],
      [cloud.QueueInflightMethods.PURGE]: [],
      [cloud.QueueInflightMethods.APPROX_SIZE]: [],
      [cloud.QueueInflightMethods.POP]: [],
    };
  }

  private addUserInterface() {
    Node.of(this).color = "pink";

    const queueUrlHandler = lift({ queue: this }).inflight(async (ctx) => {
      try {
        return await ctx.queue.queueUrl();
      } catch (e: any) {
        return e.message;
      }
    });

    new ui.Field(this, "QueueUrlField", "SQS Queue URL", queueUrlHandler, {
      link: true,
    });

    const awsConsoleHandler = lift({ queue: this }).inflight(async (ctx) => {
      try {
        const url = await ctx.queue.queueUrl();
        const x = new URL(url);
        const region = x.hostname.split(".")[1];
        return (
          "https://" +
          region +
          ".console.aws.amazon.com/sqs/v3/home?region=" +
          region +
          "#/queues/" +
          encodeURIComponent(url)
        );
      } catch (e: any) {
        return e.message;
      }
    });

    new ui.Field(this, "AwsConsoleField", "AWS Console", awsConsoleHandler, {
      link: true,
    });

    new ui.ValueField(this, "QueueArnField", "SQS Queue ARN", this.queueArn);
  }
}

/**
 * Utility class for working with the queue consumer handler.
 */
export class QueueSetConsumerHandler {
  /**
   * Converts a queue consumer handler to a function handler.
   * @param handler The queue consumer handler.
   * @returns The function handler.
   */
  public static toFunctionHandler(
    handler: cloud.IQueueSetConsumerHandler
  ): cloud.IFunctionHandler {
    return lift({ handler }).inflight(async (ctx, event) => {
      const batchItemFailures = [];
      for (const record of (event as any).Records ?? []) {
        try {
          await ctx.handler(record.body);
        } catch (error) {
          batchItemFailures.push({
            itemIdentifier: record.messageId,
          });
        }
      }
      return { batchItemFailures } as any;
    });
  }
}
