# [delete.test.w](../../../../../../examples/tests/sdk_tests/bucket/delete.test.w) | compile | tf-aws

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
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_object": {
      "cloudBucket_S3Object-file2txt_C6672D6C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3Object-file2.txt",
            "uniqueId": "cloudBucket_S3Object-file2txt_C6672D6C"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "content": "Bar",
        "key": "file2.txt"
      }
    }
  }
}
```

