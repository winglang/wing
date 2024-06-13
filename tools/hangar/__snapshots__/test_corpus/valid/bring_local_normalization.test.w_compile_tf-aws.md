# [bring_local_normalization.test.w](../../../../../examples/tests/valid/bring_local_normalization.test.w) | compile | tf-aws

## inflight.Bar-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Bar {
    constructor({  }) {
    }
  }
  return Bar;
}
//# sourceMappingURL=inflight.Bar-1.cjs.map
```

## inflight.Baz-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Baz {
    constructor({  }) {
    }
  }
  return Baz;
}
//# sourceMappingURL=inflight.Baz-2.cjs.map
```

## inflight.Foo-3.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-3.cjs.map
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

## preflight.bar-1.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
class Bar extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static bar($scope) {
    return "bar";
  }
  static getSubdir($scope) {
    return $helpers.resolveDirname(__dirname, "../../../subdir");
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Bar-1.cjs")({
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
module.exports = { $preflightTypesMap, Bar };
//# sourceMappingURL=preflight.bar-1.cjs.map
```

## preflight.baz-2.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
class Baz extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static baz($scope) {
    return "baz";
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Baz-2.cjs")({
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
module.exports = { $preflightTypesMap, Baz };
//# sourceMappingURL=preflight.baz-2.cjs.map
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
    const foo = require("./preflight.foo-3.cjs");
    Object.assign($preflightTypesMap, foo.$preflightTypesMap);
    const bar = require("./preflight.bar-1.cjs");
    Object.assign($preflightTypesMap, bar.$preflightTypesMap);
    const baz = require("./preflight.baz-2.cjs");
    Object.assign($preflightTypesMap, baz.$preflightTypesMap);
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    $helpers.assert($helpers.eq((foo.Foo.foo(this)), "foo"), "foo.Foo.foo() == \"foo\"");
    $helpers.assert($helpers.eq((foo.Foo.bar(this)), "bar"), "foo.Foo.bar() == \"bar\"");
    $helpers.assert($helpers.eq((foo.Foo.baz(this)), "baz"), "foo.Foo.baz() == \"baz\"");
    $helpers.assert($helpers.eq((bar.Bar.bar(this)), "bar"), "bar.Bar.bar() == \"bar\"");
    $helpers.assert($helpers.eq((baz.Baz.baz(this)), "baz"), "baz.Baz.baz() == \"baz\"");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_local_normalization.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

## preflight.foo-3.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
const bar = require("./preflight.bar-1.cjs");
Object.assign($preflightTypesMap, bar.$preflightTypesMap);
const baz = require("./preflight.baz-2.cjs");
Object.assign($preflightTypesMap, baz.$preflightTypesMap);
class Foo extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static foo($scope) {
    return "foo";
  }
  static bar($scope) {
    return (bar.Bar.bar($scope));
  }
  static baz($scope) {
    return (baz.Baz.baz($scope));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Foo-3.cjs")({
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
module.exports = { $preflightTypesMap, Foo };
//# sourceMappingURL=preflight.foo-3.cjs.map
```

