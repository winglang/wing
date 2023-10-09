# [callbacks.test.w](../../../../../../examples/tests/sdk_tests/service/callbacks.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $b, $startCounter, $started, $status, $stopped }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b.put($status,$started));
      (await $startCounter.inc());
      return async () => {
        (await $b.put($status,$stopped));
        (await $startCounter.dec());
      }
      ;
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
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

```

## inflight.$Closure3-1.js
```js
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

```

## inflight.$Closure4-1.js
```js
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
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
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
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const http = $stdlib.http;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("WING_TARGET")),"sim"))) {
      const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      const startCounter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
      const status = "status";
      const started = "started";
      const stopped = "stopped";
      class $Closure1 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType(context) {
          return `
            require("./inflight.$Closure1-1.js")({
              $b: ${context._lift(b)},
              $startCounter: ${context._lift(startCounter)},
              $started: ${context._lift(started)},
              $status: ${context._lift(status)},
              $stopped: ${context._lift(stopped)},
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
        _registerBind(host, ops) {
          if (ops.includes("handle")) {
            $Closure1._registerBindObject(b, host, ["put"]);
            $Closure1._registerBindObject(startCounter, host, ["dec", "inc"]);
            $Closure1._registerBindObject(started, host, []);
            $Closure1._registerBindObject(status, host, []);
            $Closure1._registerBindObject(stopped, host, []);
          }
          super._registerBind(host, ops);
        }
      }
      const s = this.node.root.newAbstract("@winglang/sdk.cloud.Service",this,"cloud.Service",new $Closure1(this,"$Closure1"),{ autoStart: false });
      class $Closure2 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType(context) {
          return `
            require("./inflight.$Closure2-1.js")({
              $b: ${context._lift(b)},
              $status: ${context._lift(status)},
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
        _getInflightOps() {
          return ["handle", "$inflight_init"];
        }
        _registerBind(host, ops) {
          if (ops.includes("handle")) {
            $Closure2._registerBindObject(b, host, ["tryGet"]);
            $Closure2._registerBindObject(status, host, []);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:does not start automatically if autoStart is false",new $Closure2(this,"$Closure2"));
      class $Closure3 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType(context) {
          return `
            require("./inflight.$Closure3-1.js")({
              $b: ${context._lift(b)},
              $s: ${context._lift(s)},
              $startCounter: ${context._lift(startCounter)},
              $started: ${context._lift(started)},
              $status: ${context._lift(status)},
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
        _getInflightOps() {
          return ["handle", "$inflight_init"];
        }
        _registerBind(host, ops) {
          if (ops.includes("handle")) {
            $Closure3._registerBindObject(b, host, ["tryGet"]);
            $Closure3._registerBindObject(s, host, ["start"]);
            $Closure3._registerBindObject(startCounter, host, ["peek"]);
            $Closure3._registerBindObject(started, host, []);
            $Closure3._registerBindObject(status, host, []);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:start() calls onStart() idempotently",new $Closure3(this,"$Closure3"));
      class $Closure4 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType(context) {
          return `
            require("./inflight.$Closure4-1.js")({
              $b: ${context._lift(b)},
              $s: ${context._lift(s)},
              $startCounter: ${context._lift(startCounter)},
              $status: ${context._lift(status)},
              $stopped: ${context._lift(stopped)},
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
        _getInflightOps() {
          return ["handle", "$inflight_init"];
        }
        _registerBind(host, ops) {
          if (ops.includes("handle")) {
            $Closure4._registerBindObject(b, host, ["get", "tryGet"]);
            $Closure4._registerBindObject(s, host, ["start", "stop"]);
            $Closure4._registerBindObject(startCounter, host, ["peek"]);
            $Closure4._registerBindObject(status, host, []);
            $Closure4._registerBindObject(stopped, host, []);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:stop() calls onStop()",new $Closure4(this,"$Closure4"));
    }
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "callbacks.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

