# [test_without_bring.w](../../../../examples/tests/valid/test_without_bring.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({  }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'true'`)})(true)};
    }
  }
  return $Inflight1;
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
      "value": "[[\"root/Default/Default/test:hello test\",\"${aws_lambda_function.root_testhellotest_Handler_A1EDD8CF.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testhellotest_Handler_IamRole_2903B933": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello test/Handler/IamRole",
            "uniqueId": "root_testhellotest_Handler_IamRole_2903B933"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testhellotest_Handler_IamRolePolicy_DB5486F4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello test/Handler/IamRolePolicy",
            "uniqueId": "root_testhellotest_Handler_IamRolePolicy_DB5486F4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testhellotest_Handler_IamRole_2903B933.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testhellotest_Handler_IamRolePolicyAttachment_30E4F47D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello test/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testhellotest_Handler_IamRolePolicyAttachment_30E4F47D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testhellotest_Handler_IamRole_2903B933.name}"
      }
    },
    "aws_lambda_function": {
      "root_testhellotest_Handler_A1EDD8CF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello test/Handler/Default",
            "uniqueId": "root_testhellotest_Handler_A1EDD8CF"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8123dd7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8123dd7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testhellotest_Handler_IamRole_2903B933.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testhellotest_Handler_S3Object_7FB6518B.key}",
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
      "root_testhellotest_Handler_S3Object_7FB6518B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello test/Handler/S3Object",
            "uniqueId": "root_testhellotest_Handler_S3Object_7FB6518B"
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
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight1Client = ${$Inflight1._toInflightType(this).text};
            const client = new $Inflight1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:hello test",new $Inflight1(this,"$Inflight1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "test_without_bring", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

