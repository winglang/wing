# [calling_inflight_variants.w](../../../../../examples/tests/valid/calling_inflight_variants.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      return 1;
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $foo }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.callFn(true) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $foo.callFn(true)),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.callFn(false) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $foo.callFn(false)),2)))};
      (await $foo.callFn2());
    }
  }
  return $Closure2;
}

```

## inflight.Foo-1.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({ $this_inflight1 }) {
      this.$this_inflight1 = $this_inflight1;
    }
    async makeFn(x) {
      if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(x,true))) {
        return this.$this_inflight1;
      }
      else {
        return this.inflight2;
      }
    }
    async callFn(x) {
      const partialFn = (await this.makeFn(x));
      return (await partialFn());
    }
    async callFn2() {
      const one = (await this.$this_inflight1());
      const two = (await this.inflight2());
      {((cond) => {if (!cond) throw new Error("assertion failed: one == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(one,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: two == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(two,2)))};
    }
    async $inflight_init() {
      this.inflight2 = async () => {
        return 2;
      }
      ;
      const ret = (await this.inflight2());
      {((cond) => {if (!cond) throw new Error("assertion failed: ret == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(ret,2)))};
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
      "value": "[[\"root/Default/Default/test:calling different types of inflights\",\"${aws_lambda_function.testcallingdifferenttypesofinflights_Handler_F0BAE661.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testcallingdifferenttypesofinflights_Handler_IamRole_3D2D3E24": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:calling different types of inflights/Handler/IamRole",
            "uniqueId": "testcallingdifferenttypesofinflights_Handler_IamRole_3D2D3E24"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testcallingdifferenttypesofinflights_Handler_IamRolePolicy_150C3E36": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:calling different types of inflights/Handler/IamRolePolicy",
            "uniqueId": "testcallingdifferenttypesofinflights_Handler_IamRolePolicy_150C3E36"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testcallingdifferenttypesofinflights_Handler_IamRole_3D2D3E24.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testcallingdifferenttypesofinflights_Handler_IamRolePolicyAttachment_6F365B35": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:calling different types of inflights/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcallingdifferenttypesofinflights_Handler_IamRolePolicyAttachment_6F365B35"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcallingdifferenttypesofinflights_Handler_IamRole_3D2D3E24.name}"
      }
    },
    "aws_lambda_function": {
      "testcallingdifferenttypesofinflights_Handler_F0BAE661": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:calling different types of inflights/Handler/Default",
            "uniqueId": "testcallingdifferenttypesofinflights_Handler_F0BAE661"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8f324e0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f324e0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testcallingdifferenttypesofinflights_Handler_IamRole_3D2D3E24.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcallingdifferenttypesofinflights_Handler_S3Object_A64779ED.key}",
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
      "testcallingdifferenttypesofinflights_Handler_S3Object_A64779ED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:calling different types of inflights/Handler/S3Object",
            "uniqueId": "testcallingdifferenttypesofinflights_Handler_S3Object_A64779ED"
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const __parent_this_1 = this;
        class $Closure1 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            (std.Node.of(this)).hidden = true;
          }
          static _toInflightType(context) {
            return `
              require("./inflight.$Closure1-1.js")({
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure1Client = ${$Closure1._toInflightType(this)};
                const client = new $Closure1Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          _getInflightOps() {
            return ["handle", "$inflight_init"];
          }
        }
        this.inflight1 = new $Closure1(this,"$Closure1");
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Foo-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this)};
            const client = new FooClient({
              $this_inflight1: ${this._lift(this.inflight1)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["inflight2", "makeFn", "callFn", "callFn2", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Foo._registerBindObject(this, host, ["inflight2"]);
          Foo._registerBindObject(this.inflight1, host, []);
        }
        if (ops.includes("callFn")) {
          Foo._registerBindObject(this, host, ["makeFn"]);
        }
        if (ops.includes("callFn2")) {
          Foo._registerBindObject(this, host, ["inflight2"]);
          Foo._registerBindObject(this.inflight1, host, ["handle"]);
        }
        if (ops.includes("makeFn")) {
          Foo._registerBindObject(this, host, ["inflight2"]);
          Foo._registerBindObject(this.inflight1, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $foo: ${context._lift(foo)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(foo, host, ["callFn", "callFn2"]);
        }
        super._registerBind(host, ops);
      }
    }
    const foo = new Foo(this,"Foo");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:calling different types of inflights",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "calling_inflight_variants", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

