# [fetch.test.w](../../../../../../examples/tests/sdk_tests/http/fetch.test.w) | compile | tf-aws

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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/redirect\":{\"get\":{\"operationId\":\"get-redirect\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_redirect0-c80b05b9/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/target\":{\"get\":{\"operationId\":\"get-target\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_target0-c829fcc5/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "cloudApi_get_redirect0_CloudwatchLogGroup_090FF4BA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_redirect0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_redirect0_CloudwatchLogGroup_090FF4BA"
          }
        },
        "name": "/aws/lambda/get_redirect0-c80b05b9",
        "retention_in_days": 30
      },
      "cloudApi_get_target0_CloudwatchLogGroup_D804A722": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_target0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_target0_CloudwatchLogGroup_D804A722"
          }
        },
        "name": "/aws/lambda/get_target0-c829fcc5",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_get_redirect0_IamRole_4CE147E2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_redirect0/IamRole",
            "uniqueId": "cloudApi_get_redirect0_IamRole_4CE147E2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_get_target0_IamRole_88D877F6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_target0/IamRole",
            "uniqueId": "cloudApi_get_target0_IamRole_88D877F6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_get_redirect0_IamRolePolicy_698DEE73": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_redirect0/IamRolePolicy",
            "uniqueId": "cloudApi_get_redirect0_IamRolePolicy_698DEE73"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudApi_get_redirect0_IamRole_4CE147E2.name}"
      },
      "cloudApi_get_target0_IamRolePolicy_382AEF42": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_target0/IamRolePolicy",
            "uniqueId": "cloudApi_get_target0_IamRolePolicy_382AEF42"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get_target0_IamRole_88D877F6.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_get_redirect0_IamRolePolicyAttachment_CAE36443": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_redirect0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_redirect0_IamRolePolicyAttachment_CAE36443"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_redirect0_IamRole_4CE147E2.name}"
      },
      "cloudApi_get_target0_IamRolePolicyAttachment_1695CE06": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_target0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_target0_IamRolePolicyAttachment_1695CE06"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_target0_IamRole_88D877F6.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_get_redirect0_43C4892F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_redirect0/Default",
            "uniqueId": "cloudApi_get_redirect0_43C4892F"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_redirect0-c80b05b9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_redirect0-c80b05b9",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_redirect0_IamRole_4CE147E2.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_redirect0_S3Object_DF4A7DAF.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_get_target0_6FD7500E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_target0/Default",
            "uniqueId": "cloudApi_get_target0_6FD7500E"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_target0-c829fcc5",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_target0-c829fcc5",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_target0_IamRole_88D877F6.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_target0_S3Object_A6AC5D23.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-GET-163e950c_E222C78F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-163e950c",
            "uniqueId": "cloudApi_api_permission-GET-163e950c_E222C78F"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_redirect0_43C4892F.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/redirect",
        "statement_id": "AllowExecutionFromAPIGateway-GET-163e950c"
      },
      "cloudApi_api_permission-GET-5fe9bc05_21C70546": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-5fe9bc05",
            "uniqueId": "cloudApi_api_permission-GET-5fe9bc05_21C70546"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_target0_6FD7500E.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/target",
        "statement_id": "AllowExecutionFromAPIGateway-GET-5fe9bc05"
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
      },
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_object": {
      "cloudApi_get_redirect0_S3Object_DF4A7DAF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_redirect0/S3Object",
            "uniqueId": "cloudApi_get_redirect0_S3Object_DF4A7DAF"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_get_target0_S3Object_A6AC5D23": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_target0/S3Object",
            "uniqueId": "cloudApi_get_target0_S3Object_A6AC5D23"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_S3Object-urltxt_186C27E6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3Object-url.txt",
            "uniqueId": "cloudBucket_S3Object-urltxt_186C27E6"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "content": "https://${aws_api_gateway_rest_api.cloudApi_api_2B334D75.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.stage_name}",
        "key": "url.txt"
      }
    }
  }
}
```

