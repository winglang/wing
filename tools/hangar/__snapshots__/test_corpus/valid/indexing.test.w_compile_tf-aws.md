# [indexing.test.w](../../../../../examples/tests/valid/indexing.test.w) | compile | tf-aws

## inflight.A-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class A {
    constructor({  }) {
    }
  }
  return A;
}
//# sourceMappingURL=inflight.A-1.cjs.map
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
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
globalThis.$PolyconFactory = $PlatformManager.createPolyconFactory();
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    const expect = $stdlib.expect;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.value = 5;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.A-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AClient = ${A._toInflightType()};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    const arr = [1, 2, 3];
    $helpers.assert($helpers.eq($helpers.lookup(arr, 0), 1), "arr[0] == 1");
    $helpers.assert($helpers.eq($helpers.lookup(arr, (2 - 5)), 1), "arr[2 - 5] == 1");
    $helpers.assert($helpers.neq($helpers.lookup(arr, 0), $helpers.lookup(arr, 1)), "arr[0] != arr[1]");
    try {
      $helpers.lookup(arr, (-5));
    }
    catch ($error_e) {
      const e = $error_e.message;
      $helpers.assert($helpers.eq(e, "Index -5 out of bounds for array of length 3"), "e == \"Index -5 out of bounds for array of length 3\"");
    }
    try {
      $helpers.lookup(arr, 5);
    }
    catch ($error_e) {
      const e = $error_e.message;
      $helpers.assert($helpers.eq(e, "Index 5 out of bounds for array of length 3"), "e == \"Index 5 out of bounds for array of length 3\"");
    }
    const map = ({["us-east-1"]: 5, ["us-west-2"]: 8});
    (expect.Util.equal($helpers.lookup(map, "us-east-1"), 5));
    try {
      $helpers.lookup(map, "us-west-1");
    }
    catch ($error_e) {
      const e = $error_e.message;
      $helpers.assert($helpers.eq(e, "Key \"us-west-1\" not found"), "e == \"Key \\\"us-west-1\\\" not found\"");
    }
    const obj = ({"a": "string", "b": [4, 5, 6]});
    (expect.Util.equal($helpers.lookup(obj, "a"), "string"));
    (expect.Util.equal($helpers.lookup($helpers.lookup(obj, "b"), 0), 4));
    try {
      $helpers.lookup(obj, "c");
    }
    catch ($error_e) {
      const e = $error_e.message;
      $helpers.assert($helpers.eq(e, "Key \"c\" not found"), "e == \"Key \\\"c\\\" not found\"");
    }
    const mutjson = ({"a": "string", "b": [4, 5, 6]});
    $helpers.assign(mutjson, "a", "=", true);
    (expect.Util.equal($helpers.lookup(mutjson, "a"), true));
    $helpers.assign(mutjson, "c", "=", 10);
    try {
      $helpers.lookup($helpers.lookup(mutjson, "b"), 4);
    }
    catch ($error_e) {
      const e = $error_e.message;
      $helpers.assert($helpers.eq(e, "Index 4 out of bounds for array of length 3"), "e == \"Index 4 out of bounds for array of length 3\"");
    }
    const mutarr = [1, 2, 3];
    $helpers.assign(mutarr, (-3), "=", 5);
    $helpers.assign(mutarr, (10 - 8), "=", 10);
    (expect.Util.equal(mutarr, [5, 2, 10]));
    const s = "hello world";
    (expect.Util.equal($helpers.lookup(s, 4), "o"));
    const a = new A(this, "A");
    const mutarr2 = [a];
    $helpers.lookup(mutarr2, 0).value = 10;
    (expect.Util.equal(a.value, 10));
    const nested = [[1, 2], [3, 4]];
    $helpers.assert($helpers.eq($helpers.lookup($helpers.lookup(nested, 0), 0), 1), "nested[0][0] == 1");
    $helpers.assert($helpers.eq($helpers.lookup($helpers.lookup(nested, (-1)), (-1)), 4), "nested[-1][-1] == 4");
    $helpers.assign($helpers.lookup(nested, 0), 0, "=", 5);
    $helpers.assert($helpers.eq($helpers.lookup($helpers.lookup(nested, 0), 0), 5), "nested[0][0] == 5");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "indexing.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'], polyconFactory: globalThis.$PolyconFactory });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

