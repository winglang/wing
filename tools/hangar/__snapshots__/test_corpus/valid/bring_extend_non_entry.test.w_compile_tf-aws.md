# [bring_extend_non_entry.test.w](../../../../../examples/tests/valid/bring_extend_non_entry.test.w) | compile | tf-aws

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $cdk8s_Chart }) {
  class Foo extends $cdk8s_Chart {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.cjs.map
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
const lib = require("./preflight.extendnonentrypoint-1.cjs");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const f = new lib.Foo(this, "Foo");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_extend_non_entry.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

## preflight.extendnonentrypoint-1.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cdk8s = require("cdk8s");
class Foo extends (this?.node?.root?.typeForFqn("cdk8s.Chart") ?? cdk8s.Chart) {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
        $cdk8s_Chart: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType($scope.node.root.typeForFqn("cdk8s.Chart") ?? cdk8s.Chart, "cdk8s", "Chart"))},
      })
    `;
  }
  _liftedState() {
    return {
      ...(super._liftedState?.() ?? {}),
    };
  }
  get _liftMap() {
    return $stdlib.core.mergeLiftDeps(super._liftMap, {
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { Foo };
//# sourceMappingURL=preflight.extendnonentrypoint-1.cjs.map
```

