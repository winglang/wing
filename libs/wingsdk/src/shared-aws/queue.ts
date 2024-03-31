import { Construct } from "constructs";
import { Function } from "./function";
import { calculateQueuePermissions } from "./permissions";
import { isValidArn } from "./util";
import { cloud } from "..";
import { IQueueClient } from "../cloud";
import { InflightClient } from "../core";
import { INFLIGHT_SYMBOL } from "../core/types";
import { Testing } from "../simulator";
import { IInflightHost, Node, Resource } from "../std";
import * as ui from "../ui";

/**
 * Queue standard execution
 */
export const QUEUE_STANDARD_EXECUTION = 1;

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

const QUEUE_URL_METHOD = "queueUrl";

/**
 * A helper class for working with AWS queues.
 */
export class Queue {
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
}

/**
 * A reference to an external SQS queue.
 *
 * @inflight `@winglang/sdk.cloud.IQueueClient`
 */
export class QueueRef extends Resource {
  /** @internal */
  public [INFLIGHT_SYMBOL]?: IQueueClient;

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

    this.addUserInterface();
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    // if this is an AWS function, add the necessary IAM permissions
    const fn = Function.from(host);
    if (fn) {
      fn.addPolicyStatements(...calculateQueuePermissions(this.queueArn, ops));
    }

    host.addEnvironment(this.envName(), this.queueArn);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return InflightClient.for(__dirname, __filename, "QueueClient", [
      `process.env["${this.envName()}"]`,
    ]);
  }

  private envName(): string {
    return `QUEUE_ARN_${this.node.addr.slice(-8)}`;
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      QUEUE_URL_METHOD, // AWS-specific
      cloud.QueueInflightMethods.PUSH,
      cloud.QueueInflightMethods.PURGE,
      cloud.QueueInflightMethods.APPROX_SIZE,
      cloud.QueueInflightMethods.POP,
    ];
  }

  private addUserInterface() {
    Node.of(this).color = "pink";

    const queueUrlHandler = Testing.makeHandler(
      `
      async handle() {
        try {
          return await this.queue.queueUrl();
        } catch (e) {
          return e.message;
        }
      }
      `,
      {
        queue: {
          obj: this,
          ops: [QUEUE_URL_METHOD],
        },
      }
    );

    new ui.Field(this, "QueueUrlField", "SQS Queue URL", queueUrlHandler, {
      link: true,
    });

    const awsConsoleHandler = Testing.makeHandler(
      `async handle() { 
        try {
          const url = await this.queue.queueUrl();
          const x = new URL(url);
          const region = x.hostname.split(".")[1];
          return "https://" + region + ".console.aws.amazon.com/sqs/v3/home?region=" + region + "#/queues/" + encodeURIComponent(url);
        } catch (e) {
          return e.message;
        }
      }`,
      {
        queue: {
          obj: this,
          ops: [QUEUE_URL_METHOD],
        },
      }
    );

    new ui.Field(this, "AwsConsoleField", "AWS Console", awsConsoleHandler, {
      link: true,
    });

    const queueArnHandler = Testing.makeHandler(
      `async handle() { 
        return this.queueArn;
      }`,
      {
        queueArn: {
          obj: this.queueArn,
          ops: [],
        },
      }
    );

    new ui.Field(this, "QueueArnField", "SQS Queue ARN", queueArnHandler);
  }
}
