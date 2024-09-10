# [add_object.test.w](../../../../../../tests/sdk_tests/bucket/add_object.test.w) | compile | tf-aws

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
    "aws_s3_bucket_cors_configuration": {
      "Bucket_CorsConfiguration-1357ca3a_A4CCA40A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/CorsConfiguration-1357ca3a",
            "uniqueId": "Bucket_CorsConfiguration-1357ca3a_A4CCA40A"
          }
        },
        "bucket": "${aws_s3_bucket.Bucket.id}",
        "cors_rule": [
          {
            "allowed_headers": [
              "*"
            ],
            "allowed_methods": [
              "GET",
              "POST",
              "PUT",
              "DELETE",
              "HEAD"
            ],
            "allowed_origins": [
              "*"
            ],
            "expose_headers": [],
            "max_age_seconds": 0
          }
        ]
      }
    },
    "aws_s3_object": {
      "Bucket_S3Object-file1json_6A4AD365": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/S3Object-file1.json",
            "uniqueId": "Bucket_S3Object-file1json_6A4AD365"
          }
        },
        "bucket": "${aws_s3_bucket.Bucket.bucket}",
        "content": "{\"key1\":\"value1\"}",
        "key": "file1.json"
      },
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

