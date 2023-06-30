# [enums.w](../../../../../examples/tests/valid/enums.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ one, two, SomeEnum }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: one == SomeEnum.ONE")})((one === SomeEnum.ONE))};
      {((cond) => {if (!cond) throw new Error("assertion failed: two == SomeEnum.TWO")})((two === SomeEnum.TWO))};
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
      "value": "[[\"root/Default/Default/test:inflight\",\"${aws_lambda_function.root_testinflight_Handler_75584D7C.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflight_Handler_IamRole_52AF7859": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight/Handler/IamRole",
            "uniqueId": "root_testinflight_Handler_IamRole_52AF7859"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflight_Handler_IamRolePolicy_877E2F83": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight/Handler/IamRolePolicy",
            "uniqueId": "root_testinflight_Handler_IamRolePolicy_877E2F83"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflight_Handler_IamRole_52AF7859.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflight_Handler_IamRolePolicyAttachment_C597EE77": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflight_Handler_IamRolePolicyAttachment_C597EE77"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflight_Handler_IamRole_52AF7859.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflight_Handler_75584D7C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight/Handler/Default",
            "uniqueId": "root_testinflight_Handler_75584D7C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c85726ab",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85726ab",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflight_Handler_IamRole_52AF7859.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflight_Handler_S3Object_62C42629.key}",
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
      "root_testinflight_Handler_S3Object_62C42629": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight/Handler/S3Object",
            "uniqueId": "root_testinflight_Handler_S3Object_62C42629"
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
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const one_client = context._lift(one);
        const two_client = context._lift(two);
        const SomeEnumClient = $stdlib.core.NodeJsCode.fromInline(`
          Object.freeze((function (tmp) {
            tmp[tmp["ONE"] = 0] = "ONE";
            tmp[tmp["TWO"] = 1] = "TWO";
            tmp[tmp["THREE"] = 2] = "THREE";
            return tmp;
          })({}))
        `);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            one: ${one_client},
            two: ${two_client},
            SomeEnum: ${SomeEnumClient.text},
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
          $Closure1._registerBindObject(one, host, []);
          $Closure1._registerBindObject(two, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(one, host, []);
          $Closure1._registerBindObject(two, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const SomeEnum = 
      Object.freeze((function (tmp) {
        tmp[tmp["ONE"] = 0] = "ONE";
        tmp[tmp["TWO"] = 1] = "TWO";
        tmp[tmp["THREE"] = 2] = "THREE";
        return tmp;
      })({}))
    ;
    const one = SomeEnum.ONE;
    const two = SomeEnum.TWO;
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "enums", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

