# [shadowing.w](../../../../../examples/tests/valid/shadowing.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $bar }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const result = [];
      (await result.push($bar));
      if (true) {
        const bar = "world";
        (await result.push(bar));
      }
      const foo = "bang";
      (await result.push(foo));
      return Object.freeze([...(result)]);
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $fn }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const result = (await $fn());
      {((cond) => {if (!cond) throw new Error("assertion failed: result.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(result.length,3)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: result.at(0) == \"hola!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await result.at(0)),"hola!")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: result.at(1) == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await result.at(1)),"world")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: result.at(2) == \"bang\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await result.at(2)),"bang")))};
    }
  }
  return $Closure2;
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
      "value": "[[\"root/Default/Default/test:capture shadow interaction\",\"${aws_lambda_function.testcaptureshadowinteraction_Handler_9B768E38.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testcaptureshadowinteraction_Handler_IamRole_7A8AB102": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/IamRole",
            "uniqueId": "testcaptureshadowinteraction_Handler_IamRole_7A8AB102"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testcaptureshadowinteraction_Handler_IamRolePolicy_E2199BB8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/IamRolePolicy",
            "uniqueId": "testcaptureshadowinteraction_Handler_IamRolePolicy_E2199BB8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testcaptureshadowinteraction_Handler_IamRole_7A8AB102.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testcaptureshadowinteraction_Handler_IamRolePolicyAttachment_51CBDE42": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcaptureshadowinteraction_Handler_IamRolePolicyAttachment_51CBDE42"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcaptureshadowinteraction_Handler_IamRole_7A8AB102.name}"
      }
    },
    "aws_lambda_function": {
      "testcaptureshadowinteraction_Handler_9B768E38": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/Default",
            "uniqueId": "testcaptureshadowinteraction_Handler_9B768E38"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8807c1f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8807c1f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testcaptureshadowinteraction_Handler_IamRole_7A8AB102.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcaptureshadowinteraction_Handler_S3Object_ACDDE567.key}",
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
      "testcaptureshadowinteraction_Handler_S3Object_ACDDE567": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/S3Object",
            "uniqueId": "testcaptureshadowinteraction_Handler_S3Object_ACDDE567"
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
const cloud = require('@winglang/sdk').cloud;
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
          require("./inflight.$Closure1.js")({
            $bar: ${context._lift(bar)},
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
          $Closure1._registerBindObject(bar, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            $fn: ${context._lift(fn)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this).text};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(fn, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    const bar = "hola!";
    const foo = "not captured";
    const fn = new $Closure1(this,"$Closure1");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:capture shadow interaction",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "shadowing", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, sourceDir: process.env['WING_SOURCE_DIR'] }).synth();

```

