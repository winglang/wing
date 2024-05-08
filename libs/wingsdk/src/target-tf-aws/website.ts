import { readdirSync } from "fs";
import { extname, join, resolve } from "path";

import { Fn } from "cdktf";
import { Construct } from "constructs";
import mime from "mime-types";
import { createEncryptedBucket } from "./bucket";
import { core } from "..";
import { CloudfrontDistribution } from "../.gen/providers/aws/cloudfront-distribution";
import { CloudfrontOriginAccessControl } from "../.gen/providers/aws/cloudfront-origin-access-control";
import { DataAwsIamPolicyDocument } from "../.gen/providers/aws/data-aws-iam-policy-document";
import { Route53Record } from "../.gen/providers/aws/route53-record";
import { S3Bucket } from "../.gen/providers/aws/s3-bucket";
import { S3BucketPolicy } from "../.gen/providers/aws/s3-bucket-policy";
import { S3BucketWebsiteConfiguration } from "../.gen/providers/aws/s3-bucket-website-configuration";
import { S3Object } from "../.gen/providers/aws/s3-object";
import * as cloud from "../cloud";
import { normalPath } from "../shared/misc";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import * as aws from "../shared-aws";
import { Node } from "../std";

const INDEX_FILE = "index.html";

/**
 * AWS implementation of `cloud.Website`.
 *
 * @inflight `@winglang/sdk.cloud.IWebsiteClient`
 */
export class Website extends cloud.Website implements aws.IAwsWebsite {
  public readonly bucket: S3Bucket;
  private readonly _url: string;
  private readonly endpoint: cloud.Endpoint;

  constructor(scope: Construct, id: string, props: aws.AwsWebsiteProps) {
    super(scope, id, props);

    this.bucket = createEncryptedBucket(this, false, "WebsiteBucket");

    new S3BucketWebsiteConfiguration(this, "BucketWebsiteConfiguration", {
      bucket: this.bucket.bucket,
      indexDocument: { suffix: INDEX_FILE },
      errorDocument: props.errorDocument
        ? { key: props.errorDocument }
        : undefined,
    });

    this.uploadFiles(this.path);

    // create a cloudfront oac
    const OAC_NAME_OPTIONS: NameOptions = {
      maxLen: 32,
      disallowedRegex: /[^a-zA-Z0-9-]/,
      suffix: "-cloudfront-oac",
    };

    const cloudfrontOac = new CloudfrontOriginAccessControl(
      this,
      "CloudfrontOac",
      {
        name: ResourceNames.generateName(this, OAC_NAME_OPTIONS),
        originAccessControlOriginType: "s3",
        signingBehavior: "always",
        signingProtocol: "sigv4",
      }
    );

    // create a cloudFront distribution
    const distribution = new CloudfrontDistribution(this, "Distribution", {
      enabled: true,
      ...(this._domain?.domainName && { aliases: [this._domain.domainName] }),
      origin: [
        {
          domainName: this.bucket.bucketRegionalDomainName,
          originId: "s3Origin",
          originAccessControlId: cloudfrontOac.id,
        },
      ],
      defaultRootObject: INDEX_FILE,
      customErrorResponse: props.errorDocument
        ? [
            {
              errorCode: 404,
              responseCode: 200,
              responsePagePath: `/${props.errorDocument}`,
            },
            {
              errorCode: 403,
              responseCode: 200,
              responsePagePath: `/${props.errorDocument}`,
            },
          ]
        : undefined,
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
      viewerCertificate: {
        cloudfrontDefaultCertificate: true,
        ...(props.domain?.acmCertificateArn && {
          acmCertificateArn: props.domain.acmCertificateArn,
          sslSupportMethod: "sni-only",
        }),
        ...(props.domain?.iamCertificate && {
          iamCertificate: props.domain.iamCertificate,
          sslSupportMethod: "sni-only",
        }),
      },
    });

    // allow cloudfront distribution to read from private s3 bucket
    const allowDistributionReadOnly = new DataAwsIamPolicyDocument(
      this,
      "AllowDistributionReadOnly",
      {
        statement: [
          {
            actions: ["s3:GetObject"],
            condition: [
              {
                test: "StringEquals",
                values: [distribution.arn],
                variable: "AWS:SourceArn",
              },
            ],
            principals: [
              {
                identifiers: ["cloudfront.amazonaws.com"],
                type: "Service",
              },
            ],
            resources: [`${this.bucket.arn}/*`],
          },
        ],
      }
    );

    // attach policy to s3 bucket
    new S3BucketPolicy(this, "DistributionS3BucketPolicy", {
      bucket: this.bucket.id,
      policy: allowDistributionReadOnly.json,
    });

    if (props.domain && props.domain.domainName && props.domain.hostedZoneId) {
      new Route53Record(this, "Route53Record", {
        zoneId: props.domain.hostedZoneId,
        type: "A",
        name: props.domain.domainName,
        alias: {
          name: distribution.domainName,
          zoneId: distribution.hostedZoneId,
          evaluateTargetHealth: false,
        },
      });
    }

    this._url = `https://${distribution.domainName}`;

    this.endpoint = new cloud.Endpoint(this, "Endpoint", this._url, {
      label: `Website ${this.node.path}`,
      browserSupport: true,
    });

    Node.of(this.endpoint).hidden = true;
  }

  protected get _endpoint(): cloud.Endpoint {
    return this.endpoint;
  }

  public addFile(
    path: string,
    data: string,
    options?: cloud.AddFileOptions
  ): string {
    new S3Object(this, `File-${path}`, {
      dependsOn: [this.bucket],
      content: data,
      bucket: this.bucket.bucket,
      contentType: options?.contentType ?? "text/plain",
      key: normalPath(path),
    });

    return `${this.url}/${path}`;
  }

  private uploadFile(filePath: string) {
    const fileKey = normalPath(filePath.replace(this.path, ""));
    const normalizedFullPath = normalPath(resolve(filePath));

    new S3Object(this, `File${fileKey.replace(/\//g, "--")}`, {
      dependsOn: [this.bucket],
      key: fileKey,
      bucket: this.bucket.bucket,
      source: normalizedFullPath,
      sourceHash: Fn.filemd5(normalizedFullPath),
      contentType: mime.contentType(extname(filePath)) || undefined,
    });
  }

  private uploadFiles(dir: string): void {
    const files = readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      const filename = join(dir, file.name);
      if (file.isDirectory()) {
        this.uploadFiles(filename);
      } else {
        this.uploadFile(filename);
      }
    }
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-aws", "shared-aws"),
      __filename,
      "WebsiteClient",
      []
    );
  }

  public get bucketArn(): string {
    return this.bucket.arn;
  }

  public get bucketName(): string {
    return this.bucket.bucketDomainName;
  }
}
