# [logging.test.w](../../../../../../examples/tests/sdk_tests/function/logging.test.w) | compile | tf-aws

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
      "f1_CloudwatchLogGroup_9EB92E4A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f1/CloudwatchLogGroup",
            "uniqueId": "f1_CloudwatchLogGroup_9EB92E4A"
          }
        },
        "name": "/aws/lambda/f1-c8545025",
        "retention_in_days": 30
      },
      "f2_CloudwatchLogGroup_D231AE41": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/CloudwatchLogGroup",
            "uniqueId": "f2_CloudwatchLogGroup_D231AE41"
          }
        },
        "name": "/aws/lambda/f2-c812cd39",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "f1_IamRole_FD68C58F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f1/IamRole",
            "uniqueId": "f1_IamRole_FD68C58F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "f2_IamRole_B66911B2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/IamRole",
            "uniqueId": "f2_IamRole_B66911B2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "f1_IamRolePolicy_DAEEDBF2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f1/IamRolePolicy",
            "uniqueId": "f1_IamRolePolicy_DAEEDBF2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.f1_IamRole_FD68C58F.name}"
      },
      "f2_IamRolePolicy_4B68F2E2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/IamRolePolicy",
            "uniqueId": "f2_IamRolePolicy_4B68F2E2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.f1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.f2_IamRole_B66911B2.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "f1_IamRolePolicyAttachment_39B6759B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f1/IamRolePolicyAttachment",
            "uniqueId": "f1_IamRolePolicyAttachment_39B6759B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.f1_IamRole_FD68C58F.name}"
      },
      "f2_IamRolePolicyAttachment_E65452F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/IamRolePolicyAttachment",
            "uniqueId": "f2_IamRolePolicyAttachment_E65452F9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.f2_IamRole_B66911B2.name}"
      }
    },
    "aws_lambda_function": {
      "f1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f1/Default",
            "uniqueId": "f1"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "f1-c8545025",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "f1-c8545025",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.f1_IamRole_FD68C58F.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.f1_S3Object_9A84AD47.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "f2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/Default",
            "uniqueId": "f2"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "FUNCTION_NAME_09b8c606": "${aws_lambda_function.f1.arn}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "f2-c812cd39",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "f2-c812cd39",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.f2_IamRole_B66911B2.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.f2_S3Object_ABE842D7.key}",
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
      "f1_S3Object_9A84AD47": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f1/S3Object",
            "uniqueId": "f1_S3Object_9A84AD47"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "f2_S3Object_ABE842D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/S3Object",
            "uniqueId": "f2_S3Object_ABE842D7"
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

