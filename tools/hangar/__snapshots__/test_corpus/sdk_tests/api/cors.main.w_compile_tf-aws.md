# [cors.main.w](../../../../../../examples/tests/sdk_tests/api/cors.main.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $body }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"status": 200,"body": $body});
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $api_url, $http_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const url = ($api_url + "/path");
      const response = (await $http_Util.get(url));
      {((cond) => {if (!cond) throw new Error("assertion failed: response.headers.get(\"access-control-allow-origin\") == \"*\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((response.headers)["access-control-allow-origin"],"*")))};
    }
  }
  return $Closure2;
}

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
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
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
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path\":{\"get\":{\"operationId\":\"get-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{},\"headers\":{\"Access-Control-Allow-Origin\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Allow-Methods\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Allow-Headers\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Max-Age\":{\"schema\":{\"type\":\"string\"}}}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                #if ($context.httpMethod == \\\"OPTIONS\\\")\\n                    {\\\"statusCode\\\": 204}\\n                #else\\n                    {\\\"statusCode\\\": 404}\\n                #end\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"204\":{\"statusCode\":\"204\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\",\"method.response.header.Access-Control-Allow-Origin\":\"'*'\",\"method.response.header.Access-Control-Allow-Methods\":\"'GET,POST,PUT,DELETE,HEAD,OPTIONS'\",\"method.response.header.Access-Control-Allow-Headers\":\"'Content-Type,Authorization,X-Requested-With'\"},\"responseTemplates\":{\"application/json\":\"{}\"}},\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"204\":{\"description\":\"204 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"},\"Access-Control-Allow-Origin\":{\"type\":\"string\"},\"Access-Control-Allow-Methods\":{\"type\":\"string\"},\"Access-Control-Allow-Headers\":{\"type\":\"string\"}}},\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
    "aws_iam_role": {
      "cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRole",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_cloudApi-OnRequest-cdafee6e_IamRolePolicy_8BF9C89F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRolePolicy",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_IamRolePolicy_8BF9C89F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_cloudApi-OnRequest-cdafee6e_IamRolePolicyAttachment_5383D6A2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_IamRolePolicyAttachment_5383D6A2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/Default",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-cdafee6e-c8147384",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-cdafee6e-c8147384",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_cloudApi-OnRequest-cdafee6e_S3Object_5DAAA0EF.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-GET-e2131352_3FDDE199": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-e2131352",
            "uniqueId": "cloudApi_api_permission-GET-e2131352_3FDDE199"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/path",
        "statement_id": "AllowExecutionFromAPIGateway-GET-e2131352"
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
      "cloudApi_cloudApi-OnRequest-cdafee6e_S3Object_5DAAA0EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/S3Object",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_S3Object_5DAAA0EF"
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
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const http = $stdlib.http;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $body: ${context._lift(body)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(body, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $api_url: ${context._lift(api.url)},
            $http_Util: ${context._lift($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(api.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api",({"cors": true}));
    const body = "ok!";
    (api.get("/path",new $Closure1(this,"$Closure1")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:http.get and http.fetch can preform a call to an api",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "cors.main", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

