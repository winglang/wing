# [json_static.test.w](../../../../../examples/tests/valid/json_static.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $jj, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const ss = ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([$jj]);
      {((cond) => {if (!cond) throw new Error("assertion failed: ss == \"{\\\"a\\\":123,\\\"b\\\":{\\\"c\\\":456,\\\"d\\\":789}}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(ss,"{\"a\":123,\"b\":{\"c\":456,\"d\":789}}")))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $std_Json }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const hasCheck = ({"a": "hello","b": "wing"});
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.has(hasCheck, \"a\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return args[0].hasOwnProperty(args[1]); })([hasCheck, "a"]),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.has(hasCheck, \"c\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return args[0].hasOwnProperty(args[1]); })([hasCheck, "c"]),false)))};
    }
  }
  return $Closure2;
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $jj: ${context._lift(jj)},
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(jj, host, []);
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
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
    const x = ({"a": 123,"b": ({"c": 456,"d": 789})});
    const k = (Object.keys(x));
    {((cond) => {if (!cond) throw new Error("assertion failed: k.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(k.length,2)))};
    const v = (Object.values(x));
    {((cond) => {if (!cond) throw new Error("assertion failed: v.at(0) == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((v.at(0)),123)))};
    const m = (JSON.parse(JSON.stringify(x)));
    ((obj, args) => { obj[args[0]] = args[1]; })(m, ["a", 321]);
    {((cond) => {if (!cond) throw new Error("assertion failed: m.get(\"a\") == 321")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(m, "a"),321)))};
    const n = JSON.parse(JSON.stringify(m));
    {((cond) => {if (!cond) throw new Error("assertion failed: m == n")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(m,n)))};
    let k2 = (Object.keys(m));
    {((cond) => {if (!cond) throw new Error("assertion failed: k2.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(k2.length,2)))};
    ((args) => { delete (args[0])[args[1]]; })([m, "b"]);
    k2 = (Object.keys(m));
    {((cond) => {if (!cond) throw new Error("assertion failed: k2.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(k2.length,1)))};
    const s = "{\"a\": 123, \"b\": {\"c\": 456, \"d\": 789}}";
    const j = (JSON.parse(s));
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.keys(j).length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Object.keys(j)).length,2)))};
    const invalidJson = "invalid";
    const tryParsed = (((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })(invalidJson) ?? ({"key": "value"}));
    {((cond) => {if (!cond) throw new Error("assertion failed: tryParsed.get(\"key\") == \"value\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(tryParsed, "key"),"value")))};
    const jj = ({"a": 123,"b": ({"c": 456,"d": 789})});
    const ss = ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([jj]);
    {((cond) => {if (!cond) throw new Error("assertion failed: ss == \"{\\\"a\\\":123,\\\"b\\\":{\\\"c\\\":456,\\\"d\\\":789}}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(ss,"{\"a\":123,\"b\":{\"c\":456,\"d\":789}}")))};
    const ss2 = ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([jj, { indent: 2 }]);
    {((cond) => {if (!cond) throw new Error("assertion failed: ss2 == \"{\\n  \\\"a\\\": 123,\\n  \\\"b\\\": {\\n    \\\"c\\\": 456,\\n    \\\"d\\\": 789\\n  }\\n}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(ss2,"{\n  \"a\": 123,\n  \"b\": {\n    \"c\": 456,\n    \"d\": 789\n  }\n}")))};
    const jsonOfMany = ({"a": 123,"b": "hello","c": true});
    {((cond) => {if (!cond) throw new Error("assertion failed: str.fromJson(jsonOfMany.get(\"b\")) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.String.fromJson(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(jsonOfMany, "b"))),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: num.fromJson(jsonOfMany.get(\"a\")) == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Number.fromJson(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(jsonOfMany, "a"))),123)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: bool.fromJson(jsonOfMany.get(\"c\"))")})((std.Boolean.fromJson(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(jsonOfMany, "c"))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:Access Json static inflight", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:has key or not", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "json_static.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

