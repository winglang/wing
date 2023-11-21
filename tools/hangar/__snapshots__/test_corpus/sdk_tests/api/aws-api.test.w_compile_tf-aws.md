# [aws-api.test.w](../../../../../../examples/tests/sdk_tests/api/aws-api.test.w) | compile | tf-aws

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
  "data": {
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/api\":{\"get\":{\"operationId\":\"get-api\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.api_api-OnRequest-84a3bb_1020793C.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "api_api-OnRequest-84a3bb_CloudwatchLogGroup_A5F05C3D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/api-OnRequest-84a3bb/CloudwatchLogGroup",
            "uniqueId": "api_api-OnRequest-84a3bb_CloudwatchLogGroup_A5F05C3D"
          }
        },
        "name": "/aws/lambda/api-OnRequest-84a3bb-c809573d",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "api_api-OnRequest-84a3bb_IamRole_77A25B05": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/api-OnRequest-84a3bb/IamRole",
            "uniqueId": "api_api-OnRequest-84a3bb_IamRole_77A25B05"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "api_api-OnRequest-84a3bb_IamRolePolicy_4F6C81FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/api-OnRequest-84a3bb/IamRolePolicy",
            "uniqueId": "api_api-OnRequest-84a3bb_IamRolePolicy_4F6C81FB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.api_api-OnRequest-84a3bb_IamRole_77A25B05.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "api_api-OnRequest-84a3bb_IamRolePolicyAttachment_3C63AD23": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/api-OnRequest-84a3bb/IamRolePolicyAttachment",
            "uniqueId": "api_api-OnRequest-84a3bb_IamRolePolicyAttachment_3C63AD23"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.api_api-OnRequest-84a3bb_IamRole_77A25B05.name}"
      }
    },
    "aws_lambda_function": {
      "api_api-OnRequest-84a3bb_1020793C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/api-OnRequest-84a3bb/Default",
            "uniqueId": "api_api-OnRequest-84a3bb_1020793C"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "api-OnRequest-84a3bb-c809573d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "api-OnRequest-84a3bb-c809573d",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.api_api-OnRequest-84a3bb_IamRole_77A25B05.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.api_api-OnRequest-84a3bb_S3Object_A23EB973.key}",
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
        "function_name": "${aws_lambda_function.api_api-OnRequest-84a3bb_1020793C.function_name}",
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
      "api_api-OnRequest-84a3bb_S3Object_A23EB973": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/api-OnRequest-84a3bb/S3Object",
            "uniqueId": "api_api-OnRequest-84a3bb_S3Object_A23EB973"
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

