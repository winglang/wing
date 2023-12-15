# [stateful.test.w](../../../../../../examples/tests/sdk_tests/service/stateful.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $__parent_this_1_b, $std_Duration, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {console.log("starting service")};
      (await $util_Util.sleep((await $std_Duration.fromSeconds(1))));
      (await $__parent_this_1_b.put("ready", "true"));
      const state = 456;
      return async () => {
        {console.log("stopping service")};
        {console.log(String.raw({ raw: ["state is: ", ""] }, state))};
        {((cond) => {if (!cond) throw new Error("assertion failed: state == 456")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(state,456)))};
      };
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $foo }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $foo.access());
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
```

## inflight.MyService-1.cjs
```cjs
"use strict";
module.exports = function({ $std_Number }) {
  class MyService {
    constructor({ $this_b }) {
      this.$this_b = $this_b;
    }
    async access() {
      (await this.$this_b.get("ready"));
    }
    async port() {
      return ((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return Number(args) })((await this.$this_b.get("port")));
    }
  }
  return MyService;
}
//# sourceMappingURL=./inflight.MyService-1.cjs.map
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

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const http = $stdlib.http;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("WING_TARGET")),"sim"))) {
      class MyService extends $stdlib.std.Resource {
        constructor($scope, $id, body) {
          super($scope, $id);
          this.b = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
          this.body = body;
          const __parent_this_1 = this;
          class $Closure1 extends $stdlib.std.Resource {
            _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
            constructor($scope, $id, ) {
              super($scope, $id);
              (std.Node.of(this)).hidden = true;
            }
            static _toInflightType() {
              return `
                require("././inflight.$Closure1-1.cjs")({
                  $__parent_this_1_b: ${$stdlib.core.liftObject(__parent_this_1.b)},
                  $std_Duration: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
                  $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
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
                $Closure1._registerOnLiftObject(__parent_this_1.b, host, ["put"]);
              }
              super._registerOnLift(host, ops);
            }
          }
          this.s = this.node.root.new("@winglang/sdk.cloud.Service", cloud.Service, this, "cloud.Service", new $Closure1(this, "$Closure1"));
        }
        static _toInflightType() {
          return `
            require("././inflight.MyService-1.cjs")({
              $std_Number: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
            })
          `;
        }
        _toInflight() {
          return `
            (await (async () => {
              const MyServiceClient = ${MyService._toInflightType(this)};
              const client = new MyServiceClient({
                $this_b: ${$stdlib.core.liftObject(this.b)},
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `;
        }
        _supportedOps() {
          return [...super._supportedOps(), "access", "port", "$inflight_init"];
        }
        _registerOnLift(host, ops) {
          if (ops.includes("$inflight_init")) {
            MyService._registerOnLiftObject(this.b, host, []);
          }
          if (ops.includes("access")) {
            MyService._registerOnLiftObject(this.b, host, ["get"]);
          }
          if (ops.includes("port")) {
            MyService._registerOnLiftObject(this.b, host, ["get"]);
          }
          super._registerOnLift(host, ops);
        }
      }
      const foo = new MyService(this, "MyService", "bang bang!");
      class $Closure2 extends $stdlib.std.Resource {
        _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
        constructor($scope, $id, ) {
          super($scope, $id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType() {
          return `
            require("././inflight.$Closure2-1.cjs")({
              $foo: ${$stdlib.core.liftObject(foo)},
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
        _registerOnLift(host, ops) {
          if (ops.includes("handle")) {
            $Closure2._registerOnLiftObject(foo, host, ["access"]);
          }
          super._registerOnLift(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:service is ready only after onStart finishes", new $Closure2(this, "$Closure2"));
    }
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "stateful.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

