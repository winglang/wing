# [aws-bucket.test.w](../../../../../../tests/sdk_tests/bucket/aws-bucket.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
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

