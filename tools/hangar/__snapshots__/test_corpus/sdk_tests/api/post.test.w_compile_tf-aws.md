# [post.test.w](../../../../../../examples/tests/sdk_tests/api/post.test.w) | compile | tf-aws

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
        "body": "{\"paths\":{\"/\":{\"post\":{\"operationId\":\"post\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:post_0-c8d25f85/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/empty\":{\"post\":{\"operationId\":\"post-empty\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:post_empty0-c8ed62c2/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}},\"openapi\":\"3.0.3\"}",
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
      "Api_post_0_CloudwatchLogGroup_2657635B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_0/CloudwatchLogGroup",
            "uniqueId": "Api_post_0_CloudwatchLogGroup_2657635B"
          }
        },
        "name": "/aws/lambda/post_0-c8d25f85",
        "retention_in_days": 30
      },
      "Api_post_empty0_CloudwatchLogGroup_4AF0361F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_empty0/CloudwatchLogGroup",
            "uniqueId": "Api_post_empty0_CloudwatchLogGroup_4AF0361F"
          }
        },
        "name": "/aws/lambda/post_empty0-c8ed62c2",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Api_post_0_IamRole_5AF65E98": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_0/IamRole",
            "uniqueId": "Api_post_0_IamRole_5AF65E98"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Api_post_empty0_IamRole_DBBCE0E6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_empty0/IamRole",
            "uniqueId": "Api_post_empty0_IamRole_DBBCE0E6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Api_post_0_IamRolePolicy_DB973D78": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_0/IamRolePolicy",
            "uniqueId": "Api_post_0_IamRolePolicy_DB973D78"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_post_0_IamRole_5AF65E98.name}"
      },
      "Api_post_empty0_IamRolePolicy_A961F9B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_empty0/IamRolePolicy",
            "uniqueId": "Api_post_empty0_IamRolePolicy_A961F9B9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_post_empty0_IamRole_DBBCE0E6.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Api_post_0_IamRolePolicyAttachment_ABFC7DE6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_0/IamRolePolicyAttachment",
            "uniqueId": "Api_post_0_IamRolePolicyAttachment_ABFC7DE6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_post_0_IamRole_5AF65E98.name}"
      },
      "Api_post_empty0_IamRolePolicyAttachment_9EF5B497": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_empty0/IamRolePolicyAttachment",
            "uniqueId": "Api_post_empty0_IamRolePolicyAttachment_9EF5B497"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_post_empty0_IamRole_DBBCE0E6.name}"
      }
    },
    "aws_lambda_function": {
      "Api_post_0_211FC41C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_0/Default",
            "uniqueId": "Api_post_0_211FC41C"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "post_0-c8d25f85",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "post_0-c8d25f85",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_post_0_IamRole_5AF65E98.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_post_0_S3Object_F8F9D391.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Api_post_empty0_7F3C3E7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_empty0/Default",
            "uniqueId": "Api_post_empty0_7F3C3E7E"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "post_empty0-c8ed62c2",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "post_empty0-c8ed62c2",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_post_empty0_IamRole_DBBCE0E6.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_post_empty0_S3Object_61B16A18.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Api_api_permission-POST-71ba0a93_E05ED97B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-POST-71ba0a93",
            "uniqueId": "Api_api_permission-POST-71ba0a93_E05ED97B"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_post_empty0_7F3C3E7E.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/POST/empty",
        "statement_id": "AllowExecutionFromAPIGateway-POST-71ba0a93"
      },
      "Api_api_permission-POST-c2e3ffa8_4BF1BB79": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-POST-c2e3ffa8",
            "uniqueId": "Api_api_permission-POST-c2e3ffa8_4BF1BB79"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_post_0_211FC41C.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/POST/",
        "statement_id": "AllowExecutionFromAPIGateway-POST-c2e3ffa8"
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
      "Api_post_0_S3Object_F8F9D391": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_0/S3Object",
            "uniqueId": "Api_post_0_S3Object_F8F9D391"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Api_post_empty0_S3Object_61B16A18": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_empty0/S3Object",
            "uniqueId": "Api_post_empty0_S3Object_61B16A18"
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

