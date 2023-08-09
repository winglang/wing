# [combinations.w](../../../../../../examples/tests/sdk_tests/math/combinations.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $math_Util, $population, $subset }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.combinations(population, subset) == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.combinations($population,$subset)),10)))};
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
      "value": "[[\"root/undefined/Default/test:inflight combinations\",\"${aws_lambda_function.undefined_testinflightcombinations_Handler_C449CFA3.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testinflightcombinations_Handler_IamRole_F1786620": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight combinations/Handler/IamRole",
            "uniqueId": "undefined_testinflightcombinations_Handler_IamRole_F1786620"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinflightcombinations_Handler_IamRolePolicy_B5168FDD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight combinations/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightcombinations_Handler_IamRolePolicy_B5168FDD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightcombinations_Handler_IamRole_F1786620.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinflightcombinations_Handler_IamRolePolicyAttachment_5CBA0DC3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight combinations/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightcombinations_Handler_IamRolePolicyAttachment_5CBA0DC3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightcombinations_Handler_IamRole_F1786620.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinflightcombinations_Handler_C449CFA3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight combinations/Handler/Default",
            "uniqueId": "undefined_testinflightcombinations_Handler_C449CFA3"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c883bbe0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c883bbe0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightcombinations_Handler_IamRole_F1786620.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightcombinations_Handler_S3Object_61DBB845.key}",
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
      "undefined_testinflightcombinations_Handler_S3Object_61DBB845": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight combinations/Handler/S3Object",
            "uniqueId": "undefined_testinflightcombinations_Handler_S3Object_61DBB845"
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
            $population: ${context._lift(population)},
            $subset: ${context._lift(subset)},
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
          $Closure1._registerBindObject(population, host, []);
          $Closure1._registerBindObject(subset, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const population = 5;
    const subset = 3;
    {((cond) => {if (!cond) throw new Error("assertion failed: math.combinations(population, subset) == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.combinations(population,subset)),10)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight combinations",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "combinations", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

