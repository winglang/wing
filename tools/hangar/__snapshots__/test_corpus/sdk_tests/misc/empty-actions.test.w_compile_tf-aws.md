# [empty-actions.test.w](../../../../../../tests/sdk_tests/misc/empty-actions.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
    },
    "outputs": {
      "root": {
        "Default": {
          "Default": {
            "Api": {
              "Endpoint": {
                "Url": "Api_Endpoint_Url_473FEE9F"
              }
            }
          }
        }
      }
    }
  },
  "data": {
    "aws_caller_identity": {
      "account": {
        "//": {
          "metadata": {
            "path": "root/Default/account",
            "uniqueId": "account"
          }
        }
      }
    },
    "aws_region": {
      "Region": {
        "//": {
          "metadata": {
            "path": "root/Default/Region",
            "uniqueId": "Region"
          }
        }
      }
    }
  },
  "output": {
    "Api_Endpoint_Url_473FEE9F": {
      "value": "https://${aws_api_gateway_rest_api.Api_api_91C07D84.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.Api_api_stage_E0FA39D6.stage_name}"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "Api_api_deployment_7FB64CC4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/deployment",
            "uniqueId": "Api_api_deployment_7FB64CC4"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.Api_api_91C07D84.id}",
        "triggers": {
          "redeployment": "${sha256(aws_api_gateway_rest_api.Api_api_91C07D84.body)}"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "Api_api_91C07D84": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/api",
            "uniqueId": "Api_api_91C07D84"
          }
        },
        "body": "{\"paths\":{\"/foo\":{\"get\":{\"operationId\":\"get-foo\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_foo0-c8fedbc0/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/bar\":{\"get\":{\"operationId\":\"get-bar\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_bar0-c8c593ee/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}},\"openapi\":\"3.0.3\"}",
        "lifecycle": {
          "create_before_destroy": true
        },
        "name": "api-c8f613f0"
      }
    },
    "aws_api_gateway_stage": {
      "Api_api_stage_E0FA39D6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/stage",
            "uniqueId": "Api_api_stage_E0FA39D6"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.Api_api_deployment_7FB64CC4.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.Api_api_91C07D84.id}",
        "stage_name": "prod"
      }
    },
    "aws_cloudwatch_log_group": {
      "Api_get_bar0_CloudwatchLogGroup_94D5A69E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_bar0/CloudwatchLogGroup",
            "uniqueId": "Api_get_bar0_CloudwatchLogGroup_94D5A69E"
          }
        },
        "name": "/aws/lambda/get_bar0-c8c593ee",
        "retention_in_days": 30
      },
      "Api_get_foo0_CloudwatchLogGroup_DB4D118A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_foo0/CloudwatchLogGroup",
            "uniqueId": "Api_get_foo0_CloudwatchLogGroup_DB4D118A"
          }
        },
        "name": "/aws/lambda/get_foo0-c8fedbc0",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Api_get_bar0_IamRole_0AE7D598": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_bar0/IamRole",
            "uniqueId": "Api_get_bar0_IamRole_0AE7D598"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Api_get_foo0_IamRole_B1AE8E5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_foo0/IamRole",
            "uniqueId": "Api_get_foo0_IamRole_B1AE8E5D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Api_get_bar0_IamRolePolicy_7133AAD7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_bar0/IamRolePolicy",
            "uniqueId": "Api_get_bar0_IamRolePolicy_7133AAD7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_get_bar0_IamRole_0AE7D598.name}"
      },
      "Api_get_foo0_IamRolePolicy_F8C7A0FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_foo0/IamRolePolicy",
            "uniqueId": "Api_get_foo0_IamRolePolicy_F8C7A0FA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.A_Bucket_EB05527C.arn}\",\"${aws_s3_bucket.A_Bucket_EB05527C.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Api_get_foo0_IamRole_B1AE8E5D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Api_get_bar0_IamRolePolicyAttachment_879A7521": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_bar0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_bar0_IamRolePolicyAttachment_879A7521"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_bar0_IamRole_0AE7D598.name}"
      },
      "Api_get_foo0_IamRolePolicyAttachment_1ED86FF6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_foo0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_foo0_IamRolePolicyAttachment_1ED86FF6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_foo0_IamRole_B1AE8E5D.name}"
      }
    },
    "aws_lambda_function": {
      "Api_get_bar0_28E127E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_bar0/Default",
            "uniqueId": "Api_get_bar0_28E127E8"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_8cb07fb3": "${aws_s3_bucket.A_Bucket_EB05527C.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_bar0-c8c593ee",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_bar0-c8c593ee",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_bar0_IamRole_0AE7D598.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_bar0_S3Object_CBF78AB9.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Api_get_foo0_2DF5B57F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_foo0/Default",
            "uniqueId": "Api_get_foo0_2DF5B57F"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_8cb07fb3": "${aws_s3_bucket.A_Bucket_EB05527C.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_foo0-c8fedbc0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_foo0-c8fedbc0",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_foo0_IamRole_B1AE8E5D.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_foo0_S3Object_A8BEB597.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Api_api_permission-GET-2d589ee9_E7DEBAD5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-2d589ee9",
            "uniqueId": "Api_api_permission-GET-2d589ee9_E7DEBAD5"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_bar0_28E127E8.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/bar",
        "statement_id": "AllowExecutionFromAPIGateway-GET-2d589ee9"
      },
      "Api_api_permission-GET-4273ae49_725CFBAA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-4273ae49",
            "uniqueId": "Api_api_permission-GET-4273ae49_725CFBAA"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_foo0_2DF5B57F.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/foo",
        "statement_id": "AllowExecutionFromAPIGateway-GET-4273ae49"
      }
    },
    "aws_s3_bucket": {
      "A_Bucket_EB05527C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/Bucket/Default",
            "uniqueId": "A_Bucket_EB05527C"
          }
        },
        "bucket_prefix": "bucket-c8e1d537-",
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
      "Api_get_bar0_S3Object_CBF78AB9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_bar0/S3Object",
            "uniqueId": "Api_get_bar0_S3Object_CBF78AB9"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Api_get_foo0_S3Object_A8BEB597": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_foo0/S3Object",
            "uniqueId": "Api_get_foo0_S3Object_A8BEB597"
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

