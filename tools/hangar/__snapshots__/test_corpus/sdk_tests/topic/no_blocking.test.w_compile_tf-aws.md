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
      "cloudTopic-OnMessage-e65692_CloudwatchLogGroup_3C4803ED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-e65692/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage-e65692_CloudwatchLogGroup_3C4803ED"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage-e65692-c841bc54",
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
      "cloudTopic-OnMessage-e65692_IamRole_5D2B42C5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-e65692/IamRole",
            "uniqueId": "cloudTopic-OnMessage-e65692_IamRole_5D2B42C5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudTopic-OnMessage-e65692_IamRolePolicy_F8B9C948": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-e65692/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-e65692_IamRolePolicy_F8B9C948"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-e65692_IamRole_5D2B42C5.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudTopic-OnMessage-e65692_IamRolePolicyAttachment_73A14849": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-e65692/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-e65692_IamRolePolicyAttachment_73A14849"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-e65692_IamRole_5D2B42C5.name}"
      }
    },
    "aws_lambda_function": {
      "cloudTopic-OnMessage-e65692": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-e65692/Default",
            "uniqueId": "cloudTopic-OnMessage-e65692"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-e65692-c841bc54",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-e65692-c841bc54",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-e65692_IamRole_5D2B42C5.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-e65692_S3Object_B2B575A3.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudTopic-OnMessage-e65692_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_996E9D47": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-e65692/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-e65692_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_996E9D47"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-e65692.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudTopic-OnMessage-e65692.version}",
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
      "cloudTopic-OnMessage-e65692_S3Object_B2B575A3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-e65692/S3Object",
            "uniqueId": "cloudTopic-OnMessage-e65692_S3Object_B2B575A3"
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
      "cloudTopic_cloudTopic-TopicSubscription-e65692_8841E08E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-e65692",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-e65692_8841E08E"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-e65692.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
      }
    }
  }
}
```

