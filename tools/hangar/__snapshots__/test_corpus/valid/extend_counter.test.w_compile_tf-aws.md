# [extend_counter.test.w](../../../../../examples/tests/valid/extend_counter.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $c, $expect_Util }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $c.inc());
      (await $expect_Util.equal((await $c.peek()), 1));
      (await $expect_Util.equal((await $c.extra1()), "extra1"));
      (await $expect_Util.equal((await $c.extra2()), "extra2"));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.MyCounter-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $cloud_Counter, $expect_Util, $global_value }) {
  class MyCounter extends $cloud_Counter {
    constructor($args) {
      const { $this_field1 } = $args;
      super($args);
      this.$this_field1 = $this_field1;
    }
    async inc() {
      (await $expect_Util.equal(this.$this_field1, 5));
      (await $expect_Util.equal($global_value, "yo"));
      (await super.inc());
    }
    async extra1() {
      return "extra1";
    }
  }
  return MyCounter;
}
//# sourceMappingURL=inflight.MyCounter-1.cjs.map
```

## inflight.MySuperCounter-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $MyCounter, $expect_Util, $global_value }) {
  class MySuperCounter extends $MyCounter {
    constructor($args) {
      const { $this_field1, $this_field2 } = $args;
      super($args);
      this.$this_field1 = $this_field1;
      this.$this_field2 = $this_field2;
    }
    async inc() {
      (await $expect_Util.equal(this.$this_field2, 10));
      (await $expect_Util.equal(this.$this_field1, 5));
      (await $expect_Util.equal($global_value, "yo"));
      (await super.inc());
    }
    async extra2() {
      return "extra2";
    }
  }
  return MySuperCounter;
}
//# sourceMappingURL=inflight.MySuperCounter-1.cjs.map
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
  },
  "resource": {
    "aws_dynamodb_table": {
      "MySuperCounter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MySuperCounter/Default",
            "uniqueId": "MySuperCounter"
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
        "name": "wing-counter-MySuperCounter-c8af08af"
      }
    }
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
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const expect = $stdlib.expect;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class MyCounter extends (this?.node?.root?.typeForFqn("@winglang/sdk.cloud.Counter") ?? cloud.Counter) {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.field1 = 5;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.MyCounter-1.cjs")({
            $cloud_Counter: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType($scope.node.root.typeForFqn("@winglang/sdk.cloud.Counter") ?? cloud.Counter, "@winglang/sdk/cloud", "Counter"))},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType($scope.node.root.typeForFqn("@winglang/sdk.expect.Util") ?? expect.Util, "@winglang/sdk/expect", "Util"))},
            $global_value: ${$stdlib.core.liftObject(global_value)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
          $this_field1: $stdlib.core.liftObject(this.field1),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "inc": [
            [global_value, []],
            [this.field1, []],
          ],
          "extra1": [
          ],
          "$inflight_init": [
            [global_value, []],
            [this.field1, []],
          ],
        });
      }
    }
    class MySuperCounter extends MyCounter {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.field2 = 10;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.MySuperCounter-1.cjs")({
            $MyCounter: ${$stdlib.core.liftObject(MyCounter)},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType($scope.node.root.typeForFqn("@winglang/sdk.expect.Util") ?? expect.Util, "@winglang/sdk/expect", "Util"))},
            $global_value: ${$stdlib.core.liftObject(global_value)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
          $this_field1: $stdlib.core.liftObject(this.field1),
          $this_field2: $stdlib.core.liftObject(this.field2),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "inc": [
            [global_value, []],
            [this.field1, []],
            [this.field2, []],
          ],
          "extra2": [
          ],
          "$inflight_init": [
            [global_value, []],
            [this.field1, []],
            [this.field2, []],
          ],
        });
      }
    }
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $c: ${$stdlib.core.liftObject(c)},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType($scope.node.root.typeForFqn("@winglang/sdk.expect.Util") ?? expect.Util, "@winglang/sdk/expect", "Util"))},
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
            [c, [].concat(["inc"], ["peek"], ["extra1"], ["extra2"])],
          ],
          "$inflight_init": [
            [c, []],
          ],
        });
      }
    }
    const global_value = "yo";
    const c = new MySuperCounter(this, "MySuperCounter");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:counter works", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "extend_counter.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

