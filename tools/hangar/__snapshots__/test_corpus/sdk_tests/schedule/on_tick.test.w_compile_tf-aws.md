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
      "from_cron_ScheduleTarget-cdafee6e_41C7782A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/ScheduleTarget-cdafee6e",
            "uniqueId": "from_cron_ScheduleTarget-cdafee6e_41C7782A"
          }
        },
        "arn": "${aws_lambda_function.from_cron-OnTick-cdafee6e.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.from_cron_Schedule_6C1613E8.name}"
      },
      "from_rate_ScheduleTarget-86898773_91268C49": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/ScheduleTarget-86898773",
            "uniqueId": "from_rate_ScheduleTarget-86898773_91268C49"
          }
        },
        "arn": "${aws_lambda_function.from_rate-OnTick-86898773.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.from_rate_Schedule_5B82E706.name}"
      }
    },
    "aws_cloudwatch_log_group": {
      "from_cron-OnTick-cdafee6e_CloudwatchLogGroup_D199F007": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/CloudwatchLogGroup",
            "uniqueId": "from_cron-OnTick-cdafee6e_CloudwatchLogGroup_D199F007"
          }
        },
        "name": "/aws/lambda/from_cron-OnTick-cdafee6e-c8a82a50",
        "retention_in_days": 30
      },
      "from_rate-OnTick-86898773_CloudwatchLogGroup_2B9D330F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/CloudwatchLogGroup",
            "uniqueId": "from_rate-OnTick-86898773_CloudwatchLogGroup_2B9D330F"
          }
        },
        "name": "/aws/lambda/from_rate-OnTick-86898773-c8fb9fa6",
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
      "from_cron-OnTick-cdafee6e_IamRole_E3633395": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/IamRole",
            "uniqueId": "from_cron-OnTick-cdafee6e_IamRole_E3633395"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "from_rate-OnTick-86898773_IamRole_0C967FAF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/IamRole",
            "uniqueId": "from_rate-OnTick-86898773_IamRole_0C967FAF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "from_cron-OnTick-cdafee6e_IamRolePolicy_29BCA338": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/IamRolePolicy",
            "uniqueId": "from_cron-OnTick-cdafee6e_IamRolePolicy_29BCA338"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.from_cron-OnTick-cdafee6e_IamRole_E3633395.name}"
      },
      "from_rate-OnTick-86898773_IamRolePolicy_4E5A4115": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/IamRolePolicy",
            "uniqueId": "from_rate-OnTick-86898773_IamRolePolicy_4E5A4115"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c2.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.from_rate-OnTick-86898773_IamRole_0C967FAF.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "from_cron-OnTick-cdafee6e_IamRolePolicyAttachment_C58E382F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "from_cron-OnTick-cdafee6e_IamRolePolicyAttachment_C58E382F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.from_cron-OnTick-cdafee6e_IamRole_E3633395.name}"
      },
      "from_rate-OnTick-86898773_IamRolePolicyAttachment_A9498CA5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/IamRolePolicyAttachment",
            "uniqueId": "from_rate-OnTick-86898773_IamRolePolicyAttachment_A9498CA5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.from_rate-OnTick-86898773_IamRole_0C967FAF.name}"
      }
    },
    "aws_lambda_function": {
      "from_cron-OnTick-cdafee6e": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/Default",
            "uniqueId": "from_cron-OnTick-cdafee6e"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_bca69a1d": "${aws_dynamodb_table.c1.name}",
            "WING_FUNCTION_NAME": "from_cron-OnTick-cdafee6e-c8a82a50",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "from_cron-OnTick-cdafee6e-c8a82a50",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.from_cron-OnTick-cdafee6e_IamRole_E3633395.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.from_cron-OnTick-cdafee6e_S3Object_0845743D.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "from_rate-OnTick-86898773": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/Default",
            "uniqueId": "from_rate-OnTick-86898773"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_7ba9f967": "${aws_dynamodb_table.c2.name}",
            "WING_FUNCTION_NAME": "from_rate-OnTick-86898773-c8fb9fa6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "from_rate-OnTick-86898773-c8fb9fa6",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.from_rate-OnTick-86898773_IamRole_0C967FAF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.from_rate-OnTick-86898773_S3Object_68EB6CB9.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "from_cron-OnTick-cdafee6e_InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9_5F48CFEA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9",
            "uniqueId": "from_cron-OnTick-cdafee6e_InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9_5F48CFEA"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.from_cron-OnTick-cdafee6e.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.from_cron-OnTick-cdafee6e.version}",
        "source_arn": "${aws_cloudwatch_event_rule.from_cron_Schedule_6C1613E8.arn}"
      },
      "from_rate-OnTick-86898773_InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4_50324BC1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4",
            "uniqueId": "from_rate-OnTick-86898773_InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4_50324BC1"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.from_rate-OnTick-86898773.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.from_rate-OnTick-86898773.version}",
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
      "from_cron-OnTick-cdafee6e_S3Object_0845743D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/S3Object",
            "uniqueId": "from_cron-OnTick-cdafee6e_S3Object_0845743D"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "from_rate-OnTick-86898773_S3Object_68EB6CB9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/S3Object",
            "uniqueId": "from_rate-OnTick-86898773_S3Object_68EB6CB9"
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

