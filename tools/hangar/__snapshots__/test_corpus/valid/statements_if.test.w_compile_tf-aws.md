# [statements_if.test.w](../../../../../examples/tests/valid/statements_if.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      if (true) {
        const x = 2;
        if ((true && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((x + 2),4)))) {
          if ((true && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((x + 3),4)))) {
            {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
          }
          else if ((true && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((x + 3),6)))) {
            {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
          }
          else if ((false || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((x + 3),5)))) {
            {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
          }
          else {
            {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
          }
        }
        else {
          {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
        }
      }
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
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
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure1-1.js")({
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
    }
    if (true) {
      const x = 2;
      const f = false;
      if ((true && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((x + 2),4)))) {
        if ((true && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((x + 3),4)))) {
          {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
        }
        else if ((true && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((x + 3),6)))) {
          {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
        }
        else if ((false || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((x + 3),5)))) {
          {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
        }
        else if ((!f)) {
          {((cond) => {if (!cond) throw new Error("assertion failed: !!!f")})((!(!(!f))))};
        }
        else {
          {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
        }
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:test", new $Closure1(this, "$Closure1"));
    if (true) {
      const a = undefined;
      const b = "b";
      const c = "c";
      {
        const $if_let_value = a;
        if ($if_let_value != undefined) {
          const d = $if_let_value;
          {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
        }
        else if (((b) != null)) {
          {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
        }
        else {
          const $elif_let_value1 = c;
          if ($elif_let_value1 != undefined) {
            const e = $elif_let_value1;
            {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
          }
          else {
            {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
          }
        }
      }
    }
    if (true) {
      const a = undefined;
      const b = undefined;
      const c = "c";
      {
        const $if_let_value = a;
        if ($if_let_value != undefined) {
          const d = $if_let_value;
          {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
        }
        else {
          const $elif_let_value0 = c;
          if ($elif_let_value0 != undefined) {
            const e = $elif_let_value0;
            {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
          }
          else if (((b) != null)) {
            {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
          }
          else {
            {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
          }
        }
      }
    }
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "statements_if.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

