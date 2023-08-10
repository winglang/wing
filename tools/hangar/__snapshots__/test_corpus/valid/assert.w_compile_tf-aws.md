# [assert.w](../../../../../examples/tests/valid/assert.w) | compile | tf-aws

## inflight.$Closure1-408f6a38.js
```js
module.exports = function({ $s1, $s2 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\" == \"\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("","")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\'\" == \"\'\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("'","'")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\\\"\" == \"\\\"\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("\"","\"")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"`\" == \"`\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("`","`")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"``\" == \"``\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("``","``")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"`s1`\" == \"`s1`\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("`s1`","`s1`")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: s1 == s1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($s1,$s1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}\" == \"${s1}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["", ""] }, $s1),String.raw({ raw: ["", ""] }, $s1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}\" != \"${s2}\"")})((String.raw({ raw: ["", ""] }, $s1) !== String.raw({ raw: ["", ""] }, $s2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}\" == \"a${s1}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["a", ""] }, $s1),String.raw({ raw: ["a", ""] }, $s1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}\" != \"b${s1}\"")})((String.raw({ raw: ["a", ""] }, $s1) !== String.raw({ raw: ["b", ""] }, $s1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}a\" == \"${s1}a\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["", "a"] }, $s1),String.raw({ raw: ["", "a"] }, $s1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}a\" != \"${s1}b\"")})((String.raw({ raw: ["", "a"] }, $s1) !== String.raw({ raw: ["", "b"] }, $s1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"`\'${s1}\" == \"`\'${s1}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["`'", ""] }, $s1),String.raw({ raw: ["`'", ""] }, $s1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}b${s2}c\" == \"a${s1}b${s2}c\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["a", "b", "c"] }, $s1, $s2),String.raw({ raw: ["a", "b", "c"] }, $s1, $s2))))};
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
      "value": "[[\"root/Default/Default/test:assert works inflight\",\"${aws_lambda_function.testassertworksinflight_Handler_915EA51A.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testassertworksinflight_Handler_IamRole_9AEF76A8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:assert works inflight/Handler/IamRole",
            "uniqueId": "testassertworksinflight_Handler_IamRole_9AEF76A8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testassertworksinflight_Handler_IamRolePolicy_8FAD880D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:assert works inflight/Handler/IamRolePolicy",
            "uniqueId": "testassertworksinflight_Handler_IamRolePolicy_8FAD880D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testassertworksinflight_Handler_IamRole_9AEF76A8.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testassertworksinflight_Handler_IamRolePolicyAttachment_4F207D95": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:assert works inflight/Handler/IamRolePolicyAttachment",
            "uniqueId": "testassertworksinflight_Handler_IamRolePolicyAttachment_4F207D95"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testassertworksinflight_Handler_IamRole_9AEF76A8.name}"
      }
    },
    "aws_lambda_function": {
      "testassertworksinflight_Handler_915EA51A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:assert works inflight/Handler/Default",
            "uniqueId": "testassertworksinflight_Handler_915EA51A"
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
        "role": "${aws_iam_role.testassertworksinflight_Handler_IamRole_9AEF76A8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testassertworksinflight_Handler_S3Object_9416DC9E.key}",
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
      "testassertworksinflight_Handler_S3Object_9416DC9E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:assert works inflight/Handler/S3Object",
            "uniqueId": "testassertworksinflight_Handler_S3Object_9416DC9E"
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1-408f6a38.js")({
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
    }
    const s1 = "foo";
    const s2 = "bar";
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\" == \"\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("","")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\'\" == \"\'\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("'","'")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\\\"\" == \"\\\"\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("\"","\"")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"`\" == \"`\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("`","`")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"``\" == \"``\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("``","``")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"`s1`\" == \"`s1`\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("`s1`","`s1`")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1 == s1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s1,s1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}\" == \"${s1}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["", ""] }, s1),String.raw({ raw: ["", ""] }, s1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}\" != \"${s2}\"")})((String.raw({ raw: ["", ""] }, s1) !== String.raw({ raw: ["", ""] }, s2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}\" == \"a${s1}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["a", ""] }, s1),String.raw({ raw: ["a", ""] }, s1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}\" != \"b${s1}\"")})((String.raw({ raw: ["a", ""] }, s1) !== String.raw({ raw: ["b", ""] }, s1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}a\" == \"${s1}a\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["", "a"] }, s1),String.raw({ raw: ["", "a"] }, s1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}a\" != \"${s1}b\"")})((String.raw({ raw: ["", "a"] }, s1) !== String.raw({ raw: ["", "b"] }, s1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"`\'${s1}\" == \"`\'${s1}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["`'", ""] }, s1),String.raw({ raw: ["`'", ""] }, s1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}b${s2}c\" == \"a${s1}b${s2}c\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["a", "b", "c"] }, s1, s2),String.raw({ raw: ["a", "b", "c"] }, s1, s2))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:assert works inflight",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "assert", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

