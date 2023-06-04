# [capture_shadow.w](../../../../examples/tests/valid/capture_shadow.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ goo }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const foo = "world";
      return `${foo}, ${goo}!`;
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ fn }) {
  class $Inflight2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const result = (await fn());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(result === "world, world!!")'`)})((result === "world, world!!"))};
    }
  }
  return $Inflight2;
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
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/test:do not capture shadowed variable\",\"${aws_lambda_function.root_testdonotcaptureshadowedvariable_Handler_89E61D0E.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testdonotcaptureshadowedvariable_Handler_IamRole_A4CE7B18": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:do not capture shadowed variable/Handler/IamRole",
            "uniqueId": "root_testdonotcaptureshadowedvariable_Handler_IamRole_A4CE7B18"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testdonotcaptureshadowedvariable_Handler_IamRolePolicy_4A637C50": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:do not capture shadowed variable/Handler/IamRolePolicy",
            "uniqueId": "root_testdonotcaptureshadowedvariable_Handler_IamRolePolicy_4A637C50"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testdonotcaptureshadowedvariable_Handler_IamRole_A4CE7B18.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testdonotcaptureshadowedvariable_Handler_IamRolePolicyAttachment_477B8900": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:do not capture shadowed variable/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testdonotcaptureshadowedvariable_Handler_IamRolePolicyAttachment_477B8900"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testdonotcaptureshadowedvariable_Handler_IamRole_A4CE7B18.name}"
      }
    },
    "aws_lambda_function": {
      "root_testdonotcaptureshadowedvariable_Handler_89E61D0E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:do not capture shadowed variable/Handler/Default",
            "uniqueId": "root_testdonotcaptureshadowedvariable_Handler_89E61D0E"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8c29a18"
          }
        },
        "function_name": "Handler-c8c29a18",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testdonotcaptureshadowedvariable_Handler_IamRole_A4CE7B18.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testdonotcaptureshadowedvariable_Handler_S3Object_9D05B67C.key}",
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
      "root_testdonotcaptureshadowedvariable_Handler_S3Object_9D05B67C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:do not capture shadowed variable/Handler/S3Object",
            "uniqueId": "root_testdonotcaptureshadowedvariable_Handler_S3Object_9D05B67C"
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js";
        const goo_client = context._lift(goo);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            goo: ${goo_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight1Client = ${$Inflight1._toInflightType(this).text};
            const client = new $Inflight1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight1._registerBindObject(goo, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(goo, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight2.inflight.js";
        const fn_client = context._lift(fn);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            fn: ${fn_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight2Client = ${$Inflight2._toInflightType(this).text};
            const client = new $Inflight2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight2._registerBindObject(fn, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight2._registerBindObject(fn, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    const foo = "hello";
    const goo = "world!";
    const fn = new $Inflight1(this,"$Inflight1");
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:do not capture shadowed variable",new $Inflight2(this,"$Inflight2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "capture_shadow", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

