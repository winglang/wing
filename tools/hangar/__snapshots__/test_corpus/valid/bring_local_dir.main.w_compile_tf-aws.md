# [bring_local_dir.main.w](../../../../../examples/tests/valid/bring_local_dir.main.w) | compile | tf-aws

## inflight.Bar-3.js
```js
module.exports = function({  }) {
  class Bar {
    constructor({  }) {
    }
  }
  return Bar;
}

```

## inflight.Foo-2.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
  }
  return Foo;
}

```

## inflight.Widget-1.js
```js
module.exports = function({  }) {
  class Widget {
    constructor({  }) {
    }
  }
  return Widget;
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

## preflight.file1-3.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  const blah = require("./preflight.inner-2.js")({ $stdlib });
  class Foo extends $stdlib.std.Resource {
    constructor(scope, id, ) {
      super(scope, id);
    }
    foo() {
      return "foo";
    }
    checkWidget(widget) {
      return (widget.compute());
    }
    static _toInflightType(context) {
      return `
        require("./inflight.Foo-2.js")({
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
      return ["$inflight_init"];
    }
  }
  return { Foo };
};

```

## preflight.file2-4.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  class Bar extends $stdlib.std.Resource {
    constructor(scope, id, ) {
      super(scope, id);
    }
    bar() {
      return "bar";
    }
    static _toInflightType(context) {
      return `
        require("./inflight.Bar-3.js")({
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
    _getInflightOps() {
      return ["$inflight_init"];
    }
  }
  return { Bar };
};

```

## preflight.inner-2.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  return {
    ...require("./preflight.widget-1.js")({ $stdlib }),
  };
};

```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const subdir = require("./preflight.subdir2-5.js")({ $stdlib });
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const foo = new subdir.Foo(this,"subdir.Foo");
    {((cond) => {if (!cond) throw new Error("assertion failed: foo.foo() == \"foo\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((foo.foo()),"foo")))};
    const bar = new subdir.Bar(this,"subdir.Bar");
    {((cond) => {if (!cond) throw new Error("assertion failed: bar.bar() == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((bar.bar()),"bar")))};
    const widget = new subdir.inner.Widget(this,"subdir.inner.Widget");
    {((cond) => {if (!cond) throw new Error("assertion failed: widget.compute() == 42")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((widget.compute()),42)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: foo.checkWidget(widget) == 42")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((foo.checkWidget(widget)),42)))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bring_local_dir.main", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

## preflight.subdir2-5.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  return {
    inner: require("./preflight.inner-2.js")({ $stdlib }),
    ...require("./preflight.file2-4.js")({ $stdlib }),
    ...require("./preflight.file1-3.js")({ $stdlib }),
  };
};

```

## preflight.widget-1.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  class Widget extends $stdlib.std.Resource {
    constructor(scope, id, ) {
      super(scope, id);
    }
    compute() {
      return 42;
    }
    static _toInflightType(context) {
      return `
        require("./inflight.Widget-1.js")({
        })
      `;
    }
    _toInflight() {
      return `
        (await (async () => {
          const WidgetClient = ${Widget._toInflightType(this)};
          const client = new WidgetClient({
          });
          if (client.$inflight_init) { await client.$inflight_init(); }
          return client;
        })())
      `;
    }
    _getInflightOps() {
      return ["$inflight_init"];
    }
  }
  return { Widget };
};

```

