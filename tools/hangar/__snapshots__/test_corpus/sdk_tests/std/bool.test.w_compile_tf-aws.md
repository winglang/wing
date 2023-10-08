# [bool.test.w](../../../../../../examples/tests/sdk_tests/std/bool.test.w) | compile | tf-aws

## inflight.$Closure1-2.js
```js
module.exports = function({ $PARSE_ERROR, $assertions_Assert, $std_Boolean, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const t = (await $std_Boolean.fromJson((JSON.parse("true"))));
      {((cond) => {if (!cond) throw new Error("assertion failed: t == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(t,true)))};
      const f = (await $std_Boolean.fromJson((JSON.parse("false"))));
      {((cond) => {if (!cond) throw new Error("assertion failed: f == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f,false)))};
      (await $assertions_Assert.throws($PARSE_ERROR,async () => {
        (await $std_Boolean.fromJson(123));
      }
      ));
    }
  }
  return $Closure1;
}

```

## inflight.Assert-1.js
```js
module.exports = function({  }) {
  class Assert {
    static async throws(expected, block) {
      let actual = "";
      try {
        (await block());
      }
      catch ($error_e) {
        const e = $error_e.message;
        actual = e;
      }
      if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,""))) {
        throw new Error("expected error, but none thrown.");
      }
      if ((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected))) {
        throw new Error(String.raw({ raw: ["expected error message: \"", "\" got: \"", "\""] }, expected, actual));
      }
    }
    static async equalStr(a, b) {
      try {
        {((cond) => {if (!cond) throw new Error("assertion failed: a == b")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(a,b)))};
      }
      catch ($error_e) {
        const e = $error_e.message;
        throw new Error(String.raw({ raw: ["expected: ", " got: ", ""] }, b, a));
      }
    }
    static async isNil(a) {
      try {
        {((cond) => {if (!cond) throw new Error("assertion failed: a == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(a,undefined)))};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {console.log(e)};
        throw new Error(String.raw({ raw: ["expected '", "' to be nil"] }, a));
      }
    }
    static async equalNum(a, b) {
      try {
        {((cond) => {if (!cond) throw new Error("assertion failed: a == b")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(a,b)))};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {console.log(e)};
        throw new Error(String.raw({ raw: ["expected: ", " got: ", ""] }, b, a));
      }
    }
  }
  return Assert;
}

```

## inflight.PreflightAssert-1.js
```js
module.exports = function({  }) {
  class PreflightAssert {
    constructor({  }) {
    }
  }
  return PreflightAssert;
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

## preflight.assertions-1.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  class Assert extends $stdlib.std.Resource {
    constructor(scope, id, ) {
      super(scope, id);
    }
    static _toInflightType(context) {
      return `
        require("./inflight.Assert-1.js")({
        })
      `;
    }
    _toInflight() {
      return `
        (await (async () => {
          const AssertClient = ${Assert._toInflightType(this)};
          const client = new AssertClient({
          });
          if (client.$inflight_init) { await client.$inflight_init(); }
          return client;
        })())
      `;
    }
    _getInflightOps() {
      return ["throws", "equalStr", "isNil", "equalNum", "$inflight_init"];
    }
  }
  class PreflightAssert extends $stdlib.std.Resource {
    constructor(scope, id, ) {
      super(scope, id);
    }
    static throws(expected, block) {
      let actual = "";
      try {
        (block());
      }
      catch ($error_e) {
        const e = $error_e.message;
        actual = e;
      }
      if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,""))) {
        throw new Error("expected error, but none thrown.");
      }
      if ((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected))) {
        throw new Error(String.raw({ raw: ["expected error message: \"", "\" got: \"", "\""] }, expected, actual));
      }
    }
    static _toInflightType(context) {
      return `
        require("./inflight.PreflightAssert-1.js")({
        })
      `;
    }
    _toInflight() {
      return `
        (await (async () => {
          const PreflightAssertClient = ${PreflightAssert._toInflightType(this)};
          const client = new PreflightAssertClient({
          });
          if (client.$inflight_init) { await client.$inflight_init(); }
          return client;
        })())
      `;
    }
    _getInflightOps() {
      return ["$inflight_init"];
    }
  }
  return { Assert, PreflightAssert };
};

```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const assertions = require("./preflight.assertions-1.js")({ $stdlib });
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-2.js")({
            $PARSE_ERROR: ${context._lift(PARSE_ERROR)},
            $assertions_Assert: ${context._lift($stdlib.core.toLiftableModuleType(assertions.Assert, "", "Assert"))},
            $std_Boolean: ${context._lift($stdlib.core.toLiftableModuleType(std.Boolean, "@winglang/sdk/std", "Boolean"))},
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
          $Closure1._registerBindObject(PARSE_ERROR, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const PARSE_ERROR = "unable to parse bool:\n- instance is not of a type(s) boolean";
    const t = (std.Boolean.fromJson((JSON.parse("true"))));
    {((cond) => {if (!cond) throw new Error("assertion failed: t == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(t,true)))};
    (assertions.PreflightAssert.throws(PARSE_ERROR,(() => {
      (std.Boolean.fromJson(123));
    })));
    const f = (std.Boolean.fromJson((JSON.parse("false"))));
    {((cond) => {if (!cond) throw new Error("assertion failed: f == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f,false)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:fromJson()",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bool.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

