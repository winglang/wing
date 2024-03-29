# [inheritance_class_preflight.test.w](../../../../../examples/tests/valid/inheritance_class_preflight.test.w) | compile | tf-aws

## inflight.Foo-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $FooBase }) {
  class Foo extends $FooBase {
    constructor({  }) {
      super({  });
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.js.map
```

## inflight.FooBase-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class FooBase {
    constructor({  }) {
    }
  }
  return FooBase;
}
//# sourceMappingURL=inflight.FooBase-1.js.map
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

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const expect = $stdlib.expect;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class FooBase extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      bar() {
        return "bar";
      }
      over() {
        return "base";
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.FooBase-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooBaseClient = ${FooBase._toInflightType()};
            const client = new FooBaseClient({
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
    class Foo extends FooBase {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      baz() {
        return true;
      }
      over() {
        return "derived";
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.js")({
            $FooBase: ${$stdlib.core.liftObject(FooBase)},
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
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    const foo = new Foo(this, "Foo");
    (expect.Util.equal((foo.bar()), "bar"));
    (expect.Util.equal((foo.baz()), true));
    (expect.Util.equal((foo.over()), "derived"));
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

