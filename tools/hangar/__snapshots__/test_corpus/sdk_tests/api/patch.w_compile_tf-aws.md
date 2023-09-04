# [patch.w](../../../../../../examples/tests/sdk_tests/api/patch.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $_id, $body, $cloud_HttpMethod, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      {((cond) => {if (!cond) throw new Error("assertion failed: req.method == cloud.HttpMethod.PATCH")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(req.method,$cloud_HttpMethod.PATCH)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.vars?.get(\"id\") == _id")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((req.vars)["id"],$_id)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.path == \"/path/\"+ _id")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(req.path,("/path/" + $_id))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.body == Json.stringify(body)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(req.body,((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([$body]))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.headers?.get(\"content-type\") == \"application/json\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((req.headers)["content-type"],"application/json")))};
      return ({"status": 200,"body": (req.vars)["id"]});
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $_id, $api_url, $body, $http_HttpMethod, $http_Util, $std_Json }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const url = String.raw({ raw: ["", "/path/", ""] }, $api_url, $_id);
      const response = (await $http_Util.patch(url,{ headers: ({"content-type": "application/json"}), body: ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([$body]) }));
      const fetchResponse = (await $http_Util.patch(url,{ method: $http_HttpMethod.PATCH, headers: ({"content-type": "application/json"}), body: ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([$body]) }));
      {((cond) => {if (!cond) throw new Error("assertion failed: response.body == _id")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(response.body,$_id)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: response.status == 200")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(response.status,200)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: response.url == url")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(response.url,url)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.body == _id")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(fetchResponse.body,$_id)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.status == 200")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(fetchResponse.status,200)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.url == url")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(fetchResponse.url,url)))};
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
      "value": "[[\"root/Default/Default/test:http.patch and http.fetch can preform a call to an api\",\"${aws_lambda_function.testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_185CBA02.arn}\"]]"
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path/{id}\":{\"patch\":{\"operationId\":\"patch-path/{id}\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"id\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"consumes\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404}\"},\"responses\":{\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode: 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      },
      "testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_IamRole_C2F43DF0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.patch and http.fetch can preform a call to an api/Handler/IamRole",
            "uniqueId": "testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_IamRole_C2F43DF0"
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
      },
      "testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicy_6D4DBF6C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.patch and http.fetch can preform a call to an api/Handler/IamRolePolicy",
            "uniqueId": "testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicy_6D4DBF6C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_IamRole_C2F43DF0.name}"
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
      },
      "testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicyAttachment_FDA4E9BA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.patch and http.fetch can preform a call to an api/Handler/IamRolePolicyAttachment",
            "uniqueId": "testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicyAttachment_FDA4E9BA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_IamRole_C2F43DF0.name}"
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
      },
      "testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_185CBA02": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.patch and http.fetch can preform a call to an api/Handler/Default",
            "uniqueId": "testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_185CBA02"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c89df580",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_8": "${jsonencode(aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url)}"
          }
        },
        "function_name": "Handler-c89df580",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_IamRole_C2F43DF0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_S3Object_2CE72DAC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-PATCH-4d67c9d8_BC5EF557": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-PATCH-4d67c9d8",
            "uniqueId": "cloudApi_api_permission-PATCH-4d67c9d8_BC5EF557"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/PATCH/path/{id}",
        "statement_id": "AllowExecutionFromAPIGateway-PATCH-4d67c9d8"
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
      },
      "testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_S3Object_2CE72DAC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.patch and http.fetch can preform a call to an api/Handler/S3Object",
            "uniqueId": "testhttppatchandhttpfetchcanpreformacalltoanapi_Handler_S3Object_2CE72DAC"
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
            $_id: ${context._lift(_id)},
            $body: ${context._lift(body)},
            $cloud_HttpMethod: ${context._lift(cloud.HttpMethod)},
            $std_Json: ${context._lift(std.Json)},
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
          $Closure1._registerBindObject(_id, host, []);
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
            $_id: ${context._lift(_id)},
            $api_url: ${context._lift(api.url)},
            $body: ${context._lift(body)},
            $http_HttpMethod: ${context._lift(http.HttpMethod)},
            $http_Util: ${context._lift(http.Util)},
            $std_Json: ${context._lift(std.Json)},
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
          $Closure2._registerBindObject(_id, host, []);
          $Closure2._registerBindObject(api.url, host, []);
          $Closure2._registerBindObject(body, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const body = ({"cat": "Tion"});
    const _id = "12345";
    (api.patch("/path/{id}",new $Closure1(this,"$Closure1")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:http.patch and http.fetch can preform a call to an api",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "patch", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

