# [dead-letter-queue.test.w](../../../../../../tests/sdk_tests/queue/dead-letter-queue.test.w) | compile | tf-aws

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
      "queuewithoutretries-SetConsumer0_CloudwatchLogGroup_9265B40C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue without retries-SetConsumer0/CloudwatchLogGroup",
            "uniqueId": "queuewithoutretries-SetConsumer0_CloudwatchLogGroup_9265B40C"
          }
        },
        "name": "/aws/lambda/queue-without-retries-SetConsumer0-c8ba2958",
        "retention_in_days": 30
      },
      "queuewithretries-SetConsumer0_CloudwatchLogGroup_98D9A088": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue with retries-SetConsumer0/CloudwatchLogGroup",
            "uniqueId": "queuewithretries-SetConsumer0_CloudwatchLogGroup_98D9A088"
          }
        },
        "name": "/aws/lambda/queue-with-retries-SetConsumer0-c82b1a26",
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
      "queuewithoutretries-SetConsumer0_IamRole_F76F585E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue without retries-SetConsumer0/IamRole",
            "uniqueId": "queuewithoutretries-SetConsumer0_IamRole_F76F585E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "queuewithretries-SetConsumer0_IamRole_B95C0A26": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue with retries-SetConsumer0/IamRole",
            "uniqueId": "queuewithretries-SetConsumer0_IamRole_B95C0A26"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "queuewithoutretries-SetConsumer0_IamRolePolicy_2603CFA0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue without retries-SetConsumer0/IamRolePolicy",
            "uniqueId": "queuewithoutretries-SetConsumer0_IamRolePolicy_2603CFA0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.queuewithoutretries.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.queuewithoutretries-SetConsumer0_IamRole_F76F585E.name}"
      },
      "queuewithretries-SetConsumer0_IamRolePolicy_245846E1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue with retries-SetConsumer0/IamRolePolicy",
            "uniqueId": "queuewithretries-SetConsumer0_IamRolePolicy_245846E1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.queuewithretries.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.queuewithretries-SetConsumer0_IamRole_B95C0A26.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "queuewithoutretries-SetConsumer0_IamRolePolicyAttachment_559EECE4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue without retries-SetConsumer0/IamRolePolicyAttachment",
            "uniqueId": "queuewithoutretries-SetConsumer0_IamRolePolicyAttachment_559EECE4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.queuewithoutretries-SetConsumer0_IamRole_F76F585E.name}"
      },
      "queuewithretries-SetConsumer0_IamRolePolicyAttachment_831C8294": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue with retries-SetConsumer0/IamRolePolicyAttachment",
            "uniqueId": "queuewithretries-SetConsumer0_IamRolePolicyAttachment_831C8294"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.queuewithretries-SetConsumer0_IamRole_B95C0A26.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "queuewithoutretries_EventSourceMapping_963C2B4C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue without retries/EventSourceMapping",
            "uniqueId": "queuewithoutretries_EventSourceMapping_963C2B4C"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.queuewithoutretries.arn}",
        "function_name": "${aws_lambda_function.queuewithoutretries-SetConsumer0.function_name}",
        "function_response_types": [
          "ReportBatchItemFailures"
        ]
      },
      "queuewithretries_EventSourceMapping_A0EC80F3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue with retries/EventSourceMapping",
            "uniqueId": "queuewithretries_EventSourceMapping_A0EC80F3"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.queuewithretries.arn}",
        "function_name": "${aws_lambda_function.queuewithretries-SetConsumer0.function_name}",
        "function_response_types": [
          "ReportBatchItemFailures"
        ]
      }
    },
    "aws_lambda_function": {
      "queuewithoutretries-SetConsumer0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue without retries-SetConsumer0/Default",
            "uniqueId": "queuewithoutretries-SetConsumer0"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "queue-without-retries-SetConsumer0-c8ba2958",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "queue-without-retries-SetConsumer0-c8ba2958",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.queuewithoutretries-SetConsumer0_IamRole_F76F585E.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.queuewithoutretries-SetConsumer0_S3Object_ECD1395D.key}",
        "timeout": "${aws_sqs_queue.queuewithoutretries.visibility_timeout_seconds}",
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "queuewithretries-SetConsumer0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue with retries-SetConsumer0/Default",
            "uniqueId": "queuewithretries-SetConsumer0"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "queue-with-retries-SetConsumer0-c82b1a26",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "queue-with-retries-SetConsumer0-c82b1a26",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.queuewithretries-SetConsumer0_IamRole_B95C0A26.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.queuewithretries-SetConsumer0_S3Object_29ED03EE.key}",
        "timeout": "${aws_sqs_queue.queuewithretries.visibility_timeout_seconds}",
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
      "queuewithoutretries-SetConsumer0_S3Object_ECD1395D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue without retries-SetConsumer0/S3Object",
            "uniqueId": "queuewithoutretries-SetConsumer0_S3Object_ECD1395D"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "queuewithretries-SetConsumer0_S3Object_29ED03EE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue with retries-SetConsumer0/S3Object",
            "uniqueId": "queuewithretries-SetConsumer0_S3Object_29ED03EE"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "dlqwithoutretries": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/dlq without retries/Default",
            "uniqueId": "dlqwithoutretries"
          }
        },
        "message_retention_seconds": 3600,
        "name": "dlq-without-retries-c83c0330",
        "visibility_timeout_seconds": 30
      },
      "dlqwithretries": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/dlq with retries/Default",
            "uniqueId": "dlqwithretries"
          }
        },
        "message_retention_seconds": 3600,
        "name": "dlq-with-retries-c877f5c7",
        "visibility_timeout_seconds": 30
      },
      "queuewithoutretries": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue without retries/Default",
            "uniqueId": "queuewithoutretries"
          }
        },
        "message_retention_seconds": 3600,
        "name": "queue-without-retries-c8a5001c",
        "redrive_policy": "{\"deadLetterTargetArn\":\"${aws_sqs_queue.dlqwithoutretries.arn}\",\"maxReceiveCount\":1}",
        "visibility_timeout_seconds": 30
      },
      "queuewithretries": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/queue with retries/Default",
            "uniqueId": "queuewithretries"
          }
        },
        "message_retention_seconds": 3600,
        "name": "queue-with-retries-c8a06dc7",
        "redrive_policy": "{\"deadLetterTargetArn\":\"${aws_sqs_queue.dlqwithretries.arn}\",\"maxReceiveCount\":2}",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

