# [deep_equality.test.w](../../../../../tests/valid/deep_equality.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $numA, $numB, $strA, $strB }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($numA, $numA), "numA == numA");
      $helpers.assert($helpers.eq($numA, $numB), "numA == numB");
      $helpers.assert($helpers.eq($strA, $strA), "strA == strA");
      $helpers.assert($helpers.eq($strA, $strB), "strA == strB");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure10-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $arrayA, $arrayB }) {
  class $Closure10 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($arrayA, $arrayA), "arrayA == arrayA");
      $helpers.assert($helpers.eq($arrayA, $arrayB), "arrayA == arrayB");
    }
  }
  return $Closure10;
}
//# sourceMappingURL=inflight.$Closure10-1.cjs.map
```

## inflight.$Closure11-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $arrayA, $arrayB, $arrayC }) {
  class $Closure11 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.neq($arrayA, $arrayC), "arrayA != arrayC");
      $helpers.assert((!$helpers.neq($arrayA, $arrayB)), "!(arrayA != arrayB)");
    }
  }
  return $Closure11;
}
//# sourceMappingURL=inflight.$Closure11-1.cjs.map
```

## inflight.$Closure12-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $cat1, $cat2 }) {
  class $Closure12 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($cat1, $cat1), "cat1 == cat1");
      $helpers.assert($helpers.eq($cat1, $cat2), "cat1 == cat2");
    }
  }
  return $Closure12;
}
//# sourceMappingURL=inflight.$Closure12-1.cjs.map
```

## inflight.$Closure13-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $cat1, $cat2, $cat3 }) {
  class $Closure13 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.neq($cat1, $cat3), "cat1 != cat3");
      $helpers.assert((!$helpers.neq($cat1, $cat2)), "!(cat1 != cat2)");
    }
  }
  return $Closure13;
}
//# sourceMappingURL=inflight.$Closure13-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $numA, $numC, $strA, $strC }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.neq($numA, $numC), "numA != numC");
      $helpers.assert($helpers.neq($strA, $strC), "strA != strC");
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $jsonA, $jsonB }) {
  class $Closure3 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($jsonA, $jsonA), "jsonA == jsonA");
      $helpers.assert($helpers.eq($jsonA, $jsonB), "jsonA == jsonB");
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map
```

## inflight.$Closure4-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $jsonA, $jsonB, $jsonC }) {
  class $Closure4 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.neq($jsonA, $jsonC), "jsonA != jsonC");
      $helpers.assert((!$helpers.neq($jsonA, $jsonB)), "!(jsonA != jsonB)");
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.cjs.map
```

## inflight.$Closure5-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $std_Json }) {
  class $Closure5 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const j = ({"hello": 123, "world": [1, 2, 3]});
      $helpers.assert($helpers.eq($macros.__Json_values(false, $std_Json, j), [123, [1, 2, 3]]), "Json.values(j) == [Json 123, Json [1, 2, 3]]");
    }
  }
  return $Closure5;
}
//# sourceMappingURL=inflight.$Closure5-1.cjs.map
```

## inflight.$Closure6-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $setA, $setB }) {
  class $Closure6 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($setA, $setA), "setA == setA");
      $helpers.assert($helpers.eq($setA, $setB), "setA == setB");
    }
  }
  return $Closure6;
}
//# sourceMappingURL=inflight.$Closure6-1.cjs.map
```

## inflight.$Closure7-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $setA, $setB, $setC }) {
  class $Closure7 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.neq($setA, $setC), "setA != setC");
      $helpers.assert((!$helpers.neq($setA, $setB)), "!(setA != setB)");
    }
  }
  return $Closure7;
}
//# sourceMappingURL=inflight.$Closure7-1.cjs.map
```

