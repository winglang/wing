# [set_consumer.test.w](../../../../../../examples/tests/sdk_tests/queue/set_consumer.test.w) | compile | tf-aws

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
      "Queue-SetConsumer0_CloudwatchLogGroup_56C2891C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/CloudwatchLogGroup",
            "uniqueId": "Queue-SetConsumer0_CloudwatchLogGroup_56C2891C"
          }
        },
        "name": "/aws/lambda/Queue-SetConsumer0-c83c303c",
        "retention_in_days": 30
      },
      "q2-SetConsumer0_CloudwatchLogGroup_A9ABA3A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q2-SetConsumer0/CloudwatchLogGroup",
            "uniqueId": "q2-SetConsumer0_CloudwatchLogGroup_A9ABA3A4"
          }
        },
        "name": "/aws/lambda/q2-SetConsumer0-c8ba098b",
        "retention_in_days": 30
      },
      "q3-SetConsumer0_CloudwatchLogGroup_1FE8714D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q3-SetConsumer0/CloudwatchLogGroup",
            "uniqueId": "q3-SetConsumer0_CloudwatchLogGroup_1FE8714D"
          }
        },
        "name": "/aws/lambda/q3-SetConsumer0-c8cd013e",
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
      },
      "c3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/c3/Default",
            "uniqueId": "c3"
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
        "name": "wing-counter-c3-c893f3c2"
      }
    },
    "aws_iam_role": {
      "Queue-SetConsumer0_IamRole_7F9ED9ED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/IamRole",
            "uniqueId": "Queue-SetConsumer0_IamRole_7F9ED9ED"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "q2-SetConsumer0_IamRole_910A96B5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q2-SetConsumer0/IamRole",
            "uniqueId": "q2-SetConsumer0_IamRole_910A96B5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "q3-SetConsumer0_IamRole_2934E47C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q3-SetConsumer0/IamRole",
            "uniqueId": "q3-SetConsumer0_IamRole_2934E47C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Queue-SetConsumer0_IamRolePolicy_0299B5AB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/IamRolePolicy",
            "uniqueId": "Queue-SetConsumer0_IamRolePolicy_0299B5AB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.Queue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Queue-SetConsumer0_IamRole_7F9ED9ED.name}"
      },
      "q2-SetConsumer0_IamRolePolicy_4F213331": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q2-SetConsumer0/IamRolePolicy",
            "uniqueId": "q2-SetConsumer0_IamRolePolicy_4F213331"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.q2.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c2.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:GetQueueUrl\"],\"Resource\":[\"${aws_sqs_queue.q2.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.q2.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.q2-SetConsumer0_IamRole_910A96B5.name}"
      },
      "q3-SetConsumer0_IamRolePolicy_D9B45CEB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q3-SetConsumer0/IamRolePolicy",
            "uniqueId": "q3-SetConsumer0_IamRolePolicy_D9B45CEB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.q3.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c3.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.q3-SetConsumer0_IamRole_2934E47C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Queue-SetConsumer0_IamRolePolicyAttachment_4A4C5C5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/IamRolePolicyAttachment",
            "uniqueId": "Queue-SetConsumer0_IamRolePolicyAttachment_4A4C5C5D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Queue-SetConsumer0_IamRole_7F9ED9ED.name}"
      },
      "q2-SetConsumer0_IamRolePolicyAttachment_6DB0A9EE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q2-SetConsumer0/IamRolePolicyAttachment",
            "uniqueId": "q2-SetConsumer0_IamRolePolicyAttachment_6DB0A9EE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.q2-SetConsumer0_IamRole_910A96B5.name}"
      },
      "q3-SetConsumer0_IamRolePolicyAttachment_F54AC63B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q3-SetConsumer0/IamRolePolicyAttachment",
            "uniqueId": "q3-SetConsumer0_IamRolePolicyAttachment_F54AC63B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.q3-SetConsumer0_IamRole_2934E47C.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "Queue_EventSourceMapping_8332F7DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/EventSourceMapping",
            "uniqueId": "Queue_EventSourceMapping_8332F7DC"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.Queue.arn}",
        "function_name": "${aws_lambda_function.Queue-SetConsumer0.function_name}",
        "function_response_types": [
          "ReportBatchItemFailures"
        ]
      },
      "q2_EventSourceMapping_F484014F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q2/EventSourceMapping",
            "uniqueId": "q2_EventSourceMapping_F484014F"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.q2.arn}",
        "function_name": "${aws_lambda_function.q2-SetConsumer0.function_name}",
        "function_response_types": [
          "ReportBatchItemFailures"
        ]
      },
      "q3_EventSourceMapping_8BF6F975": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q3/EventSourceMapping",
            "uniqueId": "q3_EventSourceMapping_8BF6F975"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.q3.arn}",
        "function_name": "${aws_lambda_function.q3-SetConsumer0.function_name}",
        "function_response_types": [
          "ReportBatchItemFailures"
        ]
      }
    },
    "aws_lambda_function": {
      "Queue-SetConsumer0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/Default",
            "uniqueId": "Queue-SetConsumer0"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Queue-SetConsumer0-c83c303c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Queue-SetConsumer0-c83c303c",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Queue-SetConsumer0_IamRole_7F9ED9ED.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Queue-SetConsumer0_S3Object_2AD0A795.key}",
        "timeout": "${aws_sqs_queue.Queue.visibility_timeout_seconds}",
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "q2-SetConsumer0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q2-SetConsumer0/Default",
            "uniqueId": "q2-SetConsumer0"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_7ba9f967": "${aws_dynamodb_table.c2.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "QUEUE_URL_3af1eae7": "${aws_sqs_queue.q2.url}",
            "WING_FUNCTION_NAME": "q2-SetConsumer0-c8ba098b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "q2-SetConsumer0-c8ba098b",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.q2-SetConsumer0_IamRole_910A96B5.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.q2-SetConsumer0_S3Object_FB40B099.key}",
        "timeout": "${aws_sqs_queue.q2.visibility_timeout_seconds}",
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "q3-SetConsumer0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q3-SetConsumer0/Default",
            "uniqueId": "q3-SetConsumer0"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b30b36d": "${aws_dynamodb_table.c3.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "q3-SetConsumer0-c8cd013e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "q3-SetConsumer0-c8cd013e",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.q3-SetConsumer0_IamRole_2934E47C.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.q3-SetConsumer0_S3Object_69810AFF.key}",
        "timeout": "${aws_sqs_queue.q3.visibility_timeout_seconds}",
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
      "Queue-SetConsumer0_S3Object_2AD0A795": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/S3Object",
            "uniqueId": "Queue-SetConsumer0_S3Object_2AD0A795"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "q2-SetConsumer0_S3Object_FB40B099": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q2-SetConsumer0/S3Object",
            "uniqueId": "q2-SetConsumer0_S3Object_FB40B099"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "q3-SetConsumer0_S3Object_69810AFF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q3-SetConsumer0/S3Object",
            "uniqueId": "q3-SetConsumer0_S3Object_69810AFF"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "Queue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Default",
            "uniqueId": "Queue"
          }
        },
        "message_retention_seconds": 3600,
        "name": "Queue-c822c726",
        "visibility_timeout_seconds": 30
      },
      "q2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q2/Default",
            "uniqueId": "q2"
          }
        },
        "message_retention_seconds": 3600,
        "name": "q2-c8aa6380",
        "visibility_timeout_seconds": 30
      },
      "q3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q3/Default",
            "uniqueId": "q3"
          }
        },
        "message_retention_seconds": 3600,
        "name": "q3-c8ed13d1",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

