# [optionals.test.w](../../../../../examples/tests/valid/optionals.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__payloadWithBucket_c_____null_, $__payloadWithoutOptions_b_____null_, $payloadWithBucket_c }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($__payloadWithoutOptions_b_____null_, false), "payloadWithoutOptions.b? == false");
      if ($__payloadWithBucket_c_____null_) {
        (await $payloadWithBucket_c?.put?.("x.txt", "something"));
      }
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.Node-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Node {
    constructor({  }) {
    }
  }
  return Node;
}
//# sourceMappingURL=inflight.Node-1.js.map
```

## inflight.Sub-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Super }) {
  class Sub extends $Super {
    constructor({  }) {
      super({  });
    }
  }
  return Sub;
}
//# sourceMappingURL=inflight.Sub-1.js.map
```

## inflight.Sub1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Super }) {
  class Sub1 extends $Super {
    constructor({  }) {
      super({  });
    }
  }
  return Sub1;
}
//# sourceMappingURL=inflight.Sub1-1.js.map
```

## inflight.Super-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Super {
    constructor({  }) {
    }
  }
  return Super;
}
//# sourceMappingURL=inflight.Super-1.js.map
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
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Super extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.name = "Super";
      }
      static _toInflightType() {
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
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class Sub extends Super {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.name = "Sub";
      }
      static _toInflightType() {
        return `
          require("./inflight.Sub-1.js")({
            $Super: ${$stdlib.core.liftObject(Super)},
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
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class Sub1 extends Super {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.name = "Sub";
      }
      static _toInflightType() {
        return `
          require("./inflight.Sub1-1.js")({
            $Super: ${$stdlib.core.liftObject(Super)},
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
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class Node extends $stdlib.std.Resource {
      constructor($scope, $id, value, left, right) {
        super($scope, $id);
        this.value = value;
        this.left = left;
        this.right = right;
      }
      static _toInflightType() {
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
        return [...super._supportedOps(), "$inflight_init"];
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure1-1.js")({
            $__payloadWithBucket_c_____null_: ${$stdlib.core.liftObject(((payloadWithBucket.c) != null))},
            $__payloadWithoutOptions_b_____null_: ${$stdlib.core.liftObject(((payloadWithoutOptions.b) != null))},
            $payloadWithBucket_c: ${$stdlib.core.liftObject(payloadWithBucket.c)},
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
          $Closure1._registerOnLiftObject(((payloadWithBucket.c) != null), host, []);
          $Closure1._registerOnLiftObject(((payloadWithoutOptions.b) != null), host, []);
          $Closure1._registerOnLiftObject(payloadWithBucket.c, host, ["put"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const x = 4;
    $helpers.assert($helpers.eq(((x) != null), true), "x? == true");
    $helpers.assert($helpers.eq((!((x) != null)), false), "!x? == false");
    $helpers.assert($helpers.eq((x ?? 5), 4), "x ?? 5 == 4");
    const y = (x ?? 5);
    $helpers.assert($helpers.eq(y, 4), "y == 4");
    const optionalSup = new Super(this, "Super");
    const s = (optionalSup ?? new Sub(this, "Sub"));
    $helpers.assert($helpers.eq(s.name, "Super"), "s.name == \"Super\"");
    let name = ({"first": "John", "last": "Doe"});
    {
      const $if_let_value = name;
      if ($if_let_value != undefined) {
        const n = $if_let_value;
        $helpers.assert($helpers.eq(n.first, "John"), "n.first == \"John\"");
      }
    }
    name = undefined;
    {
      const $if_let_value = name;
      if ($if_let_value != undefined) {
        const n = $if_let_value;
        $helpers.assert(false, "false");
      }
      else {
        $helpers.assert(true, "true");
      }
    }
    const tryParseName = ((fullName) => {
      const parts = (fullName.split(" "));
      if ((parts.length < 1)) {
        return undefined;
      }
      return ({"first": (parts.at(0) ?? ""), "last": (parts.at(1) ?? "")});
    });
    const json_obj = ({"ghost": "spooky"});
    let something_else = false;
    {
      const $if_let_value = ((arg) => { return (typeof arg === "boolean") ? JSON.parse(JSON.stringify(arg)) : undefined })(json_obj);
      if ($if_let_value != undefined) {
        const y = $if_let_value;
        $helpers.assert(($helpers.eq(y, true) || $helpers.eq(y, false)), "y == true || y == false");
      }
      else {
        const $elif_let_value0 = ((arg) => { return (typeof arg === "number") ? JSON.parse(JSON.stringify(arg)) : undefined })(json_obj);
        if ($elif_let_value0 != undefined) {
          const y = $elif_let_value0;
          $helpers.assert($helpers.eq((y + 0), y), "y + 0 == y");
        }
        else {
          const $elif_let_value1 = ((arg) => { return (typeof arg === "string") ? JSON.parse(JSON.stringify(arg)) : undefined })(json_obj);
          if ($elif_let_value1 != undefined) {
            const y = $elif_let_value1;
            $helpers.assert((y.length >= 0), "y.length >= 0");
          }
          else {
            something_else = true;
          }
        }
      }
    }
    $helpers.assert(something_else, "something_else");
    const a = 1;
    {
      const $if_let_value = a;
      if ($if_let_value != undefined) {
        let z = $if_let_value;
        $helpers.assert($helpers.eq(z, 1), "z == 1");
        z = 2;
        $helpers.assert($helpers.eq(z, 2), "z == 2");
      }
    }
    const b = 1;
    {
      const $if_let_value = b;
      if ($if_let_value != undefined) {
        const z = $if_let_value;
        $helpers.assert($helpers.eq(z, 1), "z == 1");
      }
    }
    {
      const $if_let_value = (tryParseName("Good Name"));
      if ($if_let_value != undefined) {
        const parsedName = $if_let_value;
        $helpers.assert($helpers.eq(parsedName.first, "Good"), "parsedName.first == \"Good\"");
        {
          const $if_let_value = parsedName.last;
          if ($if_let_value != undefined) {
            const lastName = $if_let_value;
            $helpers.assert($helpers.eq(lastName, "Name"), "lastName == \"Name\"");
          }
          else {
            $helpers.assert(false, "false");
          }
        }
      }
    }
    {
      const $if_let_value = (tryParseName("BadName"));
      if ($if_let_value != undefined) {
        const parsedName = $if_let_value;
        $helpers.assert($helpers.eq(parsedName.first, "BadName"), "parsedName.first == \"BadName\"");
        if (!$helpers.eq(parsedName.last, "")) {
          $helpers.assert(false, "false");
        }
      }
    }
    const falsy = false;
    {
      const $if_let_value = falsy;
      if ($if_let_value != undefined) {
        const f = $if_let_value;
        $helpers.assert($helpers.eq(f, false), "f == false");
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    const shadow = "root";
    {
      const $if_let_value = shadow;
      if ($if_let_value != undefined) {
        const shadow = $if_let_value;
        $helpers.assert($helpers.eq(shadow, "root"), "shadow == \"root\"");
        const shadow1 = "nested";
        {
          const $if_let_value = shadow1;
          if ($if_let_value != undefined) {
            const shadow1 = $if_let_value;
            $helpers.assert($helpers.eq(shadow1, "nested"), "shadow1 == \"nested\"");
          }
          else {
            $helpers.assert(false, "false");
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
    $helpers.assert($helpers.eq((fun("hello")), "hello"), "fun(\"hello\") == \"hello\"");
    $helpers.assert($helpers.eq((fun(undefined)), "default"), "fun(nil) == \"default\"");
    const tree = new Node(this, "eight", 8, new Node(this, "three", 3, new Node(this, "one", 1, undefined, undefined), new Node(this, "six", 6, undefined, undefined)), new Node(this, "ten", 10, undefined, new Node(this, "fourteen", 14, new Node(this, "thirteen", 13, undefined, undefined), undefined)));
    const thirteen = tree.right?.right?.left?.value;
    const notThere = tree.right?.right?.right;
    $helpers.assert($helpers.eq(thirteen, 13), "thirteen == 13");
    $helpers.assert($helpers.eq(notThere, undefined), "notThere == nil");
    {
      const $if_let_value = tree.left?.left;
      if ($if_let_value != undefined) {
        const o = $if_let_value;
        $helpers.assert($helpers.eq(o.value, 1), "o.value == 1");
      }
    }
    const payloadWithoutOptions = ({"a": "a"});
    const payloadWithBucket = ({"a": "a", "c": this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "orange bucket")});
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:t", new $Closure1(this, "$Closure1"));
    const str1 = undefined;
    const str2 = undefined;
    {
      const $if_let_value = str1;
      if ($if_let_value != undefined) {
        const s1 = $if_let_value;
        $helpers.assert(false, "false");
      }
      else {
        const $elif_let_value0 = str2;
        if ($elif_let_value0 != undefined) {
          const s2 = $elif_let_value0;
          $helpers.assert(true, "true");
        }
      }
    }
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "optionals.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

