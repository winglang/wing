# [extern_implementation.test.w](../../../../../examples/tests/valid/extern_implementation.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $f }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $f.call());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $Foo }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $Foo.print("hey there"));
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
    constructor({  }) {
    }
    static async regexInflight(pattern, text) {
      return (require("<ABSOLUTE_PATH>/external_js.js")["regexInflight"])(pattern, text)
    }
    static async getUuid() {
      return (require("<ABSOLUTE_PATH>/external_js.js")["getUuid"])()
    }
    static async getData() {
      return (require("<ABSOLUTE_PATH>/external_js.js")["getData"])()
    }
    static async print(msg) {
      return (require("<ABSOLUTE_PATH>/external_js.js")["print"])(msg)
    }
    async call() {
      {((cond) => {if (!cond) throw new Error("assertion failed: Foo.regexInflight(\"[a-z]+-\\\\d+\", \"abc-123\")")})((await Foo.regexInflight("[a-z]+-\\d+", "abc-123")))};
      const uuid = (await Foo.getUuid());
      {((cond) => {if (!cond) throw new Error("assertion failed: uuid.length == 36")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(uuid.length,36)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Foo.getData() == \"Cool data!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await Foo.getData()),"Cool data!")))};
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
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static getGreeting(name) {
        return (require("<ABSOLUTE_PATH>/external_js.js")["getGreeting"])(name)
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
        return ["regexInflight", "getUuid", "getData", "print", "call", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("call")) {
          Foo._registerOnLiftObject(Foo, host, ["getData", "getUuid", "regexInflight"]);
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
            $f: ${context._lift(f)},
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
          $Closure1._registerOnLiftObject(f, host, ["call"]);
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
            $Foo: ${context._lift(Foo)},
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
          $Closure2._registerOnLiftObject(Foo, host, ["print"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: Foo.getGreeting(\"Wingding\") == \"Hello, Wingding!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Foo.getGreeting("Wingding")),"Hello, Wingding!")))};
    const f = new Foo(this, "Foo");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:call", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:console", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "extern_implementation.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

