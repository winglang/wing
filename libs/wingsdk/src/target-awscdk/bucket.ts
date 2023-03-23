import { RemovalPolicy } from "aws-cdk-lib";
import {
  BlockPublicAccess,
  BucketEncryption,
  Bucket as S3Bucket,
} from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { Function } from "./function";
import * as cloud from "../cloud";
import * as core from "../core";
import { calculateBucketPermissions } from "../shared-aws/share";

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

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("buckets can only be bound by tfaws.Function for now");
    }

    host.addPolicyStatements(...calculateBucketPermissions(this.bucket.bucketArn, ops));
    // if (ops.includes(cloud.BucketInflightMethods.PUT)) {
    //   host.addPolicyStatements({
    //     effect: Effect.ALLOW,
    //     actions: ["s3:PutObject*", "s3:Abort*"],
    //     resources: [`${this.bucket.bucketArn}`, `${this.bucket.bucketArn}/*`],
    //   });
    // }
    // if (ops.includes(cloud.BucketInflightMethods.GET)) {
    //   host.addPolicyStatements({
    //     effect: Effect.ALLOW,
    //     actions: ["s3:GetObject*", "s3:GetBucket*", "s3:List*"],
    //     resources: [`${this.bucket.bucketArn}`, `${this.bucket.bucketArn}/*`],
    //   });
    // }
    // if (
    //   ops.includes(cloud.BucketInflightMethods.LIST) ||
    //   ops.includes(cloud.BucketInflightMethods.PUBLIC_URL)
    // ) {
    //   host.addPolicyStatements({
    //     effect: Effect.ALLOW,
    //     actions: ["s3:GetObject*", "s3:GetBucket*", "s3:List*"],
    //     resources: [`${this.bucket.bucketArn}`, `${this.bucket.bucketArn}/*`],
    //   });
    // }
    // if (ops.includes(cloud.BucketInflightMethods.DELETE)) {
    //   host.addPolicyStatements({
    //     effect: Effect.ALLOW,
    //     actions: [
    //       "s3:DeleteObject*",
    //       "s3:DeleteObjectVersion*",
    //       "s3:PutLifecycleConfiguration*",
    //     ],
    //     resources: [`${this.bucket.bucketArn}`, `${this.bucket.bucketArn}/*`],
    //   });
    // }
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
      [`process.env["${this.envName()}"]`]
    );
  }

  private envName(): string {
    return `BUCKET_NAME_${this.node.addr.slice(-8)}`;
  }
}

Bucket._annotateInflight("put", {});
Bucket._annotateInflight("get", {});
Bucket._annotateInflight("delete", {});
Bucket._annotateInflight("list", {});
Bucket._annotateInflight("put_json", {});
Bucket._annotateInflight("get_json", {});
Bucket._annotateInflight("public_url", {});
