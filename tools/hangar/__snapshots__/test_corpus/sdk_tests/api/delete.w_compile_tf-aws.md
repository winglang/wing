# [delete.w](../../../../../../examples/tests/sdk_tests/api/delete.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ api_DELETE }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(req)  {
      {((cond) => {if (!cond) throw new Error("assertion failed: req.method == api_DELETE")})((req.method === api_DELETE))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.query?.get(\"all\") == \"true\"")})(((req.query)["all"] === "true"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.query?.get(\"page\") == \"6\"")})(((req.query)["page"] === "6"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.path == \"/path\"")})((req.path === "/path"))};
      return {
      "status": 200,
      "body": (req.query)["page"],}
      ;
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ api, http_DELETE, http_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const url = String.raw({ raw: ["", "/path?all=true&page=6"] }, api.url);
      const response = (await http_Util.delete(url));
      const fetchResponse = (await http_Util.fetch(url,Object.freeze({"method":http_DELETE})));
      {((cond) => {if (!cond) throw new Error("assertion failed: response.body == \"6\"")})((response.body === "6"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: response.status == 200")})((response.status === 200))};
      {((cond) => {if (!cond) throw new Error("assertion failed: response.url == url")})((response.url === url))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fetchResponse.body == \"6\"")})((fetchResponse.body === "6"))};
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
      "value": "[[\"root/Default/Default/test:http.delete and http.fetch can preform a call to an api\",\"${aws_lambda_function.testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_98044CDF.arn}\"]]"
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
          "redeployment": "841e88388b5ba75d968430f607ebeffd3f39668c"
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path\":{\"delete\":{\"operationId\":\"delete-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
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
      "testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_IamRole_F3B23120": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.delete and http.fetch can preform a call to an api/Handler/IamRole",
            "uniqueId": "testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_IamRole_F3B23120"
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
      "testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicy_03683652": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.delete and http.fetch can preform a call to an api/Handler/IamRolePolicy",
            "uniqueId": "testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicy_03683652"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_IamRole_F3B23120.name}"
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
      "testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicyAttachment_A5AE872D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.delete and http.fetch can preform a call to an api/Handler/IamRolePolicyAttachment",
            "uniqueId": "testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_IamRolePolicyAttachment_A5AE872D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_IamRole_F3B23120.name}"
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
      "testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_98044CDF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.delete and http.fetch can preform a call to an api/Handler/Default",
            "uniqueId": "testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_98044CDF"
          }
        },
        "environment": {
          "variables": {
            "CLOUD_API_C82DF3A5": "${aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url}",
            "WING_FUNCTION_NAME": "Handler-c897cd38",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_21": "${jsonencode(aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url)}"
          }
        },
        "function_name": "Handler-c897cd38",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_IamRole_F3B23120.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_S3Object_64313242.key}",
        "timeout": 30,
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
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.function_name}",
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
      "testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_S3Object_64313242": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.delete and http.fetch can preform a call to an api/Handler/S3Object",
            "uniqueId": "testhttpdeleteandhttpfetchcanpreformacalltoanapi_Handler_S3Object_64313242"
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
        const api_DELETE_client = context._lift(api_DELETE);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            api_DELETE: ${api_DELETE_client},
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
          $Closure1._registerBindObject(api_DELETE, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(api_DELETE, host, []);
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
        const http_DELETE_client = context._lift(http_DELETE);
        const http_UtilClient = http.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            api: ${api_client},
            http_DELETE: ${http_DELETE_client},
            http_Util: ${http_UtilClient.text},
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
          $Closure2._registerBindObject(api, host, []);
          $Closure2._registerBindObject(http_DELETE, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(api.url, host, []);
          $Closure2._registerBindObject(http_DELETE, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const http_DELETE = http.HttpMethod.DELETE;
    const api_DELETE = cloud.HttpMethod.DELETE;
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    (api.delete("/path",new $Closure1(this,"$Closure1")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:http.delete and http.fetch can preform a call to an api",new $Closure2(this,"$Closure2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "delete", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

