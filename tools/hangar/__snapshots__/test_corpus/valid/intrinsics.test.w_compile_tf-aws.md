# [intrinsics.test.w](../../../../../examples/tests/valid/intrinsics.test.w) | compile | tf-aws

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
class Bar extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static bar($scope) {
    return "bar";
  }
  static getSubdir($scope) {
    return $helpers.path(__dirname, "../../../subdir", ".");
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
module.exports = { Bar };
//# sourceMappingURL=preflight.bar-1.cjs.map
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
const fs = $stdlib.fs;
const expect = $stdlib.expect;
const bar = require("./preflight.bar-1.cjs");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const path = "SHOULD_IGNORE";
    const filename = "intrinsics.test.w";
    const currentFile = $helpers.path(__dirname, "../../..", filename);
    (expect.Util.equal((fs.Util.basename(currentFile)), filename));
    const currentDir = $helpers.path(__dirname, "../../..", ".");
    (expect.Util.equal((fs.Util.dirname(currentFile)), currentDir));
    const currentDirAlt = $helpers.path(__dirname, "../../..", "./");
    (expect.Util.equal(currentDir, currentDirAlt));
    const upDir = $helpers.path(__dirname, "../../..", "..");
    (expect.Util.equal((fs.Util.dirname(currentDir)), upDir));
    const packageJson = $helpers.path(__dirname, "../../..", "package.json");
    (expect.Util.equal((fs.Util.join(currentDir, "package.json")), packageJson));
    const subdirPath = $helpers.path(__dirname, "../../..", "subdir");
    (expect.Util.equal(subdirPath, (bar.Bar.getSubdir(this))));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "intrinsics.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

