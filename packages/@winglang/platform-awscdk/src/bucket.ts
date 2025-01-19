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
import { App } from "./app";
import { cloud, std } from "@winglang/sdk";
import { Bucket as AwsBucket } from "@winglang/sdk/lib/shared-aws/bucket";
import {
  IAwsCdkFunction,
  isAwsCdkFunction,
} from "./function";
import { lift } from "@winglang/sdk/lib/core";

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
export class Bucket extends AwsBucket {
  private readonly bucket: S3Bucket;
  private readonly public: boolean;
  private readonly forceDestroy: boolean;
  private bucketDeployment?: BucketDeployment;

  constructor(scope: Construct, id: string, props: cloud.BucketProps = {}) {
    super(scope, id, props);

    this.public = props.public ?? false;
    this.forceDestroy = props.forceDestroy ?? false;

    this.bucket = createEncryptedBucket(this, this.public, this.forceDestroy);

    if (props.cors ?? true) {
      this.addCorsRule(
        props.corsOptions ?? cloud.DEFAULT_BUCKET_CORS_CONFIGURATION
      );
    }
  }

  public addCorsRule(value: cloud.BucketCorsOptions): void {
    this.bucket.addCorsRule({
      allowedHeaders: value.allowedHeaders,
      allowedMethods: value.allowedMethods as any,
      allowedOrigins: value.allowedOrigins,
      maxAge: value.maxAge?.seconds,
      exposedHeaders: value.exposeHeaders,
    });
  }

  public addObject(key: string, body: string): void {
    if (!this.bucketDeployment) {
      this.bucketDeployment = new BucketDeployment(this, `S3Object-${key}`, {
        destinationBucket: this.bucket,
        sources: [Source.data(key, body)],
      });
    } else {
      this.bucketDeployment.addSource(Source.data(key, body));
    }
  }

  private onEventFunction(
    event: cloud.BucketEventType,
    inflight: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnCreateOptions
  ): IAwsCdkFunction {
    const functionHandler = lift({
      handler: inflight,
      eventType: event,
    }).inflight(async (ctx, event) => {
      const record = event.Records[0];
      if (!record) {
        throw new Error("No record found in the S3 event");
      }
      try {
        await ctx.handler(record.s3.object.key, ctx.eventType);
      } catch (error) {
        //TODO: change to some sort of warning- console.warn doesn't seems to work
        console.log("Error parsing the notification event message: ", error);
        console.log("Event: ", event);
      }
    });

    const fn = new cloud.Function(
      this.node.scope!, // ok since we're not a tree root
      App.of(this).makeId(this, `${this.node.id}-${event}`),
      functionHandler,
      opts
    );

    if (!isAwsCdkFunction(fn)) {
      throw new Error("Expected function to implement IAwsCdkFunction");
    }

    return fn;
  }

  public onCreate(
    inflight: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnCreateOptions
  ): void {
    const fn = this.onEventFunction(
      cloud.BucketEventType.CREATE,
      inflight,
      opts
    );

    std.Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "onCreate()",
    });

    this.bucket.addEventNotification(
      EVENTS[cloud.BucketEventType.CREATE],
      new LambdaDestination(fn.awscdkFunction)
    );
  }

  public onDelete(
    inflight: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnDeleteOptions
  ): void {
    const fn = this.onEventFunction(
      cloud.BucketEventType.DELETE,
      inflight,
      opts
    );

    std.Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "onDelete()",
    });

    this.bucket.addEventNotification(
      EVENTS[cloud.BucketEventType.DELETE],
      new LambdaDestination(fn.awscdkFunction)
    );
  }

  public onUpdate(
    inflight: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnUpdateOptions
  ): void {
    const fn = this.onEventFunction(
      cloud.BucketEventType.UPDATE,
      inflight,
      opts
    );

    std.Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "onUpdate()",
    });

    this.bucket.addEventNotification(
      EVENTS[cloud.BucketEventType.UPDATE],
      new LambdaDestination(fn.awscdkFunction)
    );
  }

  public onEvent(
    inflight: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnEventOptions
  ) {
    this.onCreate(inflight, opts);
    this.onDelete(inflight, opts);
    this.onUpdate(inflight, opts);
  }

  public get bucketArn(): string {
    return this.bucket.bucketArn;
  }

  public get bucketName(): string {
    return this.bucket.bucketName;
  }

  public get bucketDomainName(): string {
    return this.bucket.bucketDomainName;
  }
}

export function createEncryptedBucket(
  scope: Construct,
  isPublic: boolean,
  forceDestroy: boolean,
  name: string = "Default"
): S3Bucket {
  const isTestEnvironment = App.of(scope).isTestEnvironment;

  return new S3Bucket(scope, name, {
    encryption: BucketEncryption.S3_MANAGED,
    blockPublicAccess: isPublic
      ? {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }
      : BlockPublicAccess.BLOCK_ALL,
    publicReadAccess: isPublic ? true : false,
    removalPolicy: RemovalPolicy.DESTROY,
    autoDeleteObjects: isTestEnvironment || forceDestroy ? true : false,
  });
}
