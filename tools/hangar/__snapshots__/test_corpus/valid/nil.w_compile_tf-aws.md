# [nil.w](../../../../../examples/tests/valid/nil.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $foo }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.returnNil(true)? == true")})(((((await $foo.returnNil(true))) != null) === true))};
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.returnNil(false)? == false")})(((((await $foo.returnNil(false))) != null) === false))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $foo }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.getOptionalValue()? == false")})(((((await $foo.getOptionalValue())) != null) === false))};
      (await $foo.setOptionalValue("hello"));
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.getOptionalValue()? == true")})(((((await $foo.getOptionalValue())) != null) === true))};
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.getOptionalValue() != nil")})(((await $foo.getOptionalValue()) !== undefined))};
      (await $foo.setOptionalValue(undefined));
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.getOptionalValue()? == false")})(((((await $foo.getOptionalValue())) != null) === false))};
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.getOptionalValue() == nil")})(((await $foo.getOptionalValue()) === undefined))};
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
    async returnNil(t) {
      if (t) {
        return "hello";
      }
      return undefined;
    }
    async setOptionalValue(msg) {
      this.optionalVar = msg;
    }
    async getOptionalValue() {
      return this.optionalVar;
    }
    async $inflight_init() {
      this.optionalVar = undefined;
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
      "value": "[[\"root/Default/Default/test:nil return\",\"${aws_lambda_function.testnilreturn_Handler_C1CE87DB.arn}\"],[\"root/Default/Default/test:optional instance variable\",\"${aws_lambda_function.testoptionalinstancevariable_Handler_CA8A00DB.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testnilreturn_Handler_IamRole_FC194663": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:nil return/Handler/IamRole",
            "uniqueId": "testnilreturn_Handler_IamRole_FC194663"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testoptionalinstancevariable_Handler_IamRole_CF882930": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:optional instance variable/Handler/IamRole",
            "uniqueId": "testoptionalinstancevariable_Handler_IamRole_CF882930"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testnilreturn_Handler_IamRolePolicy_90B0B661": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:nil return/Handler/IamRolePolicy",
            "uniqueId": "testnilreturn_Handler_IamRolePolicy_90B0B661"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testnilreturn_Handler_IamRole_FC194663.name}"
      },
      "testoptionalinstancevariable_Handler_IamRolePolicy_9EEF9C64": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:optional instance variable/Handler/IamRolePolicy",
            "uniqueId": "testoptionalinstancevariable_Handler_IamRolePolicy_9EEF9C64"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testoptionalinstancevariable_Handler_IamRole_CF882930.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testnilreturn_Handler_IamRolePolicyAttachment_53CE8059": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:nil return/Handler/IamRolePolicyAttachment",
            "uniqueId": "testnilreturn_Handler_IamRolePolicyAttachment_53CE8059"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testnilreturn_Handler_IamRole_FC194663.name}"
      },
      "testoptionalinstancevariable_Handler_IamRolePolicyAttachment_9A7EB140": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:optional instance variable/Handler/IamRolePolicyAttachment",
            "uniqueId": "testoptionalinstancevariable_Handler_IamRolePolicyAttachment_9A7EB140"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testoptionalinstancevariable_Handler_IamRole_CF882930.name}"
      }
    },
    "aws_lambda_function": {
      "testnilreturn_Handler_C1CE87DB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:nil return/Handler/Default",
            "uniqueId": "testnilreturn_Handler_C1CE87DB"
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
        "role": "${aws_iam_role.testnilreturn_Handler_IamRole_FC194663.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testnilreturn_Handler_S3Object_74809085.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testoptionalinstancevariable_Handler_CA8A00DB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:optional instance variable/Handler/Default",
            "uniqueId": "testoptionalinstancevariable_Handler_CA8A00DB"
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
        "role": "${aws_iam_role.testoptionalinstancevariable_Handler_IamRole_CF882930.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testoptionalinstancevariable_Handler_S3Object_6CA58018.key}",
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
      "testnilreturn_Handler_S3Object_74809085": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:nil return/Handler/S3Object",
            "uniqueId": "testnilreturn_Handler_S3Object_74809085"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testoptionalinstancevariable_Handler_S3Object_6CA58018": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:optional instance variable/Handler/S3Object",
            "uniqueId": "testoptionalinstancevariable_Handler_S3Object_6CA58018"
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
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("returnNil", "setOptionalValue", "getOptionalValue", "$inflight_init", "optionalVar");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Foo.js")({
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
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $foo: ${context._lift(foo)},
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
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(foo, host, ["returnNil"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            $foo: ${context._lift(foo)},
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
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "nil", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

