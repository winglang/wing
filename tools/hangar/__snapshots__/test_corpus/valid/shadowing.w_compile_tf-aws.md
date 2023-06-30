# [shadowing.w](../../../../../examples/tests/valid/shadowing.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ bar }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const result = [];
      (await result.push(bar));
      if (true) {
        const bar = "world";
        (await result.push(bar));
      }
      const foo = "bang";
      (await result.push(foo));
      return Object.freeze([...(result)]);
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ fn }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const result = (await fn());
      {((cond) => {if (!cond) throw new Error("assertion failed: result.length == 3")})((result.length === 3))};
      {((cond) => {if (!cond) throw new Error("assertion failed: result.at(0) == \"hola!\"")})(((await result.at(0)) === "hola!"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: result.at(1) == \"world\"")})(((await result.at(1)) === "world"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: result.at(2) == \"bang\"")})(((await result.at(2)) === "bang"))};
    }
  }
  return $Closure2;
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
      "value": "[[\"root/Default/Default/test:capture shadow interaction\",\"${aws_lambda_function.testcaptureshadowinteraction_Handler_9B768E38.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testcaptureshadowinteraction_Handler_IamRole_7A8AB102": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/IamRole",
            "uniqueId": "testcaptureshadowinteraction_Handler_IamRole_7A8AB102"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testcaptureshadowinteraction_Handler_IamRolePolicy_E2199BB8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/IamRolePolicy",
            "uniqueId": "testcaptureshadowinteraction_Handler_IamRolePolicy_E2199BB8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testcaptureshadowinteraction_Handler_IamRole_7A8AB102.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testcaptureshadowinteraction_Handler_IamRolePolicyAttachment_51CBDE42": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcaptureshadowinteraction_Handler_IamRolePolicyAttachment_51CBDE42"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcaptureshadowinteraction_Handler_IamRole_7A8AB102.name}"
      }
    },
    "aws_lambda_function": {
      "testcaptureshadowinteraction_Handler_9B768E38": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/Default",
            "uniqueId": "testcaptureshadowinteraction_Handler_9B768E38"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8807c1f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8807c1f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testcaptureshadowinteraction_Handler_IamRole_7A8AB102.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcaptureshadowinteraction_Handler_S3Object_ACDDE567.key}",
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
      "testcaptureshadowinteraction_Handler_S3Object_ACDDE567": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/S3Object",
            "uniqueId": "testcaptureshadowinteraction_Handler_S3Object_ACDDE567"
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
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const bar_client = context._lift(bar);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            bar: ${bar_client},
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
          $Closure1._registerBindObject(bar, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(bar, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const fn_client = context._lift(fn);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            fn: ${fn_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this).text};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Closure2._registerBindObject(fn, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(fn, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    const bar = "hola!";
    const foo = "not captured";
    const fn = new $Closure1(this,"$Closure1");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:capture shadow interaction",new $Closure2(this,"$Closure2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "shadowing", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

