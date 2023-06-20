# [env.w](../../../../../../examples/tests/sdk_tests/util/env.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ RANDOM, NIL, util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await util_Util.env("WING_TARGET")).length > 0)'`)})(((await util_Util.env("WING_TARGET")).length > 0))};
      const noValue = ((await util_Util.tryEnv(RANDOM)) ?? NIL);
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(noValue === NIL)'`)})((noValue === NIL))};
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
      "value": "[[\"root/Default/Default/test:use util from inflight\",\"${aws_lambda_function.root_testuseutilfrominflight_Handler_D483C462.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testuseutilfrominflight_Handler_IamRole_9A472AAE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:use util from inflight/Handler/IamRole",
            "uniqueId": "root_testuseutilfrominflight_Handler_IamRole_9A472AAE"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testuseutilfrominflight_Handler_IamRolePolicy_A01DB43A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:use util from inflight/Handler/IamRolePolicy",
            "uniqueId": "root_testuseutilfrominflight_Handler_IamRolePolicy_A01DB43A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testuseutilfrominflight_Handler_IamRole_9A472AAE.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testuseutilfrominflight_Handler_IamRolePolicyAttachment_52E62571": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:use util from inflight/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testuseutilfrominflight_Handler_IamRolePolicyAttachment_52E62571"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testuseutilfrominflight_Handler_IamRole_9A472AAE.name}"
      }
    },
    "aws_lambda_function": {
      "root_testuseutilfrominflight_Handler_D483C462": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:use util from inflight/Handler/Default",
            "uniqueId": "root_testuseutilfrominflight_Handler_D483C462"
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
        "role": "${aws_iam_role.root_testuseutilfrominflight_Handler_IamRole_9A472AAE.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testuseutilfrominflight_Handler_S3Object_7B8CA2C3.key}",
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
      "root_testuseutilfrominflight_Handler_S3Object_7B8CA2C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:use util from inflight/Handler/S3Object",
            "uniqueId": "root_testuseutilfrominflight_Handler_S3Object_7B8CA2C3"
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
const util = require('@winglang/sdk').util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const RANDOM_client = context._lift(RANDOM);
        const NIL_client = context._lift(NIL);
        const util_UtilClient = util.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            RANDOM: ${RANDOM_client},
            NIL: ${NIL_client},
            util_Util: ${util_UtilClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure1._registerBindObject(NIL, host, []);
          $Closure1._registerBindObject(RANDOM, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(NIL, host, []);
          $Closure1._registerBindObject(RANDOM, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const RANDOM = "RANDOM123412121212kjhkjskdjkj";
    const NIL = "<<NIL>>";
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((util.Util.env("PATH")).length > 0)'`)})(((util.Util.env("PATH")).length > 0))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((util.Util.env("MY_VAR")) === "my value")'`)})(((util.Util.env("MY_VAR")) === "my value"))};
    let failed = false;
    try {
      (util.Util.env(RANDOM));
    }
    catch {
      failed = true;
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: 'failed'`)})(failed)};
    const no_value = ((util.Util.tryEnv(RANDOM)) ?? NIL);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(no_value === NIL)'`)})((no_value === NIL))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:use util from inflight",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "env", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

