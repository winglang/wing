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
      "cloudTopic-OnMessage-013eca_CloudwatchLogGroup_61F9B2BA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-013eca/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage-013eca_CloudwatchLogGroup_61F9B2BA"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage-013eca-c81fd84c",
        "retention_in_days": 30
      },
      "cloudTopic-OnMessage-cc105d_CloudwatchLogGroup_F56457B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cc105d/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage-cc105d_CloudwatchLogGroup_F56457B9"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage-cc105d-c89b7ef2",
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
      "cloudTopic-OnMessage-013eca_IamRole_E689241E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-013eca/IamRole",
            "uniqueId": "cloudTopic-OnMessage-013eca_IamRole_E689241E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudTopic-OnMessage-cc105d_IamRole_08791564": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cc105d/IamRole",
            "uniqueId": "cloudTopic-OnMessage-cc105d_IamRole_08791564"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudTopic-OnMessage-013eca_IamRolePolicy_1499F76D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-013eca/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-013eca_IamRolePolicy_1499F76D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-013eca_IamRole_E689241E.name}"
      },
      "cloudTopic-OnMessage-cc105d_IamRolePolicy_429F9E84": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cc105d/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-cc105d_IamRolePolicy_429F9E84"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-cc105d_IamRole_08791564.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudTopic-OnMessage-013eca_IamRolePolicyAttachment_D9B6D804": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-013eca/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-013eca_IamRolePolicyAttachment_D9B6D804"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-013eca_IamRole_E689241E.name}"
      },
      "cloudTopic-OnMessage-cc105d_IamRolePolicyAttachment_3BDD1779": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cc105d/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-cc105d_IamRolePolicyAttachment_3BDD1779"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-cc105d_IamRole_08791564.name}"
      }
    },
    "aws_lambda_function": {
      "cloudTopic-OnMessage-013eca": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-013eca/Default",
            "uniqueId": "cloudTopic-OnMessage-013eca"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-013eca-c81fd84c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-013eca-c81fd84c",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-013eca_IamRole_E689241E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-013eca_S3Object_AB19EEFE.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudTopic-OnMessage-cc105d": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cc105d/Default",
            "uniqueId": "cloudTopic-OnMessage-cc105d"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-cc105d-c89b7ef2",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-cc105d-c89b7ef2",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-cc105d_IamRole_08791564.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-cc105d_S3Object_C8E48A44.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudTopic-OnMessage-013eca_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_0E410215": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-013eca/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-013eca_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_0E410215"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-013eca.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudTopic-OnMessage-013eca.version}",
        "source_arn": "${aws_sns_topic.cloudTopic.arn}"
      },
      "cloudTopic-OnMessage-cc105d_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_B2E38E43": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cc105d/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-cc105d_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_B2E38E43"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-cc105d.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudTopic-OnMessage-cc105d.version}",
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
      "cloudTopic-OnMessage-013eca_S3Object_AB19EEFE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-013eca/S3Object",
            "uniqueId": "cloudTopic-OnMessage-013eca_S3Object_AB19EEFE"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudTopic-OnMessage-cc105d_S3Object_C8E48A44": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cc105d/S3Object",
            "uniqueId": "cloudTopic-OnMessage-cc105d_S3Object_C8E48A44"
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
      "cloudTopic_cloudTopic-TopicSubscription-013eca_F9B59A08": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-013eca",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-013eca_F9B59A08"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-013eca.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
      },
      "cloudTopic_cloudTopic-TopicSubscription-cc105d_435D4AB4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-cc105d",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-cc105d_435D4AB4"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-cc105d.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
      }
    }
  }
}
```

