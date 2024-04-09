# [api_valid_path.test.w](../../../../../examples/tests/valid/api_valid_path.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
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
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

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
        "body": "{\"paths\":{\"/test/path\":{\"get\":{\"operationId\":\"get-test/path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8bdb226/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/alphanumer1cPa_th\":{\"get\":{\"operationId\":\"get-test/alphanumer1cPa_th\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8bdb226/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/regular/path\":{\"get\":{\"operationId\":\"get-test/regular/path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8bdb226/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/pa-th/{with}/two/{variable_s}/f?bla=5&b=6\":{\"get\":{\"operationId\":\"get-test/pa-th/:with/two/:variable_s/f?bla=5&b=6\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"with\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"name\":\"variable_s\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8bdb226/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/param/is/{last}\":{\"get\":{\"operationId\":\"get-test/param/is/:last\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"last\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8bdb226/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/path/{param}\":{\"get\":{\"operationId\":\"get-test/path/:param\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"param\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8bdb226/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{param}\":{\"get\":{\"operationId\":\"get-:param\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"param\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8bdb226/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/t/{param}\":{\"get\":{\"operationId\":\"get-t/:param\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"param\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8bdb226/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/regular/path/{param}\":{\"get\":{\"operationId\":\"get-test/regular/path/:param\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"param\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8bdb226/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/segment1/{param1}/segment2?query1=value1?query2=value2\":{\"get\":{\"operationId\":\"get-test/segment1/:param1/segment2?query1=value1?query2=value2\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"param1\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8bdb226/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/segment1/segment2?query=value1&query2=value2\":{\"get\":{\"operationId\":\"get-test/segment1/segment2?query=value1&query2=value2\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8bdb226/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/path.withDots\":{\"get\":{\"operationId\":\"get-test/path.withDots\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8bdb226/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/path/.withDots/{param}/{param-dash}/x\":{\"get\":{\"operationId\":\"get-test/path/.withDots/:param/:param-dash/x\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"param\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"name\":\"param-dash\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_test_path0-c8bdb226/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}},\"openapi\":\"3.0.3\"}",
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
      "Api_get_test_path0_CloudwatchLogGroup_409E5E8A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_test_path0/CloudwatchLogGroup",
            "uniqueId": "Api_get_test_path0_CloudwatchLogGroup_409E5E8A"
          }
        },
        "name": "/aws/lambda/get_test_path0-c8bdb226",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Api_get_test_path0_IamRole_C41D1174": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_test_path0/IamRole",
            "uniqueId": "Api_get_test_path0_IamRole_C41D1174"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Api_get_test_path0_IamRolePolicy_871429E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_test_path0/IamRolePolicy",
            "uniqueId": "Api_get_test_path0_IamRolePolicy_871429E4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_get_test_path0_IamRole_C41D1174.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Api_get_test_path0_IamRolePolicyAttachment_E6813A4F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_test_path0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_test_path0_IamRolePolicyAttachment_E6813A4F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_test_path0_IamRole_C41D1174.name}"
      }
    },
    "aws_lambda_function": {
      "Api_get_test_path0_645426B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_test_path0/Default",
            "uniqueId": "Api_get_test_path0_645426B9"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_test_path0-c8bdb226",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_test_path0-c8bdb226",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_test_path0_IamRole_C41D1174.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_test_path0_S3Object_F8C2A41F.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Api_api_permission-GET-07205281_2EFE8EB1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-07205281",
            "uniqueId": "Api_api_permission-GET-07205281_2EFE8EB1"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_test_path0_645426B9.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/t/{param}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-07205281"
      },
      "Api_api_permission-GET-16d10b32_C81601CA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-16d10b32",
            "uniqueId": "Api_api_permission-GET-16d10b32_C81601CA"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_test_path0_645426B9.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/test/path/.withDots/{param}/{param-dash}/x",
        "statement_id": "AllowExecutionFromAPIGateway-GET-16d10b32"
      },
      "Api_api_permission-GET-1dad4331_32F54094": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-1dad4331",
            "uniqueId": "Api_api_permission-GET-1dad4331_32F54094"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_test_path0_645426B9.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/{param}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-1dad4331"
      },
      "Api_api_permission-GET-4835e6c5_6B499B93": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-4835e6c5",
            "uniqueId": "Api_api_permission-GET-4835e6c5_6B499B93"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_test_path0_645426B9.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/test/path/{param}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-4835e6c5"
      },
      "Api_api_permission-GET-525feabe_2C6C9790": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-525feabe",
            "uniqueId": "Api_api_permission-GET-525feabe_2C6C9790"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_test_path0_645426B9.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/test/param/is/{last}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-525feabe"
      },
      "Api_api_permission-GET-815194c4_25BC69FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-815194c4",
            "uniqueId": "Api_api_permission-GET-815194c4_25BC69FF"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_test_path0_645426B9.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/test/pa-th/{with}/two/{variable_s}/f?bla=5&b=6",
        "statement_id": "AllowExecutionFromAPIGateway-GET-815194c4"
      },
      "Api_api_permission-GET-83a11f17_56732227": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-83a11f17",
            "uniqueId": "Api_api_permission-GET-83a11f17_56732227"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_test_path0_645426B9.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/test/path",
        "statement_id": "AllowExecutionFromAPIGateway-GET-83a11f17"
      },
      "Api_api_permission-GET-8d6a8a39_19EE1671": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-8d6a8a39",
            "uniqueId": "Api_api_permission-GET-8d6a8a39_19EE1671"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_test_path0_645426B9.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/test/regular/path",
        "statement_id": "AllowExecutionFromAPIGateway-GET-8d6a8a39"
      },
      "Api_api_permission-GET-8dfdf611_2D4250A0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-8dfdf611",
            "uniqueId": "Api_api_permission-GET-8dfdf611_2D4250A0"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_test_path0_645426B9.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/test/alphanumer1cPa_th",
        "statement_id": "AllowExecutionFromAPIGateway-GET-8dfdf611"
      },
      "Api_api_permission-GET-b171b58d_9A7757E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-b171b58d",
            "uniqueId": "Api_api_permission-GET-b171b58d_9A7757E3"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_test_path0_645426B9.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/test/segment1/segment2?query=value1&query2=value2",
        "statement_id": "AllowExecutionFromAPIGateway-GET-b171b58d"
      },
      "Api_api_permission-GET-d0938f9f_157E2FB0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-d0938f9f",
            "uniqueId": "Api_api_permission-GET-d0938f9f_157E2FB0"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_test_path0_645426B9.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/test/regular/path/{param}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-d0938f9f"
      },
      "Api_api_permission-GET-ecbc2deb_702B770C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-ecbc2deb",
            "uniqueId": "Api_api_permission-GET-ecbc2deb_702B770C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_test_path0_645426B9.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/test/segment1/{param1}/segment2?query1=value1?query2=value2",
        "statement_id": "AllowExecutionFromAPIGateway-GET-ecbc2deb"
      },
      "Api_api_permission-GET-f2bb7c42_E8380F56": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-f2bb7c42",
            "uniqueId": "Api_api_permission-GET-f2bb7c42_E8380F56"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_test_path0_645426B9.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/test/path.withDots",
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
      "Api_get_test_path0_S3Object_F8C2A41F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_test_path0/S3Object",
            "uniqueId": "Api_get_test_path0_S3Object_F8C2A41F"
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

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
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
    const api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "Api");
    const handler = new $Closure1(this, "$Closure1");
    const testInvalidPath = ((path) => {
      let error = "";
      const expected = String.raw({ raw: ["Invalid path ", ". Url parts can only contain alpha-numeric chars, \"-\", \"_\" and \".\". Params can only contain alpha-numeric chars and \"_\"."] }, path);
      try {
        (api.get(path, handler));
      }
      catch ($error_e) {
        const e = $error_e.message;
        error = e;
      }
      $helpers.assert($helpers.eq(error, expected), "error == expected");
    });
    const testValidPath = ((path) => {
      let error = "";
      try {
        (api.get(path, handler));
      }
      catch ($error_e) {
        const e = $error_e.message;
        error = e;
      }
      $helpers.assert($helpers.eq(error, ""), "error == \"\"");
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
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "api_valid_path.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

