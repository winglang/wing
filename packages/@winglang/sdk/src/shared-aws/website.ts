import { Domain } from "./domain";
import { cloud } from "..";
import { WebsiteOptions } from "../cloud";
import { InflightClient } from "../core";

/**
 * Options for AWS `Website`.
 */
export interface AwsWebsiteProps extends WebsiteOptions {
  /**
   * The website's custom domain object.
   * @default - undefined
   */
  readonly domain?: Domain;
}

/**
 * A shared interface for AWS website.
 */
export interface IAwsWebsite {
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
 * Base class for AWS Websites
 */
export abstract class Website extends cloud.Website implements IAwsWebsite {
  /** @internal */
  public static _toInflightType(): string {
    return InflightClient.forType(
      __filename.replace("website", "website.inflight"),
      "WebsiteClient",
    );
  }

  /**
   * If the bucket is an AWS Bucket, return a helper interface for
   * working with it.
   * @param website The cloud.Bucket.
   */
  public static from(website: cloud.Website): IAwsWebsite | undefined {
    if (this.isAwsWebsite(website)) {
      return website;
    }
    return undefined;
  }

  public abstract get bucketArn(): string;
  public abstract get bucketName(): string;

  private static isAwsWebsite(obj: any): obj is IAwsWebsite {
    return (
      typeof obj.bucketArn === "string" && typeof obj.bucketName === "string"
    );
  }
}
