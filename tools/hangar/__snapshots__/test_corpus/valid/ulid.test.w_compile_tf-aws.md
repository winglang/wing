# [ulid.test.w](../../../../../examples/tests/valid/ulid.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $expect_Util, $preflightUlid_length }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal(26, $preflightUlid_length));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Sortable, $expect_Util, $std_Duration, $util_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const a = (await $util_Util.ulid());
      (await $util_Util.sleep((await $std_Duration.fromSeconds(0.001))));
      const b = (await $util_Util.ulid());
      (await $util_Util.sleep((await $std_Duration.fromSeconds(0.001))));
      const c = (await $util_Util.ulid());
      const sorted = (await $Sortable.sortStringListAsc([c, b, a]));
      (await $expect_Util.equal(a, ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(sorted, 0)));
      (await $expect_Util.equal(b, ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(sorted, 1)));
      (await $expect_Util.equal(c, ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(sorted, 2)));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.$Closure3-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Sortable, $expect_Util, $std_Duration, $util_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const a = (await $util_Util.ulid());
      (await $util_Util.sleep((await $std_Duration.fromSeconds(0.001))));
      const b = (await $util_Util.ulid());
      (await $util_Util.sleep((await $std_Duration.fromSeconds(0.001))));
      const c = (await $util_Util.ulid());
      const sorted = (await $Sortable.sortStringListDesc([a, b, c]));
      (await $expect_Util.equal(c, ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(sorted, 0)));
      (await $expect_Util.equal(b, ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(sorted, 1)));
      (await $expect_Util.equal(a, ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(sorted, 2)));
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.js.map
```

## inflight.Sortable-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Sortable {
    static async sortStringListAsc(arr) {
      return (require("../../../sort.js")["sortStringListAsc"])(arr)
    }
    static async sortStringListDesc(arr) {
      return (require("../../../sort.js")["sortStringListDesc"])(arr)
    }
  }
  return Sortable;
}
//# sourceMappingURL=inflight.Sortable-1.js.map
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
const util = $stdlib.util;
const expect = $stdlib.expect;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Sortable extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("./inflight.Sortable-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const SortableClient = ${Sortable._toInflightType(this)};
            const client = new SortableClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "sortStringListAsc", "sortStringListDesc", "$inflight_init"];
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure1-1.js")({
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $preflightUlid_length: ${$stdlib.core.liftObject(preflightUlid.length)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(preflightUlid.length, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure2-1.js")({
            $Sortable: ${$stdlib.core.liftObject(Sortable)},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $std_Duration: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure3-1.js")({
            $Sortable: ${$stdlib.core.liftObject(Sortable)},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $std_Duration: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
    }
    const preflightUlid = (util.Util.ulid());
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:preflight ulid works", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:is sorted ascending for batch creation", new $Closure2(this, "$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:is sorted descending for batch creation", new $Closure3(this, "$Closure3"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "ulid.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

