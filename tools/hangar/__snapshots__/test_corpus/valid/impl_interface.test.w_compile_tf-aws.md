# [impl_interface.test.w](../../../../../examples/tests/valid/impl_interface.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
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

```

## inflight.A-1.js
```js
"use strict";
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

```

## inflight.Dog-1.js
```js
"use strict";
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

```

## inflight.Terrier-1.js
```js
"use strict";
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

```

## inflight.r-1.js
```js
"use strict";
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
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
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
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $x: ${context._lift(x)},
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
          $Closure1._registerOnLiftObject(x, host, ["handle"]);
        }
        super._registerOnLift(host, ops);
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
      static _toInflightType(context) {
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
        return ["method2", "$inflight_init"];
      }
    }
    class Dog extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
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
        return ["eat", "$inflight_init"];
      }
    }
    class Terrier extends Dog {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Terrier-1.js")({
            $Dog: ${context._lift(Dog)},
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
        return ["eat", "$inflight_init"];
      }
    }
    const x = new A(this, "A");
    const y = new $Closure1(this, "$Closure1");
    const z = new Dog(this, "Dog");
    const w = new Terrier(this, "Terrier");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "impl_interface.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

