# [calling_inflight_variants.test.w](../../../../../examples/tests/valid/calling_inflight_variants.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
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
"use strict";
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
"use strict";
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
        const __parent_this_1 = this;
        class $Closure1 extends $stdlib.std.Resource {
          constructor($scope, $id, ) {
            super($scope, $id);
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
          _supportedOps() {
            return ["handle", "$inflight_init"];
          }
        }
        this.inflight1 = new $Closure1(this, "$Closure1");
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
      _supportedOps() {
        return ["inflight2", "makeFn", "callFn", "callFn2", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          Foo._registerOnLiftObject(this, host, ["inflight2"]);
          Foo._registerOnLiftObject(this.inflight1, host, []);
        }
        if (ops.includes("callFn")) {
          Foo._registerOnLiftObject(this, host, ["makeFn"]);
        }
        if (ops.includes("callFn2")) {
          Foo._registerOnLiftObject(this, host, ["inflight2"]);
          Foo._registerOnLiftObject(this.inflight1, host, ["handle"]);
        }
        if (ops.includes("makeFn")) {
          Foo._registerOnLiftObject(this, host, ["inflight2"]);
          Foo._registerOnLiftObject(this.inflight1, host, ["handle"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerOnLiftObject(foo, host, ["callFn", "callFn2"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const foo = new Foo(this, "Foo");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:calling different types of inflights", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "calling_inflight_variants.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

