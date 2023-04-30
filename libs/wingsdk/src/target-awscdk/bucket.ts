import { join } from "path";
import { RemovalPolicy } from "aws-cdk-lib";
import {
  BlockPublicAccess,
  BucketEncryption,
  EventType,
  Bucket as S3Bucket,
} from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { SnsDestination } from "aws-cdk-lib/aws-s3-notifications";
import { Construct } from "constructs";
import { Function } from "./function";
import { Topic as AWSTopic } from "./topic";
import * as cloud from "../cloud";
import * as core from "../core";
import { calculateBucketPermissions } from "../shared-aws/permissions";
import { IInflightHost, Resource } from "../std";

const EVENTS = {
  [cloud.BucketEventType.DELETE]: EventType.OBJECT_REMOVED,
  [cloud.BucketEventType.CREATE]: EventType.OBJECT_CREATED_PUT,
  [cloud.BucketEventType.UPDATE]: EventType.OBJECT_CREATED_POST,
};

/**
 * AWS implementation of `cloud.Bucket`.
 *
 * @inflight `@winglang/sdk.cloud.IBucketClient`
 */
export class Bucket extends cloud.Bucket {
  private readonly bucket: S3Bucket;
  private readonly public: boolean;

  constructor(scope: Construct, id: string, props: cloud.BucketProps = {}) {
    super(scope, id, props);

    this.public = props.public ?? false;

    this.bucket = new S3Bucket(this, "Default", {
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: this.public ? undefined : BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: this.public ? true : false,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }

  public addObject(key: string, body: string): void {
    new BucketDeployment(this, `S3Object-${key}`, {
      destinationBucket: this.bucket,
      sources: [Source.data(key, body)],
    });
  }

  protected eventHandlerLocation(): string {
    return join(
      __dirname.replace("target-awscdk", "shared-aws"),
      "bucket.onevent.inflight.js"
    );
  }

  protected createTopic(actionType: cloud.BucketEventType): cloud.Topic {
    const handler = cloud.Topic._newTopic(
      this,
      `${this.node.id}-on_${actionType.toLowerCase()}`
    );

    Resource.addConnection({
      from: this,
      to: handler,
      relationship: actionType,
    });

    // TODO: remove this constraint by adding generic permission APIs to cloud.Function
    if (!(handler instanceof AWSTopic)) {
      throw new Error("Topic only supports creating tfaws.Function right now");
    }

    this.bucket.addEventNotification(
      EVENTS[actionType],
      new SnsDestination(handler._topic)
    );

    return handler;
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("buckets can only be bound by tfaws.Function for now");
    }

    host.addPolicyStatements(
      ...calculateBucketPermissions(this.bucket.bucketArn, ops)
    );

    // The bucket name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(this.envName(), this.bucket.bucketName);

    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(
      __dirname.replace("target-awscdk", "shared-aws"),
      __filename,
      "BucketClient",
      [
        `process.env["${this.envName()}"]`,
        `process.env["${this.isPublicEnvName()}"]`,
      ]
    );
  }

  private isPublicEnvName(): string {
    return `${this.envName()}_IS_PUBLIC`;
  }

  private envName(): string {
    return `BUCKET_NAME_${this.node.addr.slice(-8)}`;
  }
}
