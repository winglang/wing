# [yaml.main.w](../../../../../../examples/tests/sdk_tests/fs/yaml.main.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $data, $fs_Util, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const filepath = "/tmp/test-inflight.yaml";
      (await $fs_Util.writeYaml(filepath,$data,$data));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(filepath)),true)))};
      const objs = (await $fs_Util.readYaml(filepath));
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(objs.length,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(objs.at(0)) == Json.stringify(data)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([(await objs.at(0))]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([$data]))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(objs.at(1)) == Json.stringify(data)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([(await objs.at(1))]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([$data]))))};
      (await $fs_Util.remove(filepath));
      {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fs_Util.exists(filepath)),false)))};
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
const regex = $stdlib.regex;
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
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
    const filepath = "/tmp/test-preflight.yaml";
    const data = ({"foo": "bar","arr": [1, 2, 3, "test", ({"foo": "bar"})]});
    try {
      (fs.Util.writeFile(filepath,"invalid: {{ content }}, invalid"));
      (fs.Util.readYaml(filepath));
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: regex.match(\"^bad indentation\", e) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((regex.Util.match("^bad indentation",e)),true)))};
    }
    (fs.Util.writeYaml(filepath,data,data));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(filepath)),true)))};
    const objs = (fs.Util.readYaml(filepath));
    {((cond) => {if (!cond) throw new Error("assertion failed: objs.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(objs.length,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(objs.at(0)) == Json.stringify(data)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([(objs.at(0))]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([data]))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(objs.at(1)) == Json.stringify(data)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([(objs.at(1))]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([data]))))};
    (fs.Util.remove(filepath));
    {((cond) => {if (!cond) throw new Error("assertion failed: fs.exists(filepath) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fs.Util.exists(filepath)),false)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight yaml operations",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "yaml.main", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

