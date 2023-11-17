# [on_tick.test.w](../../../../../../examples/tests/sdk_tests/schedule/on_tick.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
    },
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_event_rule": {
      "from_cron_Schedule_6C1613E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/Schedule",
            "uniqueId": "from_cron_Schedule_6C1613E8"
          }
        },
        "is_enabled": true,
        "schedule_expression": "cron(* * * * ? *)"
      },
      "from_rate_Schedule_5B82E706": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/Schedule",
            "uniqueId": "from_rate_Schedule_5B82E706"
          }
        },
        "is_enabled": true,
        "schedule_expression": "rate(1 minute)"
      }
    },
    "aws_cloudwatch_event_target": {
      "from_cron_ScheduleTarget-Closure1_EC4C6D85": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/ScheduleTarget-$Closure1",
            "uniqueId": "from_cron_ScheduleTarget-Closure1_EC4C6D85"
          }
        },
        "arn": "${aws_lambda_function.from_cron-OnTick-Closure1.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.from_cron_Schedule_6C1613E8.name}"
      },
      "from_rate_ScheduleTarget-Closure2_7787BA0A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/ScheduleTarget-$Closure2",
            "uniqueId": "from_rate_ScheduleTarget-Closure2_7787BA0A"
          }
        },
        "arn": "${aws_lambda_function.from_rate-OnTick-Closure2.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.from_rate_Schedule_5B82E706.name}"
      }
    },
    "aws_cloudwatch_log_group": {
      "from_cron-OnTick-Closure1_CloudwatchLogGroup_F401EC50": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-$Closure1/CloudwatchLogGroup",
            "uniqueId": "from_cron-OnTick-Closure1_CloudwatchLogGroup_F401EC50"
          }
        },
        "name": "/aws/lambda/from_cron-OnTick--Closure1-c8f6fa49",
        "retention_in_days": 30
      },
      "from_rate-OnTick-Closure2_CloudwatchLogGroup_6D9D90D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-$Closure2/CloudwatchLogGroup",
            "uniqueId": "from_rate-OnTick-Closure2_CloudwatchLogGroup_6D9D90D0"
          }
        },
        "name": "/aws/lambda/from_rate-OnTick--Closure2-c87b0d0b",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "c1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/c1/Default",
            "uniqueId": "c1"
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
        "name": "wing-counter-c1-c8b6c50f"
      },
      "c2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/c2/Default",
            "uniqueId": "c2"
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
        "name": "wing-counter-c2-c81701d2"
      }
    },
    "aws_iam_role": {
      "from_cron-OnTick-Closure1_IamRole_F73FA11F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-$Closure1/IamRole",
            "uniqueId": "from_cron-OnTick-Closure1_IamRole_F73FA11F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "from_rate-OnTick-Closure2_IamRole_AF2FA313": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-$Closure2/IamRole",
            "uniqueId": "from_rate-OnTick-Closure2_IamRole_AF2FA313"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "from_cron-OnTick-Closure1_IamRolePolicy_AC358D9F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-$Closure1/IamRolePolicy",
            "uniqueId": "from_cron-OnTick-Closure1_IamRolePolicy_AC358D9F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.from_cron-OnTick-Closure1_IamRole_F73FA11F.name}"
      },
      "from_rate-OnTick-Closure2_IamRolePolicy_C4E85242": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-$Closure2/IamRolePolicy",
            "uniqueId": "from_rate-OnTick-Closure2_IamRolePolicy_C4E85242"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c2.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.from_rate-OnTick-Closure2_IamRole_AF2FA313.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "from_cron-OnTick-Closure1_IamRolePolicyAttachment_D56CFC97": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-$Closure1/IamRolePolicyAttachment",
            "uniqueId": "from_cron-OnTick-Closure1_IamRolePolicyAttachment_D56CFC97"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.from_cron-OnTick-Closure1_IamRole_F73FA11F.name}"
      },
      "from_rate-OnTick-Closure2_IamRolePolicyAttachment_63D5454A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-$Closure2/IamRolePolicyAttachment",
            "uniqueId": "from_rate-OnTick-Closure2_IamRolePolicyAttachment_63D5454A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.from_rate-OnTick-Closure2_IamRole_AF2FA313.name}"
      }
    },
    "aws_lambda_function": {
      "from_cron-OnTick-Closure1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-$Closure1/Default",
            "uniqueId": "from_cron-OnTick-Closure1"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_bca69a1d": "${aws_dynamodb_table.c1.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "from_cron-OnTick--Closure1-c8f6fa49",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "from_cron-OnTick--Closure1-c8f6fa49",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.from_cron-OnTick-Closure1_IamRole_F73FA11F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.from_cron-OnTick-Closure1_S3Object_46F660BE.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "from_rate-OnTick-Closure2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-$Closure2/Default",
            "uniqueId": "from_rate-OnTick-Closure2"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_7ba9f967": "${aws_dynamodb_table.c2.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "from_rate-OnTick--Closure2-c87b0d0b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "from_rate-OnTick--Closure2-c87b0d0b",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.from_rate-OnTick-Closure2_IamRole_AF2FA313.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.from_rate-OnTick-Closure2_S3Object_109CB3A5.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "from_cron-OnTick-Closure1_InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9_7AB9065C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-$Closure1/InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9",
            "uniqueId": "from_cron-OnTick-Closure1_InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9_7AB9065C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.from_cron-OnTick-Closure1.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.from_cron-OnTick-Closure1.version}",
        "source_arn": "${aws_cloudwatch_event_rule.from_cron_Schedule_6C1613E8.arn}"
      },
      "from_rate-OnTick-Closure2_InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4_6C217A43": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-$Closure2/InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4",
            "uniqueId": "from_rate-OnTick-Closure2_InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4_6C217A43"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.from_rate-OnTick-Closure2.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.from_rate-OnTick-Closure2.version}",
        "source_arn": "${aws_cloudwatch_event_rule.from_rate_Schedule_5B82E706.arn}"
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
      "from_cron-OnTick-Closure1_S3Object_46F660BE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-$Closure1/S3Object",
            "uniqueId": "from_cron-OnTick-Closure1_S3Object_46F660BE"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "from_rate-OnTick-Closure2_S3Object_109CB3A5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-$Closure2/S3Object",
            "uniqueId": "from_rate-OnTick-Closure2_S3Object_109CB3A5"
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

