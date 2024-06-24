# [cycle.test.w](../../../../../../examples/tests/sdk_tests/api/cycle.test.w) | compile | tf-aws

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
        "body": "{\"paths\":{\"/my_url\":{\"get\":{\"operationId\":\"get-my_url\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_my_url0-c8ebe364/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}},\"openapi\":\"3.0.3\"}",
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
      "Api_get_my_url0_CloudwatchLogGroup_03778440": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_my_url0/CloudwatchLogGroup",
            "uniqueId": "Api_get_my_url0_CloudwatchLogGroup_03778440"
          }
        },
        "name": "/aws/lambda/get_my_url0-c8ebe364",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Api_get_my_url0_IamRole_2A08E79F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_my_url0/IamRole",
            "uniqueId": "Api_get_my_url0_IamRole_2A08E79F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Api_get_my_url0_IamRolePolicy_04BD1959": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_my_url0/IamRolePolicy",
            "uniqueId": "Api_get_my_url0_IamRolePolicy_04BD1959"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_get_my_url0_IamRole_2A08E79F.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Api_get_my_url0_IamRolePolicyAttachment_291D6C17": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_my_url0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_my_url0_IamRolePolicyAttachment_291D6C17"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_my_url0_IamRole_2A08E79F.name}"
      }
    },
    "aws_lambda_function": {
      "Api_get_my_url0_7A7AAD6C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_my_url0/Default",
            "uniqueId": "Api_get_my_url0_7A7AAD6C"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_my_url0-c8ebe364",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_HTTPS_TFTOKEN_TOKEN_8_EXECUTE_API_TFTOKEN_TOKEN_0_AMAZONAWS_COM_TFTOKEN_TOKEN_9": "${jsonencode(\"https://${aws_api_gateway_rest_api.Api_api_91C07D84.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.Api_api_stage_E0FA39D6.stage_name}\")}"
          }
        },
        "function_name": "get_my_url0-c8ebe364",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_my_url0_IamRole_2A08E79F.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_my_url0_S3Object_1398834C.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Api_api_permission-GET-1cdff2e7_A9CF8DD9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-1cdff2e7",
            "uniqueId": "Api_api_permission-GET-1cdff2e7_A9CF8DD9"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_my_url0_7A7AAD6C.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/my_url",
        "statement_id": "AllowExecutionFromAPIGateway-GET-1cdff2e7"
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
      "Api_get_my_url0_S3Object_1398834C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_my_url0/S3Object",
            "uniqueId": "Api_get_my_url0_S3Object_1398834C"
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

