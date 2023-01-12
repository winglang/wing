import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { S3BucketPolicy } from "@cdktf/provider-aws/lib/s3-bucket-policy";
import { S3BucketPublicAccessBlock } from "@cdktf/provider-aws/lib/s3-bucket-public-access-block";
import { S3BucketServerSideEncryptionConfigurationA } from "@cdktf/provider-aws/lib/s3-bucket-server-side-encryption-configuration";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../utils/resource-names";
import { Function } from "./function";

/**
 * Bucket names must be between 3 and 63 characters.
 *
 * You can use lowercase alphanumeric characters, dot (.), dash (-)
 * and must not contain two adjacent dots.
 */
const NAME_OPTS: NameOptions = {
  maxLen: 63,
  case: CaseConventions.LOWERCASE,
  regexMatch: /([^a-z0-9\.\-]+)|(\.{2,})/g,
  charReplacer: "-",
};

/**
 * AWS implementation of `cloud.Bucket`.
 *
 * @inflight `@winglang/wingsdk.cloud.IBucketClient`
 */
export class Bucket extends cloud.BucketBase {
  private readonly bucket: S3Bucket;
  private readonly public: boolean;

  constructor(scope: Construct, id: string, props: cloud.BucketProps) {
    super(scope, id, props);

    this.public = props.public ?? false;

    // names must begin and end with alphanumeric character, can not begin
    // with 'xn--' or ending with '-s3alias'
    if (this.node.id.match(/(^xn--|^\W{1,})|(-s3alias|\W{1,}$)/g)?.length) {
      throw new Error(
        "Bucket names must begin and end with alphanumeric character and can not begin with 'xn--' or ending with '-s3alias'."
      );
    }

    this.bucket = new S3Bucket(this, "Default", {
      bucket: ResourceNames.generateName(this, NAME_OPTS),
    });

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

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("buckets can only be bound by tfaws.Function for now");
    }

    if (ops.includes(cloud.BucketInflightMethods.PUT)) {
      host.addPolicyStatements({
        effect: "Allow",
        action: ["s3:PutObject*", "s3:Abort*"],
        resource: [`${this.bucket.arn}`, `${this.bucket.arn}/*`],
      });
    }
    if (ops.includes(cloud.BucketInflightMethods.GET)) {
      host.addPolicyStatements({
        effect: "Allow",
        action: ["s3:GetObject*", "s3:GetBucket*", "s3:List*"],
        resource: [`${this.bucket.arn}`, `${this.bucket.arn}/*`],
      });
    }
    if (ops.includes(cloud.BucketInflightMethods.LIST)) {
      host.addPolicyStatements({
        effect: "Allow",
        action: ["s3:GetObject*", "s3:GetBucket*", "s3:List*"],
        resource: [`${this.bucket.arn}`, `${this.bucket.arn}/*`],
      });
    }
    if (ops.includes(cloud.BucketInflightMethods.DELETE)) {
      host.addPolicyStatements({
        effect: "Allow",
        action: [
          "s3:DeleteObject*",
          "s3:DeleteObjectVersion*",
          "s3:PutLifecycleConfiguration*",
        ],
        resource: [`${this.bucket.arn}`, `${this.bucket.arn}/*`],
      });
    }
    // The bucket name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(this.envName(), this.bucket.bucket);

    super._bind(host, ops);
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
Bucket._annotateInflight("get", {});
Bucket._annotateInflight("delete", {});
Bucket._annotateInflight("list", {});
