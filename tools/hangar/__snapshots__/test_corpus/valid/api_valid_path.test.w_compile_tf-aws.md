# [api_valid_path.test.w](../../../../../examples/tests/valid/api_valid_path.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"body": "ok", "status": 200});
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

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
            "api for root path": {
              "Endpoint": {
                "Url": "apiforrootpath_Endpoint_Url_A5988D30"
              }
            },
            "default api": {
              "Endpoint": {
                "Url": "defaultapi_Endpoint_Url_20F55364"
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
    "apiforrootpath_Endpoint_Url_A5988D30": {
      "value": "https://${aws_api_gateway_rest_api.apiforrootpath_api_53DF977A.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.apiforrootpath_api_stage_C60BBF0F.stage_name}"
    },
    "defaultapi_Endpoint_Url_20F55364": {
      "value": "https://${aws_api_gateway_rest_api.defaultapi_D23C5D48.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.defaultapi_stage_839E3FD0.stage_name}"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "apiforrootpath_api_deployment_A1552CE9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api for root path/api/deployment",
            "uniqueId": "apiforrootpath_api_deployment_A1552CE9"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.apiforrootpath_api_53DF977A.id}",
        "triggers": {
          "redeployment": "${sha256(aws_api_gateway_rest_api.apiforrootpath_api_53DF977A.body)}"
        }
      },
      "defaultapi_deployment_2421A004": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/deployment",
            "uniqueId": "defaultapi_deployment_2421A004"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.id}",
        "triggers": {
          "redeployment": "${sha256(aws_api_gateway_rest_api.defaultapi_D23C5D48.body)}"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "apiforrootpath_api_53DF977A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api for root path/api/api",
            "uniqueId": "apiforrootpath_api_53DF977A"
          }
        },
        "body": "{\"paths\":{\"/\":{\"get\":{\"operationId\":\"get\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_0-c856f001/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}},\"openapi\":\"3.0.3\"}",
        "lifecycle": {
          "create_before_destroy": true
        },
        "name": "api-c8d24ab6"
      },
      "defaultapi_D23C5D48": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/api",
            "uniqueId": "defaultapi_D23C5D48"
          }
        },
        "body": "{\"paths\":{\"/test/path\":{\"get\":{\"operationId\":\"get-test/path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8261424/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/alphanumer1cPa_th\":{\"get\":{\"operationId\":\"get-test/alphanumer1cPa_th\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8261424/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/regular/path\":{\"get\":{\"operationId\":\"get-test/regular/path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8261424/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/pa-th/{with}/two/{variable_s}/f?bla=5&b=6\":{\"get\":{\"operationId\":\"get-test/pa-th/:with/two/:variable_s/f?bla=5&b=6\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"with\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"name\":\"variable_s\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8261424/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/param/is/{last}\":{\"get\":{\"operationId\":\"get-test/param/is/:last\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"last\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8261424/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/path/{param}\":{\"get\":{\"operationId\":\"get-test/path/:param\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"param\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8261424/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{param}\":{\"get\":{\"operationId\":\"get-:param\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"param\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8261424/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/t/{param}\":{\"get\":{\"operationId\":\"get-t/:param\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"param\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8261424/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/regular/path/{param}\":{\"get\":{\"operationId\":\"get-test/regular/path/:param\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"param\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8261424/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/segment1/{param1}/segment2?query1=value1?query2=value2\":{\"get\":{\"operationId\":\"get-test/segment1/:param1/segment2?query1=value1?query2=value2\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"param1\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8261424/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/segment1/segment2?query=value1&query2=value2\":{\"get\":{\"operationId\":\"get-test/segment1/segment2?query=value1&query2=value2\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8261424/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/path.withDots\":{\"get\":{\"operationId\":\"get-test/path.withDots\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8261424/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/path/.withDots/{param}/{param-dash}/x\":{\"get\":{\"operationId\":\"get-test/path/.withDots/:param/:param-dash/x\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"param\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"name\":\"param-dash\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8261424/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{param}/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}},\"openapi\":\"3.0.3\"}",
        "lifecycle": {
          "create_before_destroy": true
        },
        "name": "api-c80ca82f"
      }
    },
    "aws_api_gateway_stage": {
      "apiforrootpath_api_stage_C60BBF0F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api for root path/api/stage",
            "uniqueId": "apiforrootpath_api_stage_C60BBF0F"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.apiforrootpath_api_deployment_A1552CE9.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.apiforrootpath_api_53DF977A.id}",
        "stage_name": "prod"
      },
      "defaultapi_stage_839E3FD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/stage",
            "uniqueId": "defaultapi_stage_839E3FD0"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.defaultapi_deployment_2421A004.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.id}",
        "stage_name": "prod"
      }
    },
    "aws_cloudwatch_log_group": {
      "apiforrootpath_get_0_CloudwatchLogGroup_13F2460E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api for root path/get_0/CloudwatchLogGroup",
            "uniqueId": "apiforrootpath_get_0_CloudwatchLogGroup_13F2460E"
          }
        },
        "name": "/aws/lambda/get_0-c856f001",
        "retention_in_days": 30
      },
      "defaultapi_get_test_path0_CloudwatchLogGroup_671C6A53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/get_test_path0/CloudwatchLogGroup",
            "uniqueId": "defaultapi_get_test_path0_CloudwatchLogGroup_671C6A53"
          }
        },
        "name": "/aws/lambda/get_test_path0-c8261424",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "apiforrootpath_get_0_IamRole_D4539E0B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api for root path/get_0/IamRole",
            "uniqueId": "apiforrootpath_get_0_IamRole_D4539E0B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "defaultapi_get_test_path0_IamRole_6EABF872": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/get_test_path0/IamRole",
            "uniqueId": "defaultapi_get_test_path0_IamRole_6EABF872"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "apiforrootpath_get_0_IamRolePolicy_505D6447": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api for root path/get_0/IamRolePolicy",
            "uniqueId": "apiforrootpath_get_0_IamRolePolicy_505D6447"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.apiforrootpath_get_0_IamRole_D4539E0B.name}"
      },
      "defaultapi_get_test_path0_IamRolePolicy_56E9A36F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/get_test_path0/IamRolePolicy",
            "uniqueId": "defaultapi_get_test_path0_IamRolePolicy_56E9A36F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.defaultapi_get_test_path0_IamRole_6EABF872.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "apiforrootpath_get_0_IamRolePolicyAttachment_B829E8A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api for root path/get_0/IamRolePolicyAttachment",
            "uniqueId": "apiforrootpath_get_0_IamRolePolicyAttachment_B829E8A4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.apiforrootpath_get_0_IamRole_D4539E0B.name}"
      },
      "defaultapi_get_test_path0_IamRolePolicyAttachment_CB835A8E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/get_test_path0/IamRolePolicyAttachment",
            "uniqueId": "defaultapi_get_test_path0_IamRolePolicyAttachment_CB835A8E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.defaultapi_get_test_path0_IamRole_6EABF872.name}"
      }
    },
    "aws_lambda_function": {
      "apiforrootpath_get_0_057FC713": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api for root path/get_0/Default",
            "uniqueId": "apiforrootpath_get_0_057FC713"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_0-c856f001",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_0-c856f001",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.apiforrootpath_get_0_IamRole_D4539E0B.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.apiforrootpath_get_0_S3Object_426DA1A7.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "defaultapi_get_test_path0_B7A07AB2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/get_test_path0/Default",
            "uniqueId": "defaultapi_get_test_path0_B7A07AB2"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_test_path0-c8261424",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_test_path0-c8261424",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.defaultapi_get_test_path0_IamRole_6EABF872.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.defaultapi_get_test_path0_S3Object_B2DEDF01.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "apiforrootpath_api_permission-GET-c2e3ffa8_13544034": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api for root path/api/permission-GET-c2e3ffa8",
            "uniqueId": "apiforrootpath_api_permission-GET-c2e3ffa8_13544034"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.apiforrootpath_get_0_057FC713.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.apiforrootpath_api_53DF977A.execution_arn}/*/GET/",
        "statement_id": "AllowExecutionFromAPIGateway-GET-c2e3ffa8"
      },
      "defaultapi_permission-GET-07205281_663F50CE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/permission-GET-07205281",
            "uniqueId": "defaultapi_permission-GET-07205281_663F50CE"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.defaultapi_get_test_path0_B7A07AB2.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.execution_arn}/*/GET/t/{param}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-07205281"
      },
      "defaultapi_permission-GET-16d10b32_22F0CCAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/permission-GET-16d10b32",
            "uniqueId": "defaultapi_permission-GET-16d10b32_22F0CCAD"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.defaultapi_get_test_path0_B7A07AB2.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.execution_arn}/*/GET/test/path/.withDots/{param}/{param-dash}/x",
        "statement_id": "AllowExecutionFromAPIGateway-GET-16d10b32"
      },
      "defaultapi_permission-GET-1dad4331_915FA0B1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/permission-GET-1dad4331",
            "uniqueId": "defaultapi_permission-GET-1dad4331_915FA0B1"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.defaultapi_get_test_path0_B7A07AB2.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.execution_arn}/*/GET/{param}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-1dad4331"
      },
      "defaultapi_permission-GET-4835e6c5_6396A6A0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/permission-GET-4835e6c5",
            "uniqueId": "defaultapi_permission-GET-4835e6c5_6396A6A0"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.defaultapi_get_test_path0_B7A07AB2.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.execution_arn}/*/GET/test/path/{param}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-4835e6c5"
      },
      "defaultapi_permission-GET-525feabe_7C43C625": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/permission-GET-525feabe",
            "uniqueId": "defaultapi_permission-GET-525feabe_7C43C625"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.defaultapi_get_test_path0_B7A07AB2.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.execution_arn}/*/GET/test/param/is/{last}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-525feabe"
      },
      "defaultapi_permission-GET-815194c4_428713F1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/permission-GET-815194c4",
            "uniqueId": "defaultapi_permission-GET-815194c4_428713F1"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.defaultapi_get_test_path0_B7A07AB2.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.execution_arn}/*/GET/test/pa-th/{with}/two/{variable_s}/f?bla=5&b=6",
        "statement_id": "AllowExecutionFromAPIGateway-GET-815194c4"
      },
      "defaultapi_permission-GET-83a11f17_64B234AF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/permission-GET-83a11f17",
            "uniqueId": "defaultapi_permission-GET-83a11f17_64B234AF"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.defaultapi_get_test_path0_B7A07AB2.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.execution_arn}/*/GET/test/path",
        "statement_id": "AllowExecutionFromAPIGateway-GET-83a11f17"
      },
      "defaultapi_permission-GET-8d6a8a39_2877CE15": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/permission-GET-8d6a8a39",
            "uniqueId": "defaultapi_permission-GET-8d6a8a39_2877CE15"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.defaultapi_get_test_path0_B7A07AB2.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.execution_arn}/*/GET/test/regular/path",
        "statement_id": "AllowExecutionFromAPIGateway-GET-8d6a8a39"
      },
      "defaultapi_permission-GET-8dfdf611_AE7542CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/permission-GET-8dfdf611",
            "uniqueId": "defaultapi_permission-GET-8dfdf611_AE7542CB"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.defaultapi_get_test_path0_B7A07AB2.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.execution_arn}/*/GET/test/alphanumer1cPa_th",
        "statement_id": "AllowExecutionFromAPIGateway-GET-8dfdf611"
      },
      "defaultapi_permission-GET-b171b58d_067C9334": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/permission-GET-b171b58d",
            "uniqueId": "defaultapi_permission-GET-b171b58d_067C9334"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.defaultapi_get_test_path0_B7A07AB2.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.execution_arn}/*/GET/test/segment1/segment2?query=value1&query2=value2",
        "statement_id": "AllowExecutionFromAPIGateway-GET-b171b58d"
      },
      "defaultapi_permission-GET-d0938f9f_6A7F8B88": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/permission-GET-d0938f9f",
            "uniqueId": "defaultapi_permission-GET-d0938f9f_6A7F8B88"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.defaultapi_get_test_path0_B7A07AB2.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.execution_arn}/*/GET/test/regular/path/{param}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-d0938f9f"
      },
      "defaultapi_permission-GET-ecbc2deb_62CFBA33": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/permission-GET-ecbc2deb",
            "uniqueId": "defaultapi_permission-GET-ecbc2deb_62CFBA33"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.defaultapi_get_test_path0_B7A07AB2.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.execution_arn}/*/GET/test/segment1/{param1}/segment2?query1=value1?query2=value2",
        "statement_id": "AllowExecutionFromAPIGateway-GET-ecbc2deb"
      },
      "defaultapi_permission-GET-f2bb7c42_8625FCC2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/api/permission-GET-f2bb7c42",
            "uniqueId": "defaultapi_permission-GET-f2bb7c42_8625FCC2"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.defaultapi_get_test_path0_B7A07AB2.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.defaultapi_D23C5D48.execution_arn}/*/GET/test/path.withDots",
        "statement_id": "AllowExecutionFromAPIGateway-GET-f2bb7c42"
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
      "apiforrootpath_get_0_S3Object_426DA1A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api for root path/get_0/S3Object",
            "uniqueId": "apiforrootpath_get_0_S3Object_426DA1A7"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "defaultapi_get_test_path0_S3Object_B2DEDF01": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/default api/get_test_path0/S3Object",
            "uniqueId": "defaultapi_get_test_path0_S3Object_B2DEDF01"
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

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
if (globalThis.$ClassFactory !== undefined) { throw new Error("$ClassFactory already defined"); }
globalThis.$ClassFactory = $PlatformManager.createClassFactory();
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    const expect = $stdlib.expect;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType()};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    const api = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Api", cloud.Api, this, "default api");
    const handler = new $Closure1(this, "$Closure1");
    const testInvalidPath = ((path, apiInstance) => {
      let error = "";
      const expected = String.raw({ raw: ["Invalid path ", ". Url parts can only contain alpha-numeric chars, \"-\", \"_\" and \".\". Params can only contain alpha-numeric chars and \"_\"."] }, path);
      try {
        ((apiInstance ?? api).get(path, handler));
      }
      catch ($error_e) {
        const e = $error_e.message;
        error = e;
      }
      (expect.Util.equal(error, expected));
    });
    const testValidPath = ((path, apiInstance) => {
      let error = "";
      try {
        ((apiInstance ?? api).get(path, handler));
      }
      catch ($error_e) {
        const e = $error_e.message;
        error = e;
      }
      (expect.Util.equal(error, ""));
    });
    (testInvalidPath("/test/:sup{er/:annoying//path"));
    (testInvalidPath("/test/{::another:annoying:path}"));
    (testInvalidPath("/test/n0t_alphanumer1cPa*th"));
    (testInvalidPath("/test/path/:with/:two{invali4d#/variables"));
    (testInvalidPath("/test/path/:/empty"));
    (testInvalidPath("/test/m:issplaced"));
    (testInvalidPath("/test/misspla:/ced"));
    (testInvalidPath("/:sup{er/{annoying//path}"));
    (testInvalidPath("/:^^another^annoying^path"));
    (testInvalidPath("/n0t_alphanumer1cPa{th"));
    (testInvalidPath("/:with/:two}invali4d#/variables"));
    (testInvalidPath("/m:issplaced"));
    (testInvalidPath("/missplaced:"));
    (testInvalidPath("test"));
    (testInvalidPath("/:/empty"));
    (testInvalidPath("/:"));
    (testInvalidPath("/:no.dots.here"));
    (testValidPath("/test/path"));
    (testValidPath("/test/alphanumer1cPa_th"));
    (testValidPath("/test/regular/path"));
    (testValidPath("/test/pa-th/:with/two/:variable_s/f?bla=5&b=6"));
    (testValidPath("/test/param/is/:last"));
    (testValidPath("/test/path/:param"));
    (testValidPath("/:param"));
    (testValidPath("/t/:param"));
    (testValidPath("/test/regular/path/:param"));
    (testValidPath("/test/segment1/:param1/segment2?query1=value1?query2=value2"));
    (testValidPath("/test/segment1/segment2?query=value1&query2=value2"));
    (testValidPath("/test/path.withDots"));
    (testValidPath("/test/path/.withDots/:param/:param-dash/x"));
    (testValidPath("/", globalThis.$ClassFactory.new("@winglang/sdk.cloud.Api", cloud.Api, this, "api for root path")));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "api_valid_path.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'], classFactory: globalThis.$ClassFactory });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

