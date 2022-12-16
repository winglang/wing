import { LambdaPermission } from "@cdktf/provider-aws/lib/lambda-permission";
import { SnsTopic } from "@cdktf/provider-aws/lib/sns-topic";
import { SnsTopicSubscription } from "@cdktf/provider-aws/lib/sns-topic-subscription";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { Function } from "./function";
import { addConnections } from "./util";

/**
 * AWS Implementation of `cloud.Topic`.
 *
 * @inflight `@winglang/wingsdk.cloud.ITopicClient`
 */
export class Topic extends cloud.TopicBase {
  /** @internal */
  public readonly _policies = {
    [cloud.TopicInflightMethods.PUBLISH]: {},
  };

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
    const fn = new cloud.Function(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-OnMessage-${hash}`,
      // ITopicOnMessageHandler has the same signature as IFunctionHandler
      // (both have an inflight "handle" method that accepts a string)
      // so it's okay to pass it here
      inflight,
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

    const env = `TOPIC_ARN_${this.node.addr.slice(-8)}`;

    if (ops.includes(cloud.TopicInflightMethods.PUBLISH)) {
      host.addPolicyStatements({
        effect: "Allow",
        action: ["sns:Publish"],
        resource: this.topic.arn,
      });
    }

    host.addEnvironment(env, this.topic.arn);

    addConnections(this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _inflightJsClient(): core.Code {
    // TODO: assert that `env` is added to the `host` resource
    const env = `TOPIC_ARN_${this.node.addr.slice(-8)}`;
    return core.InflightClient.for(__filename, "TopicClient", [
      `process.env["${env}"]`,
    ]);
  }
}
