# [inheritance_class_preflight.test.w](../../../../../examples/tests/valid/inheritance_class_preflight.test.w) | compile | tf-aws

## inflight.Foo-1.js
```js
"use strict";
module.exports = function({ $FooBase }) {
  class Foo extends $FooBase {
    constructor({  }) {
      super({  });
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.js.map
```

## inflight.FooBase-1.js
```js
"use strict";
module.exports = function({  }) {
  class FooBase {
    constructor({  }) {
    }
  }
  return FooBase;
}
//# sourceMappingURL=inflight.FooBase-1.js.map
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
const expect = $stdlib.expect;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class FooBase extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      bar() {
        return "bar";
      }
      over() {
        return "base";
      }
      static _toInflightType() {
        return `
          require("./inflight.FooBase-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooBaseClient = ${FooBase._toInflightType(this)};
            const client = new FooBaseClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class Foo extends FooBase {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      baz() {
        return true;
      }
      over() {
        return "derived";
      }
      static _toInflightType() {
        return `
          require("./inflight.Foo-1.js")({
            $FooBase: ${$stdlib.core.liftObject(FooBase)},
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
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    const foo = new Foo(this, "Foo");
    (expect.Util.equal((foo.bar()), "bar"));
    (expect.Util.equal((foo.baz()), true));
    (expect.Util.equal((foo.over()), "derived"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inheritance_class_preflight.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

