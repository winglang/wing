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

## preflight.file1-3.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const blah = require("./preflight.inner-2.js");
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const { $APP } = initializePlatform();
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
      require("${$helpers.normalPath(__dirname)}/inflight.Foo-2.js")({
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
//# sourceMappingURL=preflight.file1-3.js.map
```

## preflight.file2-4.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const util = $stdlib.util;
const { $APP } = initializePlatform();
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
      require("${$helpers.normalPath(__dirname)}/inflight.Bar-3.js")({
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
module.exports = { Bar };
//# sourceMappingURL=preflight.file2-4.js.map
```

## preflight.inner-2.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
module.exports = {
  ...require("./preflight.widget-1.js"),
};
//# sourceMappingURL=preflight.inner-2.js.map
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const w = require("./preflight.widget-1.js");
const subdir = require("./preflight.subdir2-5.js");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
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
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

## preflight.subdir2-5.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
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
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const { $APP } = initializePlatform();
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
      require("${$helpers.normalPath(__dirname)}/inflight.Widget-1.js")({
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
module.exports = { Widget };
//# sourceMappingURL=preflight.widget-1.js.map
```

