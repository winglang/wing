# [function_returns_function.w](../../../../examples/tests/valid/function_returns_function.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({  }) {
  class  $Inflight1 {
    constructor({  }) {
    }
    async handle()  {
      {
        const iFn = async (s) =>  {
          {
            return async () =>  {
              {
                return (s === "wing");
              }
            }
            ;
          }
        }
        ;
        const wingInflightFn = (typeof iFn === "function" ? await iFn("wing") : await iFn.handle("wing"));
        const dingInflightFn = (typeof iFn === "function" ? await iFn("ding") : await iFn.handle("ding"));
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(typeof wingInflightFn === "function" ? await wingInflightFn() : await wingInflightFn.handle())'`)})((typeof wingInflightFn === "function" ? await wingInflightFn() : await wingInflightFn.handle()))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(!(typeof dingInflightFn === "function" ? await dingInflightFn() : await dingInflightFn.handle()))'`)})((!(typeof dingInflightFn === "function" ? await dingInflightFn() : await dingInflightFn.handle())))};
      }
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
      "value": "[[\"root/Default/Default/test:inflight test\",\"${aws_lambda_function.root_testinflighttest_Handler_06A2D747.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflighttest_Handler_IamRole_E297BA6C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight test/Handler/IamRole",
            "uniqueId": "root_testinflighttest_Handler_IamRole_E297BA6C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflighttest_Handler_IamRolePolicy_28C4749B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight test/Handler/IamRolePolicy",
            "uniqueId": "root_testinflighttest_Handler_IamRolePolicy_28C4749B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflighttest_Handler_IamRole_E297BA6C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflighttest_Handler_IamRolePolicyAttachment_5DAC62CA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight test/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflighttest_Handler_IamRolePolicyAttachment_5DAC62CA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflighttest_Handler_IamRole_E297BA6C.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflighttest_Handler_06A2D747": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight test/Handler/Default",
            "uniqueId": "root_testinflighttest_Handler_06A2D747"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8137714"
          }
        },
        "function_name": "Handler-c8137714",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflighttest_Handler_IamRole_E297BA6C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflighttest_Handler_S3Object_18450128.key}",
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
      "root_testinflighttest_Handler_S3Object_18450128": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight test/Handler/S3Object",
            "uniqueId": "root_testinflighttest_Handler_S3Object_18450128"
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
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
        const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
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
    const fn =  (s) =>  {
      {
        return  () =>  {
          {
            return (s === "wing");
          }
        }
        ;
      }
    }
    ;
    const wingFn = (fn("wing"));
    const dingFn = (fn("ding"));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(wingFn())'`)})((wingFn()))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(!(dingFn()))'`)})((!(dingFn())))};
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:inflight test",new $Inflight1(this,"$Inflight1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "function_returns_function", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

