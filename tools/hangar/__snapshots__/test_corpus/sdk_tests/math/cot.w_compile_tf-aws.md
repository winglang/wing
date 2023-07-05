# [cot.w](../../../../../../examples/tests/sdk_tests/math/cot.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.cot(0) == math.INF")})(((await math_Util.cot(0)) === math_Util.INF))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.cot(math.PI / 4)) == 1")})(((await math_Util.round((await math_Util.cot((math_Util.PI / 4))))) === 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.cot(math.PI * 3 / 4)) == -1")})(((await math_Util.round((await math_Util.cot(((math_Util.PI * 3) / 4))))) === (-1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.cot(-0) == -math.INF")})(((await math_Util.cot((-0))) === (-math_Util.INF)))};
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
      "value": "[[\"root/Default/Default/test:inflight cotangent\",\"${aws_lambda_function.root_testinflightcotangent_Handler_753A2286.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightcotangent_Handler_IamRole_C1B8AF35": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cotangent/Handler/IamRole",
            "uniqueId": "root_testinflightcotangent_Handler_IamRole_C1B8AF35"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightcotangent_Handler_IamRolePolicy_B9A372B1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cotangent/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightcotangent_Handler_IamRolePolicy_B9A372B1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightcotangent_Handler_IamRole_C1B8AF35.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightcotangent_Handler_IamRolePolicyAttachment_4DB70677": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cotangent/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightcotangent_Handler_IamRolePolicyAttachment_4DB70677"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightcotangent_Handler_IamRole_C1B8AF35.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightcotangent_Handler_753A2286": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cotangent/Handler/Default",
            "uniqueId": "root_testinflightcotangent_Handler_753A2286"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8fc3a88",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8fc3a88",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightcotangent_Handler_IamRole_C1B8AF35.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightcotangent_Handler_S3Object_48384384.key}",
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
      "root_testinflightcotangent_Handler_S3Object_48384384": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cotangent/Handler/S3Object",
            "uniqueId": "root_testinflightcotangent_Handler_S3Object_48384384"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.cot(0) == math.INF")})(((math.Util.cot(0)) === math.Util.INF))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.cot(math.PI / 4)) == 1")})(((math.Util.round((math.Util.cot((math.Util.PI / 4))))) === 1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.cot(math.PI * 3 / 4)) == -1")})(((math.Util.round((math.Util.cot(((math.Util.PI * 3) / 4))))) === (-1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.cot(-0) == -math.INF")})(((math.Util.cot((-0))) === (-math.Util.INF)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight cotangent",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "cot", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

