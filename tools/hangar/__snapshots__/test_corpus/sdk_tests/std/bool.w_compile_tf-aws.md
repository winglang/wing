# [bool.w](../../../../../../examples/tests/sdk_tests/std/bool.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $PARSE_ERROR, $std_Boolean, $std_Json }) {
  class $Closure1 {
    async handle() {
      const t = (await $std_Boolean.fromJson((JSON.parse("true"))));
      {((cond) => {if (!cond) throw new Error("assertion failed: t == true")})((t === true))};
      const f = (await $std_Boolean.fromJson((JSON.parse("false"))));
      {((cond) => {if (!cond) throw new Error("assertion failed: f == false")})((f === false))};
      try {
        (await $std_Boolean.fromJson(123));
      }
      catch ($error_s) {
        const s = $error_s.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: s == PARSE_ERROR")})((s === $PARSE_ERROR))};
      }
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
      "value": "[[\"root/Default/Default/test:fromJson()\",\"${aws_lambda_function.root_testfromJson_Handler_594BF3FB.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testfromJson_Handler_IamRole_1169DC82": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson()/Handler/IamRole",
            "uniqueId": "root_testfromJson_Handler_IamRole_1169DC82"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testfromJson_Handler_IamRolePolicy_9E8ECAC5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson()/Handler/IamRolePolicy",
            "uniqueId": "root_testfromJson_Handler_IamRolePolicy_9E8ECAC5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testfromJson_Handler_IamRole_1169DC82.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testfromJson_Handler_IamRolePolicyAttachment_97C9DCAE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testfromJson_Handler_IamRolePolicyAttachment_97C9DCAE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testfromJson_Handler_IamRole_1169DC82.name}"
      }
    },
    "aws_lambda_function": {
      "root_testfromJson_Handler_594BF3FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson()/Handler/Default",
            "uniqueId": "root_testfromJson_Handler_594BF3FB"
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
        "role": "${aws_iam_role.root_testfromJson_Handler_IamRole_1169DC82.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testfromJson_Handler_S3Object_732F5422.key}",
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
      "root_testfromJson_Handler_S3Object_732F5422": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson()/Handler/S3Object",
            "uniqueId": "root_testfromJson_Handler_S3Object_732F5422"
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
        {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((actual === expected))};
        error = true;
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
    });
    const PARSE_ERROR = "unable to parse number 123 as a boolean";
    const t = (std.Boolean.fromJson((JSON.parse("true"))));
    {((cond) => {if (!cond) throw new Error("assertion failed: t == true")})((t === true))};
    (assertThrows(PARSE_ERROR,(() => {
      (std.Boolean.fromJson(123));
    })));
    const f = (std.Boolean.fromJson((JSON.parse("false"))));
    {((cond) => {if (!cond) throw new Error("assertion failed: f == false")})((f === false))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:fromJson()",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "bool", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

