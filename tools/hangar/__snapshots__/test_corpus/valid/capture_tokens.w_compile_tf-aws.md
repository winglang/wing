# [capture_tokens.w](../../../../../examples/tests/valid/capture_tokens.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ r }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await r.foo());
    }
  }
  return $Closure1;
}

```

## inflight.MyResource.js
```js
module.exports = function({  }) {
  class MyResource {
    constructor({ api, url }) {
      this.api = api;
      this.url = url;
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
    async foo()  {
      const __parent_this = this;
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'this.url.startsWith("http://127.0.0.1")'`)})(this.url.startsWith("http://127.0.0.1"))};
    }
  }
  return MyResource;
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
      "value": "[[\"root/Default/Default/test:urlPrint\",\"${aws_lambda_function.root_testurlPrint_Handler_83915B32.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "root_MyResource_cloudApi_api_deployment_B9099183": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Api/api/deployment",
            "uniqueId": "root_MyResource_cloudApi_api_deployment_B9099183"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.root_MyResource_cloudApi_api_67EFBCA5.id}",
        "triggers": {
          "redeployment": "6eb5a41974a89ebc5d63af9e7fe3ce6e1d6619c7"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "root_MyResource_cloudApi_api_67EFBCA5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Api/api/api",
            "uniqueId": "root_MyResource_cloudApi_api_67EFBCA5"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{}}",
        "name": "api-c8ef4b64"
      }
    },
    "aws_api_gateway_stage": {
      "root_MyResource_cloudApi_api_stage_47CBB72B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Api/api/stage",
            "uniqueId": "root_MyResource_cloudApi_api_stage_47CBB72B"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.root_MyResource_cloudApi_api_deployment_B9099183.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.root_MyResource_cloudApi_api_67EFBCA5.id}",
        "stage_name": "prod"
      }
    },
    "aws_iam_role": {
      "root_testurlPrint_Handler_IamRole_F451E931": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:urlPrint/Handler/IamRole",
            "uniqueId": "root_testurlPrint_Handler_IamRole_F451E931"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testurlPrint_Handler_IamRolePolicy_E8A63EC0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:urlPrint/Handler/IamRolePolicy",
            "uniqueId": "root_testurlPrint_Handler_IamRolePolicy_E8A63EC0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testurlPrint_Handler_IamRole_F451E931.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testurlPrint_Handler_IamRolePolicyAttachment_77C65723": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:urlPrint/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testurlPrint_Handler_IamRolePolicyAttachment_77C65723"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testurlPrint_Handler_IamRole_F451E931.name}"
      }
    },
    "aws_lambda_function": {
      "root_testurlPrint_Handler_83915B32": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:urlPrint/Handler/Default",
            "uniqueId": "root_testurlPrint_Handler_83915B32"
          }
        },
        "environment": {
          "variables": {
            "CLOUD_API_C8DACDCC": "${aws_api_gateway_stage.root_MyResource_cloudApi_api_stage_47CBB72B.invoke_url}",
            "WING_FUNCTION_NAME": "Handler-c8f2f6b9",
            "WING_TOKEN__TFTOKEN_TOKEN_7_": "${jsonencode(aws_api_gateway_stage.root_MyResource_cloudApi_api_stage_47CBB72B.invoke_url)}"
          }
        },
        "function_name": "Handler-c8f2f6b9",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testurlPrint_Handler_IamRole_F451E931.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testurlPrint_Handler_S3Object_AF7E4A37.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
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
      "root_testurlPrint_Handler_S3Object_AF7E4A37": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:urlPrint/Handler/S3Object",
            "uniqueId": "root_testurlPrint_Handler_S3Object_AF7E4A37"
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
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class MyResource extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("foo");
        const __parent_this = this;
        this.api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
        this.url = this.api.url;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.MyResource.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const api_client = this._lift(this.api);
        const url_client = this._lift(this.url);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType(this).text};
            const client = new MyResourceClient({
              api: ${api_client},
              url: ${url_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyResource._registerBindObject(this.api, host, []);
          MyResource._registerBindObject(this.url, host, []);
        }
        if (ops.includes("foo")) {
          MyResource._registerBindObject(this.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const r_client = context._lift(r);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            r: ${r_client},
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
          $Closure1._registerBindObject(r, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(r, host, ["foo"]);
        }
        super._registerBind(host, ops);
      }
    }
    const r = new MyResource(this,"MyResource");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:urlPrint",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "capture_tokens", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

