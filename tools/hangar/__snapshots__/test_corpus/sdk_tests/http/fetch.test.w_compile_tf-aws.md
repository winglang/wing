# [fetch.test.w](../../../../../../tests/sdk_tests/http/fetch.test.w) | compile | tf-aws

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
        "body": "{\"paths\":{\"/redirect\":{\"get\":{\"operationId\":\"get-redirect\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_redirect0-c8014f2b/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/target\":{\"get\":{\"operationId\":\"get-target\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_target0-c8691704/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/delayed\":{\"get\":{\"operationId\":\"get-delayed\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_delayed0-c890c00c/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}},\"openapi\":\"3.0.3\"}",
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
      "Api_get_delayed0_CloudwatchLogGroup_4FA1F5BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_delayed0/CloudwatchLogGroup",
            "uniqueId": "Api_get_delayed0_CloudwatchLogGroup_4FA1F5BC"
          }
        },
        "name": "/aws/lambda/get_delayed0-c890c00c",
        "retention_in_days": 30
      },
      "Api_get_redirect0_CloudwatchLogGroup_241B5139": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_redirect0/CloudwatchLogGroup",
            "uniqueId": "Api_get_redirect0_CloudwatchLogGroup_241B5139"
          }
        },
        "name": "/aws/lambda/get_redirect0-c8014f2b",
        "retention_in_days": 30
      },
      "Api_get_target0_CloudwatchLogGroup_7566BF70": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_target0/CloudwatchLogGroup",
            "uniqueId": "Api_get_target0_CloudwatchLogGroup_7566BF70"
          }
        },
        "name": "/aws/lambda/get_target0-c8691704",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Api_get_delayed0_IamRole_BF4D162F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_delayed0/IamRole",
            "uniqueId": "Api_get_delayed0_IamRole_BF4D162F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Api_get_redirect0_IamRole_C9E5BF5A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_redirect0/IamRole",
            "uniqueId": "Api_get_redirect0_IamRole_C9E5BF5A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Api_get_target0_IamRole_865D04CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_target0/IamRole",
            "uniqueId": "Api_get_target0_IamRole_865D04CC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Api_get_delayed0_IamRolePolicy_533828E2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_delayed0/IamRolePolicy",
            "uniqueId": "Api_get_delayed0_IamRolePolicy_533828E2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_get_delayed0_IamRole_BF4D162F.name}"
      },
      "Api_get_redirect0_IamRolePolicy_63A30C78": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_redirect0/IamRolePolicy",
            "uniqueId": "Api_get_redirect0_IamRolePolicy_63A30C78"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.Bucket.arn}\",\"${aws_s3_bucket.Bucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Api_get_redirect0_IamRole_C9E5BF5A.name}"
      },
      "Api_get_target0_IamRolePolicy_575248B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_target0/IamRolePolicy",
            "uniqueId": "Api_get_target0_IamRolePolicy_575248B9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_get_target0_IamRole_865D04CC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Api_get_delayed0_IamRolePolicyAttachment_4A691566": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_delayed0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_delayed0_IamRolePolicyAttachment_4A691566"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_delayed0_IamRole_BF4D162F.name}"
      },
      "Api_get_redirect0_IamRolePolicyAttachment_5ABDB8D1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_redirect0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_redirect0_IamRolePolicyAttachment_5ABDB8D1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_redirect0_IamRole_C9E5BF5A.name}"
      },
      "Api_get_target0_IamRolePolicyAttachment_6DA6B250": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_target0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_target0_IamRolePolicyAttachment_6DA6B250"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_target0_IamRole_865D04CC.name}"
      }
    },
    "aws_lambda_function": {
      "Api_get_delayed0_04F37C13": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_delayed0/Default",
            "uniqueId": "Api_get_delayed0_04F37C13"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_delayed0-c890c00c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_delayed0-c890c00c",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_delayed0_IamRole_BF4D162F.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_delayed0_S3Object_C817D653.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Api_get_redirect0_61A02C26": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_redirect0/Default",
            "uniqueId": "Api_get_redirect0_61A02C26"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_1357ca3a": "${aws_s3_bucket.Bucket.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_redirect0-c8014f2b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_redirect0-c8014f2b",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_redirect0_IamRole_C9E5BF5A.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_redirect0_S3Object_16202317.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Api_get_target0_6A24458B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_target0/Default",
            "uniqueId": "Api_get_target0_6A24458B"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_target0-c8691704",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_target0-c8691704",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_target0_IamRole_865D04CC.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_target0_S3Object_0643C629.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Api_api_permission-GET-163e950c_45F5C5BB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-163e950c",
            "uniqueId": "Api_api_permission-GET-163e950c_45F5C5BB"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_redirect0_61A02C26.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/redirect",
        "statement_id": "AllowExecutionFromAPIGateway-GET-163e950c"
      },
      "Api_api_permission-GET-5fe9bc05_7EDAB6BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-5fe9bc05",
            "uniqueId": "Api_api_permission-GET-5fe9bc05_7EDAB6BF"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_target0_6A24458B.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/target",
        "statement_id": "AllowExecutionFromAPIGateway-GET-5fe9bc05"
      },
      "Api_api_permission-GET-f275a59b_9D2B098D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-f275a59b",
            "uniqueId": "Api_api_permission-GET-f275a59b_9D2B098D"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_delayed0_04F37C13.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/delayed",
        "statement_id": "AllowExecutionFromAPIGateway-GET-f275a59b"
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
            "allowed_headers": [
              "*"
            ],
            "allowed_methods": [
              "GET",
              "POST",
              "PUT",
              "DELETE",
              "HEAD"
            ],
            "allowed_origins": [
              "*"
            ],
            "expose_headers": [],
            "max_age_seconds": 0
          }
        ]
      }
    },
    "aws_s3_object": {
      "Api_get_delayed0_S3Object_C817D653": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_delayed0/S3Object",
            "uniqueId": "Api_get_delayed0_S3Object_C817D653"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Api_get_redirect0_S3Object_16202317": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_redirect0/S3Object",
            "uniqueId": "Api_get_redirect0_S3Object_16202317"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Api_get_target0_S3Object_0643C629": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_target0/S3Object",
            "uniqueId": "Api_get_target0_S3Object_0643C629"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Bucket_S3Object-urltxt_54506D60": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/S3Object-url.txt",
            "uniqueId": "Bucket_S3Object-urltxt_54506D60"
          }
        },
        "bucket": "${aws_s3_bucket.Bucket.bucket}",
        "content": "https://${aws_api_gateway_rest_api.Api_api_91C07D84.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.Api_api_stage_E0FA39D6.stage_name}",
        "key": "url.txt"
      }
    }
  }
}
```

