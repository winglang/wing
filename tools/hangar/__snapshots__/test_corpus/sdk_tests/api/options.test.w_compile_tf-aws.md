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
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
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
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
      "value": "[]"
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path\":{\"options\":{\"operationId\":\"options-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-4ee385_D3C0E9FF.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"head\":{\"operationId\":\"head-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-cbeccc_F3DED597.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"connect\":{\"operationId\":\"connect-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-7e7a3f_86CA50A2.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "cloudApi_cloudApi-OnRequest-4ee385_CloudwatchLogGroup_DDC7AB9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-4ee385/CloudwatchLogGroup",
            "uniqueId": "cloudApi_cloudApi-OnRequest-4ee385_CloudwatchLogGroup_DDC7AB9C"
          }
        },
        "name": "/aws/lambda/cloud-Api-OnRequest-4ee385-c8f227ae",
        "retention_in_days": 30
      },
      "cloudApi_cloudApi-OnRequest-7e7a3f_CloudwatchLogGroup_1A851BAC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-7e7a3f/CloudwatchLogGroup",
            "uniqueId": "cloudApi_cloudApi-OnRequest-7e7a3f_CloudwatchLogGroup_1A851BAC"
          }
        },
        "name": "/aws/lambda/cloud-Api-OnRequest-7e7a3f-c8a77db6",
        "retention_in_days": 30
      },
      "cloudApi_cloudApi-OnRequest-cbeccc_CloudwatchLogGroup_B66CEC40": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cbeccc/CloudwatchLogGroup",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cbeccc_CloudwatchLogGroup_B66CEC40"
          }
        },
        "name": "/aws/lambda/cloud-Api-OnRequest-cbeccc-c8346205",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_cloudApi-OnRequest-4ee385_IamRole_485B9441": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-4ee385/IamRole",
            "uniqueId": "cloudApi_cloudApi-OnRequest-4ee385_IamRole_485B9441"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_cloudApi-OnRequest-7e7a3f_IamRole_BBCE4E40": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-7e7a3f/IamRole",
            "uniqueId": "cloudApi_cloudApi-OnRequest-7e7a3f_IamRole_BBCE4E40"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_cloudApi-OnRequest-cbeccc_IamRole_CD4F564D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cbeccc/IamRole",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cbeccc_IamRole_CD4F564D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_cloudApi-OnRequest-4ee385_IamRolePolicy_D552BD4B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-4ee385/IamRolePolicy",
            "uniqueId": "cloudApi_cloudApi-OnRequest-4ee385_IamRolePolicy_D552BD4B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-4ee385_IamRole_485B9441.name}"
      },
      "cloudApi_cloudApi-OnRequest-7e7a3f_IamRolePolicy_4FF3A303": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-7e7a3f/IamRolePolicy",
            "uniqueId": "cloudApi_cloudApi-OnRequest-7e7a3f_IamRolePolicy_4FF3A303"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-7e7a3f_IamRole_BBCE4E40.name}"
      },
      "cloudApi_cloudApi-OnRequest-cbeccc_IamRolePolicy_147F86D1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cbeccc/IamRolePolicy",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cbeccc_IamRolePolicy_147F86D1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-cbeccc_IamRole_CD4F564D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_cloudApi-OnRequest-4ee385_IamRolePolicyAttachment_6CBEF0CE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-4ee385/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_cloudApi-OnRequest-4ee385_IamRolePolicyAttachment_6CBEF0CE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-4ee385_IamRole_485B9441.name}"
      },
      "cloudApi_cloudApi-OnRequest-7e7a3f_IamRolePolicyAttachment_8D0758B8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-7e7a3f/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_cloudApi-OnRequest-7e7a3f_IamRolePolicyAttachment_8D0758B8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-7e7a3f_IamRole_BBCE4E40.name}"
      },
      "cloudApi_cloudApi-OnRequest-cbeccc_IamRolePolicyAttachment_45F30A9A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cbeccc/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cbeccc_IamRolePolicyAttachment_45F30A9A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-cbeccc_IamRole_CD4F564D.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_cloudApi-OnRequest-4ee385_D3C0E9FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-4ee385/Default",
            "uniqueId": "cloudApi_cloudApi-OnRequest-4ee385_D3C0E9FF"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-4ee385-c8f227ae",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-4ee385-c8f227ae",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-4ee385_IamRole_485B9441.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_cloudApi-OnRequest-4ee385_S3Object_A7CCBA9E.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_cloudApi-OnRequest-7e7a3f_86CA50A2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-7e7a3f/Default",
            "uniqueId": "cloudApi_cloudApi-OnRequest-7e7a3f_86CA50A2"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-7e7a3f-c8a77db6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-7e7a3f-c8a77db6",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-7e7a3f_IamRole_BBCE4E40.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_cloudApi-OnRequest-7e7a3f_S3Object_17878D3C.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_cloudApi-OnRequest-cbeccc_F3DED597": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cbeccc/Default",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cbeccc_F3DED597"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-cbeccc-c8346205",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-cbeccc-c8346205",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-cbeccc_IamRole_CD4F564D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_cloudApi-OnRequest-cbeccc_S3Object_9D1020C1.key}",
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
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-7e7a3f_86CA50A2.function_name}",
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
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-cbeccc_F3DED597.function_name}",
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
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-4ee385_D3C0E9FF.function_name}",
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
      "cloudApi_cloudApi-OnRequest-4ee385_S3Object_A7CCBA9E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-4ee385/S3Object",
            "uniqueId": "cloudApi_cloudApi-OnRequest-4ee385_S3Object_A7CCBA9E"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_cloudApi-OnRequest-7e7a3f_S3Object_17878D3C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-7e7a3f/S3Object",
            "uniqueId": "cloudApi_cloudApi-OnRequest-7e7a3f_S3Object_17878D3C"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_cloudApi-OnRequest-cbeccc_S3Object_9D1020C1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cbeccc/S3Object",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cbeccc_S3Object_9D1020C1"
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

