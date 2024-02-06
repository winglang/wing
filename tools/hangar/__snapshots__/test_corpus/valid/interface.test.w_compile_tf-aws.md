# [interface.test.w](../../../../../examples/tests/valid/interface.test.w) | compile | tf-aws

## inflight.Square-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Square {
    constructor({  }) {
    }
  }
  return Square;
}
//# sourceMappingURL=inflight.Square-1.js.map
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

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Square extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      method1() {
        return "";
      }
      method2() {
      }
      method3() {
        return this;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Square-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const SquareClient = ${Square._toInflightType()};
            const client = new SquareClient({
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
    let square = ({"method1": (() => {
      return "";
    }), "method2": (() => {
    }), "method3": (() => {
    })});
    square = new Square(this, "Square");
    const takesInterface = ((s) => {
    });
    (takesInterface({ method2: (() => {
    }) }));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "interface.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

