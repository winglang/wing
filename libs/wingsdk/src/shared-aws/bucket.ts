import { Construct } from "constructs";
import { Function } from "./function";
import { calculateBucketPermissions } from "./permissions";
import { cloud, ui } from "..";
import { IBucketClient } from "../cloud";
import { InflightClient } from "../core";
import { INFLIGHT_SYMBOL } from "../core/types";
import { Testing } from "../simulator";
import { IInflightHost, Node, Resource } from "../std";

/**
 * A shared interface for AWS buckets.
 */
export interface IAwsBucket {
  /**
   * AWS Bucket arn
   */
  readonly bucketArn: string;

  /**
   * AWS Bucket name
   */
  readonly bucketName: string;
}

/**
 * A helper class for working with AWS buckets.
 */
export class Bucket {
  /**
   * If the bucket is an AWS Bucket, return a helper interface for
   * working with it.
   * @param bucket The cloud.Bucket.
   */
  public static from(bucket: cloud.Bucket): IAwsBucket | undefined {
    if (this.isAwsBucket(bucket)) {
      return bucket;
    }
    return undefined;
  }

  private static isAwsBucket(obj: any): obj is IAwsBucket {
    return (
      typeof obj.bucketArn === "string" && typeof obj.bucketName === "string"
    );
  }
}

/**
 * A reference to an external S3 bucket.
 * @inflight `@winglang/sdk.cloud.IBucketClient`
 */
export class BucketRef extends Resource {
  /** @internal */
  public [INFLIGHT_SYMBOL]?: IBucketClient;

  /**
   * The Name of this bucket.
   */
  public readonly bucketName: string;

  /**
   * The ARN of this bucket.
   */
  public readonly bucketArn: string;

  constructor(scope: Construct, id: string, bucketName: string) {
    super(scope, id);

    this.bucketName = bucketName;
    this.bucketArn = `arn:aws:s3:::${bucketName}`;

    this.addUserInterface();
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    // if this is an AWS function, add the necessary IAM permissions
    const fn = Function.from(host);

    if (fn) {
      fn.addPolicyStatements(
        ...calculateBucketPermissions(this.bucketArn, ops)
      );
    }

    // The bucket name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(this.envName(), this.bucketName);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return InflightClient.for(__dirname, __filename, "BucketClient", [
      `process.env["${this.envName()}"]`,
    ]);
  }

  private envName(): string {
    return `BUCKET_NAME_${this.node.addr.slice(-8)}`;
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

  private addUserInterface() {
    Node.of(this).color = "amber";

    const awsConsoleHandler = Testing.makeHandler(
      `async handle() {
        try {
          const region = await this.bucket.bucketRegion();
          return "https://" + region + ".console.aws.amazon.com/s3/buckets/" + this.bucket.bucketName + "?region=" + region;
        } catch (e) {
          return e.message;
        }
      }`,
      {
        bucket: {
          obj: this,
          ops: [],
        },
      }
    );

    new ui.Field(this, "AwsConsoleField", "AWS Console", awsConsoleHandler, {
      link: true,
    });

    new ui.ValueField(this, "BucketNameField", "Bucket Name", this.bucketName);
    new ui.ValueField(this, "BucketArnField", "Bucket ARN", this.bucketArn);
  }
}
