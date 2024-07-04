# [options.test.w](../../../../../../examples/tests/sdk_tests/api/options.test.w) | compile | tf-aws

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
        "body": "{\"paths\":{\"/path\":{\"options\":{\"operationId\":\"options-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:options_path0-c858e550/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"head\":{\"operationId\":\"head-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:head_path0-c8127a73/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"connect\":{\"operationId\":\"connect-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:connect_path0-c88ada6c/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}},\"openapi\":\"3.0.3\"}",
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
      "Api_connect_path0_CloudwatchLogGroup_2EB34FC0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/connect_path0/CloudwatchLogGroup",
            "uniqueId": "Api_connect_path0_CloudwatchLogGroup_2EB34FC0"
          }
        },
        "name": "/aws/lambda/connect_path0-c88ada6c",
        "retention_in_days": 30
      },
      "Api_head_path0_CloudwatchLogGroup_AE2FC969": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/head_path0/CloudwatchLogGroup",
            "uniqueId": "Api_head_path0_CloudwatchLogGroup_AE2FC969"
          }
        },
        "name": "/aws/lambda/head_path0-c8127a73",
        "retention_in_days": 30
      },
      "Api_options_path0_CloudwatchLogGroup_55814EB4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/options_path0/CloudwatchLogGroup",
            "uniqueId": "Api_options_path0_CloudwatchLogGroup_55814EB4"
          }
        },
        "name": "/aws/lambda/options_path0-c858e550",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Api_connect_path0_IamRole_879E3AD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/connect_path0/IamRole",
            "uniqueId": "Api_connect_path0_IamRole_879E3AD0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Api_head_path0_IamRole_8A76125C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/head_path0/IamRole",
            "uniqueId": "Api_head_path0_IamRole_8A76125C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Api_options_path0_IamRole_993D1A6D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/options_path0/IamRole",
            "uniqueId": "Api_options_path0_IamRole_993D1A6D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Api_connect_path0_IamRolePolicy_8F2AA257": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/connect_path0/IamRolePolicy",
            "uniqueId": "Api_connect_path0_IamRolePolicy_8F2AA257"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_connect_path0_IamRole_879E3AD0.name}"
      },
      "Api_head_path0_IamRolePolicy_C0B77C9E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/head_path0/IamRolePolicy",
            "uniqueId": "Api_head_path0_IamRolePolicy_C0B77C9E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_head_path0_IamRole_8A76125C.name}"
      },
      "Api_options_path0_IamRolePolicy_6105672A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/options_path0/IamRolePolicy",
            "uniqueId": "Api_options_path0_IamRolePolicy_6105672A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_options_path0_IamRole_993D1A6D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Api_connect_path0_IamRolePolicyAttachment_0EA53E52": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/connect_path0/IamRolePolicyAttachment",
            "uniqueId": "Api_connect_path0_IamRolePolicyAttachment_0EA53E52"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_connect_path0_IamRole_879E3AD0.name}"
      },
      "Api_head_path0_IamRolePolicyAttachment_D8123259": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/head_path0/IamRolePolicyAttachment",
            "uniqueId": "Api_head_path0_IamRolePolicyAttachment_D8123259"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_head_path0_IamRole_8A76125C.name}"
      },
      "Api_options_path0_IamRolePolicyAttachment_6CDDBCBD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/options_path0/IamRolePolicyAttachment",
            "uniqueId": "Api_options_path0_IamRolePolicyAttachment_6CDDBCBD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_options_path0_IamRole_993D1A6D.name}"
      }
    },
    "aws_lambda_function": {
      "Api_connect_path0_9A10CD07": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/connect_path0/Default",
            "uniqueId": "Api_connect_path0_9A10CD07"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "connect_path0-c88ada6c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "connect_path0-c88ada6c",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_connect_path0_IamRole_879E3AD0.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_connect_path0_S3Object_F19FB71A.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Api_head_path0_CD0BF570": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/head_path0/Default",
            "uniqueId": "Api_head_path0_CD0BF570"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "head_path0-c8127a73",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "head_path0-c8127a73",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_head_path0_IamRole_8A76125C.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_head_path0_S3Object_AFB8E06A.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Api_options_path0_AA6A3AAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/options_path0/Default",
            "uniqueId": "Api_options_path0_AA6A3AAD"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "options_path0-c858e550",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "options_path0-c858e550",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_options_path0_IamRole_993D1A6D.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_options_path0_S3Object_F1D01B85.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Api_api_permission-CONNECT-e2131352_6940B960": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-CONNECT-e2131352",
            "uniqueId": "Api_api_permission-CONNECT-e2131352_6940B960"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_connect_path0_9A10CD07.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/CONNECT/path",
        "statement_id": "AllowExecutionFromAPIGateway-CONNECT-e2131352"
      },
      "Api_api_permission-HEAD-e2131352_8155B558": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-HEAD-e2131352",
            "uniqueId": "Api_api_permission-HEAD-e2131352_8155B558"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_head_path0_CD0BF570.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/HEAD/path",
        "statement_id": "AllowExecutionFromAPIGateway-HEAD-e2131352"
      },
      "Api_api_permission-OPTIONS-e2131352_EDD2B8E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-OPTIONS-e2131352",
            "uniqueId": "Api_api_permission-OPTIONS-e2131352_EDD2B8E4"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_options_path0_AA6A3AAD.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/OPTIONS/path",
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
      "Api_connect_path0_S3Object_F19FB71A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/connect_path0/S3Object",
            "uniqueId": "Api_connect_path0_S3Object_F19FB71A"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Api_head_path0_S3Object_AFB8E06A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/head_path0/S3Object",
            "uniqueId": "Api_head_path0_S3Object_AFB8E06A"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Api_options_path0_S3Object_F1D01B85": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/options_path0/S3Object",
            "uniqueId": "Api_options_path0_S3Object_F1D01B85"
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

