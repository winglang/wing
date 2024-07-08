# [bring_local_dir.test.w](../../../../../examples/tests/valid/bring_local_dir.test.w) | compile | tf-aws

## inflight.Bar-3.cjs
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
//# sourceMappingURL=inflight.Bar-3.cjs.map
```

## inflight.Foo-2.cjs
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
//# sourceMappingURL=inflight.Foo-2.cjs.map
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

## inflight.InflightClass-4.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class InflightClass {
    async method() {
      return "What did you expect?";
    }
  }
  return InflightClass;
}
//# sourceMappingURL=inflight.InflightClass-4.cjs.map
```

## inflight.Widget-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Widget {
    constructor({  }) {
    }
  }
  return Widget;
}
//# sourceMappingURL=inflight.Widget-1.cjs.map
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
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
globalThis.$PolyconFactory = $PlatformManager.createPolyconFactory();
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const w = $helpers.bringJs(`${__dirname}/preflight.widget-1.cjs`, $preflightTypesMap);
    const subdir = $helpers.bringJs(`${__dirname}/preflight.subdir2-6.cjs`, $preflightTypesMap);
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    const widget1 = new w.Widget(this, "widget1");
    $helpers.assert($helpers.eq((widget1.compute()), 42), "widget1.compute() == 42");
    const foo = new subdir.Foo(this, "Foo");
    $helpers.assert($helpers.eq((foo.foo()), "foo"), "foo.foo() == \"foo\"");
    const bar = new subdir.Bar(this, "Bar");
    $helpers.assert($helpers.eq((bar.bar()), "bar"), "bar.bar() == \"bar\"");
    const widget2 = new subdir.inner.Widget(this, "widget2");
    $helpers.assert($helpers.eq((widget2.compute()), 42), "widget2.compute() == 42");
    $helpers.assert($helpers.eq((foo.checkWidget(widget2)), 1379), "foo.checkWidget(widget2) == 1379");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_local_dir.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'], polyconFactory: globalThis.$PolyconFactory });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

## preflight.file1-3.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
const blah = $helpers.bringJs(`${__dirname}/preflight.inner-2.cjs`, $preflightTypesMap);
const cloud = $stdlib.cloud;
const util = $stdlib.util;
class Foo extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  foo() {
    return "foo";
  }
  checkWidget(widget) {
    return ((widget.compute()) + (blah.Widget.staticCompute(this)));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Foo-2.cjs")({
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
//# sourceMappingURL=preflight.file1-3.cjs.map
```

## preflight.file2-4.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
const util = $stdlib.util;
class Bar extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  bar() {
    (util.Util.nanoid());
    return "bar";
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Bar-3.cjs")({
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
class Foo extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
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
module.exports = { $preflightTypesMap, Bar };
//# sourceMappingURL=preflight.file2-4.cjs.map
```

## preflight.inflightclass-5.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
class InflightClass extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.InflightClass-4.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const InflightClassClient = ${InflightClass._toInflightType()};
        const client = new InflightClassClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "method": [
      ],
      "$inflight_init": [
      ],
    });
  }
}
if ($preflightTypesMap[5]) { throw new Error("InflightClass is already in type map"); }
$preflightTypesMap[5] = InflightClass;
module.exports = { $preflightTypesMap, InflightClass };
//# sourceMappingURL=preflight.inflightclass-5.cjs.map
```

## preflight.inner-2.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $preflightTypesMap = {};
Object.assign(module.exports, $helpers.bringJs(`${__dirname}/preflight.widget-1.cjs`, $preflightTypesMap));
module.exports = { ...module.exports, $preflightTypesMap };
//# sourceMappingURL=preflight.inner-2.cjs.map
```

## preflight.subdir2-6.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $preflightTypesMap = {};
Object.assign(module.exports, { get inner() { return $helpers.bringJs(`${__dirname}/preflight.inner-2.cjs`, $preflightTypesMap); } });
Object.assign(module.exports, $helpers.bringJs(`${__dirname}/preflight.inflightclass-5.cjs`, $preflightTypesMap));
Object.assign(module.exports, $helpers.bringJs(`${__dirname}/preflight.file2-4.cjs`, $preflightTypesMap));
Object.assign(module.exports, $helpers.bringJs(`${__dirname}/preflight.file1-3.cjs`, $preflightTypesMap));
module.exports = { ...module.exports, $preflightTypesMap };
//# sourceMappingURL=preflight.subdir2-6.cjs.map
```

## preflight.widget-1.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
class Widget extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  compute() {
    return 42;
  }
  static staticCompute($scope) {
    return 1337;
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Widget-1.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const WidgetClient = ${Widget._toInflightType()};
        const client = new WidgetClient({
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
module.exports = { $preflightTypesMap, Widget };
//# sourceMappingURL=preflight.widget-1.cjs.map
```

