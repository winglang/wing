import { Readable } from "stream";
import * as consumers from "stream/consumers";
import {
  __Client,
  CopyObjectCommand,
  DeleteObjectCommand,
  GetBucketLocationCommand,
  GetObjectCommand,
  GetObjectOutput,
  GetPublicAccessBlockCommand,
  GetPublicAccessBlockCommandOutput,
  HeadObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  NotFound,
  NoSuchKey,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import mime from "mime-types";
import {
  IBucketClient,
  ObjectMetadata,
  BucketPutOptions,
  BucketDeleteOptions,
  BucketSignedUrlOptions,
} from "../cloud";
import { Datetime, Json } from "../std";

export class BucketClient implements IBucketClient {
  constructor(
    private readonly bucketName: string,
    private readonly s3Client: S3Client = new S3Client({})
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

    try {
      await this.s3Client.send(command);
      return true;
    } catch (error) {
      if ((error as Error).name === "NotFound") {
        return false;
      }
      throw error;
    }
  }

  /**
   * Put object into bucket with given body contents
   *
   * @param key Key of the object
   * @param body string contents of the object
   */
  public async put(
    key: string,
    body: string,
    opts?: BucketPutOptions
  ): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body,
      ContentType:
        (opts?.contentType ?? mime.lookup(key)) || "application/octet-stream",
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
    await this.put(key, JSON.stringify(body, null, 2), {
      contentType: "application/json",
    });
  }

  /**
   * See https://github.com/aws/aws-sdk-js-v3/issues/1877
   */
  private async getObjectContent(key: string): Promise<string | undefined> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      const resp: GetObjectOutput = await this.s3Client.send(command);
      const objectContent = resp.Body as Readable;
      try {
        return await consumers.text(objectContent);
      } catch (e) {
        throw new Error(
          `Object content could not be read as text (key=${key}): ${
            (e as Error).stack
          })}`
        );
      }
    } catch (e) {
      if (e instanceof NoSuchKey) {
        return undefined;
      }
      throw new Error((e as Error).stack);
    }
  }

  /**
   * Get an object from the bucket
   *
   * @param key Key of the object
   * @returns content of the object
   */
  public async get(key: string): Promise<string> {
    const objectContent = await this.getObjectContent(key);
    if (objectContent !== undefined) {
      return objectContent;
    }
    throw new Error(`Object does not exist (key=${key}).`);
  }

  /**
   * Get an object from the bucket if it exists
   *
   * @param key Key of the object
   * @returns content of the object
   */
  public async tryGet(key: string): Promise<string | undefined> {
    return this.getObjectContent(key);
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
    const objectContent = await this.tryGet(key);
    if (objectContent !== undefined) {
      return JSON.parse(objectContent);
    } else {
      return undefined;
    }
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
    } catch (e: any) {
      if (!mustExist && e instanceof NoSuchKey) {
        return;
      }

      throw new Error(`Unable to delete "${key}": ${e.message}`);
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
   * Copy an object to a new location in the bucket. If the destination object
   * already exists, it will be overwritten.
   *
   * @param srcKey The key of the source object you wish to copy.
   * @param dstKey The key of the destination object after copying.
   */
  public async copy(srcKey: string, dstKey: string): Promise<void> {
    try {
      // Get properties of the source object
      const headResult = await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucketName,
          Key: srcKey,
        })
      );

      // Equivalent to `aws s3 cp --copy-props` in AWS CLI v2
      const command = new CopyObjectCommand({
        Bucket: this.bucketName,
        CopySource: `${this.bucketName}/${srcKey}`,
        Key: dstKey,
        MetadataDirective: "REPLACE",
        // Properties carried over from the source object
        ContentType: headResult?.ContentType,
        ContentLanguage: headResult?.ContentLanguage,
        ContentEncoding: headResult?.ContentEncoding,
        ContentDisposition: headResult?.ContentDisposition,
        CacheControl: headResult?.CacheControl,
        Expires: headResult?.Expires,
        Metadata: headResult?.Metadata,
      });

      await this.s3Client.send(command);
    } catch (error) {
      if (error instanceof NotFound) {
        throw new Error(
          `Unable to copy. Source object does not exist (srcKey=${srcKey}).`
        );
      }
      throw error;
    }
  }

  /**
   * Checks if the bucket is public
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
   * Returns a signed url to the given file.
   * @Throws if object does not exist.
   * @inflight
   * @param key The key to reach
   *    @param duration Time until expires
   */

  public async signedUrl(
    key: string,
    options?: BucketSignedUrlOptions
  ): Promise<string> {
    if (!(await this.exists(key))) {
      throw new Error(
        `Cannot provide signed url for a non-existent key (key=${key})`
      );
    }
    const expiryTimeInSeconds: number = options?.duration?.seconds || 86400;
    const command: GetObjectCommand = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    try {
      const signedUrl: string = await getSignedUrl(this.s3Client, command, {
        expiresIn: expiryTimeInSeconds,
      });
      return signedUrl;
    } catch (error) {
      throw new Error(
        `Unable to generate signed url for key ${key} : ${error as Error}`
      );
    }
  }

  /**
   * Get the metadata of an object in the bucket.
   * @param key Key of the object.
   */
  public async metadata(key: string): Promise<ObjectMetadata> {
    const command = new HeadObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    try {
      const resp = await this.s3Client.send(command);
      return {
        contentType: resp.ContentType,
        lastModified: Datetime.fromIso(resp.LastModified!.toISOString()),
        size: resp.ContentLength!,
      };
    } catch (error) {
      // 403 is thrown if s3:ListObject is not granted.
      if (error instanceof NotFound || (error as Error).name === "403") {
        throw new Error(`Object does not exist (key=${key}).`);
      }
      throw error;
    }
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
