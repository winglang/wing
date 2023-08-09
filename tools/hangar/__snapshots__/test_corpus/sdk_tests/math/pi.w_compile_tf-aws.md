# [pi.w](../../../../../../examples/tests/sdk_tests/math/pi.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(radius) {
      return ((2 * $math_Util.PI) * radius);
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $circumference, $math_Util, $r }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(circumference(r), decimalPlaces: 2) == 62.83")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.round((await $circumference($r)),{ decimalPlaces: 2 })),62.83)))};
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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:PI\",\"${aws_lambda_function.undefined_testPI_Handler_33D7FA21.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testPI_Handler_IamRole_A853DAE1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:PI/Handler/IamRole",
            "uniqueId": "undefined_testPI_Handler_IamRole_A853DAE1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testPI_Handler_IamRolePolicy_E6D773D9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:PI/Handler/IamRolePolicy",
            "uniqueId": "undefined_testPI_Handler_IamRolePolicy_E6D773D9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testPI_Handler_IamRole_A853DAE1.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testPI_Handler_IamRolePolicyAttachment_014F39CB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:PI/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testPI_Handler_IamRolePolicyAttachment_014F39CB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testPI_Handler_IamRole_A853DAE1.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testPI_Handler_33D7FA21": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:PI/Handler/Default",
            "uniqueId": "undefined_testPI_Handler_33D7FA21"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c89c5f51",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c89c5f51",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testPI_Handler_IamRole_A853DAE1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testPI_Handler_S3Object_12D487F1.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      }
    },
    "aws_s3_object": {
      "undefined_testPI_Handler_S3Object_12D487F1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:PI/Handler/S3Object",
            "uniqueId": "undefined_testPI_Handler_S3Object_12D487F1"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
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
const math = $stdlib.math;
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
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            $circumference: ${context._lift(circumference)},
            $math_Util: ${context._lift(math.Util)},
            $r: ${context._lift(r)},
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
          $Closure2._registerBindObject(circumference, host, ["handle"]);
          $Closure2._registerBindObject(r, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const r = 10;
    const circumference = new $Closure1(this,"$Closure1");
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.PI, decimalPlaces: 3) == 3.142")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.round(math.Util.PI,{ decimalPlaces: 3 })),3.142)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:PI",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "pi", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

