# [patch.test.w](../../../../../../examples/tests/sdk_tests/api/patch.test.w) | compile | tf-aws

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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path/{id}\":{\"patch\":{\"operationId\":\"patch-path/:id\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"id\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_patch_path_id_0_309E7B7B.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "cloudApi_patch_path_id_0_CloudwatchLogGroup_F8F327BB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/patch_path_:id_}0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_patch_path_id_0_CloudwatchLogGroup_F8F327BB"
          }
        },
        "name": "/aws/lambda/patch_path_-id_-0-c8e446a7",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_patch_path_id_0_IamRole_FFF5C122": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/patch_path_:id_}0/IamRole",
            "uniqueId": "cloudApi_patch_path_id_0_IamRole_FFF5C122"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_patch_path_id_0_IamRolePolicy_0399BFDA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/patch_path_:id_}0/IamRolePolicy",
            "uniqueId": "cloudApi_patch_path_id_0_IamRolePolicy_0399BFDA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_patch_path_id_0_IamRole_FFF5C122.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_patch_path_id_0_IamRolePolicyAttachment_C5A7298E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/patch_path_:id_}0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_patch_path_id_0_IamRolePolicyAttachment_C5A7298E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_patch_path_id_0_IamRole_FFF5C122.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_patch_path_id_0_309E7B7B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/patch_path_:id_}0/Default",
            "uniqueId": "cloudApi_patch_path_id_0_309E7B7B"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "patch_path_-id_-0-c8e446a7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "patch_path_-id_-0-c8e446a7",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_patch_path_id_0_IamRole_FFF5C122.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_patch_path_id_0_S3Object_4462299F.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-PATCH-b2e416be_7FF52903": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-PATCH-b2e416be",
            "uniqueId": "cloudApi_api_permission-PATCH-b2e416be_7FF52903"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_patch_path_id_0_309E7B7B.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/PATCH/path/{id}",
        "statement_id": "AllowExecutionFromAPIGateway-PATCH-b2e416be"
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
      "cloudApi_patch_path_id_0_S3Object_4462299F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/patch_path_:id_}0/S3Object",
            "uniqueId": "cloudApi_patch_path_id_0_S3Object_4462299F"
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

