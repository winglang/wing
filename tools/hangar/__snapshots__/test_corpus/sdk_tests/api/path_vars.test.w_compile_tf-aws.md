# [path_vars.test.w](../../../../../../examples/tests/sdk_tests/api/path_vars.test.w) | compile | tf-aws

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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/users/{name}\":{\"get\":{\"operationId\":\"get-users/:name\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_get_users_name_0_20FCFE31.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/path/{name}\":{\"get\":{\"operationId\":\"get-path/:name\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_get_users_name_0_20FCFE31.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/users/permission/{name}\":{\"get\":{\"operationId\":\"get-users/permission/:name\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_get_users_name_0_20FCFE31.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/path/{name}/{age}\":{\"get\":{\"operationId\":\"get-path/:name/:age\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"name\":\"age\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_get_path_name_age_0_65BF533A.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "cloudApi_get_path_name_age_0_CloudwatchLogGroup_13A3BAE4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path_:name_:age_}0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_path_name_age_0_CloudwatchLogGroup_13A3BAE4"
          }
        },
        "name": "/aws/lambda/get_path_-name_-age_-0-c80a5333",
        "retention_in_days": 30
      },
      "cloudApi_get_users_name_0_CloudwatchLogGroup_6D58B237": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users_:name_}0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_users_name_0_CloudwatchLogGroup_6D58B237"
          }
        },
        "name": "/aws/lambda/get_users_-name_-0-c8bea0a1",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_get_path_name_age_0_IamRole_B346AB90": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path_:name_:age_}0/IamRole",
            "uniqueId": "cloudApi_get_path_name_age_0_IamRole_B346AB90"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_get_users_name_0_IamRole_595620B4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users_:name_}0/IamRole",
            "uniqueId": "cloudApi_get_users_name_0_IamRole_595620B4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_get_path_name_age_0_IamRolePolicy_413CFA9D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path_:name_:age_}0/IamRolePolicy",
            "uniqueId": "cloudApi_get_path_name_age_0_IamRolePolicy_413CFA9D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get_path_name_age_0_IamRole_B346AB90.name}"
      },
      "cloudApi_get_users_name_0_IamRolePolicy_86600901": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users_:name_}0/IamRolePolicy",
            "uniqueId": "cloudApi_get_users_name_0_IamRolePolicy_86600901"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get_users_name_0_IamRole_595620B4.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_get_path_name_age_0_IamRolePolicyAttachment_AC1D94FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path_:name_:age_}0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_path_name_age_0_IamRolePolicyAttachment_AC1D94FC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_path_name_age_0_IamRole_B346AB90.name}"
      },
      "cloudApi_get_users_name_0_IamRolePolicyAttachment_0A04DDBA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users_:name_}0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_users_name_0_IamRolePolicyAttachment_0A04DDBA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_users_name_0_IamRole_595620B4.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_get_path_name_age_0_65BF533A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path_:name_:age_}0/Default",
            "uniqueId": "cloudApi_get_path_name_age_0_65BF533A"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_path_-name_-age_-0-c80a5333",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_path_-name_-age_-0-c80a5333",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_path_name_age_0_IamRole_B346AB90.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_path_name_age_0_S3Object_44C9D5F4.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_get_users_name_0_20FCFE31": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users_:name_}0/Default",
            "uniqueId": "cloudApi_get_users_name_0_20FCFE31"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_users_-name_-0-c8bea0a1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_users_-name_-0-c8bea0a1",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_users_name_0_IamRole_595620B4.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_users_name_0_S3Object_447D8506.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-GET-26eaaef3_CF20170D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-26eaaef3",
            "uniqueId": "cloudApi_api_permission-GET-26eaaef3_CF20170D"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_users_name_0_20FCFE31.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/users/permission/{name}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-26eaaef3"
      },
      "cloudApi_api_permission-GET-35cb425d_1F0EB84A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-35cb425d",
            "uniqueId": "cloudApi_api_permission-GET-35cb425d_1F0EB84A"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_users_name_0_20FCFE31.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/users/{name}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-35cb425d"
      },
      "cloudApi_api_permission-GET-e8bcf98a_080C36F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-e8bcf98a",
            "uniqueId": "cloudApi_api_permission-GET-e8bcf98a_080C36F9"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_path_name_age_0_65BF533A.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/path/{name}/{age}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-e8bcf98a"
      },
      "cloudApi_api_permission-GET-e93953c8_FF4AD35C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-e93953c8",
            "uniqueId": "cloudApi_api_permission-GET-e93953c8_FF4AD35C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_users_name_0_20FCFE31.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/path/{name}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-e93953c8"
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
      "cloudApi_get_path_name_age_0_S3Object_44C9D5F4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path_:name_:age_}0/S3Object",
            "uniqueId": "cloudApi_get_path_name_age_0_S3Object_44C9D5F4"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_get_users_name_0_S3Object_447D8506": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users_:name_}0/S3Object",
            "uniqueId": "cloudApi_get_users_name_0_S3Object_447D8506"
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

