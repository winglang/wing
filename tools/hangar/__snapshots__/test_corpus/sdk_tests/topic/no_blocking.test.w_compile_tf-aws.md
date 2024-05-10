# [no_blocking.test.w](../../../../../../tests/sdk_tests/topic/no_blocking.test.w) | compile | tf-aws

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
      }
    }
  }
}
```

