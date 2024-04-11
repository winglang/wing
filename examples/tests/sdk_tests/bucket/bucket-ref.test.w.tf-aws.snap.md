# `bucket-ref.test.w.tf-aws.snap.md`

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
    "aws": [
      {
      }
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
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
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
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85d8af5",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.BucketRef_AwsConsoleField_Handler_IamRole_BF718408.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BucketRef_AwsConsoleField_Handler_S3Object_61367A1E.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [
          ],
          "subnet_ids": [
          ]
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
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.BucketRef_BucketArnField_Handler_IamRole_DF52E4B1.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BucketRef_BucketArnField_Handler_S3Object_9A7F1E69.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [
          ],
          "subnet_ids": [
          ]
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
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.BucketRef_BucketNameField_Handler_IamRole_4C746299.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BucketRef_BucketNameField_Handler_S3Object_4572BF63.key}",
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
        "key": "asset.c85d8af549704644c2bfb7e68f8b3b47760ee3adf0.0f9451611c84543281879b27fec10437.zip",
        "source": "assets/BucketRef_AwsConsoleField_Handler_Asset_C18B6690/EDF25AEC90366018BBEE28F38BDA44B7/archive.zip"
      },
      "BucketRef_BucketArnField_Handler_S3Object_9A7F1E69": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/BucketArnField/Handler/S3Object",
            "uniqueId": "BucketRef_BucketArnField_Handler_S3Object_9A7F1E69"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "asset.c85e098fcd06c828ffc5f1de453477c08cc9b92c51.ef8f783dc96479e5507d7f65100427c0.zip",
        "source": "assets/BucketRef_BucketArnField_Handler_Asset_B3BB746F/78E890B4554B93FA7C6EB964B0176232/archive.zip"
      },
      "BucketRef_BucketNameField_Handler_S3Object_4572BF63": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BucketRef/BucketNameField/Handler/S3Object",
            "uniqueId": "BucketRef_BucketNameField_Handler_S3Object_4572BF63"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "asset.c885f79598557bf8602c0b7e04dca5b42ac61e1421.d10db2a6c4136d14cdb9606a1061da08.zip",
        "source": "assets/BucketRef_BucketNameField_Handler_Asset_B3EEBB59/A0CE6DAA8A37912B25C6A23F6EC7F954/archive.zip"
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
