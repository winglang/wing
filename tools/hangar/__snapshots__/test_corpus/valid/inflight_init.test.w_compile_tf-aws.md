# [inflight_init.test.w](../../../../../examples/tests/valid/inflight_init.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Foo }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const f = (await (async () => {const o = new $Foo(5); await o.$inflight_init?.(); return o; })());
      $helpers.assert(($helpers.eq(f.field1, 6) && $helpers.eq(f.field2, 5)), "f.field1 == 6 && f.field2 == 5");
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
module.exports = function({ $FooChild }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const f = (await (async () => {const o = new $FooChild(); await o.$inflight_init?.(); return o; })());
      $helpers.assert((($helpers.eq(f.field1, 6) && $helpers.eq(f.field2, 5)) && $helpers.eq(f.field3, 4)), "f.field1 == 6 && f.field2 == 5 && f.field3 == 4");
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
module.exports = function({  }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      class FooNoInit {
        async leet() {
          return 1337;
        }
      }
      class FooChild extends FooNoInit {
        constructor(){
          super();
          this.super_$inflight_init = this.$inflight_init;
          this.$inflight_init = async () => {
            await this.super_$inflight_init?.();
            this.field = (await this.leet());
          }
        }
      }
      const f = (await (async () => {const o = new FooChild(); await o.$inflight_init?.(); return o; })());
      $helpers.assert($helpers.eq(f.field, 1337), "f.field == 1337");
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
module.exports = function({ $jsii_fixture_JsiiClass }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      class Foo extends $jsii_fixture_JsiiClass {
        async get_six() {
          return 6;
        }
        constructor(x, y){
          super(x);
          this.$inflight_init = async () => {
            this.foo_str = String.raw({ raw: ["", " ", ""] }, y, x);
            this.foo_num = (await this.get_six());
          }
        }
      }
      const f = (await (async () => {const o = new Foo(1, "Foo"); await o.$inflight_init?.(); return o; })());
      $helpers.assert((($helpers.eq(f.foo_str, "Foo 1") && $helpers.eq((await f.field()), 1)) && $helpers.eq(f.foo_num, 6)), "f.foo_str == \"Foo 1\" && f.field() == 1 && f.foo_num == 6");
      class FooChild extends Foo {
        constructor(){
          super(2, "FooChild");
          this.super_$inflight_init = this.$inflight_init;
          this.$inflight_init = async () => {
            await this.super_$inflight_init?.(2, "FooChild");
            this.child_field = ((await this.get_six()) + 1);
          }
        }
      }
      const f_child = (await (async () => {const o = new FooChild(); await o.$inflight_init?.(); return o; })());
      $helpers.assert(((($helpers.eq(f_child.foo_str, "FooChild 2") && $helpers.eq((await f_child.field()), 2)) && $helpers.eq(f_child.foo_num, 6)) && $helpers.eq(f_child.child_field, 7)), "f_child.foo_str == \"FooChild 2\" && f_child.field() == 2 && f_child.foo_num == 6 && f_child.child_field == 7");
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.cjs.map
```

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Foo {
    async get_six() {
      return 6;
    }
    constructor(f2){
      this.$inflight_init = async () => {
        this.field1 = (await this.get_six());
        this.field2 = f2;
      }
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.cjs.map
```

## inflight.FooChild-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Foo }) {
  class FooChild extends $Foo {
    constructor(){
      super(5);
      this.super_$inflight_init = this.$inflight_init;
      this.$inflight_init = async () => {
        await this.super_$inflight_init?.(5);
        this.field3 = 4;
      }
    }
  }
  return FooChild;
}
//# sourceMappingURL=inflight.FooChild-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
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
    const jsii_fixture = require("jsii-fixture");
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType()};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "get_six": [
          ],
          "$inflight_init": [
            [this, [].concat(["field1"], ["get_six"], ["field2"])],
          ],
          "field1": [
          ],
          "field2": [
          ],
        });
      }
    }
    if ($preflightTypesMap[1]) { throw new Error("Foo is already in type map"); }
    $preflightTypesMap[1] = Foo;
    class FooChild extends Foo {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.FooChild-1.cjs")({
            $Foo: ${$stdlib.core.liftObject(Foo)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooChildClient = ${FooChild._toInflightType()};
            const client = new FooChildClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
            [this, ["field3"]],
          ],
          "field3": [
          ],
        });
      }
    }
    if ($preflightTypesMap[2]) { throw new Error("FooChild is already in type map"); }
    $preflightTypesMap[2] = FooChild;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $Foo: ${$stdlib.core.liftObject(Foo)},
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
            [$helpers.preflightClassSingleton(this, 1), [].concat(["field1"], ["field2"])],
            [Foo, []],
          ],
          "$inflight_init": [
            [$helpers.preflightClassSingleton(this, 1), []],
            [Foo, []],
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
            $FooChild: ${$stdlib.core.liftObject(FooChild)},
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
            [$helpers.preflightClassSingleton(this, 2), [].concat(["field1"], ["field2"], ["field3"])],
            [FooChild, []],
          ],
          "$inflight_init": [
            [$helpers.preflightClassSingleton(this, 2), []],
            [FooChild, []],
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
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType()};
            const client = new $Closure3Client({
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
    class $Closure4 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.cjs")({
            $jsii_fixture_JsiiClass: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(jsii_fixture.JsiiClass, "jsii-fixture", "JsiiClass"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType()};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(jsii_fixture.JsiiClass, "jsii-fixture", "JsiiClass"), []],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(jsii_fixture.JsiiClass, "jsii-fixture", "JsiiClass"), []],
          ],
        });
      }
    }
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight class init", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight calls parent's init", new $Closure2(this, "$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight calls parent's init when non exists", new $Closure3(this, "$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight class inherits form JSII class", new $Closure4(this, "$Closure4"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_init.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

