# [function_optional_arguments.test.w](../../../../../examples/tests/valid/function_optional_arguments.test.w) | compile | tf-aws

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
    },
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static staticMethod($scope, opts) {
        return String.raw({ raw: ["", " ", ""] }, (opts.opt1 ?? "none"), (opts.opt2 ?? 0));
      }
      method(opts) {
        return String.raw({ raw: ["", " ", ""] }, (opts.opt1 ?? "none"), (opts.opt2 ?? 0));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType()};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    const fn1 = ((opts) => {
      return String.raw({ raw: ["", " ", ""] }, opts.opt1, opts.opt2);
    });
    $helpers.assert($helpers.eq((fn1(({"opt1": "hey", "opt2": 1}))), "hey 1"), "fn1({opt1: \"hey\", opt2: 1}) == \"hey 1\"");
    $helpers.assert($helpers.eq((fn1({ opt1: "hey", opt2: 1 })), "hey 1"), "fn1(opt1: \"hey\", opt2: 1) == \"hey 1\"");
    const fn2 = ((opts) => {
      {
        const $if_let_value = opts;
        if ($if_let_value != undefined) {
          const opts = $if_let_value;
          return String.raw({ raw: ["", " ", ""] }, opts.opt1, opts.opt2);
        }
        else {
          return "none";
        }
      }
    });
    $helpers.assert($helpers.eq((fn2(({"opt1": "hey", "opt2": 1}))), "hey 1"), "fn2({opt1: \"hey\", opt2: 1}) == \"hey 1\"");
    $helpers.assert($helpers.eq((fn2({ opt1: "hey", opt2: 1 })), "hey 1"), "fn2(opt1: \"hey\", opt2: 1) == \"hey 1\"");
    $helpers.assert($helpers.eq((fn2()), "none"), "fn2() == \"none\"");
    const fn3 = ((opts) => {
      return String.raw({ raw: ["", " ", ""] }, (opts.opt1 ?? "none"), (opts.opt2 ?? 0));
    });
    $helpers.assert($helpers.eq((fn3(({"opt1": "hey", "opt2": 1}))), "hey 1"), "fn3({opt1: \"hey\", opt2: 1}) == \"hey 1\"");
    $helpers.assert($helpers.eq((fn3({ opt1: "hey", opt2: 1 })), "hey 1"), "fn3(opt1: \"hey\", opt2: 1) == \"hey 1\"");
    $helpers.assert($helpers.eq((fn3({ opt1: "hey" })), "hey 0"), "fn3(opt1: \"hey\") == \"hey 0\"");
    $helpers.assert($helpers.eq((fn3(({}))), "none 0"), "fn3({}) == \"none 0\"");
    $helpers.assert($helpers.eq((fn3({  })), "none 0"), "fn3() == \"none 0\"");
    const fn4 = ((opts) => {
      {
        const $if_let_value = opts;
        if ($if_let_value != undefined) {
          const opts = $if_let_value;
          return String.raw({ raw: ["", " ", ""] }, (opts.opt1 ?? "none"), (opts.opt2 ?? 0));
        }
        else {
          return "none";
        }
      }
    });
    $helpers.assert($helpers.eq((fn4(({"opt1": "hey", "opt2": 1}))), "hey 1"), "fn4({opt1: \"hey\", opt2: 1}) == \"hey 1\"");
    $helpers.assert($helpers.eq((fn4({ opt1: "hey", opt2: 1 })), "hey 1"), "fn4(opt1: \"hey\", opt2: 1) == \"hey 1\"");
    $helpers.assert($helpers.eq((fn4({ opt1: "hey" })), "hey 0"), "fn4(opt1: \"hey\") == \"hey 0\"");
    $helpers.assert($helpers.eq((fn4(({}))), "none 0"), "fn4({}) == \"none 0\"");
    $helpers.assert($helpers.eq((fn4()), "none"), "fn4() == \"none\"");
    const foo = new Foo(this, "Foo");
    $helpers.assert($helpers.eq((foo.method({  })), "none 0"), "foo.method() == \"none 0\"");
    $helpers.assert($helpers.eq((Foo.staticMethod(this, {  })), "none 0"), "Foo.staticMethod() == \"none 0\"");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "function_optional_arguments.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

