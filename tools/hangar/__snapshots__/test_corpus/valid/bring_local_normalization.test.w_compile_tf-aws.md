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
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
class Bar extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static bar($scope, ) {
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
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
class Baz extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static baz($scope, ) {
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
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const bar = require("./preflight.bar-1.js");
const baz = require("./preflight.baz-2.js");
class Foo extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static foo($scope, ) {
    return "foo";
  }
  static bar($scope, ) {
    return (bar.Bar.bar($scope, ));
  }
  static baz($scope, ) {
    return (baz.Baz.baz($scope, ));
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
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const foo = require("./preflight.foo-3.js");
const bar = require("./preflight.bar-1.js");
const baz = require("./preflight.baz-2.js");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.assert($helpers.eq((foo.Foo.foo(this, )), "foo"), "foo.Foo.foo() == \"foo\"");
    $helpers.assert($helpers.eq((foo.Foo.bar(this, )), "bar"), "foo.Foo.bar() == \"bar\"");
    $helpers.assert($helpers.eq((foo.Foo.baz(this, )), "baz"), "foo.Foo.baz() == \"baz\"");
    $helpers.assert($helpers.eq((bar.Bar.bar(this, )), "bar"), "bar.Bar.bar() == \"bar\"");
    $helpers.assert($helpers.eq((baz.Baz.baz(this, )), "baz"), "baz.Baz.baz() == \"baz\"");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_local_normalization.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