## inflight.$Closure8-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $mapA, $mapB }) {
  class $Closure8 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($mapA, $mapA), "mapA == mapA");
      $helpers.assert($helpers.eq($mapA, $mapB), "mapA == mapB");
    }
  }
  return $Closure8;
}
//# sourceMappingURL=inflight.$Closure8-1.cjs.map
```

## inflight.$Closure9-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $mapA, $mapB, $mapC }) {
  class $Closure9 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.neq($mapA, $mapC), "mapA != mapC");
      $helpers.assert((!$helpers.neq($mapA, $mapB)), "!(mapA != mapB)");
    }
  }
  return $Closure9;
}
//# sourceMappingURL=inflight.$Closure9-1.cjs.map
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
const $types = require("./types.cjs");
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
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
            $numA: ${$stdlib.core.liftObject(numA)},
            $numB: ${$stdlib.core.liftObject(numB)},
            $strA: ${$stdlib.core.liftObject(strA)},
            $strB: ${$stdlib.core.liftObject(strB)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [numA, []],
            [numB, []],
            [strA, []],
            [strB, []],
          ],
          "$inflight_init": [
            [numA, []],
            [numB, []],
            [strA, []],
            [strB, []],
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
            $numA: ${$stdlib.core.liftObject(numA)},
            $numC: ${$stdlib.core.liftObject(numC)},
            $strA: ${$stdlib.core.liftObject(strA)},
            $strC: ${$stdlib.core.liftObject(strC)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [numA, []],
            [numC, []],
            [strA, []],
            [strC, []],
          ],
          "$inflight_init": [
            [numA, []],
            [numC, []],
            [strA, []],
            [strC, []],
          ],
        });
      }
    }
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.cjs")({
            $jsonA: ${$stdlib.core.liftObject(jsonA)},
            $jsonB: ${$stdlib.core.liftObject(jsonB)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [jsonA, []],
            [jsonB, []],
          ],
          "$inflight_init": [
            [jsonA, []],
            [jsonB, []],
          ],
        });
      }
    }
    class $Closure4 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.cjs")({
            $jsonA: ${$stdlib.core.liftObject(jsonA)},
            $jsonB: ${$stdlib.core.liftObject(jsonB)},
            $jsonC: ${$stdlib.core.liftObject(jsonC)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [jsonA, []],
            [jsonB, []],
            [jsonC, []],
          ],
          "$inflight_init": [
            [jsonA, []],
            [jsonB, []],
            [jsonC, []],
          ],
        });
      }
    }
    class $Closure5 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure5-1.cjs")({
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Json") ?? std.Json, "@winglang/sdk/std", "Json"))},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Json") ?? std.Json, "@winglang/sdk/std", "Json"), ["values"]],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.std.Json") ?? std.Json, "@winglang/sdk/std", "Json"), []],
          ],
        });
      }
    }
    class $Closure6 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure6-1.cjs")({
            $setA: ${$stdlib.core.liftObject(setA)},
            $setB: ${$stdlib.core.liftObject(setB)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [setA, []],
            [setB, []],
          ],
          "$inflight_init": [
            [setA, []],
            [setB, []],
          ],
        });
      }
    }
    class $Closure7 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure7-1.cjs")({
            $setA: ${$stdlib.core.liftObject(setA)},
            $setB: ${$stdlib.core.liftObject(setB)},
            $setC: ${$stdlib.core.liftObject(setC)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [setA, []],
            [setB, []],
            [setC, []],
          ],
          "$inflight_init": [
            [setA, []],
            [setB, []],
            [setC, []],
          ],
        });
      }
    }
    class $Closure8 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure8-1.cjs")({
            $mapA: ${$stdlib.core.liftObject(mapA)},
            $mapB: ${$stdlib.core.liftObject(mapB)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [mapA, []],
            [mapB, []],
          ],
          "$inflight_init": [
            [mapA, []],
            [mapB, []],
          ],
        });
      }
    }
    class $Closure9 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure9-1.cjs")({
            $mapA: ${$stdlib.core.liftObject(mapA)},
            $mapB: ${$stdlib.core.liftObject(mapB)},
            $mapC: ${$stdlib.core.liftObject(mapC)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [mapA, []],
            [mapB, []],
            [mapC, []],
          ],
          "$inflight_init": [
            [mapA, []],
            [mapB, []],
            [mapC, []],
          ],
        });
      }
    }
    class $Closure10 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure10-1.cjs")({
            $arrayA: ${$stdlib.core.liftObject(arrayA)},
            $arrayB: ${$stdlib.core.liftObject(arrayB)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [arrayA, []],
            [arrayB, []],
          ],
          "$inflight_init": [
            [arrayA, []],
            [arrayB, []],
          ],
        });
      }
    }
    class $Closure11 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure11-1.cjs")({
            $arrayA: ${$stdlib.core.liftObject(arrayA)},
            $arrayB: ${$stdlib.core.liftObject(arrayB)},
            $arrayC: ${$stdlib.core.liftObject(arrayC)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [arrayA, []],
            [arrayB, []],
            [arrayC, []],
          ],
          "$inflight_init": [
            [arrayA, []],
            [arrayB, []],
            [arrayC, []],
          ],
        });
      }
    }
    class $Closure12 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure12-1.cjs")({
            $cat1: ${$stdlib.core.liftObject(cat1)},
            $cat2: ${$stdlib.core.liftObject(cat2)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [cat1, []],
            [cat2, []],
          ],
          "$inflight_init": [
            [cat1, []],
            [cat2, []],
          ],
        });
      }
    }
    class $Closure13 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure13-1.cjs")({
            $cat1: ${$stdlib.core.liftObject(cat1)},
            $cat2: ${$stdlib.core.liftObject(cat2)},
            $cat3: ${$stdlib.core.liftObject(cat3)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [cat1, []],
            [cat2, []],
            [cat3, []],
          ],
          "$inflight_init": [
            [cat1, []],
            [cat2, []],
            [cat3, []],
          ],
        });
      }
    }
    const numA = 1;
    const numB = 1;
    const numC = 10;
    const strA = "wing";
    const strB = "wing";
    const strC = "wingnuts";
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Primitive types with the same value", new $Closure1(this, "$Closure1"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Primitive types with different values", new $Closure2(this, "$Closure2"));
    const jsonA = ({"a": 1});
    const jsonB = ({"a": 1});
    const jsonC = [1, 2, 3];
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Json with the same value", new $Closure3(this, "$Closure3"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Json with different values", new $Closure4(this, "$Closure4"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Json.values equality", new $Closure5(this, "$Closure5"));
    const setA = new Set([1, 2, 3]);
    const setB = new Set([1, 2, 3]);
    const setC = new Set([4, 5, 6]);
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Set types with the same value", new $Closure6(this, "$Closure6"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Set types with different values", new $Closure7(this, "$Closure7"));
    const mapA = ({["a"]: 1, ["b"]: 2});
    const mapB = ({["a"]: 1, ["b"]: 2});
    const mapC = ({["c"]: 10, ["b"]: 2});
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Map with the same value", new $Closure8(this, "$Closure8"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Map with different values", new $Closure9(this, "$Closure9"));
    const arrayA = [1, 2, 3];
    const arrayB = [1, 2, 3];
    const arrayC = [4, 5, 6];
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Array with the same value", new $Closure10(this, "$Closure10"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Array with different values", new $Closure11(this, "$Closure11"));
    const cat1 = ({"name": "Mittens", "age": 3});
    const cat2 = ({"name": "Mittens", "age": 3});
    const cat3 = ({"name": "Simba", "age": 5});
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Struct with the same value", new $Closure12(this, "$Closure12"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:Struct with different values", new $Closure13(this, "$Closure13"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "deep_equality.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

