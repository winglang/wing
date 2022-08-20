import { s3 } from "@cdktf/provider-aws";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import { TERRAFORM_AWS_CLIENTS_PATH } from "../constants";
import { Capture, Code, NodeJsCode } from "../core";
import { Function } from "./function";

export class Bucket extends cloud.BucketBase implements cloud.IBucket {
  private readonly bucket: s3.S3Bucket;

  constructor(scope: Construct, id: string, props: cloud.BucketProps) {
    super(scope, id, props);

    props;

    this.bucket = new s3.S3Bucket(this, "Default");
  }

  public capture(consumer: any, capture: Capture): Code {
    if (!(consumer instanceof Function)) {
      throw new Error("buckets can only be captured by tfaws.Function for now");
    }

    const name = `BUCKET_NAME__${this.node.id}`;

    const methods = new Set(capture.methods ?? []);
    if (methods.has("upload")) {
      consumer.addPolicyStatements({
        effect: "Allow",
        action: ["s3:PutObject", "s3:PutObjectAcl"],
        resource: [`${this.bucket.arn}/*`],
      });
    }

    consumer.addEnvironment(name, this.bucket.bucket);

    return NodeJsCode.fromInline(
      `new (require("${TERRAFORM_AWS_CLIENTS_PATH}")).BucketClient(process.env.${name});`
    );
  }
}
