# [api.test.w](../../../../../examples/tests/valid/api.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $counter, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(request) {
      const count = (await $counter.inc());
      const bodyResponse = ({"count": count});
      const resp = ({"body": ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(bodyResponse), "headers": ({["content-type"]: "application/json"}), "status": 200});
      return resp;
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $api_url }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const url = $api_url;
      $helpers.assert(url.startsWith("http"), "url.startsWith(\"http\")");
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_3_api_url }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const text = String.raw({ raw: ["", "/endpoint2"] }, $__parent_this_3_api_url);
      return ({"status": 200, "body": text});
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map
```

## inflight.A-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class A {
    constructor({  }) {
    }
  }
  return A;
}
//# sourceMappingURL=inflight.A-1.cjs.map
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
            "A": {
              "Api": {
                "Endpoint": {
                  "Url": "A_Api_Endpoint_Url_37336ACA"
                }
              }
            },
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
    "A_Api_Endpoint_Url_37336ACA": {
      "value": "https://${aws_api_gateway_rest_api.A_Api_api_06466CBC.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.A_Api_api_stage_75CEFF9A.stage_name}"
    },
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
      "A_Api_api_deployment_7EBFB334": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/Api/api/deployment",
            "uniqueId": "A_Api_api_deployment_7EBFB334"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.A_Api_api_06466CBC.id}",
        "triggers": {
          "redeployment": "${sha256(aws_api_gateway_rest_api.A_Api_api_06466CBC.body)}"
        }
      },
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
      "A_Api_api_06466CBC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/Api/api/api",
            "uniqueId": "A_Api_api_06466CBC"
          }
        },
        "body": "{\"paths\":{\"/endpoint1\":{\"get\":{\"operationId\":\"get-endpoint1\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_endpoint10-c8e91512/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}},\"openapi\":\"3.0.3\"}",
        "lifecycle": {
          "create_before_destroy": true
        },
        "name": "api-c8c28c28"
      },
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
      "A_Api_api_stage_75CEFF9A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/Api/api/stage",
            "uniqueId": "A_Api_api_stage_75CEFF9A"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.A_Api_api_deployment_7EBFB334.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.A_Api_api_06466CBC.id}",
        "stage_name": "prod"
      },
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
      "A_Api_get_endpoint10_CloudwatchLogGroup_88A9F9FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/Api/get_endpoint10/CloudwatchLogGroup",
            "uniqueId": "A_Api_get_endpoint10_CloudwatchLogGroup_88A9F9FB"
          }
        },
        "name": "/aws/lambda/get_endpoint10-c8e91512",
        "retention_in_days": 30
      },
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
    "aws_dynamodb_table": {
      "Counter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Counter/Default",
            "uniqueId": "Counter"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-Counter-c824ef62"
      }
    },
    "aws_iam_role": {
      "A_Api_get_endpoint10_IamRole_656A5EFF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/Api/get_endpoint10/IamRole",
            "uniqueId": "A_Api_get_endpoint10_IamRole_656A5EFF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
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
      "A_Api_get_endpoint10_IamRolePolicy_CEEF8626": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/Api/get_endpoint10/IamRolePolicy",
            "uniqueId": "A_Api_get_endpoint10_IamRolePolicy_CEEF8626"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.A_Api_get_endpoint10_IamRole_656A5EFF.name}"
      },
      "Api_get_hello_world0_IamRolePolicy_EA874D77": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_hello_world0/IamRolePolicy",
            "uniqueId": "Api_get_hello_world0_IamRolePolicy_EA874D77"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Api_get_hello_world0_IamRole_BE6EA0B6.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "A_Api_get_endpoint10_IamRolePolicyAttachment_E367997D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/Api/get_endpoint10/IamRolePolicyAttachment",
            "uniqueId": "A_Api_get_endpoint10_IamRolePolicyAttachment_E367997D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.A_Api_get_endpoint10_IamRole_656A5EFF.name}"
      },
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
      "A_Api_get_endpoint10_5345135D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/Api/get_endpoint10/Default",
            "uniqueId": "A_Api_get_endpoint10_5345135D"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_endpoint10-c8e91512",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_HTTPS_TFTOKEN_TOKEN_34_EXECUTE_API_TFTOKEN_TOKEN_26_AMAZONAWS_COM_TFTOKEN_TOKEN_35": "${jsonencode(\"https://${aws_api_gateway_rest_api.A_Api_api_06466CBC.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.A_Api_api_stage_75CEFF9A.stage_name}\")}"
          }
        },
        "function_name": "get_endpoint10-c8e91512",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.A_Api_get_endpoint10_IamRole_656A5EFF.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.A_Api_get_endpoint10_S3Object_C3F8C059.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
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
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
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
      "A_Api_api_permission-GET-1454206f_98E9910C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/Api/api/permission-GET-1454206f",
            "uniqueId": "A_Api_api_permission-GET-1454206f_98E9910C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.A_Api_get_endpoint10_5345135D.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.A_Api_api_06466CBC.execution_arn}/*/GET/endpoint1",
        "statement_id": "AllowExecutionFromAPIGateway-GET-1454206f"
      },
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
      "A_Api_get_endpoint10_S3Object_C3F8C059": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/Api/get_endpoint10/S3Object",
            "uniqueId": "A_Api_get_endpoint10_S3Object_C3F8C059"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
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
            $counter: ${$stdlib.core.liftObject(counter)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
            [$stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"), ["stringify"]],
            [counter, ["inc"]],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"), []],
            [counter, []],
          ],
        });
      }
    }
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
            $api_url: ${$stdlib.core.liftObject(api.url)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType()};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [api.url, []],
          ],
          "$inflight_init": [
            [api.url, []],
          ],
        });
      }
    }
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.api = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Api", cloud.Api, this, "Api");
        const __parent_this_3 = this;
        class $Closure3 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.cjs")({
                $__parent_this_3_api_url: ${$stdlib.core.liftObject(__parent_this_3.api.url)},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure3Client = ${$Closure3._toInflightType()};
                const client = new $Closure3Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [__parent_this_3.api.url, []],
              ],
              "$inflight_init": [
                [__parent_this_3.api.url, []],
              ],
            });
          }
        }
        (this.api.get("/endpoint1", new $Closure3(this, "$Closure3")));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.A-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AClient = ${A._toInflightType()};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    const api = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Api", cloud.Api, this, "Api");
    const counter = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
    const handler = new $Closure1(this, "$Closure1");
    (api.get("/hello/world", handler));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:api url", new $Closure2(this, "$Closure2"));
    new A(this, "A");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "api.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'], classFactory: globalThis.$ClassFactory });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

