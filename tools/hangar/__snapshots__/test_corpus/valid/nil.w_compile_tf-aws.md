# [nil.w](../../../../../examples/tests/valid/nil.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ foo }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((((await foo.returnNil(true))) != null) === true)'`)})(((((await foo.returnNil(true))) != null) === true))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((((await foo.returnNil(false))) != null) === false)'`)})(((((await foo.returnNil(false))) != null) === false))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ foo }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((((await foo.getOptionalValue())) != null) === false)'`)})(((((await foo.getOptionalValue())) != null) === false))};
      (await foo.setOptionalValue("hello"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((((await foo.getOptionalValue())) != null) === true)'`)})(((((await foo.getOptionalValue())) != null) === true))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await foo.getOptionalValue()) !== undefined)'`)})(((await foo.getOptionalValue()) !== undefined))};
      (await foo.setOptionalValue(undefined));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((((await foo.getOptionalValue())) != null) === false)'`)})(((((await foo.getOptionalValue())) != null) === false))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await foo.getOptionalValue()) === undefined)'`)})(((await foo.getOptionalValue()) === undefined))};
    }
  }
  return $Closure2;
}

```

## inflight.Foo.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
    async $inflight_init()  {
      const __parent_this = this;
      this.optionalVar = undefined;
    }
    async returnNil(t)  {
      const __parent_this = this;
      if (t) {
        const __parent_this = this;
        return "hello";
      }
      return undefined;
    }
    async setOptionalValue(msg)  {
      const __parent_this = this;
      this.optionalVar = msg;
    }
    async getOptionalValue()  {
      const __parent_this = this;
      return this.optionalVar;
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
      "value": "[[\"root/Default/Default/test:nil return\",\"${aws_lambda_function.root_testnilreturn_Handler_3225915F.arn}\"],[\"root/Default/Default/test:optional instance variable\",\"${aws_lambda_function.root_testoptionalinstancevariable_Handler_47D78041.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testnilreturn_Handler_IamRole_47507CA4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:nil return/Handler/IamRole",
            "uniqueId": "root_testnilreturn_Handler_IamRole_47507CA4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testoptionalinstancevariable_Handler_IamRole_191EFCE1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:optional instance variable/Handler/IamRole",
            "uniqueId": "root_testoptionalinstancevariable_Handler_IamRole_191EFCE1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testnilreturn_Handler_IamRolePolicy_B6986683": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:nil return/Handler/IamRolePolicy",
            "uniqueId": "root_testnilreturn_Handler_IamRolePolicy_B6986683"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testnilreturn_Handler_IamRole_47507CA4.name}"
      },
      "root_testoptionalinstancevariable_Handler_IamRolePolicy_588B9479": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:optional instance variable/Handler/IamRolePolicy",
            "uniqueId": "root_testoptionalinstancevariable_Handler_IamRolePolicy_588B9479"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testoptionalinstancevariable_Handler_IamRole_191EFCE1.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testnilreturn_Handler_IamRolePolicyAttachment_E13D851A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:nil return/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testnilreturn_Handler_IamRolePolicyAttachment_E13D851A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testnilreturn_Handler_IamRole_47507CA4.name}"
      },
      "root_testoptionalinstancevariable_Handler_IamRolePolicyAttachment_EEBB1730": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:optional instance variable/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testoptionalinstancevariable_Handler_IamRolePolicyAttachment_EEBB1730"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testoptionalinstancevariable_Handler_IamRole_191EFCE1.name}"
      }
    },
    "aws_lambda_function": {
      "root_testnilreturn_Handler_3225915F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:nil return/Handler/Default",
            "uniqueId": "root_testnilreturn_Handler_3225915F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8668556",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8668556",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testnilreturn_Handler_IamRole_47507CA4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testnilreturn_Handler_S3Object_DEC9B907.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testoptionalinstancevariable_Handler_47D78041": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:optional instance variable/Handler/Default",
            "uniqueId": "root_testoptionalinstancevariable_Handler_47D78041"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8a1de9c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a1de9c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testoptionalinstancevariable_Handler_IamRole_191EFCE1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testoptionalinstancevariable_Handler_S3Object_938977CF.key}",
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
      "root_testnilreturn_Handler_S3Object_DEC9B907": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:nil return/Handler/S3Object",
            "uniqueId": "root_testnilreturn_Handler_S3Object_DEC9B907"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testoptionalinstancevariable_Handler_S3Object_938977CF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:optional instance variable/Handler/S3Object",
            "uniqueId": "root_testoptionalinstancevariable_Handler_S3Object_938977CF"
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
        this._addInflightOps("returnNil", "setOptionalValue", "getOptionalValue", "optionalVar");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Foo.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        }
        if (ops.includes("getOptionalValue")) {
        }
        if (ops.includes("returnNil")) {
        }
        if (ops.includes("setOptionalValue")) {
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
          $Closure1._registerBindObject(foo, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(foo, host, ["returnNil"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
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
          $Closure2._registerBindObject(foo, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(foo, host, ["getOptionalValue", "setOptionalValue"]);
        }
        super._registerBind(host, ops);
      }
    }
    const foo = new Foo(this,"Foo");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:nil return",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:optional instance variable",new $Closure2(this,"$Closure2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "nil", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

