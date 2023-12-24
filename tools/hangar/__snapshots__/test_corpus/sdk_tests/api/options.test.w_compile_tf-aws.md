# [options.test.w](../../../../../../examples/tests/sdk_tests/api/options.test.w) | compile | tf-aws

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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path\":{\"options\":{\"operationId\":\"options-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_options_path_0_C625FF74.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"head\":{\"operationId\":\"head-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_head_path_0_6E6840F1.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"connect\":{\"operationId\":\"connect-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_connect_path_0_2469026D.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "cloudApi_connect_path_0_CloudwatchLogGroup_712B8519": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/connect_path_}0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_connect_path_0_CloudwatchLogGroup_712B8519"
          }
        },
        "name": "/aws/lambda/connect_path_-0-c800b91d",
        "retention_in_days": 30
      },
      "cloudApi_head_path_0_CloudwatchLogGroup_A896E845": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/head_path_}0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_head_path_0_CloudwatchLogGroup_A896E845"
          }
        },
        "name": "/aws/lambda/head_path_-0-c8113999",
        "retention_in_days": 30
      },
      "cloudApi_options_path_0_CloudwatchLogGroup_00461C4D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/options_path_}0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_options_path_0_CloudwatchLogGroup_00461C4D"
          }
        },
        "name": "/aws/lambda/options_path_-0-c850eab5",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_connect_path_0_IamRole_372127E9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/connect_path_}0/IamRole",
            "uniqueId": "cloudApi_connect_path_0_IamRole_372127E9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_head_path_0_IamRole_C6940D62": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/head_path_}0/IamRole",
            "uniqueId": "cloudApi_head_path_0_IamRole_C6940D62"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_options_path_0_IamRole_C94B1F2A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/options_path_}0/IamRole",
            "uniqueId": "cloudApi_options_path_0_IamRole_C94B1F2A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_connect_path_0_IamRolePolicy_804BCE21": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/connect_path_}0/IamRolePolicy",
            "uniqueId": "cloudApi_connect_path_0_IamRolePolicy_804BCE21"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_connect_path_0_IamRole_372127E9.name}"
      },
      "cloudApi_head_path_0_IamRolePolicy_30E288BA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/head_path_}0/IamRolePolicy",
            "uniqueId": "cloudApi_head_path_0_IamRolePolicy_30E288BA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_head_path_0_IamRole_C6940D62.name}"
      },
      "cloudApi_options_path_0_IamRolePolicy_53595878": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/options_path_}0/IamRolePolicy",
            "uniqueId": "cloudApi_options_path_0_IamRolePolicy_53595878"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_options_path_0_IamRole_C94B1F2A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_connect_path_0_IamRolePolicyAttachment_B40F8B82": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/connect_path_}0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_connect_path_0_IamRolePolicyAttachment_B40F8B82"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_connect_path_0_IamRole_372127E9.name}"
      },
      "cloudApi_head_path_0_IamRolePolicyAttachment_B2A58D32": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/head_path_}0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_head_path_0_IamRolePolicyAttachment_B2A58D32"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_head_path_0_IamRole_C6940D62.name}"
      },
      "cloudApi_options_path_0_IamRolePolicyAttachment_F4B07B89": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/options_path_}0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_options_path_0_IamRolePolicyAttachment_F4B07B89"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_options_path_0_IamRole_C94B1F2A.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_connect_path_0_2469026D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/connect_path_}0/Default",
            "uniqueId": "cloudApi_connect_path_0_2469026D"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "connect_path_-0-c800b91d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "connect_path_-0-c800b91d",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_connect_path_0_IamRole_372127E9.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_connect_path_0_S3Object_31BCDE9B.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_head_path_0_6E6840F1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/head_path_}0/Default",
            "uniqueId": "cloudApi_head_path_0_6E6840F1"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "head_path_-0-c8113999",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "head_path_-0-c8113999",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_head_path_0_IamRole_C6940D62.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_head_path_0_S3Object_3B3422F6.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_options_path_0_C625FF74": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/options_path_}0/Default",
            "uniqueId": "cloudApi_options_path_0_C625FF74"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "options_path_-0-c850eab5",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "options_path_-0-c850eab5",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_options_path_0_IamRole_C94B1F2A.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_options_path_0_S3Object_A0FC37D3.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-CONNECT-e2131352_C00751A2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-CONNECT-e2131352",
            "uniqueId": "cloudApi_api_permission-CONNECT-e2131352_C00751A2"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_connect_path_0_2469026D.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/CONNECT/path",
        "statement_id": "AllowExecutionFromAPIGateway-CONNECT-e2131352"
      },
      "cloudApi_api_permission-HEAD-e2131352_C80E1586": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-HEAD-e2131352",
            "uniqueId": "cloudApi_api_permission-HEAD-e2131352_C80E1586"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_head_path_0_6E6840F1.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/HEAD/path",
        "statement_id": "AllowExecutionFromAPIGateway-HEAD-e2131352"
      },
      "cloudApi_api_permission-OPTIONS-e2131352_70546290": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-OPTIONS-e2131352",
            "uniqueId": "cloudApi_api_permission-OPTIONS-e2131352_70546290"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_options_path_0_C625FF74.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/OPTIONS/path",
        "statement_id": "AllowExecutionFromAPIGateway-OPTIONS-e2131352"
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
      "cloudApi_connect_path_0_S3Object_31BCDE9B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/connect_path_}0/S3Object",
            "uniqueId": "cloudApi_connect_path_0_S3Object_31BCDE9B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_head_path_0_S3Object_3B3422F6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/head_path_}0/S3Object",
            "uniqueId": "cloudApi_head_path_0_S3Object_3B3422F6"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_options_path_0_S3Object_A0FC37D3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/options_path_}0/S3Object",
            "uniqueId": "cloudApi_options_path_0_S3Object_A0FC37D3"
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

