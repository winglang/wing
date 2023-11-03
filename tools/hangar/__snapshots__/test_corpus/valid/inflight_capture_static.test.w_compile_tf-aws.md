# [inflight_capture_static.test.w](../../../../../examples/tests/valid/inflight_capture_static.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $Preflight }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: Preflight.staticMethod(123) == \"foo-123\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $Preflight.staticMethod(123)),"foo-123")))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $OuterInflight }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: OuterInflight.staticMethod(\"hello\") == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $OuterInflight.staticMethod("hello")),5)))};
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
      class InnerInflight {
        static async staticMethod() {
          return "hello";
        }
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: InnerInflight.staticMethod() == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await InnerInflight.staticMethod()),"hello")))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
"use strict";
module.exports = function({ $util_Util }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {
        const $if_let_value = (await $util_Util.tryEnv("WING_TARGET"));
        if ($if_let_value != undefined) {
          const target = $if_let_value;
          {console.log(String.raw({ raw: ["WING_TARGET=", ""] }, target))};
        }
        else {
          {((cond) => {if (!cond) throw new Error("assertion failed: false /* target not defined*/")})(false)};
        }
      }
    }
  }
  return $Closure4;
}

```

## inflight.OuterInflight-1.js
```js
"use strict";
module.exports = function({  }) {
  class OuterInflight {
    static async staticMethod(b) {
      return b.length;
    }
  }
  return OuterInflight;
}

```

## inflight.Preflight-1.js
```js
"use strict";
module.exports = function({  }) {
  class Preflight {
    constructor({  }) {
    }
    static async staticMethod(a) {
      return String.raw({ raw: ["foo-", ""] }, a);
    }
  }
  return Preflight;
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
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Preflight extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Preflight-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const PreflightClient = ${Preflight._toInflightType(this)};
            const client = new PreflightClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["staticMethod", "$inflight_init"];
      }
    }
    class OuterInflight extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.OuterInflight-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const OuterInflightClient = ${OuterInflight._toInflightType(this)};
            const client = new OuterInflightClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["staticMethod", "$inflight_init"];
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
            $Preflight: ${context._lift(Preflight)},
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
          $Closure1._registerOnLiftObject(Preflight, host, ["staticMethod"]);
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
            $OuterInflight: ${context._lift(OuterInflight)},
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
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.js")({
            $util_Util: ${context._lift($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this)};
            const client = new $Closure4Client({
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:call static method of preflight", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:call static method of an outer inflight class", new $Closure2(this, "$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:call static method of an inner inflight class", new $Closure3(this, "$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:call static method of a namespaced type", new $Closure4(this, "$Closure4"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_capture_static.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

