# [string.test.w](../../../../../../examples/tests/sdk_tests/std/string.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $PARSE_ERROR, $std_String }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: str.fromJson(Json \"World\") == \"World\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_String.fromJson("World")),"World")))};
      try {
        (await $std_String.fromJson(123));
      }
      catch ($error_s) {
        const s = $error_s.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: s.contains(PARSE_ERROR)")})(s.includes($PARSE_ERROR))};
      }
    }
  }
  return $Closure1;
}

```

## inflight.$Closure10-1.js
```js
module.exports = function({  }) {
  class $Closure10 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".startsWith(\"h\")")})("hello wing".startsWith("h"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".startsWith(\"H\")")})((!"hello wing".startsWith("H")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".startsWith(\"w\")")})((!"hello wing".startsWith("w")))};
    }
  }
  return $Closure10;
}

```

## inflight.$Closure11-1.js
```js
module.exports = function({  }) {
  class $Closure11 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".substring(0, 5) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "hello wing".substring(0,5)),"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".substring(0, 100) == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "hello wing".substring(0,100)),"hello wing")))};
    }
  }
  return $Closure11;
}

```

## inflight.$Closure12-1.js
```js
module.exports = function({  }) {
  class $Closure12 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing         \".trim() == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "hello wing         ".trim()),"hello wing")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".trim() == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "hello wing".trim()),"hello wing")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\".trim() == \"\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "".trim()),"")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\\thello wing\\n\".trim() == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "\thello wing\n".trim()),"hello wing")))};
    }
  }
  return $Closure12;
}

```

## inflight.$Closure13-1.js
```js
module.exports = function({  }) {
  class $Closure13 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".contains(\"hello\")")})("hello wing".includes("hello"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".contains(\"Hello\")")})((!"hello wing".includes("Hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".contains(\"w\")")})("hello wing".includes("w"))};
    }
  }
  return $Closure13;
}

```

## inflight.$Closure14-1.js
```js
module.exports = function({  }) {
  class $Closure14 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello world\".replace(\"world\", \"wing\") == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello world".replace("world","wing"),"hello wing")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"pʅɹoʍ oʅʅǝɥ\".replace(\"pʅɹoʍ\", \"ɓuᴉʍ\") == \"ɓuᴉʍ oʅʅǝɥ\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("pʅɹoʍ oʅʅǝɥ".replace("pʅɹoʍ","ɓuᴉʍ"),"ɓuᴉʍ oʅʅǝɥ")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello world\".replace(\"wing\", \"☁\") == \"hello world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello world".replace("wing","☁"),"hello world")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello world\".replace(\" \", \"-\") == \"hello-world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello world".replace(" ","-"),"hello-world")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\".replace(\"\", \"hello world\") == \"hello world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("".replace("","hello world"),"hello world")))};
    }
  }
  return $Closure14;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({  }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello\".length == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello".length,5)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\".length == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("".length,0)))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
module.exports = function({ $INDEX_OUT_OF_BOUNDS_ERROR }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(0) == \"b\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (0 >= "boom".length || 0 + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at(0) })(0),"b")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(-4) == \"b\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if ((-4) >= "boom".length || (-4) + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at((-4)) })((-4)),"b")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(-1) == \"m\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if ((-1) >= "boom".length || (-1) + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at((-1)) })((-1)),"m")))};
      try {
        ((args) => { if (4 >= "boom".length || 4 + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at(4) })(4);
      }
      catch ($error_s) {
        const s = $error_s.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: s == INDEX_OUT_OF_BOUNDS_ERROR ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,$INDEX_OUT_OF_BOUNDS_ERROR)))};
      }
      try {
        ((args) => { if ((-5) >= "boom".length || (-5) + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at((-5)) })((-5));
      }
      catch ($error_s) {
        const s = $error_s.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: s == INDEX_OUT_OF_BOUNDS_ERROR ")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,$INDEX_OUT_OF_BOUNDS_ERROR)))};
      }
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
module.exports = function({  }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".concat(\"boom\") == \"boomboom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "boom".concat("boom")),"boomboom")))};
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-1.js
```js
module.exports = function({  }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".endsWith(\"m\")")})("boom".endsWith("m"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !\"boom\".endsWith(\"b\")")})((!"boom".endsWith("b")))};
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6-1.js
```js
module.exports = function({  }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".indexOf(\"m\") == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".indexOf("m"),3)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".indexOf(\"a\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".indexOf("a"),(-1))))};
    }
  }
  return $Closure6;
}

