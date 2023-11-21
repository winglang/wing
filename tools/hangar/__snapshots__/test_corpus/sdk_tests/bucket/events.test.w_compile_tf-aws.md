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
      "cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_CloudwatchLogGroup_AF133B90": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-8161fb/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_CloudwatchLogGroup_AF133B90"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-oncreate-OnMessage-8161fb-c81c03cb",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_CloudwatchLogGroup_0049DB82": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-d2940b/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_CloudwatchLogGroup_0049DB82"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-oncreate-OnMessage-d2940b-c81b39e4",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_CloudwatchLogGroup_31904B0A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-7b5773/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_CloudwatchLogGroup_31904B0A"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-ondelete-OnMessage-7b5773-c8f3817a",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_CloudwatchLogGroup_03552C7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-fe7b63/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_CloudwatchLogGroup_03552C7E"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-ondelete-OnMessage-fe7b63-c8f328c4",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_CloudwatchLogGroup_BBB58795": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-18d0e0/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_CloudwatchLogGroup_BBB58795"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-onupdate-OnMessage-18d0e0-c8cb2e11",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-19c992_CloudwatchLogGroup_EFF02B20": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-19c992/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-19c992_CloudwatchLogGroup_EFF02B20"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-onupdate-OnMessage-19c992-c8e2ec87",
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
      "cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_IamRole_D4907C95": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-8161fb/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_IamRole_D4907C95"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_IamRole_17E84805": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-d2940b/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_IamRole_17E84805"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_IamRole_02A03B42": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-7b5773/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_IamRole_02A03B42"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_IamRole_7EA949C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-fe7b63/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_IamRole_7EA949C8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_IamRole_AE8D2175": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-18d0e0/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_IamRole_AE8D2175"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-19c992_IamRole_E125C3A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-19c992/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-19c992_IamRole_E125C3A4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_IamRolePolicy_7A41D8DB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-8161fb/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_IamRolePolicy_7A41D8DB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_IamRole_D4907C95.name}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_IamRolePolicy_C8A48993": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-d2940b/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_IamRolePolicy_C8A48993"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_IamRole_17E84805.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_IamRolePolicy_1F56C229": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-7b5773/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_IamRolePolicy_1F56C229"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_IamRole_02A03B42.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_IamRolePolicy_568B8236": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-fe7b63/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_IamRolePolicy_568B8236"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_IamRole_7EA949C8.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_IamRolePolicy_D6FD3D67": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-18d0e0/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_IamRolePolicy_D6FD3D67"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_IamRole_AE8D2175.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-19c992_IamRolePolicy_5DC3E514": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-19c992/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-19c992_IamRolePolicy_5DC3E514"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-19c992_IamRole_E125C3A4.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_IamRolePolicyAttachment_38EC7981": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-8161fb/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_IamRolePolicyAttachment_38EC7981"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_IamRole_D4907C95.name}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_IamRolePolicyAttachment_26580F86": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-d2940b/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_IamRolePolicyAttachment_26580F86"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_IamRole_17E84805.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_IamRolePolicyAttachment_F42606D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-7b5773/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_IamRolePolicyAttachment_F42606D0"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_IamRole_02A03B42.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_IamRolePolicyAttachment_7E6CE52B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-fe7b63/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_IamRolePolicyAttachment_7E6CE52B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_IamRole_7EA949C8.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_IamRolePolicyAttachment_3FEB2156": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-18d0e0/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_IamRolePolicyAttachment_3FEB2156"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_IamRole_AE8D2175.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-19c992_IamRolePolicyAttachment_F90F147F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-19c992/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-19c992_IamRolePolicyAttachment_F90F147F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-19c992_IamRole_E125C3A4.name}"
      }
    },
    "aws_lambda_function": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_22576243": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-8161fb/Default",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_22576243"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-oncreate-OnMessage-8161fb-c81c03cb",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-oncreate-OnMessage-8161fb-c81c03cb",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_IamRole_D4907C95.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_S3Object_8EC0C0B7.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_90BA814A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-d2940b/Default",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_90BA814A"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-oncreate-OnMessage-d2940b-c81b39e4",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-oncreate-OnMessage-d2940b-c81b39e4",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_IamRole_17E84805.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_S3Object_9C90AAA8.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_106B755B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-7b5773/Default",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_106B755B"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-ondelete-OnMessage-7b5773-c8f3817a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-ondelete-OnMessage-7b5773-c8f3817a",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_IamRole_02A03B42.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_S3Object_353B82A4.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_5D74D116": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-fe7b63/Default",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_5D74D116"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-ondelete-OnMessage-fe7b63-c8f328c4",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-ondelete-OnMessage-fe7b63-c8f328c4",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_IamRole_7EA949C8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_S3Object_74A55CB8.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_BB4C8816": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-18d0e0/Default",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_BB4C8816"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-onupdate-OnMessage-18d0e0-c8cb2e11",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-onupdate-OnMessage-18d0e0-c8cb2e11",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_IamRole_AE8D2175.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_S3Object_CB8C4D21.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-19c992_796A038A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-19c992/Default",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-19c992_796A038A"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-onupdate-OnMessage-19c992-c8e2ec87",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-onupdate-OnMessage-19c992-c8e2ec87",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-19c992_IamRole_E125C3A4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-onupdate-OnMessage-19c992_S3Object_F58731FD.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_B20EE531": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-8161fb/InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_B20EE531"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_22576243.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_22576243.version}",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_47C333BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-d2940b/InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_47C333BD"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_90BA814A.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_90BA814A.version}",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_BA497367": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-7b5773/InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_BA497367"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_106B755B.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_106B755B.version}",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_BC34E233": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-fe7b63/InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_BC34E233"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_5D74D116.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_5D74D116.version}",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_A8D701DB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-18d0e0/InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_A8D701DB"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_BB4C8816.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_BB4C8816.version}",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-19c992_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_DC6CEBCC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-19c992/InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-19c992_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_DC6CEBCC"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-19c992_796A038A.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-19c992_796A038A.version}",
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
      "cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_S3Object_8EC0C0B7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-8161fb/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_S3Object_8EC0C0B7"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_S3Object_9C90AAA8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-d2940b/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_S3Object_9C90AAA8"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_S3Object_353B82A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-7b5773/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_S3Object_353B82A4"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_S3Object_74A55CB8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-fe7b63/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_S3Object_74A55CB8"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_S3Object_CB8C4D21": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-18d0e0/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_S3Object_CB8C4D21"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-19c992_S3Object_F58731FD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-19c992/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-19c992_S3Object_F58731FD"
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
      "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-8161fb_D1448794": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate/cloud.Bucket-oncreate-TopicSubscription-8161fb",
            "uniqueId": "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-8161fb_D1448794"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-8161fb_22576243.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-d2940b_4E1F84FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate/cloud.Bucket-oncreate-TopicSubscription-d2940b",
            "uniqueId": "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-d2940b_4E1F84FF"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-d2940b_90BA814A.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-7b5773_47904DB7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete/cloud.Bucket-ondelete-TopicSubscription-7b5773",
            "uniqueId": "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-7b5773_47904DB7"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-7b5773_106B755B.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-fe7b63_C4ED22A9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete/cloud.Bucket-ondelete-TopicSubscription-fe7b63",
            "uniqueId": "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-fe7b63_C4ED22A9"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-fe7b63_5D74D116.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-18d0e0_82F1E12C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate/cloud.Bucket-onupdate-TopicSubscription-18d0e0",
            "uniqueId": "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-18d0e0_82F1E12C"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-18d0e0_BB4C8816.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
      },
      "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-19c992_24BB85CA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate/cloud.Bucket-onupdate-TopicSubscription-19c992",
            "uniqueId": "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-19c992_24BB85CA"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-19c992_796A038A.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
      }
    }
  }
}
```

