# [empty-actions.test.w](../../../../../../examples/tests/sdk_tests/misc/empty-actions.test.w) | compile | tf-aws

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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/foo\":{\"get\":{\"operationId\":\"get-foo\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_foo0-c857c617/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/bar\":{\"get\":{\"operationId\":\"get-bar\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_bar0-c860413a/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "cloudApi_get_bar0_CloudwatchLogGroup_62F08B62": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_bar0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_bar0_CloudwatchLogGroup_62F08B62"
          }
        },
        "name": "/aws/lambda/get_bar0-c860413a",
        "retention_in_days": 30
      },
      "cloudApi_get_foo0_CloudwatchLogGroup_A3B51365": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_foo0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_foo0_CloudwatchLogGroup_A3B51365"
          }
        },
        "name": "/aws/lambda/get_foo0-c857c617",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_get_bar0_IamRole_55C24513": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_bar0/IamRole",
            "uniqueId": "cloudApi_get_bar0_IamRole_55C24513"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_get_foo0_IamRole_54682B1A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_foo0/IamRole",
            "uniqueId": "cloudApi_get_foo0_IamRole_54682B1A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_get_bar0_IamRolePolicy_5C1EB16B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_bar0/IamRolePolicy",
            "uniqueId": "cloudApi_get_bar0_IamRolePolicy_5C1EB16B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get_bar0_IamRole_55C24513.name}"
      },
      "cloudApi_get_foo0_IamRolePolicy_5FEC283C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_foo0/IamRolePolicy",
            "uniqueId": "cloudApi_get_foo0_IamRolePolicy_5FEC283C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.A_cloudBucket_DFCC9367.arn}\",\"${aws_s3_bucket.A_cloudBucket_DFCC9367.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudApi_get_foo0_IamRole_54682B1A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_get_bar0_IamRolePolicyAttachment_8D978EBA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_bar0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_bar0_IamRolePolicyAttachment_8D978EBA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_bar0_IamRole_55C24513.name}"
      },
      "cloudApi_get_foo0_IamRolePolicyAttachment_1ACDC421": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_foo0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_foo0_IamRolePolicyAttachment_1ACDC421"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_foo0_IamRole_54682B1A.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_get_bar0_15FE1B0A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_bar0/Default",
            "uniqueId": "cloudApi_get_bar0_15FE1B0A"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_5c35566c": "${aws_s3_bucket.A_cloudBucket_DFCC9367.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_bar0-c860413a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_bar0-c860413a",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_bar0_IamRole_55C24513.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_bar0_S3Object_F8EFFEAE.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_get_foo0_8DAB9111": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_foo0/Default",
            "uniqueId": "cloudApi_get_foo0_8DAB9111"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_5c35566c": "${aws_s3_bucket.A_cloudBucket_DFCC9367.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_foo0-c857c617",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_foo0-c857c617",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_foo0_IamRole_54682B1A.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_foo0_S3Object_5B231348.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-GET-2d589ee9_3D8411D8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-2d589ee9",
            "uniqueId": "cloudApi_api_permission-GET-2d589ee9_3D8411D8"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_bar0_15FE1B0A.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/bar",
        "statement_id": "AllowExecutionFromAPIGateway-GET-2d589ee9"
      },
      "cloudApi_api_permission-GET-4273ae49_974F3EC5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-4273ae49",
            "uniqueId": "cloudApi_api_permission-GET-4273ae49_974F3EC5"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_foo0_8DAB9111.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/foo",
        "statement_id": "AllowExecutionFromAPIGateway-GET-4273ae49"
      }
    },
    "aws_s3_bucket": {
      "A_cloudBucket_DFCC9367": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Bucket/Default",
            "uniqueId": "A_cloudBucket_DFCC9367"
          }
        },
        "bucket_prefix": "cloud-bucket-c8eec589-",
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
    "aws_s3_object": {
      "cloudApi_get_bar0_S3Object_F8EFFEAE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_bar0/S3Object",
            "uniqueId": "cloudApi_get_bar0_S3Object_F8EFFEAE"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_get_foo0_S3Object_5B231348": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_foo0/S3Object",
            "uniqueId": "cloudApi_get_foo0_S3Object_5B231348"
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

