# [invoke.test.w](../../../../../../examples/tests/sdk_tests/function/invoke.test.w) | compile | tf-aws

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
      "cloudFunction_CloudwatchLogGroup_7399B890": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/CloudwatchLogGroup",
            "uniqueId": "cloudFunction_CloudwatchLogGroup_7399B890"
          }
        },
        "name": "/aws/lambda/cloud-Function-c8d2eca1",
        "retention_in_days": 30
      },
      "f2_CloudwatchLogGroup_D231AE41": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/CloudwatchLogGroup",
            "uniqueId": "f2_CloudwatchLogGroup_D231AE41"
          }
        },
        "name": "/aws/lambda/f2-c812cd39",
        "retention_in_days": 30
      },
      "f3_CloudwatchLogGroup_6427B63E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f3/CloudwatchLogGroup",
            "uniqueId": "f3_CloudwatchLogGroup_6427B63E"
          }
        },
        "name": "/aws/lambda/f3-c8555a7c",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudFunction_IamRole_5A4430DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRole",
            "uniqueId": "cloudFunction_IamRole_5A4430DC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "f2_IamRole_B66911B2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/IamRole",
            "uniqueId": "f2_IamRole_B66911B2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "f3_IamRole_72675FA1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f3/IamRole",
            "uniqueId": "f3_IamRole_72675FA1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudFunction_IamRolePolicy_618BF987": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "cloudFunction_IamRolePolicy_618BF987"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.name}"
      },
      "f2_IamRolePolicy_4B68F2E2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/IamRolePolicy",
            "uniqueId": "f2_IamRolePolicy_4B68F2E2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.f2_IamRole_B66911B2.name}"
      },
      "f3_IamRolePolicy_92FF1F39": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f3/IamRolePolicy",
            "uniqueId": "f3_IamRolePolicy_92FF1F39"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.f3_IamRole_72675FA1.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudFunction_IamRolePolicyAttachment_288B9653": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "cloudFunction_IamRolePolicyAttachment_288B9653"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.name}"
      },
      "f2_IamRolePolicyAttachment_E65452F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/IamRolePolicyAttachment",
            "uniqueId": "f2_IamRolePolicyAttachment_E65452F9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.f2_IamRole_B66911B2.name}"
      },
      "f3_IamRolePolicyAttachment_1D6B7824": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f3/IamRolePolicyAttachment",
            "uniqueId": "f3_IamRolePolicyAttachment_1D6B7824"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.f3_IamRole_72675FA1.name}"
      }
    },
    "aws_lambda_function": {
      "cloudFunction": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/Default",
            "uniqueId": "cloudFunction"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Function-c8d2eca1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8d2eca1",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudFunction_S3Object_71908BAD.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "f2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/Default",
            "uniqueId": "f2"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "f2-c812cd39",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "f2-c812cd39",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.f2_IamRole_B66911B2.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.f2_S3Object_ABE842D7.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "f3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f3/Default",
            "uniqueId": "f3"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "f3-c8555a7c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "f3-c8555a7c",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.f3_IamRole_72675FA1.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.f3_S3Object_ED65218A.key}",
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
      }
    },
    "aws_s3_object": {
      "cloudFunction_S3Object_71908BAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/S3Object",
            "uniqueId": "cloudFunction_S3Object_71908BAD"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "f2_S3Object_ABE842D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f2/S3Object",
            "uniqueId": "f2_S3Object_ABE842D7"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "f3_S3Object_ED65218A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/f3/S3Object",
            "uniqueId": "f3_S3Object_ED65218A"
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

