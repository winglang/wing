# [inheritance_interface.test.w](../../../../../examples/tests/valid/inheritance_interface.test.w) | compile | tf-aws

## inflight.Baz-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Baz {
    constructor({  }) {
    }
  }
  return Baz;
}
//# sourceMappingURL=inflight.Baz-1.js.map
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
    class Baz extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      foo() {
        return "foo";
      }
      bar() {
        return "bar";
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Baz-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BazClient = ${Baz._toInflightType()};
            const client = new BazClient({
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
    const baz = new Baz(this, "Baz");
    (expect.Util.equal((baz.foo()), "foo"));
    (expect.Util.equal((baz.bar()), "bar"));
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

