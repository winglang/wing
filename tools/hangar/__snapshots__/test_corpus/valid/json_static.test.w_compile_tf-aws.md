# [json_static.test.w](../../../../../examples/tests/valid/json_static.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $jj, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const ss = $macros.__Json_stringify(false, $std_Json, $jj);
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
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const hasCheck = ({"a": "hello", "b": "wing"});
      $helpers.assert($helpers.eq($macros.__Json_has(false, hasCheck, "a"), true), "hasCheck.has(\"a\") == true");
      $helpers.assert($helpers.eq($macros.__Json_has(false, hasCheck, "c"), false), "hasCheck.has(\"c\") == false");
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
const $macros = require("@winglang/sdk/lib/macros");
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
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
    const k = $macros.__Json_keys(false, std.Json, x);
    $helpers.assert($helpers.eq(k.length, 2), "k.length == 2");
    const v = $macros.__Json_values(false, std.Json, x);
    $helpers.assert($helpers.eq($macros.__Array_at(false, v, 0), 123), "v.at(0) == 123");
    const m = $macros.__Json_deepCopyMut(false, std.Json, x);
    $macros.__MutJson_set(false, m, "a", 321);
    $helpers.assert($helpers.eq($macros.__MutJson_get(false, m, "a"), 321), "m.get(\"a\") == 321");
    const n = $macros.__Json_deepCopy(false, std.Json, m);
    $helpers.assert($helpers.eq(m, n), "m == n");
    let k2 = $macros.__Json_keys(false, std.Json, m);
    $helpers.assert($helpers.eq(k2.length, 2), "k2.length == 2");
    $macros.__Json_delete(false, std.Json, m, "b");
    k2 = $macros.__Json_keys(false, std.Json, m);
    $helpers.assert($helpers.eq(k2.length, 1), "k2.length == 1");
    const s = "{\"a\": 123, \"b\": {\"c\": 456, \"d\": 789}}";
    const j = $macros.__Json_parse(false, std.Json, s);
    $helpers.assert($helpers.eq($macros.__Json_keys(false, std.Json, j).length, 2), "Json.keys(j).length == 2");
    const invalidJson = "invalid";
    const tryParsed = ($macros.__Json_tryParse(false, std.Json, invalidJson) ?? ({"key": "value"}));
    $helpers.assert($helpers.eq($macros.__Json_get(false, tryParsed, "key"), "value"), "tryParsed.get(\"key\") == \"value\"");
    const jj = ({"a": 123, "b": ({"c": 456, "d": 789})});
    const ss = $macros.__Json_stringify(false, std.Json, jj);
    $helpers.assert($helpers.eq(ss, "{\"a\":123,\"b\":{\"c\":456,\"d\":789}}"), "ss == \"\\{\\\"a\\\":123,\\\"b\\\":\\{\\\"c\\\":456,\\\"d\\\":789}}\"");
    const ss2 = $macros.__Json_stringify(false, std.Json, jj, { indent: 2 });
    $helpers.assert($helpers.eq(ss2, "{\n  \"a\": 123,\n  \"b\": {\n    \"c\": 456,\n    \"d\": 789\n  }\n}"), "ss2 == \"\\{\\n  \\\"a\\\": 123,\\n  \\\"b\\\": \\{\\n    \\\"c\\\": 456,\\n    \\\"d\\\": 789\\n  }\\n}\"");
    const jsonOfMany = ({"a": 123, "b": "hello", "c": true});
    $helpers.assert($helpers.eq((std.String.fromJson($macros.__Json_get(false, jsonOfMany, "b"))), "hello"), "str.fromJson(jsonOfMany.get(\"b\")) == \"hello\"");
    $helpers.assert($helpers.eq((std.Number.fromJson($macros.__Json_get(false, jsonOfMany, "a"))), 123), "num.fromJson(jsonOfMany.get(\"a\")) == 123");
    $helpers.assert((std.Boolean.fromJson($macros.__Json_get(false, jsonOfMany, "c"))), "bool.fromJson(jsonOfMany.get(\"c\"))");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Access Json static inflight", new $Closure1(this, "$Closure1"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:has key or not", new $Closure2(this, "$Closure2"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "json_static.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

