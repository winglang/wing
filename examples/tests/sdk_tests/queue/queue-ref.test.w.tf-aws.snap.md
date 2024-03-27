# `queue-ref.test.w.tf-aws.snap.md`

## main.tf.json

```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
    },
    "outputs": {
    }
  },
  "provider": {
    "google": [
      {
      }
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "Function_CloudwatchLogGroup_ABDCF4C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/CloudwatchLogGroup",
            "uniqueId": "Function_CloudwatchLogGroup_ABDCF4C4"
          }
        },
        "name": "/aws/lambda/Function-c852aba6",
        "retention_in_days": 30
      },
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
      "QueueRef_AwsConsoleField_Handler_CloudwatchLogGroup_1FAC3ED5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/AwsConsoleField/Handler/CloudwatchLogGroup",
            "uniqueId": "QueueRef_AwsConsoleField_Handler_CloudwatchLogGroup_1FAC3ED5"
          }
        },
        "name": "/aws/lambda/Handler-c85cfbef",
        "retention_in_days": 30
      },
      "QueueRef_QueueArnField_Handler_CloudwatchLogGroup_BDFDF613": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/QueueArnField/Handler/CloudwatchLogGroup",
            "uniqueId": "QueueRef_QueueArnField_Handler_CloudwatchLogGroup_BDFDF613"
          }
        },
        "name": "/aws/lambda/Handler-c8c3c90a",
        "retention_in_days": 30
      },
      "QueueRef_QueueUrlField_Handler_CloudwatchLogGroup_8AB6E3DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/QueueUrlField/Handler/CloudwatchLogGroup",
            "uniqueId": "QueueRef_QueueUrlField_Handler_CloudwatchLogGroup_8AB6E3DD"
          }
        },
        "name": "/aws/lambda/Handler-c8ec121e",
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
      "Function_IamRole_678BE84C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/IamRole",
            "uniqueId": "Function_IamRole_678BE84C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Queue-SetConsumer0_IamRole_7F9ED9ED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/IamRole",
            "uniqueId": "Queue-SetConsumer0_IamRole_7F9ED9ED"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "QueueRef_AwsConsoleField_Handler_IamRole_0DD0004C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/AwsConsoleField/Handler/IamRole",
            "uniqueId": "QueueRef_AwsConsoleField_Handler_IamRole_0DD0004C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "QueueRef_QueueArnField_Handler_IamRole_C121BD5E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/QueueArnField/Handler/IamRole",
            "uniqueId": "QueueRef_QueueArnField_Handler_IamRole_C121BD5E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "QueueRef_QueueUrlField_Handler_IamRole_709A15CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/QueueUrlField/Handler/IamRole",
            "uniqueId": "QueueRef_QueueUrlField_Handler_IamRole_709A15CB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Function_IamRolePolicy_E3B26607": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/IamRolePolicy",
            "uniqueId": "Function_IamRolePolicy_E3B26607"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:GetQueueUrl\"],\"Resource\":[\"${aws_sqs_queue.Queue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.Queue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:DeleteMessage\"],\"Resource\":[\"${aws_sqs_queue.Queue.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Function_IamRole_678BE84C.name}"
      },
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
      "QueueRef_AwsConsoleField_Handler_IamRolePolicy_184A5238": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/AwsConsoleField/Handler/IamRolePolicy",
            "uniqueId": "QueueRef_AwsConsoleField_Handler_IamRolePolicy_184A5238"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:GetQueueUrl\"],\"Resource\":[\"${aws_sqs_queue.Queue.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.QueueRef_AwsConsoleField_Handler_IamRole_0DD0004C.name}"
      },
      "QueueRef_QueueArnField_Handler_IamRolePolicy_64EE3F4B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/QueueArnField/Handler/IamRolePolicy",
            "uniqueId": "QueueRef_QueueArnField_Handler_IamRolePolicy_64EE3F4B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.QueueRef_QueueArnField_Handler_IamRole_C121BD5E.name}"
      },
      "QueueRef_QueueUrlField_Handler_IamRolePolicy_A9F2F773": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/QueueUrlField/Handler/IamRolePolicy",
            "uniqueId": "QueueRef_QueueUrlField_Handler_IamRolePolicy_A9F2F773"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:GetQueueUrl\"],\"Resource\":[\"${aws_sqs_queue.Queue.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.QueueRef_QueueUrlField_Handler_IamRole_709A15CB.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Function_IamRolePolicyAttachment_CACE1358": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/IamRolePolicyAttachment",
            "uniqueId": "Function_IamRolePolicyAttachment_CACE1358"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Function_IamRole_678BE84C.name}"
      },
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
      "QueueRef_AwsConsoleField_Handler_IamRolePolicyAttachment_1F892467": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/AwsConsoleField/Handler/IamRolePolicyAttachment",
            "uniqueId": "QueueRef_AwsConsoleField_Handler_IamRolePolicyAttachment_1F892467"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.QueueRef_AwsConsoleField_Handler_IamRole_0DD0004C.name}"
      },
      "QueueRef_QueueArnField_Handler_IamRolePolicyAttachment_BA9083B2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/QueueArnField/Handler/IamRolePolicyAttachment",
            "uniqueId": "QueueRef_QueueArnField_Handler_IamRolePolicyAttachment_BA9083B2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.QueueRef_QueueArnField_Handler_IamRole_C121BD5E.name}"
      },
      "QueueRef_QueueUrlField_Handler_IamRolePolicyAttachment_9FA1E52D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/QueueUrlField/Handler/IamRolePolicyAttachment",
            "uniqueId": "QueueRef_QueueUrlField_Handler_IamRolePolicyAttachment_9FA1E52D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.QueueRef_QueueUrlField_Handler_IamRole_709A15CB.name}"
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
        "function_name": "${aws_lambda_function.Queue-SetConsumer0.function_name}"
      }
    },
    "aws_lambda_function": {
      "Function": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/Default",
            "uniqueId": "Function"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "QUEUE_ARN_23984aca": "${aws_sqs_queue.Queue.arn}",
            "WING_FUNCTION_NAME": "Function-c852aba6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Function-c852aba6",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Function_IamRole_678BE84C.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Function_S3Object_C62A0C2D.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [
          ],
          "subnet_ids": [
          ]
        }
      },
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
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Queue-SetConsumer0_IamRole_7F9ED9ED.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Queue-SetConsumer0_S3Object_2AD0A795.key}",
        "timeout": "${aws_sqs_queue.Queue.visibility_timeout_seconds}",
        "vpc_config": {
          "security_group_ids": [
          ],
          "subnet_ids": [
          ]
        }
      },
      "QueueRef_AwsConsoleField_Handler_2D13D4BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/AwsConsoleField/Handler/Default",
            "uniqueId": "QueueRef_AwsConsoleField_Handler_2D13D4BF"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "QUEUE_ARN_23984aca": "${aws_sqs_queue.Queue.arn}",
            "WING_FUNCTION_NAME": "Handler-c85cfbef",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85cfbef",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.QueueRef_AwsConsoleField_Handler_IamRole_0DD0004C.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.QueueRef_AwsConsoleField_Handler_S3Object_C4237D42.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [
          ],
          "subnet_ids": [
          ]
        }
      },
      "QueueRef_QueueArnField_Handler_0B477E06": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/QueueArnField/Handler/Default",
            "uniqueId": "QueueRef_QueueArnField_Handler_0B477E06"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Handler-c8c3c90a",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_20": "${jsonencode(aws_sqs_queue.Queue.arn)}"
          }
        },
        "function_name": "Handler-c8c3c90a",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.QueueRef_QueueArnField_Handler_IamRole_C121BD5E.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.QueueRef_QueueArnField_Handler_S3Object_6AD15EC0.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [
          ],
          "subnet_ids": [
          ]
        }
      },
      "QueueRef_QueueUrlField_Handler_42A4BE81": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/QueueUrlField/Handler/Default",
            "uniqueId": "QueueRef_QueueUrlField_Handler_42A4BE81"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "QUEUE_ARN_23984aca": "${aws_sqs_queue.Queue.arn}",
            "WING_FUNCTION_NAME": "Handler-c8ec121e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8ec121e",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.QueueRef_QueueUrlField_Handler_IamRole_709A15CB.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.QueueRef_QueueUrlField_Handler_S3Object_225E3B78.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [
          ],
          "subnet_ids": [
          ]
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
      "Function_S3Object_C62A0C2D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Function/S3Object",
            "uniqueId": "Function_S3Object_C62A0C2D"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "asset.c852aba6d7cbe50c86bbedd1463b05db52425574b5.b58ced042cb842cbe6ce3c15ff911606.zip",
        "source": "assets/Function_Asset_212D1EED/CB1C63E9D6F11E03F3D73E0F0B0D27DD/archive.zip"
      },
      "Queue-SetConsumer0_S3Object_2AD0A795": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/S3Object",
            "uniqueId": "Queue-SetConsumer0_S3Object_2AD0A795"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "asset.c83c303c1266dbb851c70f1219bd171134fd688af4.47361e88217f66fbeb5b20bed1d0eb39.zip",
        "source": "assets/Queue-SetConsumer0_Asset_370CBC69/809FE7B3739B5CDE4F49F2BFEAC5EB0F/archive.zip"
      },
      "QueueRef_AwsConsoleField_Handler_S3Object_C4237D42": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/AwsConsoleField/Handler/S3Object",
            "uniqueId": "QueueRef_AwsConsoleField_Handler_S3Object_C4237D42"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "asset.c85cfbef97a3fb2dc791c3608fdb038b4ad1b95187.b66ce4438c3e1e6798401c3e3aefe08d.zip",
        "source": "assets/QueueRef_AwsConsoleField_Handler_Asset_0F4442BF/101497AB228C26A7CF505A2EF3923480/archive.zip"
      },
      "QueueRef_QueueArnField_Handler_S3Object_6AD15EC0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/QueueArnField/Handler/S3Object",
            "uniqueId": "QueueRef_QueueArnField_Handler_S3Object_6AD15EC0"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "asset.c8c3c90ad2bff9aeccf5a502b7c0f2bb0bb47a15c9.b760352058030005010dbe1c34240557.zip",
        "source": "assets/QueueRef_QueueArnField_Handler_Asset_3C4BE3B9/A0CD1B482923BB778694B486C3D118EB/archive.zip"
      },
      "QueueRef_QueueUrlField_Handler_S3Object_225E3B78": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/QueueRef/QueueUrlField/Handler/S3Object",
            "uniqueId": "QueueRef_QueueUrlField_Handler_S3Object_225E3B78"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "asset.c8ec121eb15b591a9e6c75256118f3d465ac11b20e.dd52055a72108b0947647e6e9bcf021f.zip",
        "source": "assets/QueueRef_QueueUrlField_Handler_Asset_3CA87EAF/1DF7E878950501270880FD42D8947C08/archive.zip"
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
      }
    }
  },
  "terraform": {
    "backend": {
      "local": {
        "path": "./terraform.tfstate"
      }
    },
    "required_providers": {
      "aws": {
        "source": "aws",
        "version": "5.31.0"
      }
    }
  }
}
```
