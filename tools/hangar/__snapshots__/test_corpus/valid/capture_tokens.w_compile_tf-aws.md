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

## inflight.$Closure2.js
```js
module.exports = function({ url, api, MyResource }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: MyResource.isValidUrl(url)")})((await MyResource.isValidUrl(url)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: MyResource.isValidUrl(api.url)")})((await MyResource.isValidUrl(api.url)))};
    }
  }
  return $Closure2;
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
    }
    static async isValidUrl(url)  {
      return (require("<ABSOLUTE_PATH>/url_utils.js")["isValidUrl"])(url)
    }
    async foo()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: MyResource.isValidUrl(this.url)")})((await MyResource.isValidUrl(this.url)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: MyResource.isValidUrl(this.api.url)")})((await MyResource.isValidUrl(this.api.url)))};
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
      "value": "[[\"root/Default/Default/test:inflight class\",\"${aws_lambda_function.testinflightclass_Handler_F51916C9.arn}\"],[\"root/Default/Default/test:inflight globals\",\"${aws_lambda_function.testinflightglobals_Handler_386DF115.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "MyResource_cloudApi_api_deployment_6DBAED7F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Api/api/deployment",
            "uniqueId": "MyResource_cloudApi_api_deployment_6DBAED7F"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.MyResource_cloudApi_api_4CB9B8E3.id}",
        "triggers": {
          "redeployment": "6eb5a41974a89ebc5d63af9e7fe3ce6e1d6619c7"
        }
      },
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
          "redeployment": "6eb5a41974a89ebc5d63af9e7fe3ce6e1d6619c7"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "MyResource_cloudApi_api_4CB9B8E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Api/api/api",
            "uniqueId": "MyResource_cloudApi_api_4CB9B8E3"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{}}",
        "name": "api-c8ef4b64"
      },
      "cloudApi_api_2B334D75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "cloudApi_api_2B334D75"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{}}",
        "name": "api-c895068c"
      }
    },
    "aws_api_gateway_stage": {
      "MyResource_cloudApi_api_stage_A26656F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Api/api/stage",
            "uniqueId": "MyResource_cloudApi_api_stage_A26656F9"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.MyResource_cloudApi_api_deployment_6DBAED7F.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.MyResource_cloudApi_api_4CB9B8E3.id}",
        "stage_name": "prod"
      },
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
      "testinflightclass_Handler_IamRole_49C4923D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/IamRole",
            "uniqueId": "testinflightclass_Handler_IamRole_49C4923D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testinflightglobals_Handler_IamRole_09D0E2CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/IamRole",
            "uniqueId": "testinflightglobals_Handler_IamRole_09D0E2CB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightclass_Handler_IamRolePolicy_1427C4D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/IamRolePolicy",
            "uniqueId": "testinflightclass_Handler_IamRolePolicy_1427C4D0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightclass_Handler_IamRole_49C4923D.name}"
      },
      "testinflightglobals_Handler_IamRolePolicy_B2F53672": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/IamRolePolicy",
            "uniqueId": "testinflightglobals_Handler_IamRolePolicy_B2F53672"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightglobals_Handler_IamRole_09D0E2CB.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightclass_Handler_IamRolePolicyAttachment_D71572F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightclass_Handler_IamRolePolicyAttachment_D71572F9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightclass_Handler_IamRole_49C4923D.name}"
      },
      "testinflightglobals_Handler_IamRolePolicyAttachment_82A71498": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightglobals_Handler_IamRolePolicyAttachment_82A71498"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightglobals_Handler_IamRole_09D0E2CB.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightclass_Handler_F51916C9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/Default",
            "uniqueId": "testinflightclass_Handler_F51916C9"
          }
        },
        "environment": {
          "variables": {
            "CLOUD_API_C8DACDCC": "${aws_api_gateway_stage.MyResource_cloudApi_api_stage_A26656F9.invoke_url}",
            "WING_FUNCTION_NAME": "Handler-c8ed8f29",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_10": "${jsonencode(aws_api_gateway_stage.MyResource_cloudApi_api_stage_A26656F9.invoke_url)}",
            "WING_TOKEN_TFTOKEN_TOKEN_7": "${jsonencode(aws_api_gateway_stage.MyResource_cloudApi_api_stage_A26656F9.invoke_url)}"
          }
        },
        "function_name": "Handler-c8ed8f29",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightclass_Handler_IamRole_49C4923D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightclass_Handler_S3Object_6D43304B.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testinflightglobals_Handler_386DF115": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/Default",
            "uniqueId": "testinflightglobals_Handler_386DF115"
          }
        },
        "environment": {
          "variables": {
            "CLOUD_API_C82DF3A5": "${aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url}",
            "WING_FUNCTION_NAME": "Handler-c8ecc6d5",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_31": "${jsonencode(aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url)}",
            "WING_TOKEN_TFTOKEN_TOKEN_33": "${jsonencode(aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url)}"
          }
        },
        "function_name": "Handler-c8ecc6d5",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightglobals_Handler_IamRole_09D0E2CB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightglobals_Handler_S3Object_943E1D01.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
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
      "testinflightclass_Handler_S3Object_6D43304B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/S3Object",
            "uniqueId": "testinflightclass_Handler_S3Object_6D43304B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testinflightglobals_Handler_S3Object_943E1D01": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/S3Object",
            "uniqueId": "testinflightglobals_Handler_S3Object_943E1D01"
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
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class MyResource extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("isValidUrl", "foo");
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
          MyResource._registerBindObject(MyResource, host, ["isValidUrl"]);
          MyResource._registerBindObject(this.api.url, host, []);
          MyResource._registerBindObject(this.url, host, []);
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("isValidUrl")) {
        }
        super._registerTypeBind(host, ops);
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
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const url_client = context._lift(url);
        const api_client = context._lift(api);
        const MyResourceClient = MyResource._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            url: ${url_client},
            api: ${api_client},
            MyResource: ${MyResourceClient.text},
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
          $Closure2._registerBindObject(url, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(MyResource, host, ["isValidUrl"]);
          $Closure2._registerBindObject(api.url, host, []);
          $Closure2._registerBindObject(url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const r = new MyResource(this,"MyResource");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight class",new $Closure1(this,"$Closure1"));
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const url = api.url;
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight globals",new $Closure2(this,"$Closure2"));
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

