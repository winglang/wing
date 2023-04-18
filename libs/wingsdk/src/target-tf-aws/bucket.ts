import { join } from "path";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { S3BucketNotification } from "@cdktf/provider-aws/lib/s3-bucket-notification";

import { S3BucketPolicy } from "@cdktf/provider-aws/lib/s3-bucket-policy";
import { S3BucketPublicAccessBlock } from "@cdktf/provider-aws/lib/s3-bucket-public-access-block";
import { S3BucketServerSideEncryptionConfigurationA } from "@cdktf/provider-aws/lib/s3-bucket-server-side-encryption-configuration";
import { S3Object } from "@cdktf/provider-aws/lib/s3-object";
import { Construct } from "constructs";
import { App } from "./app";
import { Function as AWSFunction } from "./function";
import { Topic as AWSTopic } from "./topic";
import * as cloud from "../cloud";
import { BucketEventType, Topic } from "../cloud";
import * as core from "../core";
import { calculateBucketPermissions } from "../shared-aws/permissions";
import { IInflightHost } from "../std";
import {
  CaseConventions,
  NameOptions,
  ResourceNames,
} from "../utils/resource-names";

const EVENTS = {
  [BucketEventType.DELETE]: ["s3:ObjectRemoved:*"],
  [BucketEventType.CREATE]: ["s3:ObjectCreated:Post"],
  [BucketEventType.UPDATE]: ["s3:ObjectCreated:Put"],
};

/**
 * Bucket prefix provided to Terraform must be between 3 and 37 characters.
 *
 * Bucket names are allowed to contain lowercase alphanumeric characters and
 * dashes (-). We generate names without dots (.) to avoid some partial
 * restrictions on bucket names with dots.
 */
export const BUCKET_PREFIX_OPTS: NameOptions = {
  maxLen: 37,
  case: CaseConventions.LOWERCASE,
  disallowedRegex: /([^a-z0-9\-]+)/g,
  // add a dash to the end of the prefix to distinguish between the
  // Wing-generated portion of the name and the suffix generated by Terraform
  suffix: "-",
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

    const bucketPrefix = ResourceNames.generateName(this, BUCKET_PREFIX_OPTS);

    // names cannot begin with 'xn--'
    if (bucketPrefix.startsWith("xn--")) {
      throw new Error("AWS S3 bucket names cannot begin with 'xn--'.");
    }

    // names must begin with a letter or number
    if (!/^[a-z0-9]/.test(bucketPrefix)) {
      throw new Error(
        "AWS S3 bucket names must begin with a letter or number."
      );
    }

    // names cannot end with '-s3alias' and must end with a letter or number,
    // but we do not need to handle these cases since we are generating the
    // prefix only

    const isTestEnvironment = App.of(this).isTestEnvironment;

    this.bucket = new S3Bucket(this, "Default", {
      bucketPrefix,
      forceDestroy: isTestEnvironment ? true : false,
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

  public addObject(key: string, body: string): void {
    new S3Object(this, `S3Object-${key}`, {
      bucket: this.bucket.bucket,
      key,
      content: body,
    });
  }

  protected eventHandlerLocation(): string {
    return join(__dirname, "bucket.onevent.inflight.js");
  }

  protected createTopic(actionType: BucketEventType): Topic {
    const handler = super.createTopic(actionType);

    // TODO: remove this constraint by adding generic permission APIs to cloud.Function
    if (!(handler instanceof AWSTopic)) {
      throw new Error("Topic only supports creating tfaws.Function right now");
    }

    handler.addPermissionToPublish(this, "s3.amazonaws.com", this.bucket.arn);

    new S3BucketNotification(
      this,
      `S3Object_on_${actionType.toLowerCase()}_notifier`,
      {
        bucket: this.bucket.id,
        topic: [
          {
            events: EVENTS[actionType],
            topicArn: handler.arn,
          },
        ],
        dependsOn: [handler.permissions],
      }
    );

    return handler;
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof AWSFunction)) {
      throw new Error("buckets can only be bound by tfaws.Function for now");
    }

    host.addPolicyStatements(
      ...calculateBucketPermissions(this.bucket.arn, ops)
    );

    // The bucket name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(this.envName(), this.bucket.bucket);
    host.addEnvironment(this.isPublicEnvName(), `${this.public}`);

    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
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

Bucket._annotateInflight(cloud.BucketInflightMethods.PUT, {});
Bucket._annotateInflight(cloud.BucketInflightMethods.GET, {});
Bucket._annotateInflight(cloud.BucketInflightMethods.DELETE, {});
Bucket._annotateInflight(cloud.BucketInflightMethods.LIST, {});
Bucket._annotateInflight(cloud.BucketInflightMethods.PUT_JSON, {});
Bucket._annotateInflight(cloud.BucketInflightMethods.GET_JSON, {});
Bucket._annotateInflight(cloud.BucketInflightMethods.PUBLIC_URL, {});
