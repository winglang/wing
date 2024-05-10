# [aws-function.test.w](../../../../../../tests/sdk_tests/function/aws-function.test.w) | compile | tf-aws

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
      "aws-wing-function_CloudwatchLogGroup_2CCFCD44": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-function/CloudwatchLogGroup",
            "uniqueId": "aws-wing-function_CloudwatchLogGroup_2CCFCD44"
          }
        },
        "name": "/aws/lambda/aws-wing-function-c8f4cdef",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "aws-wing-function_IamRole_705FDD7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-function/IamRole",
            "uniqueId": "aws-wing-function_IamRole_705FDD7E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "aws-wing-function_IamRolePolicy_CF2194BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-function/IamRolePolicy",
            "uniqueId": "aws-wing-function_IamRolePolicy_CF2194BD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.aws-wing-function_IamRole_705FDD7E.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "aws-wing-function_IamRolePolicyAttachment_F788B7D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-function/IamRolePolicyAttachment",
            "uniqueId": "aws-wing-function_IamRolePolicyAttachment_F788B7D7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.aws-wing-function_IamRole_705FDD7E.name}"
      }
    },
    "aws_lambda_function": {
      "aws-wing-function": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-function/Default",
            "uniqueId": "aws-wing-function"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "aws-wing-function-c8f4cdef",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "aws-wing-function-c8f4cdef",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.aws-wing-function_IamRole_705FDD7E.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.aws-wing-function_S3Object_9678073C.key}",
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
      "aws-wing-function_S3Object_9678073C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-function/S3Object",
            "uniqueId": "aws-wing-function_S3Object_9678073C"
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

