# [impl_interface.test.w](../../../../../examples/tests/valid/impl_interface.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $x }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $x.handle("hello world!"));
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
module.exports = function({ $i3 }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq((await $i3.method2("hello")), "hello"), "i3.method2(\"hello\") == \"hello\"");
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
module.exports = function({  }) {
  class $Closure3 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      class MyDog {
        async bark() {
          console.log("woof");
        }
      }
      const dog = (await (async () => {const o = new MyDog(); await o.$inflight_init?.(); return o; })());
      (await dog.bark());
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map
```

## inflight.A-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class A {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(msg) {
      return;
    }
  }
  return A;
}
//# sourceMappingURL=inflight.A-1.cjs.map
```

## inflight.Dog-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Dog {
    async eat() {
      return;
    }
  }
  return Dog;
}
//# sourceMappingURL=inflight.Dog-1.cjs.map
```

## inflight.ImplInflightIfaceInInflightClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class ImplInflightIfaceInInflightClass {
    async inflight_method() {
      return;
    }
  }
  return ImplInflightIfaceInInflightClass;
}
//# sourceMappingURL=inflight.ImplInflightIfaceInInflightClass-1.cjs.map
```

## inflight.ImplInflightIfaceInPreflightClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class ImplInflightIfaceInPreflightClass {
    async inflight_method() {
      return;
    }
  }
  return ImplInflightIfaceInPreflightClass;
}
//# sourceMappingURL=inflight.ImplInflightIfaceInPreflightClass-1.cjs.map
```

## inflight.ImplPreflightIfaceInPreflightClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class ImplPreflightIfaceInPreflightClass {
  }
  return ImplPreflightIfaceInPreflightClass;
}
//# sourceMappingURL=inflight.ImplPreflightIfaceInPreflightClass-1.cjs.map
```

## inflight.ImplementInflightIfaceInPreflightClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class ImplementInflightIfaceInPreflightClass {
    async inflight_method() {
      return;
    }
  }
  return ImplementInflightIfaceInPreflightClass;
}
//# sourceMappingURL=inflight.ImplementInflightIfaceInPreflightClass-1.cjs.map
```

## inflight.ImplementJsiiIface-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class ImplementJsiiIface {
    async inflight_method() {
      return;
    }
  }
  return ImplementJsiiIface;
}
//# sourceMappingURL=inflight.ImplementJsiiIface-1.cjs.map
```

## inflight.Terrier-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Dog }) {
  class Terrier extends $Dog {
    async eat() {
      return;
    }
  }
  return Terrier;
}
//# sourceMappingURL=inflight.Terrier-1.cjs.map
```

## inflight.r-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class r {
    async method2(x) {
      return x;
    }
  }
  return r;
}
//# sourceMappingURL=inflight.r-1.cjs.map
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
    const jsii_fixture = require("jsii-fixture");
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class A extends $stdlib.std.Resource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.A-1.cjs")({
          })
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
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $x: ${$stdlib.core.liftObject(x)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [x, ["handle"]],
          ],
          "$inflight_init": [
            [x, []],
          ],
        });
      }
    }
    class r extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      method1(x) {
        return x;
      }
      method3(x) {
        return x;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.r-1.cjs")({
          })
        `;
      }
      get _liftMap() {
        return ({
          "method2": [
          ],
          "$inflight_init": [
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
            $i3: ${$stdlib.core.liftObject(i3)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [i3, ["method2"]],
          ],
          "$inflight_init": [
            [i3, []],
          ],
        });
      }
    }
    class Dog extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Dog-1.cjs")({
          })
        `;
      }
      get _liftMap() {
        return ({
          "eat": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class Terrier extends Dog {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Terrier-1.cjs")({
            $Dog: ${$stdlib.core.liftObject(Dog)},
          })
        `;
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "eat": [
          ],
          "$inflight_init": [
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
      get _liftMap() {
        return ({
          "handle": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class ImplementJsiiIface extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      method() {
        return;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.ImplementJsiiIface-1.cjs")({
          })
        `;
      }
      get _liftMap() {
        return ({
          "inflight_method": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class ImplementInflightIfaceInPreflightClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.ImplementInflightIfaceInPreflightClass-1.cjs")({
          })
        `;
      }
      get _liftMap() {
        return ({
          "inflight_method": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class ImplInflightIfaceInInflightClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.ImplInflightIfaceInInflightClass-1.cjs")({
          })
        `;
      }
      get _liftMap() {
        return ({
          "inflight_method": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    if ($preflightTypesMap[10]) { throw new Error("ImplInflightIfaceInInflightClass is already in type map"); }
    $preflightTypesMap[10] = ImplInflightIfaceInInflightClass;
    class ImplInflightIfaceInPreflightClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.ImplInflightIfaceInPreflightClass-1.cjs")({
          })
        `;
      }
      get _liftMap() {
        return ({
          "inflight_method": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class ImplPreflightIfaceInPreflightClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      method() {
        return;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.ImplPreflightIfaceInPreflightClass-1.cjs")({
          })
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    const x = new A(this, "A");
    const y = new $Closure1(this, "$Closure1");
    const i3 = ((() => {
      return new r(this, "r");
    })());
    $helpers.assert($helpers.eq((i3.method1(1)), 1), "i3.method1(1) == 1");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:can call inherited inflight interface method", new $Closure2(this, "$Closure2"));
    $helpers.assert($helpers.eq((i3.method3([1, 2, 3])), [1, 2, 3]), "i3.method3([1, 2, 3]) == [1, 2, 3]");
    const z = new Dog(this, "Dog");
    const w = new Terrier(this, "Terrier");
    const f = new $Closure3(this, "$Closure3");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "impl_interface.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

