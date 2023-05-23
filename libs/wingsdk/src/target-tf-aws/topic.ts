import { join } from "path";
import { Construct } from "constructs";
import { Function } from "./function";
import { SnsTopic } from "../.gen/providers/aws/sns-topic";
import { SnsTopicPolicy } from "../.gen/providers/aws/sns-topic-policy";
import { SnsTopicSubscription } from "../.gen/providers/aws/sns-topic-subscription";
import * as cloud from "../cloud";
import * as core from "../core";
import { convertBetweenHandlers } from "../shared/convert";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { calculateTopicPermissions } from "../shared-aws/permissions";
import { IInflightHost, Resource } from "../std";

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
export class Topic extends cloud.Topic {
  private readonly topic: SnsTopic;
  /**
   * topic's publishing permissions. can be use as a dependency of another resource.
   * (the one that got the permissions to publish)
   * */
  public permissions!: SnsTopicPolicy;

  constructor(scope: Construct, id: string, props: cloud.TopicProps = {}) {
    super(scope, id, props);

    this.topic = new SnsTopic(this, "Default", {
      name: ResourceNames.generateName(this, NAME_OPTS),
    });
  }

  /**
   * topic's arn
   */
  public get arn(): string {
    return this.topic.arn;
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
        __dirname.replace("target-tf-aws", "shared-aws"),
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

    fn.addPermissionToInvoke(this, "sns.amazonaws.com", this.topic.arn, {});

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: "on_message",
    });

    return fn;
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

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("topics can only be bound by tfaws.Function for now");
    }

    host.addPolicyStatements(...calculateTopicPermissions(this.topic.arn, ops));

    host.addEnvironment(this.envName(), this.topic.arn);

    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "TopicClient",
      [`process.env["${this.envName()}"]`]
    );
  }

  private envName(): string {
    return `TOPIC_ARN_${this.node.addr.slice(-8)}`;
  }
}
