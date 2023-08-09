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
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.returnNil(true)? == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((((await $foo.returnNil(true))) != null),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.returnNil(false)? == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((((await $foo.returnNil(false))) != null),false)))};
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
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.getOptionalValue()? == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((((await $foo.getOptionalValue())) != null),false)))};
      (await $foo.setOptionalValue("hello"));
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.getOptionalValue()? == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((((await $foo.getOptionalValue())) != null),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.getOptionalValue() != nil")})(((await $foo.getOptionalValue()) !== undefined))};
      (await $foo.setOptionalValue(undefined));
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.getOptionalValue()? == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((((await $foo.getOptionalValue())) != null),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.getOptionalValue() == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $foo.getOptionalValue()),undefined)))};
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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:nil return\",\"${aws_lambda_function.undefined_testnilreturn_Handler_D6C3F1D0.arn}\"],[\"root/undefined/Default/test:optional instance variable\",\"${aws_lambda_function.undefined_testoptionalinstancevariable_Handler_ECF3A27C.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testnilreturn_Handler_IamRole_0D4F637A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:nil return/Handler/IamRole",
            "uniqueId": "undefined_testnilreturn_Handler_IamRole_0D4F637A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testoptionalinstancevariable_Handler_IamRole_07183F64": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:optional instance variable/Handler/IamRole",
            "uniqueId": "undefined_testoptionalinstancevariable_Handler_IamRole_07183F64"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testnilreturn_Handler_IamRolePolicy_B354929F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:nil return/Handler/IamRolePolicy",
            "uniqueId": "undefined_testnilreturn_Handler_IamRolePolicy_B354929F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testnilreturn_Handler_IamRole_0D4F637A.name}"
      },
      "undefined_testoptionalinstancevariable_Handler_IamRolePolicy_406E5D6C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:optional instance variable/Handler/IamRolePolicy",
            "uniqueId": "undefined_testoptionalinstancevariable_Handler_IamRolePolicy_406E5D6C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testoptionalinstancevariable_Handler_IamRole_07183F64.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testnilreturn_Handler_IamRolePolicyAttachment_3C1866F2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:nil return/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testnilreturn_Handler_IamRolePolicyAttachment_3C1866F2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testnilreturn_Handler_IamRole_0D4F637A.name}"
      },
      "undefined_testoptionalinstancevariable_Handler_IamRolePolicyAttachment_D5E0AE46": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:optional instance variable/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testoptionalinstancevariable_Handler_IamRolePolicyAttachment_D5E0AE46"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testoptionalinstancevariable_Handler_IamRole_07183F64.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testnilreturn_Handler_D6C3F1D0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:nil return/Handler/Default",
            "uniqueId": "undefined_testnilreturn_Handler_D6C3F1D0"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8048df3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8048df3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testnilreturn_Handler_IamRole_0D4F637A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testnilreturn_Handler_S3Object_7B680171.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testoptionalinstancevariable_Handler_ECF3A27C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:optional instance variable/Handler/Default",
            "uniqueId": "undefined_testoptionalinstancevariable_Handler_ECF3A27C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c81b4c0c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c81b4c0c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testoptionalinstancevariable_Handler_IamRole_07183F64.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testoptionalinstancevariable_Handler_S3Object_2F31CF89.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      }
    },
    "aws_s3_object": {
      "undefined_testnilreturn_Handler_S3Object_7B680171": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:nil return/Handler/S3Object",
            "uniqueId": "undefined_testnilreturn_Handler_S3Object_7B680171"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testoptionalinstancevariable_Handler_S3Object_2F31CF89": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:optional instance variable/Handler/S3Object",
            "uniqueId": "undefined_testoptionalinstancevariable_Handler_S3Object_2F31CF89"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
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
const std = $stdlib.std;
const cloud = $stdlib.cloud;
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
new $App({ outdir: $outdir, name: "nil", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

