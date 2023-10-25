# [optionals.test.w](../../../../../examples/tests/valid/optionals.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $__payloadWithBucket_c_____null_, $__payloadWithoutOptions_b_____null_, $payloadWithBucket_c }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: payloadWithoutOptions.b? == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($__payloadWithoutOptions_b_____null_,false)))};
      if ($__payloadWithBucket_c_____null_) {
        (await $payloadWithBucket_c?.put?.("x.txt", "something"));
      }
    }
  }
  return $Closure1;
}

```

## inflight.Node-1.js
```js
"use strict";
module.exports = function({  }) {
  class Node {
    constructor({  }) {
    }
  }
  return Node;
}

```

## inflight.Sub-1.js
```js
"use strict";
module.exports = function({ $Super }) {
  class Sub extends $Super {
    constructor({  }) {
      super({  });
    }
  }
  return Sub;
}

```

## inflight.Sub1-1.js
```js
"use strict";
module.exports = function({ $Super }) {
  class Sub1 extends $Super {
    constructor({  }) {
      super({  });
    }
  }
  return Sub1;
}

```

## inflight.Super-1.js
```js
"use strict";
module.exports = function({  }) {
  class Super {
    constructor({  }) {
    }
  }
  return Super;
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
  },
  "resource": {
    "aws_s3_bucket": {
      "orangebucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/orange bucket/Default",
            "uniqueId": "orangebucket"
          }
        },
        "bucket_prefix": "orange-bucket-c8ecc927-",
        "force_destroy": false
      }
    }
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
    class Super extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.name = "Super";
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Super-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const SuperClient = ${Super._toInflightType(this)};
            const client = new SuperClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    class Sub extends Super {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.name = "Sub";
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Sub-1.js")({
            $Super: ${context._lift(Super)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const SubClient = ${Sub._toInflightType(this)};
            const client = new SubClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    class Sub1 extends Super {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.name = "Sub";
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Sub1-1.js")({
            $Super: ${context._lift(Super)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const Sub1Client = ${Sub1._toInflightType(this)};
            const client = new Sub1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    class Node extends $stdlib.std.Resource {
      constructor($scope, $id, value, left, right) {
        super($scope, $id);
        this.value = value;
        this.left = left;
        this.right = right;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Node-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const NodeClient = ${Node._toInflightType(this)};
            const client = new NodeClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $__payloadWithBucket_c_____null_: ${context._lift(((payloadWithBucket.c) != null))},
            $__payloadWithoutOptions_b_____null_: ${context._lift(((payloadWithoutOptions.b) != null))},
            $payloadWithBucket_c: ${context._lift(payloadWithBucket.c)},
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
          $Closure1._registerOnLiftObject(((payloadWithBucket.c) != null), host, []);
          $Closure1._registerOnLiftObject(((payloadWithoutOptions.b) != null), host, []);
          $Closure1._registerOnLiftObject(payloadWithBucket.c, host, ["put"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const x = 4;
    {((cond) => {if (!cond) throw new Error("assertion failed: x? == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((x) != null),true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !x? == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((!((x) != null)),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: x ?? 5 == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((x ?? 5),4)))};
    const y = (x ?? 5);
    {((cond) => {if (!cond) throw new Error("assertion failed: y == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y,4)))};
    const optionalSup = new Super(this, "Super");
    const s = (optionalSup ?? new Sub(this, "Sub"));
    {((cond) => {if (!cond) throw new Error("assertion failed: s.name == \"Super\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s.name,"Super")))};
    let name = ({"first": "John","last": "Doe"});
    {
      const $if_let_value = name;
      if ($if_let_value != undefined) {
        const n = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: n.first == \"John\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(n.first,"John")))};
      }
    }
    name = undefined;
    {
      const $if_let_value = name;
      if ($if_let_value != undefined) {
        const n = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
      }
    }
    const tryParseName = ((fullName) => {
      const parts = (fullName.split(" "));
      if ((parts.length < 1)) {
        return undefined;
      }
      return ({"first": (parts.at(0)),"last": (parts.at(1))});
    });
    const json_obj = ({"ghost": "spooky"});
    let something_else = false;
    {
      const $if_let_value = ((arg) => { return (typeof arg === "boolean") ? JSON.parse(JSON.stringify(arg)) : undefined })(json_obj);
      if ($if_let_value != undefined) {
        const y = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: y == true || y == false")})(((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y,true)) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y,false))))};
      }
      else {
        const $elif_let_value0 = ((arg) => { return (typeof arg === "number") ? JSON.parse(JSON.stringify(arg)) : undefined })(json_obj);
        if ($elif_let_value0 != undefined) {
          const y = $elif_let_value0;
          {((cond) => {if (!cond) throw new Error("assertion failed: y + 0 == y")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((y + 0),y)))};
        }
        else {
          const $elif_let_value1 = ((arg) => { return (typeof arg === "string") ? JSON.parse(JSON.stringify(arg)) : undefined })(json_obj);
          if ($elif_let_value1 != undefined) {
            const y = $elif_let_value1;
            {((cond) => {if (!cond) throw new Error("assertion failed: y.length >= 0")})((y.length >= 0))};
          }
          else {
            something_else = true;
          }
        }
      }
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: something_else")})(something_else)};
    const a = 1;
    {
      const $if_let_value = a;
      if ($if_let_value != undefined) {
        let z = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: z == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(z,1)))};
        z = 2;
        {((cond) => {if (!cond) throw new Error("assertion failed: z == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(z,2)))};
      }
    }
    const b = 1;
    {
      const $if_let_value = b;
      if ($if_let_value != undefined) {
        const z = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: z == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(z,1)))};
      }
    }
    {
      const $if_let_value = (tryParseName("Good Name"));
      if ($if_let_value != undefined) {
        const parsedName = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: parsedName.first == \"Good\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(parsedName.first,"Good")))};
        {
          const $if_let_value = parsedName.last;
          if ($if_let_value != undefined) {
            const lastName = $if_let_value;
            {((cond) => {if (!cond) throw new Error("assertion failed: lastName == \"Name\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(lastName,"Name")))};
          }
          else {
            {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
          }
        }
      }
    }
    {
      const $if_let_value = (tryParseName("BadName"));
      if ($if_let_value != undefined) {
        const parsedName = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: parsedName.first == \"BadName\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(parsedName.first,"BadName")))};
        {
          const $if_let_value = parsedName.last;
          if ($if_let_value != undefined) {
            const lastName = $if_let_value;
            {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
          }
        }
      }
    }
    const falsy = false;
    {
      const $if_let_value = falsy;
      if ($if_let_value != undefined) {
        const f = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: f == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f,false)))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    const shadow = "root";
    {
      const $if_let_value = shadow;
      if ($if_let_value != undefined) {
        const shadow = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: shadow == \"root\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(shadow,"root")))};
        const shadow1 = "nested";
        {
          const $if_let_value = shadow1;
          if ($if_let_value != undefined) {
            const shadow1 = $if_let_value;
            {((cond) => {if (!cond) throw new Error("assertion failed: shadow1 == \"nested\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(shadow1,"nested")))};
          }
          else {
            {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
          }
        }
      }
    }
    const fun = ((a) => {
      {
        const $if_let_value = a;
        if ($if_let_value != undefined) {
          const y = $if_let_value;
          return y;
        }
        else {
          return "default";
        }
      }
    });
    {((cond) => {if (!cond) throw new Error("assertion failed: fun(\"hello\") == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fun("hello")),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: fun(nil) == \"default\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fun(undefined)),"default")))};
    const tree = new Node(this, "eight", 8, new Node(this, "three", 3, new Node(this, "one", 1, undefined, undefined), new Node(this, "six", 6, undefined, undefined)), new Node(this, "ten", 10, undefined, new Node(this, "fourteen", 14, new Node(this, "thirteen", 13, undefined, undefined), undefined)));
    const thirteen = tree.right?.right?.left?.value;
    const notThere = tree.right?.right?.right;
    {((cond) => {if (!cond) throw new Error("assertion failed: thirteen == 13")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(thirteen,13)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: notThere == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(notThere,undefined)))};
    {
      const $if_let_value = tree.left?.left;
      if ($if_let_value != undefined) {
        const o = $if_let_value;
        {((cond) => {if (!cond) throw new Error("assertion failed: o.value == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(o.value,1)))};
      }
    }
    const payloadWithoutOptions = ({"a": "a"});
    const payloadWithBucket = ({"a": "a","c": this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "orange bucket")});
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:t", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "optionals.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

