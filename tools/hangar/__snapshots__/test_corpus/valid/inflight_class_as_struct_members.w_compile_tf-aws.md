# [inflight_class_as_struct_members.w](../../../../../examples/tests/valid/inflight_class_as_struct_members.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $Foo }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      return ({"foo": new $Foo()});
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $getBar }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const bar = (await $getBar());
      {((cond) => {if (!cond) throw new Error("assertion failed: bar.foo.get() == 42")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await bar.foo.get()),42)))};
    }
  }
  return $Closure2;
}

```

## inflight.Foo.js
```js
module.exports = function({  }) {
  class Foo {
    async get() {
      return 42;
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
      "value": "[[\"root/undefined/Default/test:test\",\"${aws_lambda_function.undefined_testtest_Handler_A295E574.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testtest_Handler_IamRole_50D3D3C7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRole",
            "uniqueId": "undefined_testtest_Handler_IamRole_50D3D3C7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testtest_Handler_IamRolePolicy_CC9DE4FB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "undefined_testtest_Handler_IamRolePolicy_CC9DE4FB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testtest_Handler_IamRolePolicyAttachment_E8519A65": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testtest_Handler_IamRolePolicyAttachment_E8519A65"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testtest_Handler_A295E574": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/Default",
            "uniqueId": "undefined_testtest_Handler_A295E574"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c831cefb",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c831cefb",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testtest_Handler_S3Object_96D88A6C.key}",
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
      "undefined_testtest_Handler_S3Object_96D88A6C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/S3Object",
            "uniqueId": "undefined_testtest_Handler_S3Object_96D88A6C"
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
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("get", "$inflight_init");
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
            $Foo: ${context._lift(Foo)},
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
            $getBar: ${context._lift(getBar)},
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
          $Closure2._registerBindObject(getBar, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    const getBar = new $Closure1(this,"$Closure1");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inflight_class_as_struct_members", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

