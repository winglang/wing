# [bool.w](../../../../../../examples/tests/sdk_tests/std/bool.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $PARSE_ERROR, $std_Boolean, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const t = (await $std_Boolean.fromJson((JSON.parse("true"))));
      {((cond) => {if (!cond) throw new Error("assertion failed: t == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(t,true)))};
      const f = (await $std_Boolean.fromJson((JSON.parse("false"))));
      {((cond) => {if (!cond) throw new Error("assertion failed: f == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f,false)))};
      try {
        (await $std_Boolean.fromJson(123));
      }
      catch ($error_s) {
        const s = $error_s.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: s == PARSE_ERROR")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,$PARSE_ERROR)))};
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
      "value": "[[\"root/Default/Default/test:fromJson()\",\"${aws_lambda_function.testfromJson_Handler_ACD6C987.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testfromJson_Handler_IamRole_B9C3FE4B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson()/Handler/IamRole",
            "uniqueId": "testfromJson_Handler_IamRole_B9C3FE4B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testfromJson_Handler_IamRolePolicy_98ED7AC7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson()/Handler/IamRolePolicy",
            "uniqueId": "testfromJson_Handler_IamRolePolicy_98ED7AC7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testfromJson_Handler_IamRole_B9C3FE4B.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testfromJson_Handler_IamRolePolicyAttachment_DB66F55A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testfromJson_Handler_IamRolePolicyAttachment_DB66F55A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testfromJson_Handler_IamRole_B9C3FE4B.name}"
      }
    },
    "aws_lambda_function": {
      "testfromJson_Handler_ACD6C987": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson()/Handler/Default",
            "uniqueId": "testfromJson_Handler_ACD6C987"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8d3ce6e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8d3ce6e",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testfromJson_Handler_IamRole_B9C3FE4B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testfromJson_Handler_S3Object_7F3A23CC.key}",
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
      "testfromJson_Handler_S3Object_7F3A23CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson()/Handler/S3Object",
            "uniqueId": "testfromJson_Handler_S3Object_7F3A23CC"
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
            $PARSE_ERROR: ${context._lift(PARSE_ERROR)},
            $std_Boolean: ${context._lift(std.Boolean)},
            $std_Json: ${context._lift(std.Json)},
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
          $Closure1._registerBindObject(PARSE_ERROR, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const assertThrows = ((expected, block) => {
      let error = false;
      try {
        (block());
      }
      catch ($error_actual) {
        const actual = $error_actual.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected)))};
        error = true;
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
    });
    const PARSE_ERROR = "unable to parse number 123 as a boolean";
    const t = (std.Boolean.fromJson((JSON.parse("true"))));
    {((cond) => {if (!cond) throw new Error("assertion failed: t == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(t,true)))};
    (assertThrows(PARSE_ERROR,(() => {
      (std.Boolean.fromJson(123));
    })));
    const f = (std.Boolean.fromJson((JSON.parse("false"))));
    {((cond) => {if (!cond) throw new Error("assertion failed: f == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f,false)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:fromJson()",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bool", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, sourceDir: process.env['WING_SOURCE_DIR'] }).synth();

```

