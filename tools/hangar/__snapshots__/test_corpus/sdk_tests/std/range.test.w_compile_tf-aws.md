# [range.test.w](../../../../../../examples/tests/sdk_tests/std/range.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $std_Range }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(1,5,true).join() == \"1,2,3,4,5\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await $std_Range.of(1, 5, true)).join()),"1,2,3,4,5")))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure10-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class $Closure10 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      let n = 0;
      for (const x of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,5,true)) {
        n += 1;
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: n==6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(n,6)))};
    }
  }
  return $Closure10;
}

```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $std_Range }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(1, 5).join() == std.Range.of(1, 5, false).join()")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await $std_Range.of(1, 5)).join()),(await (await $std_Range.of(1, 5, false)).join()))))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
module.exports = function({ $std_Range }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(1,5,false).join() == \"1,2,3,4\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await $std_Range.of(1, 5, false)).join()),"1,2,3,4")))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.cjs
```cjs
"use strict";
module.exports = function({ $std_Range }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(1,5).join() == \"1,2,3,4\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await $std_Range.of(1, 5)).join()),"1,2,3,4")))};
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-1.cjs
```cjs
"use strict";
module.exports = function({ $std_Range }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(-3,3,true).join() == \"-3,-2,-1,0,1,2,3\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await $std_Range.of((-3), 3, true)).join()),"-3,-2,-1,0,1,2,3")))};
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6-1.cjs
```cjs
"use strict";
module.exports = function({ $std_Range }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(-3,3,false).join() == \"-3,-2,-1,0,1,2\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await $std_Range.of((-3), 3, false)).join()),"-3,-2,-1,0,1,2")))};
    }
  }
  return $Closure6;
}

```

## inflight.$Closure7-1.cjs
```cjs
"use strict";
module.exports = function({ $std_Range }) {
  class $Closure7 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(5,0,true).join() == \"5,4,3,2,1,0\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await $std_Range.of(5, 0, true)).join()),"5,4,3,2,1,0")))};
    }
  }
  return $Closure7;
}

```

## inflight.$Closure8-1.cjs
```cjs
"use strict";
module.exports = function({ $std_Range }) {
  class $Closure8 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(5,0,false).join() == \"5,4,3,2,1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await $std_Range.of(5, 0, false)).join()),"5,4,3,2,1")))};
    }
  }
  return $Closure8;
}

```

## inflight.$Closure9-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class $Closure9 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      let i = 0;
      for (const x of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,5,false)) {
        i += 1;
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: i==5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(i,5)))};
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
          require("./inflight.$Closure1-1.cjs")({
            $std_Range: ${context._lift($stdlib.core.toLiftableModuleType(std.Range, "@winglang/sdk/std", "Range"))},
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
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.cjs")({
            $std_Range: ${context._lift($stdlib.core.toLiftableModuleType(std.Range, "@winglang/sdk/std", "Range"))},
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
    class $Closure3 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.cjs")({
            $std_Range: ${context._lift($stdlib.core.toLiftableModuleType(std.Range, "@winglang/sdk/std", "Range"))},
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
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.cjs")({
            $std_Range: ${context._lift($stdlib.core.toLiftableModuleType(std.Range, "@winglang/sdk/std", "Range"))},
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
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure5-1.cjs")({
            $std_Range: ${context._lift($stdlib.core.toLiftableModuleType(std.Range, "@winglang/sdk/std", "Range"))},
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
    }
    class $Closure6 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure6-1.cjs")({
            $std_Range: ${context._lift($stdlib.core.toLiftableModuleType(std.Range, "@winglang/sdk/std", "Range"))},
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
    }
    class $Closure7 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure7-1.cjs")({
            $std_Range: ${context._lift($stdlib.core.toLiftableModuleType(std.Range, "@winglang/sdk/std", "Range"))},
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
    }
    class $Closure8 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure8-1.cjs")({
            $std_Range: ${context._lift($stdlib.core.toLiftableModuleType(std.Range, "@winglang/sdk/std", "Range"))},
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
    }
    class $Closure9 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure9-1.cjs")({
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
    }
    class $Closure10 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure10-1.cjs")({
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
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(1,5,true).join() == \"1,2,3,4,5\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((std.Range.of(1, 5, true)).join()),"1,2,3,4,5")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:rangeOf", new $Closure1(this, "$Closure1"));
    {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(1, 5).join() == std.Range.of(1, 5, false).join()")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((std.Range.of(1, 5)).join()),((std.Range.of(1, 5, false)).join()))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:defaultRange", new $Closure2(this, "$Closure2"));
    {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(1,5,false).join() == \"1,2,3,4\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((std.Range.of(1, 5, false)).join()),"1,2,3,4")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:rangeOfWithoutLastNumber", new $Closure3(this, "$Closure3"));
    {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(1,5).join() == \"1,2,3,4\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((std.Range.of(1, 5)).join()),"1,2,3,4")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:rangeOfWithoutLastNumberDefault", new $Closure4(this, "$Closure4"));
    {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(-3,3,true).join() == \"-3,-2,-1,0,1,2,3\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((std.Range.of((-3), 3, true)).join()),"-3,-2,-1,0,1,2,3")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:rangeOfWithNegativeRange", new $Closure5(this, "$Closure5"));
    {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(-3,3,false).join() == \"-3,-2,-1,0,1,2\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((std.Range.of((-3), 3, false)).join()),"-3,-2,-1,0,1,2")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:rangeOfWithNegativeRangeDefault", new $Closure6(this, "$Closure6"));
    {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(5,0,true).join() == \"5,4,3,2,1,0\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((std.Range.of(5, 0, true)).join()),"5,4,3,2,1,0")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:rangeOfDecreasingNumbers", new $Closure7(this, "$Closure7"));
    {((cond) => {if (!cond) throw new Error("assertion failed: std.Range.of(5,0,false).join() == \"5,4,3,2,1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((std.Range.of(5, 0, false)).join()),"5,4,3,2,1")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:rangeOfDecreasingNumbersWithDefault", new $Closure8(this, "$Closure8"));
    let i = 0;
    for (const x of $stdlib.std.Range.of(0, 5, false)) {
      i += 1;
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: i==5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(i,5)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:forWithRange", new $Closure9(this, "$Closure9"));
    let n = 0;
    for (const x of $stdlib.std.Range.of(0, 5, true)) {
      n += 1;
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: n==6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(n,6)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:forWithRangeIncludeLastNumber", new $Closure10(this, "$Closure10"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "range.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

