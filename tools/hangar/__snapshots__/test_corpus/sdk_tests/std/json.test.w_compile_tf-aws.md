# [json.test.w](../../../../../../examples/tests/sdk_tests/std/json.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const obj = ({"key1": 1,"key2": 2});
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.has(obj, \"key1\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return args[0].hasOwnProperty(args[1]); })([obj, "key1"]),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.has(obj, \"key3\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return args[0].hasOwnProperty(args[1]); })([obj, "key3"]),false)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure10-1.js
```js
"use strict";
module.exports = function({ $std_Json }) {
  class $Closure10 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const original = ({"string": "wing","number": 123,"array": [1, 2, 3],"true": true,"false": false,"object": ({"key1": "value1","key2": 2,"key3": false,"key5": [3, 2, 1]})});
      const mutation = ({"key1": 1,"key2": 2});
      const copy = JSON.parse(JSON.stringify(original));
      const copyMut = (JSON.parse(JSON.stringify(original)));
      {((cond) => {if (!cond) throw new Error("assertion failed: copy == copyMut")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(copy,copyMut)))};
      ((obj, args) => { obj[args[0]] = args[1]; })(copyMut, ["object", mutation]);
      {((cond) => {if (!cond) throw new Error("assertion failed: copy != copyMut")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })(copy,copyMut)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: copyMut.get(\"object\") == mutation")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(copyMut, "object"),mutation)))};
    }
  }
  return $Closure10;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const assertThrows = async (expected, block) => {
        let error = false;
        try {
          (await block());
        }
        catch ($error_actual) {
          const actual = $error_actual.message;
          {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected)))};
          error = true;
        }
        {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
      }
      ;
      const JSON_PROPERTY_DOES_NOT_EXIST_ERROR = "Json property \"c\" does not exist";
      const obj = ({"a": 1,"b": 2});
      const mutObj = ({"a": 1,"b": 2});
      {((cond) => {if (!cond) throw new Error("assertion failed: obj.get(\"b\") == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(obj, "b"),2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutObj.get(\"b\") == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(mutObj, "b"),2)))};
      (await assertThrows(JSON_PROPERTY_DOES_NOT_EXIST_ERROR, async () => {
        ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(obj, "c");
      }
      ));
      (await assertThrows(JSON_PROPERTY_DOES_NOT_EXIST_ERROR, async () => {
        ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(mutObj, "c");
      }
      ));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const assertThrows = async (expected, block) => {
        let error = false;
        try {
          (await block());
        }
        catch ($error_actual) {
          const actual = $error_actual.message;
          {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected)))};
          error = true;
        }
        {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
      }
      ;
      const INDEX_OUT_OF_BOUNDS_ERROR = "Index out of bounds";
      const jsonArray = ["foo", "bar", "baz"];
      const mutJsonArray = [1, 2, 3];
      {((cond) => {if (!cond) throw new Error("assertion failed: jsonArray.getAt(2) == \"baz\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(jsonArray, 2),"baz")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutJsonArray.getAt(2) == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(mutJsonArray, 2),3)))};
      (await assertThrows(INDEX_OUT_OF_BOUNDS_ERROR, async () => {
        ((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(jsonArray, 3);
        ((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(mutJsonArray, 3);
      }
      ));
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const mutObj = ({"x": 1,"y": 2});
      ((obj, args) => { obj[args[0]] = args[1]; })(mutObj, ["x", (-1)]);
      ((obj, args) => { obj[args[0]] = args[1]; })(mutObj, ["z", 3]);
      {((cond) => {if (!cond) throw new Error("assertion failed: mutObj.get(\"x\") == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(mutObj, "x"),(-1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutObj.get(\"z\") == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(mutObj, "z"),3)))};
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const mutJsonArray = [1, 2, 3];
      ((obj, args) => { obj[args[0]] = args[1]; })(mutJsonArray, [0, (-1)]);
      ((obj, args) => { obj[args[0]] = args[1]; })(mutJsonArray, [3, 3]);
      {((cond) => {if (!cond) throw new Error("assertion failed: mutJsonArray.getAt(0) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(mutJsonArray, 0),(-1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutJsonArray.getAt(3) == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })(mutJsonArray, 3),3)))};
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6-1.js
```js
"use strict";
module.exports = function({ $std_Json }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const obj = ({"a": 1,"b": 2});
      const stringified = ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([obj]);
      const stringifiedIndent = ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([obj, { indent: 2 }]);
      {((cond) => {if (!cond) throw new Error("assertion failed: stringified == \"{\\\"a\\\":1,\\\"b\\\":2}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(stringified,"{\"a\":1,\"b\":2}")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: stringifiedIndent == \"{\\n  \\\"a\\\": 1,\\n  \\\"b\\\": 2\\n}\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(stringifiedIndent,"{\n  \"a\": 1,\n  \"b\": 2\n}")))};
    }
  }
  return $Closure6;
}

```

## inflight.$Closure7-1.js
```js
"use strict";
module.exports = function({ $std_Json }) {
  class $Closure7 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const obj = ({"a": 1,"b": [3, 7, 9],"c": ({"foo": "bar"})});
      const entries = (await $std_Json.entries(obj));
      const keys = (Object.keys(obj));
      const values = (Object.values(obj));
      let i = 0;
      for (const e of entries) {
        {((cond) => {if (!cond) throw new Error("assertion failed: e.key == keys.at(i)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(e.key,(await keys.at(i)))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: e.value == values.at(i)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(e.value,(await values.at(i)))))};
        i += 1;
      }
    }
  }
  return $Closure7;
}

```

## inflight.$Closure8-1.js
```js
"use strict";
module.exports = function({ $std_Json }) {
  class $Closure8 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const obj = ({"key1": 1,"key2": 2});
      const String = "{\"key\":1,\"key2\":2}";
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.parse(\"123\") == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((JSON.parse("123")),123)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.parse(\"true\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((JSON.parse("true")),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.parse(\"\\\"foo\\\"\") == \"foo\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((JSON.parse("\"foo\"")),"foo")))};
    }
  }
  return $Closure8;
}

```

## inflight.$Closure9-1.js
```js
"use strict";
module.exports = function({ $std_Json }) {
  class $Closure9 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const obj = ({"key1": 1,"key2": 2});
      const String = "{\"key\":1,\"key2\":2}";
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(\"123\") == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })("123"),123)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(\"true\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })("true"),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(\"\\\"foo\\\"\") == \"foo\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })("\"foo\""),"foo")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(\"foo\") == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })("foo"),undefined)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(\"\") == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })(""),undefined)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(nil) == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })(undefined),undefined)))};
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
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
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
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
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
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
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
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
      constructor($scope, $id, ) {
        super($scope, $id);
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
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure6-1.js")({
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure7-1.js")({
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure8-1.js")({
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure9-1.js")({
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure10-1.js")({
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:has()", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:get()", new $Closure2(this, "$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:getAt()", new $Closure3(this, "$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:set()", new $Closure4(this, "$Closure4"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:setAt()", new $Closure5(this, "$Closure5"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:stringify()", new $Closure6(this, "$Closure6"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:keys(), values(), entries()", new $Closure7(this, "$Closure7"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:parse()", new $Closure8(this, "$Closure8"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:tryParse()", new $Closure9(this, "$Closure9"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:deepCopy(), deepCopyMut()", new $Closure10(this, "$Closure10"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "json.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

