# [euler.w](../../../../../../examples/tests/sdk_tests/math/euler.w) | compile | tf-aws

## inflight.$Closure1-74bbf574.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(interestRate, currentVal) {
      return (currentVal * ($math_Util.E ** interestRate));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-74bbf574.js
```js
module.exports = function({ $compoundOneYear, $interest, $math_Util, $value }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(compoundOneYear(interest, value), decimalPlaces: 2) == 105.13")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.round((await $compoundOneYear($interest,$value)),{ decimalPlaces: 2 })),105.13)))};
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
      "value": "[[\"root/Default/Default/test:EULER\",\"${aws_lambda_function.testEULER_Handler_7DE24200.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testEULER_Handler_IamRole_ED3CFA98": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:EULER/Handler/IamRole",
            "uniqueId": "testEULER_Handler_IamRole_ED3CFA98"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testEULER_Handler_IamRolePolicy_53F6F25E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:EULER/Handler/IamRolePolicy",
            "uniqueId": "testEULER_Handler_IamRolePolicy_53F6F25E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testEULER_Handler_IamRole_ED3CFA98.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testEULER_Handler_IamRolePolicyAttachment_00CBFA14": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:EULER/Handler/IamRolePolicyAttachment",
            "uniqueId": "testEULER_Handler_IamRolePolicyAttachment_00CBFA14"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testEULER_Handler_IamRole_ED3CFA98.name}"
      }
    },
    "aws_lambda_function": {
      "testEULER_Handler_7DE24200": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:EULER/Handler/Default",
            "uniqueId": "testEULER_Handler_7DE24200"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c80e7a9d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c80e7a9d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testEULER_Handler_IamRole_ED3CFA98.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testEULER_Handler_S3Object_A010D852.key}",
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
      "testEULER_Handler_S3Object_A010D852": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:EULER/Handler/S3Object",
            "uniqueId": "testEULER_Handler_S3Object_A010D852"
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
          require("./inflight.$Closure1-74bbf574.js")({
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
          require("./inflight.$Closure2-74bbf574.js")({
            $compoundOneYear: ${context._lift(compoundOneYear)},
            $interest: ${context._lift(interest)},
            $math_Util: ${context._lift(math.Util)},
            $value: ${context._lift(value)},
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
          $Closure2._registerBindObject(compoundOneYear, host, ["handle"]);
          $Closure2._registerBindObject(interest, host, []);
          $Closure2._registerBindObject(value, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const interest = 0.05;
    const value = 100;
    const compoundOneYear = new $Closure1(this,"$Closure1");
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, decimalPlaces: 3) == 2.718")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.round(math.Util.E,{ decimalPlaces: 3 })),2.718)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:EULER",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "euler", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

