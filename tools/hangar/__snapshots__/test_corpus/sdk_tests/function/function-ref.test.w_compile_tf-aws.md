# [function-ref.test.w](../../../../../../examples/tests/sdk_tests/function/function-ref.test.w) | compile | tf-aws

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
      "FunctionRef_AwsConsoleField_Handler_CloudwatchLogGroup_581C1C72": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/FunctionRef/AwsConsoleField/Handler/CloudwatchLogGroup",
            "uniqueId": "FunctionRef_AwsConsoleField_Handler_CloudwatchLogGroup_581C1C72"
          }
        },
        "name": "/aws/lambda/Handler-c89bc30b",
        "retention_in_days": 30
      },
      "FunctionRef_FunctionArnField_Handler_CloudwatchLogGroup_E3CD3CB7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/FunctionRef/FunctionArnField/Handler/CloudwatchLogGroup",
            "uniqueId": "FunctionRef_FunctionArnField_Handler_CloudwatchLogGroup_E3CD3CB7"
          }
        },
        "name": "/aws/lambda/Handler-c8f37d21",
        "retention_in_days": 30
      },
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
      "FunctionRef_AwsConsoleField_Handler_IamRole_8EE0F0F7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/FunctionRef/AwsConsoleField/Handler/IamRole",
            "uniqueId": "FunctionRef_AwsConsoleField_Handler_IamRole_8EE0F0F7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "FunctionRef_FunctionArnField_Handler_IamRole_87E7076C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/FunctionRef/FunctionArnField/Handler/IamRole",
            "uniqueId": "FunctionRef_FunctionArnField_Handler_IamRole_87E7076C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
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
      "FunctionRef_AwsConsoleField_Handler_IamRolePolicy_30297616": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/FunctionRef/AwsConsoleField/Handler/IamRolePolicy",
            "uniqueId": "FunctionRef_AwsConsoleField_Handler_IamRolePolicy_30297616"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.FunctionRef_AwsConsoleField_Handler_IamRole_8EE0F0F7.name}"
      },
      "FunctionRef_FunctionArnField_Handler_IamRolePolicy_977A3750": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/FunctionRef/FunctionArnField/Handler/IamRolePolicy",
            "uniqueId": "FunctionRef_FunctionArnField_Handler_IamRolePolicy_977A3750"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.FunctionRef_FunctionArnField_Handler_IamRole_87E7076C.name}"
      },
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
      "FunctionRef_AwsConsoleField_Handler_IamRolePolicyAttachment_43AA1BA7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/FunctionRef/AwsConsoleField/Handler/IamRolePolicyAttachment",
            "uniqueId": "FunctionRef_AwsConsoleField_Handler_IamRolePolicyAttachment_43AA1BA7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.FunctionRef_AwsConsoleField_Handler_IamRole_8EE0F0F7.name}"
      },
      "FunctionRef_FunctionArnField_Handler_IamRolePolicyAttachment_CDD3A846": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/FunctionRef/FunctionArnField/Handler/IamRolePolicyAttachment",
            "uniqueId": "FunctionRef_FunctionArnField_Handler_IamRolePolicyAttachment_CDD3A846"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.FunctionRef_FunctionArnField_Handler_IamRole_87E7076C.name}"
      },
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
      },
      "FunctionRef_AwsConsoleField_Handler_69607D0B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/FunctionRef/AwsConsoleField/Handler/Default",
            "uniqueId": "FunctionRef_AwsConsoleField_Handler_69607D0B"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "FUNCTION_NAME_24dc8580": "${aws_lambda_function.Function.arn}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Handler-c89bc30b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c89bc30b",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.FunctionRef_AwsConsoleField_Handler_IamRole_8EE0F0F7.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.FunctionRef_AwsConsoleField_Handler_S3Object_B6D5E5AC.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "FunctionRef_FunctionArnField_Handler_929A1EF9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/FunctionRef/FunctionArnField/Handler/Default",
            "uniqueId": "FunctionRef_FunctionArnField_Handler_929A1EF9"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Handler-c8f37d21",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_15": "${jsonencode(aws_lambda_function.Function.arn)}"
          }
        },
        "function_name": "Handler-c8f37d21",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.FunctionRef_FunctionArnField_Handler_IamRole_87E7076C.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.FunctionRef_FunctionArnField_Handler_S3Object_EA8F335F.key}",
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
      "FunctionRef_AwsConsoleField_Handler_S3Object_B6D5E5AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/FunctionRef/AwsConsoleField/Handler/S3Object",
            "uniqueId": "FunctionRef_AwsConsoleField_Handler_S3Object_B6D5E5AC"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "FunctionRef_FunctionArnField_Handler_S3Object_EA8F335F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/FunctionRef/FunctionArnField/Handler/S3Object",
            "uniqueId": "FunctionRef_FunctionArnField_Handler_S3Object_EA8F335F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
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

