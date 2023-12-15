# [assert.test.w](../../../../../../examples/tests/sdk_tests/expect/assert.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $a, $b, $expect_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal(1, 1));
      (await $expect_Util.equal($b, 1));
      (await $expect_Util.nil($a));
      (await $expect_Util.notNil($b));
      (await $expect_Util.notEqual($b, 2));
      (await $expect_Util.notEqual($b, "hello"));
      (await $expect_Util.notEqual($b, true));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $c, $d, $expect_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal("hello", "hello"));
      (await $expect_Util.equal($d, "hello"));
      (await $expect_Util.nil($c));
      (await $expect_Util.notNil($d));
      (await $expect_Util.notEqual($d, "world"));
      (await $expect_Util.notEqual($d, 1));
      (await $expect_Util.notEqual($d, true));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
module.exports = function({ $e, $expect_Util, $f }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal(true, true));
      (await $expect_Util.equal($f, true));
      (await $expect_Util.nil($e));
      (await $expect_Util.notNil($f));
      (await $expect_Util.notEqual($f, false));
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.cjs
```cjs
"use strict";
module.exports = function({ $expect_Util, $g }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal($g, ["hello"]));
      (await $expect_Util.notEqual($g, ["world"]));
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-1.cjs
```cjs
"use strict";
module.exports = function({ $expect_Util, $h }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal($h, [1]));
      (await $expect_Util.notEqual($h, ["world"]));
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6-1.cjs
```cjs
"use strict";
module.exports = function({ $expect_Util, $obj }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal($obj, ({"key1": 1,"key2": 2})));
      (await $expect_Util.notEqual($obj, ({"key1": 1,"key3": 3})));
    }
  }
  return $Closure6;
}

```

## inflight.$Closure7-1.cjs
```cjs
"use strict";
module.exports = function({ $expect_Util, $maps }) {
  class $Closure7 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal($maps, ({"hello": 123,"world": 99})));
      (await $expect_Util.notEqual($maps, ({"hello": 123,"world": 100})));
    }
  }
  return $Closure7;
}

```

## inflight.$Closure8-1.cjs
```cjs
"use strict";
module.exports = function({ $expect_Util, $mySet }) {
  class $Closure8 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal($mySet, new Set([1, 2, 3])));
      (await $expect_Util.notEqual($mySet, new Set([1, 2, 3, 4])));
    }
  }
  return $Closure8;
}

```

## inflight.$Closure9-1.cjs
```cjs
"use strict";
module.exports = function({ $expect_Util, $std_Duration }) {
  class $Closure9 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal((await $std_Duration.fromSeconds(60)), (await $std_Duration.fromSeconds(60))));
      (await $expect_Util.notEqual((await $std_Duration.fromSeconds(61)), (await $std_Duration.fromSeconds(60))));
    }
  }
  return $Closure9;
}

```

