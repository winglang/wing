# [assert.test.w](../../../../../examples/tests/valid/assert.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $s1, $s2 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\" == \"\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("","")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\'\" == \"\'\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("'","'")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\\\"\" == \"\\\"\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("\"","\"")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"`\" == \"`\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("`","`")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"``\" == \"``\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("``","``")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"`s1`\" == \"`s1`\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("`s1`","`s1`")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: s1 == s1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($s1,$s1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}\" == \"${s1}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["", ""] }, $s1),String.raw({ raw: ["", ""] }, $s1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}\" != \"${s2}\"")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["", ""] }, $s1),String.raw({ raw: ["", ""] }, $s2))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}\" == \"a${s1}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["a", ""] }, $s1),String.raw({ raw: ["a", ""] }, $s1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}\" != \"b${s1}\"")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["a", ""] }, $s1),String.raw({ raw: ["b", ""] }, $s1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}a\" == \"${s1}a\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["", "a"] }, $s1),String.raw({ raw: ["", "a"] }, $s1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}a\" != \"${s1}b\"")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["", "a"] }, $s1),String.raw({ raw: ["", "b"] }, $s1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"`\'${s1}\" == \"`\'${s1}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["`'", ""] }, $s1),String.raw({ raw: ["`'", ""] }, $s1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}b${s2}c\" == \"a${s1}b${s2}c\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["a", "b", "c"] }, $s1, $s2),String.raw({ raw: ["a", "b", "c"] }, $s1, $s2))))};
    }
  }
  return $Closure1;
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
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $s1: ${context._lift(s1)},
            $s2: ${context._lift(s2)},
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
          $Closure1._registerOnLiftObject(s1, host, []);
          $Closure1._registerOnLiftObject(s2, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const s1 = "foo";
    const s2 = "bar";
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\" == \"\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("","")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\'\" == \"\'\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("'","'")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\\\"\" == \"\\\"\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("\"","\"")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"`\" == \"`\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("`","`")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"``\" == \"``\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("``","``")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"`s1`\" == \"`s1`\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("`s1`","`s1`")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1 == s1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s1,s1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}\" == \"${s1}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["", ""] }, s1),String.raw({ raw: ["", ""] }, s1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}\" != \"${s2}\"")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["", ""] }, s1),String.raw({ raw: ["", ""] }, s2))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}\" == \"a${s1}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["a", ""] }, s1),String.raw({ raw: ["a", ""] }, s1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}\" != \"b${s1}\"")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["a", ""] }, s1),String.raw({ raw: ["b", ""] }, s1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}a\" == \"${s1}a\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["", "a"] }, s1),String.raw({ raw: ["", "a"] }, s1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"${s1}a\" != \"${s1}b\"")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["", "a"] }, s1),String.raw({ raw: ["", "b"] }, s1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"`\'${s1}\" == \"`\'${s1}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["`'", ""] }, s1),String.raw({ raw: ["`'", ""] }, s1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"a${s1}b${s2}c\" == \"a${s1}b${s2}c\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["a", "b", "c"] }, s1, s2),String.raw({ raw: ["a", "b", "c"] }, s1, s2))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:assert works inflight", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "assert.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

