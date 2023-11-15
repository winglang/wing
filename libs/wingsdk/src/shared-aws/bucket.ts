import { IResource } from "../std";

/**
 * A shared interface for AWS buckets.
 */
export interface IAwsBucket {
  /**
   * Get iinternal AWS Bucket
   */
  innerAwsBucket(): any;
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
    return typeof obj.innerAwsBucket === "function";
  }
}
