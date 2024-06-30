# [bucket_list.test.w](../../../../../../examples/tests/sdk_tests/bucket/bucket_list.test.w) | compile | tf-aws

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
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
        "force_destroy": false
      }
    },
    "aws_s3_object": {
      "Bucket_S3Object-file3txt_6AB69768": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/S3Object-file3.txt",
            "uniqueId": "Bucket_S3Object-file3txt_6AB69768"
          }
        },
        "bucket": "${aws_s3_bucket.Bucket.bucket}",
        "content": "Baz",
        "key": "file3.txt"
      }
    }
  }
}
```

