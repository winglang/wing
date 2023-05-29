import { join } from "path";
import { RemovalPolicy } from "aws-cdk-lib";
import {
  BlockPublicAccess,
  BucketEncryption,
  EventType,
  Bucket as S3Bucket,
} from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { LambdaDestination } from "aws-cdk-lib/aws-s3-notifications";
import { Construct } from "constructs";
import { Function } from "./function";
import * as cloud from "../cloud";
import * as core from "../core";
import { calculateBucketPermissions } from "../shared-aws/permissions";
import { IInflightHost, Resource } from "../std";
import { convertBetweenHandlers } from "../shared/convert";

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
    return join(__dirname, "bucket.onevent.inflight.js");
  }

  private onEventFunction(
    event: string,
    inflight: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnCreateProps
  ): Function {
    const hash = inflight.node.addr.slice(-8);
    const functionHandler = convertBetweenHandlers(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-${event}-Handler-${hash}`,
      inflight,
      this.eventHandlerLocation(),
      `BucketEventHandlerClient`
    );

    const fn = Function._newFunction(
      this.node.scope!, // ok since we're not a tree root
      `${this.node.id}-${event}-${hash}`,
      functionHandler,
      opts
    );
    Resource.addConnection({
      from: this,
      to: fn,
      relationship: cloud.BucketEventType.CREATE,
    });

    if (!(fn instanceof Function)) {
      throw new Error(
        "Bucket only supports creating awscdk.Function right now"
      );
    }

    return fn;
  }

  public onCreate(
    inflight: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnCreateProps
  ): void {
    const fn = this.onEventFunction("OnCreate", inflight, opts);

    this.bucket.addEventNotification(
      EVENTS[cloud.BucketEventType.CREATE],
      new LambdaDestination(fn._function)
    );
  }

  public onDelete(
    inflight: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnDeleteProps
  ): void {
    const fn = this.onEventFunction("OnDelete", inflight, opts);

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: cloud.BucketEventType.DELETE,
    });

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: cloud.BucketEventType.DELETE,
    });

    this.bucket.addEventNotification(
      EVENTS[cloud.BucketEventType.DELETE],
      new LambdaDestination(fn._function)
    );
  }

  public onUpdate(
    inflight: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnUpdateProps
  ): void {
    const fn = this.onEventFunction("OnUpdate", inflight, opts);

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: cloud.BucketEventType.UPDATE,
    });

    this.bucket.addEventNotification(
      EVENTS[cloud.BucketEventType.UPDATE],
      new LambdaDestination(fn._function)
    );
  }

  public onEvent(
    inflight: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnEventProps
  ) {
    const fn = this.onEventFunction("OnEvent", inflight, opts);

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: cloud.BucketEventType.CREATE,
    });
    this.bucket.addEventNotification(
      EVENTS[cloud.BucketEventType.CREATE],
      new LambdaDestination(fn._function)
    );

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: cloud.BucketEventType.DELETE,
    });
    this.bucket.addEventNotification(
      EVENTS[cloud.BucketEventType.DELETE],
      new LambdaDestination(fn._function)
    );

    Resource.addConnection({
      from: this,
      to: fn,
      relationship: cloud.BucketEventType.UPDATE,
    });
    this.bucket.addEventNotification(
      EVENTS[cloud.BucketEventType.UPDATE],
      new LambdaDestination(fn._function)
    );
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
