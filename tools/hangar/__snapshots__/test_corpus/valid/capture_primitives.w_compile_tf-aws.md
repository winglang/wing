# [capture_primitives.w](../../../../../examples/tests/valid/capture_primitives.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ myStr, myNum, mySecondBool, myBool, myDur }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(s)  {
      {console.log(myStr)};
      const n = myNum;
      {console.log(String.raw({ raw: ["", ""] }, n))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mySecondBool == false")})((mySecondBool === false))};
      if (myBool) {
        {console.log("bool=true")};
      }
      else {
        {console.log("bool=false")};
      }
      const min = myDur.minutes;
      const sec = myDur.seconds;
      const hr = myDur.hours;
      const split = (await String.raw({ raw: ["min=", " sec=", " hr=", ""] }, min, sec, hr).split(" "));
      {((cond) => {if (!cond) throw new Error("assertion failed: split.length == 3")})((split.length === 3))};
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
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "cloudFunction_IamRole_5A4430DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRole",
            "uniqueId": "cloudFunction_IamRole_5A4430DC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudFunction_IamRolePolicy_618BF987": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "cloudFunction_IamRolePolicy_618BF987"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudFunction_IamRolePolicyAttachment_288B9653": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "cloudFunction_IamRolePolicyAttachment_288B9653"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.name}"
      }
    },
    "aws_lambda_function": {
      "cloudFunction": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/Default",
            "uniqueId": "cloudFunction"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Function-c8d2eca1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8d2eca1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudFunction_S3Object_71908BAD.key}",
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
      "cloudFunction_S3Object_71908BAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/S3Object",
            "uniqueId": "cloudFunction_S3Object_71908BAD"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
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
        const myStr_client = context._lift(myStr);
        const myNum_client = context._lift(myNum);
        const mySecondBool_client = context._lift(mySecondBool);
        const myBool_client = context._lift(myBool);
        const myDur_client = context._lift(myDur);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            myStr: ${myStr_client},
            myNum: ${myNum_client},
            mySecondBool: ${mySecondBool_client},
            myBool: ${myBool_client},
            myDur: ${myDur_client},
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
          $Closure1._registerBindObject(myBool, host, []);
          $Closure1._registerBindObject(myDur, host, []);
          $Closure1._registerBindObject(myNum, host, []);
          $Closure1._registerBindObject(mySecondBool, host, []);
          $Closure1._registerBindObject(myStr, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(myBool, host, []);
          $Closure1._registerBindObject(myDur, host, []);
          $Closure1._registerBindObject(myNum, host, []);
          $Closure1._registerBindObject(mySecondBool, host, []);
          $Closure1._registerBindObject(myStr, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const myStr = "hello, string";
    const myNum = 1234;
    const myBool = true;
    const mySecondBool = false;
    const myDur = (std.Duration.fromSeconds(600));
    const handler = new $Closure1(this,"$Closure1");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",handler);
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "capture_primitives", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

