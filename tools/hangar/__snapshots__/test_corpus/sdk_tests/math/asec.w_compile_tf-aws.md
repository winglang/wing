# [asec.w](../../../../../../examples/tests/sdk_tests/math/asec.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    async handle() {
      try {
        {console.log(String.raw({ raw: ["", ""] }, (await $math_Util.asec(0.5))))};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be equal or greater than |1|.\"")})((e === "Input value must be equal or greater than |1|."))};
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(2) == 1.0471975511965979")})(((await $math_Util.asec(2)) === 1.0471975511965979))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(1) == 0")})(((await $math_Util.asec(1)) === 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(math.PI) == 1.2468502198629159")})(((await $math_Util.asec($math_Util.PI)) === 1.2468502198629159))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(-math.PI) == 1.8947424337268775")})(((await $math_Util.asec((-$math_Util.PI))) === 1.8947424337268775))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(-1) == math.PI")})(((await $math_Util.asec((-1))) === $math_Util.PI))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(-2) == 2.0943951023931957")})(((await $math_Util.asec((-2))) === 2.0943951023931957))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
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
      "value": "[[\"root/Default/Default/test:inflight arc cosecant\",\"${aws_lambda_function.root_testinflightarccosecant_Handler_CD2D05A5.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightarccosecant_Handler_IamRole_375FBBFB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosecant/Handler/IamRole",
            "uniqueId": "root_testinflightarccosecant_Handler_IamRole_375FBBFB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightarccosecant_Handler_IamRolePolicy_26EDECE9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosecant/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightarccosecant_Handler_IamRolePolicy_26EDECE9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightarccosecant_Handler_IamRole_375FBBFB.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightarccosecant_Handler_IamRolePolicyAttachment_19343BEF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosecant/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightarccosecant_Handler_IamRolePolicyAttachment_19343BEF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightarccosecant_Handler_IamRole_375FBBFB.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightarccosecant_Handler_CD2D05A5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosecant/Handler/Default",
            "uniqueId": "root_testinflightarccosecant_Handler_CD2D05A5"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c850f94d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c850f94d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightarccosecant_Handler_IamRole_375FBBFB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightarccosecant_Handler_S3Object_FBB306E4.key}",
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
      "root_testinflightarccosecant_Handler_S3Object_FBB306E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosecant/Handler/S3Object",
            "uniqueId": "root_testinflightarccosecant_Handler_S3Object_FBB306E4"
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
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $math_Util: ${context._lift(math.Util)},
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
    }
    try {
      {console.log(String.raw({ raw: ["", ""] }, (math.Util.asec(0.5))))};
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be equal or greater than |1|.\"")})((e === "Input value must be equal or greater than |1|."))};
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(2) == 1.0471975511965979")})(((math.Util.asec(2)) === 1.0471975511965979))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(1) == 0")})(((math.Util.asec(1)) === 0))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(math.PI) == 1.2468502198629159")})(((math.Util.asec(math.Util.PI)) === 1.2468502198629159))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(-math.PI) == 1.8947424337268775")})(((math.Util.asec((-math.Util.PI))) === 1.8947424337268775))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(-1) == math.PI")})(((math.Util.asec((-1))) === math.Util.PI))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(-2) == 2.0943951023931957")})(((math.Util.asec((-2))) === 2.0943951023931957))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight arc cosecant",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "asec", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

