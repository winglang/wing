# [delete.test.w](../../../../../../tests/sdk_tests/bucket/delete.test.w) | compile | tf-aws

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
      }
    },
    "aws_s3_object": {
      "Bucket_S3Object-file2txt_2016A6BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/S3Object-file2.txt",
            "uniqueId": "Bucket_S3Object-file2txt_2016A6BF"
          }
        },
        "bucket": "${aws_s3_bucket.Bucket.bucket}",
        "content": "Bar",
        "key": "file2.txt"
      }
    }
  }
}
```

