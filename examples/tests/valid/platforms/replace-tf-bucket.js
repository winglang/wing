const aws = require("@cdktf/provider-aws");

const BUCKET_FQN = "@winglang/sdk.cloud.Bucket";

exports.Platform = class ReplaceTFBucket {
  target = "tf-aws"

  newInstance(type, scope, id, props) {
    if (type === BUCKET_FQN) {
      // This is just a simple example the bucket being returned would not be
      // valid for lifting
      return new aws.s3Bucket.S3Bucket(scope, "MyReplacedBucket", {
        bucket: "my_replaced_bucket"
      });

    }
  }
}