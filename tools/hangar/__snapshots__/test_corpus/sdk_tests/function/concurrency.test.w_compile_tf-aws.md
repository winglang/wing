# [concurrency.test.w](../../../../../../examples/tests/sdk_tests/function/concurrency.test.w) | compile | tf-aws

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
    "aws_cloudwatch_log_group": {
      "concurrencyfn_CloudwatchLogGroup_E1F504F7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/concurrency fn/CloudwatchLogGroup",
            "uniqueId": "concurrencyfn_CloudwatchLogGroup_E1F504F7"
          }
        },
        "name": "/aws/lambda/concurrency-fn-c8670436",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "cloudCounter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "cloudCounter"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    },
    "aws_iam_role": {
      "concurrencyfn_IamRole_AECD4E1A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/concurrency fn/IamRole",
            "uniqueId": "concurrencyfn_IamRole_AECD4E1A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "concurrencyfn_IamRolePolicy_89F79FD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/concurrency fn/IamRolePolicy",
            "uniqueId": "concurrencyfn_IamRolePolicy_89F79FD0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.concurrencyfn_IamRole_AECD4E1A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "concurrencyfn_IamRolePolicyAttachment_39D6A8D1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/concurrency fn/IamRolePolicyAttachment",
            "uniqueId": "concurrencyfn_IamRolePolicyAttachment_39D6A8D1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.concurrencyfn_IamRole_AECD4E1A.name}"
      }
    },
    "aws_lambda_function": {
      "concurrencyfn": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/concurrency fn/Default",
            "uniqueId": "concurrencyfn"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "concurrency-fn-c8670436",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "concurrency-fn-c8670436",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "reserved_concurrent_executions": 1,
        "role": "${aws_iam_role.concurrencyfn_IamRole_AECD4E1A.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.concurrencyfn_S3Object_13B83696.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "Code": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "Code"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      },
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
      "concurrencyfn_S3Object_13B83696": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/concurrency fn/S3Object",
            "uniqueId": "concurrencyfn_S3Object_13B83696"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    }
  }
}
```

