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
      try {
        {console.log(String.raw({ raw: ["", ""] }, (await math_Util.acos((-2)))))};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be between -1 and 1, inclusive.\"")})((e === "Input value must be between -1 and 1, inclusive."))};
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(-1) == math.PI")})(((await math_Util.acos((-1))) === math_Util.PI))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(-0) == 1.5707963267948966")})(((await math_Util.acos((-0))) === 1.5707963267948966))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(0) == 1.5707963267948966")})(((await math_Util.acos(0)) === 1.5707963267948966))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(0.5) == 1.0471975511965979")})(((await math_Util.acos(0.5)) === 1.0471975511965979))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(1) == 0")})(((await math_Util.acos(1)) === 0))};
      try {
        {console.log(String.raw({ raw: ["", ""] }, (await math_Util.acos(2))))};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be between -1 and 1, inclusive.\"")})((e === "Input value must be between -1 and 1, inclusive."))};
      }
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
      "value": "[[\"root/Default/Default/test:inflight arc cosine\",\"${aws_lambda_function.testinflightarccosine_Handler_506E61C9.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightarccosine_Handler_IamRole_257E26AA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosine/Handler/IamRole",
            "uniqueId": "testinflightarccosine_Handler_IamRole_257E26AA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightarccosine_Handler_IamRolePolicy_EC4E3669": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosine/Handler/IamRolePolicy",
            "uniqueId": "testinflightarccosine_Handler_IamRolePolicy_EC4E3669"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightarccosine_Handler_IamRole_257E26AA.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightarccosine_Handler_IamRolePolicyAttachment_B810E693": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosine/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightarccosine_Handler_IamRolePolicyAttachment_B810E693"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightarccosine_Handler_IamRole_257E26AA.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightarccosine_Handler_506E61C9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosine/Handler/Default",
            "uniqueId": "testinflightarccosine_Handler_506E61C9"
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
        "role": "${aws_iam_role.testinflightarccosine_Handler_IamRole_257E26AA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightarccosine_Handler_S3Object_5C3F35A1.key}",
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
      "testinflightarccosine_Handler_S3Object_5C3F35A1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosine/Handler/S3Object",
            "uniqueId": "testinflightarccosine_Handler_S3Object_5C3F35A1"
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
    try {
      {console.log(String.raw({ raw: ["", ""] }, (math.Util.acos((-2)))))};
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be between -1 and 1, inclusive.\"")})((e === "Input value must be between -1 and 1, inclusive."))};
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(-1) == math.PI")})(((math.Util.acos((-1))) === math.Util.PI))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(-0) == 1.5707963267948966")})(((math.Util.acos((-0))) === 1.5707963267948966))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(0) == 1.5707963267948966")})(((math.Util.acos(0)) === 1.5707963267948966))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(0.5) == 1.0471975511965979")})(((math.Util.acos(0.5)) === 1.0471975511965979))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acos(1) == 0")})(((math.Util.acos(1)) === 0))};
    try {
      {console.log(String.raw({ raw: ["", ""] }, (math.Util.acos(2))))};
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be between -1 and 1, inclusive.\"")})((e === "Input value must be between -1 and 1, inclusive."))};
    }
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

