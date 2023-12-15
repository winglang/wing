# [bring_local_dir.test.w](../../../../../examples/tests/valid/bring_local_dir.test.w) | compile | tf-aws

## inflight.Bar-3.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class Bar {
    constructor({  }) {
    }
  }
  return Bar;
}
//# sourceMappingURL=./inflight.Bar-3.cjs.map
```

## inflight.Foo-2.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
  }
  return Foo;
}
//# sourceMappingURL=./inflight.Foo-2.cjs.map
```

## inflight.Foo-3.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
  }
  return Foo;
}
//# sourceMappingURL=./inflight.Foo-3.cjs.map
```

## inflight.Widget-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class Widget {
    constructor({  }) {
    }
  }
  return Widget;
}
//# sourceMappingURL=./inflight.Widget-1.cjs.map
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

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const w = require("./preflight.widget-1.cjs")({ $stdlib });
const subdir = require("./preflight.subdir2-5.cjs")({ $stdlib });
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const widget1 = new w.Widget(this, "w.Widget");
    {((cond) => {if (!cond) throw new Error("assertion failed: widget1.compute() == 42")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((widget1.compute()),42)))};
    const foo = new subdir.Foo(this, "subdir.Foo");
    {((cond) => {if (!cond) throw new Error("assertion failed: foo.foo() == \"foo\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((foo.foo()),"foo")))};
    const bar = new subdir.Bar(this, "subdir.Bar");
    {((cond) => {if (!cond) throw new Error("assertion failed: bar.bar() == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((bar.bar()),"bar")))};
    const widget2 = new subdir.inner.Widget(this, "subdir.inner.Widget");
    {((cond) => {if (!cond) throw new Error("assertion failed: widget2.compute() == 42")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((widget2.compute()),42)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: foo.checkWidget(widget2) == 1379")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((foo.checkWidget(widget2)),1379)))};
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_local_dir.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

## preflight.file1-3.cjs
```cjs
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  const blah = require("./preflight.inner-2.cjs")({ $stdlib });
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
      return ((widget.compute()) + (blah.Widget.staticCompute()));
    }
    static _toInflightType() {
      return `
        require("././inflight.Foo-2.cjs")({
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
  return { Foo };
};
//# sourceMappingURL=preflight.file1-3.cjs.map
```

## preflight.file2-4.cjs
```cjs
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
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
        require("././inflight.Bar-3.cjs")({
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
        require("././inflight.Foo-3.cjs")({
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
  return { Bar };
};
//# sourceMappingURL=preflight.file2-4.cjs.map
```

## preflight.inner-2.cjs
```cjs
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  return {
    ...require("./preflight.widget-1.cjs")({ $stdlib }),
  };
};
//# sourceMappingURL=preflight.inner-2.cjs.map
```

## preflight.subdir2-5.cjs
```cjs
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  return {
    inner: require("./preflight.inner-2.cjs")({ $stdlib }),
    ...require("./preflight.file2-4.cjs")({ $stdlib }),
    ...require("./preflight.file1-3.cjs")({ $stdlib }),
  };
};
//# sourceMappingURL=preflight.subdir2-5.cjs.map
```

## preflight.widget-1.cjs
```cjs
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
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
        require("././inflight.Widget-1.cjs")({
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
  return { Widget };
};
//# sourceMappingURL=preflight.widget-1.cjs.map
```

