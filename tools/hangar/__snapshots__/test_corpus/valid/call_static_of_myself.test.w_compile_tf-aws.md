# [call_static_of_myself.test.w](../../../../../examples/tests/valid/call_static_of_myself.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $Bar, $Foo, $foo }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      class Zoo {
        static async zoo() {
          return 3;
        }
      }
      const bar = (await (async () => {const o = new $Bar(); await o.$inflight_init?.(); return o; })());
      {((cond) => {if (!cond) throw new Error("assertion failed: Foo.foo() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $Foo.foo()),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Bar.bar() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $Bar.bar()),2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Zoo.zoo() == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await Zoo.zoo()),3)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: foo.callThis() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $foo.callThis()),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bar.callThis() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await bar.callThis()),2)))};
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
    static async bar() {
      return 2;
    }
    async callThis() {
      return (await Bar.bar());
    }
  }
  return Bar;
}

```

## inflight.Foo-1.js
```js
"use strict";
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
    static async foo() {
      return 1;
    }
    static async bar() {
      return (await Foo.foo());
    }
    async callThis() {
      return (await Foo.bar());
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
        return ["foo", "bar", "callThis", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("callThis")) {
          Foo._registerOnLiftObject(Foo, host, ["bar"]);
        }
        super._registerOnLift(host, ops);
      }
      static _registerTypeOnLift(host, ops) {
        if (ops.includes("bar")) {
          Foo._registerOnLiftObject(Foo, host, ["foo"]);
        }
        super._registerTypeOnLift(host, ops);
      }
    }
    class Bar extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
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
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["bar", "callThis", "$inflight_init"];
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
            $Bar: ${context._lift(Bar)},
            $Foo: ${context._lift(Foo)},
            $foo: ${context._lift(foo)},
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
          $Closure1._registerOnLiftObject(Foo, host, ["foo"]);
          $Closure1._registerOnLiftObject(foo, host, ["callThis"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const foo = new Foo(this, "Foo");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:test", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "call_static_of_myself.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

