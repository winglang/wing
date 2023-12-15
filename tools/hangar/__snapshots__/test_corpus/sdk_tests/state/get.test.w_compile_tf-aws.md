# [get.test.w](../../../../../../examples/tests/sdk_tests/state/get.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $__parent_this_1_startTimeKey, $__parent_this_1_state }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $__parent_this_1_state.set($__parent_this_1_startTimeKey, "2023-10-16T20:47:39.511Z"));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.$Closure1-2.cjs
```cjs
"use strict";
module.exports = function({ $svc, $svc_startTime }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: svc.startTime == svc.getStartTime()")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($svc_startTime,(await $svc.getStartTime()))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: svc.getStartTime() == \"2023-10-16T20:47:39.511Z\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $svc.getStartTime()),"2023-10-16T20:47:39.511Z")))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-2.cjs.map
```

## inflight.$Closure2-2.cjs
```cjs
"use strict";
module.exports = function({ $svc_state }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const v = (await $svc_state.tryGet("foo_bar"));
      {((cond) => {if (!cond) throw new Error("assertion failed: !v?")})((!((v) != null)))};
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-2.cjs.map
```

## inflight.MyService-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class MyService {
    constructor({ $this_startTimeKey, $this_state }) {
      this.$this_startTimeKey = $this_startTimeKey;
      this.$this_state = $this_state;
    }
    async getStartTime() {
      return ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })((await this.$this_state.get(this.$this_startTimeKey)));
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
const my = require("./preflight.myservice-1.cjs")({ $stdlib });
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("WING_TARGET")),"sim"))) {
      const svc = new my.MyService(this, "my.MyService");
      class $Closure1 extends $stdlib.std.Resource {
        _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
        constructor($scope, $id, ) {
          super($scope, $id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType() {
          return `
            require("././inflight.$Closure1-2.cjs")({
              $svc: ${$stdlib.core.liftObject(svc)},
              $svc_startTime: ${$stdlib.core.liftObject(svc.startTime)},
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
            $Closure1._registerOnLiftObject(svc, host, ["getStartTime"]);
            $Closure1._registerOnLiftObject(svc.startTime, host, []);
          }
          super._registerOnLift(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:state.get() returns the runtime value", new $Closure1(this, "$Closure1"));
      class $Closure2 extends $stdlib.std.Resource {
        _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
        constructor($scope, $id, ) {
          super($scope, $id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType() {
          return `
            require("././inflight.$Closure2-2.cjs")({
              $svc_state: ${$stdlib.core.liftObject(svc.state)},
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
            $Closure2._registerOnLiftObject(svc.state, host, ["tryGet"]);
          }
          super._registerOnLift(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:state.tryGet() return nil if there is no value", new $Closure2(this, "$Closure2"));
    }
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "get.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

## preflight.myservice-1.cjs
```cjs
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  const sim = $stdlib.sim;
  const cloud = $stdlib.cloud;
  const util = $stdlib.util;
  class MyService extends $stdlib.std.Resource {
    constructor($scope, $id, ) {
      super($scope, $id);
      this.state = this.node.root.new("@winglang/sdk.sim.State", sim.State, this, "sim.State");
      this.startTimeKey = "start_time";
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
              $__parent_this_1_startTimeKey: ${$stdlib.core.liftObject(__parent_this_1.startTimeKey)},
              $__parent_this_1_state: ${$stdlib.core.liftObject(__parent_this_1.state)},
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
            $Closure1._registerOnLiftObject(__parent_this_1.startTimeKey, host, []);
            $Closure1._registerOnLiftObject(__parent_this_1.state, host, ["set"]);
          }
          super._registerOnLift(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.cloud.Service", cloud.Service, this, "cloud.Service", new $Closure1(this, "$Closure1"));
      this.startTime = (this.state.token(this.startTimeKey));
    }
    static _toInflightType() {
      return `
        require("././inflight.MyService-1.cjs")({
        })
      `;
    }
    _toInflight() {
      return `
        (await (async () => {
          const MyServiceClient = ${MyService._toInflightType(this)};
          const client = new MyServiceClient({
            $this_startTimeKey: ${$stdlib.core.liftObject(this.startTimeKey)},
            $this_state: ${$stdlib.core.liftObject(this.state)},
          });
          if (client.$inflight_init) { await client.$inflight_init(); }
          return client;
        })())
      `;
    }
    _supportedOps() {
      return [...super._supportedOps(), "getStartTime", "$inflight_init"];
    }
    _registerOnLift(host, ops) {
      if (ops.includes("$inflight_init")) {
        MyService._registerOnLiftObject(this.startTimeKey, host, []);
        MyService._registerOnLiftObject(this.state, host, []);
      }
      if (ops.includes("getStartTime")) {
        MyService._registerOnLiftObject(this.startTimeKey, host, ["asStr"]);
        MyService._registerOnLiftObject(this.state, host, ["get"]);
      }
      super._registerOnLift(host, ops);
    }
  }
  return { MyService };
};
//# sourceMappingURL=preflight.myservice-1.cjs.map
```

