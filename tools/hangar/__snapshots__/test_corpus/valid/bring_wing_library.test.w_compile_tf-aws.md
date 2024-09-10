# [bring_wing_library.test.w](../../../../../tests/valid/bring_wing_library.test.w) | compile | tf-aws

## inflight.$Closure1-3.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $fixture_Store }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq((await $fixture_Store.makeKeyInflight("hello")), "data/hello.json"), "fixture.Store.makeKeyInflight(\"hello\") == \"data/hello.json\"");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-3.cjs.map
```

## inflight.InternalClass-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class InternalClass {
  }
  return InternalClass;
}
//# sourceMappingURL=inflight.InternalClass-2.cjs.map
```

## inflight.PublicClass-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class PublicClass {
  }
  return PublicClass;
}
//# sourceMappingURL=inflight.PublicClass-2.cjs.map
```

## inflight.Store-2.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $myutil_Util }) {
  class Store {
    constructor($args) {
      const { $this_data, $this_handlers } = $args;
      this.$this_data = $this_data;
      this.$this_handlers = $this_handlers;
    }
    static async makeKeyInflight(name) {
      return (require("@winglibs/testfixture/util.js")["makeKeyInflight"])(name)
    }
    async set(message) {
      (await this.$this_data.put("data.txt", (await $myutil_Util.double(message))));
      for (const handler of this.$this_handlers) {
        (await handler(message));
      }
    }
  }
  return Store;
}
//# sourceMappingURL=inflight.Store-2.cjs.map
```

