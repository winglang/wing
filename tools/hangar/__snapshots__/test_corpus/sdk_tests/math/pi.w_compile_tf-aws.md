# [pi.w](../../../../../../examples/tests/sdk_tests/math/pi.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    async handle(radius) {
      return ((2 * $math_Util.PI) * radius);
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
module.exports = function({ $circumference, $math_Util, $r }) {
  class $Closure2 {
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(circumference(r), decimalPlaces: 2) == 62.83")})(((await $math_Util.round((await $circumference($r)),{ decimalPlaces: 2 })) === 62.83))};
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
      "value": "[[\"root/Default/Default/test:PI\",\"${aws_lambda_function.root_testPI_Handler_C1A72313.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testPI_Handler_IamRole_7C3616C7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:PI/Handler/IamRole",
            "uniqueId": "root_testPI_Handler_IamRole_7C3616C7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testPI_Handler_IamRolePolicy_DA04DEB1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:PI/Handler/IamRolePolicy",
            "uniqueId": "root_testPI_Handler_IamRolePolicy_DA04DEB1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testPI_Handler_IamRole_7C3616C7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testPI_Handler_IamRolePolicyAttachment_A7DF98EE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:PI/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testPI_Handler_IamRolePolicyAttachment_A7DF98EE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testPI_Handler_IamRole_7C3616C7.name}"
      }
    },
    "aws_lambda_function": {
      "root_testPI_Handler_C1A72313": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:PI/Handler/Default",
            "uniqueId": "root_testPI_Handler_C1A72313"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8f48054",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f48054",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testPI_Handler_IamRole_7C3616C7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testPI_Handler_S3Object_50792B75.key}",
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
      "root_testPI_Handler_S3Object_50792B75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:PI/Handler/S3Object",
            "uniqueId": "root_testPI_Handler_S3Object_50792B75"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.PI, decimalPlaces: 3) == 3.142")})(((math.Util.round(math.Util.PI,{ decimalPlaces: 3 })) === 3.142))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:PI",new $Closure2(this,"$Closure2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "pi", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

