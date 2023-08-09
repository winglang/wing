# [delete.w](../../../../../../examples/tests/sdk_tests/api/delete.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $api_DELETE }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      {((cond) => {if (!cond) throw new Error("assertion failed: req.method == api_DELETE")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(req.method,$api_DELETE)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.query?.get(\"all\") == \"true\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((req.query)["all"],"true")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.query?.get(\"page\") == \"6\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((req.query)["page"],"6")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.path == \"/path\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(req.path,"/path")))};
      return ({"status": 200,"body": (req.query)["page"]});
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $api_url, $http_DELETE, $http_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const url = String.raw({ raw: ["", "/path?all=true&page=6"] }, $api_url);
      const response = (await $http_Util.delete(url));
      const fetchResponse = (await $http_Util.fetch(url,{ method: $http_DELETE }));
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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "data": {
    "aws_region": {
      "undefined_Region_1B664D6B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Region",
            "uniqueId": "undefined_Region_1B664D6B"
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
      "undefined_cloudApi_api_deployment_CC787C1B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/api/deployment",
            "uniqueId": "undefined_cloudApi_api_deployment_CC787C1B"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.undefined_cloudApi_api_3000E149.id}",
        "triggers": {
          "redeployment": "841e88388b5ba75d968430f607ebeffd3f39668c"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "undefined_cloudApi_api_3000E149": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/api/api",
            "uniqueId": "undefined_cloudApi_api_3000E149"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path\":{\"delete\":{\"operationId\":\"delete-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.undefined_Region_1B664D6B.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.undefined_cloudApi_cloudApi-OnRequest-83b2983f_3EFB36ED.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
        "name": "api-c8c76c9d"
      }
    },
    "aws_api_gateway_stage": {
      "undefined_cloudApi_api_stage_A2D24536": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/api/stage",
            "uniqueId": "undefined_cloudApi_api_stage_A2D24536"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.undefined_cloudApi_api_deployment_CC787C1B.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.undefined_cloudApi_api_3000E149.id}",
        "stage_name": "prod"
      }
    },
    "aws_iam_role": {
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/IamRole",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRolePolicy_2E3DCD14": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/IamRolePolicy",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRolePolicy_2E3DCD14"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRolePolicyAttachment_66336CBE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRolePolicyAttachment_66336CBE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_3EFB36ED": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/Default",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_3EFB36ED"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-83b2983f-c853749c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-83b2983f-c853749c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudApi_cloudApi-OnRequest-83b2983f_S3Object_647788A1.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "undefined_cloudApi_api_permission-DELETE-e2131352_30DBCE82": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/api/permission-DELETE-e2131352",
            "uniqueId": "undefined_cloudApi_api_permission-DELETE-e2131352_30DBCE82"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_cloudApi_cloudApi-OnRequest-83b2983f_3EFB36ED.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.undefined_cloudApi_api_3000E149.execution_arn}/*/DELETE/path",
        "statement_id": "AllowExecutionFromAPIGateway-DELETE-e2131352"
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      }
    },
    "aws_s3_object": {
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_S3Object_647788A1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/S3Object",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_S3Object_647788A1"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $api_DELETE: ${context._lift(api_DELETE)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this).text};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(api_DELETE, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const http_DELETE = http.HttpMethod.DELETE;
    const api_DELETE = cloud.HttpMethod.DELETE;
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    (api.delete("/path",new $Closure1(this,"$Closure1")));
    if (((util.Util.env("WING_TARGET")) !== "tf-aws")) {
      class $Closure2 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this._addInflightOps("handle", "$inflight_init");
          this.display.hidden = true;
        }
        static _toInflightType(context) {
          return $stdlib.core.NodeJsCode.fromInline(`
            require("./inflight.$Closure2.js")({
              $api_url: ${context._lift(api.url)},
              $http_DELETE: ${context._lift(http_DELETE)},
              $http_Util: ${context._lift(http.Util)},
            })
          `);
        }
        _toInflight() {
          return $stdlib.core.NodeJsCode.fromInline(`
            (await (async () => {
              const $Closure2Client = ${$Closure2._toInflightType(this).text};
              const client = new $Closure2Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `);
        }
        _registerBind(host, ops) {
          if (ops.includes("handle")) {
            $Closure2._registerBindObject(api.url, host, []);
            $Closure2._registerBindObject(http_DELETE, host, []);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:http.delete and http.fetch can preform a call to an api",new $Closure2(this,"$Closure2"));
    }
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "delete", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

