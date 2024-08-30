# [root_path_vars.test.w](../../../../../../tests/sdk_tests/api/root_path_vars.test.w) | compile | tf-aws

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
        "body": "{\"paths\":{\"/{id}\":{\"get\":{\"operationId\":\"get-:id\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"id\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_-id0-c8c761b0/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{id}/comments\":{\"get\":{\"operationId\":\"get-:id/comments\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"id\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_-id0-c8c761b0/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{id}/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}},\"openapi\":\"3.0.3\"}",
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
      "Api_get_id0_CloudwatchLogGroup_3D15D155": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_:id0/CloudwatchLogGroup",
            "uniqueId": "Api_get_id0_CloudwatchLogGroup_3D15D155"
          }
        },
        "name": "/aws/lambda/get_-id0-c8c761b0",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Api_get_id0_IamRole_74C8077C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_:id0/IamRole",
            "uniqueId": "Api_get_id0_IamRole_74C8077C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Api_get_id0_IamRolePolicy_7D71CFCB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_:id0/IamRolePolicy",
            "uniqueId": "Api_get_id0_IamRolePolicy_7D71CFCB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_get_id0_IamRole_74C8077C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Api_get_id0_IamRolePolicyAttachment_7C1C1CAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_:id0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_id0_IamRolePolicyAttachment_7C1C1CAD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_id0_IamRole_74C8077C.name}"
      }
    },
    "aws_lambda_function": {
      "Api_get_id0_A3510FB1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_:id0/Default",
            "uniqueId": "Api_get_id0_A3510FB1"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_-id0-c8c761b0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_-id0-c8c761b0",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_id0_IamRole_74C8077C.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_id0_S3Object_D25336B5.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Api_api_permission-GET-86d7f190_3EAF9825": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-86d7f190",
            "uniqueId": "Api_api_permission-GET-86d7f190_3EAF9825"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_id0_A3510FB1.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/{id}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-86d7f190"
      },
      "Api_api_permission-GET-8d0f082e_AD9E18AF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-8d0f082e",
            "uniqueId": "Api_api_permission-GET-8d0f082e_AD9E18AF"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_id0_A3510FB1.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/{id}/comments",
        "statement_id": "AllowExecutionFromAPIGateway-GET-8d0f082e"
      },
      "Api_api_permission-GET-f57faab6_11BF5CEE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-f57faab6",
            "uniqueId": "Api_api_permission-GET-f57faab6_11BF5CEE"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_id0_A3510FB1.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/{username}/something",
        "statement_id": "AllowExecutionFromAPIGateway-GET-f57faab6"
      },
      "Api_api_permission-POST-88b37de1_E0D219BB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-POST-88b37de1",
            "uniqueId": "Api_api_permission-POST-88b37de1_E0D219BB"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_id0_A3510FB1.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/POST/{username}",
        "statement_id": "AllowExecutionFromAPIGateway-POST-88b37de1"
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
      "Api_get_id0_S3Object_D25336B5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_:id0/S3Object",
            "uniqueId": "Api_get_id0_S3Object_D25336B5"
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

