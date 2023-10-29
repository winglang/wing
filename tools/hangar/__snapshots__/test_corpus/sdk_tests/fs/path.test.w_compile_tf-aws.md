# [path.test.w](../../../../../../examples/tests/sdk_tests/fs/path.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $from, $fs_Util, $regex_Util, $to }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      let result = (await $fs_Util.join($from, $to));
      {((cond) => {if (!cond) throw new Error("assertion failed: result == \"/a/b/c/d/a/b/e/f\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(result,"/a/b/c/d/a/b/e/f")))};
      result = (await $fs_Util.relative($from, $to));
      {((cond) => {if (!cond) throw new Error("assertion failed: result == \"../../e/f\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(result,"../../e/f")))};
      result = (await $fs_Util.dirname($from));
      {((cond) => {if (!cond) throw new Error("assertion failed: result == \"/a/b/c\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(result,"/a/b/c")))};
      result = (await $fs_Util.basename($from));
      {((cond) => {if (!cond) throw new Error("assertion failed: result == \"d\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(result,"d")))};
      result = (await $fs_Util.resolve($from, $to));
      {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"/a/b/e/f\", result)")})((await $regex_Util.match("/a/b/e/f", result)))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.js.map
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
const fs = $stdlib.fs;
const regex = $stdlib.regex;
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
            $from: ${context._lift(from)},
            $fs_Util: ${context._lift($stdlib.core.toLiftableModuleType(fs.Util, "@winglang/sdk/fs", "Util"))},
            $regex_Util: ${context._lift($stdlib.core.toLiftableModuleType(regex.Util, "@winglang/sdk/regex", "Util"))},
            $to: ${context._lift(to)},
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
          $Closure1._registerOnLiftObject(from, host, []);
          $Closure1._registerOnLiftObject(to, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const from = "/a/b/c/d";
    const to = "/a/b/e/f";
    let result = (fs.Util.join(from, to));
    {((cond) => {if (!cond) throw new Error("assertion failed: result == \"/a/b/c/d/a/b/e/f\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(result,"/a/b/c/d/a/b/e/f")))};
    result = (fs.Util.relative(from, to));
    {((cond) => {if (!cond) throw new Error("assertion failed: result == \"../../e/f\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(result,"../../e/f")))};
    result = (fs.Util.dirname(from));
    {((cond) => {if (!cond) throw new Error("assertion failed: result == \"/a/b/c\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(result,"/a/b/c")))};
    result = (fs.Util.basename(from));
    {((cond) => {if (!cond) throw new Error("assertion failed: result == \"d\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(result,"d")))};
    result = (fs.Util.resolve(from, to));
    {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"/a/b/e/f\", result)")})((regex.Util.match("/a/b/e/f", result)))};
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight path conversion", new $Closure1(this, "$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "path.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();
//# sourceMappingURL=preflight.js.map
```

