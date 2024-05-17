import { Construct } from "constructs";
import { App } from "./app";
import { Function } from "./function";
import { Queue } from "./queue";
import { SnsTopic } from "../.gen/providers/aws/sns-topic";
import { SnsTopicPolicy } from "../.gen/providers/aws/sns-topic-policy";
import { SnsTopicSubscription } from "../.gen/providers/aws/sns-topic-subscription";
import { SqsQueuePolicy } from "../.gen/providers/aws/sqs-queue-policy";
import * as cloud from "../cloud";
import * as core from "../core";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { AwsInflightHost } from "../shared-aws";
import { calculateTopicPermissions } from "../shared-aws/permissions";
import { IAwsTopic, TopicOnMessageHandler } from "../shared-aws/topic";
import { IInflightHost, Node, Resource } from "../std";

/**
 * Topic names are limited to 256 characters.
 * You can use alphanumeric characters, hyphens (-) and underscores (_).
 */
const NAME_OPTS: NameOptions = {
  maxLen: 256,
  disallowedRegex: /[^a-zA-Z0-9\_\-]+/g,
};

/**
 * AWS Implementation of `cloud.Topic`.
 *
 * @inflight `@winglang/sdk.cloud.ITopicClient`
 */
export class Topic extends cloud.Topic implements IAwsTopic {
  private readonly topic: SnsTopic;
  private readonly handlers: Record<string, Function> = {};
  /**
   * Topic's publishing permissions. can be use as a dependency of another resource.
   * (the one that got the permissions to publish)
   * */
  public permissions!: SnsTopicPolicy;

  constructor(scope: Construct, id: string, props: cloud.TopicProps = {}) {
    super(scope, id, props);

    this.topic = new SnsTopic(this, "Default", {
      name: ResourceNames.generateName(this, NAME_OPTS),
    });
  }

  public onMessage(
    inflight: cloud.ITopicOnMessageHandler,
    props: cloud.TopicOnMessageOptions = {}
  ): cloud.Function {
    const functionHandler = TopicOnMessageHandler.toFunctionHandler(inflight);
    let fn = this.handlers[inflight._id];
    if (fn) {
      return fn;
    }

    fn = new Function(
      // ok since we're not a tree root
      this.node.scope!,
      App.of(this).makeId(this, `${this.node.id}-OnMessage`),
      functionHandler,
      props
    );
    this.handlers[inflight._id] = fn;

    // TODO: remove this constraint by adding generic permission APIs to cloud.Function
    if (!(fn instanceof Function)) {
      throw new Error("Topic only supports creating tfaws.Function right now");
    }

    new SnsTopicSubscription(
      this,
      App.of(this).makeId(this, "TopicSubscription"),
      {
        topicArn: this.topicArn,
        protocol: "lambda",
        endpoint: fn.functionArn,
      }
    );

    fn.addPermissionToInvoke(this, "sns.amazonaws.com", this.topic.arn, {});

    Node.of(this).addConnection({
      source: this,
      sourceOp: cloud.TopicInflightMethods.PUBLISH,
      target: fn,
      targetOp: cloud.FunctionInflightMethods.INVOKE_ASYNC,
      name: "onMessage()",
    });

    return fn;
  }

  public subscribeQueue(queue: cloud.Queue): void {
    if (!(queue instanceof Queue)) {
      throw new Error(
        "'subscribeQueue' allows only tfaws.Queue to be subscribed to the Topic"
      );
    }

    new SnsTopicSubscription(
      this,
      App.of(this).makeId(this, "TopicSubscription"),
      {
        topicArn: this.topicArn,
        protocol: "sqs",
        endpoint: queue.queueArn,
        rawMessageDelivery: true,
      }
    );

    new SqsQueuePolicy(this, `SqsQueuePolicy-${queue.node.addr}`, {
      queueUrl: queue.queueUrl,
      policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: {
              Service: "sns.amazonaws.com",
            },
            Action: "sqs:SendMessage",
            Resource: `${queue.queueArn}`,
            Condition: {
              ArnEquals: {
                "aws:SourceArn": `${this.topicArn}`,
              },
            },
          },
        ],
      }),
    });
  }

  /**
   * Grants the given identity permissions to publish this topic.
   * @param source the resource that will publish to the topic
   * @param principal The AWS principal to grant publish permissions to (e.g. "s3.amazonaws.com", "events.amazonaws.com", "sns.amazonaws.com")
   * @param sourceArn source arn
   */
  public addPermissionToPublish(
    source: Resource,
    principal: string,
    sourceArn: string
  ): void {
    this.permissions = new SnsTopicPolicy(
      this,
      `PublishPermission-${source.node.addr}`,
      {
        arn: this.topic.arn,
        policy: JSON.stringify({
          Statement: [
            {
              Effect: "Allow",
              Principal: {
                Service: principal,
              },
              Action: "sns:Publish",
              Resource: this.topic.arn,
              Condition: {
                ArnEquals: {
                  "aws:SourceArn": sourceArn,
                },
              },
            },
          ],
        }),
      }
    );
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!AwsInflightHost.isAwsInflightHost(host)) {
      throw new Error("Host is expected to implement `IAwsInfightHost`");
    }

    host.addPolicyStatements(...calculateTopicPermissions(this.topic.arn, ops));

    host.addEnvironment(this.envName(), this.topic.arn);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "TopicClient",
      [`process.env["${this.envName()}"]`]
    );
  }
  /** @internal */
  public get _liftMap(): core.LiftMap {
    return {
      [cloud.TopicInflightMethods.PUBLISH]: [],
    };
  }

  private envName(): string {
    return `TOPIC_ARN_${this.node.addr.slice(-8)}`;
  }

  public get topicArn(): string {
    return this.topic.arn;
  }

  public get topicName(): string {
    return this.topic.name;
  }
}
