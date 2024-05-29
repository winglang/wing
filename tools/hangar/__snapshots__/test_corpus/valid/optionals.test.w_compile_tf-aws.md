# [optionals.test.w](../../../../../examples/tests/valid/optionals.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__payloadWithBucket_c_____null_, $__payloadWithoutOptions_b_____null_, $payloadWithBucket_c }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
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
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.Node-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Node {
    constructor($args) {
      const {  } = $args;
    }
  }
  return Node;
}
//# sourceMappingURL=inflight.Node-1.cjs.map
```

## inflight.Sub-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Super }) {
  class Sub extends $Super {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return Sub;
}
//# sourceMappingURL=inflight.Sub-1.cjs.map
```

## inflight.SubSub-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Sub }) {
  class SubSub extends $Sub {
    constructor($args) {
      const {  } = $args;
      super($args);
    }
  }
  return SubSub;
}
//# sourceMappingURL=inflight.SubSub-1.cjs.map
```

## inflight.Super-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Super {
    constructor($args) {
      const {  } = $args;
    }
  }
  return Super;
}
//# sourceMappingURL=inflight.Super-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
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

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const Person = $stdlib.std.Struct._createJsonSchema({$id:"/Person",type:"object",properties:{age:{type:"number"},name:{type:"string"},},required:["age","name",]});
    class Super extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.name = "Super";
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Super-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    class Sub extends Super {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.name = "Sub";
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Sub-1.cjs")({
            $Super: ${$stdlib.core.liftObject(Super)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
      }
    }
    class SubSub extends Sub {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.name = "SubSub";
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.SubSub-1.cjs")({
            $Sub: ${$stdlib.core.liftObject(Sub)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return $stdlib.core.mergeLiftDeps(super._liftMap, {
          "$inflight_init": [
          ],
        });
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
          require("${$helpers.normalPath(__dirname)}/inflight.Node-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $__payloadWithBucket_c_____null_: ${$stdlib.core.liftObject(((payloadWithBucket.c) != null))},
            $__payloadWithoutOptions_b_____null_: ${$stdlib.core.liftObject(((payloadWithoutOptions.b) != null))},
            $payloadWithBucket_c: ${$stdlib.core.liftObject(payloadWithBucket.c)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return ({
          "handle": [
            [((payloadWithBucket.c) != null), []],
            [((payloadWithoutOptions.b) != null), []],
            [payloadWithBucket.c, ["put"]],
          ],
          "$inflight_init": [
            [((payloadWithBucket.c) != null), []],
            [((payloadWithoutOptions.b) != null), []],
            [payloadWithBucket.c, []],
          ],
        });
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
    const s2 = (optionalSup ?? (optionalSup ?? new SubSub(this, "SubSub")));
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
        if ($helpers.neq(parsedName.last, "")) {
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
    let fn = (() => {
      return (() => {
        return 1337;
      });
    });
    {
      const $if_let_value = (fn());
      if ($if_let_value != undefined) {
        const f = $if_let_value;
        $helpers.assert($helpers.eq((f()), 1337), "f() == 1337");
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    fn = (() => {
      return undefined;
    });
    {
      const $if_let_value = (fn());
      if ($if_let_value != undefined) {
        const f = $if_let_value;
        $helpers.assert(false, "false");
      }
      else {
        $helpers.assert(true, "true");
      }
    }
    const maybeVar = 123;
    $helpers.assert($helpers.eq($helpers.unwrap(maybeVar), 123), "maybeVar! == 123");
    const maybeVarNull = undefined;
    try {
      const err = $helpers.unwrap(maybeVarNull);
      $helpers.assert(false, "false");
    }
    catch ($error_e) {
      const e = $error_e.message;
      $helpers.assert($helpers.eq(e, "Unexpected nil"), "e == \"Unexpected nil\"");
    }
    const maybeFn = ((b) => {
      if (b) {
        return ["hi"];
      }
    });
    try {
      $helpers.unwrap((maybeFn(false)));
      $helpers.assert(false, "false");
    }
    catch ($error_e) {
      const e = $error_e.message;
      $helpers.assert($helpers.eq(e, "Unexpected nil"), "e == \"Unexpected nil\"");
    }
    $helpers.assert($helpers.eq($helpers.unwrap((maybeFn(true))), ["hi"]), "maybeFn(true)! == [\"hi\"]");
    const maybeVarBool = true;
    $helpers.assert($helpers.eq((!$helpers.unwrap(maybeVarBool)), false), "!maybeVarBool! == false");
    const person = $helpers.unwrap(Person._tryParseJson(((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"name": "john", "age": 30}))));
    $helpers.assert(($helpers.eq(person.name, "john") && $helpers.eq(person.age, 30)), "person.name == \"john\" && person.age == 30");
    const maybeX = 0;
    $helpers.assert($helpers.eq($helpers.unwrap(maybeX), 0), "maybeX! == 0");
    const maybeY = "";
    $helpers.assert($helpers.eq($helpers.unwrap(maybeY), ""), "maybeY! == \"\"");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "optionals.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

