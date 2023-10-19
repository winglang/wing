# [my-service.w](../../../../../../examples/tests/sdk_tests/state/my-service.w) | compile | tf-aws

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
      (await $__parent_this_1_state.set($__parent_this_1_startTimeKey,"2023-10-16T20:47:39.511Z"));
    }
  }
  return $Closure1;
}

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

```

## preflight.js
```js
"use strict";
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  const sim = $stdlib.sim;
  const cloud = $stdlib.cloud;
  const util = $stdlib.util;
  class MyService extends $stdlib.std.Resource {
    constructor(scope, id, ) {
      super(scope, id);
      this.state = this.node.root.new("@winglang/sdk.sim.State",sim.State,this,"sim.State");
      this.startTimeKey = "start_time";
      const __parent_this_1 = this;
      class $Closure1 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
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
        _getInflightOps() {
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
      this.node.root.newAbstract("@winglang/sdk.cloud.Service",this,"cloud.Service",new $Closure1(this,"$Closure1"));
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
    _getInflightOps() {
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

```

