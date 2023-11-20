# [no_blocking.test.w](../../../../../../examples/tests/sdk_tests/topic/no_blocking.test.w) | compile | tf-aws

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
    "aws_cloudwatch_log_group": {
      "cloudTopic-OnMessage-c0f9e3_CloudwatchLogGroup_C265B662": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-c0f9e3/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage-c0f9e3_CloudwatchLogGroup_C265B662"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage-c0f9e3-c8c13329",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "cloudCounter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "cloudCounter"
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
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    },
    "aws_iam_role": {
      "cloudTopic-OnMessage-c0f9e3_IamRole_E02FFE9A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-c0f9e3/IamRole",
            "uniqueId": "cloudTopic-OnMessage-c0f9e3_IamRole_E02FFE9A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudTopic-OnMessage-c0f9e3_IamRolePolicy_6E8B5CAC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-c0f9e3/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-c0f9e3_IamRolePolicy_6E8B5CAC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-c0f9e3_IamRole_E02FFE9A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudTopic-OnMessage-c0f9e3_IamRolePolicyAttachment_F6408057": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-c0f9e3/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-c0f9e3_IamRolePolicyAttachment_F6408057"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-c0f9e3_IamRole_E02FFE9A.name}"
      }
    },
    "aws_lambda_function": {
      "cloudTopic-OnMessage-c0f9e3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-c0f9e3/Default",
            "uniqueId": "cloudTopic-OnMessage-c0f9e3"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-c0f9e3-c8c13329",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-c0f9e3-c8c13329",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-c0f9e3_IamRole_E02FFE9A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-c0f9e3_S3Object_8F30C983.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudTopic-OnMessage-c0f9e3_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_D01A2594": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-c0f9e3/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-c0f9e3_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_D01A2594"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-c0f9e3.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudTopic-OnMessage-c0f9e3.version}",
        "source_arn": "${aws_sns_topic.cloudTopic.arn}"
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
      "cloudTopic-OnMessage-c0f9e3_S3Object_8F30C983": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-c0f9e3/S3Object",
            "uniqueId": "cloudTopic-OnMessage-c0f9e3_S3Object_8F30C983"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "cloudTopic": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/Default",
            "uniqueId": "cloudTopic"
          }
        },
        "name": "cloud-Topic-c82b57aa"
      }
    },
    "aws_sns_topic_subscription": {
      "cloudTopic_cloudTopic-TopicSubscription-c0f9e3_813D4D40": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-c0f9e3",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-c0f9e3_813D4D40"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-c0f9e3.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
      }
    }
  }
}
```

