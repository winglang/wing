# [shadowing.w](../../../../../examples/tests/valid/shadowing.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ bar }) {
  class $Inflight1 {
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
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ fn }) {
  class $Inflight2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const result = (await fn());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(result.length === 3)'`)})((result.length === 3))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await result.at(0)) === "hola!")'`)})(((await result.at(0)) === "hola!"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await result.at(1)) === "world")'`)})(((await result.at(1)) === "world"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await result.at(2)) === "bang")'`)})(((await result.at(2)) === "bang"))};
    }
  }
  return $Inflight2;
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
      "value": "[[\"root/Default/Default/test:capture shadow interaction\",\"${aws_lambda_function.root_testcaptureshadowinteraction_Handler_E8667920.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testcaptureshadowinteraction_Handler_IamRole_C25A6808": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/IamRole",
            "uniqueId": "root_testcaptureshadowinteraction_Handler_IamRole_C25A6808"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testcaptureshadowinteraction_Handler_IamRolePolicy_9EF406F6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/IamRolePolicy",
            "uniqueId": "root_testcaptureshadowinteraction_Handler_IamRolePolicy_9EF406F6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcaptureshadowinteraction_Handler_IamRole_C25A6808.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testcaptureshadowinteraction_Handler_IamRolePolicyAttachment_3D2035F3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testcaptureshadowinteraction_Handler_IamRolePolicyAttachment_3D2035F3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcaptureshadowinteraction_Handler_IamRole_C25A6808.name}"
      }
    },
    "aws_lambda_function": {
      "root_testcaptureshadowinteraction_Handler_E8667920": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/Default",
            "uniqueId": "root_testcaptureshadowinteraction_Handler_E8667920"
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
        "role": "${aws_iam_role.root_testcaptureshadowinteraction_Handler_IamRole_C25A6808.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcaptureshadowinteraction_Handler_S3Object_9107BDD6.key}",
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
      "root_testcaptureshadowinteraction_Handler_S3Object_9107BDD6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture shadow interaction/Handler/S3Object",
            "uniqueId": "root_testcaptureshadowinteraction_Handler_S3Object_9107BDD6"
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
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js";
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
          $Inflight1._registerBindObject(bar, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(bar, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight2.inflight.js";
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
            const $Inflight2Client = ${$Inflight2._toInflightType(this).text};
            const client = new $Inflight2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight2._registerBindObject(fn, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight2._registerBindObject(fn, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    const bar = "hola!";
    const foo = "not captured";
    const fn = new $Inflight1(this,"$Inflight1");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:capture shadow interaction",new $Inflight2(this,"$Inflight2"));
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

