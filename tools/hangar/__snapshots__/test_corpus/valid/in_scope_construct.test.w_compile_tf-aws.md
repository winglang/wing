# [in_scope_construct.test.w](../../../../../examples/tests/valid/in_scope_construct.test.w) | compile | tf-aws

## inflight.MyClass-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class MyClass {
    constructor({  }) {
    }
  }
  return MyClass;
}
//# sourceMappingURL=inflight.MyClass-1.js.map
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
const c = require("constructs");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class MyClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.MyClass-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyClassClient = ${MyClass._toInflightType()};
            const client = new MyClassClient({
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
    new MyClass(this.node.root.new("constructs.Construct", c.Construct, this, "Construct"), "MyClass");
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

