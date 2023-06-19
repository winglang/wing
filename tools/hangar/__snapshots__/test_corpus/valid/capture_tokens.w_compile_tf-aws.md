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
    async handle()  {
      (await r.foo());
    }
    async $inflight_init()  {
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ MyResource, api, url }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await MyResource.isValidUrl(url))'`)})((await MyResource.isValidUrl(url)))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await MyResource.isValidUrl(api.url))'`)})((await MyResource.isValidUrl(api.url)))};
    }
    async $inflight_init()  {
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
    static async isValidUrl(url)  {
      return (require("<ABSOLUTE_PATH>/url_utils.js")["isValidUrl"])(url)
    }
    async foo()  {
      const __parent_this = this;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await MyResource.isValidUrl(this.url))'`)})((await MyResource.isValidUrl(this.url)))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await MyResource.isValidUrl(this.api.url))'`)})((await MyResource.isValidUrl(this.api.url)))};
    }
    async $inflight_init()  {
      const __parent_this = this;
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
      "value": "[[\"root/Default/Default/test:inflight class\",\"${aws_lambda_function.root_testinflightclass_Handler_03063E79.arn}\"],[\"root/Default/Default/test:inflight globals\",\"${aws_lambda_function.root_testinflightglobals_Handler_06E8AF11.arn}\"]]"
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
      },
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
      },
      "root_cloudApi_api_8C9FE51E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "root_cloudApi_api_8C9FE51E"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{}}",
        "name": "api-c895068c"
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
      },
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
      "root_testinflightclass_Handler_IamRole_F073B3F3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/IamRole",
            "uniqueId": "root_testinflightclass_Handler_IamRole_F073B3F3"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinflightglobals_Handler_IamRole_94685A12": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/IamRole",
            "uniqueId": "root_testinflightglobals_Handler_IamRole_94685A12"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightclass_Handler_IamRolePolicy_79087B5C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightclass_Handler_IamRolePolicy_79087B5C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightclass_Handler_IamRole_F073B3F3.name}"
      },
      "root_testinflightglobals_Handler_IamRolePolicy_ED11D625": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightglobals_Handler_IamRolePolicy_ED11D625"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightglobals_Handler_IamRole_94685A12.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightclass_Handler_IamRolePolicyAttachment_24DB4FC7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightclass_Handler_IamRolePolicyAttachment_24DB4FC7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightclass_Handler_IamRole_F073B3F3.name}"
      },
      "root_testinflightglobals_Handler_IamRolePolicyAttachment_21613050": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightglobals_Handler_IamRolePolicyAttachment_21613050"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightglobals_Handler_IamRole_94685A12.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightclass_Handler_03063E79": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/Default",
            "uniqueId": "root_testinflightclass_Handler_03063E79"
          }
        },
        "environment": {
          "variables": {
            "CLOUD_API_C8DACDCC": "${aws_api_gateway_stage.root_MyResource_cloudApi_api_stage_47CBB72B.invoke_url}",
            "WING_FUNCTION_NAME": "Handler-c8ed8f29",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_AWS_API_GATEWAY_STAGE_ROOT_MYRESOURCE_CLOUDAPI_API_STAGE_47CBB72B_INVOKE_URL": "${jsonencode(aws_api_gateway_stage.root_MyResource_cloudApi_api_stage_47CBB72B.invoke_url)}"
          }
        },
        "function_name": "Handler-c8ed8f29",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightclass_Handler_IamRole_F073B3F3.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightclass_Handler_S3Object_3F58290E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinflightglobals_Handler_06E8AF11": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/Default",
            "uniqueId": "root_testinflightglobals_Handler_06E8AF11"
          }
        },
        "environment": {
          "variables": {
            "CLOUD_API_C82DF3A5": "${aws_api_gateway_stage.root_cloudApi_api_stage_57D6284A.invoke_url}",
            "WING_FUNCTION_NAME": "Handler-c8ecc6d5",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_AWS_API_GATEWAY_STAGE_ROOT_CLOUDAPI_API_STAGE_57D6284A_INVOKE_URL": "${jsonencode(aws_api_gateway_stage.root_cloudApi_api_stage_57D6284A.invoke_url)}"
          }
        },
        "function_name": "Handler-c8ecc6d5",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightglobals_Handler_IamRole_94685A12.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightglobals_Handler_S3Object_679457A8.key}",
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
      "root_testinflightclass_Handler_S3Object_3F58290E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/S3Object",
            "uniqueId": "root_testinflightclass_Handler_S3Object_3F58290E"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinflightglobals_Handler_S3Object_679457A8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/S3Object",
            "uniqueId": "root_testinflightglobals_Handler_S3Object_679457A8"
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
        this._addInflightOps("isValidUrl", "foo", "$inflight_init");
        const __parent_this = this;
        this.api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
        this.url = this.api.url;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.MyResource.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType(this).text};
            const client = new MyResourceClient({
              api: ${this._lift(this.api, ["url"])},
              url: ${this._lift(this.url, [""])},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyResource._registerBindObject(this.api, host, ["url"]);
          MyResource._registerBindObject(this.url, host, [""]);
        }
        if (ops.includes("foo")) {
          MyResource._registerBindObject(this.api, host, ["url"]);
          MyResource._registerBindObject(this.url, host, [""]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            r: ${context._lift(r, ["foo"])},
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
          $Closure1._registerBindObject(r, host, ["foo"]);
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const MyResourceClient = MyResource._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            api: ${context._lift(api, ["url"])},
            url: ${context._lift(url, [""])},
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
          $Closure2._registerBindObject(api, host, ["url"]);
          $Closure2._registerBindObject(url, host, [""]);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(api, host, ["url"]);
          $Closure2._registerBindObject(url, host, [""]);
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

