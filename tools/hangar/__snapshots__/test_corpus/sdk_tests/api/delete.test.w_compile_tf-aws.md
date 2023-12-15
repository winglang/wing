# [delete.test.w](../../../../../../examples/tests/sdk_tests/api/delete.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $cloud_HttpMethod }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      {((cond) => {if (!cond) throw new Error("assertion failed: req.method == cloud.HttpMethod.DELETE")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(req.method,$cloud_HttpMethod.DELETE)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.query?.get(\"all\") == \"true\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.query, "all"),"true")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.query?.get(\"page\") == \"6\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.query, "page"),"6")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.path == \"/path\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(req.path,"/path")))};
      return ({"status": 200, "body": ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.query, "page")});
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $api_url, $http_HttpMethod, $http_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const url = String.raw({ raw: ["", "/path?all=true&page=6"] }, $api_url);
      const response = (await $http_Util.delete(url));
      const fetchResponse = (await $http_Util.fetch(url, { method: $http_HttpMethod.DELETE }));
      {((cond) => {if (!cond) throw new Error("assertion failed: response.body == \"6\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(response.body,"6")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: response.status == 200")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(response.status,200)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: response.url == url")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(response.url,url)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.body == \"6\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(fetchResponse.body,"6")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.status == 200")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(fetchResponse.status,200)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.url == url")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(fetchResponse.url,url)))};
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
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
    "outputs": {}
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path\":{\"delete\":{\"operationId\":\"delete-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_delete_path_0_6CBBB14F.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "cloudApi_delete_path_0_CloudwatchLogGroup_28D9E083": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/delete_path_}0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_delete_path_0_CloudwatchLogGroup_28D9E083"
          }
        },
        "name": "/aws/lambda/delete_path_-0-c84317aa",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_delete_path_0_IamRole_57DD3D4B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/delete_path_}0/IamRole",
            "uniqueId": "cloudApi_delete_path_0_IamRole_57DD3D4B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_delete_path_0_IamRolePolicy_9A98C64F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/delete_path_}0/IamRolePolicy",
            "uniqueId": "cloudApi_delete_path_0_IamRolePolicy_9A98C64F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_delete_path_0_IamRole_57DD3D4B.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_delete_path_0_IamRolePolicyAttachment_8D62B363": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/delete_path_}0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_delete_path_0_IamRolePolicyAttachment_8D62B363"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_delete_path_0_IamRole_57DD3D4B.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_delete_path_0_6CBBB14F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/delete_path_}0/Default",
            "uniqueId": "cloudApi_delete_path_0_6CBBB14F"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "delete_path_-0-c84317aa",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "delete_path_-0-c84317aa",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_delete_path_0_IamRole_57DD3D4B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_delete_path_0_S3Object_9EDC1684.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-DELETE-e2131352_FCB789AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-DELETE-e2131352",
            "uniqueId": "cloudApi_api_permission-DELETE-e2131352_FCB789AC"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_delete_path_0_6CBBB14F.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/DELETE/path",
        "statement_id": "AllowExecutionFromAPIGateway-DELETE-e2131352"
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
      "cloudApi_delete_path_0_S3Object_9EDC1684": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/delete_path_}0/S3Object",
            "uniqueId": "cloudApi_delete_path_0_S3Object_9EDC1684"
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
const cloud = $stdlib.cloud;
const http = $stdlib.http;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure1-1.cjs")({
            $cloud_HttpMethod: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(cloud.HttpMethod, "@winglang/sdk/cloud", "HttpMethod"))},
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
          require("././inflight.$Closure2-1.cjs")({
            $api_url: ${$stdlib.core.liftObject(api.url)},
            $http_HttpMethod: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.HttpMethod, "@winglang/sdk/http", "HttpMethod"))},
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
    const api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "cloud.Api");
    (api.delete("/path", new $Closure1(this, "$Closure1")));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:http.delete and http.fetch can preform a call to an api", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "delete.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

