# [double_reference.test.w](../../../../../examples/tests/valid/double_reference.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $bar, $bar_foo, $initCount }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $bar.callFoo());
      (await $bar_foo.method());
      {((cond) => {if (!cond) throw new Error("assertion failed: initCount.peek() == /*1*/ 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $initCount.peek()),2)))};
    }
  }
  return $Closure1;
}

```

## inflight.Bar-1.js
```js
"use strict";
module.exports = function({  }) {
  class Bar {
    constructor({ $this_foo }) {
      this.$this_foo = $this_foo;
    }
    async callFoo() {
      (await this.$this_foo.method());
    }
  }
  return Bar;
}

```

## inflight.Foo-1.js
```js
"use strict";
module.exports = function({ $initCount }) {
  class Foo {
    constructor({  }) {
    }
    async method() {
    }
    async $inflight_init() {
      (await $initCount.inc());
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
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "cloudCounter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "cloudCounter"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    }
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Foo-1.js")({
            $initCount: ${context._lift(initCount)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this)};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["method", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          Foo._registerOnLiftObject(initCount, host, ["inc"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class Bar extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.foo = new Foo(this, "Foo");
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Bar-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BarClient = ${Bar._toInflightType(this)};
            const client = new BarClient({
              $this_foo: ${this._lift(this.foo)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["callFoo", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          Bar._registerOnLiftObject(this.foo, host, []);
        }
        if (ops.includes("callFoo")) {
          Bar._registerOnLiftObject(this.foo, host, ["method"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $bar: ${context._lift(bar)},
            $bar_foo: ${context._lift(bar.foo)},
            $initCount: ${context._lift(initCount)},
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(bar, host, ["callFoo"]);
          $Closure1._registerOnLiftObject(bar.foo, host, ["method"]);
          $Closure1._registerOnLiftObject(initCount, host, ["peek"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const initCount = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this, "cloud.Counter");
    const bar = new Bar(this, "Bar");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:hello", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "double_reference.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

