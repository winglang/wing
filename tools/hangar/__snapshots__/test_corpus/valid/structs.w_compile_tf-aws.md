# [structs.w](../../../../../examples/tests/valid/structs.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const s2 = ({"a": "foo"});
      {((cond) => {if (!cond) throw new Error("assertion failed: s2.a == \"foo\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s2.a,"foo")))};
    }
  }
  return $Closure1;
}

```

## inflight.Foo.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({ $this_data_field0 }) {
      this.$this_data_field0 = $this_data_field0;
    }
    async getStuff() {
      return this.$this_data_field0;
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
      "value": "[[\"root/undefined/Default/test:struct definitions are phase independant\",\"${aws_lambda_function.undefined_teststructdefinitionsarephaseindependant_Handler_1D7583EE.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_teststructdefinitionsarephaseindependant_Handler_IamRole_9EC60036": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:struct definitions are phase independant/Handler/IamRole",
            "uniqueId": "undefined_teststructdefinitionsarephaseindependant_Handler_IamRole_9EC60036"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_teststructdefinitionsarephaseindependant_Handler_IamRolePolicy_88AED0B1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:struct definitions are phase independant/Handler/IamRolePolicy",
            "uniqueId": "undefined_teststructdefinitionsarephaseindependant_Handler_IamRolePolicy_88AED0B1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_teststructdefinitionsarephaseindependant_Handler_IamRole_9EC60036.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_teststructdefinitionsarephaseindependant_Handler_IamRolePolicyAttachment_92C7E241": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:struct definitions are phase independant/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_teststructdefinitionsarephaseindependant_Handler_IamRolePolicyAttachment_92C7E241"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_teststructdefinitionsarephaseindependant_Handler_IamRole_9EC60036.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_teststructdefinitionsarephaseindependant_Handler_1D7583EE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:struct definitions are phase independant/Handler/Default",
            "uniqueId": "undefined_teststructdefinitionsarephaseindependant_Handler_1D7583EE"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e8cd18",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e8cd18",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_teststructdefinitionsarephaseindependant_Handler_IamRole_9EC60036.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_teststructdefinitionsarephaseindependant_Handler_S3Object_DE704B67.key}",
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
      "undefined_teststructdefinitionsarephaseindependant_Handler_S3Object_DE704B67": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:struct definitions are phase independant/Handler/S3Object",
            "uniqueId": "undefined_teststructdefinitionsarephaseindependant_Handler_S3Object_DE704B67"
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
      constructor(scope, id, b) {
        super(scope, id);
        this._addInflightOps("getStuff", "$inflight_init");
        this.data = b;
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
              $this_data_field0: ${this._lift(this.data.field0)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Foo._registerBindObject(this.data.field0, host, []);
        }
        if (ops.includes("getStuff")) {
          Foo._registerBindObject(this.data.field0, host, []);
        }
        super._registerBind(host, ops);
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
    const x = ({"field0": "Sup"});
    const y = ({"field0": "hello","field1": 1,"field2": "world","field3": ({"field0": "foo"})});
    {((cond) => {if (!cond) throw new Error("assertion failed: x.field0 == \"Sup\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(x.field0,"Sup")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: y.field1 == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y.field1,1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: y.field3.field0 == \"foo\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y.field3.field0,"foo")))};
    const s = ({"a": "Boom baby"});
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:struct definitions are phase independant",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "structs", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

