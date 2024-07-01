# [events.test.w](../../../../../../examples/tests/sdk_tests/bucket/events.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
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
      "Bucket_OnCreate-OnMessage0_CloudwatchLogGroup_6BF9DEA3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "Bucket_OnCreate-OnMessage0_CloudwatchLogGroup_6BF9DEA3"
          }
        },
        "name": "/aws/lambda/OnCreate-OnMessage0-c8740b4b",
        "retention_in_days": 30
      },
      "Bucket_OnCreate-OnMessage1_CloudwatchLogGroup_A09583DA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate-OnMessage1/CloudwatchLogGroup",
            "uniqueId": "Bucket_OnCreate-OnMessage1_CloudwatchLogGroup_A09583DA"
          }
        },
        "name": "/aws/lambda/OnCreate-OnMessage1-c8347a52",
        "retention_in_days": 30
      },
      "Bucket_OnDelete-OnMessage0_CloudwatchLogGroup_682144EA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "Bucket_OnDelete-OnMessage0_CloudwatchLogGroup_682144EA"
          }
        },
        "name": "/aws/lambda/OnDelete-OnMessage0-c8e711ef",
        "retention_in_days": 30
      },
      "Bucket_OnDelete-OnMessage1_CloudwatchLogGroup_ADB44727": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete-OnMessage1/CloudwatchLogGroup",
            "uniqueId": "Bucket_OnDelete-OnMessage1_CloudwatchLogGroup_ADB44727"
          }
        },
        "name": "/aws/lambda/OnDelete-OnMessage1-c8905f5b",
        "retention_in_days": 30
      },
      "Bucket_OnUpdate-OnMessage0_CloudwatchLogGroup_9492CFAF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "Bucket_OnUpdate-OnMessage0_CloudwatchLogGroup_9492CFAF"
          }
        },
        "name": "/aws/lambda/OnUpdate-OnMessage0-c81b9fec",
        "retention_in_days": 30
      },
      "Bucket_OnUpdate-OnMessage1_CloudwatchLogGroup_FA500C0F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate-OnMessage1/CloudwatchLogGroup",
            "uniqueId": "Bucket_OnUpdate-OnMessage1_CloudwatchLogGroup_FA500C0F"
          }
        },
        "name": "/aws/lambda/OnUpdate-OnMessage1-c8513427",
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
      },
      "Table": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Table/Default",
            "uniqueId": "Table"
          }
        },
        "attribute": [
          {
            "name": "_id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "_id",
        "name": "key-historyTable-c89b2d37",
        "point_in_time_recovery": {
          "enabled": true
        }
      }
    },
    "aws_iam_role": {
      "Bucket_OnCreate-OnMessage0_IamRole_D3BF2935": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate-OnMessage0/IamRole",
            "uniqueId": "Bucket_OnCreate-OnMessage0_IamRole_D3BF2935"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Bucket_OnCreate-OnMessage1_IamRole_0E855131": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate-OnMessage1/IamRole",
            "uniqueId": "Bucket_OnCreate-OnMessage1_IamRole_0E855131"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Bucket_OnDelete-OnMessage0_IamRole_A52E721B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete-OnMessage0/IamRole",
            "uniqueId": "Bucket_OnDelete-OnMessage0_IamRole_A52E721B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Bucket_OnDelete-OnMessage1_IamRole_AA3A5721": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete-OnMessage1/IamRole",
            "uniqueId": "Bucket_OnDelete-OnMessage1_IamRole_AA3A5721"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Bucket_OnUpdate-OnMessage0_IamRole_96499EB9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate-OnMessage0/IamRole",
            "uniqueId": "Bucket_OnUpdate-OnMessage0_IamRole_96499EB9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Bucket_OnUpdate-OnMessage1_IamRole_7B19D23F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate-OnMessage1/IamRole",
            "uniqueId": "Bucket_OnUpdate-OnMessage1_IamRole_7B19D23F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Bucket_OnCreate-OnMessage0_IamRolePolicy_9749552C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate-OnMessage0/IamRolePolicy",
            "uniqueId": "Bucket_OnCreate-OnMessage0_IamRolePolicy_9749552C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.Table.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Bucket_OnCreate-OnMessage0_IamRole_D3BF2935.name}"
      },
      "Bucket_OnCreate-OnMessage1_IamRolePolicy_975FD372": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate-OnMessage1/IamRolePolicy",
            "uniqueId": "Bucket_OnCreate-OnMessage1_IamRolePolicy_975FD372"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.Table.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Bucket_OnCreate-OnMessage1_IamRole_0E855131.name}"
      },
      "Bucket_OnDelete-OnMessage0_IamRolePolicy_A027DCBC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete-OnMessage0/IamRolePolicy",
            "uniqueId": "Bucket_OnDelete-OnMessage0_IamRolePolicy_A027DCBC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.Table.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Bucket_OnDelete-OnMessage0_IamRole_A52E721B.name}"
      },
      "Bucket_OnDelete-OnMessage1_IamRolePolicy_07F086F7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete-OnMessage1/IamRolePolicy",
            "uniqueId": "Bucket_OnDelete-OnMessage1_IamRolePolicy_07F086F7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.Table.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Bucket_OnDelete-OnMessage1_IamRole_AA3A5721.name}"
      },
      "Bucket_OnUpdate-OnMessage0_IamRolePolicy_DAF73AB9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate-OnMessage0/IamRolePolicy",
            "uniqueId": "Bucket_OnUpdate-OnMessage0_IamRolePolicy_DAF73AB9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.Table.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Bucket_OnUpdate-OnMessage0_IamRole_96499EB9.name}"
      },
      "Bucket_OnUpdate-OnMessage1_IamRolePolicy_E38714A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate-OnMessage1/IamRolePolicy",
            "uniqueId": "Bucket_OnUpdate-OnMessage1_IamRolePolicy_E38714A4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.Table.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Bucket_OnUpdate-OnMessage1_IamRole_7B19D23F.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Bucket_OnCreate-OnMessage0_IamRolePolicyAttachment_B9851CC6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "Bucket_OnCreate-OnMessage0_IamRolePolicyAttachment_B9851CC6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Bucket_OnCreate-OnMessage0_IamRole_D3BF2935.name}"
      },
      "Bucket_OnCreate-OnMessage1_IamRolePolicyAttachment_CAB55010": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate-OnMessage1/IamRolePolicyAttachment",
            "uniqueId": "Bucket_OnCreate-OnMessage1_IamRolePolicyAttachment_CAB55010"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Bucket_OnCreate-OnMessage1_IamRole_0E855131.name}"
      },
      "Bucket_OnDelete-OnMessage0_IamRolePolicyAttachment_9AC35049": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "Bucket_OnDelete-OnMessage0_IamRolePolicyAttachment_9AC35049"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Bucket_OnDelete-OnMessage0_IamRole_A52E721B.name}"
      },
      "Bucket_OnDelete-OnMessage1_IamRolePolicyAttachment_EFA92AD6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete-OnMessage1/IamRolePolicyAttachment",
            "uniqueId": "Bucket_OnDelete-OnMessage1_IamRolePolicyAttachment_EFA92AD6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Bucket_OnDelete-OnMessage1_IamRole_AA3A5721.name}"
      },
      "Bucket_OnUpdate-OnMessage0_IamRolePolicyAttachment_FAF69EA1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "Bucket_OnUpdate-OnMessage0_IamRolePolicyAttachment_FAF69EA1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Bucket_OnUpdate-OnMessage0_IamRole_96499EB9.name}"
      },
      "Bucket_OnUpdate-OnMessage1_IamRolePolicyAttachment_5CF4587E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate-OnMessage1/IamRolePolicyAttachment",
            "uniqueId": "Bucket_OnUpdate-OnMessage1_IamRolePolicyAttachment_5CF4587E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Bucket_OnUpdate-OnMessage1_IamRole_7B19D23F.name}"
      }
    },
    "aws_lambda_function": {
      "Bucket_OnCreate-OnMessage0_4C972FB4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate-OnMessage0/Default",
            "uniqueId": "Bucket_OnCreate-OnMessage0_4C972FB4"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "DYNAMODB_TABLE_NAME_e7245baa": "${aws_dynamodb_table.Table.name}",
            "DYNAMODB_TABLE_NAME_e7245baa_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_e7245baa_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "OnCreate-OnMessage0-c8740b4b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "OnCreate-OnMessage0-c8740b4b",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Bucket_OnCreate-OnMessage0_IamRole_D3BF2935.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Bucket_OnCreate-OnMessage0_S3Object_3AC22680.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Bucket_OnCreate-OnMessage1_18599D01": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate-OnMessage1/Default",
            "uniqueId": "Bucket_OnCreate-OnMessage1_18599D01"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "DYNAMODB_TABLE_NAME_e7245baa": "${aws_dynamodb_table.Table.name}",
            "DYNAMODB_TABLE_NAME_e7245baa_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_e7245baa_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "OnCreate-OnMessage1-c8347a52",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "OnCreate-OnMessage1-c8347a52",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Bucket_OnCreate-OnMessage1_IamRole_0E855131.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Bucket_OnCreate-OnMessage1_S3Object_24FED042.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Bucket_OnDelete-OnMessage0_BBD3A051": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete-OnMessage0/Default",
            "uniqueId": "Bucket_OnDelete-OnMessage0_BBD3A051"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "DYNAMODB_TABLE_NAME_e7245baa": "${aws_dynamodb_table.Table.name}",
            "DYNAMODB_TABLE_NAME_e7245baa_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_e7245baa_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "OnDelete-OnMessage0-c8e711ef",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "OnDelete-OnMessage0-c8e711ef",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Bucket_OnDelete-OnMessage0_IamRole_A52E721B.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Bucket_OnDelete-OnMessage0_S3Object_555C9D08.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Bucket_OnDelete-OnMessage1_A17F4764": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete-OnMessage1/Default",
            "uniqueId": "Bucket_OnDelete-OnMessage1_A17F4764"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "DYNAMODB_TABLE_NAME_e7245baa": "${aws_dynamodb_table.Table.name}",
            "DYNAMODB_TABLE_NAME_e7245baa_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_e7245baa_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "OnDelete-OnMessage1-c8905f5b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "OnDelete-OnMessage1-c8905f5b",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Bucket_OnDelete-OnMessage1_IamRole_AA3A5721.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Bucket_OnDelete-OnMessage1_S3Object_DE01EBE1.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Bucket_OnUpdate-OnMessage0_ABC5042C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate-OnMessage0/Default",
            "uniqueId": "Bucket_OnUpdate-OnMessage0_ABC5042C"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "DYNAMODB_TABLE_NAME_e7245baa": "${aws_dynamodb_table.Table.name}",
            "DYNAMODB_TABLE_NAME_e7245baa_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_e7245baa_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "OnUpdate-OnMessage0-c81b9fec",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "OnUpdate-OnMessage0-c81b9fec",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Bucket_OnUpdate-OnMessage0_IamRole_96499EB9.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Bucket_OnUpdate-OnMessage0_S3Object_45CBA374.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Bucket_OnUpdate-OnMessage1_A9787FC1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate-OnMessage1/Default",
            "uniqueId": "Bucket_OnUpdate-OnMessage1_A9787FC1"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "DYNAMODB_TABLE_NAME_e7245baa": "${aws_dynamodb_table.Table.name}",
            "DYNAMODB_TABLE_NAME_e7245baa_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_e7245baa_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "OnUpdate-OnMessage1-c8513427",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "OnUpdate-OnMessage1-c8513427",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Bucket_OnUpdate-OnMessage1_IamRole_7B19D23F.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Bucket_OnUpdate-OnMessage1_S3Object_A8B89403.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Bucket_OnCreate-OnMessage0_InvokePermission-c8b721b0d6157aa6ade66017aa9bfcbb77f8df59d7_F5383BED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate-OnMessage0/InvokePermission-c8b721b0d6157aa6ade66017aa9bfcbb77f8df59d7",
            "uniqueId": "Bucket_OnCreate-OnMessage0_InvokePermission-c8b721b0d6157aa6ade66017aa9bfcbb77f8df59d7_F5383BED"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Bucket_OnCreate-OnMessage0_4C972FB4.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Bucket_OnCreate_9682272C.arn}"
      },
      "Bucket_OnCreate-OnMessage1_InvokePermission-c8b721b0d6157aa6ade66017aa9bfcbb77f8df59d7_C0F2EA79": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate-OnMessage1/InvokePermission-c8b721b0d6157aa6ade66017aa9bfcbb77f8df59d7",
            "uniqueId": "Bucket_OnCreate-OnMessage1_InvokePermission-c8b721b0d6157aa6ade66017aa9bfcbb77f8df59d7_C0F2EA79"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Bucket_OnCreate-OnMessage1_18599D01.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Bucket_OnCreate_9682272C.arn}"
      },
      "Bucket_OnDelete-OnMessage0_InvokePermission-c8951577e6e6b8b443e69cf3aa712434a41064d057_3C678F8E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete-OnMessage0/InvokePermission-c8951577e6e6b8b443e69cf3aa712434a41064d057",
            "uniqueId": "Bucket_OnDelete-OnMessage0_InvokePermission-c8951577e6e6b8b443e69cf3aa712434a41064d057_3C678F8E"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Bucket_OnDelete-OnMessage0_BBD3A051.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Bucket_OnDelete_0EB7243C.arn}"
      },
      "Bucket_OnDelete-OnMessage1_InvokePermission-c8951577e6e6b8b443e69cf3aa712434a41064d057_DB38FC8F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete-OnMessage1/InvokePermission-c8951577e6e6b8b443e69cf3aa712434a41064d057",
            "uniqueId": "Bucket_OnDelete-OnMessage1_InvokePermission-c8951577e6e6b8b443e69cf3aa712434a41064d057_DB38FC8F"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Bucket_OnDelete-OnMessage1_A17F4764.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Bucket_OnDelete_0EB7243C.arn}"
      },
      "Bucket_OnUpdate-OnMessage0_InvokePermission-c81749ea32d17e6c85fdd886350ce3ffe9fd7c0be7_026E0359": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate-OnMessage0/InvokePermission-c81749ea32d17e6c85fdd886350ce3ffe9fd7c0be7",
            "uniqueId": "Bucket_OnUpdate-OnMessage0_InvokePermission-c81749ea32d17e6c85fdd886350ce3ffe9fd7c0be7_026E0359"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Bucket_OnUpdate-OnMessage0_ABC5042C.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Bucket_OnUpdate_E297838E.arn}"
      },
      "Bucket_OnUpdate-OnMessage1_InvokePermission-c81749ea32d17e6c85fdd886350ce3ffe9fd7c0be7_E1A5BEF6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate-OnMessage1/InvokePermission-c81749ea32d17e6c85fdd886350ce3ffe9fd7c0be7",
            "uniqueId": "Bucket_OnUpdate-OnMessage1_InvokePermission-c81749ea32d17e6c85fdd886350ce3ffe9fd7c0be7_E1A5BEF6"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Bucket_OnUpdate-OnMessage1_A9787FC1.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Bucket_OnUpdate_E297838E.arn}"
      }
    },
    "aws_s3_bucket": {
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
        "force_destroy": false
      },
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
    "aws_s3_bucket_notification": {
      "Bucket_S3BucketNotification_D5E2F72C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/S3BucketNotification",
            "uniqueId": "Bucket_S3BucketNotification_D5E2F72C"
          }
        },
        "bucket": "${aws_s3_bucket.Bucket.id}",
        "depends_on": [
          "aws_sns_topic_policy.Bucket_OnDelete_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_89434C6B",
          "aws_sns_topic_policy.Bucket_OnUpdate_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_9BF3340C",
          "aws_sns_topic_policy.Bucket_OnCreate_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_E9DA9F8C"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-ondelete-notification",
            "topic_arn": "${aws_sns_topic.Bucket_OnDelete_0EB7243C.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-onupdate-notification",
            "topic_arn": "${aws_sns_topic.Bucket_OnUpdate_E297838E.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.Bucket_OnCreate_9682272C.arn}"
          }
        ]
      }
    },
    "aws_s3_object": {
      "Bucket_OnCreate-OnMessage0_S3Object_3AC22680": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate-OnMessage0/S3Object",
            "uniqueId": "Bucket_OnCreate-OnMessage0_S3Object_3AC22680"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Bucket_OnCreate-OnMessage1_S3Object_24FED042": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate-OnMessage1/S3Object",
            "uniqueId": "Bucket_OnCreate-OnMessage1_S3Object_24FED042"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Bucket_OnDelete-OnMessage0_S3Object_555C9D08": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete-OnMessage0/S3Object",
            "uniqueId": "Bucket_OnDelete-OnMessage0_S3Object_555C9D08"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Bucket_OnDelete-OnMessage1_S3Object_DE01EBE1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete-OnMessage1/S3Object",
            "uniqueId": "Bucket_OnDelete-OnMessage1_S3Object_DE01EBE1"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Bucket_OnUpdate-OnMessage0_S3Object_45CBA374": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate-OnMessage0/S3Object",
            "uniqueId": "Bucket_OnUpdate-OnMessage0_S3Object_45CBA374"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Bucket_OnUpdate-OnMessage1_S3Object_A8B89403": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate-OnMessage1/S3Object",
            "uniqueId": "Bucket_OnUpdate-OnMessage1_S3Object_A8B89403"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "Bucket_OnCreate_9682272C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate/Default",
            "uniqueId": "Bucket_OnCreate_9682272C"
          }
        },
        "name": "OnCreate-c8b721b0"
      },
      "Bucket_OnDelete_0EB7243C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete/Default",
            "uniqueId": "Bucket_OnDelete_0EB7243C"
          }
        },
        "name": "OnDelete-c8951577"
      },
      "Bucket_OnUpdate_E297838E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate/Default",
            "uniqueId": "Bucket_OnUpdate_E297838E"
          }
        },
        "name": "OnUpdate-c81749ea"
      }
    },
    "aws_sns_topic_policy": {
      "Bucket_OnCreate_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_E9DA9F8C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate/PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a",
            "uniqueId": "Bucket_OnCreate_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_E9DA9F8C"
          }
        },
        "arn": "${aws_sns_topic.Bucket_OnCreate_9682272C.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.Bucket_OnCreate_9682272C.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.Bucket.arn}\"}}}]}"
      },
      "Bucket_OnDelete_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_89434C6B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete/PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a",
            "uniqueId": "Bucket_OnDelete_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_89434C6B"
          }
        },
        "arn": "${aws_sns_topic.Bucket_OnDelete_0EB7243C.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.Bucket_OnDelete_0EB7243C.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.Bucket.arn}\"}}}]}"
      },
      "Bucket_OnUpdate_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_9BF3340C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate/PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a",
            "uniqueId": "Bucket_OnUpdate_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_9BF3340C"
          }
        },
        "arn": "${aws_sns_topic.Bucket_OnUpdate_E297838E.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.Bucket_OnUpdate_E297838E.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.Bucket.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "Bucket_OnCreate_TopicSubscription0_A2B42747": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate/TopicSubscription0",
            "uniqueId": "Bucket_OnCreate_TopicSubscription0_A2B42747"
          }
        },
        "endpoint": "${aws_lambda_function.Bucket_OnCreate-OnMessage0_4C972FB4.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Bucket_OnCreate_9682272C.arn}"
      },
      "Bucket_OnCreate_TopicSubscription1_8F485EA8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnCreate/TopicSubscription1",
            "uniqueId": "Bucket_OnCreate_TopicSubscription1_8F485EA8"
          }
        },
        "endpoint": "${aws_lambda_function.Bucket_OnCreate-OnMessage1_18599D01.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Bucket_OnCreate_9682272C.arn}"
      },
      "Bucket_OnDelete_TopicSubscription0_4D741190": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete/TopicSubscription0",
            "uniqueId": "Bucket_OnDelete_TopicSubscription0_4D741190"
          }
        },
        "endpoint": "${aws_lambda_function.Bucket_OnDelete-OnMessage0_BBD3A051.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Bucket_OnDelete_0EB7243C.arn}"
      },
      "Bucket_OnDelete_TopicSubscription1_8362A2BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnDelete/TopicSubscription1",
            "uniqueId": "Bucket_OnDelete_TopicSubscription1_8362A2BD"
          }
        },
        "endpoint": "${aws_lambda_function.Bucket_OnDelete-OnMessage1_A17F4764.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Bucket_OnDelete_0EB7243C.arn}"
      },
      "Bucket_OnUpdate_TopicSubscription0_6ECDED15": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate/TopicSubscription0",
            "uniqueId": "Bucket_OnUpdate_TopicSubscription0_6ECDED15"
          }
        },
        "endpoint": "${aws_lambda_function.Bucket_OnUpdate-OnMessage0_ABC5042C.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Bucket_OnUpdate_E297838E.arn}"
      },
      "Bucket_OnUpdate_TopicSubscription1_3F3174F8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/OnUpdate/TopicSubscription1",
            "uniqueId": "Bucket_OnUpdate_TopicSubscription1_3F3174F8"
          }
        },
        "endpoint": "${aws_lambda_function.Bucket_OnUpdate-OnMessage1_A9787FC1.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Bucket_OnUpdate_E297838E.arn}"
      }
    }
  }
}
```

