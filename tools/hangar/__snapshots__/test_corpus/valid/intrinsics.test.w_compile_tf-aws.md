# [intrinsics.test.w](../../../../../examples/tests/valid/intrinsics.test.w) | compile | tf-aws

## inflight.Bar-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Bar {
  }
  return Bar;
}
//# sourceMappingURL=inflight.Bar-1.cjs.map
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
    const fs = $stdlib.fs;
    const expect = $stdlib.expect;
    const cloud = $stdlib.cloud;
    const util = $stdlib.util;
    const bar = $helpers.bringJs(`${__dirname}/preflight.bar-1.cjs`, $preflightTypesMap);
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    const path = "SHOULD_IGNORE";
    const filename = "intrinsics.test.w";
    const currentFile = (fs.Util.join($helpers.resolveDirname(__dirname, "../../.."), filename));
    (expect.Util.equal(filename, (fs.Util.basename(currentFile))));
    (expect.Util.equal($helpers.resolveDirname(__dirname, "../../.."), (fs.Util.dirname(currentFile))));
    (expect.Util.equal((bar.Bar.getSubdir(this)), (fs.Util.join($helpers.resolveDirname(__dirname, "../../.."), "subdir"))));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "intrinsics.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

