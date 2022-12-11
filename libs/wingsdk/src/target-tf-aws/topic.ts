import { LambdaPermission } from "@cdktf/provider-aws/lib/lambda-permission";
import { SnsTopic } from "@cdktf/provider-aws/lib/sns-topic";
import { SnsTopicSubscription } from "@cdktf/provider-aws/lib/sns-topic-subscription";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { Direction, Resource } from "../core";
import { Function } from "./function";
import { addBindConnections } from "./util";

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
    inflight: core.Inflight,
    props: cloud.TopicOnMessageProps = {}
  ): cloud.Function {
    const code: string[] = [];
    const entrypoint = `$snsEventWrapper`;
    code.push(inflight.code.text);
    code.push(`async function ${entrypoint}($cap, event) {`);
    code.push(` for (const record of event.Records ?? []) {`);
    code.push(`   await ${inflight.entrypoint}($cap, record.Sns);`);
    code.push(` }`);
    code.push(`}`);
    const newInflight = new core.Inflight({
      entrypoint,
      code: core.NodeJsCode.fromInline(code.join("\n")),
      captures: inflight.captures,
    });

    const newInflightHash = newInflight.code.hash.slice(0, 16);

    const fn = new cloud.Function(
      this.node.scope!,
      `${this.node.id}-OnMessage-${newInflightHash}`,
      newInflight,
      props
    );

    // TODO: remove this constraint by adding geric permission APIs to cloud.Function
    if (!(fn instanceof Function)) {
      throw new Error("Topic only supports creating tfaws.Function right now");
    }

    new SnsTopicSubscription(
      this,
      `${this.node.id}-TopicSubsription-${newInflightHash}`,
      {
        topicArn: this.topic.arn,
        protocol: "lambda",
        endpoint: fn.arn,
      }
    );

    new LambdaPermission(
      this,
      `${this.node.id}-TopicInvokePermission-${newInflightHash}`,
      {
        action: "lambda:InvokeFunction",
        functionName: fn._functionName,
        principal: "sns.amazonaws.com",
        sourceArn: this.topic.arn,
      }
    );

    this.addConnection({
      direction: Direction.OUTBOUND,
      relationship: "on_message",
      resource: fn,
    });

    this.addConnection({
      direction: Direction.INBOUND,
      relationship: "on_message",
      resource: this,
    });

    return fn;
  }

  /**
   * @internal
   */
  public _bind(
    captureScope: Resource,
    metadata: core.CaptureMetadata
  ): core.Code {
    if (!(captureScope instanceof Function)) {
      throw new Error("topics can only be captured by tfaws.Function for now");
    }

    const env = `TOPIC_ARN_${this.node.addr.slice(-8)}`;

    const methods = new Set(metadata.methods ?? []);
    if (methods.has(cloud.TopicInflightMethods.PUBLISH)) {
      captureScope.addPolicyStatements({
        effect: "Allow",
        action: ["sns:Publish"],
        resource: this.topic.arn,
      });
    }

    captureScope.addEnvironment(env, this.topic.arn);

    addBindConnections(this, captureScope);

    return core.InflightClient.for(__filename, "TopicClient", [
      `process.env["${env}"]`,
    ]);
  }
}
