# [for_loop.w](../../../../../examples/tests/valid/for_loop.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(event)  {
      for (const x of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,10,false)) {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 0)'`)})((x <= 0))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > 10)'`)})((x > 10))};
        {console.log(`${x}`)};
      }
    }
  }
  return $Closure1;
}

```

## inflight.Foo.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
    async hello()  {
      const __parent_this = this;
      for (const p of Object.freeze(["hello"])) {
        const __parent_this = this;
        {console.log(p)};
      }
    }
  }
  return Foo;
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
    "aws_iam_role": {
      "root_cloudFunction_IamRole_DAEC3578": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRole",
            "uniqueId": "root_cloudFunction_IamRole_DAEC3578"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudFunction_IamRolePolicy_AAE6C0C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "root_cloudFunction_IamRolePolicy_AAE6C0C0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudFunction_IamRolePolicyAttachment_FC3D9E7C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "root_cloudFunction_IamRolePolicyAttachment_FC3D9E7C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudFunction_6A57BA0A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/Default",
            "uniqueId": "root_cloudFunction_6A57BA0A"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Function-c8d2eca1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8d2eca1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudFunction_S3Object_C8435368.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "root_cloudFunction_S3Object_C8435368": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/S3Object",
            "uniqueId": "root_cloudFunction_S3Object_C8435368"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this).text};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("hello");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Foo.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this).text};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("hello")) {
        }
        super._registerBind(host, ops);
      }
    }
    const words = Object.freeze(["wing", "lang", "dang"]);
    const uniqueNumbers = Object.freeze(new Set([1, 2, 3]));
    for (const word of words) {
      for (const number of uniqueNumbers) {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(number > 0)'`)})((number > 0))};
        {console.log(`${word}: ${number}`)};
      }
    }
    let i = 0;
    for (const word of words) {
      i = (i + 1);
      let preBreakHits = 0;
      let postBreakHits = 0;
      for (const number of uniqueNumbers) {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(number > 0)'`)})((number > 0))};
        {console.log(`${word}: ${number}`)};
        preBreakHits = (preBreakHits + 1);
        if ((number === 2)) {
          break;
        }
        postBreakHits = (postBreakHits + 1);
      }
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(preBreakHits === 2)'`)})((preBreakHits === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(postBreakHits === 1)'`)})((postBreakHits === 1))};
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(i === 3)'`)})((i === 3))};
    let j = 0;
    for (const word of words) {
      j = (j + 1);
      let preContinueHits = 0;
      let postContinueHits = 0;
      for (const number of uniqueNumbers) {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(number > 0)'`)})((number > 0))};
        {console.log(`${word}: ${number}`)};
        preContinueHits = (preContinueHits + 1);
        if ((number > 0)) {
          continue;
        }
        postContinueHits = (postContinueHits + 1);
      }
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(preContinueHits === 3)'`)})((preContinueHits === 3))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(postContinueHits === 0)'`)})((postContinueHits === 0))};
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(j === 3)'`)})((j === 3))};
    {console.log("---\nfor x in 0..0 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
    }
    {console.log("there's no value to iterate")};
    {console.log("---\nfor x in 0..=0 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 0, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x === 0)'`)})((x === 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 2, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x < 2)'`)})((x < 2))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..=2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 2, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 2..0 { ... }")};
    for (const x of $stdlib.std.Range.of(2, 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > 0)'`)})((x > 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 2..=0 { ... }")};
    for (const x of $stdlib.std.Range.of(2, 0, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..-2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, (-2), false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 0)'`)})((x <= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > (-2))'`)})((x > (-2)))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..=-2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, (-2), true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 0)'`)})((x <= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > (-3))'`)})((x > (-3)))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in -2..0 { ... }")};
    for (const x of $stdlib.std.Range.of((-2), 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= (-2))'`)})((x >= (-2)))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x < 0)'`)})((x < 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in -2..=0 { ... }")};
    for (const x of $stdlib.std.Range.of((-2), 0, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= (-2))'`)})((x >= (-2)))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 0)'`)})((x <= 0))};
      {console.log(`${x}`)};
    }
    const z = 2;
    {console.log("---\nfor x in 0..z { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, z, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x < 2)'`)})((x < 2))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..=z { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, z, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in z..0 { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(z, 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > 0)'`)})((x > 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..(z*2) { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, (z * 2), false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x < 4)'`)})((x < 4))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..=(z*2) { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, (z * 2), true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 4)'`)})((x <= 4))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in (z*2)..0 { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of((z * 2), 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 4)'`)})((x <= 4))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > 0)'`)})((x > 0))};
      {console.log(`${x}`)};
    }
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "for_loop", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

