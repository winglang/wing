# [inflight_class_capture_const.w](../../../../../examples/tests/valid/inflight_class_capture_const.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ myConst, Foo }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const x = new Foo();
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await x.getValue()) === myConst)'`)})(((await x.getValue()) === myConst))};
    }
  }
  return $Closure1;
}

```

## inflight.Foo.js
```js
module.exports = function({ myConst }) {
  class Foo {
     constructor()  {
      const __parent_this = this;
    }
    async getValue()  {
      const __parent_this = this;
      return myConst;
    }
  }
  return Foo;
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
      "value": "[[\"root/Default/Default/test:inflight class captures const\",\"${aws_lambda_function.root_testinflightclasscapturesconst_Handler_E42B6854.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightclasscapturesconst_Handler_IamRole_23E263B8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures const/Handler/IamRole",
            "uniqueId": "root_testinflightclasscapturesconst_Handler_IamRole_23E263B8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightclasscapturesconst_Handler_IamRolePolicy_627696DB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures const/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightclasscapturesconst_Handler_IamRolePolicy_627696DB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightclasscapturesconst_Handler_IamRole_23E263B8.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightclasscapturesconst_Handler_IamRolePolicyAttachment_35054A30": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures const/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightclasscapturesconst_Handler_IamRolePolicyAttachment_35054A30"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightclasscapturesconst_Handler_IamRole_23E263B8.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightclasscapturesconst_Handler_E42B6854": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures const/Handler/Default",
            "uniqueId": "root_testinflightclasscapturesconst_Handler_E42B6854"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e53a58",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e53a58",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightclasscapturesconst_Handler_IamRole_23E263B8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightclasscapturesconst_Handler_S3Object_AF634718.key}",
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
      "root_testinflightclasscapturesconst_Handler_S3Object_AF634718": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures const/Handler/S3Object",
            "uniqueId": "root_testinflightclasscapturesconst_Handler_S3Object_AF634718"
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
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("getValue");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Foo.js";
        const myConst_client = context._lift(myConst);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            myConst: ${myConst_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this).text};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Foo._registerBindObject(myConst, host, []);
        }
        if (ops.includes("getValue")) {
          Foo._registerBindObject(myConst, host, []);
        }
        super._registerBind(host, ops);
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
        const myConst_client = context._lift(myConst);
        const FooClient = Foo._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            myConst: ${myConst_client},
            Foo: ${FooClient.text},
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
          $Closure1._registerBindObject(myConst, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(myConst, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const myConst = "bang bang";
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight class captures const",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "inflight_class_capture_const", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

