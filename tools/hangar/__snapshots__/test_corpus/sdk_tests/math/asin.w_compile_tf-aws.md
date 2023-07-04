# [asin.w](../../../../../../examples/tests/sdk_tests/math/asin.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(-1) == -1.5707963267948966")})(((await math_Util.asin((-1))) === (-1.5707963267948966)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(-0) == -0")})(((await math_Util.asin((-0))) === (-0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(0) == 0")})(((await math_Util.asin(0)) === 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(0.5) == 0.5235987755982989")})(((await math_Util.asin(0.5)) === 0.5235987755982989))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(1) == 1.5707963267948966")})(((await math_Util.asin(1)) === 1.5707963267948966))};
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
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/test:inflight arc sine\",\"${aws_lambda_function.testinflightarcsine_Handler_7B606063.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightarcsine_Handler_IamRole_EBCCD81D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc sine/Handler/IamRole",
            "uniqueId": "testinflightarcsine_Handler_IamRole_EBCCD81D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightarcsine_Handler_IamRolePolicy_58AE68F0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc sine/Handler/IamRolePolicy",
            "uniqueId": "testinflightarcsine_Handler_IamRolePolicy_58AE68F0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightarcsine_Handler_IamRole_EBCCD81D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightarcsine_Handler_IamRolePolicyAttachment_62A643BB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc sine/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightarcsine_Handler_IamRolePolicyAttachment_62A643BB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightarcsine_Handler_IamRole_EBCCD81D.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightarcsine_Handler_7B606063": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc sine/Handler/Default",
            "uniqueId": "testinflightarcsine_Handler_7B606063"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8343dcd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8343dcd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightarcsine_Handler_IamRole_EBCCD81D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightarcsine_Handler_S3Object_D9A3F771.key}",
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
      "testinflightarcsine_Handler_S3Object_D9A3F771": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc sine/Handler/S3Object",
            "uniqueId": "testinflightarcsine_Handler_S3Object_D9A3F771"
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
const math = require('@winglang/sdk').math;
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
        const math_UtilClient = math.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(-1) == -1.5707963267948966")})(((math.Util.asin((-1))) === (-1.5707963267948966)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(-0) == -0")})(((math.Util.asin((-0))) === (-0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(0) == 0")})(((math.Util.asin(0)) === 0))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(0.5) == 0.5235987755982989")})(((math.Util.asin(0.5)) === 0.5235987755982989))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(1) == 1.5707963267948966")})(((math.Util.asin(1)) === 1.5707963267948966))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight arc sine",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "asin", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

