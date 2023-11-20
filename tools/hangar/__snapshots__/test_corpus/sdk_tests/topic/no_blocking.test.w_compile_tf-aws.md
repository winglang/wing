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
      "cloudTopic-OnMessage-03993_CloudwatchLogGroup_4B1BF64F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-03993/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage-03993_CloudwatchLogGroup_4B1BF64F"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage-03993-c8f0195b",
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
      "cloudTopic-OnMessage-03993_IamRole_A60F1AA3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-03993/IamRole",
            "uniqueId": "cloudTopic-OnMessage-03993_IamRole_A60F1AA3"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudTopic-OnMessage-03993_IamRolePolicy_39716093": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-03993/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-03993_IamRolePolicy_39716093"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-03993_IamRole_A60F1AA3.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudTopic-OnMessage-03993_IamRolePolicyAttachment_C66B5CBC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-03993/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-03993_IamRolePolicyAttachment_C66B5CBC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-03993_IamRole_A60F1AA3.name}"
      }
    },
    "aws_lambda_function": {
      "cloudTopic-OnMessage-03993": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-03993/Default",
            "uniqueId": "cloudTopic-OnMessage-03993"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-03993-c8f0195b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-03993-c8f0195b",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-03993_IamRole_A60F1AA3.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-03993_S3Object_90F97E45.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudTopic-OnMessage-03993_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_DF6CD521": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-03993/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-03993_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_DF6CD521"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-03993.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudTopic-OnMessage-03993.version}",
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
      "cloudTopic-OnMessage-03993_S3Object_90F97E45": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-03993/S3Object",
            "uniqueId": "cloudTopic-OnMessage-03993_S3Object_90F97E45"
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
      "cloudTopic_cloudTopic-TopicSubscription-03993_F9828764": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-03993",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-03993_F9828764"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-03993.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
      }
    }
  }
}
```

