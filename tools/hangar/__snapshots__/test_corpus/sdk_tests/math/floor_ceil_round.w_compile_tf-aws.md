# [floor_ceil_round.w](../../../../../../examples/tests/sdk_tests/math/floor_ceil_round.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ x, y, math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.floor(x) == 5")})(((await math_Util.floor(x)) === 5))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.ceil(x) == 6")})(((await math_Util.ceil(x)) === 6))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(x) == 5")})(((await math_Util.round(x)) === 5))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(y) == 6")})(((await math_Util.round(y)) === 6))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(-x) == -5")})(((await math_Util.round((-x))) === (-5)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(-y) == -6")})(((await math_Util.round((-y))) === (-6)))};
    }
  }
  return $Closure1;
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
      "value": "[[\"root/Default/Default/test:inflight floor--ceil\",\"${aws_lambda_function.root_testinflightfloorceil_Handler_16E98CE5.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightfloorceil_Handler_IamRole_D2741FF5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight floor--ceil/Handler/IamRole",
            "uniqueId": "root_testinflightfloorceil_Handler_IamRole_D2741FF5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightfloorceil_Handler_IamRolePolicy_9A68FCB0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight floor--ceil/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightfloorceil_Handler_IamRolePolicy_9A68FCB0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightfloorceil_Handler_IamRole_D2741FF5.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightfloorceil_Handler_IamRolePolicyAttachment_4AF8A281": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight floor--ceil/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightfloorceil_Handler_IamRolePolicyAttachment_4AF8A281"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightfloorceil_Handler_IamRole_D2741FF5.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightfloorceil_Handler_16E98CE5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight floor--ceil/Handler/Default",
            "uniqueId": "root_testinflightfloorceil_Handler_16E98CE5"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8309bd4",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8309bd4",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightfloorceil_Handler_IamRole_D2741FF5.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightfloorceil_Handler_S3Object_6E7EEB90.key}",
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
      "root_testinflightfloorceil_Handler_S3Object_6E7EEB90": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight floor--ceil/Handler/S3Object",
            "uniqueId": "root_testinflightfloorceil_Handler_S3Object_6E7EEB90"
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
const math = require('@winglang/sdk').math;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const x_client = context._lift(x);
        const y_client = context._lift(y);
        const math_UtilClient = math.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            x: ${x_client},
            y: ${y_client},
            math_Util: ${math_UtilClient.text},
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
          $Closure1._registerBindObject(x, host, []);
          $Closure1._registerBindObject(y, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(x, host, []);
          $Closure1._registerBindObject(y, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const x = 5.05;
    const y = 5.95;
    {((cond) => {if (!cond) throw new Error("assertion failed: math.floor(x) == 5")})(((math.Util.floor(x)) === 5))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.ceil(x) == 6")})(((math.Util.ceil(x)) === 6))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(x) == 5")})(((math.Util.round(x)) === 5))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(y) == 6")})(((math.Util.round(y)) === 6))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(-x) == -5")})(((math.Util.round((-x))) === (-5)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(-y) == -6")})(((math.Util.round((-y))) === (-6)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight floor/ceil",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "floor_ceil_round", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

