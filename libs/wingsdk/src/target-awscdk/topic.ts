import { join } from "path";
import { Topic as SNSTopic } from "aws-cdk-lib/aws-sns";
import { LambdaSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Construct } from "constructs";
import { Function } from "./function";
import * as cloud from "../cloud";
import * as core from "../core";
import { convertBetweenHandlers } from "../shared/convert";
import { calculateTopicPermissions } from "../shared-aws/permissions";
import { IInflightHost, Node } from "../std";

/**
 * AWS Implementation of `cloud.Topic`.
 *
 * @inflight `@winglang/sdk.cloud.ITopicClient`
 */
export class Topic extends cloud.Topic {
  private readonly topic: SNSTopic;
  constructor(scope: Construct, id: string, props: cloud.TopicProps = {}) {
    super(scope, id, props);

    this.topic = new SNSTopic(this, "Topic");
  }

  /**
   * Topic's arn
   */
  public get arn(): string {
    return this.topic.topicArn;
  }

  public onMessage(
    inflight: cloud.ITopicOnMessageHandler,
    props: cloud.TopicOnMessageProps = {}
  ): cloud.Function {
    const hash = inflight.node.addr.slice(-8);
    const functionHandler = convertBetweenHandlers(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnMessageHandler-${hash}`,
      inflight,
      join(
        __dirname.replace("target-awscdk", "shared-aws"),
        "topic.onmessage.inflight.js"
      ),
      "TopicOnMessageHandlerClient"
    );

    const fn = Function._newFunction(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnMessage-${hash}`,
      functionHandler,
      props
    );

    // TODO: remove this constraint by adding geric permission APIs to cloud.Function
    if (!(fn instanceof Function)) {
      throw new Error("Topic only supports creating awscdk.Function right now");
    }

    const subscription = new LambdaSubscription(fn._function);
    this.topic.addSubscription(subscription);

    Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "onMessage()",
    });

    return fn;
  }

  public onLift(host: IInflightHost, ops: string[]): void {
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
}
