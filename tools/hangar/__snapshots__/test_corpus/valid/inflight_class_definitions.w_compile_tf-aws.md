# [inflight_class_definitions.w](../../../../../examples/tests/valid/inflight_class_definitions.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const C = require("./inflight.C.js")({});
      const c = new C();
      {((cond) => {if (!cond) throw new Error("assertion failed: c.foo() == \"c1\"")})(((await c.foo()) === "c1"))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ F }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      return (await new F().foo());
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ a, fn, d, innerD, B }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: a.goo() == \"a2\"")})(((await a.goo()) === "a2"))};
      const b = new B();
      {((cond) => {if (!cond) throw new Error("assertion failed: b.foo() == \"b1\"")})(((await b.foo()) === "b1"))};
      (await fn());
      {((cond) => {if (!cond) throw new Error("assertion failed: d.callInner() == \"f1\"")})(((await d.callInner()) === "f1"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: innerD() == \"f1\"")})(((await innerD()) === "f1"))};
    }
  }
  return $Closure3;
}

```

## inflight.A.js
```js
module.exports = function({  }) {
  class A {
    constructor({  }) {
    }
    async $inflight_init()  {
    }
    async goo()  {
      return "a2";
    }
  }
  return A;
}

```

## inflight.B.js
```js
module.exports = function({  }) {
  class B {
     constructor()  {
    }
    async foo()  {
      return "b1";
    }
  }
  return B;
}

```

## inflight.C.js
```js
module.exports = function({  }) {
  class C {
     constructor()  {
    }
    async foo()  {
      return "c1";
    }
  }
  return C;
}

```

## inflight.D.js
```js
module.exports = function({  }) {
  class D {
    constructor({ inner }) {
      this.inner = inner;
    }
    async $inflight_init()  {
    }
    async callInner()  {
      return (await this.inner());
    }
  }
  return D;
}

```

## inflight.E.js
```js
module.exports = function({  }) {
  class E {
    constructor({  }) {
    }
    async $inflight_init()  {
    }
  }
  return E;
}

```

## inflight.F.js
```js
module.exports = function({  }) {
  class F {
     constructor()  {
    }
    async foo()  {
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
      "value": "[[\"root/Default/Default/test:test\",\"${aws_lambda_function.root_testtest_Handler_046C3415.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testtest_Handler_IamRole_6C1728D1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRole",
            "uniqueId": "root_testtest_Handler_IamRole_6C1728D1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testtest_Handler_IamRolePolicy_65A1D8BE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "root_testtest_Handler_IamRolePolicy_65A1D8BE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testtest_Handler_IamRole_6C1728D1.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testtest_Handler_IamRolePolicyAttachment_3716AC26": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testtest_Handler_IamRolePolicyAttachment_3716AC26"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testtest_Handler_IamRole_6C1728D1.name}"
      }
    },
    "aws_lambda_function": {
      "root_testtest_Handler_046C3415": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/Default",
            "uniqueId": "root_testtest_Handler_046C3415"
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
        "role": "${aws_iam_role.root_testtest_Handler_IamRole_6C1728D1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testtest_Handler_S3Object_71CD07AC.key}",
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
      "root_testtest_Handler_S3Object_71CD07AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/S3Object",
            "uniqueId": "root_testtest_Handler_S3Object_71CD07AC"
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
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class A extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("goo");
      }
       foo()  {
        return "a1";
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.A.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const AClient = ${A._toInflightType(this).text};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("goo")) {
        }
        super._registerBind(host, ops);
      }
    }
    class B extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("foo");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.B.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BClient = ${B._toInflightType(this).text};
            const client = new BClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("foo")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class D extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        class E extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
          }
           foo()  {
            return "e1";
          }
          static _toInflightType(context) {
            const self_client_path = "././inflight.E.js";
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
              })
            `);
          }
          _toInflight() {
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const EClient = ${E._toInflightType(this).text};
                const client = new EClient({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `);
          }
          _registerBind(host, ops) {
            if (ops.includes("$inflight_init")) {
            }
            super._registerBind(host, ops);
          }
        }
        const pb = new E(this,"E");
        {((cond) => {if (!cond) throw new Error("assertion failed: pb.foo() == \"e1\"")})(((pb.foo()) === "e1"))};
        class F extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("foo");
          }
          static _toInflightType(context) {
            const self_client_path = "././inflight.F.js";
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
              })
            `);
          }
          _toInflight() {
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const FClient = ${F._toInflightType(this).text};
                const client = new FClient({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `);
          }
          _registerBind(host, ops) {
            if (ops.includes("$inflight_init")) {
            }
            if (ops.includes("foo")) {
            }
            super._registerBind(host, ops);
          }
        }
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this.display.hidden = true;
            this._addInflightOps("handle");
          }
          static _toInflightType(context) {
            const self_client_path = "././inflight.$Closure2.js";
            const FClient = F._toInflightType(context);
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
                F: ${FClient.text},
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
            }
            if (ops.includes("handle")) {
            }
            super._registerBind(host, ops);
          }
        }
        this.inner = new $Closure2(this,"$Closure2");
        this._addInflightOps("callInner");
      }
       getInner()  {
        return this.inner;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.D.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const inner_client = this._lift(this.inner);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const DClient = ${D._toInflightType(this).text};
            const client = new DClient({
              inner: ${inner_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
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
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        const a_client = context._lift(a);
        const fn_client = context._lift(fn);
        const d_client = context._lift(d);
        const innerD_client = context._lift(innerD);
        const BClient = B._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            a: ${a_client},
            fn: ${fn_client},
            d: ${d_client},
            innerD: ${innerD_client},
            B: ${BClient.text},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this).text};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Closure3._registerBindObject(a, host, []);
          $Closure3._registerBindObject(d, host, []);
          $Closure3._registerBindObject(fn, host, []);
          $Closure3._registerBindObject(innerD, host, []);
        }
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
    {((cond) => {if (!cond) throw new Error("assertion failed: a.foo() == \"a1\"")})(((a.foo()) === "a1"))};
    const fn = new $Closure1(this,"$Closure1");
    const d = new D(this,"D");
    const innerD = (d.getInner());
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Closure3(this,"$Closure3"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "inflight_class_definitions", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

