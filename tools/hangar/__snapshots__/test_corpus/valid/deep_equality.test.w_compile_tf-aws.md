# [deep_equality.test.w](../../../../../examples/tests/valid/deep_equality.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $numA, $numB, $strA, $strB }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: numA == numA")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($numA,$numA)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: numA == numB")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($numA,$numB)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: strA == strA")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($strA,$strA)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: strA == strB")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($strA,$strB)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure10-1.js
```js
"use strict";
module.exports = function({ $arrayA, $arrayB, $arrayC }) {
  class $Closure10 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: arrayA != arrayC")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })($arrayA,$arrayC)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !(arrayA != arrayB)")})((!(((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })($arrayA,$arrayB))))};
    }
  }
  return $Closure10;
}

```

## inflight.$Closure11-1.js
```js
"use strict";
module.exports = function({ $cat1, $cat2 }) {
  class $Closure11 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: cat1 == cat1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($cat1,$cat1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: cat1 == cat2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($cat1,$cat2)))};
    }
  }
  return $Closure11;
}

```

## inflight.$Closure12-1.js
```js
"use strict";
module.exports = function({ $cat1, $cat2, $cat3 }) {
  class $Closure12 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: cat1 != cat3")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })($cat1,$cat3)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !(cat1 != cat2)")})((!(((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })($cat1,$cat2))))};
    }
  }
  return $Closure12;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $numA, $numC, $strA, $strC }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: numA != numC")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })($numA,$numC)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: strA != strC")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })($strA,$strC)))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
"use strict";
module.exports = function({ $jsonA, $jsonB }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: jsonA == jsonA")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($jsonA,$jsonA)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: jsonA == jsonB")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($jsonA,$jsonB)))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
"use strict";
module.exports = function({ $jsonA, $jsonB, $jsonC }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: jsonA != jsonC")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })($jsonA,$jsonC)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !(jsonA != jsonB)")})((!(((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })($jsonA,$jsonB))))};
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-1.js
```js
"use strict";
module.exports = function({ $setA, $setB }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: setA == setA")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($setA,$setA)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: setA == setB")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($setA,$setB)))};
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6-1.js
```js
"use strict";
module.exports = function({ $setA, $setB, $setC }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: setA != setC")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })($setA,$setC)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !(setA != setB)")})((!(((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })($setA,$setB))))};
    }
  }
  return $Closure6;
}

```

## inflight.$Closure7-1.js
```js
"use strict";
module.exports = function({ $mapA, $mapB }) {
  class $Closure7 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: mapA == mapA")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($mapA,$mapA)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mapA == mapB")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($mapA,$mapB)))};
    }
  }
  return $Closure7;
}

```

## inflight.$Closure8-1.js
```js
"use strict";
module.exports = function({ $mapA, $mapB, $mapC }) {
  class $Closure8 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: mapA != mapC")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })($mapA,$mapC)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !(mapA != mapB)")})((!(((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })($mapA,$mapB))))};
    }
  }
  return $Closure8;
}

```

