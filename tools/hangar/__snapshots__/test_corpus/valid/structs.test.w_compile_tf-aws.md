# [structs.test.w](../../../../../examples/tests/valid/structs.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const s2 = ({"a": "foo"});
      $helpers.assert($helpers.eq(s2.a, "foo"), "s2.a == \"foo\"");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Foo {
    constructor($args) {
      const { $this_data_field0 } = $args;
      this.$this_data_field0 = $this_data_field0;
    }
    async getStuff() {
      return this.$this_data_field0;
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.cjs.map
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
    const expect = $stdlib.expect;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, b) {
        super($scope, $id);
        this.data = b;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
          $this_data_field0: $stdlib.core.liftObject(this.data.field0),
        };
      }
      get _liftMap() {
        return ({
          "getStuff": [
            [this.data.field0, []],
          ],
          "$inflight_init": [
            [this.data.field0, []],
          ],
        });
      }
    }
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
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
    const a = undefined;
    const x = ({"field0": "Sup"});
    const y = ({"field0": "hello", "field1": 1, "field2": "world", "field3": ({"field0": "foo"})});
    $helpers.assert($helpers.eq(x.field0, "Sup"), "x.field0 == \"Sup\"");
    $helpers.assert($helpers.eq(y.field1, 1), "y.field1 == 1");
    $helpers.assert($helpers.eq(y.field3.field0, "foo"), "y.field3.field0 == \"foo\"");
    const s = ({"a": "Boom baby"});
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:struct definitions are phase independant", new $Closure1(this, "$Closure1"));
    const aNode = ({"val": "someval"});
    const bNode = ({"val": "otherval", "next": aNode});
    (expect.Util.equal($macros.__Json_stringify(false, std.Json, bNode), "{\"val\":\"otherval\",\"next\":{\"val\":\"someval\"\}\}"));
    const numField = 1337;
    const strField = "leet";
    const boolField = true;
    const structField = ({"numField": numField});
    const someStruct3 = ({"boolField": boolField, "strField": strField, "otherField": "good", "structField": structField});
    $helpers.assert($helpers.eq(someStruct3.boolField, true), "someStruct3.boolField == true");
    $helpers.assert($helpers.eq(someStruct3.strField, "leet"), "someStruct3.strField == \"leet\"");
    $helpers.assert($helpers.eq(someStruct3.structField.numField, 1337), "someStruct3.structField.numField == 1337");
    $helpers.assert($helpers.eq(someStruct3.otherField, "good"), "someStruct3.otherField == \"good\"");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "structs.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

