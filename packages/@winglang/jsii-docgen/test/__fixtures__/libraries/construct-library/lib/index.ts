import * as s3 from "@aws-cdk/aws-s3";

export class GreeterBucket extends s3.Bucket {
  public greet() {
    console.log(this.bucketName);
  }
}

export * as submod1 from "./submod1";
