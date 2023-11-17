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
      "cloudTopic-OnMessage-Closure1_CloudwatchLogGroup_3CDDD84D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-$Closure1/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage-Closure1_CloudwatchLogGroup_3CDDD84D"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage--Closure1-c8a22b55",
        "retention_in_days": 30
      },
      "cloudTopic-OnMessage-Closure2_CloudwatchLogGroup_71633CBF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-$Closure2/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage-Closure2_CloudwatchLogGroup_71633CBF"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage--Closure2-c829a9c6",
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
      "cloudTopic-OnMessage-Closure1_IamRole_F0698A35": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-$Closure1/IamRole",
            "uniqueId": "cloudTopic-OnMessage-Closure1_IamRole_F0698A35"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudTopic-OnMessage-Closure2_IamRole_DBBBBAA8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-$Closure2/IamRole",
            "uniqueId": "cloudTopic-OnMessage-Closure2_IamRole_DBBBBAA8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudTopic-OnMessage-Closure1_IamRolePolicy_9152C2B8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-$Closure1/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-Closure1_IamRolePolicy_9152C2B8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-Closure1_IamRole_F0698A35.name}"
      },
      "cloudTopic-OnMessage-Closure2_IamRolePolicy_34A92B69": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-$Closure2/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-Closure2_IamRolePolicy_34A92B69"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-Closure2_IamRole_DBBBBAA8.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudTopic-OnMessage-Closure1_IamRolePolicyAttachment_6932F90C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-$Closure1/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-Closure1_IamRolePolicyAttachment_6932F90C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-Closure1_IamRole_F0698A35.name}"
      },
      "cloudTopic-OnMessage-Closure2_IamRolePolicyAttachment_B5265B02": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-$Closure2/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-Closure2_IamRolePolicyAttachment_B5265B02"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-Closure2_IamRole_DBBBBAA8.name}"
      }
    },
    "aws_lambda_function": {
      "cloudTopic-OnMessage-Closure1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-$Closure1/Default",
            "uniqueId": "cloudTopic-OnMessage-Closure1"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage--Closure1-c8a22b55",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage--Closure1-c8a22b55",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-Closure1_IamRole_F0698A35.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-Closure1_S3Object_66FE83EB.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudTopic-OnMessage-Closure2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-$Closure2/Default",
            "uniqueId": "cloudTopic-OnMessage-Closure2"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage--Closure2-c829a9c6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage--Closure2-c829a9c6",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-Closure2_IamRole_DBBBBAA8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-Closure2_S3Object_6923DCDC.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudTopic-OnMessage-Closure1_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_39F32B1A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-$Closure1/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-Closure1_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_39F32B1A"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-Closure1.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudTopic.arn}"
      },
      "cloudTopic-OnMessage-Closure2_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_426AF806": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-$Closure2/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-Closure2_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_426AF806"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-Closure2.function_name}",
        "principal": "sns.amazonaws.com",
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
      "cloudTopic-OnMessage-Closure1_S3Object_66FE83EB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-$Closure1/S3Object",
            "uniqueId": "cloudTopic-OnMessage-Closure1_S3Object_66FE83EB"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudTopic-OnMessage-Closure2_S3Object_6923DCDC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-$Closure2/S3Object",
            "uniqueId": "cloudTopic-OnMessage-Closure2_S3Object_6923DCDC"
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
      "cloudTopic_cloudTopic-TopicSubscription-Closure1_B4B7FBFC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-$Closure1",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-Closure1_B4B7FBFC"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-Closure1.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
      },
      "cloudTopic_cloudTopic-TopicSubscription-Closure2_82194A09": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-$Closure2",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-Closure2_82194A09"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-Closure2.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
      }
    }
  }
}
```

