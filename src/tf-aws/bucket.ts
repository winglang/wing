import { s3 } from "@cdktf/provider-aws";
import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { TERRAFORM_AWS_CLIENTS_PATH } from "../constants";
import { CaptureMetadata, Code, NodeJsCode } from "../core";
import { Function } from "./function";

export class Bucket extends cloud.BucketBase implements cloud.IBucket {
  private readonly bucket: s3.S3Bucket;
  private readonly public: boolean;

  constructor(scope: Construct, id: string, props: cloud.BucketProps) {
    super(scope, id, props);

    this.public = props.public ?? false;

    this.bucket = new s3.S3Bucket(this, "Default");

    // best practice: (at-rest) data encryption with Amazon S3-managed keys
    new s3.S3BucketServerSideEncryptionConfigurationA(this, "Encryption", {
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
      new s3.S3BucketPolicy(this, "PublicPolicy", {
        bucket: this.bucket.bucket,
        policy: JSON.stringify(policy),
      });
    } else {
      new s3.S3BucketPublicAccessBlock(this, "PublicAccessBlock", {
        bucket: this.bucket.bucket,
        blockPublicAcls: true,
        blockPublicPolicy: true,
        ignorePublicAcls: true,
        restrictPublicBuckets: true,
      });
    }
  }

  public capture(captureScope: IConstruct, metadata: CaptureMetadata): Code {
    if (!(captureScope instanceof Function)) {
      throw new Error("buckets can only be captured by tfaws.Function for now");
    }

    const name = `BUCKET_NAME__${this.node.id}`;

    const methods = new Set(metadata.methods ?? []);
    if (methods.has("put")) {
      captureScope.addPolicyStatements({
        effect: "Allow",
        action: ["s3:PutObject*", "s3:Abort*"],
        resource: [`${this.bucket.arn}`, `${this.bucket.arn}/*`],
      });
    }
    if (methods.has("get")) {
      captureScope.addPolicyStatements({
        effect: "Allow",
        action: ["s3:GetObject*", "s3:GetBucket*", "s3:List*"],
        resource: [`${this.bucket.arn}`, `${this.bucket.arn}/*`],
      });
    }

    // The bucket name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    captureScope.addEnvironment(name, this.bucket.bucket);

    return NodeJsCode.fromInline(
      `new (require("${TERRAFORM_AWS_CLIENTS_PATH}")).BucketClient(process.env["${name}"])`
    );
  }
}
