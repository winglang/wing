# [bucket-ref.test.w](../../../../../../examples/tests/sdk_tests/bucket/bucket-ref.test.w) | compile | tf-aws

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
      "BucketRef_AwsConsoleField_Handler_CloudwatchLogGroup_4D1EBC65": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/AwsConsoleField/Handler/CloudwatchLogGroup",
            "uniqueId": "BucketRef_AwsConsoleField_Handler_CloudwatchLogGroup_4D1EBC65"
          }
        },
        "name": "/aws/lambda/Handler-c85d8af5",
        "retention_in_days": 30
      },
      "BucketRef_BucketArnField_Handler_CloudwatchLogGroup_FBE2A504": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/BucketArnField/Handler/CloudwatchLogGroup",
            "uniqueId": "BucketRef_BucketArnField_Handler_CloudwatchLogGroup_FBE2A504"
          }
        },
        "name": "/aws/lambda/Handler-c85e098f",
        "retention_in_days": 30
      },
      "BucketRef_BucketNameField_Handler_CloudwatchLogGroup_EB9D84EB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/BucketNameField/Handler/CloudwatchLogGroup",
            "uniqueId": "BucketRef_BucketNameField_Handler_CloudwatchLogGroup_EB9D84EB"
          }
        },
        "name": "/aws/lambda/Handler-c885f795",
        "retention_in_days": 30
      },
      "BucketRef_FileBrowser_delete_CloudwatchLogGroup_03193899": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/delete/CloudwatchLogGroup",
            "uniqueId": "BucketRef_FileBrowser_delete_CloudwatchLogGroup_03193899"
          }
        },
        "name": "/aws/lambda/delete-c8d8aa8e",
        "retention_in_days": 30
      },
      "BucketRef_FileBrowser_get_CloudwatchLogGroup_F6322EE3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/get/CloudwatchLogGroup",
            "uniqueId": "BucketRef_FileBrowser_get_CloudwatchLogGroup_F6322EE3"
          }
        },
        "name": "/aws/lambda/get-c8ba1e5f",
        "retention_in_days": 30
      },
      "BucketRef_FileBrowser_list_CloudwatchLogGroup_F3917C68": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/list/CloudwatchLogGroup",
            "uniqueId": "BucketRef_FileBrowser_list_CloudwatchLogGroup_F3917C68"
          }
        },
        "name": "/aws/lambda/list-c88fd67a",
        "retention_in_days": 30
      },
      "BucketRef_FileBrowser_put_CloudwatchLogGroup_7FDBAF92": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/put/CloudwatchLogGroup",
            "uniqueId": "BucketRef_FileBrowser_put_CloudwatchLogGroup_7FDBAF92"
          }
        },
        "name": "/aws/lambda/put-c8cdb51a",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "BucketRef_AwsConsoleField_Handler_IamRole_BF718408": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/AwsConsoleField/Handler/IamRole",
            "uniqueId": "BucketRef_AwsConsoleField_Handler_IamRole_BF718408"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "BucketRef_BucketArnField_Handler_IamRole_DF52E4B1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/BucketArnField/Handler/IamRole",
            "uniqueId": "BucketRef_BucketArnField_Handler_IamRole_DF52E4B1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "BucketRef_BucketNameField_Handler_IamRole_4C746299": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/BucketNameField/Handler/IamRole",
            "uniqueId": "BucketRef_BucketNameField_Handler_IamRole_4C746299"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "BucketRef_FileBrowser_delete_IamRole_A66062FE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/delete/IamRole",
            "uniqueId": "BucketRef_FileBrowser_delete_IamRole_A66062FE"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "BucketRef_FileBrowser_get_IamRole_8E0DB684": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/get/IamRole",
            "uniqueId": "BucketRef_FileBrowser_get_IamRole_8E0DB684"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "BucketRef_FileBrowser_list_IamRole_DC0C9222": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/list/IamRole",
            "uniqueId": "BucketRef_FileBrowser_list_IamRole_DC0C9222"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "BucketRef_FileBrowser_put_IamRole_9C4230CD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/put/IamRole",
            "uniqueId": "BucketRef_FileBrowser_put_IamRole_9C4230CD"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "BucketRef_AwsConsoleField_Handler_IamRolePolicy_CE523926": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/AwsConsoleField/Handler/IamRolePolicy",
            "uniqueId": "BucketRef_AwsConsoleField_Handler_IamRolePolicy_CE523926"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\",\"s3:CopyObject\"],\"Resource\":[\"arn:aws:s3:::${aws_s3_bucket.Bucket.bucket}\",\"arn:aws:s3:::${aws_s3_bucket.Bucket.bucket}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.BucketRef_AwsConsoleField_Handler_IamRole_BF718408.name}"
      },
      "BucketRef_BucketArnField_Handler_IamRolePolicy_566A37EB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/BucketArnField/Handler/IamRolePolicy",
            "uniqueId": "BucketRef_BucketArnField_Handler_IamRolePolicy_566A37EB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.BucketRef_BucketArnField_Handler_IamRole_DF52E4B1.name}"
      },
      "BucketRef_BucketNameField_Handler_IamRolePolicy_280191CD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/BucketNameField/Handler/IamRolePolicy",
            "uniqueId": "BucketRef_BucketNameField_Handler_IamRolePolicy_280191CD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.BucketRef_BucketNameField_Handler_IamRole_4C746299.name}"
      },
      "BucketRef_FileBrowser_delete_IamRolePolicy_A19F20B1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/delete/IamRolePolicy",
            "uniqueId": "BucketRef_FileBrowser_delete_IamRolePolicy_A19F20B1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\",\"s3:CopyObject\"],\"Resource\":[\"arn:aws:s3:::${aws_s3_bucket.Bucket.bucket}\",\"arn:aws:s3:::${aws_s3_bucket.Bucket.bucket}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.BucketRef_FileBrowser_delete_IamRole_A66062FE.name}"
      },
      "BucketRef_FileBrowser_get_IamRolePolicy_E6B24E15": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/get/IamRolePolicy",
            "uniqueId": "BucketRef_FileBrowser_get_IamRolePolicy_E6B24E15"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\",\"s3:CopyObject\"],\"Resource\":[\"arn:aws:s3:::${aws_s3_bucket.Bucket.bucket}\",\"arn:aws:s3:::${aws_s3_bucket.Bucket.bucket}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.BucketRef_FileBrowser_get_IamRole_8E0DB684.name}"
      },
      "BucketRef_FileBrowser_list_IamRolePolicy_B923CA4C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/list/IamRolePolicy",
            "uniqueId": "BucketRef_FileBrowser_list_IamRolePolicy_B923CA4C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\",\"s3:CopyObject\"],\"Resource\":[\"arn:aws:s3:::${aws_s3_bucket.Bucket.bucket}\",\"arn:aws:s3:::${aws_s3_bucket.Bucket.bucket}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.BucketRef_FileBrowser_list_IamRole_DC0C9222.name}"
      },
      "BucketRef_FileBrowser_put_IamRolePolicy_F4928644": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/put/IamRolePolicy",
            "uniqueId": "BucketRef_FileBrowser_put_IamRolePolicy_F4928644"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\",\"s3:CopyObject\"],\"Resource\":[\"arn:aws:s3:::${aws_s3_bucket.Bucket.bucket}\",\"arn:aws:s3:::${aws_s3_bucket.Bucket.bucket}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.BucketRef_FileBrowser_put_IamRole_9C4230CD.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "BucketRef_AwsConsoleField_Handler_IamRolePolicyAttachment_FD723E7D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/AwsConsoleField/Handler/IamRolePolicyAttachment",
            "uniqueId": "BucketRef_AwsConsoleField_Handler_IamRolePolicyAttachment_FD723E7D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.BucketRef_AwsConsoleField_Handler_IamRole_BF718408.name}"
      },
      "BucketRef_BucketArnField_Handler_IamRolePolicyAttachment_9A46A0BE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/BucketArnField/Handler/IamRolePolicyAttachment",
            "uniqueId": "BucketRef_BucketArnField_Handler_IamRolePolicyAttachment_9A46A0BE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.BucketRef_BucketArnField_Handler_IamRole_DF52E4B1.name}"
      },
      "BucketRef_BucketNameField_Handler_IamRolePolicyAttachment_E13E8317": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/BucketNameField/Handler/IamRolePolicyAttachment",
            "uniqueId": "BucketRef_BucketNameField_Handler_IamRolePolicyAttachment_E13E8317"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.BucketRef_BucketNameField_Handler_IamRole_4C746299.name}"
      },
      "BucketRef_FileBrowser_delete_IamRolePolicyAttachment_1539DE0D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/delete/IamRolePolicyAttachment",
            "uniqueId": "BucketRef_FileBrowser_delete_IamRolePolicyAttachment_1539DE0D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.BucketRef_FileBrowser_delete_IamRole_A66062FE.name}"
      },
      "BucketRef_FileBrowser_get_IamRolePolicyAttachment_3D6DE10D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/get/IamRolePolicyAttachment",
            "uniqueId": "BucketRef_FileBrowser_get_IamRolePolicyAttachment_3D6DE10D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.BucketRef_FileBrowser_get_IamRole_8E0DB684.name}"
      },
      "BucketRef_FileBrowser_list_IamRolePolicyAttachment_AA2F34CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/list/IamRolePolicyAttachment",
            "uniqueId": "BucketRef_FileBrowser_list_IamRolePolicyAttachment_AA2F34CC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.BucketRef_FileBrowser_list_IamRole_DC0C9222.name}"
      },
      "BucketRef_FileBrowser_put_IamRolePolicyAttachment_B78BA9C7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/put/IamRolePolicyAttachment",
            "uniqueId": "BucketRef_FileBrowser_put_IamRolePolicyAttachment_B78BA9C7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.BucketRef_FileBrowser_put_IamRole_9C4230CD.name}"
      }
    },
    "aws_lambda_function": {
      "BucketRef_AwsConsoleField_Handler_714621CF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/AwsConsoleField/Handler/Default",
            "uniqueId": "BucketRef_AwsConsoleField_Handler_714621CF"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_bb1ba780": "${aws_s3_bucket.Bucket.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Handler-c85d8af5",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_2": "${jsonencode(aws_s3_bucket.Bucket.bucket)}"
          }
        },
        "function_name": "Handler-c85d8af5",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.BucketRef_AwsConsoleField_Handler_IamRole_BF718408.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BucketRef_AwsConsoleField_Handler_S3Object_61367A1E.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "BucketRef_BucketArnField_Handler_89268E34": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/BucketArnField/Handler/Default",
            "uniqueId": "BucketRef_BucketArnField_Handler_89268E34"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Handler-c85e098f",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_ARN_AWS_S3_TFTOKEN_TOKEN_2": "${jsonencode(\"arn:aws:s3:::${aws_s3_bucket.Bucket.bucket}\")}"
          }
        },
        "function_name": "Handler-c85e098f",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.BucketRef_BucketArnField_Handler_IamRole_DF52E4B1.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BucketRef_BucketArnField_Handler_S3Object_9A7F1E69.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "BucketRef_BucketNameField_Handler_BA1EDC2D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/BucketNameField/Handler/Default",
            "uniqueId": "BucketRef_BucketNameField_Handler_BA1EDC2D"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Handler-c885f795",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_2": "${jsonencode(aws_s3_bucket.Bucket.bucket)}"
          }
        },
        "function_name": "Handler-c885f795",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.BucketRef_BucketNameField_Handler_IamRole_4C746299.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BucketRef_BucketNameField_Handler_S3Object_4572BF63.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "BucketRef_FileBrowser_delete_5803F41A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/delete/Default",
            "uniqueId": "BucketRef_FileBrowser_delete_5803F41A"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_bb1ba780": "${aws_s3_bucket.Bucket.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "delete-c8d8aa8e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "delete-c8d8aa8e",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.BucketRef_FileBrowser_delete_IamRole_A66062FE.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BucketRef_FileBrowser_delete_S3Object_5563CB3A.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "BucketRef_FileBrowser_get_28175BDE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/get/Default",
            "uniqueId": "BucketRef_FileBrowser_get_28175BDE"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_bb1ba780": "${aws_s3_bucket.Bucket.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get-c8ba1e5f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get-c8ba1e5f",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.BucketRef_FileBrowser_get_IamRole_8E0DB684.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BucketRef_FileBrowser_get_S3Object_F2A905BD.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "BucketRef_FileBrowser_list_7AD57CAA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/list/Default",
            "uniqueId": "BucketRef_FileBrowser_list_7AD57CAA"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_bb1ba780": "${aws_s3_bucket.Bucket.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "list-c88fd67a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "list-c88fd67a",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.BucketRef_FileBrowser_list_IamRole_DC0C9222.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BucketRef_FileBrowser_list_S3Object_B982678A.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "BucketRef_FileBrowser_put_C3049759": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/put/Default",
            "uniqueId": "BucketRef_FileBrowser_put_C3049759"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_bb1ba780": "${aws_s3_bucket.Bucket.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "put-c8cdb51a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "put-c8cdb51a",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.BucketRef_FileBrowser_put_IamRole_9C4230CD.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BucketRef_FileBrowser_put_S3Object_FA99EA77.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
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
    "aws_s3_object": {
      "BucketRef_AwsConsoleField_Handler_S3Object_61367A1E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/AwsConsoleField/Handler/S3Object",
            "uniqueId": "BucketRef_AwsConsoleField_Handler_S3Object_61367A1E"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "BucketRef_BucketArnField_Handler_S3Object_9A7F1E69": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/BucketArnField/Handler/S3Object",
            "uniqueId": "BucketRef_BucketArnField_Handler_S3Object_9A7F1E69"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "BucketRef_BucketNameField_Handler_S3Object_4572BF63": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/BucketNameField/Handler/S3Object",
            "uniqueId": "BucketRef_BucketNameField_Handler_S3Object_4572BF63"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "BucketRef_FileBrowser_delete_S3Object_5563CB3A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/delete/S3Object",
            "uniqueId": "BucketRef_FileBrowser_delete_S3Object_5563CB3A"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "BucketRef_FileBrowser_get_S3Object_F2A905BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/get/S3Object",
            "uniqueId": "BucketRef_FileBrowser_get_S3Object_F2A905BD"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "BucketRef_FileBrowser_list_S3Object_B982678A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/list/S3Object",
            "uniqueId": "BucketRef_FileBrowser_list_S3Object_B982678A"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "BucketRef_FileBrowser_put_S3Object_FA99EA77": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/FileBrowser/put/S3Object",
            "uniqueId": "BucketRef_FileBrowser_put_S3Object_FA99EA77"
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

