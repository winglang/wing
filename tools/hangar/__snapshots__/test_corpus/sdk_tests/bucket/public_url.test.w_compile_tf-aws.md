# [public_url.test.w](../../../../../../tests/sdk_tests/bucket/public_url.test.w) | compile | tf-aws

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
      "privateBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/privateBucket/Default",
            "uniqueId": "privateBucket"
          }
        },
        "bucket_prefix": "privatebucket-c835fdbc-",
        "force_destroy": false
      },
      "publicBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/Default",
            "uniqueId": "publicBucket"
          }
        },
        "bucket_prefix": "publicbucket-c8077f6c-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_cors_configuration": {
      "privateBucket_CorsConfiguration-e82f6088_B53F96C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/privateBucket/CorsConfiguration-e82f6088",
            "uniqueId": "privateBucket_CorsConfiguration-e82f6088_B53F96C4"
          }
        },
        "bucket": "${aws_s3_bucket.privateBucket.id}",
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
      "publicBucket_CorsConfiguration-7c320eda_33D3FB14": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/CorsConfiguration-7c320eda",
            "uniqueId": "publicBucket_CorsConfiguration-7c320eda_33D3FB14"
          }
        },
        "bucket": "${aws_s3_bucket.publicBucket.id}",
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
    "aws_s3_bucket_policy": {
      "publicBucket_PublicPolicy_F7753EC4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/PublicPolicy",
            "uniqueId": "publicBucket_PublicPolicy_F7753EC4"
          }
        },
        "bucket": "${aws_s3_bucket.publicBucket.bucket}",
        "depends_on": [
          "aws_s3_bucket_public_access_block.publicBucket_PublicAccessBlock_54D9EFBA"
        ],
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.publicBucket.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "publicBucket_PublicAccessBlock_54D9EFBA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/PublicAccessBlock",
            "uniqueId": "publicBucket_PublicAccessBlock_54D9EFBA"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.publicBucket.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
      }
    }
  }
}
```

