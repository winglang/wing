# [assert.main.w](../../../../../../examples/tests/sdk_tests/testing/assert.main.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $a, $b, $testing_Assert }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $testing_Assert.equal(1, 1));
      (await $testing_Assert.equal($b, 1));
      (await $testing_Assert.isNil($a));
      (await $testing_Assert.notEqual($b, 2));
      (await $testing_Assert.notEqual($b, "hello"));
      (await $testing_Assert.notEqual($b, true));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $c, $d, $testing_Assert }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $testing_Assert.equal("hello", "hello"));
      (await $testing_Assert.equal($d, "hello"));
      (await $testing_Assert.isNil($c));
      (await $testing_Assert.notEqual($d, "world"));
      (await $testing_Assert.notEqual($d, 1));
      (await $testing_Assert.notEqual($d, true));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
"use strict";
module.exports = function({ $e, $f, $testing_Assert }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $testing_Assert.equal(true, true));
      (await $testing_Assert.equal($f, true));
      (await $testing_Assert.isNil($e));
      (await $testing_Assert.notEqual($f, false));
    }
  }
  return $Closure3;
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
const util = $stdlib.util;
const testing = $stdlib.testing;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $a: ${context._lift(a)},
            $b: ${context._lift(b)},
            $testing_Assert: ${context._lift($stdlib.core.toLiftableModuleType(testing.Assert, "@winglang/sdk/testing", "Assert"))},
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
          $Closure1._registerOnLiftObject(a, host, []);
          $Closure1._registerOnLiftObject(b, host, []);
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
            $c: ${context._lift(c)},
            $d: ${context._lift(d)},
            $testing_Assert: ${context._lift($stdlib.core.toLiftableModuleType(testing.Assert, "@winglang/sdk/testing", "Assert"))},
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
          $Closure2._registerOnLiftObject(c, host, []);
          $Closure2._registerOnLiftObject(d, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
            $e: ${context._lift(e)},
            $f: ${context._lift(f)},
            $testing_Assert: ${context._lift($stdlib.core.toLiftableModuleType(testing.Assert, "@winglang/sdk/testing", "Assert"))},
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerOnLiftObject(e, host, []);
          $Closure3._registerOnLiftObject(f, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const a = undefined;
    const b = 1;
    (testing.Assert.equal(1, 1));
    (testing.Assert.equal(b, 1));
    (testing.Assert.isNil(a));
    (testing.Assert.notEqual(b, 2));
    (testing.Assert.notEqual(b, "hello"));
    (testing.Assert.notEqual(b, true));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:equal num", new $Closure1(this, "$Closure1"));
    const c = undefined;
    const d = "hello";
    (testing.Assert.equal("hello", "hello"));
    (testing.Assert.equal(d, "hello"));
    (testing.Assert.isNil(c));
    (testing.Assert.notEqual(d, "world"));
    (testing.Assert.notEqual(d, 1));
    (testing.Assert.notEqual(d, true));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:equal str", new $Closure2(this, "$Closure2"));
    const e = undefined;
    const f = true;
    (testing.Assert.equal(true, true));
    (testing.Assert.equal(f, true));
    (testing.Assert.isNil(e));
    (testing.Assert.notEqual(f, false));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:equal bool", new $Closure3(this, "$Closure3"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "assert.main", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

