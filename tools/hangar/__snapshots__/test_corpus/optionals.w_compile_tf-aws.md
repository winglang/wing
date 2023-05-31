# [optionals.w](../../../../examples/tests/valid/optionals.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ j, bar, bb }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      const x = ((j)["a"])["b"];
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x === "ss")'`)})((x === "ss"))};
      const y = bar.f.a;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(y === "hello")'`)})((y === "hello"))};
      (await bb.put("hello.txt","world"));
    }
  }
  return $Inflight1;
}

```

## clients/Node.inflight.js
```js
module.exports = function({  }) {
  class Node {
    constructor({ left, right, value }) {
      this.left = left;
      this.right = right;
      this.value = value;
    }
  }
  return Node;
}

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.15.2"
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
  },
  "resource": {
    "aws_s3_bucket": {
      "root_cloudBucket_4F3C4F53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "root_cloudBucket_4F3C4F53"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_cloudBucket_PublicAccessBlock_319C1C2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_cloudBucket_PublicAccessBlock_319C1C2E"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_cloudBucket_Encryption_8ED0CD9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "root_cloudBucket_Encryption_8ED0CD9C"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Super {
      constructor()  {
        const __parent_this = this;
        this.name = "Super";
      }
      name;
    }
    class Sub extends Super {
      constructor()  {
        const __parent_this = this;
        this.name = "Sub";
      }
    }
    class Sub1 extends Super {
      constructor()  {
        const __parent_this = this;
        this.name = "Sub";
      }
    }
    class Node extends $stdlib.std.Resource {
      constructor(scope, id, value, left, right) {
        super(scope, id);
        const __parent_this = this;
        this.value = value;
        this.left = left;
        this.right = right;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Node.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const left_client = this._lift(this.left);
        const right_client = this._lift(this.right);
        const value_client = this._lift(this.value);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const NodeClient = ${Node._toInflightType(this).text};
            const client = new NodeClient({
              left: ${left_client},
              right: ${right_client},
              value: ${value_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Node._registerBindObject(this.left, host, []);
          Node._registerBindObject(this.right, host, []);
          Node._registerBindObject(this.value, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
        const j_client = context._lift(j);
        const bar_client = context._lift(bar);
        const bb_client = context._lift(bb);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            j: ${j_client},
            bar: ${bar_client},
            bb: ${bb_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight1Client = ${$Inflight1._toInflightType(this).text};
            const client = new $Inflight1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight1._registerBindObject(bar, host, []);
          $Inflight1._registerBindObject(bb, host, []);
          $Inflight1._registerBindObject(j, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(bar.f.a, host, []);
          $Inflight1._registerBindObject(bb, host, ["put"]);
          $Inflight1._registerBindObject(j, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const x = 4;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((x) != null) === true)'`)})((((x) != null) === true))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((!((x) != null)) === false)'`)})(((!((x) != null)) === false))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((x ?? 5) === 4)'`)})(((x ?? 5) === 4))};
    const y = (x ?? 5);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(y === 4)'`)})((y === 4))};
    const optionalSup = new Super();
    const s = (optionalSup ?? new Sub());
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s.name === "Super")'`)})((s.name === "Super"))};
    let name = {
    "first": "John",
    "last": "Doe",}
    ;
    {
      const $IF_LET_VALUE = name;
      if ($IF_LET_VALUE != undefined) {
        const n = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(n.first === "John")'`)})((n.first === "John"))};
      }
    }
    name = undefined;
    {
      const $IF_LET_VALUE = name;
      if ($IF_LET_VALUE != undefined) {
        const n = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
      }
      else {
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'true'`)})(true)};
      }
    }
    const tryParseName =  (fullName) =>  {
      const parts = (fullName.split(" "));
      if ((parts.length < 1)) {
        return undefined;
      }
      return {
      "first": (parts.at(0)),
      "last": (parts.at(1)),}
      ;
    }
    ;
    {
      const $IF_LET_VALUE = (tryParseName("Good Name"));
      if ($IF_LET_VALUE != undefined) {
        const parsedName = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(parsedName.first === "Good")'`)})((parsedName.first === "Good"))};
        {
          const $IF_LET_VALUE = parsedName.last;
          if ($IF_LET_VALUE != undefined) {
            const lastName = $IF_LET_VALUE;
            {((cond) => {if (!cond) throw new Error(`assertion failed: '(lastName === "Name")'`)})((lastName === "Name"))};
          }
          else {
            {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
          }
        }
      }
    }
    {
      const $IF_LET_VALUE = (tryParseName("BadName"));
      if ($IF_LET_VALUE != undefined) {
        const parsedName = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(parsedName.first === "BadName")'`)})((parsedName.first === "BadName"))};
        {
          const $IF_LET_VALUE = parsedName.last;
          if ($IF_LET_VALUE != undefined) {
            const lastName = $IF_LET_VALUE;
            {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
          }
        }
      }
    }
    const falsy = false;
    {
      const $IF_LET_VALUE = falsy;
      if ($IF_LET_VALUE != undefined) {
        const f = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(f === false)'`)})((f === false))};
      }
      else {
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
      }
    }
    const shadow = "root";
    {
      const $IF_LET_VALUE = shadow;
      if ($IF_LET_VALUE != undefined) {
        const shadow = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(shadow === "root")'`)})((shadow === "root"))};
        const shadow1 = "nested";
        {
          const $IF_LET_VALUE = shadow1;
          if ($IF_LET_VALUE != undefined) {
            const shadow1 = $IF_LET_VALUE;
            {((cond) => {if (!cond) throw new Error(`assertion failed: '(shadow1 === "nested")'`)})((shadow1 === "nested"))};
          }
          else {
            {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
          }
        }
      }
    }
    const fun =  (a) =>  {
      {
        const $IF_LET_VALUE = a;
        if ($IF_LET_VALUE != undefined) {
          const y = $IF_LET_VALUE;
          return y;
        }
        else {
          return "default";
        }
      }
    }
    ;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((fun("hello")) === "hello")'`)})(((fun("hello")) === "hello"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((fun(undefined)) === "default")'`)})(((fun(undefined)) === "default"))};
    const tree = new Node(this,"eight",8,new Node(this,"three",3,new Node(this,"one",1,undefined,undefined),new Node(this,"six",6,undefined,undefined)),new Node(this,"ten",10,undefined,new Node(this,"fourteen",14,new Node(this,"thirteen",13,undefined,undefined),undefined)));
    const thirteen = tree.right.right.left.value;
    const notThere = tree.right.right.right;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(thirteen === 13)'`)})((thirteen === 13))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(notThere === undefined)'`)})((notThere === undefined))};
    {
      const $IF_LET_VALUE = tree.left.left;
      if ($IF_LET_VALUE != undefined) {
        const o = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(o.value === 1)'`)})((o.value === 1))};
      }
    }
    const bar = {
    "f": {
    "a": "hello",}
    ,}
    ;
    const j = Object.freeze({"a":{"b":"ss"}});
    const bb = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const f = new $Inflight1(this,"$Inflight1");
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "optionals", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```

