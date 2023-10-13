# [basic.main.w](../../../../../../examples/tests/sdk_tests/fs/basic.main.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $data, $fs_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const tmpdir = (await $fs_Util.mkdtemp());
      const filepath = String.raw({ raw: ["", "/hello-inflight.txt"] }, tmpdir);
      (await $fs_Util.writeFile(filepath,$data));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(filepath)),true)))};
      const content = (await $fs_Util.readFile(filepath));
      {((cond) => {if (!cond) throw new Error("assertion failed: content == data")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(content,$data)))};
      (await $fs_Util.remove(filepath));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(filepath)),false)))};
      const nilContent = (await $fs_Util.tryReadFile(filepath));
      {((cond) => {if (!cond) throw new Error("assertion failed: nilContent == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(nilContent,undefined)))};
      (await $fs_Util.remove(tmpdir,({"recursive": true})));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(tmpdir) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(tmpdir)),false)))};
    }
  }
  return $Closure1;
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

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const fs = $stdlib.fs;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $data: ${context._lift(data)},
            $fs_Util: ${context._lift($stdlib.core.toLiftableModuleType(fs.Util, "@winglang/sdk/fs", "Util"))},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(data, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const tmpdir = (fs.Util.mkdtemp());
    const filepath = String.raw({ raw: ["", "/hello-preflight.txt"] }, tmpdir);
    const data = "Hello, Wing!";
    (fs.Util.writeFile(filepath,data));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(filepath)),true)))};
    const content = (fs.Util.readFile(filepath));
    {((cond) => {if (!cond) throw new Error("assertion failed: content == data")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(content,data)))};
    (fs.Util.remove(filepath));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(filepath)),false)))};
    const nilContent = (fs.Util.tryReadFile(filepath));
    {((cond) => {if (!cond) throw new Error("assertion failed: nilContent == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(nilContent,undefined)))};
    (fs.Util.remove(tmpdir,({"recursive": true})));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(tmpdir) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(tmpdir)),false)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight file basic operations",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "basic.main", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

