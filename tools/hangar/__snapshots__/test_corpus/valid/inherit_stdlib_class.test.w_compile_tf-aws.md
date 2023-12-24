# [inherit_stdlib_class.test.w](../../../../../examples/tests/valid/inherit_stdlib_class.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      return ({"status": 200});
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $api_url, $http_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.get(String.raw({ raw: ["", "/"] }, $api_url)));
      {((cond) => {if (!cond) throw new Error("assertion failed: response.status == 200")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(response.status,200)))};
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.AnApi-1.js
```js
"use strict";
module.exports = function({ $cloud_Api }) {
  class AnApi extends $cloud_Api {
    constructor({  }) {
      super({  });
    }
  }
  return AnApi;
}
//# sourceMappingURL=inflight.AnApi-1.js.map
```

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
          "Default": {
            "AnApi": {
              "Endpoint": {
                "Url": "AnApi_Endpoint_Url_A71EBCD8"
              }
            }
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
    "AnApi_Endpoint_Url_A71EBCD8": {
      "value": "https://${aws_api_gateway_rest_api.AnApi_api_99502955.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.AnApi_api_stage_1FA14C2C.stage_name}"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "AnApi_api_deployment_E6534C00": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnApi/api/deployment",
            "uniqueId": "AnApi_api_deployment_E6534C00"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.AnApi_api_99502955.id}",
        "triggers": {
          "redeployment": "${sha256(aws_api_gateway_rest_api.AnApi_api_99502955.body)}"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "AnApi_api_99502955": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnApi/api/api",
            "uniqueId": "AnApi_api_99502955"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/\":{\"get\":{\"operationId\":\"get\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.AnApi_get__0_2BCA8D68.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
        "lifecycle": {
          "create_before_destroy": true
        },
        "name": "api-c89cd213"
      }
    },
    "aws_api_gateway_stage": {
      "AnApi_api_stage_1FA14C2C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnApi/api/stage",
            "uniqueId": "AnApi_api_stage_1FA14C2C"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.AnApi_api_deployment_E6534C00.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.AnApi_api_99502955.id}",
        "stage_name": "prod"
      }
    },
    "aws_cloudwatch_log_group": {
      "AnApi_get__0_CloudwatchLogGroup_56E53562": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnApi/get__}0/CloudwatchLogGroup",
            "uniqueId": "AnApi_get__0_CloudwatchLogGroup_56E53562"
          }
        },
        "name": "/aws/lambda/get__-0-c8219157",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "AnApi_get__0_IamRole_504C11BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnApi/get__}0/IamRole",
            "uniqueId": "AnApi_get__0_IamRole_504C11BC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "AnApi_get__0_IamRolePolicy_C05FDE20": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnApi/get__}0/IamRolePolicy",
            "uniqueId": "AnApi_get__0_IamRolePolicy_C05FDE20"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.AnApi_get__0_IamRole_504C11BC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "AnApi_get__0_IamRolePolicyAttachment_C66993BE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnApi/get__}0/IamRolePolicyAttachment",
            "uniqueId": "AnApi_get__0_IamRolePolicyAttachment_C66993BE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.AnApi_get__0_IamRole_504C11BC.name}"
      }
    },
    "aws_lambda_function": {
      "AnApi_get__0_2BCA8D68": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnApi/get__}0/Default",
            "uniqueId": "AnApi_get__0_2BCA8D68"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get__-0-c8219157",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get__-0-c8219157",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.AnApi_get__0_IamRole_504C11BC.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.AnApi_get__0_S3Object_0A63DC57.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "AnApi_api_permission-GET-c2e3ffa8_05254FEB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnApi/api/permission-GET-c2e3ffa8",
            "uniqueId": "AnApi_api_permission-GET-c2e3ffa8_05254FEB"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.AnApi_get__0_2BCA8D68.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.AnApi_api_99502955.execution_arn}/*/GET/",
        "statement_id": "AllowExecutionFromAPIGateway-GET-c2e3ffa8"
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
      "AnApi_get__0_S3Object_0A63DC57": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnApi/get__}0/S3Object",
            "uniqueId": "AnApi_get__0_S3Object_0A63DC57"
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
const cloud = $stdlib.cloud;
const http = $stdlib.http;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class AnApi extends (this.node.root.typeForFqn("@winglang/sdk.cloud.Api") ?? cloud.Api) {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("./inflight.AnApi-1.js")({
            $cloud_Api: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(cloud.Api, "@winglang/sdk/cloud", "Api"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AnApiClient = ${AnApi._toInflightType(this)};
            const client = new AnApiClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure1-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure2-1.js")({
            $api_url: ${$stdlib.core.liftObject(api.url)},
            $http_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerOnLiftObject(api.url, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const api = new AnApi(this, "AnApi");
    (api.get("/", new $Closure1(this, "$Closure1")));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:can inherit std lib preflight class", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inherit_stdlib_class.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

