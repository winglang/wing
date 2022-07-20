// eslint-disable-next-line import/no-extraneous-dependencies
import * as AWS from "aws-sdk";

export class BucketClient {
  private readonly s3 = new AWS.S3();

  constructor(private readonly bucketName: string) {}

  public async upload(key: string, body: string): Promise<void> {
    await this.s3
      .putObject({
        Bucket: this.bucketName,
        Key: key,
        Body: body,
      })
      .promise();
  }
}
