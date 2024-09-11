# [array.test.w](../../../../../../tests/sdk_tests/std/array.test.w) | compile | tf-aws

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
      },
      "myBucket_CorsConfiguration-bd2dc39e_5BA04287": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/myBucket/CorsConfiguration-bd2dc39e",
            "uniqueId": "myBucket_CorsConfiguration-bd2dc39e_5BA04287"
          }
        },
        "bucket": "${aws_s3_bucket.myBucket.id}",
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
      },
      "mySecondBucket_CorsConfiguration-972a7c07_70FA1AE2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/mySecondBucket/CorsConfiguration-972a7c07",
            "uniqueId": "mySecondBucket_CorsConfiguration-972a7c07_70FA1AE2"
          }
        },
        "bucket": "${aws_s3_bucket.mySecondBucket.id}",
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

