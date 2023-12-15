# [callbacks.test.w](../../../../../../examples/tests/sdk_tests/service/callbacks.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $b, $startCounter, $started, $status, $stopped }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b.put($status, $started));
      (await $startCounter.inc());
      return async () => {
        (await $b.put($status, $stopped));
        (await $startCounter.dec());
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
module.exports = function({ $b, $status }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: !b.tryGet(status)?")})((!(((await $b.tryGet($status))) != null)))};
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
module.exports = function({ $b, $s, $startCounter, $started, $status }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $s.start());
      {((cond) => {if (!cond) throw new Error("assertion failed: b.tryGet(status) == started")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.tryGet($status)),$started)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: startCounter.peek() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $startCounter.peek()),1)))};
      (await $s.start());
      {((cond) => {if (!cond) throw new Error("assertion failed: startCounter.peek() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $startCounter.peek()),1)))};
    }
  }
  return $Closure3;
}
//# sourceMappingURL=./inflight.$Closure3-1.cjs.map
```

## inflight.$Closure4-1.cjs
```cjs
"use strict";
module.exports = function({ $b, $s, $startCounter, $status, $stopped }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: startCounter.peek() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $startCounter.peek()),0)))};
      (await $s.stop());
      {((cond) => {if (!cond) throw new Error("assertion failed: !b.tryGet(status)?")})((!(((await $b.tryGet($status))) != null)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: startCounter.peek() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $startCounter.peek()),0)))};
      (await $s.start());
      {((cond) => {if (!cond) throw new Error("assertion failed: startCounter.peek() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $startCounter.peek()),1)))};
      (await $s.stop());
      {((cond) => {if (!cond) throw new Error("assertion failed: startCounter.peek() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $startCounter.peek()),0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.get(status) == stopped")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.get($status)),$stopped)))};
    }
  }
  return $Closure4;
}
//# sourceMappingURL=./inflight.$Closure4-1.cjs.map
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
      const b = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
      const startCounter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
      const status = "status";
      const started = "started";
      const stopped = "stopped";
      class $Closure1 extends $stdlib.std.Resource {
        _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
        constructor($scope, $id, ) {
          super($scope, $id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType() {
          return `
            require("././inflight.$Closure1-1.cjs")({
              $b: ${$stdlib.core.liftObject(b)},
              $startCounter: ${$stdlib.core.liftObject(startCounter)},
              $started: ${$stdlib.core.liftObject(started)},
              $status: ${$stdlib.core.liftObject(status)},
              $stopped: ${$stdlib.core.liftObject(stopped)},
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
            $Closure1._registerOnLiftObject(b, host, ["put"]);
            $Closure1._registerOnLiftObject(startCounter, host, ["dec", "inc"]);
            $Closure1._registerOnLiftObject(started, host, []);
            $Closure1._registerOnLiftObject(status, host, []);
            $Closure1._registerOnLiftObject(stopped, host, []);
          }
          super._registerOnLift(host, ops);
        }
      }
      const s = this.node.root.new("@winglang/sdk.cloud.Service", cloud.Service, this, "cloud.Service", new $Closure1(this, "$Closure1"), { autoStart: false });
      class $Closure2 extends $stdlib.std.Resource {
        _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
        constructor($scope, $id, ) {
          super($scope, $id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType() {
          return `
            require("././inflight.$Closure2-1.cjs")({
              $b: ${$stdlib.core.liftObject(b)},
              $status: ${$stdlib.core.liftObject(status)},
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
            $Closure2._registerOnLiftObject(b, host, ["tryGet"]);
            $Closure2._registerOnLiftObject(status, host, []);
          }
          super._registerOnLift(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:does not start automatically if autoStart is false", new $Closure2(this, "$Closure2"));
      class $Closure3 extends $stdlib.std.Resource {
        _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
        constructor($scope, $id, ) {
          super($scope, $id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType() {
          return `
            require("././inflight.$Closure3-1.cjs")({
              $b: ${$stdlib.core.liftObject(b)},
              $s: ${$stdlib.core.liftObject(s)},
              $startCounter: ${$stdlib.core.liftObject(startCounter)},
              $started: ${$stdlib.core.liftObject(started)},
              $status: ${$stdlib.core.liftObject(status)},
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
        _registerOnLift(host, ops) {
          if (ops.includes("handle")) {
            $Closure3._registerOnLiftObject(b, host, ["tryGet"]);
            $Closure3._registerOnLiftObject(s, host, ["start"]);
            $Closure3._registerOnLiftObject(startCounter, host, ["peek"]);
            $Closure3._registerOnLiftObject(started, host, []);
            $Closure3._registerOnLiftObject(status, host, []);
          }
          super._registerOnLift(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:start() calls onStart() idempotently", new $Closure3(this, "$Closure3"));
      class $Closure4 extends $stdlib.std.Resource {
        _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
        constructor($scope, $id, ) {
          super($scope, $id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType() {
          return `
            require("././inflight.$Closure4-1.cjs")({
              $b: ${$stdlib.core.liftObject(b)},
              $s: ${$stdlib.core.liftObject(s)},
              $startCounter: ${$stdlib.core.liftObject(startCounter)},
              $status: ${$stdlib.core.liftObject(status)},
              $stopped: ${$stdlib.core.liftObject(stopped)},
            })
          `;
        }
        _toInflight() {
          return `
            (await (async () => {
              const $Closure4Client = ${$Closure4._toInflightType(this)};
              const client = new $Closure4Client({
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
            $Closure4._registerOnLiftObject(b, host, ["get", "tryGet"]);
            $Closure4._registerOnLiftObject(s, host, ["start", "stop"]);
            $Closure4._registerOnLiftObject(startCounter, host, ["peek"]);
            $Closure4._registerOnLiftObject(status, host, []);
            $Closure4._registerOnLiftObject(stopped, host, []);
          }
          super._registerOnLift(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:stop() calls onStop()", new $Closure4(this, "$Closure4"));
    }
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "callbacks.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

