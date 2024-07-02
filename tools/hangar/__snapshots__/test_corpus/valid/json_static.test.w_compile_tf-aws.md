# [json_static.test.w](../../../../../examples/tests/valid/json_static.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $jj, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const ss = ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })($jj);
      $helpers.assert($helpers.eq(ss, "{\"a\":123,\"b\":{\"c\":456,\"d\":789}}"), "ss == \"\\{\\\"a\\\":123,\\\"b\\\":\\{\\\"c\\\":456,\\\"d\\\":789}}\"");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const hasCheck = ({"a": "hello", "b": "wing"});
      $helpers.assert($helpers.eq(((obj, key) => { return obj.hasOwnProperty(key); })(hasCheck,"a"), true), "hasCheck.has(\"a\") == true");
      $helpers.assert($helpers.eq(((obj, key) => { return obj.hasOwnProperty(key); })(hasCheck,"c"), false), "hasCheck.has(\"c\") == false");
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
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
    const cloud = $stdlib.cloud;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $jj: ${$stdlib.core.liftObject(jj)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType()};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"), ["stringify"]],
            [jj, []],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"), []],
            [jj, []],
          ],
        });
      }
    }
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType()};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    const x = ({"a": 123, "b": ({"c": 456, "d": 789})});
    const k = Object.keys(x);
    $helpers.assert($helpers.eq(k.length, 2), "k.length == 2");
    const v = Object.values(x);
    $helpers.assert($helpers.eq(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(v, 0), 123), "v.at(0) == 123");
    const m = JSON.parse(JSON.stringify(x));
    ((obj, key, value) => { obj[key] = value; })(m, "a", 321);
    $helpers.assert($helpers.eq(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(m, "a"), 321), "m.get(\"a\") == 321");
    const n = JSON.parse(JSON.stringify(m));
    $helpers.assert($helpers.eq(m, n), "m == n");
    let k2 = Object.keys(m);
    $helpers.assert($helpers.eq(k2.length, 2), "k2.length == 2");
    ((json, key) => { delete json[key]; })(m, "b");
    k2 = Object.keys(m);
    $helpers.assert($helpers.eq(k2.length, 1), "k2.length == 1");
    const s = "{\"a\": 123, \"b\": {\"c\": 456, \"d\": 789}}";
    const j = JSON.parse(s);
    $helpers.assert($helpers.eq(Object.keys(j).length, 2), "Json.keys(j).length == 2");
    const invalidJson = "invalid";
    const tryParsed = (((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })(invalidJson) ?? ({"key": "value"}));
    $helpers.assert($helpers.eq(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(tryParsed, "key"), "value"), "tryParsed.get(\"key\") == \"value\"");
    const jj = ({"a": 123, "b": ({"c": 456, "d": 789})});
    const ss = ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(jj);
    $helpers.assert($helpers.eq(ss, "{\"a\":123,\"b\":{\"c\":456,\"d\":789}}"), "ss == \"\\{\\\"a\\\":123,\\\"b\\\":\\{\\\"c\\\":456,\\\"d\\\":789}}\"");
    const ss2 = ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(jj, { indent: 2 });
    $helpers.assert($helpers.eq(ss2, "{\n  \"a\": 123,\n  \"b\": {\n    \"c\": 456,\n    \"d\": 789\n  }\n}"), "ss2 == \"\\{\\n  \\\"a\\\": 123,\\n  \\\"b\\\": \\{\\n    \\\"c\\\": 456,\\n    \\\"d\\\": 789\\n  }\\n}\"");
    const jsonOfMany = ({"a": 123, "b": "hello", "c": true});
    $helpers.assert($helpers.eq((std.String.fromJson(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(jsonOfMany, "b"))), "hello"), "str.fromJson(jsonOfMany.get(\"b\")) == \"hello\"");
    $helpers.assert($helpers.eq((std.Number.fromJson(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(jsonOfMany, "a"))), 123), "num.fromJson(jsonOfMany.get(\"a\")) == 123");
    $helpers.assert((std.Boolean.fromJson(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(jsonOfMany, "c"))), "bool.fromJson(jsonOfMany.get(\"c\"))");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:Access Json static inflight", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:has key or not", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "json_static.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

