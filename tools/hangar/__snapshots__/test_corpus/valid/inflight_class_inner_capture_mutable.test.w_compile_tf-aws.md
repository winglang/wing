# [inflight_class_inner_capture_mutable.test.w](../../../../../examples/tests/valid/inflight_class_inner_capture_mutable.test.w) | compile | tf-aws

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
      const y = [1];
      let i = 10;
      class Inner {
        async dang() {
          ((obj, args) => { obj.push(...args); })(y, [2]);
          i = (i + 1);
          return (((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(y, 0) + 10);
        }
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: new Inner().dang() == 11")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await (async () => {const o = new Inner(); await o.$inflight_init?.(); return o; })()).dang()),11)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: y.at(1) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(y, 1),2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: i == 11")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(i,11)))};
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
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inner inflight class capture immutable", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_class_inner_capture_mutable.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

