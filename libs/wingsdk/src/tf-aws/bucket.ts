import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { S3BucketPolicy } from "@cdktf/provider-aws/lib/s3-bucket-policy";
import { S3BucketPublicAccessBlock } from "@cdktf/provider-aws/lib/s3-bucket-public-access-block";
import { S3BucketServerSideEncryptionConfigurationA } from "@cdktf/provider-aws/lib/s3-bucket-server-side-encryption-configuration";
import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { BucketInflightMethods } from "../cloud";
import { CaptureMetadata, Code, InflightClient } from "../core";
import { Function } from "./function";

/**
 * AWS implementation of `cloud.Bucket`.
 *
 * @inflight `@monadahq/wingsdk.tfaws.IBucketClient`
 */
export class Bucket extends cloud.BucketBase {
  private readonly bucket: S3Bucket;
  private readonly public: boolean;

  constructor(scope: Construct, id: string, props: cloud.BucketProps) {
    super(scope, id, props);

    this.public = props.public ?? false;

    this.bucket = new S3Bucket(this, "Default");

    // best practice: (at-rest) data encryption with Amazon S3-managed keys
    new S3BucketServerSideEncryptionConfigurationA(this, "Encryption", {
      bucket: this.bucket.bucket,
      rule: [
        {
          applyServerSideEncryptionByDefault: {
            sseAlgorithm: "AES256",
          },
        },
      ],
    });

    if (this.public) {
      const policy = {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: "*",
            Action: ["s3:GetObject"],
            Resource: [`${this.bucket.arn}/*`],
          },
        ],
      };
      new S3BucketPolicy(this, "PublicPolicy", {
        bucket: this.bucket.bucket,
        policy: JSON.stringify(policy),
      });
    } else {
      new S3BucketPublicAccessBlock(this, "PublicAccessBlock", {
        bucket: this.bucket.bucket,
        blockPublicAcls: true,
        blockPublicPolicy: true,
        ignorePublicAcls: true,
        restrictPublicBuckets: true,
      });
    }
  }

  /**
   * @internal
   */
  public _capture(captureScope: IConstruct, metadata: CaptureMetadata): Code {
    if (!(captureScope instanceof Function)) {
      throw new Error("buckets can only be captured by tfaws.Function for now");
    }

    const env = `BUCKET_NAME__${this.node.id}`;

    const methods = new Set(metadata.methods ?? []);
    if (methods.has(BucketInflightMethods.PUT)) {
      captureScope.addPolicyStatements({
        effect: "Allow",
        action: ["s3:PutObject*", "s3:Abort*"],
        resource: [`${this.bucket.arn}`, `${this.bucket.arn}/*`],
      });
    }
    if (methods.has(BucketInflightMethods.GET)) {
      captureScope.addPolicyStatements({
        effect: "Allow",
        action: ["s3:GetObject*", "s3:GetBucket*", "s3:List*"],
        resource: [`${this.bucket.arn}`, `${this.bucket.arn}/*`],
      });
    }
    if (methods.has(BucketInflightMethods.LIST)) {
      captureScope.addPolicyStatements({
        effect: "Allow",
        action: ["s3:GetObject*", "s3:GetBucket*", "s3:List*"],
        resource: [`${this.bucket.arn}`, `${this.bucket.arn}/*`],
      });
    }
    // The bucket name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    captureScope.addEnvironment(env, this.bucket.bucket);

    return InflightClient.for(__filename, "BucketClient", [
      `process.env["${env}"]`,
    ]);
  }
}

/**
 * AWS implementation of inflight client for `cloud.Bucket`.
 */
export interface IBucketClient extends cloud.IBucketClient {}
