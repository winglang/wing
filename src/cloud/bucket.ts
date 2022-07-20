import { s3 } from "@cdktf/provider-aws";
import { Construct } from "constructs";
import { Capture, ICapturable } from "../core";
import { Function } from "./function";

export class Bucket extends Construct implements ICapturable {
  private readonly bucket: s3.S3Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.bucket = new s3.S3Bucket(this, "Default");
  }

  public capture(consumer: any, _capture: Capture): string {
    if (!(consumer instanceof Function)) {
      throw new Error("buckets can only be captured by functions for now");
    }

    const name = `BUCKET_NAME__${this.node.addr}`;

    consumer.addEnvironment(name, this.bucket.bucket);

    // const clientPath = require.resolve("./bucket-client");
    return `new (require('@monadahq/wingsdk/lib/cloud/bucket-client')).BucketClient(process.env.${name});`;
  }
}
