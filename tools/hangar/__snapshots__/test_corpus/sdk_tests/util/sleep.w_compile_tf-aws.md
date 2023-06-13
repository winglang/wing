# [sleep.w](../../../../../../examples/tests/sdk_tests/util/sleep.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ oneHundredMiliseconds, JSHelper, util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const start = (await JSHelper.getTime());
      (await util_Util.sleep(oneHundredMiliseconds));
      const end = (await JSHelper.getTime());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((end - start) > 80)'`)})(((end - start) > 80))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((end - start) < 120)'`)})(((end - start) < 120))};
    }
  }
  return $Closure1;
}

```

## inflight.JSHelper.js
```js
module.exports = function({  }) {
  class JSHelper {
    constructor({  }) {
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
    static async getTime()  {
      return (require("<ABSOLUTE_PATH>/sleep-helper.js")["getTime"])()
    }
  }
  return JSHelper;
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
      "value": "[[\"root/Default/Default/test:sleep a second\",\"${aws_lambda_function.root_testsleepasecond_Handler_FA70B9B3.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testsleepasecond_Handler_IamRole_678A5F7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sleep a second/Handler/IamRole",
            "uniqueId": "root_testsleepasecond_Handler_IamRole_678A5F7E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testsleepasecond_Handler_IamRolePolicy_D5914762": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sleep a second/Handler/IamRolePolicy",
            "uniqueId": "root_testsleepasecond_Handler_IamRolePolicy_D5914762"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testsleepasecond_Handler_IamRole_678A5F7E.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testsleepasecond_Handler_IamRolePolicyAttachment_0F68F6D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sleep a second/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testsleepasecond_Handler_IamRolePolicyAttachment_0F68F6D7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testsleepasecond_Handler_IamRole_678A5F7E.name}"
      }
    },
    "aws_lambda_function": {
      "root_testsleepasecond_Handler_FA70B9B3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sleep a second/Handler/Default",
            "uniqueId": "root_testsleepasecond_Handler_FA70B9B3"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c85ac078",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85ac078",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testsleepasecond_Handler_IamRole_678A5F7E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testsleepasecond_Handler_S3Object_9ECEE30B.key}",
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
      "root_testsleepasecond_Handler_S3Object_9ECEE30B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sleep a second/Handler/S3Object",
            "uniqueId": "root_testsleepasecond_Handler_S3Object_9ECEE30B"
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
    class JSHelper extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("getTime");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.JSHelper.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const JSHelperClient = ${JSHelper._toInflightType(this).text};
            const client = new JSHelperClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("getTime")) {
        }
        super._registerTypeBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const oneHundredMiliseconds_client = context._lift(oneHundredMiliseconds);
        const JSHelperClient = JSHelper._toInflightType(context);
        const util_UtilClient = util.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            oneHundredMiliseconds: ${oneHundredMiliseconds_client},
            JSHelper: ${JSHelperClient.text},
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
          $Closure1._registerBindObject(oneHundredMiliseconds, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(JSHelper, host, ["getTime"]);
          $Closure1._registerBindObject(oneHundredMiliseconds, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const oneHundredMiliseconds = $stdlib.std.Duration.fromSeconds(0.1);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:sleep a second",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "sleep", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

