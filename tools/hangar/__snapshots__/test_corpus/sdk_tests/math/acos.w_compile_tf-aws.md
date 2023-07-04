# [acos.w](../../../../../../examples/tests/sdk_tests/math/acos.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(-1) == math.PI")})(((await math_Util.acos((-1))) === math_Util.PI))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(-0) == 1.5707963267948966")})(((await math_Util.acos((-0))) === 1.5707963267948966))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(0) == 1.5707963267948966")})(((await math_Util.acos(0)) === 1.5707963267948966))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(0.5) == 1.0471975511965979")})(((await math_Util.acos(0.5)) === 1.0471975511965979))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(1) == 0")})(((await math_Util.acos(1)) === 0))};
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
      "value": "[[\"root/Default/Default/test:inflight arc cosine\",\"${aws_lambda_function.root_testinflightarccosine_Handler_4A10AA9F.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightarccosine_Handler_IamRole_E3E61ED9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosine/Handler/IamRole",
            "uniqueId": "root_testinflightarccosine_Handler_IamRole_E3E61ED9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightarccosine_Handler_IamRolePolicy_365D4807": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosine/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightarccosine_Handler_IamRolePolicy_365D4807"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightarccosine_Handler_IamRole_E3E61ED9.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightarccosine_Handler_IamRolePolicyAttachment_5E0A7B85": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosine/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightarccosine_Handler_IamRolePolicyAttachment_5E0A7B85"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightarccosine_Handler_IamRole_E3E61ED9.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightarccosine_Handler_4A10AA9F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosine/Handler/Default",
            "uniqueId": "root_testinflightarccosine_Handler_4A10AA9F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c853dd3e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c853dd3e",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightarccosine_Handler_IamRole_E3E61ED9.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightarccosine_Handler_S3Object_8FCE55D8.key}",
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
      "root_testinflightarccosine_Handler_S3Object_8FCE55D8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosine/Handler/S3Object",
            "uniqueId": "root_testinflightarccosine_Handler_S3Object_8FCE55D8"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(-1) == math.PI")})(((math.Util.acos((-1))) === math.Util.PI))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(-0) == 1.5707963267948966")})(((math.Util.acos((-0))) === 1.5707963267948966))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(0) == 1.5707963267948966")})(((math.Util.acos(0)) === 1.5707963267948966))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(0.5) == 1.0471975511965979")})(((math.Util.acos(0.5)) === 1.0471975511965979))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(1) == 0")})(((math.Util.acos(1)) === 0))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight arc cosine",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "acos", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

