# [events.test.w](../../../../../../examples/tests/sdk_tests/bucket/events.test.w) | compile | tf-aws

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
      "cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_CloudwatchLogGroup_55979BA6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-$Closure4/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_CloudwatchLogGroup_55979BA6"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-oncreate-OnMessage--Closure4-c880b41b",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_CloudwatchLogGroup_E8227F8D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-$Closure5/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_CloudwatchLogGroup_E8227F8D"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-oncreate-OnMessage--Closure5-c828e72b",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_CloudwatchLogGroup_5D9A7B57": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-$Closure2/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_CloudwatchLogGroup_5D9A7B57"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-ondelete-OnMessage--Closure2-c8165474",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_CloudwatchLogGroup_3341CE59": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-$Closure5/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_CloudwatchLogGroup_3341CE59"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-ondelete-OnMessage--Closure5-c80f6ef5",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_CloudwatchLogGroup_173DFF00": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-$Closure3/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_CloudwatchLogGroup_173DFF00"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-onupdate-OnMessage--Closure3-c86ef4a4",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_CloudwatchLogGroup_FF809DB0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-$Closure5/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_CloudwatchLogGroup_FF809DB0"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-onupdate-OnMessage--Closure5-c8997013",
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
      },
      "exTable": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.Table/Default",
            "uniqueId": "exTable"
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
        "name": "key-historyex.Table-c840a49c"
      }
    },
    "aws_iam_role": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_IamRole_B087B568": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-$Closure4/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_IamRole_B087B568"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_IamRole_3288E324": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-$Closure5/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_IamRole_3288E324"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_IamRole_F094E7D6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-$Closure2/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_IamRole_F094E7D6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_IamRole_32F455C7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-$Closure5/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_IamRole_32F455C7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_IamRole_14C25918": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-$Closure3/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_IamRole_14C25918"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_IamRole_55C6E848": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-$Closure5/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_IamRole_55C6E848"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_IamRolePolicy_DB72972E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-$Closure4/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_IamRolePolicy_DB72972E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_IamRole_B087B568.name}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_IamRolePolicy_F1FFE2FD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-$Closure5/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_IamRolePolicy_F1FFE2FD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_IamRole_3288E324.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_IamRolePolicy_51E8EF8A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-$Closure2/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_IamRolePolicy_51E8EF8A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_IamRole_F094E7D6.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_IamRolePolicy_52732D69": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-$Closure5/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_IamRolePolicy_52732D69"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_IamRole_32F455C7.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_IamRolePolicy_D14328DE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-$Closure3/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_IamRolePolicy_D14328DE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_IamRole_14C25918.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_IamRolePolicy_1E00938E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-$Closure5/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_IamRolePolicy_1E00938E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_IamRole_55C6E848.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_IamRolePolicyAttachment_AB3FAE8A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-$Closure4/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_IamRolePolicyAttachment_AB3FAE8A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_IamRole_B087B568.name}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_IamRolePolicyAttachment_A1F6D72B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-$Closure5/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_IamRolePolicyAttachment_A1F6D72B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_IamRole_3288E324.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_IamRolePolicyAttachment_45ACA92F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-$Closure2/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_IamRolePolicyAttachment_45ACA92F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_IamRole_F094E7D6.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_IamRolePolicyAttachment_066EADC4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-$Closure5/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_IamRolePolicyAttachment_066EADC4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_IamRole_32F455C7.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_IamRolePolicyAttachment_D31A4BE1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-$Closure3/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_IamRolePolicyAttachment_D31A4BE1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_IamRole_14C25918.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_IamRolePolicyAttachment_2621F895": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-$Closure5/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_IamRolePolicyAttachment_2621F895"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_IamRole_55C6E848.name}"
      }
    },
    "aws_lambda_function": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_A25DC99F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-$Closure4/Default",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_A25DC99F"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Bucket-oncreate-OnMessage--Closure4-c880b41b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-oncreate-OnMessage--Closure4-c880b41b",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_IamRole_B087B568.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_S3Object_855D57CF.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_F74057DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-$Closure5/Default",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_F74057DC"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Bucket-oncreate-OnMessage--Closure5-c828e72b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-oncreate-OnMessage--Closure5-c828e72b",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_IamRole_3288E324.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_S3Object_4726C531.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_B560CD28": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-$Closure2/Default",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_B560CD28"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Bucket-ondelete-OnMessage--Closure2-c8165474",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-ondelete-OnMessage--Closure2-c8165474",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_IamRole_F094E7D6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_S3Object_0CD5254B.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_7EBD40CE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-$Closure5/Default",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_7EBD40CE"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Bucket-ondelete-OnMessage--Closure5-c80f6ef5",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-ondelete-OnMessage--Closure5-c80f6ef5",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_IamRole_32F455C7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_S3Object_372EEC30.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_D97054FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-$Closure3/Default",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_D97054FA"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Bucket-onupdate-OnMessage--Closure3-c86ef4a4",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-onupdate-OnMessage--Closure3-c86ef4a4",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_IamRole_14C25918.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_S3Object_9D13C0AA.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_8B71760C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-$Closure5/Default",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_8B71760C"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Bucket-onupdate-OnMessage--Closure5-c8997013",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-onupdate-OnMessage--Closure5-c8997013",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_IamRole_55C6E848.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_S3Object_F789C503.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_399ADF3A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-$Closure4/InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_399ADF3A"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_A25DC99F.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_53F801D1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-$Closure5/InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_53F801D1"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_F74057DC.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_0DABFA5C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-$Closure2/InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_0DABFA5C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_B560CD28.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_6A3F5EEB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-$Closure5/InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_6A3F5EEB"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_7EBD40CE.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_192DE604": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-$Closure3/InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_192DE604"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_D97054FA.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_A67305E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-$Closure5/InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_A67305E3"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_8B71760C.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
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
      },
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_notification": {
      "cloudBucket_S3BucketNotification_7C82677F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3BucketNotification",
            "uniqueId": "cloudBucket_S3BucketNotification_7C82677F"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.id}",
        "depends_on": [
          "aws_sns_topic_policy.cloudBucket_cloudBucket-ondelete_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_63EEA617",
          "aws_sns_topic_policy.cloudBucket_cloudBucket-onupdate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_AACD1271",
          "aws_sns_topic_policy.cloudBucket_cloudBucket-oncreate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_2B35518E"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-ondelete-notification",
            "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-onupdate-notification",
            "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
          }
        ]
      }
    },
    "aws_s3_object": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_S3Object_855D57CF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-$Closure4/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_S3Object_855D57CF"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_S3Object_4726C531": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-$Closure5/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_S3Object_4726C531"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_S3Object_0CD5254B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-$Closure2/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_S3Object_0CD5254B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_S3Object_372EEC30": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-$Closure5/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_S3Object_372EEC30"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_S3Object_9D13C0AA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-$Closure3/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_S3Object_9D13C0AA"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_S3Object_F789C503": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-$Closure5/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_S3Object_F789C503"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "cloudBucket_cloudBucket-oncreate_CBC9308E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate/Default",
            "uniqueId": "cloudBucket_cloudBucket-oncreate_CBC9308E"
          }
        },
        "name": "cloud-Bucket-oncreate-c8d5f231"
      },
      "cloudBucket_cloudBucket-ondelete_C031AAEE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete/Default",
            "uniqueId": "cloudBucket_cloudBucket-ondelete_C031AAEE"
          }
        },
        "name": "cloud-Bucket-ondelete-c8124745"
      },
      "cloudBucket_cloudBucket-onupdate_27807F64": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate/Default",
            "uniqueId": "cloudBucket_cloudBucket-onupdate_27807F64"
          }
        },
        "name": "cloud-Bucket-onupdate-c822c2b6"
      }
    },
    "aws_sns_topic_policy": {
      "cloudBucket_cloudBucket-oncreate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_2B35518E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "cloudBucket_cloudBucket-oncreate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_2B35518E"
          }
        },
        "arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.cloudBucket.arn}\"}}}]}"
      },
      "cloudBucket_cloudBucket-ondelete_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_63EEA617": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "cloudBucket_cloudBucket-ondelete_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_63EEA617"
          }
        },
        "arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.cloudBucket.arn}\"}}}]}"
      },
      "cloudBucket_cloudBucket-onupdate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_AACD1271": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "cloudBucket_cloudBucket-onupdate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_AACD1271"
          }
        },
        "arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.cloudBucket.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-Closure4_F478162A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate/cloud.Bucket-oncreate-TopicSubscription-$Closure4",
            "uniqueId": "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-Closure4_F478162A"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-Closure4_A25DC99F.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-Closure5_110BBAC5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate/cloud.Bucket-oncreate-TopicSubscription-$Closure5",
            "uniqueId": "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-Closure5_110BBAC5"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-Closure5_F74057DC.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-Closure2_1F11C00B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete/cloud.Bucket-ondelete-TopicSubscription-$Closure2",
            "uniqueId": "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-Closure2_1F11C00B"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-Closure2_B560CD28.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-Closure5_5507009D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete/cloud.Bucket-ondelete-TopicSubscription-$Closure5",
            "uniqueId": "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-Closure5_5507009D"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-Closure5_7EBD40CE.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-Closure3_D4FEEB6D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate/cloud.Bucket-onupdate-TopicSubscription-$Closure3",
            "uniqueId": "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-Closure3_D4FEEB6D"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-Closure3_D97054FA.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
      },
      "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-Closure5_C0D6FF8C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate/cloud.Bucket-onupdate-TopicSubscription-$Closure5",
            "uniqueId": "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-Closure5_C0D6FF8C"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-Closure5_8B71760C.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
      }
    }
  }
}
```

