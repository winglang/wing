# [on_tick.test.w](../../../../../../examples/tests/sdk_tests/schedule/on_tick.test.w) | compile | tf-aws

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
    "aws_cloudwatch_event_rule": {
      "from_cron_Schedule_6C1613E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/Schedule",
            "uniqueId": "from_cron_Schedule_6C1613E8"
          }
        },
        "schedule_expression": "cron(* * * * ? *)"
      },
      "from_rate_Schedule_5B82E706": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/Schedule",
            "uniqueId": "from_rate_Schedule_5B82E706"
          }
        },
        "schedule_expression": "rate(1 minute)"
      }
    },
    "aws_cloudwatch_event_target": {
      "from_cron_ScheduleTarget0_7A4E7226": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/ScheduleTarget0",
            "uniqueId": "from_cron_ScheduleTarget0_7A4E7226"
          }
        },
        "arn": "${aws_lambda_function.from_cron_OnTick0_6029AF44.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.from_cron_Schedule_6C1613E8.name}"
      },
      "from_rate_ScheduleTarget0_35951CD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/ScheduleTarget0",
            "uniqueId": "from_rate_ScheduleTarget0_35951CD0"
          }
        },
        "arn": "${aws_lambda_function.from_rate_OnTick0_1B33F073.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.from_rate_Schedule_5B82E706.name}"
      }
    },
    "aws_cloudwatch_log_group": {
      "from_cron_OnTick0_CloudwatchLogGroup_2763AA6C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/CloudwatchLogGroup",
            "uniqueId": "from_cron_OnTick0_CloudwatchLogGroup_2763AA6C"
          }
        },
        "name": "/aws/lambda/OnTick0-c82d2f1d",
        "retention_in_days": 30
      },
      "from_rate_OnTick0_CloudwatchLogGroup_051D0516": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/CloudwatchLogGroup",
            "uniqueId": "from_rate_OnTick0_CloudwatchLogGroup_051D0516"
          }
        },
        "name": "/aws/lambda/OnTick0-c82ff92a",
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
      "from_cron_OnTick0_IamRole_70AA37F2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/IamRole",
            "uniqueId": "from_cron_OnTick0_IamRole_70AA37F2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "from_rate_OnTick0_IamRole_A7066F91": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/IamRole",
            "uniqueId": "from_rate_OnTick0_IamRole_A7066F91"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "from_cron_OnTick0_IamRolePolicy_6E9071E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/IamRolePolicy",
            "uniqueId": "from_cron_OnTick0_IamRolePolicy_6E9071E3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.from_cron_OnTick0_IamRole_70AA37F2.name}"
      },
      "from_rate_OnTick0_IamRolePolicy_5036BC29": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/IamRolePolicy",
            "uniqueId": "from_rate_OnTick0_IamRolePolicy_5036BC29"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c2.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.from_rate_OnTick0_IamRole_A7066F91.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "from_cron_OnTick0_IamRolePolicyAttachment_9E04D949": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/IamRolePolicyAttachment",
            "uniqueId": "from_cron_OnTick0_IamRolePolicyAttachment_9E04D949"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.from_cron_OnTick0_IamRole_70AA37F2.name}"
      },
      "from_rate_OnTick0_IamRolePolicyAttachment_548892FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/IamRolePolicyAttachment",
            "uniqueId": "from_rate_OnTick0_IamRolePolicyAttachment_548892FB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.from_rate_OnTick0_IamRole_A7066F91.name}"
      }
    },
    "aws_lambda_function": {
      "from_cron_OnTick0_6029AF44": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/Default",
            "uniqueId": "from_cron_OnTick0_6029AF44"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_bca69a1d": "${aws_dynamodb_table.c1.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "OnTick0-c82d2f1d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "OnTick0-c82d2f1d",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.from_cron_OnTick0_IamRole_70AA37F2.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.from_cron_OnTick0_S3Object_0A802C5C.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "from_rate_OnTick0_1B33F073": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/Default",
            "uniqueId": "from_rate_OnTick0_1B33F073"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_7ba9f967": "${aws_dynamodb_table.c2.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "OnTick0-c82ff92a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "OnTick0-c82ff92a",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.from_rate_OnTick0_IamRole_A7066F91.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.from_rate_OnTick0_S3Object_C6F96441.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "from_cron_OnTick0_InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9_77879B23": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9",
            "uniqueId": "from_cron_OnTick0_InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9_77879B23"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.from_cron_OnTick0_6029AF44.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.from_cron_OnTick0_6029AF44.version}",
        "source_arn": "${aws_cloudwatch_event_rule.from_cron_Schedule_6C1613E8.arn}"
      },
      "from_rate_OnTick0_InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4_FED6D620": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4",
            "uniqueId": "from_rate_OnTick0_InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4_FED6D620"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.from_rate_OnTick0_1B33F073.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.from_rate_OnTick0_1B33F073.version}",
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
      "from_cron_OnTick0_S3Object_0A802C5C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/S3Object",
            "uniqueId": "from_cron_OnTick0_S3Object_0A802C5C"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "from_rate_OnTick0_S3Object_C6F96441": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/S3Object",
            "uniqueId": "from_rate_OnTick0_S3Object_C6F96441"
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

