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
      "from_cron_ScheduleTarget-fbff1d_5C15FEA9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/ScheduleTarget-fbff1d",
            "uniqueId": "from_cron_ScheduleTarget-fbff1d_5C15FEA9"
          }
        },
        "arn": "${aws_lambda_function.from_cron_from_cron-OnTick-fbff1d_99482C6A.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.from_cron_Schedule_6C1613E8.name}"
      },
      "from_rate_ScheduleTarget-982cfb_66748CEB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/ScheduleTarget-982cfb",
            "uniqueId": "from_rate_ScheduleTarget-982cfb_66748CEB"
          }
        },
        "arn": "${aws_lambda_function.from_rate_from_rate-OnTick-982cfb_79006A37.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.from_rate_Schedule_5B82E706.name}"
      }
    },
    "aws_cloudwatch_log_group": {
      "from_cron_from_cron-OnTick-fbff1d_CloudwatchLogGroup_3548DC8F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/from_cron-OnTick-fbff1d/CloudwatchLogGroup",
            "uniqueId": "from_cron_from_cron-OnTick-fbff1d_CloudwatchLogGroup_3548DC8F"
          }
        },
        "name": "/aws/lambda/from_cron-OnTick-fbff1d-c8172ec1",
        "retention_in_days": 30
      },
      "from_rate_from_rate-OnTick-982cfb_CloudwatchLogGroup_ACDD8047": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/from_rate-OnTick-982cfb/CloudwatchLogGroup",
            "uniqueId": "from_rate_from_rate-OnTick-982cfb_CloudwatchLogGroup_ACDD8047"
          }
        },
        "name": "/aws/lambda/from_rate-OnTick-982cfb-c8745854",
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
      "from_cron_from_cron-OnTick-fbff1d_IamRole_D34698C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/from_cron-OnTick-fbff1d/IamRole",
            "uniqueId": "from_cron_from_cron-OnTick-fbff1d_IamRole_D34698C8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "from_rate_from_rate-OnTick-982cfb_IamRole_CC3BA3B5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/from_rate-OnTick-982cfb/IamRole",
            "uniqueId": "from_rate_from_rate-OnTick-982cfb_IamRole_CC3BA3B5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "from_cron_from_cron-OnTick-fbff1d_IamRolePolicy_4D1336DF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/from_cron-OnTick-fbff1d/IamRolePolicy",
            "uniqueId": "from_cron_from_cron-OnTick-fbff1d_IamRolePolicy_4D1336DF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.from_cron_from_cron-OnTick-fbff1d_IamRole_D34698C8.name}"
      },
      "from_rate_from_rate-OnTick-982cfb_IamRolePolicy_DAFE3E9B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/from_rate-OnTick-982cfb/IamRolePolicy",
            "uniqueId": "from_rate_from_rate-OnTick-982cfb_IamRolePolicy_DAFE3E9B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c2.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.from_rate_from_rate-OnTick-982cfb_IamRole_CC3BA3B5.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "from_cron_from_cron-OnTick-fbff1d_IamRolePolicyAttachment_B9C1F682": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/from_cron-OnTick-fbff1d/IamRolePolicyAttachment",
            "uniqueId": "from_cron_from_cron-OnTick-fbff1d_IamRolePolicyAttachment_B9C1F682"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.from_cron_from_cron-OnTick-fbff1d_IamRole_D34698C8.name}"
      },
      "from_rate_from_rate-OnTick-982cfb_IamRolePolicyAttachment_694633CD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/from_rate-OnTick-982cfb/IamRolePolicyAttachment",
            "uniqueId": "from_rate_from_rate-OnTick-982cfb_IamRolePolicyAttachment_694633CD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.from_rate_from_rate-OnTick-982cfb_IamRole_CC3BA3B5.name}"
      }
    },
    "aws_lambda_function": {
      "from_cron_from_cron-OnTick-fbff1d_99482C6A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/from_cron-OnTick-fbff1d/Default",
            "uniqueId": "from_cron_from_cron-OnTick-fbff1d_99482C6A"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_bca69a1d": "${aws_dynamodb_table.c1.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "from_cron-OnTick-fbff1d-c8172ec1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "from_cron-OnTick-fbff1d-c8172ec1",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.from_cron_from_cron-OnTick-fbff1d_IamRole_D34698C8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.from_cron_from_cron-OnTick-fbff1d_S3Object_4C8EC41F.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "from_rate_from_rate-OnTick-982cfb_79006A37": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/from_rate-OnTick-982cfb/Default",
            "uniqueId": "from_rate_from_rate-OnTick-982cfb_79006A37"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_7ba9f967": "${aws_dynamodb_table.c2.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "from_rate-OnTick-982cfb-c8745854",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "from_rate-OnTick-982cfb-c8745854",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.from_rate_from_rate-OnTick-982cfb_IamRole_CC3BA3B5.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.from_rate_from_rate-OnTick-982cfb_S3Object_430A2B74.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "from_cron_from_cron-OnTick-fbff1d_InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9_081170D1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/from_cron-OnTick-fbff1d/InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9",
            "uniqueId": "from_cron_from_cron-OnTick-fbff1d_InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9_081170D1"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.from_cron_from_cron-OnTick-fbff1d_99482C6A.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.from_cron_from_cron-OnTick-fbff1d_99482C6A.version}",
        "source_arn": "${aws_cloudwatch_event_rule.from_cron_Schedule_6C1613E8.arn}"
      },
      "from_rate_from_rate-OnTick-982cfb_InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4_32C8269E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/from_rate-OnTick-982cfb/InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4",
            "uniqueId": "from_rate_from_rate-OnTick-982cfb_InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4_32C8269E"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.from_rate_from_rate-OnTick-982cfb_79006A37.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.from_rate_from_rate-OnTick-982cfb_79006A37.version}",
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
      "from_cron_from_cron-OnTick-fbff1d_S3Object_4C8EC41F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/from_cron-OnTick-fbff1d/S3Object",
            "uniqueId": "from_cron_from_cron-OnTick-fbff1d_S3Object_4C8EC41F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "from_rate_from_rate-OnTick-982cfb_S3Object_430A2B74": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/from_rate-OnTick-982cfb/S3Object",
            "uniqueId": "from_rate_from_rate-OnTick-982cfb_S3Object_430A2B74"
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

