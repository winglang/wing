# [get.w](../../../../../../examples/tests/sdk_tests/api/get.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $api_GET, $body }) {
  class $Closure1 {
    async handle(req)  {
      {((cond) => {if (!cond) throw new Error("assertion failed: req.method == api_GET")})((req.method === $api_GET))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.path == \"/path\"")})((req.path === "/path"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.headers?.get(\"content-type\") == \"application/json\"")})(((req.headers)["content-type"] === "application/json"))};
      return {
      "status": 200,
      "body": $body,}
      ;
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $api_url, $body, $http_GET, http_Util }) {
  const http = {
    Util: http_Util,
  };
  class $Closure2 {
    async handle()  {
      const url = ($api_url + "/path");
      const getResponse = (await http.Util.get(url,Object.freeze({"headers":Object.freeze({"content-type":"application/json"})})));
      const fetchResponse = (await http.Util.fetch(url,{
      "method": $http_GET,
      "headers": Object.freeze({"content-type":"application/json"}),}
      ));
      const fetchResponseNoMethod = (await http.Util.fetch(url,{
      "headers": Object.freeze({"content-type":"application/json"}),}
      ));
      {((cond) => {if (!cond) throw new Error("assertion failed: getResponse.body == body")})((getResponse.body === $body))};
      {((cond) => {if (!cond) throw new Error("assertion failed: getResponse.status == 200")})((getResponse.status === 200))};
      {((cond) => {if (!cond) throw new Error("assertion failed: getResponse.url == url")})((getResponse.url === url))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.body == body")})((fetchResponse.body === $body))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.status == 200")})((fetchResponse.status === 200))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.url == url")})((fetchResponse.url === url))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponseNoMethod.body == body")})((fetchResponseNoMethod.body === $body))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponseNoMethod.status == 200")})((fetchResponseNoMethod.status === 200))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponseNoMethod.url == url")})((fetchResponseNoMethod.url === url))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const url = (api.url + "/path");
      const getResponse = (await http_Util.get(url,{ headers: Object.freeze({"content-type":"application/json"}) }));
      const fetchResponse = (await http_Util.fetch(url,{
      "method": http_GET,
      "headers": Object.freeze({"content-type":"application/json"}),}
      ));
      const fetchResponseNoMethod = (await http_Util.fetch(url,{
      "headers": Object.freeze({"content-type":"application/json"}),}
      ));
      {((cond) => {if (!cond) throw new Error("assertion failed: getResponse.body == body")})((getResponse.body === body))};
      {((cond) => {if (!cond) throw new Error("assertion failed: getResponse.status == 200")})((getResponse.status === 200))};
      {((cond) => {if (!cond) throw new Error("assertion failed: getResponse.url == url")})((getResponse.url === url))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.body == body")})((fetchResponse.body === body))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.status == 200")})((fetchResponse.status === 200))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.url == url")})((fetchResponse.url === url))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponseNoMethod.body == body")})((fetchResponseNoMethod.body === body))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponseNoMethod.status == 200")})((fetchResponseNoMethod.status === 200))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponseNoMethod.url == url")})((fetchResponseNoMethod.url === url))};
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
      "version": "0.15.2"
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
      "root_Region_A2D17352": {
        "//": {
          "metadata": {
            "path": "root/Default/Region",
            "uniqueId": "root_Region_A2D17352"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/test:http.get and http.fetch can preform a call to an api\",\"${aws_lambda_function.root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_543A78D5.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "root_cloudApi_api_deployment_E29F699A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/deployment",
            "uniqueId": "root_cloudApi_api_deployment_E29F699A"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.id}",
        "triggers": {
          "redeployment": "c3461b0b0043b244acf509a72d2abc470b20cb05"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "root_cloudApi_api_8C9FE51E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "root_cloudApi_api_8C9FE51E"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path\":{\"get\":{\"operationId\":\"get-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequestcdafee6e_582EA655.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
        "name": "api-c895068c"
      }
    },
    "aws_api_gateway_stage": {
      "root_cloudApi_api_stage_57D6284A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/stage",
            "uniqueId": "root_cloudApi_api_stage_57D6284A"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.root_cloudApi_api_deployment_E29F699A.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.id}",
        "stage_name": "prod"
      }
    },
    "aws_iam_role": {
      "root_cloudApi_cloudApiOnRequestcdafee6e_IamRole_2B8A04C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRole",
            "uniqueId": "root_cloudApi_cloudApiOnRequestcdafee6e_IamRole_2B8A04C3"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_IamRole_09386838": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.get and http.fetch can preform a call to an api/Handler/IamRole",
            "uniqueId": "root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_IamRole_09386838"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudApi_cloudApiOnRequestcdafee6e_IamRolePolicy_E6B9BE66": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRolePolicy",
            "uniqueId": "root_cloudApi_cloudApiOnRequestcdafee6e_IamRolePolicy_E6B9BE66"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequestcdafee6e_IamRole_2B8A04C3.name}"
      },
      "root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicy_108210B3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.get and http.fetch can preform a call to an api/Handler/IamRolePolicy",
            "uniqueId": "root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicy_108210B3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_IamRole_09386838.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudApi_cloudApiOnRequestcdafee6e_IamRolePolicyAttachment_4A873879": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "root_cloudApi_cloudApiOnRequestcdafee6e_IamRolePolicyAttachment_4A873879"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequestcdafee6e_IamRole_2B8A04C3.name}"
      },
      "root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicyAttachment_2F4F63AD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.get and http.fetch can preform a call to an api/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicyAttachment_2F4F63AD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_IamRole_09386838.name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudApi_cloudApiOnRequestcdafee6e_582EA655": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/Default",
            "uniqueId": "root_cloudApi_cloudApiOnRequestcdafee6e_582EA655"
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
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequestcdafee6e_IamRole_2B8A04C3.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudApi_cloudApiOnRequestcdafee6e_S3Object_AA762041.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_543A78D5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.get and http.fetch can preform a call to an api/Handler/Default",
            "uniqueId": "root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_543A78D5"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c838ce37",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_21": "${jsonencode(aws_api_gateway_stage.root_cloudApi_api_stage_57D6284A.invoke_url)}"
          }
        },
        "function_name": "Handler-c838ce37",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_IamRole_09386838.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_S3Object_C6152827.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_cloudApi_api_permissionGETe2131352_C536168C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-e2131352",
            "uniqueId": "root_cloudApi_api_permissionGETe2131352_C536168C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequestcdafee6e_582EA655.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.execution_arn}/*/GET/path",
        "statement_id": "AllowExecutionFromAPIGateway-GET-e2131352"
      }
    },
    "aws_s3_bucket": {
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "root_cloudApi_cloudApiOnRequestcdafee6e_S3Object_AA762041": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/S3Object",
            "uniqueId": "root_cloudApi_cloudApiOnRequestcdafee6e_S3Object_AA762041"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_S3Object_C6152827": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.get and http.fetch can preform a call to an api/Handler/S3Object",
            "uniqueId": "root_testhttpgetandhttpfetchcanpreformacalltoanapi_Handler_S3Object_C6152827"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
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
        const $api_GET = context._lift(api_GET);
        const $body = context._lift(body);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({ 
            $api_GET: ${$api_GET},
            $body: ${$body},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const client = new (${$Closure1._toInflightType(this).text})({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(api_GET, host, []);
          $Closure1._registerBindObject(body, host, []);
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
        const $api_url = context._lift(api.url);
        const $body = context._lift(body);
        const $http_GET = context._lift(http_GET);
        const lifted_http_Util = http.Util._toInflightType(context).text;
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({ 
            $api_url: ${$api_url},
            $body: ${$body},
            $http_GET: ${$http_GET},
            http_Util: ${lifted_http_Util},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const client = new (${$Closure2._toInflightType(this).text})({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(api.url, host, []);
          $Closure2._registerBindObject(body, host, []);
          $Closure2._registerBindObject(http_GET, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const http_GET = http.HttpMethod.GET;
    const api_GET = cloud.HttpMethod.GET;
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const body = "ok!";
    (api.get("/path",new $Closure1(this,"$Closure1")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:http.get and http.fetch can preform a call to an api",new $Closure2(this,"$Closure2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "get", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

