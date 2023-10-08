# [assertions.w](../../../../../examples/tests/valid/assertions.w) | compile | tf-aws

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

## preflight.js
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

