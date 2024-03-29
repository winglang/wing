# [bring_local_normalization.test.w](../../../../../examples/tests/valid/bring_local_normalization.test.w) | compile | tf-aws

## inflight.Bar-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Bar {
    constructor({  }) {
    }
  }
  return Bar;
}
//# sourceMappingURL=inflight.Bar-1.js.map
```

## inflight.Baz-2.js
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
//# sourceMappingURL=inflight.Baz-2.js.map
```

## inflight.Foo-3.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-3.js.map
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

## preflight.bar-1.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const { $APP } = initializePlatform();
class Bar extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static bar() {
    return "bar";
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Bar-1.js")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const BarClient = ${Bar._toInflightType()};
        const client = new BarClient({
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
module.exports = { Bar };
//# sourceMappingURL=preflight.bar-1.js.map
```

## preflight.baz-2.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const { $APP } = initializePlatform();
class Baz extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static baz() {
    return "baz";
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Baz-2.js")({
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
module.exports = { Baz };
//# sourceMappingURL=preflight.baz-2.js.map
```

## preflight.foo-3.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const bar = require("./preflight.bar-1.js");
const baz = require("./preflight.baz-2.js");
const { $APP } = initializePlatform();
class Foo extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static foo() {
    return "foo";
  }
  static bar() {
    return (bar.Bar.bar());
  }
  static baz() {
    return (baz.Baz.baz());
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Foo-3.js")({
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
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { Foo };
//# sourceMappingURL=preflight.foo-3.js.map
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const foo = require("./preflight.foo-3.js");
const bar = require("./preflight.bar-1.js");
const baz = require("./preflight.baz-2.js");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.assert($helpers.eq((foo.Foo.foo()), "foo"), "foo.Foo.foo() == \"foo\"");
    $helpers.assert($helpers.eq((foo.Foo.bar()), "bar"), "foo.Foo.bar() == \"bar\"");
    $helpers.assert($helpers.eq((foo.Foo.baz()), "baz"), "foo.Foo.baz() == \"baz\"");
    $helpers.assert($helpers.eq((bar.Bar.bar()), "bar"), "bar.Bar.bar() == \"bar\"");
    $helpers.assert($helpers.eq((baz.Baz.baz()), "baz"), "baz.Baz.baz() == \"baz\"");
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

