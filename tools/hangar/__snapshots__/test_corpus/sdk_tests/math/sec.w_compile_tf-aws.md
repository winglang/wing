# [sec.w](../../../../../../examples/tests/sdk_tests/math/sec.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(-0) == 1")})(((await math_Util.sec((-0))) === 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(0) == 1")})(((await math_Util.sec(0)) === 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(1) == 1.8508157176809255")})(((await math_Util.sec(1)) === 1.8508157176809255))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(-5) == 3.5253200858160887")})(((await math_Util.sec((-5))) === 3.5253200858160887))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(math.PI) == -1")})(((await math_Util.sec(math_Util.PI)) === (-1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(math.TAU) == 1")})(((await math_Util.sec(math_Util.TAU)) === 1))};
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
      "value": "[[\"root/Default/Default/test:inflight secant\",\"${aws_lambda_function.testinflightsecant_Handler_72888816.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightsecant_Handler_IamRole_7DD6883F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight secant/Handler/IamRole",
            "uniqueId": "testinflightsecant_Handler_IamRole_7DD6883F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightsecant_Handler_IamRolePolicy_BC7487D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight secant/Handler/IamRolePolicy",
            "uniqueId": "testinflightsecant_Handler_IamRolePolicy_BC7487D0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightsecant_Handler_IamRole_7DD6883F.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightsecant_Handler_IamRolePolicyAttachment_C7BA2EAF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight secant/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightsecant_Handler_IamRolePolicyAttachment_C7BA2EAF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightsecant_Handler_IamRole_7DD6883F.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightsecant_Handler_72888816": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight secant/Handler/Default",
            "uniqueId": "testinflightsecant_Handler_72888816"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8dc1a66",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8dc1a66",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightsecant_Handler_IamRole_7DD6883F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightsecant_Handler_S3Object_38691B5F.key}",
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
      "testinflightsecant_Handler_S3Object_38691B5F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight secant/Handler/S3Object",
            "uniqueId": "testinflightsecant_Handler_S3Object_38691B5F"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(-0) == 1")})(((math.Util.sec((-0))) === 1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(0) == 1")})(((math.Util.sec(0)) === 1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(1) == 1.8508157176809255")})(((math.Util.sec(1)) === 1.8508157176809255))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(-5) == 3.5253200858160887")})(((math.Util.sec((-5))) === 3.5253200858160887))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(math.PI) == -1")})(((math.Util.sec(math.Util.PI)) === (-1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(math.TAU) == 1")})(((math.Util.sec(math.Util.TAU)) === 1))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight secant",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "sec", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

