# [datetime.test.w](../../../../../../examples/tests/sdk_tests/std/datetime.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $_d4_toUtc____hours, $d4_hours, $d4_timezone, $math_Util, $std_Datetime, $std_Duration, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const d5 = (await $std_Datetime.systemNow());
      const d6 = (await d5.toUtc());
      {((cond) => {if (!cond) throw new Error("assertion failed: d5.timestampMs == d6.timestampMs")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d5.timestampMs,d6.timestampMs)))};
      const d7 = (await $std_Datetime.fromIso("2023-07-18T20:18:25.177-03:00"));
      const d8 = (await $std_Datetime.fromComponents({ year: 2023, month: 6, day: 18, hour: 20, min: 18, sec: 25, ms: 177, tz: 180 }));
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.timestampMs == 1689722305177")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.timestampMs,1689722305177)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.hours == 23")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.hours,23)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.min == 18")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.min,18)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.sec == 25")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.sec,25)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.ms == 177")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.ms,177)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.dayOfMonth == 18")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.dayOfMonth,18)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.dayOfWeek == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.dayOfWeek,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.month == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.month,6)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.year == 2023")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.year,2023)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d8.hours == 20")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d8.hours,20)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.floor(d7.timestamp) == math.floor(d8.timestamp)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.floor(d7.timestamp)),(await $math_Util.floor(d8.timestamp)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d4.toUtc().hours == (d4.hours + (d4.timezone / 60))")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_d4_toUtc____hours,($d4_hours + ($d4_timezone / 60)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d8.toUtc().hours == (d8.hours + (d8.timezone / 60))")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await d8.toUtc()).hours,(d8.hours + (d8.timezone / 60)))))};
      const beforeSleep = (await $std_Datetime.systemNow());
      (await $util_Util.sleep((await $std_Duration.fromSeconds(1))));
      const afterSleep = (await $std_Datetime.systemNow());
      {((cond) => {if (!cond) throw new Error("assertion failed: afterSleep.timestampMs - beforeSleep.timestampMs > 0")})(((afterSleep.timestampMs - beforeSleep.timestampMs) > 0))};
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
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const math = $stdlib.math;
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
            $_d4_toUtc____hours: ${$stdlib.core.liftObject((d4.toUtc()).hours)},
            $d4_hours: ${$stdlib.core.liftObject(d4.hours)},
            $d4_timezone: ${$stdlib.core.liftObject(d4.timezone)},
            $math_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(math.Util, "@winglang/sdk/math", "Util"))},
            $std_Datetime: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Datetime, "@winglang/sdk/std", "Datetime"))},
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
          $Closure1._registerOnLiftObject((d4.toUtc()).hours, host, []);
          $Closure1._registerOnLiftObject(d4.hours, host, []);
          $Closure1._registerOnLiftObject(d4.timezone, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const d1 = (std.Datetime.systemNow());
    const d2 = (d1.toUtc());
    {((cond) => {if (!cond) throw new Error("assertion failed: d1.timestampMs == d2.timestampMs")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d1.timestampMs,d2.timestampMs)))};
    const d3 = (std.Datetime.fromIso("2023-07-18T20:18:25.177+03:00"));
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.timestampMs == 1689700705177")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.timestampMs,1689700705177)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.hours == 17")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.hours,17)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.min == 18")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.min,18)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.sec == 25")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.sec,25)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.ms == 177")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.ms,177)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.dayOfMonth == 18")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.dayOfMonth,18)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.dayOfWeek == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.dayOfWeek,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.month == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.month,6)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.year == 2023")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.year,2023)))};
    const d4 = (std.Datetime.fromComponents({ year: 2023, month: 6, day: 18, hour: 19, min: 18, sec: 25, ms: 177, tz: (-120) }));
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.timezone == -120")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.timezone,(-120))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.timestampMs == 1689700705177")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.timestampMs,1689700705177)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.hours == 19")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.hours,19)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.min == 18")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.min,18)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.sec == 25")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.sec,25)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.ms == 177")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.ms,177)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.dayOfMonth == 18")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.dayOfMonth,18)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.dayOfWeek == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.dayOfWeek,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.month == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.month,6)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.year == 2023")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.year,2023)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.toUtc().hours == (d4.hours + (d4.timezone / 60))")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((d4.toUtc()).hours,(d4.hours + (d4.timezone / 60)))))};
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight datetime", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "datetime.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

