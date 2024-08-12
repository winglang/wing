# [function-ref.test.w](../../../../../../examples/tests/sdk_tests/function/function-ref.test.w) | compile | tf-aws

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
    "aws_cloudwatch_log_group": {
      "Function_CloudwatchLogGroup_ABDCF4C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/CloudwatchLogGroup",
            "uniqueId": "Function_CloudwatchLogGroup_ABDCF4C4"
          }
        },
        "name": "/aws/lambda/Function-c852aba6",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "Counter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Counter/Default",
            "uniqueId": "Counter"
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
        "name": "wing-counter-Counter-c824ef62"
      }
    },
    "aws_iam_role": {
      "Function_IamRole_678BE84C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/IamRole",
            "uniqueId": "Function_IamRole_678BE84C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Function_IamRolePolicy_E3B26607": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/IamRolePolicy",
            "uniqueId": "Function_IamRolePolicy_E3B26607"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Function_IamRole_678BE84C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Function_IamRolePolicyAttachment_CACE1358": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/IamRolePolicyAttachment",
            "uniqueId": "Function_IamRolePolicyAttachment_CACE1358"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Function_IamRole_678BE84C.name}"
      }
    },
    "aws_lambda_function": {
      "Function": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/Default",
            "uniqueId": "Function"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Function-c852aba6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Function-c852aba6",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Function_IamRole_678BE84C.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Function_S3Object_C62A0C2D.key}",
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
      }
    },
    "aws_s3_object": {
      "Function_S3Object_C62A0C2D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/S3Object",
            "uniqueId": "Function_S3Object_C62A0C2D"
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

