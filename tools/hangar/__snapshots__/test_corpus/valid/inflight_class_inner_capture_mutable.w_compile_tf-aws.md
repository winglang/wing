# [inflight_class_inner_capture_mutable.w](../../../../../examples/tests/valid/inflight_class_inner_capture_mutable.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const y = [1];
      let i = 10;
      const Inner = require("./inflight.Inner.js")({y,i});
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await new Inner().dang()) === 11)'`)})(((await new Inner().dang()) === 11))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await y.at(1)) === 2)'`)})(((await y.at(1)) === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(i === 10)'`)})((i === 10))};
    }
  }
  return $Closure1;
}

```

## inflight.Inner.js
```js
module.exports = function({ y, i }) {
  class Inner {
     constructor()  {
    }
    async dang()  {
      (await y.push(2));
      i = (i + 1);
      return ((await y.at(0)) + 10);
    }
  }
  return Inner;
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
      "value": "[[\"root/Default/Default/test:inner inflight class capture immutable\",\"${aws_lambda_function.root_testinnerinflightclasscaptureimmutable_Handler_C3337584.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinnerinflightclasscaptureimmutable_Handler_IamRole_EC2815FE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inner inflight class capture immutable/Handler/IamRole",
            "uniqueId": "root_testinnerinflightclasscaptureimmutable_Handler_IamRole_EC2815FE"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinnerinflightclasscaptureimmutable_Handler_IamRolePolicy_DE3303E1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inner inflight class capture immutable/Handler/IamRolePolicy",
            "uniqueId": "root_testinnerinflightclasscaptureimmutable_Handler_IamRolePolicy_DE3303E1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinnerinflightclasscaptureimmutable_Handler_IamRole_EC2815FE.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinnerinflightclasscaptureimmutable_Handler_IamRolePolicyAttachment_F9D25435": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inner inflight class capture immutable/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinnerinflightclasscaptureimmutable_Handler_IamRolePolicyAttachment_F9D25435"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinnerinflightclasscaptureimmutable_Handler_IamRole_EC2815FE.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinnerinflightclasscaptureimmutable_Handler_C3337584": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inner inflight class capture immutable/Handler/Default",
            "uniqueId": "root_testinnerinflightclasscaptureimmutable_Handler_C3337584"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c88a8b71"
          }
        },
        "function_name": "Handler-c88a8b71",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinnerinflightclasscaptureimmutable_Handler_IamRole_EC2815FE.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinnerinflightclasscaptureimmutable_Handler_S3Object_BD655752.key}",
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
      "root_testinnerinflightclasscaptureimmutable_Handler_S3Object_BD655752": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inner inflight class capture immutable/Handler/S3Object",
            "uniqueId": "root_testinnerinflightclasscaptureimmutable_Handler_S3Object_BD655752"
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inner inflight class capture immutable",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "inflight_class_inner_capture_mutable", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

