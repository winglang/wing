import { IResource } from "../std";

/**
 * A shared interface for AWS buckets.
 */
export interface IAwsBucket {
  /**
   * AWS Bucket arn
   */
  arn(): string;

  /**
   * AWS Bucket name
   */
  bucketName(): string;
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
  public static from(bucket: IResource): IAwsBucket | undefined {
    if (this.isAwsBucket(bucket)) {
      return bucket;
    }
    return undefined;
  }

  private static isAwsBucket(obj: any): obj is IAwsBucket {
    return (
      typeof obj.arn === "function" && typeof obj.bucketName === "function"
    );
  }
}
