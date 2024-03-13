# [events.test.w](../../../../../../examples/tests/sdk_tests/bucket/events.test.w) | compile | tf-aws

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
      "Bucket_oncreate-OnMessage0_CloudwatchLogGroup_9ADBAD73": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "Bucket_oncreate-OnMessage0_CloudwatchLogGroup_9ADBAD73"
          }
        },
        "name": "/aws/lambda/oncreate-OnMessage0-c87abc21",
        "retention_in_days": 30
      },
      "Bucket_oncreate-OnMessage1_CloudwatchLogGroup_37B9C8C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate-OnMessage1/CloudwatchLogGroup",
            "uniqueId": "Bucket_oncreate-OnMessage1_CloudwatchLogGroup_37B9C8C4"
          }
        },
        "name": "/aws/lambda/oncreate-OnMessage1-c800fec8",
        "retention_in_days": 30
      },
      "Bucket_ondelete-OnMessage0_CloudwatchLogGroup_5F88C98D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "Bucket_ondelete-OnMessage0_CloudwatchLogGroup_5F88C98D"
          }
        },
        "name": "/aws/lambda/ondelete-OnMessage0-c8a38b5a",
        "retention_in_days": 30
      },
      "Bucket_ondelete-OnMessage1_CloudwatchLogGroup_AE7AA81E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete-OnMessage1/CloudwatchLogGroup",
            "uniqueId": "Bucket_ondelete-OnMessage1_CloudwatchLogGroup_AE7AA81E"
          }
        },
        "name": "/aws/lambda/ondelete-OnMessage1-c82792b8",
        "retention_in_days": 30
      },
      "Bucket_onupdate-OnMessage0_CloudwatchLogGroup_C8045188": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "Bucket_onupdate-OnMessage0_CloudwatchLogGroup_C8045188"
          }
        },
        "name": "/aws/lambda/onupdate-OnMessage0-c835180c",
        "retention_in_days": 30
      },
      "Bucket_onupdate-OnMessage1_CloudwatchLogGroup_D6757AF5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate-OnMessage1/CloudwatchLogGroup",
            "uniqueId": "Bucket_onupdate-OnMessage1_CloudwatchLogGroup_D6757AF5"
          }
        },
        "name": "/aws/lambda/onupdate-OnMessage1-c8826493",
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
      "Bucket_oncreate-OnMessage0_IamRole_0DECFA72": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate-OnMessage0/IamRole",
            "uniqueId": "Bucket_oncreate-OnMessage0_IamRole_0DECFA72"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Bucket_oncreate-OnMessage1_IamRole_EAFD952E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate-OnMessage1/IamRole",
            "uniqueId": "Bucket_oncreate-OnMessage1_IamRole_EAFD952E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Bucket_ondelete-OnMessage0_IamRole_50F5B4CA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete-OnMessage0/IamRole",
            "uniqueId": "Bucket_ondelete-OnMessage0_IamRole_50F5B4CA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Bucket_ondelete-OnMessage1_IamRole_BE60A7EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete-OnMessage1/IamRole",
            "uniqueId": "Bucket_ondelete-OnMessage1_IamRole_BE60A7EC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Bucket_onupdate-OnMessage0_IamRole_B95F0C0C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate-OnMessage0/IamRole",
            "uniqueId": "Bucket_onupdate-OnMessage0_IamRole_B95F0C0C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Bucket_onupdate-OnMessage1_IamRole_93BC24D8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate-OnMessage1/IamRole",
            "uniqueId": "Bucket_onupdate-OnMessage1_IamRole_93BC24D8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Bucket_oncreate-OnMessage0_IamRolePolicy_ED4BBB06": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate-OnMessage0/IamRolePolicy",
            "uniqueId": "Bucket_oncreate-OnMessage0_IamRolePolicy_ED4BBB06"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.Table.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Bucket_oncreate-OnMessage0_IamRole_0DECFA72.name}"
      },
      "Bucket_oncreate-OnMessage1_IamRolePolicy_555608BE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate-OnMessage1/IamRolePolicy",
            "uniqueId": "Bucket_oncreate-OnMessage1_IamRolePolicy_555608BE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.Table.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Bucket_oncreate-OnMessage1_IamRole_EAFD952E.name}"
      },
      "Bucket_ondelete-OnMessage0_IamRolePolicy_EE79076B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete-OnMessage0/IamRolePolicy",
            "uniqueId": "Bucket_ondelete-OnMessage0_IamRolePolicy_EE79076B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.Table.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Bucket_ondelete-OnMessage0_IamRole_50F5B4CA.name}"
      },
      "Bucket_ondelete-OnMessage1_IamRolePolicy_517C3979": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete-OnMessage1/IamRolePolicy",
            "uniqueId": "Bucket_ondelete-OnMessage1_IamRolePolicy_517C3979"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.Table.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Bucket_ondelete-OnMessage1_IamRole_BE60A7EC.name}"
      },
      "Bucket_onupdate-OnMessage0_IamRolePolicy_95CC8F41": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate-OnMessage0/IamRolePolicy",
            "uniqueId": "Bucket_onupdate-OnMessage0_IamRolePolicy_95CC8F41"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.Table.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Bucket_onupdate-OnMessage0_IamRole_B95F0C0C.name}"
      },
      "Bucket_onupdate-OnMessage1_IamRolePolicy_9C89E111": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate-OnMessage1/IamRolePolicy",
            "uniqueId": "Bucket_onupdate-OnMessage1_IamRolePolicy_9C89E111"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.Table.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Bucket_onupdate-OnMessage1_IamRole_93BC24D8.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Bucket_oncreate-OnMessage0_IamRolePolicyAttachment_1AE31BFB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "Bucket_oncreate-OnMessage0_IamRolePolicyAttachment_1AE31BFB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Bucket_oncreate-OnMessage0_IamRole_0DECFA72.name}"
      },
      "Bucket_oncreate-OnMessage1_IamRolePolicyAttachment_FE0643F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate-OnMessage1/IamRolePolicyAttachment",
            "uniqueId": "Bucket_oncreate-OnMessage1_IamRolePolicyAttachment_FE0643F9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Bucket_oncreate-OnMessage1_IamRole_EAFD952E.name}"
      },
      "Bucket_ondelete-OnMessage0_IamRolePolicyAttachment_7C1D0962": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "Bucket_ondelete-OnMessage0_IamRolePolicyAttachment_7C1D0962"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Bucket_ondelete-OnMessage0_IamRole_50F5B4CA.name}"
      },
      "Bucket_ondelete-OnMessage1_IamRolePolicyAttachment_A21F4631": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete-OnMessage1/IamRolePolicyAttachment",
            "uniqueId": "Bucket_ondelete-OnMessage1_IamRolePolicyAttachment_A21F4631"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Bucket_ondelete-OnMessage1_IamRole_BE60A7EC.name}"
      },
      "Bucket_onupdate-OnMessage0_IamRolePolicyAttachment_753AF495": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "Bucket_onupdate-OnMessage0_IamRolePolicyAttachment_753AF495"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Bucket_onupdate-OnMessage0_IamRole_B95F0C0C.name}"
      },
      "Bucket_onupdate-OnMessage1_IamRolePolicyAttachment_A8068B10": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate-OnMessage1/IamRolePolicyAttachment",
            "uniqueId": "Bucket_onupdate-OnMessage1_IamRolePolicyAttachment_A8068B10"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Bucket_onupdate-OnMessage1_IamRole_93BC24D8.name}"
      }
    },
    "aws_lambda_function": {
      "Bucket_oncreate-OnMessage0_64FDCB47": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate-OnMessage0/Default",
            "uniqueId": "Bucket_oncreate-OnMessage0_64FDCB47"
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
            "WING_FUNCTION_NAME": "oncreate-OnMessage0-c87abc21",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "oncreate-OnMessage0-c87abc21",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Bucket_oncreate-OnMessage0_IamRole_0DECFA72.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Bucket_oncreate-OnMessage0_S3Object_F105B125.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Bucket_oncreate-OnMessage1_BC956365": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate-OnMessage1/Default",
            "uniqueId": "Bucket_oncreate-OnMessage1_BC956365"
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
            "WING_FUNCTION_NAME": "oncreate-OnMessage1-c800fec8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "oncreate-OnMessage1-c800fec8",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Bucket_oncreate-OnMessage1_IamRole_EAFD952E.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Bucket_oncreate-OnMessage1_S3Object_F92E0B51.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Bucket_ondelete-OnMessage0_31A1E9E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete-OnMessage0/Default",
            "uniqueId": "Bucket_ondelete-OnMessage0_31A1E9E4"
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
            "WING_FUNCTION_NAME": "ondelete-OnMessage0-c8a38b5a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "ondelete-OnMessage0-c8a38b5a",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Bucket_ondelete-OnMessage0_IamRole_50F5B4CA.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Bucket_ondelete-OnMessage0_S3Object_DE6CDD43.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Bucket_ondelete-OnMessage1_5BBC7743": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete-OnMessage1/Default",
            "uniqueId": "Bucket_ondelete-OnMessage1_5BBC7743"
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
            "WING_FUNCTION_NAME": "ondelete-OnMessage1-c82792b8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "ondelete-OnMessage1-c82792b8",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Bucket_ondelete-OnMessage1_IamRole_BE60A7EC.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Bucket_ondelete-OnMessage1_S3Object_DE98D974.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Bucket_onupdate-OnMessage0_2FBE69C5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate-OnMessage0/Default",
            "uniqueId": "Bucket_onupdate-OnMessage0_2FBE69C5"
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
            "WING_FUNCTION_NAME": "onupdate-OnMessage0-c835180c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "onupdate-OnMessage0-c835180c",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Bucket_onupdate-OnMessage0_IamRole_B95F0C0C.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Bucket_onupdate-OnMessage0_S3Object_B4B3C51E.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Bucket_onupdate-OnMessage1_DDC08FAE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate-OnMessage1/Default",
            "uniqueId": "Bucket_onupdate-OnMessage1_DDC08FAE"
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
            "WING_FUNCTION_NAME": "onupdate-OnMessage1-c8826493",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "onupdate-OnMessage1-c8826493",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Bucket_onupdate-OnMessage1_IamRole_93BC24D8.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Bucket_onupdate-OnMessage1_S3Object_12D7055B.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Bucket_oncreate-OnMessage0_InvokePermission-c80311dcc4aadf68b1b7fbea8bf5da640f0dde68f4_DD3AB632": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate-OnMessage0/InvokePermission-c80311dcc4aadf68b1b7fbea8bf5da640f0dde68f4",
            "uniqueId": "Bucket_oncreate-OnMessage0_InvokePermission-c80311dcc4aadf68b1b7fbea8bf5da640f0dde68f4_DD3AB632"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Bucket_oncreate-OnMessage0_64FDCB47.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Bucket_oncreate_05DB4E53.arn}"
      },
      "Bucket_oncreate-OnMessage1_InvokePermission-c80311dcc4aadf68b1b7fbea8bf5da640f0dde68f4_F6194849": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate-OnMessage1/InvokePermission-c80311dcc4aadf68b1b7fbea8bf5da640f0dde68f4",
            "uniqueId": "Bucket_oncreate-OnMessage1_InvokePermission-c80311dcc4aadf68b1b7fbea8bf5da640f0dde68f4_F6194849"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Bucket_oncreate-OnMessage1_BC956365.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Bucket_oncreate_05DB4E53.arn}"
      },
      "Bucket_ondelete-OnMessage0_InvokePermission-c8d079b3d06057215794f77e7e4bf9c5113e5b753b_AFF2F4D8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete-OnMessage0/InvokePermission-c8d079b3d06057215794f77e7e4bf9c5113e5b753b",
            "uniqueId": "Bucket_ondelete-OnMessage0_InvokePermission-c8d079b3d06057215794f77e7e4bf9c5113e5b753b_AFF2F4D8"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Bucket_ondelete-OnMessage0_31A1E9E4.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Bucket_ondelete_7F3A2B6C.arn}"
      },
      "Bucket_ondelete-OnMessage1_InvokePermission-c8d079b3d06057215794f77e7e4bf9c5113e5b753b_ADE9F930": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete-OnMessage1/InvokePermission-c8d079b3d06057215794f77e7e4bf9c5113e5b753b",
            "uniqueId": "Bucket_ondelete-OnMessage1_InvokePermission-c8d079b3d06057215794f77e7e4bf9c5113e5b753b_ADE9F930"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Bucket_ondelete-OnMessage1_5BBC7743.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Bucket_ondelete_7F3A2B6C.arn}"
      },
      "Bucket_onupdate-OnMessage0_InvokePermission-c83c88094423e3602c58db2402f439eb720806a401_3F79E9CA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate-OnMessage0/InvokePermission-c83c88094423e3602c58db2402f439eb720806a401",
            "uniqueId": "Bucket_onupdate-OnMessage0_InvokePermission-c83c88094423e3602c58db2402f439eb720806a401_3F79E9CA"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Bucket_onupdate-OnMessage0_2FBE69C5.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Bucket_onupdate_658D07E4.arn}"
      },
      "Bucket_onupdate-OnMessage1_InvokePermission-c83c88094423e3602c58db2402f439eb720806a401_656518F7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate-OnMessage1/InvokePermission-c83c88094423e3602c58db2402f439eb720806a401",
            "uniqueId": "Bucket_onupdate-OnMessage1_InvokePermission-c83c88094423e3602c58db2402f439eb720806a401_656518F7"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Bucket_onupdate-OnMessage1_DDC08FAE.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Bucket_onupdate_658D07E4.arn}"
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
          "aws_sns_topic_policy.Bucket_ondelete_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_ABACCC4A",
          "aws_sns_topic_policy.Bucket_onupdate_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_CFB72F4E",
          "aws_sns_topic_policy.Bucket_oncreate_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_E0552A1A"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-ondelete-notification",
            "topic_arn": "${aws_sns_topic.Bucket_ondelete_7F3A2B6C.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-onupdate-notification",
            "topic_arn": "${aws_sns_topic.Bucket_onupdate_658D07E4.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.Bucket_oncreate_05DB4E53.arn}"
          }
        ]
      }
    },
    "aws_s3_object": {
      "Bucket_oncreate-OnMessage0_S3Object_F105B125": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate-OnMessage0/S3Object",
            "uniqueId": "Bucket_oncreate-OnMessage0_S3Object_F105B125"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Bucket_oncreate-OnMessage1_S3Object_F92E0B51": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate-OnMessage1/S3Object",
            "uniqueId": "Bucket_oncreate-OnMessage1_S3Object_F92E0B51"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Bucket_ondelete-OnMessage0_S3Object_DE6CDD43": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete-OnMessage0/S3Object",
            "uniqueId": "Bucket_ondelete-OnMessage0_S3Object_DE6CDD43"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Bucket_ondelete-OnMessage1_S3Object_DE98D974": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete-OnMessage1/S3Object",
            "uniqueId": "Bucket_ondelete-OnMessage1_S3Object_DE98D974"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Bucket_onupdate-OnMessage0_S3Object_B4B3C51E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate-OnMessage0/S3Object",
            "uniqueId": "Bucket_onupdate-OnMessage0_S3Object_B4B3C51E"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Bucket_onupdate-OnMessage1_S3Object_12D7055B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate-OnMessage1/S3Object",
            "uniqueId": "Bucket_onupdate-OnMessage1_S3Object_12D7055B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "Bucket_oncreate_05DB4E53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate/Default",
            "uniqueId": "Bucket_oncreate_05DB4E53"
          }
        },
        "name": "oncreate-c80311dc"
      },
      "Bucket_ondelete_7F3A2B6C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete/Default",
            "uniqueId": "Bucket_ondelete_7F3A2B6C"
          }
        },
        "name": "ondelete-c8d079b3"
      },
      "Bucket_onupdate_658D07E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate/Default",
            "uniqueId": "Bucket_onupdate_658D07E4"
          }
        },
        "name": "onupdate-c83c8809"
      }
    },
    "aws_sns_topic_policy": {
      "Bucket_oncreate_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_E0552A1A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate/PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a",
            "uniqueId": "Bucket_oncreate_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_E0552A1A"
          }
        },
        "arn": "${aws_sns_topic.Bucket_oncreate_05DB4E53.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.Bucket_oncreate_05DB4E53.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.Bucket.arn}\"}}}]}"
      },
      "Bucket_ondelete_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_ABACCC4A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete/PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a",
            "uniqueId": "Bucket_ondelete_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_ABACCC4A"
          }
        },
        "arn": "${aws_sns_topic.Bucket_ondelete_7F3A2B6C.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.Bucket_ondelete_7F3A2B6C.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.Bucket.arn}\"}}}]}"
      },
      "Bucket_onupdate_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_CFB72F4E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate/PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a",
            "uniqueId": "Bucket_onupdate_PublishPermission-c88fdc5f491a51d8438235500a4821fbc31357ca3a_CFB72F4E"
          }
        },
        "arn": "${aws_sns_topic.Bucket_onupdate_658D07E4.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.Bucket_onupdate_658D07E4.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.Bucket.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "Bucket_oncreate_TopicSubscription0_02705B37": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate/TopicSubscription0",
            "uniqueId": "Bucket_oncreate_TopicSubscription0_02705B37"
          }
        },
        "endpoint": "${aws_lambda_function.Bucket_oncreate-OnMessage0_64FDCB47.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Bucket_oncreate_05DB4E53.arn}"
      },
      "Bucket_oncreate_TopicSubscription1_CAD043F1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/oncreate/TopicSubscription1",
            "uniqueId": "Bucket_oncreate_TopicSubscription1_CAD043F1"
          }
        },
        "endpoint": "${aws_lambda_function.Bucket_oncreate-OnMessage1_BC956365.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Bucket_oncreate_05DB4E53.arn}"
      },
      "Bucket_ondelete_TopicSubscription0_4F3E33C7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete/TopicSubscription0",
            "uniqueId": "Bucket_ondelete_TopicSubscription0_4F3E33C7"
          }
        },
        "endpoint": "${aws_lambda_function.Bucket_ondelete-OnMessage0_31A1E9E4.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Bucket_ondelete_7F3A2B6C.arn}"
      },
      "Bucket_ondelete_TopicSubscription1_575AD2C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/ondelete/TopicSubscription1",
            "uniqueId": "Bucket_ondelete_TopicSubscription1_575AD2C4"
          }
        },
        "endpoint": "${aws_lambda_function.Bucket_ondelete-OnMessage1_5BBC7743.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Bucket_ondelete_7F3A2B6C.arn}"
      },
      "Bucket_onupdate_TopicSubscription0_7ED55DE3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate/TopicSubscription0",
            "uniqueId": "Bucket_onupdate_TopicSubscription0_7ED55DE3"
          }
        },
        "endpoint": "${aws_lambda_function.Bucket_onupdate-OnMessage0_2FBE69C5.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Bucket_onupdate_658D07E4.arn}"
      },
      "Bucket_onupdate_TopicSubscription1_8652ABA3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/onupdate/TopicSubscription1",
            "uniqueId": "Bucket_onupdate_TopicSubscription1_8652ABA3"
          }
        },
        "endpoint": "${aws_lambda_function.Bucket_onupdate-OnMessage1_DDC08FAE.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Bucket_onupdate_658D07E4.arn}"
      }
    }
  }
}
```

