# [aws-api.test.w](../../../../../../examples/tests/sdk_tests/api/aws-api.test.w) | compile | tf-aws

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
            "api": {
              "Endpoint": {
                "Url": "api_Endpoint_Url_E5DB9C2F"
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
    "api_Endpoint_Url_E5DB9C2F": {
      "value": "https://${aws_api_gateway_rest_api.api_DD79FE08.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.api_stage_ABA3AD8B.stage_name}"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "api_deployment_4CFF72BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/api/deployment",
            "uniqueId": "api_deployment_4CFF72BC"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.api_DD79FE08.id}",
        "triggers": {
          "redeployment": "${sha256(aws_api_gateway_rest_api.api_DD79FE08.body)}"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "api_DD79FE08": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/api/api",
            "uniqueId": "api_DD79FE08"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/api\":{\"get\":{\"operationId\":\"get-api\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_api0-c8c47de3/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
        "lifecycle": {
          "create_before_destroy": true
        },
        "name": "api-c8c33ffd"
      }
    },
    "aws_api_gateway_stage": {
      "api_stage_ABA3AD8B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/api/stage",
            "uniqueId": "api_stage_ABA3AD8B"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.api_deployment_4CFF72BC.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.api_DD79FE08.id}",
        "stage_name": "prod"
      }
    },
    "aws_cloudwatch_log_group": {
      "api_get_api0_CloudwatchLogGroup_065995CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/get_api0/CloudwatchLogGroup",
            "uniqueId": "api_get_api0_CloudwatchLogGroup_065995CC"
          }
        },
        "name": "/aws/lambda/get_api0-c8c47de3",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "api_get_api0_IamRole_1D6098F5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/get_api0/IamRole",
            "uniqueId": "api_get_api0_IamRole_1D6098F5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "api_get_api0_IamRolePolicy_55513989": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/get_api0/IamRolePolicy",
            "uniqueId": "api_get_api0_IamRolePolicy_55513989"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.api_get_api0_IamRole_1D6098F5.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "api_get_api0_IamRolePolicyAttachment_04CCC841": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/get_api0/IamRolePolicyAttachment",
            "uniqueId": "api_get_api0_IamRolePolicyAttachment_04CCC841"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.api_get_api0_IamRole_1D6098F5.name}"
      }
    },
    "aws_lambda_function": {
      "api_get_api0_F4BE8E80": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/get_api0/Default",
            "uniqueId": "api_get_api0_F4BE8E80"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_api0-c8c47de3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_api0-c8c47de3",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.api_get_api0_IamRole_1D6098F5.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.api_get_api0_S3Object_6BECABA3.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "api_permission-GET-77bab856_CA593EA0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/api/permission-GET-77bab856",
            "uniqueId": "api_permission-GET-77bab856_CA593EA0"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.api_get_api0_F4BE8E80.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.api_DD79FE08.execution_arn}/*/GET/api",
        "statement_id": "AllowExecutionFromAPIGateway-GET-77bab856"
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
      "api_get_api0_S3Object_6BECABA3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/get_api0/S3Object",
            "uniqueId": "api_get_api0_S3Object_6BECABA3"
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

