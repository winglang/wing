# [std_containers.test.w](../../../../../examples/tests/valid/std_containers.test.w) | compile | tf-aws

## inflight.Animal-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Animal {
    constructor($args) {
      const {  } = $args;
    }
  }
  return Animal;
}
//# sourceMappingURL=inflight.Animal-1.cjs.map
```

## inflight.Cat-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Animal }) {
  class Cat extends $Animal {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return Cat;
}
//# sourceMappingURL=inflight.Cat-1.cjs.map
```

## inflight.Dog-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Animal }) {
  class Dog extends $Animal {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return Dog;
}
//# sourceMappingURL=inflight.Dog-1.cjs.map
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
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class Animal extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Animal-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return { ...(super._liftedState?.() ?? {}) };
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    class Cat extends Animal {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Cat-1.cjs")({
            $Animal: ${$stdlib.core.liftObject(Animal)},
          })
        `;
      }
      _liftedState() {
        return { ...(super._liftedState?.() ?? {}) };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class Dog extends Animal {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Dog-1.cjs")({
            $Animal: ${$stdlib.core.liftObject(Animal)},
          })
        `;
      }
      _liftedState() {
        return { ...(super._liftedState?.() ?? {}) };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    const sArray = ["one", "two"];
    const mutArray = $macros.__Array_copyMut(false, sArray, );
    $macros.__MutArray_push(false, mutArray, "three");
    const immutArray = $macros.__MutArray_copy(false, mutArray, );
    const s = $macros.__Array_at(false, sArray, 1);
    $helpers.assert($helpers.eq(s, "two"), "s == \"two\"");
    $helpers.assert($helpers.eq($macros.__Array_at(false, sArray, 1), "two"), "sArray.at(1) == \"two\"");
    $helpers.assert($helpers.eq(sArray.length, 2), "sArray.length == 2");
    $helpers.assert($helpers.eq(immutArray.length, 3), "immutArray.length == 3");
    const sArray2 = ["if", "you", "build", "it"];
    const sArray3 = ["he", "will", "come", "for", "you"];
    const mergedArray = (sArray2.concat(sArray3));
    $helpers.assert($helpers.eq(mergedArray.length, 9), "mergedArray.length == 9");
    $helpers.assert($helpers.eq($macros.__Array_at(false, mergedArray, 5), "will"), "mergedArray.at(5) == \"will\"");
    $helpers.assert($macros.__Array_contains(false, mergedArray, "build"), "mergedArray.contains(\"build\")");
    $helpers.assert((!$macros.__Array_contains(false, mergedArray, "bring")), "!mergedArray.contains(\"bring\")");
    $helpers.assert($helpers.eq($macros.__Array_indexOf(false, mergedArray, "you"), 1), "mergedArray.indexOf(\"you\") == 1");
    $helpers.assert($helpers.eq((mergedArray.join(" ")), "if you build it he will come for you"), "mergedArray.join(\" \") == \"if you build it he will come for you\"");
    $helpers.assert($helpers.eq((mergedArray.join()), "if,you,build,it,he,will,come,for,you"), "mergedArray.join() == \"if,you,build,it,he,will,come,for,you\"");
    $helpers.assert($helpers.eq($macros.__Array_lastIndexOf(false, mergedArray, "you"), 8), "mergedArray.lastIndexOf(\"you\") == 8");
    const mutArray2 = ["how", "does", "that", "look"];
    const mergedMutArray = (mutArray.concat(mutArray2));
    $helpers.assert($helpers.eq(mergedMutArray.length, 7), "mergedMutArray.length == 7");
    $helpers.assert($helpers.eq($macros.__MutArray_at(false, mergedMutArray, 5), "that"), "mergedMutArray.at(5) == \"that\"");
    const sSet = new Set(["one", "two"]);
    const mutSet = $macros.__Set_copyMut(false, sSet, );
    (mutSet.add("three"));
    const immutSet = $macros.__MutSet_copy(false, mutSet, );
    $helpers.assert((sSet.has("one")), "sSet.has(\"one\")");
    $helpers.assert($helpers.eq(sSet.size, 2), "sSet.size == 2");
    $helpers.assert($helpers.eq(immutSet.size, 3), "immutSet.size == 3");
    const sMap = ({["one"]: 1, ["two"]: 2});
    const nestedMap = ({["a"]: ({["b"]: ({"c": "hello"})})});
    const mutMap = $macros.__Map_copyMut(false, sMap, );
    $macros.__MutMap_set(false, mutMap, "five", 5);
    const immutMap = $macros.__MutMap_copy(false, mutMap, );
    $helpers.assert($helpers.eq($macros.__Map_get(false, sMap, "one"), 1), "sMap.get(\"one\") == 1");
    $helpers.assert($helpers.eq($macros.__Map_size(false, sMap, ), 2), "sMap.size() == 2");
    $helpers.assert($helpers.eq($macros.__Map_size(false, immutMap, ), 3), "immutMap.size() == 3");
    $helpers.assert($helpers.eq($macros.__Json_get(false, $macros.__Map_get(false, $macros.__Map_get(false, nestedMap, "a"), "b"), "c"), "hello"), "nestedMap.get(\"a\").get(\"b\").get(\"c\") == \"hello\"");
    const heterogeneousArray = [new Cat(this, "C1"), new Dog(this, "D1")];
    const heterogeneousDoubleArray = [[new Cat(this, "C2")], [new Cat(this, "C3"), new Dog(this, "D2")], [new Animal(this, "A1")]];
    const heterogeneousSet = new Set([new Cat(this, "C4"), new Dog(this, "D3")]);
    const heterogeneousMap = ({["cat"]: new Cat(this, "C5"), ["dog"]: new Dog(this, "D4")});
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "std_containers.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

