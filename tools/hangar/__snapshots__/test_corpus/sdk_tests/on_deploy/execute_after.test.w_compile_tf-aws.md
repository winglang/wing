# [execute_after.test.w](../../../../../../examples/tests/sdk_tests/on_deploy/execute_after.test.w) | compile | tf-aws

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
  "data": {
    "aws_lambda_invocation": {
      "init1_Invocation_64AF0CEF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init1/Invocation",
            "uniqueId": "init1_Invocation_64AF0CEF"
          }
        },
        "depends_on": [],
        "function_name": "${aws_lambda_function.init1_Function_9744E65A.function_name}",
        "input": "{}"
      },
      "init2_Invocation_41E0F70A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init2/Invocation",
            "uniqueId": "init2_Invocation_41E0F70A"
          }
        },
        "depends_on": [
          "aws_s3_object.init1_Function_S3Object_EFA6F99F",
          "aws_iam_role.init1_Function_IamRole_3B884CB0",
          "aws_iam_role_policy.init1_Function_IamRolePolicy_19694F39",
          "aws_iam_role_policy_attachment.init1_Function_IamRolePolicyAttachment_96AFCA54",
          "aws_cloudwatch_log_group.init1_Function_CloudwatchLogGroup_8ECB5A4E",
          "aws_lambda_function.init1_Function_9744E65A",
          "data.aws_lambda_invocation.init1_Invocation_64AF0CEF"
        ],
        "function_name": "${aws_lambda_function.init2_Function_C6177D5D.function_name}",
        "input": "{}"
      }
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "init1_Function_CloudwatchLogGroup_8ECB5A4E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init1/Function/CloudwatchLogGroup",
            "uniqueId": "init1_Function_CloudwatchLogGroup_8ECB5A4E"
          }
        },
        "name": "/aws/lambda/Function-c899c2a8",
        "retention_in_days": 30
      },
      "init2_Function_CloudwatchLogGroup_7C2853C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init2/Function/CloudwatchLogGroup",
            "uniqueId": "init2_Function_CloudwatchLogGroup_7C2853C0"
          }
        },
        "name": "/aws/lambda/Function-c86c3d88",
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
      "init1_Function_IamRole_3B884CB0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init1/Function/IamRole",
            "uniqueId": "init1_Function_IamRole_3B884CB0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "init2_Function_IamRole_A05B341B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init2/Function/IamRole",
            "uniqueId": "init2_Function_IamRole_A05B341B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "init1_Function_IamRolePolicy_19694F39": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init1/Function/IamRolePolicy",
            "uniqueId": "init1_Function_IamRolePolicy_19694F39"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.init1_Function_IamRole_3B884CB0.name}"
      },
      "init2_Function_IamRolePolicy_BC283A7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init2/Function/IamRolePolicy",
            "uniqueId": "init2_Function_IamRolePolicy_BC283A7E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.init2_Function_IamRole_A05B341B.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "init1_Function_IamRolePolicyAttachment_96AFCA54": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init1/Function/IamRolePolicyAttachment",
            "uniqueId": "init1_Function_IamRolePolicyAttachment_96AFCA54"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.init1_Function_IamRole_3B884CB0.name}"
      },
      "init2_Function_IamRolePolicyAttachment_7FD747D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init2/Function/IamRolePolicyAttachment",
            "uniqueId": "init2_Function_IamRolePolicyAttachment_7FD747D7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.init2_Function_IamRole_A05B341B.name}"
      }
    },
    "aws_lambda_function": {
      "init1_Function_9744E65A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init1/Function/Default",
            "uniqueId": "init1_Function_9744E65A"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Function-c899c2a8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Function-c899c2a8",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.init1_Function_IamRole_3B884CB0.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.init1_Function_S3Object_EFA6F99F.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "init2_Function_C6177D5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init2/Function/Default",
            "uniqueId": "init2_Function_C6177D5D"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Function-c86c3d88",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Function-c86c3d88",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.init2_Function_IamRole_A05B341B.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.init2_Function_S3Object_8A53C74F.key}",
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
      "init1_Function_S3Object_EFA6F99F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init1/Function/S3Object",
            "uniqueId": "init1_Function_S3Object_EFA6F99F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "init2_Function_S3Object_8A53C74F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init2/Function/S3Object",
            "uniqueId": "init2_Function_S3Object_8A53C74F"
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

