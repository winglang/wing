# [env.w](../../../../../../examples/tests/sdk_tests/util/env.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $NIL, $RANDOM, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: util.env(\"WING_TARGET\").length > 0")})(((await $util_Util.env("WING_TARGET")).length > 0))};
      const noValue = ((await $util_Util.tryEnv($RANDOM)) ?? $NIL);
      {((cond) => {if (!cond) throw new Error("assertion failed: noValue == NIL")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(noValue,$NIL)))};
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
      "value": "[[\"root/Default/Default/test:use util from inflight\",\"${aws_lambda_function.testuseutilfrominflight_Handler_6C871F39.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testuseutilfrominflight_Handler_IamRole_0F4456F5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:use util from inflight/Handler/IamRole",
            "uniqueId": "testuseutilfrominflight_Handler_IamRole_0F4456F5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testuseutilfrominflight_Handler_IamRolePolicy_17DE9CD4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:use util from inflight/Handler/IamRolePolicy",
            "uniqueId": "testuseutilfrominflight_Handler_IamRolePolicy_17DE9CD4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testuseutilfrominflight_Handler_IamRole_0F4456F5.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testuseutilfrominflight_Handler_IamRolePolicyAttachment_FC7E7304": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:use util from inflight/Handler/IamRolePolicyAttachment",
            "uniqueId": "testuseutilfrominflight_Handler_IamRolePolicyAttachment_FC7E7304"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testuseutilfrominflight_Handler_IamRole_0F4456F5.name}"
      }
    },
    "aws_lambda_function": {
      "testuseutilfrominflight_Handler_6C871F39": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:use util from inflight/Handler/Default",
            "uniqueId": "testuseutilfrominflight_Handler_6C871F39"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8904ffd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8904ffd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testuseutilfrominflight_Handler_IamRole_0F4456F5.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testuseutilfrominflight_Handler_S3Object_6902665C.key}",
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
      "testuseutilfrominflight_Handler_S3Object_6902665C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:use util from inflight/Handler/S3Object",
            "uniqueId": "testuseutilfrominflight_Handler_S3Object_6902665C"
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
const util = $stdlib.util;
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
            $NIL: ${context._lift(NIL)},
            $RANDOM: ${context._lift(RANDOM)},
            $util_Util: ${context._lift(util.Util)},
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
          $Closure1._registerBindObject(NIL, host, []);
          $Closure1._registerBindObject(RANDOM, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const RANDOM = "RANDOM123412121212kjhkjskdjkj";
    const NIL = "<<NIL>>";
    {((cond) => {if (!cond) throw new Error("assertion failed: util.env(\"PATH\").length > 0")})(((util.Util.env("PATH")).length > 0))};
    if (((util.Util.tryEnv("MY_VAR")) !== undefined)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: util.env(\"MY_VAR\") == \"my value\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("MY_VAR")),"my value")))};
    }
    let failed = false;
    try {
      (util.Util.env(RANDOM));
    }
    catch {
      failed = true;
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: failed")})(failed)};
    const no_value = ((util.Util.tryEnv(RANDOM)) ?? NIL);
    {((cond) => {if (!cond) throw new Error("assertion failed: no_value == NIL")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(no_value,NIL)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:use util from inflight",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "env", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

