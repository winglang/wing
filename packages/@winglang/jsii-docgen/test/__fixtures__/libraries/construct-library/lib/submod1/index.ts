import * as s3 from "@aws-cdk/aws-s3";

export class GoodbyeBucket extends s3.Bucket {
  public goodbye() {
    console.log(this.bucketName);
  }
}
