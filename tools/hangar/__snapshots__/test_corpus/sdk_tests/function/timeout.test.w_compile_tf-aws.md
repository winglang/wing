# [timeout.test.w](../../../../../../tests/sdk_tests/function/timeout.test.w) | compile | tf-aws

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
      "functionwith1stimeout_CloudwatchLogGroup_5E37449F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/function with 1s timeout/CloudwatchLogGroup",
            "uniqueId": "functionwith1stimeout_CloudwatchLogGroup_5E37449F"
          }
        },
        "name": "/aws/lambda/function-with-1s-timeout-c8d47946",
        "retention_in_days": 30
      },
      "functionwithdefaulttimeout_CloudwatchLogGroup_2A473165": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/function with default timeout/CloudwatchLogGroup",
            "uniqueId": "functionwithdefaulttimeout_CloudwatchLogGroup_2A473165"
          }
        },
        "name": "/aws/lambda/function-with-default-timeout-c8c15878",
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
      "functionwith1stimeout_IamRole_C2456C80": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/function with 1s timeout/IamRole",
            "uniqueId": "functionwith1stimeout_IamRole_C2456C80"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "functionwithdefaulttimeout_IamRole_E358F68D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/function with default timeout/IamRole",
            "uniqueId": "functionwithdefaulttimeout_IamRole_E358F68D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "functionwith1stimeout_IamRolePolicy_390EF952": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/function with 1s timeout/IamRolePolicy",
            "uniqueId": "functionwith1stimeout_IamRolePolicy_390EF952"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.functionwith1stimeout_IamRole_C2456C80.name}"
      },
      "functionwithdefaulttimeout_IamRolePolicy_0375C4B5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/function with default timeout/IamRolePolicy",
            "uniqueId": "functionwithdefaulttimeout_IamRolePolicy_0375C4B5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.functionwithdefaulttimeout_IamRole_E358F68D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "functionwith1stimeout_IamRolePolicyAttachment_66343DEF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/function with 1s timeout/IamRolePolicyAttachment",
            "uniqueId": "functionwith1stimeout_IamRolePolicyAttachment_66343DEF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.functionwith1stimeout_IamRole_C2456C80.name}"
      },
      "functionwithdefaulttimeout_IamRolePolicyAttachment_B7B164B0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/function with default timeout/IamRolePolicyAttachment",
            "uniqueId": "functionwithdefaulttimeout_IamRolePolicyAttachment_B7B164B0"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.functionwithdefaulttimeout_IamRole_E358F68D.name}"
      }
    },
    "aws_lambda_function": {
      "functionwith1stimeout": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/function with 1s timeout/Default",
            "uniqueId": "functionwith1stimeout"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "function-with-1s-timeout-c8d47946",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "function-with-1s-timeout-c8d47946",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.functionwith1stimeout_IamRole_C2456C80.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.functionwith1stimeout_S3Object_4DCC675D.key}",
        "timeout": 1,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "functionwithdefaulttimeout": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/function with default timeout/Default",
            "uniqueId": "functionwithdefaulttimeout"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "function-with-default-timeout-c8c15878",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "function-with-default-timeout-c8c15878",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.functionwithdefaulttimeout_IamRole_E358F68D.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.functionwithdefaulttimeout_S3Object_6903B193.key}",
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
      "functionwith1stimeout_S3Object_4DCC675D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/function with 1s timeout/S3Object",
            "uniqueId": "functionwith1stimeout_S3Object_4DCC675D"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "functionwithdefaulttimeout_S3Object_6903B193": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/function with default timeout/S3Object",
            "uniqueId": "functionwithdefaulttimeout_S3Object_6903B193"
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

