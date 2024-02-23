# [put.test.w](../../../../../../examples/tests/sdk_tests/api/put.test.w) | compile | tf-aws

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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path/{id}/nn/{user}\":{\"put\":{\"operationId\":\"put-path/:id/nn/:user\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"id\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"name\":\"user\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:put_path_-id_nn_-user0-c80f9240/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "cloudApi_put_path_id_nn_user0_CloudwatchLogGroup_4DA5DB81": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/put_path_:id_nn_:user0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_put_path_id_nn_user0_CloudwatchLogGroup_4DA5DB81"
          }
        },
        "name": "/aws/lambda/put_path_-id_nn_-user0-c80f9240",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_put_path_id_nn_user0_IamRole_7A3989FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/put_path_:id_nn_:user0/IamRole",
            "uniqueId": "cloudApi_put_path_id_nn_user0_IamRole_7A3989FF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_put_path_id_nn_user0_IamRolePolicy_D9EEAAC8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/put_path_:id_nn_:user0/IamRolePolicy",
            "uniqueId": "cloudApi_put_path_id_nn_user0_IamRolePolicy_D9EEAAC8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_put_path_id_nn_user0_IamRole_7A3989FF.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_put_path_id_nn_user0_IamRolePolicyAttachment_0E972F52": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/put_path_:id_nn_:user0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_put_path_id_nn_user0_IamRolePolicyAttachment_0E972F52"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_put_path_id_nn_user0_IamRole_7A3989FF.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_put_path_id_nn_user0_9CB2C6E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/put_path_:id_nn_:user0/Default",
            "uniqueId": "cloudApi_put_path_id_nn_user0_9CB2C6E4"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "put_path_-id_nn_-user0-c80f9240",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "put_path_-id_nn_-user0-c80f9240",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "reserved_concurrent_executions": 10,
        "role": "${aws_iam_role.cloudApi_put_path_id_nn_user0_IamRole_7A3989FF.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_put_path_id_nn_user0_S3Object_72C91A0E.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-PUT-526849ff_B95D45FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-PUT-526849ff",
            "uniqueId": "cloudApi_api_permission-PUT-526849ff_B95D45FA"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_put_path_id_nn_user0_9CB2C6E4.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/PUT/path/{id}/nn/{user}",
        "statement_id": "AllowExecutionFromAPIGateway-PUT-526849ff"
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
      "cloudApi_put_path_id_nn_user0_S3Object_72C91A0E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/put_path_:id_nn_:user0/S3Object",
            "uniqueId": "cloudApi_put_path_id_nn_user0_S3Object_72C91A0E"
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

