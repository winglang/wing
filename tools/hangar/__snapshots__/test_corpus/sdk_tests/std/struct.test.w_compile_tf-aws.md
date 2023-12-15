# [struct.test.w](../../../../../../examples/tests/sdk_tests/std/struct.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(expected, block) {
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
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $Person, $expect_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jsonString = "{\"name\": \"Billy\", \"age\": 25}";
      const person = ((json) => ($Person._fromJson(JSON.parse(json))))(jsonString);
      (await $expect_Util.equal(person.name, "Billy"));
      (await $expect_Util.equal(person.age, 25));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
module.exports = function({ $Person, $expect_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jsonString = "{\"name\": \"Billy\", \"age\": 25}";
      const person = ((json) => ($Person._tryParseJson(json)))(jsonString);
      {
        const $if_let_value = person;
        if ($if_let_value != undefined) {
          const person = $if_let_value;
          (await $expect_Util.equal(person.name, "Billy"));
          (await $expect_Util.equal(person.age, 25));
        }
        else {
          {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
        }
      }
      const jsonStringMaybe = undefined;
      const notPerson = ((json) => ($Person._tryParseJson(json)))(jsonStringMaybe);
      {
        const $if_let_value = notPerson;
        if ($if_let_value != undefined) {
          const person = $if_let_value;
          {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
        }
      }
    }
  }
  return $Closure3;
}
//# sourceMappingURL=./inflight.$Closure3-1.cjs.map
```

## inflight.$Closure4-1.cjs
```cjs
"use strict";
module.exports = function({ $Person, $assertThrows }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jsonString = "{\"name\": \"Billy\", \"age\": false}";
      (await $assertThrows("unable to parse Person:\n- instance.age is not of a type(s) number", async () => {
        ((json) => ($Person._fromJson(JSON.parse(json))))(jsonString);
      }));
    }
  }
  return $Closure4;
}
//# sourceMappingURL=./inflight.$Closure4-1.cjs.map
```

## inflight.$Closure5-1.cjs
```cjs
"use strict";
module.exports = function({ $Person }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jsonString = "{\"name\": \"Billy\", \"age\": false}";
      {
        const $if_let_value = ((json) => ($Person._tryParseJson(json)))(jsonString);
        if ($if_let_value != undefined) {
          const person = $if_let_value;
          {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
        }
      }
    }
  }
  return $Closure5;
}
//# sourceMappingURL=./inflight.$Closure5-1.cjs.map
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
const expect = $stdlib.expect;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const Person = $stdlib.std.Struct._createJsonSchema({id:"/Person",type:"object",properties:{age:{type:"number"},name:{type:"string"},},required:["age","name",]});
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure1-1.cjs")({
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
    class $Closure2 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure2-1.cjs")({
            $Person: ${$stdlib.core.liftObject(Person)},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure3-1.cjs")({
            $Person: ${$stdlib.core.liftObject(Person)},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure4-1.cjs")({
            $Person: ${$stdlib.core.liftObject(Person)},
            $assertThrows: ${$stdlib.core.liftObject(assertThrows)},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure4._registerOnLiftObject(assertThrows, host, ["handle"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure5-1.cjs")({
            $Person: ${$stdlib.core.liftObject(Person)},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
    }
    const assertThrows = new $Closure1(this, "$Closure1");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:parseJson()", new $Closure2(this, "$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:tryParseJson()", new $Closure3(this, "$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:invalid parseJson()", new $Closure4(this, "$Closure4"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:invalid tryParseJson()", new $Closure5(this, "$Closure5"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "struct.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

