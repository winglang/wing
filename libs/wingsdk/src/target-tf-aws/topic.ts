import { join } from "path";
import { LambdaPermission } from "@cdktf/provider-aws/lib/lambda-permission";
import { SnsTopic } from "@cdktf/provider-aws/lib/sns-topic";
import { SnsTopicSubscription } from "@cdktf/provider-aws/lib/sns-topic-subscription";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import { convertBetweenHandlers } from "../convert";
import * as core from "../core";
import { Function } from "./function";
import { addConnections } from "./util";

/**
 * AWS Implementation of `cloud.Topic`.
 *
 * @inflight `@winglang/wingsdk.cloud.ITopicClient`
 */
export class Topic extends cloud.TopicBase {
  private readonly topic: SnsTopic;

  constructor(scope: Construct, id: string, props: cloud.TopicProps = {}) {
    super(scope, id, props);

    this.topic = new SnsTopic(this, "Default", {});
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
      join(__dirname, "topic.onmessage.inflight.js"),
      "TopicOnMessageHandlerClient"
    );

    const fn = new cloud.Function(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnMessage-${hash}`,
      functionHandler,
      props
    );

    // TODO: remove this constraint by adding geric permission APIs to cloud.Function
    if (!(fn instanceof Function)) {
      throw new Error("Topic only supports creating tfaws.Function right now");
    }

    new SnsTopicSubscription(
      this,
      `${this.node.id}-TopicSubscription-${hash}`,
      {
        topicArn: this.topic.arn,
        protocol: "lambda",
        endpoint: fn.arn,
      }
    );

    new LambdaPermission(
      this,
      `${this.node.id}-TopicInvokePermission-${hash}`,
      {
        action: "lambda:InvokeFunction",
        functionName: fn._functionName,
        principal: "sns.amazonaws.com",
        sourceArn: this.topic.arn,
      }
    );

    this.addConnection({
      direction: core.Direction.OUTBOUND,
      relationship: "on_message",
      resource: fn,
    });

    this.addConnection({
      direction: core.Direction.INBOUND,
      relationship: "on_message",
      resource: this,
    });

    return fn;
  }

  /** @internal */
  public _bind(host: core.Resource, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("topics can only be bound by tfaws.Function for now");
    }

    if (ops.includes(cloud.TopicInflightMethods.PUBLISH)) {
      host.addPolicyStatements({
        effect: "Allow",
        action: ["sns:Publish"],
        resource: this.topic.arn,
      });
    }

    host.addEnvironment(this.envName(), this.topic.arn);

    addConnections(this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _inflightJsClient(): core.Code {
    return core.InflightClient.for(__filename, "TopicClient", [
      `process.env["${this.envName()}"]`,
    ]);
  }

  private envName(): string {
    return `TOPIC_ARN_${this.node.addr.slice(-8)}`;
  }
}

Topic._annotateInflight("publish", {});
