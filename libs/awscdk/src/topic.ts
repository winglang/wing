import { join } from "path";
import { Topic as SNSTopic } from "aws-cdk-lib/aws-sns";
import { LambdaSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Construct } from "constructs";
import { Function } from "./function";
import { App } from "./app";
import { cloud, core, std } from "@winglang/sdk";
import { convertBetweenHandlers } from "@winglang/sdk/lib/shared/convert";
import { calculateTopicPermissions } from "@winglang/sdk/lib/shared-aws/permissions";
import { IAwsTopic } from "@winglang/sdk/lib/shared-aws/topic";

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
        __dirname.replace("target-awscdk", "shared-aws"),
        "topic.onmessage.inflight.js"
      ),
      "TopicOnMessageHandlerClient"
    );

    const fn = new Function(
      this.node.scope!, // ok since we're not a tree root
      App.of(this).makeId(this, `${this.node.id}-OnMessage`),
      functionHandler,
      props
    );

    // TODO: remove this constraint by adding geric permission APIs to cloud.Function
    if (!(fn instanceof Function)) {
      throw new Error("Topic only supports creating awscdk.Function right now");
    }

    const subscription = new LambdaSubscription(fn._function);
    this.topic.addSubscription(subscription);

    std.Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "onMessage()",
    });

    return fn;
  }

  public onLift(host: std.IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("topics can only be bound by awscdk.Function for now");
    }

    host.addPolicyStatements(
      ...calculateTopicPermissions(this.topic.topicArn, ops)
    );

    host.addEnvironment(this.envName(), this.topic.topicArn);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-awscdk", "shared-aws"),
      __filename,
      "TopicClient",
      [`process.env["${this.envName()}"]`]
    );
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
