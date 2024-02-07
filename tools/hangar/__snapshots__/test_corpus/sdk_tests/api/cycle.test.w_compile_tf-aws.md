# [cycle.test.w](../../../../../../examples/tests/sdk_tests/api/cycle.test.w) | compile | tf-aws

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
      "root": {
        "Default": {
          "Default": {
            "cloud.Api": {
              "Endpoint": {
                "Url": "cloudApi_Endpoint_Url_CD8AC9A6"
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
    "cloudApi_Endpoint_Url_CD8AC9A6": {
      "value": "https://${aws_api_gateway_rest_api.cloudApi_api_2B334D75.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.stage_name}"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "cloudApi_api_deployment_545514BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/deployment",
            "uniqueId": "cloudApi_api_deployment_545514BF"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.id}",
        "triggers": {
          "redeployment": "${sha256(aws_api_gateway_rest_api.cloudApi_api_2B334D75.body)}"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "cloudApi_api_2B334D75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "cloudApi_api_2B334D75"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/my_url\":{\"get\":{\"operationId\":\"get-my_url\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_my_url0-c833d48d/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
        "lifecycle": {
          "create_before_destroy": true
        },
        "name": "api-c895068c"
      }
    },
    "aws_api_gateway_stage": {
      "cloudApi_api_stage_BBB283E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/stage",
            "uniqueId": "cloudApi_api_stage_BBB283E4"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.cloudApi_api_deployment_545514BF.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.id}",
        "stage_name": "prod"
      }
    },
    "aws_cloudwatch_log_group": {
      "cloudApi_get_my_url0_CloudwatchLogGroup_BB5CF936": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_my_url0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_my_url0_CloudwatchLogGroup_BB5CF936"
          }
        },
        "name": "/aws/lambda/get_my_url0-c833d48d",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_get_my_url0_IamRole_2D9A7821": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_my_url0/IamRole",
            "uniqueId": "cloudApi_get_my_url0_IamRole_2D9A7821"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_get_my_url0_IamRolePolicy_96AAEEC4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_my_url0/IamRolePolicy",
            "uniqueId": "cloudApi_get_my_url0_IamRolePolicy_96AAEEC4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get_my_url0_IamRole_2D9A7821.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_get_my_url0_IamRolePolicyAttachment_114B149F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_my_url0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_my_url0_IamRolePolicyAttachment_114B149F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_my_url0_IamRole_2D9A7821.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_get_my_url0_C529619B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_my_url0/Default",
            "uniqueId": "cloudApi_get_my_url0_C529619B"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_my_url0-c833d48d",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_HTTPS_TFTOKEN_TOKEN_8_EXECUTE_API_TFTOKEN_TOKEN_0_AMAZONAWS_COM_TFTOKEN_TOKEN_9": "${jsonencode(\"https://${aws_api_gateway_rest_api.cloudApi_api_2B334D75.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.stage_name}\")}"
          }
        },
        "function_name": "get_my_url0-c833d48d",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_my_url0_IamRole_2D9A7821.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_my_url0_S3Object_895D809B.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-GET-1cdff2e7_C4032B55": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-1cdff2e7",
            "uniqueId": "cloudApi_api_permission-GET-1cdff2e7_C4032B55"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_my_url0_C529619B.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/my_url",
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
      "cloudApi_get_my_url0_S3Object_895D809B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_my_url0/S3Object",
            "uniqueId": "cloudApi_get_my_url0_S3Object_895D809B"
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

