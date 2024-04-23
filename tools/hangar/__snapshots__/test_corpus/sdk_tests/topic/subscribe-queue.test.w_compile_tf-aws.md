# [subscribe-queue.test.w](../../../../../../examples/tests/sdk_tests/topic/subscribe-queue.test.w) | compile | tf-aws

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
      "Topic-OnMessage0_CloudwatchLogGroup_DE4DF0A1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Topic-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "Topic-OnMessage0_CloudwatchLogGroup_DE4DF0A1"
          }
        },
        "name": "/aws/lambda/Topic-OnMessage0-c85d7820",
        "retention_in_days": 30
      },
      "q1-SetConsumer0_CloudwatchLogGroup_B5256514": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q1-SetConsumer0/CloudwatchLogGroup",
            "uniqueId": "q1-SetConsumer0_CloudwatchLogGroup_B5256514"
          }
        },
        "name": "/aws/lambda/q1-SetConsumer0-c8600a39",
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
      "Topic-OnMessage0_IamRole_64DD36FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Topic-OnMessage0/IamRole",
            "uniqueId": "Topic-OnMessage0_IamRole_64DD36FA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "q1-SetConsumer0_IamRole_8299B0EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q1-SetConsumer0/IamRole",
            "uniqueId": "q1-SetConsumer0_IamRole_8299B0EC"
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
      }
    },
    "aws_iam_role_policy": {
      "Topic-OnMessage0_IamRolePolicy_F5EE09D8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Topic-OnMessage0/IamRolePolicy",
            "uniqueId": "Topic-OnMessage0_IamRolePolicy_F5EE09D8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Topic-OnMessage0_IamRole_64DD36FA.name}"
      },
      "q1-SetConsumer0_IamRolePolicy_7B7EFF72": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q1-SetConsumer0/IamRolePolicy",
            "uniqueId": "q1-SetConsumer0_IamRolePolicy_7B7EFF72"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.q1.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.q1-SetConsumer0_IamRole_8299B0EC.name}"
      },
      "q2-SetConsumer0_IamRolePolicy_4F213331": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q2-SetConsumer0/IamRolePolicy",
            "uniqueId": "q2-SetConsumer0_IamRolePolicy_4F213331"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.q2.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.q2-SetConsumer0_IamRole_910A96B5.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Topic-OnMessage0_IamRolePolicyAttachment_091E665D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Topic-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "Topic-OnMessage0_IamRolePolicyAttachment_091E665D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Topic-OnMessage0_IamRole_64DD36FA.name}"
      },
      "q1-SetConsumer0_IamRolePolicyAttachment_87EE6CD7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q1-SetConsumer0/IamRolePolicyAttachment",
            "uniqueId": "q1-SetConsumer0_IamRolePolicyAttachment_87EE6CD7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.q1-SetConsumer0_IamRole_8299B0EC.name}"
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
      }
    },
    "aws_lambda_event_source_mapping": {
      "q1_EventSourceMapping_26C17B14": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q1/EventSourceMapping",
            "uniqueId": "q1_EventSourceMapping_26C17B14"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.q1.arn}",
        "function_name": "${aws_lambda_function.q1-SetConsumer0.function_name}",
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
      }
    },
    "aws_lambda_function": {
      "Topic-OnMessage0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Topic-OnMessage0/Default",
            "uniqueId": "Topic-OnMessage0"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Topic-OnMessage0-c85d7820",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Topic-OnMessage0-c85d7820",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Topic-OnMessage0_IamRole_64DD36FA.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Topic-OnMessage0_S3Object_D41E9C10.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "q1-SetConsumer0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q1-SetConsumer0/Default",
            "uniqueId": "q1-SetConsumer0"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "q1-SetConsumer0-c8600a39",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "q1-SetConsumer0-c8600a39",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.q1-SetConsumer0_IamRole_8299B0EC.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.q1-SetConsumer0_S3Object_60123604.key}",
        "timeout": "${aws_sqs_queue.q1.visibility_timeout_seconds}",
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
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "q2-SetConsumer0-c8ba098b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "q2-SetConsumer0-c8ba098b",
        "handler": "index.handler",
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
      }
    },
    "aws_lambda_permission": {
      "Topic-OnMessage0_InvokePermission-c8228fb70d825c2a5610c610e5246d5313ea6bd1a2_2E2D0106": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Topic-OnMessage0/InvokePermission-c8228fb70d825c2a5610c610e5246d5313ea6bd1a2",
            "uniqueId": "Topic-OnMessage0_InvokePermission-c8228fb70d825c2a5610c610e5246d5313ea6bd1a2_2E2D0106"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Topic-OnMessage0.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Topic.arn}"
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
      "Topic-OnMessage0_S3Object_D41E9C10": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Topic-OnMessage0/S3Object",
            "uniqueId": "Topic-OnMessage0_S3Object_D41E9C10"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "q1-SetConsumer0_S3Object_60123604": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q1-SetConsumer0/S3Object",
            "uniqueId": "q1-SetConsumer0_S3Object_60123604"
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
      }
    },
    "aws_sns_topic": {
      "Topic": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Topic/Default",
            "uniqueId": "Topic"
          }
        },
        "name": "Topic-c8228fb7"
      }
    },
    "aws_sns_topic_subscription": {
      "Topic_TopicSubscription0_0EA5CC90": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Topic/TopicSubscription0",
            "uniqueId": "Topic_TopicSubscription0_0EA5CC90"
          }
        },
        "endpoint": "${aws_lambda_function.Topic-OnMessage0.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Topic.arn}"
      },
      "Topic_TopicSubscription1_7AA173DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Topic/TopicSubscription1",
            "uniqueId": "Topic_TopicSubscription1_7AA173DC"
          }
        },
        "endpoint": "${aws_sqs_queue.q1.arn}",
        "protocol": "sqs",
        "raw_message_delivery": true,
        "topic_arn": "${aws_sns_topic.Topic.arn}"
      },
      "Topic_TopicSubscription2_588150DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Topic/TopicSubscription2",
            "uniqueId": "Topic_TopicSubscription2_588150DD"
          }
        },
        "endpoint": "${aws_sqs_queue.q2.arn}",
        "protocol": "sqs",
        "raw_message_delivery": true,
        "topic_arn": "${aws_sns_topic.Topic.arn}"
      }
    },
    "aws_sqs_queue": {
      "q1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/q1/Default",
            "uniqueId": "q1"
          }
        },
        "message_retention_seconds": 3600,
        "name": "q1-c8d04b5e",
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
      }
    },
    "aws_sqs_queue_policy": {
      "Topic_SqsQueuePolicy-c8aa63803bb48703f04c4e86e7ec46acc23af1eae7_2C2F1390": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Topic/SqsQueuePolicy-c8aa63803bb48703f04c4e86e7ec46acc23af1eae7",
            "uniqueId": "Topic_SqsQueuePolicy-c8aa63803bb48703f04c4e86e7ec46acc23af1eae7_2C2F1390"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"sns.amazonaws.com\"},\"Action\":\"sqs:SendMessage\",\"Resource\":\"${aws_sqs_queue.q2.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_sns_topic.Topic.arn}\"}}}]}",
        "queue_url": "${aws_sqs_queue.q2.url}"
      },
      "Topic_SqsQueuePolicy-c8d04b5ef86e7d86fc1200f50de3110292a6dd012d_38A7F5C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Topic/SqsQueuePolicy-c8d04b5ef86e7d86fc1200f50de3110292a6dd012d",
            "uniqueId": "Topic_SqsQueuePolicy-c8d04b5ef86e7d86fc1200f50de3110292a6dd012d_38A7F5C3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"sns.amazonaws.com\"},\"Action\":\"sqs:SendMessage\",\"Resource\":\"${aws_sqs_queue.q1.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_sns_topic.Topic.arn}\"}}}]}",
        "queue_url": "${aws_sqs_queue.q1.url}"
      }
    }
  }
}
```

