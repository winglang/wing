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
      "cloudTopic-OnMessage-84fa1_CloudwatchLogGroup_F1CA8C5E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-84fa1/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage-84fa1_CloudwatchLogGroup_F1CA8C5E"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage-84fa1-c8dc816c",
        "retention_in_days": 30
      },
      "cloudTopic-OnMessage-fef7a_CloudwatchLogGroup_9058D0F3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-fef7a/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage-fef7a_CloudwatchLogGroup_9058D0F3"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage-fef7a-c826a50c",
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
      "cloudTopic-OnMessage-84fa1_IamRole_B31FE035": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-84fa1/IamRole",
            "uniqueId": "cloudTopic-OnMessage-84fa1_IamRole_B31FE035"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudTopic-OnMessage-fef7a_IamRole_8112F053": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-fef7a/IamRole",
            "uniqueId": "cloudTopic-OnMessage-fef7a_IamRole_8112F053"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudTopic-OnMessage-84fa1_IamRolePolicy_3450BFCE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-84fa1/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-84fa1_IamRolePolicy_3450BFCE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-84fa1_IamRole_B31FE035.name}"
      },
      "cloudTopic-OnMessage-fef7a_IamRolePolicy_393CA860": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-fef7a/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-fef7a_IamRolePolicy_393CA860"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-fef7a_IamRole_8112F053.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudTopic-OnMessage-84fa1_IamRolePolicyAttachment_9D0AF475": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-84fa1/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-84fa1_IamRolePolicyAttachment_9D0AF475"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-84fa1_IamRole_B31FE035.name}"
      },
      "cloudTopic-OnMessage-fef7a_IamRolePolicyAttachment_C97D9956": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-fef7a/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-fef7a_IamRolePolicyAttachment_C97D9956"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-fef7a_IamRole_8112F053.name}"
      }
    },
    "aws_lambda_function": {
      "cloudTopic-OnMessage-84fa1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-84fa1/Default",
            "uniqueId": "cloudTopic-OnMessage-84fa1"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-84fa1-c8dc816c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-84fa1-c8dc816c",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-84fa1_IamRole_B31FE035.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-84fa1_S3Object_2FDF1793.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudTopic-OnMessage-fef7a": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-fef7a/Default",
            "uniqueId": "cloudTopic-OnMessage-fef7a"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-fef7a-c826a50c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-fef7a-c826a50c",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-fef7a_IamRole_8112F053.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-fef7a_S3Object_34C0F3EA.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudTopic-OnMessage-84fa1_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_0FB97E1E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-84fa1/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-84fa1_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_0FB97E1E"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-84fa1.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudTopic-OnMessage-84fa1.version}",
        "source_arn": "${aws_sns_topic.cloudTopic.arn}"
      },
      "cloudTopic-OnMessage-fef7a_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_D848B6D9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-fef7a/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-fef7a_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_D848B6D9"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-fef7a.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudTopic-OnMessage-fef7a.version}",
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
      "cloudTopic-OnMessage-84fa1_S3Object_2FDF1793": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-84fa1/S3Object",
            "uniqueId": "cloudTopic-OnMessage-84fa1_S3Object_2FDF1793"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudTopic-OnMessage-fef7a_S3Object_34C0F3EA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-fef7a/S3Object",
            "uniqueId": "cloudTopic-OnMessage-fef7a_S3Object_34C0F3EA"
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
      "cloudTopic_cloudTopic-TopicSubscription-84fa1_09755B86": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-84fa1",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-84fa1_09755B86"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-84fa1.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
      },
      "cloudTopic_cloudTopic-TopicSubscription-fef7a_E52724EB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-fef7a",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-fef7a_E52724EB"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-fef7a.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
      }
    }
  }
}
```

