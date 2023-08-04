import { Readable } from "stream";
import * as consumers from "stream/consumers";
import {
  HeadObjectCommand,
  HeadObjectCommandOutput,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  PutObjectCommand,
  GetBucketLocationCommand,
  GetPublicAccessBlockCommand,
  GetPublicAccessBlockCommandOutput,
  S3Client,
  GetObjectOutput,
} from "@aws-sdk/client-s3";
import { BucketDeleteOptions, IBucketClient } from "../cloud";
import { Duration, Json } from "../std";

export class BucketClient implements IBucketClient {
  constructor(
    private readonly bucketName: string,
    private readonly s3Client = new S3Client({})
  ) {}

  /**
   * Check if an object exists in the bucket
   *
   * @param key Key of the object
   */
  public async exists(key: string): Promise<boolean> {
    const command = new HeadObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const resp: HeadObjectCommandOutput = await this.s3Client.send(command);
    return !!resp?.ContentLength;
  }

  /**
   * Put object into bucket with given body contents
   *
   * @param key Key of the object
   * @param body string contents of the object
   */
  public async put(key: string, body: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body,
    });
    await this.s3Client.send(command);
  }

  /**
   * Put Json object into bucket with given body contents
   *
   * @param key Key of the object
   * @param body Json object
   */
  public async putJson(key: string, body: Json): Promise<void> {
    await this.put(key, JSON.stringify(body, null, 2));
  }

  /**
   * Get an object from the bucket
   *
   * @param key Key of the object
   * @returns content of the object
   */
  public async get(key: string): Promise<string> {
    // See https://github.com/aws/aws-sdk-js-v3/issues/1877
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    let resp: GetObjectOutput;
    try {
      resp = await this.s3Client.send(command);
    } catch (e) {
      throw new Error(
        `Object does not exist (key=${key}): ${(e as Error).stack}`
      );
    }
    try {
      return await consumers.text(resp.Body as Readable);
    } catch (e) {
      throw new Error(
        `Object contents could not be read as text (key=${key}): ${
          (e as Error).stack
        })}`
      );
    }
  }

  /**
   * Get an object from the bucket if it exists
   *
   * @param key Key of the object
   * @returns content of the object
   */
  public async tryGet(key: string): Promise<string | undefined> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    let resp: GetObjectOutput;
    try {
      resp = await this.s3Client.send(command);
    } catch (e: any) {
      if (e.name === "NoSuchKey") {
        return undefined;
      }
      throw new Error((e as Error).stack);
    }
    try {
      return await consumers.text(resp.Body as Readable);
    } catch (e) {
      throw new Error(
        `Object contents could not be read as text (key=${key}): ${
          (e as Error).stack
        })}`
      );
    }
  }

  /**
   * Get a Json object from the bucket
   *
   * @param key Key of the object
   * @returns Json content of the object
   */
  public async getJson(key: string): Promise<Json> {
    return JSON.parse(await this.get(key));
  }

  /**
   * Get a Json object from the bucket if it exists
   *
   * @param key Key of the object
   * @returns Json content of the object
   */
  public async tryGetJson(key: string): Promise<Json | undefined> {
    if (await this.exists(key)) {
      return this.getJson(key);
    }

    return undefined;
  }

  /**
   * Delete an object from the bucket
   *
   * @param key Key of the object
   * @param opts Option object supporting additional strategies to delete item from a bucket
   */
  public async delete(key: string, opts?: BucketDeleteOptions): Promise<void> {
    const mustExist = opts?.mustExist ?? false;

    if (mustExist && !(await this.exists(key))) {
      throw new Error(`Object does not exist (key=${key}).`);
    }

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

      throw new Error(`Unable to delete "${key}": ${error.message}`);
    }
  }

  /**
   * Delete an object from the bucket if it exists
   *
   * @param key Key of the object
   * @param opts Option object supporting additional strategies to delete item from a bucket
   */
  public async tryDelete(key: string): Promise<boolean> {
    if (await this.exists(key)) {
      await this.delete(key);
      return true;
    }

    return false;
  }

  /**
   * List all keys in the bucket.
   * @param prefix Limits the response to keys that begin with the specified prefix
   * TODO - add pagination support, currently returns all existing keys in the bucket
   * https://github.com/winglang/wing/issues/315
   */
  public async list(prefix?: string): Promise<string[]> {
    const list: string[] = [];
    let fetchMore = true;
    let marker: string | undefined = undefined;
    while (fetchMore) {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
        Prefix: prefix,
        StartAfter: marker,
      });
      const resp: ListObjectsV2CommandOutput = await this.s3Client.send(
        command
      );
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
   * checks if the bucket is public
   * @returns true if the bucket is public and false otherwise
   */
  private async checkIfPublic(): Promise<boolean> {
    const command = new GetPublicAccessBlockCommand({
      Bucket: this.bucketName,
    });
    const resp: GetPublicAccessBlockCommandOutput = await this.s3Client.send(
      command
    );
    return (
      !resp.PublicAccessBlockConfiguration?.BlockPublicAcls &&
      !resp.PublicAccessBlockConfiguration?.BlockPublicPolicy &&
      !resp.PublicAccessBlockConfiguration?.RestrictPublicBuckets &&
      !resp.PublicAccessBlockConfiguration?.IgnorePublicAcls
    );
  }

  /**
   * Returns a url to the given file.
   * @Throws if the file is not public or if object does not exist.
   */
  public async publicUrl(key: string): Promise<string> {
    if (!(await this.checkIfPublic())) {
      throw new Error("Cannot provide public url for a non-public bucket");
    }

    if (!(await this.exists(key))) {
      throw new Error(
        `Cannot provide public url for a non-existent key (key=${key})`
      );
    }

    const region = await this.getLocation();

    return encodeURI(
      `https://${this.bucketName}.s3.${region}.amazonaws.com/${key}`
    );
  }

  /**
   * Returns a signed url to the given file. This URL can be used by anyone to
   * access the file until the link expires (defaults to 24 hours).
   * @param key The key to reach
   * @param duration Time until expires
   */
  public async signed_url(key: string, duration?: Duration): Promise<string> {
    // for signed_url take a look here: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html#s3-create-presigendurl-get
    throw new Error(
      `signed_url is not implemented yet (key=${key}, duration=${duration})`
    );
  }

  private async getLocation(): Promise<string> {
    const command = new GetBucketLocationCommand({
      Bucket: this.bucketName,
    });
    //Buckets in Region us-east-1 have a LocationConstraint of null.
    //https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLocation.html#API_GetBucketLocation_ResponseSyntax
    const { LocationConstraint: region = "us-east-1" } =
      await this.s3Client.send(command);
    return region;
  }
}
