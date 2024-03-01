# [get.test.w](../../../../../../examples/tests/sdk_tests/api/get.test.w) | compile | tf-aws

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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path\":{\"get\":{\"operationId\":\"get-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_path0-c8789d12/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/default-response\":{\"get\":{\"operationId\":\"get-default-response\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_default-response0-c8ce77c1/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/default-status\":{\"get\":{\"operationId\":\"get-default-status\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_default-status0-c8c4d89b/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "Api_get_default-response0_CloudwatchLogGroup_510DECD8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_default-response0/CloudwatchLogGroup",
            "uniqueId": "Api_get_default-response0_CloudwatchLogGroup_510DECD8"
          }
        },
        "name": "/aws/lambda/get_default-response0-c8ce77c1",
        "retention_in_days": 30
      },
      "Api_get_default-status0_CloudwatchLogGroup_E8CEA189": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_default-status0/CloudwatchLogGroup",
            "uniqueId": "Api_get_default-status0_CloudwatchLogGroup_E8CEA189"
          }
        },
        "name": "/aws/lambda/get_default-status0-c8c4d89b",
        "retention_in_days": 30
      },
      "Api_get_path0_CloudwatchLogGroup_B7150EB5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_path0/CloudwatchLogGroup",
            "uniqueId": "Api_get_path0_CloudwatchLogGroup_B7150EB5"
          }
        },
        "name": "/aws/lambda/get_path0-c8789d12",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Api_get_default-response0_IamRole_A864CAEB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_default-response0/IamRole",
            "uniqueId": "Api_get_default-response0_IamRole_A864CAEB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Api_get_default-status0_IamRole_39C8F206": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_default-status0/IamRole",
            "uniqueId": "Api_get_default-status0_IamRole_39C8F206"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Api_get_path0_IamRole_66BB88D8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_path0/IamRole",
            "uniqueId": "Api_get_path0_IamRole_66BB88D8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Api_get_default-response0_IamRolePolicy_6787CAC4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_default-response0/IamRolePolicy",
            "uniqueId": "Api_get_default-response0_IamRolePolicy_6787CAC4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_get_default-response0_IamRole_A864CAEB.name}"
      },
      "Api_get_default-status0_IamRolePolicy_7535C430": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_default-status0/IamRolePolicy",
            "uniqueId": "Api_get_default-status0_IamRolePolicy_7535C430"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_get_default-status0_IamRole_39C8F206.name}"
      },
      "Api_get_path0_IamRolePolicy_C87DDBC3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_path0/IamRolePolicy",
            "uniqueId": "Api_get_path0_IamRolePolicy_C87DDBC3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_get_path0_IamRole_66BB88D8.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Api_get_default-response0_IamRolePolicyAttachment_852746EE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_default-response0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_default-response0_IamRolePolicyAttachment_852746EE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_default-response0_IamRole_A864CAEB.name}"
      },
      "Api_get_default-status0_IamRolePolicyAttachment_6414F6CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_default-status0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_default-status0_IamRolePolicyAttachment_6414F6CB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_default-status0_IamRole_39C8F206.name}"
      },
      "Api_get_path0_IamRolePolicyAttachment_94BA0B78": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_path0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_path0_IamRolePolicyAttachment_94BA0B78"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_path0_IamRole_66BB88D8.name}"
      }
    },
    "aws_lambda_function": {
      "Api_get_default-response0_E3CB7035": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_default-response0/Default",
            "uniqueId": "Api_get_default-response0_E3CB7035"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_default-response0-c8ce77c1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_default-response0-c8ce77c1",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_default-response0_IamRole_A864CAEB.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_default-response0_S3Object_1F3962E5.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Api_get_default-status0_EF75A37E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_default-status0/Default",
            "uniqueId": "Api_get_default-status0_EF75A37E"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_default-status0-c8c4d89b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_default-status0-c8c4d89b",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_default-status0_IamRole_39C8F206.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_default-status0_S3Object_300B32EC.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Api_get_path0_CB7C4BBC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_path0/Default",
            "uniqueId": "Api_get_path0_CB7C4BBC"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_path0-c8789d12",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_path0-c8789d12",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_path0_IamRole_66BB88D8.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_path0_S3Object_6334C185.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Api_api_permission-GET-06c7b019_02ED7C5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-06c7b019",
            "uniqueId": "Api_api_permission-GET-06c7b019_02ED7C5D"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_default-status0_EF75A37E.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/default-status",
        "statement_id": "AllowExecutionFromAPIGateway-GET-06c7b019"
      },
      "Api_api_permission-GET-e2131352_9A82BDF8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-e2131352",
            "uniqueId": "Api_api_permission-GET-e2131352_9A82BDF8"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_path0_CB7C4BBC.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/path",
        "statement_id": "AllowExecutionFromAPIGateway-GET-e2131352"
      },
      "Api_api_permission-GET-eb193fe3_48F25ED3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-eb193fe3",
            "uniqueId": "Api_api_permission-GET-eb193fe3_48F25ED3"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_default-response0_E3CB7035.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/default-response",
        "statement_id": "AllowExecutionFromAPIGateway-GET-eb193fe3"
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
      "Api_get_default-response0_S3Object_1F3962E5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_default-response0/S3Object",
            "uniqueId": "Api_get_default-response0_S3Object_1F3962E5"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Api_get_default-status0_S3Object_300B32EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_default-status0/S3Object",
            "uniqueId": "Api_get_default-status0_S3Object_300B32EC"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Api_get_path0_S3Object_6334C185": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_path0/S3Object",
            "uniqueId": "Api_get_path0_S3Object_6334C185"
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

