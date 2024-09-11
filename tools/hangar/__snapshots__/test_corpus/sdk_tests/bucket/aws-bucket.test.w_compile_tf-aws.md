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
    },
    "aws_s3_bucket_cors_configuration": {
      "aws-wing-bucket_CorsConfiguration-1619e757_B022291C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-bucket/CorsConfiguration-1619e757",
            "uniqueId": "aws-wing-bucket_CorsConfiguration-1619e757_B022291C"
          }
        },
        "bucket": "${aws_s3_bucket.aws-wing-bucket.id}",
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
    }
  }
}
```

