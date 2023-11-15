# [memory_and_env.test.w](../../../../../../examples/tests/sdk_tests/function/memory_and_env.test.w) | compile | tf-aws

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
      "envfn_CloudwatchLogGroup_15C53BE9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/CloudwatchLogGroup",
            "uniqueId": "envfn_CloudwatchLogGroup_15C53BE9"
          }
        },
        "name": "/aws/lambda/env-fn-c8a226dd",
        "retention_in_days": 30
      },
      "memoryfn_CloudwatchLogGroup_73EEAE8E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/CloudwatchLogGroup",
            "uniqueId": "memoryfn_CloudwatchLogGroup_73EEAE8E"
          }
        },
        "name": "/aws/lambda/memory-fn-c844bdf7",
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
      "envfn_IamRole_88E952E6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/IamRole",
            "uniqueId": "envfn_IamRole_88E952E6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "memoryfn_IamRole_87751238": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/IamRole",
            "uniqueId": "memoryfn_IamRole_87751238"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "envfn_IamRolePolicy_63955289": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/IamRolePolicy",
            "uniqueId": "envfn_IamRolePolicy_63955289"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.envfn_IamRole_88E952E6.name}"
      },
      "memoryfn_IamRolePolicy_5DA20EF5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/IamRolePolicy",
            "uniqueId": "memoryfn_IamRolePolicy_5DA20EF5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.memoryfn_IamRole_87751238.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "envfn_IamRolePolicyAttachment_FF624FBC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/IamRolePolicyAttachment",
            "uniqueId": "envfn_IamRolePolicyAttachment_FF624FBC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.envfn_IamRole_88E952E6.name}"
      },
      "memoryfn_IamRolePolicyAttachment_97CAD739": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/IamRolePolicyAttachment",
            "uniqueId": "memoryfn_IamRolePolicyAttachment_97CAD739"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.memoryfn_IamRole_87751238.name}"
      }
    },
    "aws_lambda_function": {
      "envfn": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/Default",
            "uniqueId": "envfn"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "env-fn-c8a226dd",
            "WING_TARGET": "tf-aws",
            "catAge": "2",
            "catName": "Tion"
          }
        },
        "function_name": "env-fn-c8a226dd",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.envfn_IamRole_88E952E6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.envfn_S3Object_0080F00E.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "memoryfn": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/Default",
            "uniqueId": "memoryfn"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "memory-fn-c844bdf7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "memory-fn-c844bdf7",
        "handler": "index.handler",
        "memory_size": 128,
        "publish": true,
        "role": "${aws_iam_role.memoryfn_IamRole_87751238.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.memoryfn_S3Object_3B51C445.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
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
    "aws_s3_object": {
      "envfn_S3Object_0080F00E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/S3Object",
            "uniqueId": "envfn_S3Object_0080F00E"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "memoryfn_S3Object_3B51C445": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/S3Object",
            "uniqueId": "memoryfn_S3Object_3B51C445"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    }
  }
}
```

