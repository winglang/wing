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
      "cloudBucket_cloudBucket-oncreate-OnMessage-48528e_CloudwatchLogGroup_31A264C7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-48528e/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-48528e_CloudwatchLogGroup_31A264C7"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-oncreate-OnMessage-48528e-c8dc1a76",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_CloudwatchLogGroup_1E13BC7A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-764c5e/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_CloudwatchLogGroup_1E13BC7A"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-oncreate-OnMessage-764c5e-c877c920",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_CloudwatchLogGroup_14D88B5F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-36c0b6/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_CloudwatchLogGroup_14D88B5F"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-ondelete-OnMessage-36c0b6-c8fbb3fa",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_CloudwatchLogGroup_B54E29E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-d459bc/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_CloudwatchLogGroup_B54E29E4"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-ondelete-OnMessage-d459bc-c8b517c0",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_CloudwatchLogGroup_FC1AB5F8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-285f3a/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_CloudwatchLogGroup_FC1AB5F8"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-onupdate-OnMessage-285f3a-c8ba1f12",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_CloudwatchLogGroup_36791DC6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-a755c2/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_CloudwatchLogGroup_36791DC6"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-onupdate-OnMessage-a755c2-c879c5b8",
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
      "cloudBucket_cloudBucket-oncreate-OnMessage-48528e_IamRole_3ABA1AB8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-48528e/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-48528e_IamRole_3ABA1AB8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_IamRole_1B9D7950": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-764c5e/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_IamRole_1B9D7950"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_IamRole_B5AB316F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-36c0b6/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_IamRole_B5AB316F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_IamRole_8CDBB170": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-d459bc/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_IamRole_8CDBB170"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_IamRole_5A895168": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-285f3a/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_IamRole_5A895168"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_IamRole_6B97DD6C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-a755c2/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_IamRole_6B97DD6C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-48528e_IamRolePolicy_92EC8F38": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-48528e/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-48528e_IamRolePolicy_92EC8F38"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-48528e_IamRole_3ABA1AB8.name}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_IamRolePolicy_65766943": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-764c5e/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_IamRolePolicy_65766943"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_IamRole_1B9D7950.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_IamRolePolicy_EC216CD1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-36c0b6/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_IamRolePolicy_EC216CD1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_IamRole_B5AB316F.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_IamRolePolicy_F5F6D4EB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-d459bc/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_IamRolePolicy_F5F6D4EB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_IamRole_8CDBB170.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_IamRolePolicy_9D09203C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-285f3a/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_IamRolePolicy_9D09203C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_IamRole_5A895168.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_IamRolePolicy_D4FC773C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-a755c2/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_IamRolePolicy_D4FC773C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_IamRole_6B97DD6C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-48528e_IamRolePolicyAttachment_6705425A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-48528e/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-48528e_IamRolePolicyAttachment_6705425A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-48528e_IamRole_3ABA1AB8.name}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_IamRolePolicyAttachment_62D227B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-764c5e/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_IamRolePolicyAttachment_62D227B9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_IamRole_1B9D7950.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_IamRolePolicyAttachment_3C8FBAD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-36c0b6/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_IamRolePolicyAttachment_3C8FBAD0"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_IamRole_B5AB316F.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_IamRolePolicyAttachment_790D1E75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-d459bc/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_IamRolePolicyAttachment_790D1E75"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_IamRole_8CDBB170.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_IamRolePolicyAttachment_FFEC8728": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-285f3a/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_IamRolePolicyAttachment_FFEC8728"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_IamRole_5A895168.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_IamRolePolicyAttachment_9AE890E1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-a755c2/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_IamRolePolicyAttachment_9AE890E1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_IamRole_6B97DD6C.name}"
      }
    },
    "aws_lambda_function": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-48528e_D6757F28": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-48528e/Default",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-48528e_D6757F28"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-oncreate-OnMessage-48528e-c8dc1a76",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-oncreate-OnMessage-48528e-c8dc1a76",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-48528e_IamRole_3ABA1AB8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-oncreate-OnMessage-48528e_S3Object_F50C86FD.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_672F3151": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-764c5e/Default",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_672F3151"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-oncreate-OnMessage-764c5e-c877c920",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-oncreate-OnMessage-764c5e-c877c920",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_IamRole_1B9D7950.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_S3Object_642E9F24.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_7B883273": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-36c0b6/Default",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_7B883273"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-ondelete-OnMessage-36c0b6-c8fbb3fa",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-ondelete-OnMessage-36c0b6-c8fbb3fa",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_IamRole_B5AB316F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_S3Object_248B6479.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_8FFEA5D2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-d459bc/Default",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_8FFEA5D2"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-ondelete-OnMessage-d459bc-c8b517c0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-ondelete-OnMessage-d459bc-c8b517c0",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_IamRole_8CDBB170.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_S3Object_10FC2E6E.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_09B09489": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-285f3a/Default",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_09B09489"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-onupdate-OnMessage-285f3a-c8ba1f12",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-onupdate-OnMessage-285f3a-c8ba1f12",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_IamRole_5A895168.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_S3Object_F723001B.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_4DC6E04B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-a755c2/Default",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_4DC6E04B"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-onupdate-OnMessage-a755c2-c879c5b8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-onupdate-OnMessage-a755c2-c879c5b8",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_IamRole_6B97DD6C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_S3Object_314E9E3B.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-48528e_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_D47F666F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-48528e/InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-48528e_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_D47F666F"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-48528e_D6757F28.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-48528e_D6757F28.version}",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_AC0D2A6A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-764c5e/InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_AC0D2A6A"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_672F3151.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_672F3151.version}",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_B3105037": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-36c0b6/InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_B3105037"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_7B883273.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_7B883273.version}",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_D75F559F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-d459bc/InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_D75F559F"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_8FFEA5D2.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_8FFEA5D2.version}",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_CED73AE2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-285f3a/InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_CED73AE2"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_09B09489.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_09B09489.version}",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_0E388AA1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-a755c2/InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_0E388AA1"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_4DC6E04B.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_4DC6E04B.version}",
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
      "cloudBucket_cloudBucket-oncreate-OnMessage-48528e_S3Object_F50C86FD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-48528e/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-48528e_S3Object_F50C86FD"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_S3Object_642E9F24": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-764c5e/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_S3Object_642E9F24"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_S3Object_248B6479": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-36c0b6/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_S3Object_248B6479"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_S3Object_10FC2E6E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-d459bc/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_S3Object_10FC2E6E"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_S3Object_F723001B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-285f3a/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_S3Object_F723001B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_S3Object_314E9E3B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-a755c2/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_S3Object_314E9E3B"
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
      "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-48528e_443E1AC7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate/cloud.Bucket-oncreate-TopicSubscription-48528e",
            "uniqueId": "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-48528e_443E1AC7"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-48528e_D6757F28.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-764c5e_45B326E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate/cloud.Bucket-oncreate-TopicSubscription-764c5e",
            "uniqueId": "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-764c5e_45B326E4"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-764c5e_672F3151.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-36c0b6_37626DE1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete/cloud.Bucket-ondelete-TopicSubscription-36c0b6",
            "uniqueId": "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-36c0b6_37626DE1"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-36c0b6_7B883273.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-d459bc_2182F995": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete/cloud.Bucket-ondelete-TopicSubscription-d459bc",
            "uniqueId": "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-d459bc_2182F995"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-d459bc_8FFEA5D2.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-285f3a_3635C4FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate/cloud.Bucket-onupdate-TopicSubscription-285f3a",
            "uniqueId": "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-285f3a_3635C4FA"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-285f3a_09B09489.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
      },
      "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-a755c2_77DB3850": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate/cloud.Bucket-onupdate-TopicSubscription-a755c2",
            "uniqueId": "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-a755c2_77DB3850"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-a755c2_4DC6E04B.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
      }
    }
  }
}
```

