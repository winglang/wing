# [cors.test.w](../../../../../../tests/sdk_tests/bucket/cors.test.w) | compile | tf-aws

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
        "body": "{\"paths\":{\"/test-bucket-cors\":{\"get\":{\"operationId\":\"get-test-bucket-cors\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test-bucket-cors0-c83b3a95/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}},\"openapi\":\"3.0.3\"}",
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
      "Api_get_test-bucket-cors0_CloudwatchLogGroup_41A49F43": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_test-bucket-cors0/CloudwatchLogGroup",
            "uniqueId": "Api_get_test-bucket-cors0_CloudwatchLogGroup_41A49F43"
          }
        },
        "name": "/aws/lambda/get_test-bucket-cors0-c83b3a95",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Api_get_test-bucket-cors0_IamRole_2CE005D6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_test-bucket-cors0/IamRole",
            "uniqueId": "Api_get_test-bucket-cors0_IamRole_2CE005D6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Api_get_test-bucket-cors0_IamRolePolicy_2EB2B5F8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_test-bucket-cors0/IamRolePolicy",
            "uniqueId": "Api_get_test-bucket-cors0_IamRolePolicy_2EB2B5F8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.Bucket.arn}\",\"${aws_s3_bucket.Bucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Api_get_test-bucket-cors0_IamRole_2CE005D6.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Api_get_test-bucket-cors0_IamRolePolicyAttachment_6877756E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_test-bucket-cors0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_test-bucket-cors0_IamRolePolicyAttachment_6877756E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_test-bucket-cors0_IamRole_2CE005D6.name}"
      }
    },
    "aws_lambda_function": {
      "Api_get_test-bucket-cors0_737E7042": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_test-bucket-cors0/Default",
            "uniqueId": "Api_get_test-bucket-cors0_737E7042"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_1357ca3a": "${aws_s3_bucket.Bucket.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_test-bucket-cors0-c83b3a95",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_HTTPS_TFTOKEN_TOKEN_8_EXECUTE_API_TFTOKEN_TOKEN_0_AMAZONAWS_COM_TFTOKEN_TOKEN_9": "${jsonencode(\"https://${aws_api_gateway_rest_api.Api_api_91C07D84.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.Api_api_stage_E0FA39D6.stage_name}\")}"
          }
        },
        "function_name": "get_test-bucket-cors0-c83b3a95",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_test-bucket-cors0_IamRole_2CE005D6.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_test-bucket-cors0_S3Object_B3687A16.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Api_api_permission-GET-1b275be3_9CFD2BC3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-1b275be3",
            "uniqueId": "Api_api_permission-GET-1b275be3_9CFD2BC3"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_test-bucket-cors0_737E7042.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/test-bucket-cors",
        "statement_id": "AllowExecutionFromAPIGateway-GET-1b275be3"
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
    "aws_s3_bucket_cors_configuration": {
      "Bucket_CorsConfiguration-1357ca3a_A4CCA40A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/CorsConfiguration-1357ca3a",
            "uniqueId": "Bucket_CorsConfiguration-1357ca3a_A4CCA40A"
          }
        },
        "bucket": "${aws_s3_bucket.Bucket.id}",
        "cors_rule": [
          {
            "allowed_methods": [
              "GET"
            ],
            "allowed_origins": [
              "https://${aws_api_gateway_rest_api.Api_api_91C07D84.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.Api_api_stage_E0FA39D6.stage_name}"
            ]
          }
        ]
      }
    },
    "aws_s3_bucket_policy": {
      "Bucket_PublicPolicy_9F2BCFC1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/PublicPolicy",
            "uniqueId": "Bucket_PublicPolicy_9F2BCFC1"
          }
        },
        "bucket": "${aws_s3_bucket.Bucket.bucket}",
        "depends_on": [
          "aws_s3_bucket_public_access_block.Bucket_PublicAccessBlock_A34F3B5C"
        ],
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.Bucket.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "Bucket_PublicAccessBlock_A34F3B5C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/PublicAccessBlock",
            "uniqueId": "Bucket_PublicAccessBlock_A34F3B5C"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.Bucket.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
      }
    },
    "aws_s3_object": {
      "Api_get_test-bucket-cors0_S3Object_B3687A16": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_test-bucket-cors0/S3Object",
            "uniqueId": "Api_get_test-bucket-cors0_S3Object_B3687A16"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Bucket_S3Object-hello_B7726FAE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/S3Object-hello",
            "uniqueId": "Bucket_S3Object-hello_B7726FAE"
          }
        },
        "bucket": "${aws_s3_bucket.Bucket.bucket}",
        "content": "hello",
        "key": "hello"
      }
    }
  }
}
```

