# [section.test.w](../../../../../../tests/sdk_tests/ui/section.test.w) | compile | tf-aws

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
      "WidgetService_Button_Handler_CloudwatchLogGroup_A9F35A47": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/Button/Handler/CloudwatchLogGroup",
            "uniqueId": "WidgetService_Button_Handler_CloudwatchLogGroup_A9F35A47"
          }
        },
        "name": "/aws/lambda/Handler-c8ba9e97",
        "retention_in_days": 30
      },
      "WidgetService_Field_Handler_CloudwatchLogGroup_5D72B206": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/Field/Handler/CloudwatchLogGroup",
            "uniqueId": "WidgetService_Field_Handler_CloudwatchLogGroup_5D72B206"
          }
        },
        "name": "/aws/lambda/Handler-c8fa6fbe",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "WidgetService_Counter_07B65A41": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/Counter/Default",
            "uniqueId": "WidgetService_Counter_07B65A41"
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
        "name": "wing-counter-Counter-c8a52f2e"
      }
    },
    "aws_iam_role": {
      "WidgetService_Button_Handler_IamRole_B297B278": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/Button/Handler/IamRole",
            "uniqueId": "WidgetService_Button_Handler_IamRole_B297B278"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "WidgetService_Field_Handler_IamRole_A196F9F2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/Field/Handler/IamRole",
            "uniqueId": "WidgetService_Field_Handler_IamRole_A196F9F2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "WidgetService_Button_Handler_IamRolePolicy_6B60FF83": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/Button/Handler/IamRolePolicy",
            "uniqueId": "WidgetService_Button_Handler_IamRolePolicy_6B60FF83"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.WidgetService_Counter_07B65A41.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.WidgetService_Bucket_125C963C.arn}\",\"${aws_s3_bucket.WidgetService_Bucket_125C963C.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.WidgetService_Button_Handler_IamRole_B297B278.name}"
      },
      "WidgetService_Field_Handler_IamRolePolicy_4CA2797D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/Field/Handler/IamRolePolicy",
            "uniqueId": "WidgetService_Field_Handler_IamRolePolicy_4CA2797D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.WidgetService_Bucket_125C963C.arn}\",\"${aws_s3_bucket.WidgetService_Bucket_125C963C.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.WidgetService_Field_Handler_IamRole_A196F9F2.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "WidgetService_Button_Handler_IamRolePolicyAttachment_FFFE7BCD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/Button/Handler/IamRolePolicyAttachment",
            "uniqueId": "WidgetService_Button_Handler_IamRolePolicyAttachment_FFFE7BCD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.WidgetService_Button_Handler_IamRole_B297B278.name}"
      },
      "WidgetService_Field_Handler_IamRolePolicyAttachment_57C2FA54": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/Field/Handler/IamRolePolicyAttachment",
            "uniqueId": "WidgetService_Field_Handler_IamRolePolicyAttachment_57C2FA54"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.WidgetService_Field_Handler_IamRole_A196F9F2.name}"
      }
    },
    "aws_lambda_function": {
      "WidgetService_Button_Handler_23F2D2EE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/Button/Handler/Default",
            "uniqueId": "WidgetService_Button_Handler_23F2D2EE"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_d47f60fd": "${aws_s3_bucket.WidgetService_Bucket_125C963C.bucket}",
            "DYNAMODB_TABLE_NAME_e2f7658b": "${aws_dynamodb_table.WidgetService_Counter_07B65A41.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Handler-c8ba9e97",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8ba9e97",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.WidgetService_Button_Handler_IamRole_B297B278.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.WidgetService_Button_Handler_S3Object_277180FD.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "WidgetService_Field_Handler_0963A3DE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/Field/Handler/Default",
            "uniqueId": "WidgetService_Field_Handler_0963A3DE"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_d47f60fd": "${aws_s3_bucket.WidgetService_Bucket_125C963C.bucket}",
            "DYNAMODB_TABLE_NAME_e2f7658b": "${aws_dynamodb_table.WidgetService_Counter_07B65A41.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Handler-c8fa6fbe",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8fa6fbe",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.WidgetService_Field_Handler_IamRole_A196F9F2.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.WidgetService_Field_Handler_S3Object_9825B672.key}",
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
      "WidgetService_Bucket_125C963C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/Bucket/Default",
            "uniqueId": "WidgetService_Bucket_125C963C"
          }
        },
        "bucket_prefix": "bucket-c8203287-",
        "force_destroy": false
      }
    },
    "aws_s3_object": {
      "WidgetService_Button_Handler_S3Object_277180FD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/Button/Handler/S3Object",
            "uniqueId": "WidgetService_Button_Handler_S3Object_277180FD"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "WidgetService_Field_Handler_S3Object_9825B672": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/Field/Handler/S3Object",
            "uniqueId": "WidgetService_Field_Handler_S3Object_9825B672"
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

