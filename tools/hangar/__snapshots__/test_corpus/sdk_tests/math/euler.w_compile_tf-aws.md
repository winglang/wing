# [euler.w](../../../../../../examples/tests/sdk_tests/math/euler.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    async handle(interestRate, currentVal) {
      return (currentVal * ($math_Util.E ** interestRate));
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

## inflight.$Closure2.js
```js
module.exports = function({ $compoundOneYear, $interest, $math_Util, $value }) {
  class $Closure2 {
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(compoundOneYear(interest, value), decimalPlaces: 2) == 105.13")})(((await $math_Util.round((await $compoundOneYear($interest,$value)),{ decimalPlaces: 2 })) === 105.13))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
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
      "value": "[[\"root/Default/Default/test:EULER\",\"${aws_lambda_function.root_testEULER_Handler_30ECC143.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testEULER_Handler_IamRole_0FB8D2D6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:EULER/Handler/IamRole",
            "uniqueId": "root_testEULER_Handler_IamRole_0FB8D2D6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testEULER_Handler_IamRolePolicy_1B785233": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:EULER/Handler/IamRolePolicy",
            "uniqueId": "root_testEULER_Handler_IamRolePolicy_1B785233"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testEULER_Handler_IamRole_0FB8D2D6.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testEULER_Handler_IamRolePolicyAttachment_234F65DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:EULER/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testEULER_Handler_IamRolePolicyAttachment_234F65DD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testEULER_Handler_IamRole_0FB8D2D6.name}"
      }
    },
    "aws_lambda_function": {
      "root_testEULER_Handler_30ECC143": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:EULER/Handler/Default",
            "uniqueId": "root_testEULER_Handler_30ECC143"
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
        "role": "${aws_iam_role.root_testEULER_Handler_IamRole_0FB8D2D6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testEULER_Handler_S3Object_530E4C31.key}",
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
      "root_testEULER_Handler_S3Object_530E4C31": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:EULER/Handler/S3Object",
            "uniqueId": "root_testEULER_Handler_S3Object_530E4C31"
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
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
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
          $Closure2._registerBindObject(compoundOneYear, host, []);
          $Closure2._registerBindObject(interest, host, []);
          $Closure2._registerBindObject(value, host, []);
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        super._registerTypeBind(host, ops);
      }
    }
    const interest = 0.05;
    const value = 100;
    const compoundOneYear = new $Closure1(this,"$Closure1");
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, decimalPlaces: 3) == 2.718")})(((math.Util.round(math.Util.E,{ decimalPlaces: 3 })) === 2.718))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:EULER",new $Closure2(this,"$Closure2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "euler", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

