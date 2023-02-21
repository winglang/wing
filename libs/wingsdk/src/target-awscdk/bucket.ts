import { RemovalPolicy } from "aws-cdk-lib";
import {
  BlockPublicAccess,
  BucketEncryption,
  Bucket as S3Bucket,
} from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";

/**
 * AWS implementation of `cloud.Bucket`.
 *
 * @inflight `@winglang/sdk.cloud.IBucketClient`
 */
export class Bucket extends cloud.BucketBase {
  private readonly bucket: S3Bucket;
  private readonly public: boolean;

  constructor(scope: Construct, id: string, props: cloud.BucketProps) {
    super(scope, id, props);

    this.public = props.public ?? false;

    this.bucket = new S3Bucket(this, "Default", {
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: this.public ? undefined : BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: this.public ? true : false,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
  }

  public addObject(key: string, body: string): void {
    new BucketDeployment(this, `S3Object-${key}`, {
      destinationBucket: this.bucket,
      sources: [Source.data(key, body)],
    });
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__filename, "BucketClient", [
      `process.env["${this.envName()}"]`,
    ]);
  }

  private envName(): string {
    return `BUCKET_NAME_${this.node.addr.slice(-8)}`;
  }
}

Bucket._annotateInflight("put", {});
