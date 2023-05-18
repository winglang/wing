# [calling_inflight_variants.w](../../../../examples/tests/valid/calling_inflight_variants.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({  }) {
  class  $Inflight1 {
    constructor({  }) {
    }
    async handle()  {
      {
        return 1;
      }
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ foo }) {
  class  $Inflight2 {
    constructor({  }) {
    }
    async handle()  {
      {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((typeof foo.callFn === "function" ? await foo.callFn(true) : await foo.callFn.handle(true)) === 1)'`)})(((typeof foo.callFn === "function" ? await foo.callFn(true) : await foo.callFn.handle(true)) === 1))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((typeof foo.callFn === "function" ? await foo.callFn(false) : await foo.callFn.handle(false)) === 2)'`)})(((typeof foo.callFn === "function" ? await foo.callFn(false) : await foo.callFn.handle(false)) === 2))};
      }
    }
  }
  return $Inflight2;
}

```

## clients/Foo.inflight.js
```js
module.exports = function({  }) {
  class  Foo {
    constructor({ inflight1 }) {
      this.inflight1 = inflight1;
    }
    async $inflight_init()  {
      {
        const __parent_this = this;
        this.inflight2 = async () =>  {
          {
            return 2;
          }
        }
        ;
      }
    }
    async makeFn(x)  {
      {
        const __parent_this = this;
        if ((x === true)) {
          const __parent_this = this;
          return this.inflight1;
        }
        else {
          const __parent_this = this;
          return this.inflight2;
        }
      }
    }
    async callFn(x)  {
      {
        const __parent_this = this;
        const partialFn = (typeof this.makeFn === "function" ? await this.makeFn(x) : await this.makeFn.handle(x));
        return (typeof partialFn === "function" ? await partialFn() : await partialFn.handle());
      }
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
      "value": "[[\"root/Default/Default/test:calling different types of inflights\",\"${aws_lambda_function.root_testcallingdifferenttypesofinflights_Handler_DBCB80D6.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testcallingdifferenttypesofinflights_Handler_IamRole_C876572C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:calling different types of inflights/Handler/IamRole",
            "uniqueId": "root_testcallingdifferenttypesofinflights_Handler_IamRole_C876572C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testcallingdifferenttypesofinflights_Handler_IamRolePolicy_B273A100": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:calling different types of inflights/Handler/IamRolePolicy",
            "uniqueId": "root_testcallingdifferenttypesofinflights_Handler_IamRolePolicy_B273A100"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcallingdifferenttypesofinflights_Handler_IamRole_C876572C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testcallingdifferenttypesofinflights_Handler_IamRolePolicyAttachment_D16F3D91": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:calling different types of inflights/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testcallingdifferenttypesofinflights_Handler_IamRolePolicyAttachment_D16F3D91"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcallingdifferenttypesofinflights_Handler_IamRole_C876572C.name}"
      }
    },
    "aws_lambda_function": {
      "root_testcallingdifferenttypesofinflights_Handler_DBCB80D6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:calling different types of inflights/Handler/Default",
            "uniqueId": "root_testcallingdifferenttypesofinflights_Handler_DBCB80D6"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8f324e0"
          }
        },
        "function_name": "Handler-c8f324e0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testcallingdifferenttypesofinflights_Handler_IamRole_C876572C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcallingdifferenttypesofinflights_Handler_S3Object_45DA727C.key}",
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
      "root_testcallingdifferenttypesofinflights_Handler_S3Object_45DA727C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:calling different types of inflights/Handler/S3Object",
            "uniqueId": "root_testcallingdifferenttypesofinflights_Handler_S3Object_45DA727C"
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
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("makeFn", "callFn", "inflight2");
        const __parent_this = this;
        class $Inflight1 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
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
        this.inflight1 = new $Inflight1(this,"$Inflight1");
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Foo.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const inflight1_client = this._lift(this.inflight1);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this).text};
            const client = new FooClient({
              inflight1: ${inflight1_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.inflight1, host, []);
        }
        if (ops.includes("callFn")) {
        }
        if (ops.includes("makeFn")) {
          this._registerBindObject(this.inflight1, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight2.inflight.js".replace(/\\/g, "/");
        const foo_client = context._lift(foo);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            foo: ${foo_client},
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
        }
        if (ops.includes("handle")) {
          this._registerBindObject(foo, host, ["callFn"]);
        }
        super._registerBind(host, ops);
      }
    }
    const foo = new Foo(this,"Foo");
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:calling different types of inflights",new $Inflight2(this,"$Inflight2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "calling_inflight_variants", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

