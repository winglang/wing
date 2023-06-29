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
      {((cond) => {if (!cond) throw new Error("assertion failed: x.getValue() == myConst")})(((await x.getValue()) === myConst))};
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
    }
    async getValue()  {
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
      "value": "[[\"root/Default/Default/test:inflight class captures const\",\"${aws_lambda_function.testinflightclasscapturesconst_Handler_17207FA8.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightclasscapturesconst_Handler_IamRole_1218DA8A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures const/Handler/IamRole",
            "uniqueId": "testinflightclasscapturesconst_Handler_IamRole_1218DA8A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightclasscapturesconst_Handler_IamRolePolicy_7A96DC9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures const/Handler/IamRolePolicy",
            "uniqueId": "testinflightclasscapturesconst_Handler_IamRolePolicy_7A96DC9C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightclasscapturesconst_Handler_IamRole_1218DA8A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightclasscapturesconst_Handler_IamRolePolicyAttachment_C7CD4A0F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures const/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightclasscapturesconst_Handler_IamRolePolicyAttachment_C7CD4A0F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightclasscapturesconst_Handler_IamRole_1218DA8A.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightclasscapturesconst_Handler_17207FA8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures const/Handler/Default",
            "uniqueId": "testinflightclasscapturesconst_Handler_17207FA8"
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
        "role": "${aws_iam_role.testinflightclasscapturesconst_Handler_IamRole_1218DA8A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightclasscapturesconst_Handler_S3Object_30E91D8B.key}",
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
      "testinflightclasscapturesconst_Handler_S3Object_30E91D8B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures const/Handler/S3Object",
            "uniqueId": "testinflightclasscapturesconst_Handler_S3Object_30E91D8B"
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
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("getValue");
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

