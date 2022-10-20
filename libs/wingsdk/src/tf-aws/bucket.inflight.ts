import { Readable } from "stream";
import * as consumers from "stream/consumers";
import {
  GetObjectCommand,
  ListObjectsCommand, ListObjectsCommandOutput,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { IBucketClient } from "../cloud";
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

  public async list(): Promise<string[]> {
    const command = new ListObjectsCommand({
      Bucket: this.bucketName,
    });
    const resp: ListObjectsCommandOutput = await this.s3Client.send(command);
    return resp.Contents?.map((content) => content.Key as string) ?? [];
  }
}
