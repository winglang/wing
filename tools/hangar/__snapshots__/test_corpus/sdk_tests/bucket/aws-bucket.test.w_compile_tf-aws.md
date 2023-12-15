# [aws-bucket.test.w](../../../../../../examples/tests/sdk_tests/bucket/aws-bucket.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
    },
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_s3_bucket": {
      "aws-wing-bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-bucket/Default",
            "uniqueId": "aws-wing-bucket"
          }
        },
        "bucket_prefix": "aws-wing-bucket-c8f5eeeb-",
        "force_destroy": false
      }
    }
  }
}
```

