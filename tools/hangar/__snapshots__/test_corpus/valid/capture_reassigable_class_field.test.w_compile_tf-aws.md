# [capture_reassigable_class_field.test.w](../../../../../examples/tests/valid/capture_reassigable_class_field.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(k) {
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
module.exports = function({ $counter }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      (await $counter.inc(1, key));
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
module.exports = function({ $counter, $kv, $util_Util }) {
  class $Closure3 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $kv.set("k", ({"value": "v"})));
      (await $kv.set("k2", ({"value": "v"})));
      (await $kv.get("k"));
      (await $kv.get("k"));
      (await $kv.get("k2"));
      (await $util_Util.waitUntil((async () => {
        return $helpers.eq((await $counter.peek("k")), 2);
      })));
      (await $util_Util.waitUntil((async () => {
        return $helpers.eq((await $counter.peek("k2")), 1);
      })));
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map
```

## inflight.KeyValueStore-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class KeyValueStore {
    constructor($args) {
      const { $this_bucket, $this_onUpdateCallback } = $args;
      this.$this_bucket = $this_bucket;
      this.$this_onUpdateCallback = $this_onUpdateCallback;
    }
    async get(key) {
      (await this.$this_onUpdateCallback(key));
      return (await this.$this_bucket.getJson(key));
    }
    async set(key, value) {
      (await this.$this_bucket.putJson(key, value));
    }
  }
  return KeyValueStore;
}
//# sourceMappingURL=inflight.KeyValueStore-1.cjs.map
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
    "aws_dynamodb_table": {
      "sasa": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/sasa/Default",
            "uniqueId": "sasa"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-sasa-c8fc4cc8"
      }
    },
    "aws_s3_bucket": {
      "KeyValueStore_Bucket_EBBCDEA3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/KeyValueStore/Bucket/Default",
            "uniqueId": "KeyValueStore_Bucket_EBBCDEA3"
          }
        },
        "bucket_prefix": "bucket-c8da6031-",
        "force_destroy": false
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
    const cloud = $stdlib.cloud;
    const util = $stdlib.util;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class KeyValueStore extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.bucket = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
        class $Closure1 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
              })
            `;
          }
          _liftedState() {
            return {
              ...(super._liftedState?.() ?? {}),
            };
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
        this.onUpdateCallback = new $Closure1(this, "$Closure1");
      }
      onUpdate(fn) {
        this.onUpdateCallback = fn;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.KeyValueStore-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
          $this_bucket: $stdlib.core.liftObject(this.bucket),
          $this_onUpdateCallback: $stdlib.core.liftObject(this.onUpdateCallback),
        };
      }
      get _liftMap() {
        return ({
          "get": [
            [this.bucket, ["getJson"]],
            [this.onUpdateCallback, ["handle"]],
          ],
          "set": [
            [this.bucket, ["putJson"]],
          ],
          "$inflight_init": [
            [this.bucket, []],
            [this.onUpdateCallback, []],
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
            $counter: ${$stdlib.core.liftObject(counter)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return ({
          "handle": [
            [counter, ["inc"]],
          ],
          "$inflight_init": [
            [counter, []],
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
            $counter: ${$stdlib.core.liftObject(counter)},
            $kv: ${$stdlib.core.liftObject(kv)},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"))},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"), ["waitUntil"]],
            [counter, ["peek"]],
            [kv, [].concat(["set"], ["get"])],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"), []],
            [counter, []],
            [kv, []],
          ],
        });
      }
    }
    const kv = new KeyValueStore(this, "KeyValueStore");
    const counter = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "sasa");
    (kv.onUpdate(new $Closure2(this, "$Closure2")));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:main", new $Closure3(this, "$Closure3"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "capture_reassigable_class_field.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

