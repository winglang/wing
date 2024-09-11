# [node.test.w](../../../../../../tests/sdk_tests/std/node.test.w) | compile | tf-aws

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
      "SingletonBucket_CorsConfiguration-4dd8138d_2CDD3371": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/SingletonBucket/CorsConfiguration-4dd8138d",
            "uniqueId": "SingletonBucket_CorsConfiguration-4dd8138d_2CDD3371"
          }
        },
        "bucket": "${aws_s3_bucket.SingletonBucket.id}",
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

