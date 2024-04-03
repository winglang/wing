import { join } from "path";
import { Topic as SNSTopic } from "aws-cdk-lib/aws-sns";
import { LambdaSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Construct } from "constructs";
import { App } from "./app";
import { cloud, core, std } from "@winglang/sdk";
import { convertBetweenHandlers } from "@winglang/sdk/lib/shared/convert";
import { calculateTopicPermissions } from "@winglang/sdk/lib/shared-aws/permissions";
import { IAwsTopic } from "@winglang/sdk/lib/shared-aws/topic";
import { addPolicyStatements, isAwsCdkFunction } from "./function";

/**
 * AWS Implementation of `cloud.Topic`.
 *
 * @inflight `@winglang/sdk.cloud.ITopicClient`
 */
export class Topic extends cloud.Topic implements IAwsTopic {
  private readonly topic: SNSTopic;
  constructor(scope: Construct, id: string, props: cloud.TopicProps = {}) {
    super(scope, id, props);

    this.topic = new SNSTopic(this, "Topic");
  }

  public onMessage(
    inflight: cloud.ITopicOnMessageHandler,
    props: cloud.TopicOnMessageOptions = {}
  ): cloud.Function {
    const functionHandler = convertBetweenHandlers(
      inflight,
      join(
        __dirname,
        "topic.onmessage.inflight.js"
      ),
      "TopicOnMessageHandlerClient"
    );

    const fn = new cloud.Function(
      this.node.scope!, // ok since we're not a tree root
      App.of(this).makeId(this, `${this.node.id}-OnMessage`),
      functionHandler,
      props
    );

    if (!isAwsCdkFunction(fn)) {
      throw new Error("Expected function to implement 'IAwsCdkFunction' method");
    }

    const subscription = new LambdaSubscription(fn.awscdkFunction);
    this.topic.addSubscription(subscription);

    std.Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "onMessage()",
    });

    return fn;
  }

  public subscribeQueue(
    queue: cloud.Queue,
    props: cloud.TopicOnMessageOptions = {}
  ): void {
    queue;
    props;
  }

  public onLift(host: std.IInflightHost, ops: string[]): void {
    if (!isAwsCdkFunction(host)) {
      throw new Error("Expected 'host' to implement 'IAwsCdkFunction' method");
    }

    addPolicyStatements(host.awscdkFunction, calculateTopicPermissions(this.topic.topicArn, ops));

    host.addEnvironment(this.envName(), this.topic.topicArn);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname,
      __filename,
      "TopicClient",
      [`process.env["${this.envName()}"]`]
    );
  }
  /** @internal */
  public _supportedOps(): string[] {
    return [cloud.TopicInflightMethods.PUBLISH];
  }

  /** @internal */
  public get _topic(): SNSTopic {
    return this.topic;
  }

  private envName(): string {
    return `TOPIC_ARN_${this.node.addr.slice(-8)}`;
  }

  public get topicArn(): string {
    return this.topic.topicArn;
  }

  public get topicName(): string {
    return this.topic.topicName;
  }
}
