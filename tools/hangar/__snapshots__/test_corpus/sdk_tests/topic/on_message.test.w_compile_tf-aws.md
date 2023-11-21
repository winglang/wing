# [on_message.test.w](../../../../../../examples/tests/sdk_tests/topic/on_message.test.w) | compile | tf-aws

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
      "cloudTopic-OnMessage-10fd40_CloudwatchLogGroup_073CD677": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-10fd40/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage-10fd40_CloudwatchLogGroup_073CD677"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage-10fd40-c8e205bb",
        "retention_in_days": 30
      },
      "cloudTopic-OnMessage-d67400_CloudwatchLogGroup_F7AB06BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-d67400/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage-d67400_CloudwatchLogGroup_F7AB06BD"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage-d67400-c84466d5",
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
      "cloudTopic-OnMessage-10fd40_IamRole_0BC421DF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-10fd40/IamRole",
            "uniqueId": "cloudTopic-OnMessage-10fd40_IamRole_0BC421DF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudTopic-OnMessage-d67400_IamRole_C86F5057": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-d67400/IamRole",
            "uniqueId": "cloudTopic-OnMessage-d67400_IamRole_C86F5057"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudTopic-OnMessage-10fd40_IamRolePolicy_8F3241E7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-10fd40/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-10fd40_IamRolePolicy_8F3241E7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-10fd40_IamRole_0BC421DF.name}"
      },
      "cloudTopic-OnMessage-d67400_IamRolePolicy_1C1810A0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-d67400/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-d67400_IamRolePolicy_1C1810A0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-d67400_IamRole_C86F5057.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudTopic-OnMessage-10fd40_IamRolePolicyAttachment_696F60CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-10fd40/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-10fd40_IamRolePolicyAttachment_696F60CC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-10fd40_IamRole_0BC421DF.name}"
      },
      "cloudTopic-OnMessage-d67400_IamRolePolicyAttachment_1224C18B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-d67400/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-d67400_IamRolePolicyAttachment_1224C18B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-d67400_IamRole_C86F5057.name}"
      }
    },
    "aws_lambda_function": {
      "cloudTopic-OnMessage-10fd40": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-10fd40/Default",
            "uniqueId": "cloudTopic-OnMessage-10fd40"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-10fd40-c8e205bb",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-10fd40-c8e205bb",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-10fd40_IamRole_0BC421DF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-10fd40_S3Object_20F70293.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudTopic-OnMessage-d67400": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-d67400/Default",
            "uniqueId": "cloudTopic-OnMessage-d67400"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-d67400-c84466d5",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-d67400-c84466d5",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-d67400_IamRole_C86F5057.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-d67400_S3Object_707A8CAA.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudTopic-OnMessage-10fd40_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_90FAC124": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-10fd40/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-10fd40_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_90FAC124"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-10fd40.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudTopic-OnMessage-10fd40.version}",
        "source_arn": "${aws_sns_topic.cloudTopic.arn}"
      },
      "cloudTopic-OnMessage-d67400_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_F0B2EBA2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-d67400/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-d67400_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_F0B2EBA2"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-d67400.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudTopic-OnMessage-d67400.version}",
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
      "cloudTopic-OnMessage-10fd40_S3Object_20F70293": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-10fd40/S3Object",
            "uniqueId": "cloudTopic-OnMessage-10fd40_S3Object_20F70293"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudTopic-OnMessage-d67400_S3Object_707A8CAA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-d67400/S3Object",
            "uniqueId": "cloudTopic-OnMessage-d67400_S3Object_707A8CAA"
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
      "cloudTopic_cloudTopic-TopicSubscription-10fd40_79D99B90": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-10fd40",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-10fd40_79D99B90"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-10fd40.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
      },
      "cloudTopic_cloudTopic-TopicSubscription-d67400_B51A7F5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-d67400",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-d67400_B51A7F5D"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-d67400.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
      }
    }
  }
}
```

