# [node.test.w](../../../../../../tests/sdk_tests/std/node.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
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
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
        "force_destroy": false
      },
      "SingletonBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/SingletonBucket/Default",
            "uniqueId": "SingletonBucket"
          }
        },
        "bucket_prefix": "singletonbucket-c8ac9620-",
        "force_destroy": false
      }
    },
    "aws_sqs_queue": {
      "q1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q1/Default",
            "uniqueId": "q1"
          }
        },
        "message_retention_seconds": 3600,
        "name": "q1-c8d04b5e",
        "visibility_timeout_seconds": 30
      },
      "q2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q2/Default",
            "uniqueId": "q2"
          }
        },
        "message_retention_seconds": 3600,
        "name": "q2-c8aa6380",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

