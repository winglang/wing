# [env.test.w](../../../../../../examples/tests/sdk_tests/util/env.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $NOT_ACTUAL_ENV, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: util.env(\"WING_TARGET\").length > 0")})(((await $util_Util.env("WING_TARGET")).length > 0))};
      const noValue = (await $util_Util.tryEnv($NOT_ACTUAL_ENV));
      {((cond) => {if (!cond) throw new Error("assertion failed: noValue == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(noValue,undefined)))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
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
const util = $stdlib.util;
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
          require("././inflight.$Closure1-1.cjs")({
            $NOT_ACTUAL_ENV: ${$stdlib.core.liftObject(NOT_ACTUAL_ENV)},
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
          $Closure1._registerOnLiftObject(NOT_ACTUAL_ENV, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const NOT_ACTUAL_ENV = "__NOT_ACTUAL_ENV_SHOULD_FAIL__";
    {((cond) => {if (!cond) throw new Error("assertion failed: util.env(\"PATH\").length > 0")})(((util.Util.env("PATH")).length > 0))};
    {((cond) => {if (!cond) throw new Error("assertion failed: util.env(\"APP_NAME\") == \"foo\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("APP_NAME")),"foo")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: util.env(\"BASE_URL\") == \"https://www.winglang.io\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("BASE_URL")),"https://www.winglang.io")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: util.env(\"API_BASE_URL\") == \"https://www.winglang.io/api\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("API_BASE_URL")),"https://www.winglang.io/api")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: util.env(\"DB_NAME\") == \"foo_db\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("DB_NAME")),"foo_db")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: util.env(\"MAIL_DOMAIN\") == \"mail.foo.com\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("MAIL_DOMAIN")),"mail.foo.com")))};
    try {
      (util.Util.env(NOT_ACTUAL_ENV));
      {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
    }
    catch {
    }
    const no_value = (util.Util.tryEnv(NOT_ACTUAL_ENV));
    {((cond) => {if (!cond) throw new Error("assertion failed: no_value == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(no_value,undefined)))};
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:use util from inflight", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "env.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

