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
import { calculateBucketPermissions } from "@winglang/sdk/lib/shared-aws/permissions";
import { IAwsBucket } from "@winglang/sdk/lib/shared-aws/bucket";
import {
  IAwsCdkFunction,
  addPolicyStatements,
  isAwsCdkFunction,
} from "./function";
import { LiftMap, lift, InflightClient } from "@winglang/sdk/lib/core";

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
export class Bucket extends cloud.Bucket implements IAwsBucket {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(
      __filename.replace("bucket", "bucket.inflight"),
      "BucketClient"
    );
  }

  private readonly bucket: S3Bucket;
  private readonly public: boolean;
  private bucketDeployment?: BucketDeployment;

  constructor(scope: Construct, id: string, props: cloud.BucketProps = {}) {
    super(scope, id, props);

    this.public = props.public ?? false;

    this.bucket = createEncryptedBucket(this, this.public);

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

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.BucketInflightMethods.DELETE]: [],
      [cloud.BucketInflightMethods.GET]: [],
      [cloud.BucketInflightMethods.GET_JSON]: [],
      [cloud.BucketInflightMethods.LIST]: [],
      [cloud.BucketInflightMethods.PUT]: [],
      [cloud.BucketInflightMethods.PUT_JSON]: [],
      [cloud.BucketInflightMethods.PUBLIC_URL]: [],
      [cloud.BucketInflightMethods.EXISTS]: [],
      [cloud.BucketInflightMethods.TRY_GET]: [],
      [cloud.BucketInflightMethods.TRY_GET_JSON]: [],
      [cloud.BucketInflightMethods.TRY_DELETE]: [],
      [cloud.BucketInflightMethods.SIGNED_URL]: [],
      [cloud.BucketInflightMethods.METADATA]: [],
      [cloud.BucketInflightMethods.COPY]: [],
      [cloud.BucketInflightMethods.RENAME]: [],
    };
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

  public onLift(host: std.IInflightHost, ops: string[]): void {
    if (!isAwsCdkFunction(host)) {
      throw new Error("Expected 'host' to implement IAwsCdkFunction");
    }

    addPolicyStatements(
      host.awscdkFunction,
      calculateBucketPermissions(this.bucket.bucketArn, ops)
    );

    // The bucket name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(this.envName(), this.bucket.bucketName);

    super.onLift(host, ops);
  }

  /** @internal */
  public _liftedState(): Record<string, string> {
    return {
      $url: `process.env["${this.envName()}"]`,
    };
  }

  private envName(): string {
    return `BUCKET_NAME_${this.node.addr.slice(-8)}`;
  }

  public get bucketArn(): string {
    return this.bucket.bucketArn;
  }

  public get bucketName(): string {
    return this.bucket.bucketName;
  }
}

export function createEncryptedBucket(
  scope: Construct,
  isPublic: boolean,
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
    autoDeleteObjects: isTestEnvironment ? true : false,
  });
}