## inflight.Util-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Util {
    static async makeKeyInflight(name) {
      return (require("@winglibs/testfixture/util.js")["makeKeyInflight"])(name)
    }
    static async double(msg) {
      return String.raw({ raw: ["", "", ""] }, msg, msg);
    }
  }
  return Util;
}
//# sourceMappingURL=inflight.Util-1.cjs.map
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
  },
  "resource": {
    "aws_s3_bucket": {
      "Store_Bucket_42A4CEFB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Store/Bucket/Default",
            "uniqueId": "Store_Bucket_42A4CEFB"
          }
        },
        "bucket_prefix": "bucket-c843dbb0-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_cors_configuration": {
      "Store_Bucket_CorsConfiguration-af11ee62_37AA6011": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Store/Bucket/CorsConfiguration-af11ee62",
            "uniqueId": "Store_Bucket_CorsConfiguration-af11ee62_37AA6011"
          }
        },
        "bucket": "${aws_s3_bucket.Store_Bucket_42A4CEFB.id}",
        "cors_rule": [
          {
            "allowed_headers": [
              "*"
            ],
            "allowed_methods": [
              "GET",
              "POST",
              "PUT",
              "DELETE",
              "HEAD"
            ],
            "allowed_origins": [
              "*"
            ],
            "expose_headers": [],
            "max_age_seconds": 0
          }
        ]
      }
    }
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
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const expect = $stdlib.expect;
    const fixture = $helpers.bringJs(`${__dirname}/preflight.testfixture-5.cjs`, $preflightTypesMap);
    const testfixture = $helpers.bringJs(`${__dirname}/preflight.testfixture-5.cjs`, $preflightTypesMap);
    const testfixture2 = $helpers.bringJs(`${__dirname}/preflight.testfixture-5.cjs`, $preflightTypesMap);
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-3.cjs")({
            $fixture_Store: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglibs/testfixture.Store") ?? fixture.Store, "", "Store"))},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglibs/testfixture.Store") ?? fixture.Store, "", "Store"), ["makeKeyInflight"]],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglibs/testfixture.Store") ?? fixture.Store, "", "Store"), []],
          ],
        });
      }
    }
    globalThis.$ClassFactory.new("@winglibs/testfixture.Store", fixture.Store, this, "Store");
    const fave_num = fixture.FavoriteNumbers.SEVEN;
    const fave_num2 = testfixture.FavoriteNumbers.SEVEN;
    const fave_num3 = testfixture2.FavoriteNumbers.SEVEN;
    $helpers.assert($helpers.eq((fixture.Store.makeKey("hello")), "data/hello.json"), "fixture.Store.makeKey(\"hello\") == \"data/hello.json\"");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:makeKeyInflight", new $Closure1(this, "$Closure1"));
    (expect.Util.equal((fixture.Store.loadStaticData(this)), "hello world!\n"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_wing_library.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

## preflight.enums-1.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
const FavoriteNumbers =
  (function (tmp) {
    tmp["SEVEN"] = "SEVEN";
    tmp["FORTY_TWO"] = "FORTY_TWO";
    return tmp;
  })({})
;
const FavoritePlanets =
  (function (tmp) {
    tmp["MARS"] = "MARS";
    tmp["JUPITER"] = "JUPITER";
    return tmp;
  })({})
;
module.exports = { $preflightTypesMap, FavoriteNumbers, FavoritePlanets };
//# sourceMappingURL=preflight.enums-1.cjs.map
```

## preflight.store-3.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
const cloud = $stdlib.cloud;
const fs = $stdlib.fs;
const myutil = $helpers.bringJs(`${__dirname}/preflight.util-2.cjs`, $preflightTypesMap);
class Store extends $stdlib.std.Resource {
  constructor($scope, $id, options) {
    super($scope, $id);
    this.data = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    this.handlers = [];
  }
  static makeKey(name) {
    return ($extern("@winglibs/testfixture/util.js")["makeKey"])(name)
  }
  onSet(handler) {
    $macros.__MutArray_push(false, this.handlers, handler);
  }
  static loadStaticData($scope) {
    const path = (fs.Util.join($helpers.resolve(__dirname, "../../../node_modules/@winglibs/testfixture"), "example-data.txt"));
    const contents = (fs.Util.readFile(path));
    return contents;
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Store-2.cjs")({
        $myutil_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglibs/testfixture.subdir.Util") ?? myutil.Util, "", "Util"))},
      })
    `;
  }
  _liftedState() {
    return {
      ...(super._liftedState?.() ?? {}),
      $this_data: $stdlib.core.liftObject(this.data),
      $this_handlers: $stdlib.core.liftObject(this.handlers),
    };
  }
  get _liftMap() {
    return ({
      "set": [
        [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglibs/testfixture.subdir.Util") ?? myutil.Util, "", "Util"), ["double"]],
        [this.data, ["put"]],
        [this.handlers, []],
      ],
      "$inflight_init": [
        [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglibs/testfixture.subdir.Util") ?? myutil.Util, "", "Util"), []],
        [this.data, []],
        [this.handlers, []],
      ],
    });
  }
  static get _liftTypeMap() {
    return ({
      "makeKeyInflight": [
      ],
    });
  }
}
class InternalClass extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static internalStaticMethod($scope) {
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.InternalClass-2.cjs")({
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
class PublicClass extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
    this.publicField = 42;
    this.internalField = 42;
  }
  static internalStaticMethod($scope) {
  }
  publicMethod() {
  }
  internalMethod() {
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.PublicClass-2.cjs")({
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
module.exports = { $preflightTypesMap, Store, InternalClass, PublicClass };
//# sourceMappingURL=preflight.store-3.cjs.map
```

## preflight.subdir-4.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $preflightTypesMap = {};
Object.assign(module.exports, $helpers.bringJs(`${__dirname}/preflight.util-2.cjs`, $preflightTypesMap));
module.exports = { ...module.exports, $preflightTypesMap };
//# sourceMappingURL=preflight.subdir-4.cjs.map
```

## preflight.testfixture-5.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $preflightTypesMap = {};
Object.assign(module.exports, { get subdir() { return $helpers.bringJs(`${__dirname}/preflight.subdir-4.cjs`, $preflightTypesMap); } });
Object.assign(module.exports, $helpers.bringJs(`${__dirname}/preflight.store-3.cjs`, $preflightTypesMap));
Object.assign(module.exports, $helpers.bringJs(`${__dirname}/preflight.enums-1.cjs`, $preflightTypesMap));
module.exports = { ...module.exports, $preflightTypesMap };
//# sourceMappingURL=preflight.testfixture-5.cjs.map
```

## preflight.util-2.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
let $preflightTypesMap = {};
class Util extends $stdlib.std.Resource {
  constructor($scope, $id, ) {
    super($scope, $id);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.Util-1.cjs")({
      })
    `;
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
  static get _liftTypeMap() {
    return ({
      "makeKeyInflight": [
      ],
      "double": [
      ],
    });
  }
}
module.exports = { $preflightTypesMap, Util };
//# sourceMappingURL=preflight.util-2.cjs.map
```

