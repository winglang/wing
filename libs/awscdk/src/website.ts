import { posix, sep } from "path";
import { Distribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { CanonicalUserPrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket as S3Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { createEncryptedBucket } from "./bucket";
import { core, cloud } from "@winglang/sdk/lib";
import { IAwsWebsite } from "@winglang/sdk/lib/shared-aws";

const INDEX_FILE = "index.html";

/**
 * AWS implementation of `cloud.Website`.
 *
 * @inflight `@winglang/sdk.cloud.IWebsiteClient`
 */
export class Website extends cloud.Website implements IAwsWebsite {
  private readonly bucket: S3Bucket;
  private readonly _url: string;
  private readonly endpoint: cloud.Endpoint;

  constructor(scope: Construct, id: string, props: cloud.WebsiteProps) {
    super(scope, id, props);

    this.bucket = createEncryptedBucket(this, false, "WebsiteBucket");

    new BucketDeployment(this, "BucketWebsiteConfiguration", {
      destinationBucket: this.bucket,
      sources: [Source.asset(this.path)],
    });

    const cloudFrontOAI = new OriginAccessIdentity(this, "CloudFrontOAI");

    this.bucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [this.bucket.arnForObjects("*")],
        principals: [
          new CanonicalUserPrincipal(
            cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    // create a cloudFront distribution
    const distribution = new Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new S3Origin(this.bucket, {
          originAccessIdentity: cloudFrontOAI,
        }),
      },
      domainNames: this._domain ? [this._domain.domainName] : undefined,
      defaultRootObject: INDEX_FILE,
    });

    this._url = `https://${distribution.domainName}`;

    this.endpoint = new cloud.Endpoint(this, "Endpoint", this._url, { label: `Website ${this.node.path}`, browserSupport: true })
  }

  protected get _endpoint(): cloud.Endpoint {
    return this.endpoint;
  }

  public addFile(
    path: string,
    data: string,
    options?: cloud.AddFileOptions
  ): string {
    new BucketDeployment(this, `S3Object-${path}`, {
      destinationBucket: this.bucket,
      contentType: options?.contentType ?? "text/plain",
      sources: [Source.data(this.formatPath(path), data)],
    });

    return `${this.url}/${path}`;
  }

  private formatPath(path: string): string {
    return path.split(sep).join(posix.sep);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname,
      __filename,
      "WebsiteClient",
      []
    );
  }

  public get bucketArn(): string {
    return this.bucket.bucketArn;
  }

  public get bucketName(): string {
    return this.bucket.bucketName;
  }
}
