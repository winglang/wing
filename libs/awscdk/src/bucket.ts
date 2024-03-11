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
import { App } from "./app";
import { cloud, core, std } from "@winglang/sdk";
import { convertBetweenHandlers } from "@winglang/sdk/lib/shared/convert";
import { calculateBucketPermissions } from "@winglang/sdk/lib/shared-aws/permissions";
import { IAwsBucket } from "@winglang/sdk/lib/shared-aws/bucket";
import { IAwsCdkFunction, isAwsCdkFunction } from "./function";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

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
  private readonly bucket: S3Bucket;
  private readonly public: boolean;
  private bucketDeployment?: BucketDeployment;

  constructor(scope: Construct, id: string, props: cloud.BucketProps = {}) {
    super(scope, id, props);

    this.public = props.public ?? false;

    this.bucket = createEncryptedBucket(this, this.public);
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

  protected eventHandlerLocation(): string {
    return join(__dirname, "bucket.onevent.inflight.js");
  }

  private onEventFunction(
    event: string,
    inflight: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnCreateOptions
  ): IAwsCdkFunction {
    const functionHandler = convertBetweenHandlers(
      inflight,
      this.eventHandlerLocation(),
      `BucketEventHandlerClient`
    );

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
  public _supportedOps(): string[] {
    return [
      cloud.BucketInflightMethods.DELETE,
      cloud.BucketInflightMethods.GET,
      cloud.BucketInflightMethods.GET_JSON,
      cloud.BucketInflightMethods.LIST,
      cloud.BucketInflightMethods.PUT,
      cloud.BucketInflightMethods.PUT_JSON,
      cloud.BucketInflightMethods.PUBLIC_URL,
      cloud.BucketInflightMethods.EXISTS,
      cloud.BucketInflightMethods.TRY_GET,
      cloud.BucketInflightMethods.TRY_GET_JSON,
      cloud.BucketInflightMethods.TRY_DELETE,
      cloud.BucketInflightMethods.SIGNED_URL,
      cloud.BucketInflightMethods.METADATA,
      cloud.BucketInflightMethods.COPY,
      cloud.BucketInflightMethods.RENAME,
    ];
  }

  public onCreate(
    inflight: cloud.IBucketEventHandler,
    opts?: cloud.BucketOnCreateOptions
  ): void {
    const fn = this.onEventFunction("OnCreate", inflight, opts);

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
    const fn = this.onEventFunction("OnDelete", inflight, opts);

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
    const fn = this.onEventFunction("OnUpdate", inflight, opts);

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
    const fn = this.onEventFunction("OnEvent", inflight, opts);

    std.Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "onCreate()",
    });
    this.bucket.addEventNotification(
      EVENTS[cloud.BucketEventType.CREATE],
      new LambdaDestination(fn.awscdkFunction)
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

  public onLift(host: std.IInflightHost, ops: string[]): void {
    if (!isAwsCdkFunction(host)) {
      throw new Error("Expected 'host' to implement IAwsCdkFunction");
    }

    host.awscdkFunction.addToRolePolicy(new PolicyStatement(
      ...calculateBucketPermissions(this.bucket.bucketArn, ops)
    ));

    // The bucket name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(this.envName(), this.bucket.bucketName);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(__dirname, __filename, "BucketClient", [
      `process.env["${this.envName()}"]`,
      `process.env["${this.isPublicEnvName()}"]`,
    ]);
  }

  private isPublicEnvName(): string {
    return `${this.envName()}_IS_PUBLIC`;
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
