# [put.w](../../../../../../examples/tests/sdk_tests/api/put.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ _id, user, api_PUT, body, std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(req)  {
      const path = String.raw({ raw: ["/path/", "/nn/", ""] }, _id, user);
      {((cond) => {if (!cond) throw new Error("assertion failed: req.method == api_PUT")})((req.method === api_PUT))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.vars?.get(\"id\") == _id")})(((req.vars)["id"] === _id))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.vars?.get(\"user\") == user")})(((req.vars)["user"] === user))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.path == path")})((req.path === path))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.body == Json.stringify(body)")})((req.body === ((args) => { return JSON.stringify(args[0], null, args[1]) })([body])))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.headers?.get(\"content-type\") == \"application/json\"")})(((req.headers)["content-type"] === "application/json"))};
      return {
      "status": 200,
      "body": (req.vars)["id"],}
      ;
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ api, _id, user, body, http_PUT, http_Util, std_Json }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const url = String.raw({ raw: ["", "/path/", "/nn/", ""] }, api.url, _id, user);
      const response = (await http_Util.put(url,{
      "headers": Object.freeze({"content-type":"application/json"}),
      "body": ((args) => { return JSON.stringify(args[0], null, args[1]) })([body]),}
      ));
      const fetchResponse = (await http_Util.put(url,{
      "method": http_PUT,
      "headers": Object.freeze({"content-type":"application/json"}),
      "body": ((args) => { return JSON.stringify(args[0], null, args[1]) })([body]),}
      ));
      {((cond) => {if (!cond) throw new Error("assertion failed: response.body == _id")})((response.body === _id))};
      {((cond) => {if (!cond) throw new Error("assertion failed: response.status == 200")})((response.status === 200))};
      {((cond) => {if (!cond) throw new Error("assertion failed: response.url == url")})((response.url === url))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.body == _id")})((fetchResponse.body === _id))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.status == 200")})((fetchResponse.status === 200))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.url == url")})((fetchResponse.url === url))};
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
      "value": "[[\"root/Default/Default/test:http.put and http.fetch can preform a call to an api\",\"${aws_lambda_function.testhttpputandhttpfetchcanpreformacalltoanapi_Handler_2B7157C1.arn}\"]]"
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
          "redeployment": "a67fe6988218a80a1321d2cf04424fe744273dd4"
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path/{id}/nn/{user}\":{\"put\":{\"operationId\":\"put-path/{id}/nn/{user}\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"id\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"name\":\"user\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
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
      "testhttpputandhttpfetchcanpreformacalltoanapi_Handler_IamRole_4C35EBED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.put and http.fetch can preform a call to an api/Handler/IamRole",
            "uniqueId": "testhttpputandhttpfetchcanpreformacalltoanapi_Handler_IamRole_4C35EBED"
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
      "testhttpputandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicy_D35A09FD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.put and http.fetch can preform a call to an api/Handler/IamRolePolicy",
            "uniqueId": "testhttpputandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicy_D35A09FD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testhttpputandhttpfetchcanpreformacalltoanapi_Handler_IamRole_4C35EBED.name}"
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
      "testhttpputandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicyAttachment_DEDD4EEB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.put and http.fetch can preform a call to an api/Handler/IamRolePolicyAttachment",
            "uniqueId": "testhttpputandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicyAttachment_DEDD4EEB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testhttpputandhttpfetchcanpreformacalltoanapi_Handler_IamRole_4C35EBED.name}"
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
      "testhttpputandhttpfetchcanpreformacalltoanapi_Handler_2B7157C1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.put and http.fetch can preform a call to an api/Handler/Default",
            "uniqueId": "testhttpputandhttpfetchcanpreformacalltoanapi_Handler_2B7157C1"
          }
        },
        "environment": {
          "variables": {
            "CLOUD_API_C82DF3A5": "${aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url}",
            "WING_FUNCTION_NAME": "Handler-c8e4b12f",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_21": "${jsonencode(aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url)}"
          }
        },
        "function_name": "Handler-c8e4b12f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testhttpputandhttpfetchcanpreformacalltoanapi_Handler_IamRole_4C35EBED.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testhttpputandhttpfetchcanpreformacalltoanapi_Handler_S3Object_8E1D5390.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-PUT-dcff9e9b_69C95ABF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-PUT-dcff9e9b",
            "uniqueId": "cloudApi_api_permission-PUT-dcff9e9b_69C95ABF"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/PUT/path/{id}/nn/{user}",
        "statement_id": "AllowExecutionFromAPIGateway-PUT-dcff9e9b"
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
      "testhttpputandhttpfetchcanpreformacalltoanapi_Handler_S3Object_8E1D5390": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.put and http.fetch can preform a call to an api/Handler/S3Object",
            "uniqueId": "testhttpputandhttpfetchcanpreformacalltoanapi_Handler_S3Object_8E1D5390"
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
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
const http = require('@winglang/sdk').http;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const _id_client = context._lift(_id);
        const user_client = context._lift(user);
        const api_PUT_client = context._lift(api_PUT);
        const body_client = context._lift(body);
        const std_JsonClient = std.Json._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            _id: ${_id_client},
            user: ${user_client},
            api_PUT: ${api_PUT_client},
            body: ${body_client},
            std_Json: ${std_JsonClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure1._registerBindObject(_id, host, []);
          $Closure1._registerBindObject(api_PUT, host, []);
          $Closure1._registerBindObject(body, host, []);
          $Closure1._registerBindObject(user, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(_id, host, []);
          $Closure1._registerBindObject(api_PUT, host, []);
          $Closure1._registerBindObject(body, host, []);
          $Closure1._registerBindObject(user, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const api_client = context._lift(api);
        const _id_client = context._lift(_id);
        const user_client = context._lift(user);
        const body_client = context._lift(body);
        const http_PUT_client = context._lift(http_PUT);
        const http_UtilClient = http.Util._toInflightType(context);
        const std_JsonClient = std.Json._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            api: ${api_client},
            _id: ${_id_client},
            user: ${user_client},
            body: ${body_client},
            http_PUT: ${http_PUT_client},
            http_Util: ${http_UtilClient.text},
            std_Json: ${std_JsonClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure2._registerBindObject(_id, host, []);
          $Closure2._registerBindObject(api, host, []);
          $Closure2._registerBindObject(body, host, []);
          $Closure2._registerBindObject(http_PUT, host, []);
          $Closure2._registerBindObject(user, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(_id, host, []);
          $Closure2._registerBindObject(api.url, host, []);
          $Closure2._registerBindObject(body, host, []);
          $Closure2._registerBindObject(http_PUT, host, []);
          $Closure2._registerBindObject(user, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const http_PUT = http.HttpMethod.PUT;
    const api_PUT = cloud.HttpMethod.PUT;
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const body = Object.freeze({"cat":"Tion"});
    const user = "guy";
    const _id = "12345";
    (api.put("/path/{id}/nn/{user}",new $Closure1(this,"$Closure1")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:http.put and http.fetch can preform a call to an api",new $Closure2(this,"$Closure2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "put", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```

