import { cloud } from "..";

/**
 * A shared interface for AWS buckets.
 */
export interface IAwsBucket {
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
 * A helper class for working with AWS buckets.
 */
export class Bucket {
  /**
   * If the bucket is an AWS Bucket, return a helper interface for
   * working with it.
   * @param bucket The cloud.Bucket.
   */
  public static from(bucket: cloud.Bucket): IAwsBucket | undefined {
    if (this.isAwsBucket(bucket)) {
      return bucket;
    }
    return undefined;
  }

  private static isAwsBucket(obj: any): obj is IAwsBucket {
    return (
      typeof obj.bucketArn === "string" && typeof obj.bucketName === "string"
    );
  }
}
