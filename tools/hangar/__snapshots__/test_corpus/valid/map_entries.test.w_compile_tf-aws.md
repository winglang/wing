# [map_entries.test.w](../../../../../tests/valid/map_entries.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $map }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($macros.__Map_size(false, $map, ), 1), "map.size() == 1");
      $helpers.assert($macros.__Map_has(false, $map, "foo"), "map.has(\"foo\")");
      $helpers.assert((!$macros.__Map_has(false, $map, "bar")), "!map.has(\"bar\")");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $map }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($macros.__Map_get(false, $map, "foo"), "hello"), "map.get(\"foo\") == \"hello\"");
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $map }) {
  class $Closure3 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const entries = $macros.__Map_entries(false, $map, );
      for (const x of $macros.__Map_entries(false, $map, )) {
        $helpers.assert($helpers.eq(x.key, "foo"), "x.key == \"foo\"");
        $helpers.assert($helpers.eq(x.value, "hello"), "x.value == \"hello\"");
      }
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map
```

## inflight.$Closure4-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class $Closure4 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const map = ({["foo"]: "hello", ["bar"]: "world"});
      $helpers.assert($helpers.eq($macros.__Map_entries(false, map, ).length, 2), "map.entries().length == 2");
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.cjs.map
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
const $macros = require("@winglang/sdk/lib/macros");
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $types = require("./types.cjs");
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $map: ${$stdlib.core.liftObject(map)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [map, [].concat(["size"], ["has"])],
          ],
          "$inflight_init": [
            [map, []],
          ],
        });
      }
    }
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
            $map: ${$stdlib.core.liftObject(map)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [map, ["get"]],
          ],
          "$inflight_init": [
            [map, []],
          ],
        });
      }
    }
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.cjs")({
            $map: ${$stdlib.core.liftObject(map)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [map, ["entries"]],
          ],
          "$inflight_init": [
            [map, []],
          ],
        });
      }
    }
    class $Closure4 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.cjs")({
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    const map = ({["foo"]: "hello"});
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:check if map has entries", new $Closure1(this, "$Closure1"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:get value from map", new $Closure2(this, "$Closure2"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:iterate map using entries() method", new $Closure3(this, "$Closure3"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:check entries() when map has multiple entries", new $Closure4(this, "$Closure4"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "map_entries.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

