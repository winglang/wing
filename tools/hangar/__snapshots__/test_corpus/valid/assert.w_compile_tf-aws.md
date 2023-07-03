# [assert.w](../../../../../examples/tests/valid/assert.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $s1, $s2 }) {
  class $Closure1 {
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\" == \"\"")})(("" === ""))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\'\" == \"\'\"")})(("'" === "'"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\\\"\" == \"\\\"\"")})(("\"" === "\""))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"`\" == \"`\"")})(("`" === "`"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"``\" == \"``\"")})(("``" === "``"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"`s1`\" == \"`s1`\"")})(("`s1`" === "`s1`"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: s1 == s1")})(($s1 === $s1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}\" == \"${s1}\"")})((String.raw({ raw: ["", ""] }, $s1) === String.raw({ raw: ["", ""] }, $s1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}\" != \"${s2}\"")})((String.raw({ raw: ["", ""] }, $s1) !== String.raw({ raw: ["", ""] }, $s2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}\" == \"a${s1}\"")})((String.raw({ raw: ["a", ""] }, $s1) === String.raw({ raw: ["a", ""] }, $s1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}\" != \"b${s1}\"")})((String.raw({ raw: ["a", ""] }, $s1) !== String.raw({ raw: ["b", ""] }, $s1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}a\" == \"${s1}a\"")})((String.raw({ raw: ["", "a"] }, $s1) === String.raw({ raw: ["", "a"] }, $s1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}a\" != \"${s1}b\"")})((String.raw({ raw: ["", "a"] }, $s1) !== String.raw({ raw: ["", "b"] }, $s1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"`\'${s1}\" == \"`\'${s1}\"")})((String.raw({ raw: ["`'", ""] }, $s1) === String.raw({ raw: ["`'", ""] }, $s1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}b${s2}c\" == \"a${s1}b${s2}c\"")})((String.raw({ raw: ["a", "b", "c"] }, $s1, $s2) === String.raw({ raw: ["a", "b", "c"] }, $s1, $s2)))};
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
      "value": "[[\"root/Default/Default/test:assert works inflight\",\"${aws_lambda_function.root_testassertworksinflight_Handler_C656B6E3.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testassertworksinflight_Handler_IamRole_0E843492": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:assert works inflight/Handler/IamRole",
            "uniqueId": "root_testassertworksinflight_Handler_IamRole_0E843492"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testassertworksinflight_Handler_IamRolePolicy_9FDDFC6C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:assert works inflight/Handler/IamRolePolicy",
            "uniqueId": "root_testassertworksinflight_Handler_IamRolePolicy_9FDDFC6C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testassertworksinflight_Handler_IamRole_0E843492.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testassertworksinflight_Handler_IamRolePolicyAttachment_4CDBB60D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:assert works inflight/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testassertworksinflight_Handler_IamRolePolicyAttachment_4CDBB60D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testassertworksinflight_Handler_IamRole_0E843492.name}"
      }
    },
    "aws_lambda_function": {
      "root_testassertworksinflight_Handler_C656B6E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:assert works inflight/Handler/Default",
            "uniqueId": "root_testassertworksinflight_Handler_C656B6E3"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8a7b0b3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a7b0b3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testassertworksinflight_Handler_IamRole_0E843492.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testassertworksinflight_Handler_S3Object_29324B03.key}",
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
      "root_testassertworksinflight_Handler_S3Object_29324B03": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:assert works inflight/Handler/S3Object",
            "uniqueId": "root_testassertworksinflight_Handler_S3Object_29324B03"
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
            $s1: ${context._lift(s1)},
            $s2: ${context._lift(s2)},
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
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(s1, host, []);
          $Closure1._registerBindObject(s2, host, []);
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        super._registerTypeBind(host, ops);
      }
    }
    const s1 = "foo";
    const s2 = "bar";
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\" == \"\"")})(("" === ""))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\'\" == \"\'\"")})(("'" === "'"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\\\"\" == \"\\\"\"")})(("\"" === "\""))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"`\" == \"`\"")})(("`" === "`"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"``\" == \"``\"")})(("``" === "``"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"`s1`\" == \"`s1`\"")})(("`s1`" === "`s1`"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1 == s1")})((s1 === s1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}\" == \"${s1}\"")})((String.raw({ raw: ["", ""] }, s1) === String.raw({ raw: ["", ""] }, s1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}\" != \"${s2}\"")})((String.raw({ raw: ["", ""] }, s1) !== String.raw({ raw: ["", ""] }, s2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}\" == \"a${s1}\"")})((String.raw({ raw: ["a", ""] }, s1) === String.raw({ raw: ["a", ""] }, s1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}\" != \"b${s1}\"")})((String.raw({ raw: ["a", ""] }, s1) !== String.raw({ raw: ["b", ""] }, s1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}a\" == \"${s1}a\"")})((String.raw({ raw: ["", "a"] }, s1) === String.raw({ raw: ["", "a"] }, s1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}a\" != \"${s1}b\"")})((String.raw({ raw: ["", "a"] }, s1) !== String.raw({ raw: ["", "b"] }, s1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"`\'${s1}\" == \"`\'${s1}\"")})((String.raw({ raw: ["`'", ""] }, s1) === String.raw({ raw: ["`'", ""] }, s1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}b${s2}c\" == \"a${s1}b${s2}c\"")})((String.raw({ raw: ["a", "b", "c"] }, s1, s2) === String.raw({ raw: ["a", "b", "c"] }, s1, s2)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:assert works inflight",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "assert", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

