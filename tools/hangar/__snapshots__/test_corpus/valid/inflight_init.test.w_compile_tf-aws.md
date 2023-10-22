# [inflight_init.test.w](../../../../../examples/tests/valid/inflight_init.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $Foo }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const f = (await (async () => {const o = new $Foo(); await o.$inflight_init?.(5); return o; })());
      {((cond) => {if (!cond) throw new Error("assertion failed: f.field1 == 6 && f.field2 == 5")})(((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f.field1,6)) && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f.field2,5))))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $FooChild }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const f = (await (async () => {const o = new $FooChild(); await o.$inflight_init?.(); return o; })());
      {((cond) => {if (!cond) throw new Error("assertion failed: f.field1 == 6 && f.field2 == 5 && f.field3 == 4")})((((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f.field1,6)) && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f.field2,5))) && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f.field3,4))))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      class FooNoInit {
        async leet() {
          return 1337;
        }
      }
      class FooChild extends FooNoInit {
        async $inflight_init() {
          await super.$inflight_init?.();
          this.field = (await this.leet());
        }
      }
      const f = (await (async () => {const o = new FooChild(); await o.$inflight_init?.(); return o; })());
      {((cond) => {if (!cond) throw new Error("assertion failed: f.field == 1337")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f.field,1337)))};
    }
  }
  return $Closure3;
}

```

## inflight.Foo-1.js
```js
"use strict";
module.exports = function({  }) {
  class Foo {
    async get_six() {
      return 6;
    }
    async $inflight_init(f2) {
      this.field1 = (await this.get_six());
      this.field2 = f2;
    }
  }
  return Foo;
}

```

## inflight.FooChild-1.js
```js
"use strict";
module.exports = function({ $Foo }) {
  class FooChild extends $Foo {
    async $inflight_init() {
      await super.$inflight_init?.(5);
      this.field3 = 4;
    }
  }
  return FooChild;
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
      _getInflightOps() {
        return ["field1", "field2", "get_six", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          Foo._registerOnLiftObject(this, host, ["field1", "field2", "get_six"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class FooChild extends Foo {
      constructor(scope, id, ) {
        super(scope, id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.FooChild-1.js")({
            $Foo: ${context._lift(Foo)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooChildClient = ${FooChild._toInflightType(this)};
            const client = new FooChildClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["field3", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          FooChild._registerOnLiftObject(this, host, ["field3"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $Foo: ${context._lift(Foo)},
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
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $FooChild: ${context._lift(FooChild)},
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
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
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
        return ["handle", "$inflight_init"];
      }
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight class init",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight calls parent's init",new $Closure2(this,"$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight calls parent's init when non exists",new $Closure3(this,"$Closure3"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inflight_init.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

