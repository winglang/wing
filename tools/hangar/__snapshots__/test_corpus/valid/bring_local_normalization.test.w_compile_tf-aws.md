# [bring_local_normalization.test.w](../../../../../examples/tests/valid/bring_local_normalization.test.w) | compile | tf-aws

## inflight.Bar-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Bar {
    constructor($args) {
      const {  } = $args;
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
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Baz {
    constructor($args) {
      const {  } = $args;
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
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Foo {
    constructor($args) {
      const {  } = $args;
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-3.cjs.map
```

## inflight.InflightBar-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class InflightBar {
  }
  return InflightBar;
}
//# sourceMappingURL=inflight.InflightBar-1.cjs.map
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

## preflight.bar-1.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
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
  _liftedState() {
    return {
      ...(super._liftedState?.() ?? {}),
    };
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
}
class InflightBar extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.InflightBar-1.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const InflightBarClient = ${InflightBar._toInflightType()};
        const client = new InflightBarClient({
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
if ($preflightTypesMap[2]) { throw new Error("InflightBar is already in type map"); }
$preflightTypesMap[2] = InflightBar;
module.exports = { $preflightTypesMap, Bar, InflightBar };
//# sourceMappingURL=preflight.bar-1.cjs.map
```

## preflight.baz-2.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
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
  _liftedState() {
    return {
      ...(super._liftedState?.() ?? {}),
    };
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
    const foo = $helpers.bringJs(`${__dirname}/preflight.foo-3.cjs`, $preflightTypesMap);
    const bar = $helpers.bringJs(`${__dirname}/preflight.bar-1.cjs`, $preflightTypesMap);
    const baz = $helpers.bringJs(`${__dirname}/preflight.baz-2.cjs`, $preflightTypesMap);
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    $helpers.assert($helpers.eq((foo.Foo.foo(this)), "foo"), "foo.Foo.foo() == \"foo\"");
    $helpers.assert($helpers.eq((foo.Foo.bar(this)), "bar"), "foo.Foo.bar() == \"bar\"");
    $helpers.assert($helpers.eq((foo.Foo.baz(this)), "baz"), "foo.Foo.baz() == \"baz\"");
    $helpers.assert($helpers.eq((bar.Bar.bar(this)), "bar"), "bar.Bar.bar() == \"bar\"");
    $helpers.assert($helpers.eq((baz.Baz.baz(this)), "baz"), "baz.Baz.baz() == \"baz\"");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_local_normalization.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

## preflight.foo-3.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
const bar = $helpers.bringJs(`${__dirname}/preflight.bar-1.cjs`, $preflightTypesMap);
const baz = $helpers.bringJs(`${__dirname}/preflight.baz-2.cjs`, $preflightTypesMap);
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
  _liftedState() {
    return {
      ...(super._liftedState?.() ?? {}),
    };
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

