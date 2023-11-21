# [cors.test.w](../../../../../../examples/tests/sdk_tests/api/cors.test.w) | compile | tf-aws

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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path\":{\"get\":{\"operationId\":\"get-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{},\"headers\":{\"Access-Control-Allow-Origin\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Allow-Methods\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Allow-Headers\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Max-Age\":{\"schema\":{\"type\":\"string\"}}}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-641e98_C0805CE0.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                #if ($context.httpMethod == \\\"OPTIONS\\\")\\n                    {\\\"statusCode\\\": 204}\\n                #else\\n                    {\\\"statusCode\\\": 404}\\n                #end\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"204\":{\"statusCode\":\"204\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\",\"method.response.header.Access-Control-Allow-Origin\":\"'*'\",\"method.response.header.Access-Control-Allow-Methods\":\"'GET,POST,PUT,DELETE,HEAD,OPTIONS'\",\"method.response.header.Access-Control-Allow-Headers\":\"'Content-Type,Authorization,X-Requested-With'\"},\"responseTemplates\":{\"application/json\":\"{}\"}},\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"204\":{\"description\":\"204 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"},\"Access-Control-Allow-Origin\":{\"type\":\"string\"},\"Access-Control-Allow-Methods\":{\"type\":\"string\"},\"Access-Control-Allow-Headers\":{\"type\":\"string\"}}},\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "cloudApi_cloudApi-OnRequest-641e98_CloudwatchLogGroup_6358D017": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-641e98/CloudwatchLogGroup",
            "uniqueId": "cloudApi_cloudApi-OnRequest-641e98_CloudwatchLogGroup_6358D017"
          }
        },
        "name": "/aws/lambda/cloud-Api-OnRequest-641e98-c813b8d7",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_cloudApi-OnRequest-641e98_IamRole_58B2E511": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-641e98/IamRole",
            "uniqueId": "cloudApi_cloudApi-OnRequest-641e98_IamRole_58B2E511"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_cloudApi-OnRequest-641e98_IamRolePolicy_DDF3DB8F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-641e98/IamRolePolicy",
            "uniqueId": "cloudApi_cloudApi-OnRequest-641e98_IamRolePolicy_DDF3DB8F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-641e98_IamRole_58B2E511.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_cloudApi-OnRequest-641e98_IamRolePolicyAttachment_CA7B1C59": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-641e98/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_cloudApi-OnRequest-641e98_IamRolePolicyAttachment_CA7B1C59"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-641e98_IamRole_58B2E511.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_cloudApi-OnRequest-641e98_C0805CE0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-641e98/Default",
            "uniqueId": "cloudApi_cloudApi-OnRequest-641e98_C0805CE0"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-641e98-c813b8d7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-641e98-c813b8d7",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-641e98_IamRole_58B2E511.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_cloudApi-OnRequest-641e98_S3Object_8FF4A9B9.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-GET-e2131352_3FDDE199": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-e2131352",
            "uniqueId": "cloudApi_api_permission-GET-e2131352_3FDDE199"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-641e98_C0805CE0.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/path",
        "statement_id": "AllowExecutionFromAPIGateway-GET-e2131352"
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
      "cloudApi_cloudApi-OnRequest-641e98_S3Object_8FF4A9B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-641e98/S3Object",
            "uniqueId": "cloudApi_cloudApi-OnRequest-641e98_S3Object_8FF4A9B9"
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

