# [url.test.w](../../../../../../examples/tests/sdk_tests/http/url.test.w) | compile | tf-aws

## inflight.$Closure1-2.js
```js
module.exports = function({ $assertions_Assert, $http_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const INVALID_URL_STRING = "hello world";
      const INVALID_URL_ERROR = String.raw({ raw: ["Invalid URL: ", ""] }, INVALID_URL_STRING);
      const URL_STRING = "http://username:password@www.example.com:3000/pathname?search=test#hash";
      const urlStruct = ({"href": URL_STRING,"protocol": "http:","host": "www.example.com:3000","hostname": "www.example.com","port": "3000","pathname": "/pathname","search": "?search=test","hash": "#hash","origin": "http://www.example.com:3000","username": "username","password": "password"});
      const parsedUrlStruct = (await $http_Util.parseUrl(URL_STRING));
      {((cond) => {if (!cond) throw new Error("assertion failed: urlStruct == parsedUrlStruct")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(urlStruct,parsedUrlStruct)))};
      (await $assertions_Assert.throws(INVALID_URL_ERROR,async () => {
        const invalidUrlStruct = (await $http_Util.parseUrl(INVALID_URL_STRING));
      }
      ));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-2.js
```js
module.exports = function({ $assertions_Assert, $http_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const UNABLE_TO_FORMAT_URL_STRUCT_ERROR = "Unable to format URL Struct: Invalid URL";
      const urlStruct = (await $http_Util.parseUrl("https://a:b@測試.com/path?query=1#fragment"));
      {((cond) => {if (!cond) throw new Error("assertion failed: http.formatUrl(urlStruct, { unicode: false }) == \"https://a:b@xn--g6w251d.com/path?query=1#fragment\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.formatUrl(urlStruct,({"unicode": false}))),"https://a:b@xn--g6w251d.com/path?query=1#fragment")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: http.formatUrl(urlStruct, { unicode: true }) == \"https://a:b@測試.com/path?query=1#fragment\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.formatUrl(urlStruct,({"unicode": true}))),"https://a:b@測試.com/path?query=1#fragment")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: http.formatUrl(urlStruct, { fragment: false }) == \"https://a:b@xn--g6w251d.com/path?query=1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.formatUrl(urlStruct,({"fragment": false}))),"https://a:b@xn--g6w251d.com/path?query=1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: http.formatUrl(urlStruct, { fragment: true }) == \"https://a:b@xn--g6w251d.com/path?query=1#fragment\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.formatUrl(urlStruct,({"fragment": true}))),"https://a:b@xn--g6w251d.com/path?query=1#fragment")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: http.formatUrl(urlStruct, { search: false }) == \"https://a:b@xn--g6w251d.com/path#fragment\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.formatUrl(urlStruct,({"search": false}))),"https://a:b@xn--g6w251d.com/path#fragment")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: http.formatUrl(urlStruct, { search: true }) == \"https://a:b@xn--g6w251d.com/path?query=1#fragment\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.formatUrl(urlStruct,({"search": true}))),"https://a:b@xn--g6w251d.com/path?query=1#fragment")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: http.formatUrl(urlStruct, { auth: false }) == \"https://xn--g6w251d.com/path?query=1#fragment\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.formatUrl(urlStruct,({"auth": false}))),"https://xn--g6w251d.com/path?query=1#fragment")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: http.formatUrl(urlStruct, { auth: true }) == \"https://a:b@xn--g6w251d.com/path?query=1#fragment\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.formatUrl(urlStruct,({"auth": true}))),"https://a:b@xn--g6w251d.com/path?query=1#fragment")))};
      const invalidUrlStruct = ({"href": "hello world","protocol": urlStruct.protocol,"host": urlStruct.host,"hostname": urlStruct.hostname,"port": urlStruct.hostname,"pathname": urlStruct.pathname,"search": urlStruct.search,"hash": urlStruct.hash,"origin": urlStruct.origin,"username": urlStruct.username,"password": urlStruct.password});
      (await $assertions_Assert.throws(UNABLE_TO_FORMAT_URL_STRUCT_ERROR,async () => {
        (await $http_Util.formatUrl(invalidUrlStruct));
      }
      ));
    }
  }
  return $Closure2;
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
const http = $stdlib.http;
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
            $assertions_Assert: ${context._lift($stdlib.core.toLiftableModuleType(assertions.Assert, "", "Assert"))},
            $http_Util: ${context._lift($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
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
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-2.js")({
            $assertions_Assert: ${context._lift($stdlib.core.toLiftableModuleType(assertions.Assert, "", "Assert"))},
            $http_Util: ${context._lift($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
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
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:parseUrl()",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:formatUrl()",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "url.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

