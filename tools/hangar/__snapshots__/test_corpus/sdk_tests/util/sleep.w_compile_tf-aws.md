# [sleep.w](../../../../../../examples/tests/sdk_tests/util/sleep.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $JSHelper, $oneHundredMiliseconds, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const start = (await $JSHelper.getTime());
      (await $util_Util.sleep($oneHundredMiliseconds));
      const end = (await $JSHelper.getTime());
      const delta = (end - start);
      {((cond) => {if (!cond) throw new Error("assertion failed: delta >= 100")})((delta >= 100))};
    }
  }
  return $Closure1;
}

```

## inflight.JSHelper-1.js
```js
module.exports = function({  }) {
  class JSHelper {
    constructor({  }) {
    }
    static async getTime() {
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
      "value": "[[\"root/Default/Default/test:sleep 100 mili seconds\",\"${aws_lambda_function.testsleep100miliseconds_Handler_F390CA22.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testsleep100miliseconds_Handler_IamRole_4A0A8D88": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sleep 100 mili seconds/Handler/IamRole",
            "uniqueId": "testsleep100miliseconds_Handler_IamRole_4A0A8D88"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testsleep100miliseconds_Handler_IamRolePolicy_2690041A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sleep 100 mili seconds/Handler/IamRolePolicy",
            "uniqueId": "testsleep100miliseconds_Handler_IamRolePolicy_2690041A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testsleep100miliseconds_Handler_IamRole_4A0A8D88.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testsleep100miliseconds_Handler_IamRolePolicyAttachment_813D87C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sleep 100 mili seconds/Handler/IamRolePolicyAttachment",
            "uniqueId": "testsleep100miliseconds_Handler_IamRolePolicyAttachment_813D87C8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testsleep100miliseconds_Handler_IamRole_4A0A8D88.name}"
      }
    },
    "aws_lambda_function": {
      "testsleep100miliseconds_Handler_F390CA22": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sleep 100 mili seconds/Handler/Default",
            "uniqueId": "testsleep100miliseconds_Handler_F390CA22"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e32fa2",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e32fa2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testsleep100miliseconds_Handler_IamRole_4A0A8D88.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testsleep100miliseconds_Handler_S3Object_2E151A52.key}",
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
      "testsleep100miliseconds_Handler_S3Object_2E151A52": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sleep 100 mili seconds/Handler/S3Object",
            "uniqueId": "testsleep100miliseconds_Handler_S3Object_2E151A52"
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
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class JSHelper extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.JSHelper-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const JSHelperClient = ${JSHelper._toInflightType(this)};
            const client = new JSHelperClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["getTime", "$inflight_init"];
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $JSHelper: ${context._lift(JSHelper)},
            $oneHundredMiliseconds: ${context._lift(oneHundredMiliseconds)},
            $util_Util: ${context._lift(util.Util)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(JSHelper, host, ["getTime"]);
          $Closure1._registerBindObject(oneHundredMiliseconds, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const oneHundredMiliseconds = (std.Duration.fromSeconds(0.1));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:sleep 100 mili seconds",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "sleep", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

