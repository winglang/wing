import { Readable } from "stream";
import * as consumers from "stream/consumers";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  ListObjectsCommandOutput,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { BucketDeleteOptions, IBucketClient } from "../cloud";

export class BucketClient implements IBucketClient {
  constructor(
    private readonly bucketName: string,
    private readonly s3Client = new S3Client({})
  ) {}

  public async put(key: string, body: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body,
    });
    await this.s3Client.send(command);
  }

  public async get(key: string): Promise<string> {
    // See https://github.com/aws/aws-sdk-js-v3/issues/1877
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    const resp = await this.s3Client.send(command);
    return consumers.text(resp.Body as Readable);
  }

  /**
   * List all keys in the bucket.
   * @param prefix Limits the response to keys that begin with the specified prefix
   * TODO - add pagination support, currently returns all existing keys in the bucket
   */
  public async list(prefix?: string): Promise<string[]> {
    const list: string[] = [];
    let fetchMore = true;
    let marker: string | undefined = undefined;
    while (fetchMore) {
      const command = new ListObjectsCommand({
        Bucket: this.bucketName,
        Prefix: prefix,
        Marker: marker,
      });
      const resp: ListObjectsCommandOutput = await this.s3Client.send(command);
      for (const content of resp.Contents ?? []) {
        if (content.Key === undefined) {
          continue;
        }
        list.push(content.Key);
      }
      fetchMore = resp?.IsTruncated ?? false;
      marker = list.length > 0 ? list.at(-1) : undefined;
    }
    return list;
  }

  /**
   * Delete an existing object using a key from the bucket
   * @param key Key of the object.
   * @param opts Option object supporting additional strategies to delete an item from a bucket
   */
  public async delete(key: string, opts?: BucketDeleteOptions): Promise<void> {
    const command = new DeleteObjectCommand({
      Key: key,
      Bucket: this.bucketName,
    });

    try {
      await this.s3Client.send(command);
    } catch (er) {
      if (er instanceof S3ServiceException) {
        if (!opts?.mustExist && er.name === "NoSuchKey") {
          return;
        }

        throw Error(`unable to delete "${key}": ${er.message}`);
      }

      throw er;
    }
  }
}
