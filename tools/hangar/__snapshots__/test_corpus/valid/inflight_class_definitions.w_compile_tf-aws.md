# [inflight_class_definitions.w](../../../../../examples/tests/valid/inflight_class_definitions.w) | compile | tf-aws

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
      class C {
        async foo() {
          return "c1";
        }
      }
      const c = new C();
      {((cond) => {if (!cond) throw new Error("assertion failed: c.foo() == \"c1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await c.foo()),"c1")))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $F }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      return (await new $F().foo());
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
module.exports = function({ $B, $a, $d, $fn, $innerD }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: a.goo() == \"a2\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $a.goo()),"a2")))};
      const b = new $B();
      {((cond) => {if (!cond) throw new Error("assertion failed: b.foo() == \"b1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await b.foo()),"b1")))};
      (await $fn());
      {((cond) => {if (!cond) throw new Error("assertion failed: d.callInner() == \"f1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $d.callInner()),"f1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: innerD() == \"f1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $innerD()),"f1")))};
    }
  }
  return $Closure3;
}

```

## inflight.A-1.js
```js
module.exports = function({  }) {
  class A {
    constructor({  }) {
    }
    async goo() {
      return "a2";
    }
  }
  return A;
}

```

## inflight.B-1.js
```js
module.exports = function({  }) {
  class B {
    async foo() {
      return "b1";
    }
  }
  return B;
}

```

## inflight.D-1.js
```js
module.exports = function({  }) {
  class D {
    constructor({ $this_inner }) {
      this.$this_inner = $this_inner;
    }
    async callInner() {
      return (await this.$this_inner());
    }
  }
  return D;
}

```

## inflight.E-1.js
```js
module.exports = function({  }) {
  class E {
    constructor({  }) {
    }
  }
  return E;
}

```

## inflight.F-1.js
```js
module.exports = function({  }) {
  class F {
    async foo() {
      return "f1";
    }
  }
  return F;
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
      "value": "[[\"root/Default/Default/test:test\",\"${aws_lambda_function.testtest_Handler_295107CC.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testtest_Handler_IamRole_15693C93": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRole",
            "uniqueId": "testtest_Handler_IamRole_15693C93"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testtest_Handler_IamRolePolicy_AF0279BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "testtest_Handler_IamRolePolicy_AF0279BD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testtest_Handler_IamRole_15693C93.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testtest_Handler_IamRolePolicyAttachment_ADF4752D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicyAttachment",
            "uniqueId": "testtest_Handler_IamRolePolicyAttachment_ADF4752D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testtest_Handler_IamRole_15693C93.name}"
      }
    },
    "aws_lambda_function": {
      "testtest_Handler_295107CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/Default",
            "uniqueId": "testtest_Handler_295107CC"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8f4f2a1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f4f2a1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testtest_Handler_IamRole_15693C93.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testtest_Handler_S3Object_9F4E28A7.key}",
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
      "testtest_Handler_S3Object_9F4E28A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/S3Object",
            "uniqueId": "testtest_Handler_S3Object_9F4E28A7"
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class A extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
      }
      foo() {
        return "a1";
      }
      static _toInflightType(context) {
        return `
          require("./inflight.A-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AClient = ${A._toInflightType(this)};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["goo", "$inflight_init"]
      }
    }
    class B extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.B-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BClient = ${B._toInflightType(this)};
            const client = new BClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["foo", "$inflight_init"]
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Display.of(this)).hidden = true;
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
        return ["handle", "$inflight_init"]
      }
    }
    class D extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        class E extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
          }
          foo() {
            return "e1";
          }
          static _toInflightType(context) {
            return `
              require("./inflight.E-1.js")({
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const EClient = ${E._toInflightType(this)};
                const client = new EClient({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          _getInflightOps() {
            return ["$inflight_init"]
          }
        }
        const pb = new E(this,"E");
        {((cond) => {if (!cond) throw new Error("assertion failed: pb.foo() == \"e1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((pb.foo()),"e1")))};
        class F extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
          }
          static _toInflightType(context) {
            return `
              require("./inflight.F-1.js")({
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const FClient = ${F._toInflightType(this)};
                const client = new FClient({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          _getInflightOps() {
            return ["foo", "$inflight_init"]
          }
        }
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            (std.Display.of(this)).hidden = true;
          }
          static _toInflightType(context) {
            return `
              require("./inflight.$Closure2-1.js")({
                $F: ${context._lift(F)},
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
            return ["handle", "$inflight_init"]
          }
        }
        this.inner = new $Closure2(this,"$Closure2");
      }
      getInner() {
        return this.inner;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.D-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const DClient = ${D._toInflightType(this)};
            const client = new DClient({
              $this_inner: ${this._lift(this.inner)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["callInner", "$inflight_init"]
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          D._registerBindObject(this.inner, host, []);
        }
        if (ops.includes("callInner")) {
          D._registerBindObject(this.inner, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
            $B: ${context._lift(B)},
            $a: ${context._lift(a)},
            $d: ${context._lift(d)},
            $fn: ${context._lift(fn)},
            $innerD: ${context._lift(innerD)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"]
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(a, host, ["goo"]);
          $Closure3._registerBindObject(d, host, ["callInner"]);
          $Closure3._registerBindObject(fn, host, ["handle"]);
          $Closure3._registerBindObject(innerD, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    const a = new A(this,"A");
    {((cond) => {if (!cond) throw new Error("assertion failed: a.foo() == \"a1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((a.foo()),"a1")))};
    const fn = new $Closure1(this,"$Closure1");
    const d = new D(this,"D");
    const innerD = (d.getInner());
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Closure3(this,"$Closure3"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inflight_class_definitions", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

