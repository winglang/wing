# [path_vars.test.w](../../../../../../examples/tests/sdk_tests/api/path_vars.test.w) | compile | tf-aws

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
        "body": "{\"paths\":{\"/users/{name}\":{\"get\":{\"operationId\":\"get-users/:name\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_users_-name0-c8831d94/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/path/{name}\":{\"get\":{\"operationId\":\"get-path/:name\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_users_-name0-c8831d94/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/users/permission/{name}\":{\"get\":{\"operationId\":\"get-users/permission/:name\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_users_-name0-c8831d94/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/path/{name}/{age}\":{\"get\":{\"operationId\":\"get-path/:name/:age\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"name\":\"age\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_path_-name_-age0-c8e1843f/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}},\"openapi\":\"3.0.3\"}",
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
      "Api_get_path_name_age0_CloudwatchLogGroup_4046BC2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_path_:name_:age0/CloudwatchLogGroup",
            "uniqueId": "Api_get_path_name_age0_CloudwatchLogGroup_4046BC2E"
          }
        },
        "name": "/aws/lambda/get_path_-name_-age0-c8e1843f",
        "retention_in_days": 30
      },
      "Api_get_users_name0_CloudwatchLogGroup_32124378": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_users_:name0/CloudwatchLogGroup",
            "uniqueId": "Api_get_users_name0_CloudwatchLogGroup_32124378"
          }
        },
        "name": "/aws/lambda/get_users_-name0-c8831d94",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Api_get_path_name_age0_IamRole_02E21B80": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_path_:name_:age0/IamRole",
            "uniqueId": "Api_get_path_name_age0_IamRole_02E21B80"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Api_get_users_name0_IamRole_B9DD1767": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_users_:name0/IamRole",
            "uniqueId": "Api_get_users_name0_IamRole_B9DD1767"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Api_get_path_name_age0_IamRolePolicy_B3AA7950": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_path_:name_:age0/IamRolePolicy",
            "uniqueId": "Api_get_path_name_age0_IamRolePolicy_B3AA7950"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_get_path_name_age0_IamRole_02E21B80.name}"
      },
      "Api_get_users_name0_IamRolePolicy_F101FDF4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_users_:name0/IamRolePolicy",
            "uniqueId": "Api_get_users_name0_IamRolePolicy_F101FDF4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_get_users_name0_IamRole_B9DD1767.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Api_get_path_name_age0_IamRolePolicyAttachment_50B2C16D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_path_:name_:age0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_path_name_age0_IamRolePolicyAttachment_50B2C16D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_path_name_age0_IamRole_02E21B80.name}"
      },
      "Api_get_users_name0_IamRolePolicyAttachment_4B78F6FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_users_:name0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_users_name0_IamRolePolicyAttachment_4B78F6FC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_users_name0_IamRole_B9DD1767.name}"
      }
    },
    "aws_lambda_function": {
      "Api_get_path_name_age0_ECE6563E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_path_:name_:age0/Default",
            "uniqueId": "Api_get_path_name_age0_ECE6563E"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_path_-name_-age0-c8e1843f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_path_-name_-age0-c8e1843f",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_path_name_age0_IamRole_02E21B80.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_path_name_age0_S3Object_34F30D83.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Api_get_users_name0_81456D48": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_users_:name0/Default",
            "uniqueId": "Api_get_users_name0_81456D48"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_users_-name0-c8831d94",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_users_-name0-c8831d94",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_users_name0_IamRole_B9DD1767.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_users_name0_S3Object_02C47532.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Api_api_permission-GET-26eaaef3_2017F9D3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-26eaaef3",
            "uniqueId": "Api_api_permission-GET-26eaaef3_2017F9D3"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_users_name0_81456D48.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/users/permission/{name}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-26eaaef3"
      },
      "Api_api_permission-GET-35cb425d_CE77814E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-35cb425d",
            "uniqueId": "Api_api_permission-GET-35cb425d_CE77814E"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_users_name0_81456D48.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/users/{name}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-35cb425d"
      },
      "Api_api_permission-GET-e8bcf98a_26C304C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-e8bcf98a",
            "uniqueId": "Api_api_permission-GET-e8bcf98a_26C304C4"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_path_name_age0_ECE6563E.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/path/{name}/{age}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-e8bcf98a"
      },
      "Api_api_permission-GET-e93953c8_90524D52": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-e93953c8",
            "uniqueId": "Api_api_permission-GET-e93953c8_90524D52"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_users_name0_81456D48.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/path/{name}",
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
      "Api_get_path_name_age0_S3Object_34F30D83": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_path_:name_:age0/S3Object",
            "uniqueId": "Api_get_path_name_age0_S3Object_34F30D83"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Api_get_users_name0_S3Object_02C47532": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_users_:name0/S3Object",
            "uniqueId": "Api_get_users_name0_S3Object_02C47532"
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

