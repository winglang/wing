# [bring_local_normalization.w](../../../../../examples/tests/valid/bring_local_normalization.w) | compile | tf-aws

## inflight.Bar-c5432125.js
```js
module.exports = function({  }) {
  class Bar {
    constructor({  }) {
    }
  }
  return Bar;
}

```

## inflight.Baz-5fbfc8fc.js
```js
module.exports = function({  }) {
  class Baz {
    constructor({  }) {
    }
  }
  return Baz;
}

```

## inflight.Foo-1c5ff655.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
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

## preflight.bar-1.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  class Bar extends $stdlib.std.Resource {
    constructor(scope, id, ) {
      super(scope, id);
      this._addInflightOps("$inflight_init");
    }
    static bar() {
      return "bar";
    }
    static _toInflightType(context) {
      return $stdlib.core.NodeJsCode.fromInline(`
        require("./inflight.Bar-c5432125.js")({
        })
      `);
    }
    _toInflight() {
      return $stdlib.core.NodeJsCode.fromInline(`
        (await (async () => {
          const BarClient = ${Bar._toInflightType(this).text};
          const client = new BarClient({
          });
          if (client.$inflight_init) { await client.$inflight_init(); }
          return client;
        })())
      `);
    }
  }
  return { Bar };
};

```

## preflight.baz-2.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  class Baz extends $stdlib.std.Resource {
    constructor(scope, id, ) {
      super(scope, id);
      this._addInflightOps("$inflight_init");
    }
    static baz() {
      return "baz";
    }
    static _toInflightType(context) {
      return $stdlib.core.NodeJsCode.fromInline(`
        require("./inflight.Baz-5fbfc8fc.js")({
        })
      `);
    }
    _toInflight() {
      return $stdlib.core.NodeJsCode.fromInline(`
        (await (async () => {
          const BazClient = ${Baz._toInflightType(this).text};
          const client = new BazClient({
          });
          if (client.$inflight_init) { await client.$inflight_init(); }
          return client;
        })())
      `);
    }
  }
  return { Baz };
};

```

## preflight.foo-3.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  const bar = require("./preflight.bar-1.js")({ $stdlib });
  const baz = require("./preflight.baz-2.js")({ $stdlib });
  class Foo extends $stdlib.std.Resource {
    constructor(scope, id, ) {
      super(scope, id);
      this._addInflightOps("$inflight_init");
    }
    static foo() {
      return "foo";
    }
    static bar() {
      return (bar.Bar.bar());
    }
    static baz() {
      return (baz.Baz.baz());
    }
    static _toInflightType(context) {
      return $stdlib.core.NodeJsCode.fromInline(`
        require("./inflight.Foo-1c5ff655.js")({
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
  return { Foo };
};

```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const foo = require("./preflight.foo-3.js")({ $stdlib });
const bar = require("./preflight.bar-1.js")({ $stdlib });
const baz = require("./preflight.baz-2.js")({ $stdlib });
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    {((cond) => {if (!cond) throw new Error("assertion failed: foo.Foo.foo() == \"foo\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((foo.Foo.foo()),"foo")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: foo.Foo.bar() == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((foo.Foo.bar()),"bar")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: foo.Foo.baz() == \"baz\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((foo.Foo.baz()),"baz")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: bar.Bar.bar() == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((bar.Bar.bar()),"bar")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: baz.Baz.baz() == \"baz\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((baz.Baz.baz()),"baz")))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bring_local_normalization", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