## inflight.$Closure9-1.js
```js
"use strict";
module.exports = function({ $arrayA, $arrayB }) {
  class $Closure9 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: arrayA == arrayA")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($arrayA,$arrayA)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: arrayA == arrayB")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($arrayA,$arrayB)))};
    }
  }
  return $Closure9;
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
            $numA: ${context._lift(numA)},
            $numB: ${context._lift(numB)},
            $strA: ${context._lift(strA)},
            $strB: ${context._lift(strB)},
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
          $Closure1._registerOnLiftObject(numA, host, []);
          $Closure1._registerOnLiftObject(numB, host, []);
          $Closure1._registerOnLiftObject(strA, host, []);
          $Closure1._registerOnLiftObject(strB, host, []);
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
            $numA: ${context._lift(numA)},
            $numC: ${context._lift(numC)},
            $strA: ${context._lift(strA)},
            $strC: ${context._lift(strC)},
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
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerOnLiftObject(numA, host, []);
          $Closure2._registerOnLiftObject(numC, host, []);
          $Closure2._registerOnLiftObject(strA, host, []);
          $Closure2._registerOnLiftObject(strC, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
            $jsonA: ${context._lift(jsonA)},
            $jsonB: ${context._lift(jsonB)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
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
          $Closure3._registerOnLiftObject(jsonA, host, []);
          $Closure3._registerOnLiftObject(jsonB, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.js")({
            $jsonA: ${context._lift(jsonA)},
            $jsonB: ${context._lift(jsonB)},
            $jsonC: ${context._lift(jsonC)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this)};
            const client = new $Closure4Client({
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
          $Closure4._registerOnLiftObject(jsonA, host, []);
          $Closure4._registerOnLiftObject(jsonB, host, []);
          $Closure4._registerOnLiftObject(jsonC, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure5-1.js")({
            $setA: ${context._lift(setA)},
            $setB: ${context._lift(setB)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType(this)};
            const client = new $Closure5Client({
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
          $Closure5._registerOnLiftObject(setA, host, []);
          $Closure5._registerOnLiftObject(setB, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure6 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure6-1.js")({
            $setA: ${context._lift(setA)},
            $setB: ${context._lift(setB)},
            $setC: ${context._lift(setC)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure6Client = ${$Closure6._toInflightType(this)};
            const client = new $Closure6Client({
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
          $Closure6._registerOnLiftObject(setA, host, []);
          $Closure6._registerOnLiftObject(setB, host, []);
          $Closure6._registerOnLiftObject(setC, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure7 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure7-1.js")({
            $mapA: ${context._lift(mapA)},
            $mapB: ${context._lift(mapB)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure7Client = ${$Closure7._toInflightType(this)};
            const client = new $Closure7Client({
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
          $Closure7._registerOnLiftObject(mapA, host, []);
          $Closure7._registerOnLiftObject(mapB, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure8 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure8-1.js")({
            $mapA: ${context._lift(mapA)},
            $mapB: ${context._lift(mapB)},
            $mapC: ${context._lift(mapC)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure8Client = ${$Closure8._toInflightType(this)};
            const client = new $Closure8Client({
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
          $Closure8._registerOnLiftObject(mapA, host, []);
          $Closure8._registerOnLiftObject(mapB, host, []);
          $Closure8._registerOnLiftObject(mapC, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure9 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure9-1.js")({
            $arrayA: ${context._lift(arrayA)},
            $arrayB: ${context._lift(arrayB)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure9Client = ${$Closure9._toInflightType(this)};
            const client = new $Closure9Client({
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
          $Closure9._registerOnLiftObject(arrayA, host, []);
          $Closure9._registerOnLiftObject(arrayB, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure10 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure10-1.js")({
            $arrayA: ${context._lift(arrayA)},
            $arrayB: ${context._lift(arrayB)},
            $arrayC: ${context._lift(arrayC)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure10Client = ${$Closure10._toInflightType(this)};
            const client = new $Closure10Client({
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
          $Closure10._registerOnLiftObject(arrayA, host, []);
          $Closure10._registerOnLiftObject(arrayB, host, []);
          $Closure10._registerOnLiftObject(arrayC, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure11 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure11-1.js")({
            $cat1: ${context._lift(cat1)},
            $cat2: ${context._lift(cat2)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure11Client = ${$Closure11._toInflightType(this)};
            const client = new $Closure11Client({
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
          $Closure11._registerOnLiftObject(cat1, host, []);
          $Closure11._registerOnLiftObject(cat2, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure12 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure12-1.js")({
            $cat1: ${context._lift(cat1)},
            $cat2: ${context._lift(cat2)},
            $cat3: ${context._lift(cat3)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure12Client = ${$Closure12._toInflightType(this)};
            const client = new $Closure12Client({
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
          $Closure12._registerOnLiftObject(cat1, host, []);
          $Closure12._registerOnLiftObject(cat2, host, []);
          $Closure12._registerOnLiftObject(cat3, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const numA = 1;
    const numB = 1;
    const numC = 10;
    const strA = "wing";
    const strB = "wing";
    const strC = "wingnuts";
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:Primitive types with the same value", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:Primitive types with different values", new $Closure2(this, "$Closure2"));
    const jsonA = ({"a": 1});
    const jsonB = ({"a": 1});
    const jsonC = [1, 2, 3];
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:Json with the same value", new $Closure3(this, "$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:Json with different values", new $Closure4(this, "$Closure4"));
    const setA = new Set([1, 2, 3]);
    const setB = new Set([1, 2, 3]);
    const setC = new Set([4, 5, 6]);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:Set types with the same value", new $Closure5(this, "$Closure5"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:Set types with different values", new $Closure6(this, "$Closure6"));
    const mapA = ({"a": 1,"b": 2});
    const mapB = ({"a": 1,"b": 2});
    const mapC = ({"c": 10,"b": 2});
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:Map with the same value", new $Closure7(this, "$Closure7"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:Map with different values", new $Closure8(this, "$Closure8"));
    const arrayA = [1, 2, 3];
    const arrayB = [1, 2, 3];
    const arrayC = [4, 5, 6];
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:Array with the same value", new $Closure9(this, "$Closure9"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:Array with different values", new $Closure10(this, "$Closure10"));
    const cat1 = ({"name": "Mittens","age": 3});
    const cat2 = ({"name": "Mittens","age": 3});
    const cat3 = ({"name": "Simba","age": 5});
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:Struct with the same value", new $Closure11(this, "$Closure11"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:Struct with different values", new $Closure12(this, "$Closure12"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "deep_equality.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

