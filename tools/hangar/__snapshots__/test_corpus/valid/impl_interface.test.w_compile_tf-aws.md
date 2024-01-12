# [impl_interface.test.w](../../../../../examples/tests/valid/impl_interface.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $x }) {
  class $Closure1 {
    constructor({  }) {
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
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $i3 }) {
  class $Closure2 {
    constructor({  }) {
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
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.A-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class A {
    constructor({  }) {
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
//# sourceMappingURL=inflight.A-1.js.map
```

## inflight.Dog-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Dog {
    constructor({  }) {
    }
    async eat() {
      return;
    }
  }
  return Dog;
}
//# sourceMappingURL=inflight.Dog-1.js.map
```

## inflight.Terrier-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Dog }) {
  class Terrier extends $Dog {
    constructor({  }) {
      super({  });
    }
    async eat() {
      return;
    }
  }
  return Terrier;
}
//# sourceMappingURL=inflight.Terrier-1.js.map
```

## inflight.r-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class r {
    constructor({  }) {
    }
    async method2(x) {
      return x;
    }
  }
  return r;
}
//# sourceMappingURL=inflight.r-1.js.map
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

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class A extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("./inflight.A-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AClient = ${A._toInflightType(this)};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      onLift(host, ops) {
        super.onLift(host, ops);
      }
      static onLiftType(host, ops) {
        super.onLiftType(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure1-1.js")({
            $x: ${$stdlib.core.liftObject(x)},
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
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      onLift(host, ops) {
        $Closure1._onLiftMatrix(host, ops, {
          "handle": [
            [x, ["handle"]],
          ],
        });
        super.onLift(host, ops);
      }
      static onLiftType(host, ops) {
        super.onLiftType(host, ops);
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
          require("./inflight.r-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const rClient = ${r._toInflightType(this)};
            const client = new rClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "method2", "$inflight_init"];
      }
      onLift(host, ops) {
        super.onLift(host, ops);
      }
      static onLiftType(host, ops) {
        super.onLiftType(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure2-1.js")({
            $i3: ${$stdlib.core.liftObject(i3)},
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
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      onLift(host, ops) {
        $Closure2._onLiftMatrix(host, ops, {
          "handle": [
            [i3, ["method2"]],
          ],
        });
        super.onLift(host, ops);
      }
      static onLiftType(host, ops) {
        super.onLiftType(host, ops);
      }
    }
    class Dog extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("./inflight.Dog-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const DogClient = ${Dog._toInflightType(this)};
            const client = new DogClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "eat", "$inflight_init"];
      }
      onLift(host, ops) {
        super.onLift(host, ops);
      }
      static onLiftType(host, ops) {
        super.onLiftType(host, ops);
      }
    }
    class Terrier extends Dog {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("./inflight.Terrier-1.js")({
            $Dog: ${$stdlib.core.liftObject(Dog)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const TerrierClient = ${Terrier._toInflightType(this)};
            const client = new TerrierClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "eat", "$inflight_init"];
      }
      onLift(host, ops) {
        super.onLift(host, ops);
      }
      static onLiftType(host, ops) {
        super.onLiftType(host, ops);
      }
    }
    const x = new A(this, "A");
    const y = new $Closure1(this, "$Closure1");
    const i3 = ((() => {
      return new r(this, "r");
    })());
    $helpers.assert($helpers.eq((i3.method1(1)), 1), "i3.method1(1) == 1");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:can call inherited inflight interface method", new $Closure2(this, "$Closure2"));
    $helpers.assert($helpers.eq((i3.method3([1, 2, 3])), [1, 2, 3]), "i3.method3([1, 2, 3]) == [1, 2, 3]");
    const z = new Dog(this, "Dog");
    const w = new Terrier(this, "Terrier");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "impl_interface.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

