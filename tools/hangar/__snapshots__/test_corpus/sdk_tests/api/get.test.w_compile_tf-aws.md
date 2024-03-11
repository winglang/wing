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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path\":{\"get\":{\"operationId\":\"get-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_path0-c8877c6b/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/default-response\":{\"get\":{\"operationId\":\"get-default-response\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_default-response0-c8a2ac3e/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/default-status\":{\"get\":{\"operationId\":\"get-default-status\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_default-status0-c83f25fe/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "cloudApi_get_default-response0_CloudwatchLogGroup_E6D4A17A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_default-response0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_default-response0_CloudwatchLogGroup_E6D4A17A"
          }
        },
        "name": "/aws/lambda/get_default-response0-c8a2ac3e",
        "retention_in_days": 30
      },
      "cloudApi_get_default-status0_CloudwatchLogGroup_E7C991D6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_default-status0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_default-status0_CloudwatchLogGroup_E7C991D6"
          }
        },
        "name": "/aws/lambda/get_default-status0-c83f25fe",
        "retention_in_days": 30
      },
      "cloudApi_get_path0_CloudwatchLogGroup_0507D70F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_path0_CloudwatchLogGroup_0507D70F"
          }
        },
        "name": "/aws/lambda/get_path0-c8877c6b",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_get_default-response0_IamRole_A760A9B4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_default-response0/IamRole",
            "uniqueId": "cloudApi_get_default-response0_IamRole_A760A9B4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_get_default-status0_IamRole_8901F9E6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_default-status0/IamRole",
            "uniqueId": "cloudApi_get_default-status0_IamRole_8901F9E6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_get_path0_IamRole_87E16677": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path0/IamRole",
            "uniqueId": "cloudApi_get_path0_IamRole_87E16677"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_get_default-response0_IamRolePolicy_B490BD07": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_default-response0/IamRolePolicy",
            "uniqueId": "cloudApi_get_default-response0_IamRolePolicy_B490BD07"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get_default-response0_IamRole_A760A9B4.name}"
      },
      "cloudApi_get_default-status0_IamRolePolicy_92609957": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_default-status0/IamRolePolicy",
            "uniqueId": "cloudApi_get_default-status0_IamRolePolicy_92609957"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get_default-status0_IamRole_8901F9E6.name}"
      },
      "cloudApi_get_path0_IamRolePolicy_956114E9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path0/IamRolePolicy",
            "uniqueId": "cloudApi_get_path0_IamRolePolicy_956114E9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get_path0_IamRole_87E16677.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_get_default-response0_IamRolePolicyAttachment_E75D6A69": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_default-response0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_default-response0_IamRolePolicyAttachment_E75D6A69"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_default-response0_IamRole_A760A9B4.name}"
      },
      "cloudApi_get_default-status0_IamRolePolicyAttachment_B64BA8DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_default-status0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_default-status0_IamRolePolicyAttachment_B64BA8DC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_default-status0_IamRole_8901F9E6.name}"
      },
      "cloudApi_get_path0_IamRolePolicyAttachment_7CB65894": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_path0_IamRolePolicyAttachment_7CB65894"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_path0_IamRole_87E16677.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_get_default-response0_39D65CAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_default-response0/Default",
            "uniqueId": "cloudApi_get_default-response0_39D65CAD"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_default-response0-c8a2ac3e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_default-response0-c8a2ac3e",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "reserved_concurrent_executions": 10,
        "role": "${aws_iam_role.cloudApi_get_default-response0_IamRole_A760A9B4.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_default-response0_S3Object_B806078E.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_get_default-status0_7D57B0FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_default-status0/Default",
            "uniqueId": "cloudApi_get_default-status0_7D57B0FA"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_default-status0-c83f25fe",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_default-status0-c83f25fe",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "reserved_concurrent_executions": 10,
        "role": "${aws_iam_role.cloudApi_get_default-status0_IamRole_8901F9E6.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_default-status0_S3Object_56679263.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_get_path0_4B9520C1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path0/Default",
            "uniqueId": "cloudApi_get_path0_4B9520C1"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_path0-c8877c6b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_path0-c8877c6b",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "reserved_concurrent_executions": 10,
        "role": "${aws_iam_role.cloudApi_get_path0_IamRole_87E16677.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_path0_S3Object_65090D2E.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-GET-06c7b019_3EAE9A0A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-06c7b019",
            "uniqueId": "cloudApi_api_permission-GET-06c7b019_3EAE9A0A"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_default-status0_7D57B0FA.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/default-status",
        "statement_id": "AllowExecutionFromAPIGateway-GET-06c7b019"
      },
      "cloudApi_api_permission-GET-e2131352_3FDDE199": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-e2131352",
            "uniqueId": "cloudApi_api_permission-GET-e2131352_3FDDE199"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_path0_4B9520C1.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/path",
        "statement_id": "AllowExecutionFromAPIGateway-GET-e2131352"
      },
      "cloudApi_api_permission-GET-eb193fe3_702F896F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-eb193fe3",
            "uniqueId": "cloudApi_api_permission-GET-eb193fe3_702F896F"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_default-response0_39D65CAD.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/default-response",
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
      "cloudApi_get_default-response0_S3Object_B806078E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_default-response0/S3Object",
            "uniqueId": "cloudApi_get_default-response0_S3Object_B806078E"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_get_default-status0_S3Object_56679263": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_default-status0/S3Object",
            "uniqueId": "cloudApi_get_default-status0_S3Object_56679263"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_get_path0_S3Object_65090D2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path0/S3Object",
            "uniqueId": "cloudApi_get_path0_S3Object_65090D2E"
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

