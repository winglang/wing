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
      "from_cron_ScheduleTarget-6ef03e_6E80671E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/ScheduleTarget-6ef03e",
            "uniqueId": "from_cron_ScheduleTarget-6ef03e_6E80671E"
          }
        },
        "arn": "${aws_lambda_function.from_cron_from_cron-OnTick-6ef03e_2B055B51.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.from_cron_Schedule_6C1613E8.name}"
      },
      "from_rate_ScheduleTarget-71e071_FCBD8F11": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/ScheduleTarget-71e071",
            "uniqueId": "from_rate_ScheduleTarget-71e071_FCBD8F11"
          }
        },
        "arn": "${aws_lambda_function.from_rate_from_rate-OnTick-71e071_24A15FD9.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.from_rate_Schedule_5B82E706.name}"
      }
    },
    "aws_cloudwatch_log_group": {
      "from_cron_from_cron-OnTick-6ef03e_CloudwatchLogGroup_D16CD77A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/from_cron-OnTick-6ef03e/CloudwatchLogGroup",
            "uniqueId": "from_cron_from_cron-OnTick-6ef03e_CloudwatchLogGroup_D16CD77A"
          }
        },
        "name": "/aws/lambda/from_cron-OnTick-6ef03e-c8269c21",
        "retention_in_days": 30
      },
      "from_rate_from_rate-OnTick-71e071_CloudwatchLogGroup_FCE9132F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/from_rate-OnTick-71e071/CloudwatchLogGroup",
            "uniqueId": "from_rate_from_rate-OnTick-71e071_CloudwatchLogGroup_FCE9132F"
          }
        },
        "name": "/aws/lambda/from_rate-OnTick-71e071-c8fea508",
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
      "from_cron_from_cron-OnTick-6ef03e_IamRole_EE7EBBD6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/from_cron-OnTick-6ef03e/IamRole",
            "uniqueId": "from_cron_from_cron-OnTick-6ef03e_IamRole_EE7EBBD6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "from_rate_from_rate-OnTick-71e071_IamRole_C9BA5324": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/from_rate-OnTick-71e071/IamRole",
            "uniqueId": "from_rate_from_rate-OnTick-71e071_IamRole_C9BA5324"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "from_cron_from_cron-OnTick-6ef03e_IamRolePolicy_EE67A0B3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/from_cron-OnTick-6ef03e/IamRolePolicy",
            "uniqueId": "from_cron_from_cron-OnTick-6ef03e_IamRolePolicy_EE67A0B3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.from_cron_from_cron-OnTick-6ef03e_IamRole_EE7EBBD6.name}"
      },
      "from_rate_from_rate-OnTick-71e071_IamRolePolicy_3181A152": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/from_rate-OnTick-71e071/IamRolePolicy",
            "uniqueId": "from_rate_from_rate-OnTick-71e071_IamRolePolicy_3181A152"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c2.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.from_rate_from_rate-OnTick-71e071_IamRole_C9BA5324.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "from_cron_from_cron-OnTick-6ef03e_IamRolePolicyAttachment_293E5B9F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/from_cron-OnTick-6ef03e/IamRolePolicyAttachment",
            "uniqueId": "from_cron_from_cron-OnTick-6ef03e_IamRolePolicyAttachment_293E5B9F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.from_cron_from_cron-OnTick-6ef03e_IamRole_EE7EBBD6.name}"
      },
      "from_rate_from_rate-OnTick-71e071_IamRolePolicyAttachment_40CDC6DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/from_rate-OnTick-71e071/IamRolePolicyAttachment",
            "uniqueId": "from_rate_from_rate-OnTick-71e071_IamRolePolicyAttachment_40CDC6DD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.from_rate_from_rate-OnTick-71e071_IamRole_C9BA5324.name}"
      }
    },
    "aws_lambda_function": {
      "from_cron_from_cron-OnTick-6ef03e_2B055B51": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/from_cron-OnTick-6ef03e/Default",
            "uniqueId": "from_cron_from_cron-OnTick-6ef03e_2B055B51"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_bca69a1d": "${aws_dynamodb_table.c1.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "from_cron-OnTick-6ef03e-c8269c21",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "from_cron-OnTick-6ef03e-c8269c21",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.from_cron_from_cron-OnTick-6ef03e_IamRole_EE7EBBD6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.from_cron_from_cron-OnTick-6ef03e_S3Object_E3DBED5B.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "from_rate_from_rate-OnTick-71e071_24A15FD9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/from_rate-OnTick-71e071/Default",
            "uniqueId": "from_rate_from_rate-OnTick-71e071_24A15FD9"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_7ba9f967": "${aws_dynamodb_table.c2.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "from_rate-OnTick-71e071-c8fea508",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "from_rate-OnTick-71e071-c8fea508",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.from_rate_from_rate-OnTick-71e071_IamRole_C9BA5324.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.from_rate_from_rate-OnTick-71e071_S3Object_C93F492C.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "from_cron_from_cron-OnTick-6ef03e_InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9_3AED39A5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/from_cron-OnTick-6ef03e/InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9",
            "uniqueId": "from_cron_from_cron-OnTick-6ef03e_InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9_3AED39A5"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.from_cron_from_cron-OnTick-6ef03e_2B055B51.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.from_cron_from_cron-OnTick-6ef03e_2B055B51.version}",
        "source_arn": "${aws_cloudwatch_event_rule.from_cron_Schedule_6C1613E8.arn}"
      },
      "from_rate_from_rate-OnTick-71e071_InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4_EE8FAEFD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/from_rate-OnTick-71e071/InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4",
            "uniqueId": "from_rate_from_rate-OnTick-71e071_InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4_EE8FAEFD"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.from_rate_from_rate-OnTick-71e071_24A15FD9.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.from_rate_from_rate-OnTick-71e071_24A15FD9.version}",
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
      "from_cron_from_cron-OnTick-6ef03e_S3Object_E3DBED5B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/from_cron-OnTick-6ef03e/S3Object",
            "uniqueId": "from_cron_from_cron-OnTick-6ef03e_S3Object_E3DBED5B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "from_rate_from_rate-OnTick-71e071_S3Object_C93F492C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/from_rate-OnTick-71e071/S3Object",
            "uniqueId": "from_rate_from_rate-OnTick-71e071_S3Object_C93F492C"
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

