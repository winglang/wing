# [inference.test.w](../../../../../examples/tests/valid/inference.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(request) {
      return ({"body": request.body, "status": 200});
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
        "body": "{\"paths\":{\"/hello/world\":{\"get\":{\"operationId\":\"get-hello/world\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_hello_world0-c8808650/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}},\"openapi\":\"3.0.3\"}",
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
      "Api_get_hello_world0_CloudwatchLogGroup_6629DDA5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_hello_world0/CloudwatchLogGroup",
            "uniqueId": "Api_get_hello_world0_CloudwatchLogGroup_6629DDA5"
          }
        },
        "name": "/aws/lambda/get_hello_world0-c8808650",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Api_get_hello_world0_IamRole_BE6EA0B6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_hello_world0/IamRole",
            "uniqueId": "Api_get_hello_world0_IamRole_BE6EA0B6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Api_get_hello_world0_IamRolePolicy_EA874D77": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_hello_world0/IamRolePolicy",
            "uniqueId": "Api_get_hello_world0_IamRolePolicy_EA874D77"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_get_hello_world0_IamRole_BE6EA0B6.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Api_get_hello_world0_IamRolePolicyAttachment_E570C504": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_hello_world0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_hello_world0_IamRolePolicyAttachment_E570C504"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_hello_world0_IamRole_BE6EA0B6.name}"
      }
    },
    "aws_lambda_function": {
      "Api_get_hello_world0_56F26C26": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_hello_world0/Default",
            "uniqueId": "Api_get_hello_world0_56F26C26"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_hello_world0-c8808650",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_hello_world0-c8808650",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_hello_world0_IamRole_BE6EA0B6.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_hello_world0_S3Object_F6755FB0.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Api_api_permission-GET-ceca4943_731ED984": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-ceca4943",
            "uniqueId": "Api_api_permission-GET-ceca4943_731ED984"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_hello_world0_56F26C26.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/hello/world",
        "statement_id": "AllowExecutionFromAPIGateway-GET-ceca4943"
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
      "Api_get_hello_world0_S3Object_F6755FB0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_hello_world0/S3Object",
            "uniqueId": "Api_get_hello_world0_S3Object_F6755FB0"
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
const $macros = require("@winglang/sdk/lib/macros");
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
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
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
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
    const preflightClosure = ((nice) => {
      console.log(nice);
      return true;
    });
    const recursiveClosure = ((nice) => {
      if (false) {
        return (recursiveClosure(nice));
      }
    });
    (recursiveClosure(2));
    const emptyArray = [];
    const num_array = emptyArray;
    const emptyArray2 = [];
    const clonedArray2 = $macros.__Array_copyMut(false, emptyArray2, );
    $macros.__MutArray_push(false, clonedArray2, 1);
    $macros.__MutArray_push(false, clonedArray2, 2);
    $macros.__MutArray_push(false, clonedArray2, ($macros.__MutArray_at(false, clonedArray2, 0) + $macros.__MutArray_at(false, clonedArray2, 1)));
    $helpers.assert($helpers.eq($macros.__MutArray_at(false, clonedArray2, 2), 3), "clonedArray2.at(2) == 3");
    const emptySet = new Set([$macros.__MutArray_at(false, clonedArray2, 2)]);
    const clonedSet = $macros.__Set_copyMut(false, emptySet, );
    (clonedSet.add(4));
    const api = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Api", cloud.Api, this, "Api");
    const func = new $Closure1(this, "$Closure1");
    (api.get("/hello/world", func));
    const argReturn = ((n) => {
      return n;
    });
    const implicitReturn = (() => {
      return 1;
    });
    if (true) {
      const a = (argReturn(1));
      const b = (implicitReturn());
    }
    const returnsString = (() => {
      return "hi";
    });
    const shouldBeString = (returnsString());
    const stringArray = [shouldBeString];
    const closureWithUnwrapping = ((optionalString) => {
      {
        const $if_let_value = optionalString;
        if ($if_let_value != undefined) {
          const justString = $if_let_value;
          console.log(justString);
        }
      }
    });
    const takesOptionalClosure = ((fn) => {
    });
    (takesOptionalClosure(((a) => {
      return "";
    })));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inference.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

