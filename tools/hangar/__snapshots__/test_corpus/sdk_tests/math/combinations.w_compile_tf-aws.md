# [combinations.w](../../../../../../examples/tests/sdk_tests/math/combinations.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $math_Util, $population, $subset }) {
  class $Closure1 {
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.combinations(population, subset) == 10")})(((await $math_Util.combinations($population,$subset)) === 10))};
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
      "value": "[[\"root/Default/Default/test:inflight combinations\",\"${aws_lambda_function.root_testinflightcombinations_Handler_86BAD671.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightcombinations_Handler_IamRole_67AA0E2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight combinations/Handler/IamRole",
            "uniqueId": "root_testinflightcombinations_Handler_IamRole_67AA0E2E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightcombinations_Handler_IamRolePolicy_026A37F2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight combinations/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightcombinations_Handler_IamRolePolicy_026A37F2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightcombinations_Handler_IamRole_67AA0E2E.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightcombinations_Handler_IamRolePolicyAttachment_AA23CC42": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight combinations/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightcombinations_Handler_IamRolePolicyAttachment_AA23CC42"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightcombinations_Handler_IamRole_67AA0E2E.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightcombinations_Handler_86BAD671": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight combinations/Handler/Default",
            "uniqueId": "root_testinflightcombinations_Handler_86BAD671"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8a6ff13",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a6ff13",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightcombinations_Handler_IamRole_67AA0E2E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightcombinations_Handler_S3Object_52DC9AA0.key}",
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
      "root_testinflightcombinations_Handler_S3Object_52DC9AA0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight combinations/Handler/S3Object",
            "uniqueId": "root_testinflightcombinations_Handler_S3Object_52DC9AA0"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.combinations(population, subset) == 10")})(((math.Util.combinations(population,subset)) === 10))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight combinations",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "combinations", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

