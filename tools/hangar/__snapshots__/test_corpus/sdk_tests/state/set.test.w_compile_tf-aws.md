# [set.test.w](../../../../../../examples/tests/sdk_tests/state/set.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
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
//# sourceMappingURL=./inflight.$Closure1-1.js.map
```

## inflight.$Closure1-2.js
```js
"use strict";
module.exports = function({ $svc_startTime }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {console.log($svc_startTime)};
      {((cond) => {if (!cond) throw new Error("assertion failed: svc.startTime == \"2023-10-16T20:47:39.511Z\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($svc_startTime,"2023-10-16T20:47:39.511Z")))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-2.js.map
```

## inflight.MyService-1.js
```js
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
//# sourceMappingURL=./inflight.MyService-1.js.map
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
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
      "value": "[]"
    }
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const my = require("./preflight.myservice-1.js")({ $stdlib });
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("WING_TARGET")),"sim"))) {
      const svc = new my.MyService(this, "my.MyService");
      class $Closure1 extends $stdlib.std.Resource {
        constructor($scope, $id, ) {
          super($scope, $id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType(context) {
          return `
            require("./inflight.$Closure1-2.js")({
              $svc_startTime: ${context._lift(svc.startTime)},
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
          return ["handle", "$inflight_init"];
        }
        _registerOnLift(host, ops) {
          if (ops.includes("handle")) {
            $Closure1._registerOnLiftObject(svc.startTime, host, []);
          }
          super._registerOnLift(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:token resolved at runtime", new $Closure1(this, "$Closure1"));
    }
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "set.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();
//# sourceMappingURL=preflight.js.map
```

## preflight.myservice-1.js
```js
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
        constructor($scope, $id, ) {
          super($scope, $id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType(context) {
          return `
            require("./inflight.$Closure1-1.js")({
              $__parent_this_1_startTimeKey: ${context._lift(__parent_this_1.startTimeKey)},
              $__parent_this_1_state: ${context._lift(__parent_this_1.state)},
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
          return ["handle", "$inflight_init"];
        }
        _registerOnLift(host, ops) {
          if (ops.includes("handle")) {
            $Closure1._registerOnLiftObject(__parent_this_1.startTimeKey, host, []);
            $Closure1._registerOnLiftObject(__parent_this_1.state, host, ["set"]);
          }
          super._registerOnLift(host, ops);
        }
      }
      this.node.root.newAbstract("@winglang/sdk.cloud.Service", this, "cloud.Service", new $Closure1(this, "$Closure1"));
      this.startTime = (this.state.token(this.startTimeKey));
    }
    static _toInflightType(context) {
      return `
        require("./inflight.MyService-1.js")({
        })
      `;
    }
    _toInflight() {
      return `
        (await (async () => {
          const MyServiceClient = ${MyService._toInflightType(this)};
          const client = new MyServiceClient({
            $this_startTimeKey: ${this._lift(this.startTimeKey)},
            $this_state: ${this._lift(this.state)},
          });
          if (client.$inflight_init) { await client.$inflight_init(); }
          return client;
        })())
      `;
    }
    _supportedOps() {
      return ["getStartTime", "$inflight_init"];
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
//# sourceMappingURL=preflight.myservice-1.js.map
```

