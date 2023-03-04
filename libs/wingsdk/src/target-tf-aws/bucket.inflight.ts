import { Readable } from "stream";
import * as consumers from "stream/consumers";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  ListObjectsCommandOutput,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { BucketDeleteOptions, IBucketClient } from "../cloud";
import { Json } from "../std";

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

  public async putJson(key: string, body: Json): Promise<void> {
    await this.put(key, JSON.stringify(body, null, 2));
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

  public async getJson(key: string): Promise<Json> {
    return JSON.parse(await this.get(key));
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
    const mustExist = opts?.mustExist ?? false;

    const command = new DeleteObjectCommand({
      Key: key,
      Bucket: this.bucketName,
    });

    try {
      await this.s3Client.send(command);
    } catch (er) {
      const error = er as any;
      if (!mustExist && error.name === "NoSuchKey") {
        return;
      }

      throw Error(`unable to delete "${key}": ${error.message}`);
    }
  }
}
