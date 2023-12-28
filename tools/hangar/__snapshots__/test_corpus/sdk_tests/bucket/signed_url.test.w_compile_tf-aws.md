# [signed_url.test.w](../../../../../../examples/tests/sdk_tests/bucket/signed_url.test.w) | compile | tf-aws

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
      "testBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/testBucket/Default",
            "uniqueId": "testBucket"
          }
        },
        "bucket_prefix": "testbucket-c869e710-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "testBucket_PublicPolicy_109D3538": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/testBucket/PublicPolicy",
            "uniqueId": "testBucket_PublicPolicy_109D3538"
          }
        },
        "bucket": "${aws_s3_bucket.testBucket.bucket}",
        "depends_on": [
          "aws_s3_bucket_public_access_block.testBucket_PublicAccessBlock_98049E5D"
        ],
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.testBucket.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "testBucket_PublicAccessBlock_98049E5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/testBucket/PublicAccessBlock",
            "uniqueId": "testBucket_PublicAccessBlock_98049E5D"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.testBucket.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
      }
    }
  }
}
```

