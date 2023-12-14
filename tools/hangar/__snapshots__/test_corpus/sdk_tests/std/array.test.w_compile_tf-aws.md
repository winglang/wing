# [array.test.w](../../../../../../examples/tests/sdk_tests/std/array.test.w) | compile | tf-aws

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
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      },
      "myBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/myBucket/Default",
            "uniqueId": "myBucket"
          }
        },
        "bucket_prefix": "mybucket-c8573914-",
        "force_destroy": false
      },
      "mySecondBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/mySecondBucket/Default",
            "uniqueId": "mySecondBucket"
          }
        },
        "bucket_prefix": "mysecondbucket-c8d5dc33-",
        "force_destroy": false
      }
    }
  }
}
```