## inflight.MyClass-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class MyClass {
    constructor({  }) {
    }
  }
  return MyClass;
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
const util = $stdlib.util;
const expect = $stdlib.expect;
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
            $a: ${context._lift(a)},
            $b: ${context._lift(b)},
            $expect_Util: ${context._lift($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
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
          $Closure1._registerOnLiftObject(a, host, []);
          $Closure1._registerOnLiftObject(b, host, []);
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
          require("./inflight.$Closure2-1.cjs")({
            $c: ${context._lift(c)},
            $d: ${context._lift(d)},
            $expect_Util: ${context._lift($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
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
          $Closure2._registerOnLiftObject(c, host, []);
          $Closure2._registerOnLiftObject(d, host, []);
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
          require("./inflight.$Closure3-1.cjs")({
            $e: ${context._lift(e)},
            $expect_Util: ${context._lift($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $f: ${context._lift(f)},
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
          $Closure3._registerOnLiftObject(e, host, []);
          $Closure3._registerOnLiftObject(f, host, []);
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
          require("./inflight.$Closure4-1.cjs")({
            $expect_Util: ${context._lift($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $g: ${context._lift(g)},
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
          $Closure4._registerOnLiftObject(g, host, []);
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
          require("./inflight.$Closure5-1.cjs")({
            $expect_Util: ${context._lift($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $h: ${context._lift(h)},
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
          $Closure5._registerOnLiftObject(h, host, []);
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
          require("./inflight.$Closure6-1.cjs")({
            $expect_Util: ${context._lift($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $obj: ${context._lift(obj)},
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
          $Closure6._registerOnLiftObject(obj, host, []);
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
          require("./inflight.$Closure7-1.cjs")({
            $expect_Util: ${context._lift($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $maps: ${context._lift(maps)},
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
          $Closure7._registerOnLiftObject(maps, host, []);
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
          require("./inflight.$Closure8-1.cjs")({
            $expect_Util: ${context._lift($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $mySet: ${context._lift(mySet)},
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
          $Closure8._registerOnLiftObject(mySet, host, []);
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
          require("./inflight.$Closure9-1.cjs")({
            $expect_Util: ${context._lift($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $std_Duration: ${context._lift($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
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
    class MyClass extends $stdlib.std.Resource {
      constructor($scope, $id, a, b) {
        super($scope, $id);
        this.a = a;
        this.b = b;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.MyClass-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyClassClient = ${MyClass._toInflightType(this)};
            const client = new MyClassClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    const a = undefined;
    const b = 1;
    (expect.Util.equal(1, 1));
    (expect.Util.equal([], []));
    (expect.Util.notEqual(0, (-0)));
    (expect.Util.equal(b, 1));
    (expect.Util.nil(a));
    (expect.Util.notNil(b));
    (expect.Util.notEqual(b, 2));
    (expect.Util.notEqual(b, "hello"));
    (expect.Util.notEqual(b, true));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:equal num", new $Closure1(this, "$Closure1"));
    const c = undefined;
    const d = "hello";
    (expect.Util.equal("hello", "hello"));
    (expect.Util.equal(d, "hello"));
    (expect.Util.nil(c));
    (expect.Util.notNil(d));
    (expect.Util.notEqual(d, "world"));
    (expect.Util.notEqual(d, 1));
    (expect.Util.notEqual(d, true));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:equal str", new $Closure2(this, "$Closure2"));
    const e = undefined;
    const f = true;
    (expect.Util.equal(true, true));
    (expect.Util.equal(f, true));
    (expect.Util.nil(e));
    (expect.Util.notNil(f));
    (expect.Util.notEqual(f, false));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:equal bool", new $Closure3(this, "$Closure3"));
    const g = ["hello"];
    (expect.Util.equal(g, ["hello"]));
    (expect.Util.notEqual(g, ["world"]));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:equal array of strings", new $Closure4(this, "$Closure4"));
    const h = [1];
    (expect.Util.equal(h, [1]));
    (expect.Util.notEqual(h, ["world"]));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:equal array of numbers", new $Closure5(this, "$Closure5"));
    const obj = ({"key1": 1,"key2": 2});
    (expect.Util.equal(obj, ({"key1": 1,"key2": 2})));
    (expect.Util.notEqual(obj, ({"key1": 1,"key3": 3})));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:equal objects", new $Closure6(this, "$Closure6"));
    const maps = ({"hello": 123,"world": 99});
    (expect.Util.equal(maps, ({"hello": 123,"world": 99})));
    (expect.Util.notEqual(maps, ({"hello": 123,"world": 100})));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:equal maps", new $Closure7(this, "$Closure7"));
    const mySet = new Set([1, 2, 3]);
    (expect.Util.equal(mySet, new Set([1, 2, 3])));
    (expect.Util.notEqual(mySet, new Set([1, 2, 3, 4])));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:equal sets", new $Closure8(this, "$Closure8"));
    (expect.Util.equal((std.Duration.fromSeconds(60)), (std.Duration.fromSeconds(60))));
    (expect.Util.notEqual((std.Duration.fromSeconds(61)), (std.Duration.fromSeconds(60))));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:equal durations", new $Closure9(this, "$Closure9"));
    const myClass = new MyClass(this, "MyClass", 1, "hello");
    (expect.Util.equal(myClass, myClass));
    (expect.Util.notEqual(myClass, new MyClass(this, "yet another my class", 1, "hello world")));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "assert.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

