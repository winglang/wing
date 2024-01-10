# [bring_local_dir.test.w](../../../../../examples/tests/valid/bring_local_dir.test.w) | compile | tf-aws

## inflight.Bar-3.js
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
//# sourceMappingURL=inflight.Bar-3.js.map
```

## inflight.Foo-2.js
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
//# sourceMappingURL=inflight.Foo-2.js.map
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

## inflight.Widget-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Widget {
    constructor({  }) {
    }
  }
  return Widget;
}
//# sourceMappingURL=inflight.Widget-1.js.map
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

## preflight.file1-3.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const blah = require("./preflight.inner-2.js");
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const $PlatformManager = require('./platform_manager.js');
class Foo extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  foo() {
    return "foo";
  }
  checkWidget(widget) {
    return ((widget.compute()) + (blah.Widget.staticCompute()));
  }
  static _toInflightType() {
    return `
      require("./inflight.Foo-2.js")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const FooClient = ${Foo._toInflightType(this)};
        const client = new FooClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  _supportedOps() {
    return [...super._supportedOps(), "$inflight_init"];
  }
}
module.exports = { Foo };
//# sourceMappingURL=preflight.file1-3.js.map
```

## preflight.file2-4.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const util = $stdlib.util;
const $PlatformManager = require('./platform_manager.js');
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
      require("./inflight.Bar-3.js")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const BarClient = ${Bar._toInflightType(this)};
        const client = new BarClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  _supportedOps() {
    return [...super._supportedOps(), "$inflight_init"];
  }
}
class Foo extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("./inflight.Foo-3.js")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const FooClient = ${Foo._toInflightType(this)};
        const client = new FooClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  _supportedOps() {
    return [...super._supportedOps(), "$inflight_init"];
  }
}
module.exports = { Bar };
//# sourceMappingURL=preflight.file2-4.js.map
```

## preflight.inner-2.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $PlatformManager = require('./platform_manager.js');
module.exports = {
  ...require("./preflight.widget-1.js"),
};
//# sourceMappingURL=preflight.inner-2.js.map
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const w = require("./preflight.widget-1.js");
const subdir = require("./preflight.subdir2-5.js");
const $PlatformManager = require('./platform_manager.js');
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const widget1 = new w.Widget(this, "w.Widget");
    $helpers.assert($helpers.eq((widget1.compute()), 42), "widget1.compute() == 42");
    const foo = new subdir.Foo(this, "subdir.Foo");
    $helpers.assert($helpers.eq((foo.foo()), "foo"), "foo.foo() == \"foo\"");
    const bar = new subdir.Bar(this, "subdir.Bar");
    $helpers.assert($helpers.eq((bar.bar()), "bar"), "bar.bar() == \"bar\"");
    const widget2 = new subdir.inner.Widget(this, "subdir.inner.Widget");
    $helpers.assert($helpers.eq((widget2.compute()), 42), "widget2.compute() == 42");
    $helpers.assert($helpers.eq((foo.checkWidget(widget2)), 1379), "foo.checkWidget(widget2) == 1379");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_local_dir.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

## preflight.subdir2-5.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $PlatformManager = require('./platform_manager.js');
module.exports = {
  get inner() { return require("./preflight.inner-2.js") },
  ...require("./preflight.file2-4.js"),
  ...require("./preflight.file1-3.js"),
};
//# sourceMappingURL=preflight.subdir2-5.js.map
```

## preflight.widget-1.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $PlatformManager = require('./platform_manager.js');
class Widget extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  compute() {
    return 42;
  }
  static staticCompute() {
    return 1337;
  }
  static _toInflightType() {
    return `
      require("./inflight.Widget-1.js")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const WidgetClient = ${Widget._toInflightType(this)};
        const client = new WidgetClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  _supportedOps() {
    return [...super._supportedOps(), "$inflight_init"];
  }
}
module.exports = { Widget };
//# sourceMappingURL=preflight.widget-1.js.map
```

