import { readdirSync } from "fs";
import path from "path";
import { CloudfrontDistribution } from "@cdktf/provider-aws/lib/cloudfront-distribution";
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";

import { S3BucketWebsiteConfiguration } from "@cdktf/provider-aws/lib/s3-bucket-website-configuration";
import { S3Object } from "@cdktf/provider-aws/lib/s3-object";
import { Construct } from "constructs";
import mime from "mime-types";
import { createEncryptedBucket } from "./bucket";
import { core } from "..";
import * as cloud from "../cloud";
import { Json } from "../std";

const INDEX_FILE = "index.html";

/**
 * AWS implementation of `cloud.Website`.
 *
 * @inflight `@winglang/sdk.cloud.IWebsiteClient`
 */
export class Website extends cloud.Website {
  private readonly bucket: S3Bucket;

  constructor(scope: Construct, id: string, props: cloud.WebsiteProps) {
    super(scope, id, props);

    this.bucket = createEncryptedBucket(this, true, "WebsiteBucket");

    new S3BucketWebsiteConfiguration(this, "bucket-website-configuration", {
      bucket: this.bucket.bucket,
      indexDocument: { suffix: INDEX_FILE },
    });

    this.uploadFiles(this.path);

    // create a cloudFront distribution
    const distribution = new CloudfrontDistribution(this, "Distribution", {
      enabled: true,
      ...(this._domain && { aliases: [this._domain] }),
      origin: [
        {
          domainName: this.bucket.bucketRegionalDomainName,
          originId: "s3Origin",
        },
      ],
      defaultRootObject: INDEX_FILE,
      defaultCacheBehavior: {
        allowedMethods: ["GET", "HEAD"],
        cachedMethods: ["GET", "HEAD"],
        targetOriginId: "s3Origin",
        forwardedValues: {
          queryString: false,
          cookies: { forward: "none" },
        },
        compress: true,
        viewerProtocolPolicy: "redirect-to-https",
        minTtl: 0,
        defaultTtl: 3600,
        maxTtl: 86400,
      },
      restrictions: {
        geoRestriction: {
          locations: [],
          restrictionType: "none",
        },
      },
      priceClass: "PriceClass_100",
      viewerCertificate: { cloudfrontDefaultCertificate: true },
    });

    // //TODO: this is currently a cdk token. we need to see if we can resolve those tokens somehow
    this._url = distribution.domainName;
  }

  public addJson(filePath: string, obj: Json): string {
    if (!filePath.endsWith(".json")) {
      throw new Error(
        `key must have a .json suffix: ${filePath.split(".").pop()}`
      );
    }

    new S3Object(this, `aws_s3_bucket_object_${filePath}`, {
      dependsOn: [this.bucket],
      content: JSON.stringify(obj),
      bucket: this.bucket.bucket,
      contentType: "application/json",
      key: filePath,
    });

    return `${this.url}/${filePath}`;
  }

  private uploadFile(filePath: string) {
    new S3Object(this, `aws_s3_bucket_object_${path.basename(filePath)}`, {
      dependsOn: [this.bucket],
      key: filePath.replace(this.path, ""),
      bucket: this.bucket.bucket,
      source: path.resolve(filePath),
      contentType: mime.contentType(path.extname(filePath)) || undefined,
    });
  }

  private uploadFiles(dir: string): void {
    const files = readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      const filename = path.join(dir, file.name);
      if (file.isDirectory()) {
        this.uploadFiles(filename);
      } else {
        this.uploadFile(filename);
      }
    }
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "WebsiteClient",
      []
    );
  }
}