```

## inflight.$Closure7-1.js
```js
module.exports = function({  }) {
  class $Closure7 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"BOOM\".lowercase() == \"boom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BOOM".toLocaleLowerCase(),"boom")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"BooM\".lowercase() == \"boom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BooM".toLocaleLowerCase(),"boom")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".lowercase() == \"boom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".toLocaleLowerCase(),"boom")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"123#@\".lowercase() == \"123#@\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("123#@".toLocaleLowerCase(),"123#@")))};
    }
  }
  return $Closure7;
}

```

## inflight.$Closure8-1.js
```js
module.exports = function({  }) {
  class $Closure8 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"BOOM\".uppercase() == \"BOOM\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BOOM".toLocaleUpperCase(),"BOOM")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"BooM\".uppercase() == \"BOOM\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BooM".toLocaleUpperCase(),"BOOM")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".uppercase() == \"BOOM\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".toLocaleUpperCase(),"BOOM")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"123#@\".uppercase() == \"123#@\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("123#@".toLocaleUpperCase(),"123#@")))};
    }
  }
  return $Closure8;
}

```

## inflight.$Closure9-1.js
```js
module.exports = function({  }) {
  class $Closure9 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await "hello;wing".split(";")).at(0)),"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(1) == \"wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await "hello;wing".split(";")).at(1)),"wing")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\" \").at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await "hello wing".split(" ")).at(0)),"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(1) == \"wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await "hello;wing".split(";")).at(1)),"wing")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").length == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await "hello wing".split("")).length,10)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").at(0) == \"h\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await "hello wing".split("")).at(0)),"h")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").at(1) == \"e\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await "hello wing".split("")).at(1)),"e")))};
    }
  }
  return $Closure9;
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
          require("./inflight.$Closure1-1.js")({
            $PARSE_ERROR: ${context._lift(PARSE_ERROR)},
            $std_String: ${context._lift($stdlib.core.toLiftableModuleType(std.String, "@winglang/sdk/std", "String"))},
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
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
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
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
            $INDEX_OUT_OF_BOUNDS_ERROR: ${context._lift(INDEX_OUT_OF_BOUNDS_ERROR)},
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
          $Closure3._registerBindObject(INDEX_OUT_OF_BOUNDS_ERROR, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.js")({
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
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure5-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType(this)};
            const client = new $Closure5Client({
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
    class $Closure6 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure6-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure6Client = ${$Closure6._toInflightType(this)};
            const client = new $Closure6Client({
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
    class $Closure7 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure7-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure7Client = ${$Closure7._toInflightType(this)};
            const client = new $Closure7Client({
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
    class $Closure8 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure8-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure8Client = ${$Closure8._toInflightType(this)};
            const client = new $Closure8Client({
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
    class $Closure9 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure9-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure9Client = ${$Closure9._toInflightType(this)};
            const client = new $Closure9Client({
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
    class $Closure10 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure10-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure10Client = ${$Closure10._toInflightType(this)};
            const client = new $Closure10Client({
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
    class $Closure11 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure11-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure11Client = ${$Closure11._toInflightType(this)};
            const client = new $Closure11Client({
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
    class $Closure12 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure12-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure12Client = ${$Closure12._toInflightType(this)};
            const client = new $Closure12Client({
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
    class $Closure13 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure13-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure13Client = ${$Closure13._toInflightType(this)};
            const client = new $Closure13Client({
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
    class $Closure14 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure14-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure14Client = ${$Closure14._toInflightType(this)};
            const client = new $Closure14Client({
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
    const assertThrows = ((expected, block) => {
      let error = false;
      try {
        (block());
      }
      catch ($error_actual) {
        const actual = $error_actual.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: actual.contains(expected) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual.includes(expected),true)))};
        error = true;
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
    });
    const PARSE_ERROR = "unable to parse string";
    {((cond) => {if (!cond) throw new Error("assertion failed: str.fromJson(Json \"Hello\") == \"Hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.String.fromJson("Hello")),"Hello")))};
    (assertThrows(PARSE_ERROR,(() => {
      (std.String.fromJson(123));
    })));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:fromJson",new $Closure1(this,"$Closure1"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello\".length == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello".length,5)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\".length == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("".length,0)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:length",new $Closure2(this,"$Closure2"));
    const INDEX_OUT_OF_BOUNDS_ERROR = "index out of bounds";
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(2) == \"o\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (2 >= "boom".length || 2 + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at(2) })(2),"o")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(-4) == \"b\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if ((-4) >= "boom".length || (-4) + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at((-4)) })((-4)),"b")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(-1) == \"m\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if ((-1) >= "boom".length || (-1) + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at((-1)) })((-1)),"m")))};
    (assertThrows(INDEX_OUT_OF_BOUNDS_ERROR,(() => {
      ((args) => { if (4 >= "boom".length || 4 + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at(4) })(4);
    })));
    (assertThrows(INDEX_OUT_OF_BOUNDS_ERROR,(() => {
      ((args) => { if ((-5) >= "boom".length || (-5) + "boom".length < 0) {throw new Error("index out of bounds")}; return "boom".at((-5)) })((-5));
    })));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:at()",new $Closure3(this,"$Closure3"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".concat(\"boom\") == \"boomboom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("boom".concat("boom")),"boomboom")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:concat()",new $Closure4(this,"$Closure4"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".endsWith(\"m\")")})("boom".endsWith("m"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !\"boom\".endsWith(\"b\")")})((!"boom".endsWith("b")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:endsWith()",new $Closure5(this,"$Closure5"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".indexOf(\"m\") == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".indexOf("m"),3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".indexOf(\"a\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".indexOf("a"),(-1))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:indexOf()",new $Closure6(this,"$Closure6"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"BOOM\".lowercase() == \"boom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BOOM".toLocaleLowerCase(),"boom")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"BooM\".lowercase() == \"boom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BooM".toLocaleLowerCase(),"boom")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".lowercase() == \"boom\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".toLocaleLowerCase(),"boom")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"123#@\".lowercase() == \"123#@\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("123#@".toLocaleLowerCase(),"123#@")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:lowercase()",new $Closure7(this,"$Closure7"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"BOOM\".uppercase() == \"BOOM\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BOOM".toLocaleUpperCase(),"BOOM")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"BooM\".uppercase() == \"BOOM\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("BooM".toLocaleUpperCase(),"BOOM")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".uppercase() == \"BOOM\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("boom".toLocaleUpperCase(),"BOOM")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"123#@\".uppercase() == \"123#@\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("123#@".toLocaleUpperCase(),"123#@")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:uppercase()",new $Closure8(this,"$Closure8"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((("hello;wing".split(";")).at(0)),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(1) == \"wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((("hello;wing".split(";")).at(1)),"wing")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\" \").at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((("hello wing".split(" ")).at(0)),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello;wing\".split(\";\").at(1) == \"wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((("hello;wing".split(";")).at(1)),"wing")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").length == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("hello wing".split("")).length,10)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").at(0) == \"h\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((("hello wing".split("")).at(0)),"h")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".split(\"\").at(1) == \"e\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((("hello wing".split("")).at(1)),"e")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:split()",new $Closure9(this,"$Closure9"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".startsWith(\"h\")")})("hello wing".startsWith("h"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".startsWith(\"H\")")})((!"hello wing".startsWith("H")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".startsWith(\"w\")")})((!"hello wing".startsWith("w")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:startsWith()",new $Closure10(this,"$Closure10"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".substring(0, 5) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("hello wing".substring(0,5)),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".substring(0, 100) == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("hello wing".substring(0,100)),"hello wing")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:substring()",new $Closure11(this,"$Closure11"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing         \".trim() == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("hello wing         ".trim()),"hello wing")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".trim() == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("hello wing".trim()),"hello wing")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\".trim() == \"\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("".trim()),"")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\\thello wing\\n\".trim() == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("\thello wing\n".trim()),"hello wing")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:trim()",new $Closure12(this,"$Closure12"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".contains(\"hello\")")})("hello wing".includes("hello"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !\"hello wing\".contains(\"Hello\")")})((!"hello wing".includes("Hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello wing\".contains(\"w\")")})("hello wing".includes("w"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:contains()",new $Closure13(this,"$Closure13"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello world\".replace(\"world\", \"wing\") == \"hello wing\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello world".replace("world","wing"),"hello wing")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"pʅɹoʍ oʅʅǝɥ\".replace(\"pʅɹoʍ\", \"ɓuᴉʍ\") == \"ɓuᴉʍ oʅʅǝɥ\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("pʅɹoʍ oʅʅǝɥ".replace("pʅɹoʍ","ɓuᴉʍ"),"ɓuᴉʍ oʅʅǝɥ")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello world\".replace(\"wing\", \"☁\") == \"hello world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello world".replace("wing","☁"),"hello world")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello world\".replace(\" \", \"-\") == \"hello-world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hello world".replace(" ","-"),"hello-world")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\".replace(\"\", \"hello world\") == \"hello world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("".replace("","hello world"),"hello world")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:replace()",new $Closure14(this,"$Closure14"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "string.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

