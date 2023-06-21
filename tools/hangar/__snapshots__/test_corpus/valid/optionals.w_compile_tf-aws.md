# [optionals.w](../../../../../examples/tests/valid/optionals.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ payloadWithoutOptions, payloadWithBucket }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(((payloadWithoutOptions.b) != null) === false)'`)})((((payloadWithoutOptions.b) != null) === false))};
      if (((payloadWithBucket.c) != null)) {
        (await payloadWithBucket.c.put("x.txt","something"));
      }
    }
  }
  return $Closure1;
}

```

## inflight.Node.js
```js
module.exports = function({  }) {
  class Node {
    constructor({ left, right, value }) {
      this.left = left;
      this.right = right;
      this.value = value;
    }
    async $inflight_init()  {
    }
  }
  return Node;
}

```

## inflight.Sub.js
```js
module.exports = function({ Super }) {
  class Sub extends Super {
    constructor({ name }) {
      super({name});
    }
    async $inflight_init()  {
    }
  }
  return Sub;
}

```

## inflight.Sub1.js
```js
module.exports = function({ Super }) {
  class Sub1 extends Super {
    constructor({ name }) {
      super({name});
    }
    async $inflight_init()  {
    }
  }
  return Sub1;
}

```

## inflight.Super.js
```js
module.exports = function({  }) {
  class Super {
    constructor({ name }) {
      this.name = name;
    }
    async $inflight_init()  {
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
      "value": "[[\"root/Default/Default/test:t\",\"${aws_lambda_function.root_testt_Handler_A23A3A53.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testt_Handler_IamRole_D6F8E063": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:t/Handler/IamRole",
            "uniqueId": "root_testt_Handler_IamRole_D6F8E063"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testt_Handler_IamRolePolicy_35CD1E8D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:t/Handler/IamRolePolicy",
            "uniqueId": "root_testt_Handler_IamRolePolicy_35CD1E8D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_orangebucket_F14D9995.arn}\",\"${aws_s3_bucket.root_orangebucket_F14D9995.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testt_Handler_IamRole_D6F8E063.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testt_Handler_IamRolePolicyAttachment_83B6CC34": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:t/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testt_Handler_IamRolePolicyAttachment_83B6CC34"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testt_Handler_IamRole_D6F8E063.name}"
      }
    },
    "aws_lambda_function": {
      "root_testt_Handler_A23A3A53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:t/Handler/Default",
            "uniqueId": "root_testt_Handler_A23A3A53"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_c1491ba5": "${aws_s3_bucket.root_orangebucket_F14D9995.bucket}",
            "BUCKET_NAME_c1491ba5_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "Handler-c83c24f9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c83c24f9",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testt_Handler_IamRole_D6F8E063.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testt_Handler_S3Object_D779BA1A.key}",
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
      },
      "root_orangebucket_F14D9995": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/orange bucket/Default",
            "uniqueId": "root_orangebucket_F14D9995"
          }
        },
        "bucket_prefix": "orange-bucket-c8ecc927-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_orangebucket_PublicAccessBlock_7E0AC056": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/orange bucket/PublicAccessBlock",
            "uniqueId": "root_orangebucket_PublicAccessBlock_7E0AC056"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_orangebucket_F14D9995.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_orangebucket_Encryption_34CE66C9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/orange bucket/Encryption",
            "uniqueId": "root_orangebucket_Encryption_34CE66C9"
          }
        },
        "bucket": "${aws_s3_bucket.root_orangebucket_F14D9995.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      }
    },
    "aws_s3_object": {
      "root_testt_Handler_S3Object_D779BA1A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:t/Handler/S3Object",
            "uniqueId": "root_testt_Handler_S3Object_D779BA1A"
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
    class Super extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.name = "Super";
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Super.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const name_client = this._lift(this.name);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const SuperClient = ${Super._toInflightType(this).text};
            const client = new SuperClient({
              name: ${name_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Super._registerBindObject(this.name, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class Sub extends Super {
      constructor(scope, id, ) {
        this.name = "Sub";
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Sub.js";
        const SuperClient = Super._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            Super: ${SuperClient.text},
          })
        `);
      }
      _toInflight() {
        const name_client = this._lift(this.name);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const SubClient = ${Sub._toInflightType(this).text};
            const client = new SubClient({
              name: ${name_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Sub._registerBindObject(this.name, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class Sub1 extends Super {
      constructor(scope, id, ) {
        this.name = "Sub";
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Sub1.js";
        const SuperClient = Super._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            Super: ${SuperClient.text},
          })
        `);
      }
      _toInflight() {
        const name_client = this._lift(this.name);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const Sub1Client = ${Sub1._toInflightType(this).text};
            const client = new Sub1Client({
              name: ${name_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Sub1._registerBindObject(this.name, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class Node extends $stdlib.std.Resource {
      constructor(scope, id, value, left, right) {
        super(scope, id);
        this.value = value;
        this.left = left;
        this.right = right;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Node.js";
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const payloadWithoutOptions_client = context._lift(payloadWithoutOptions);
        const payloadWithBucket_client = context._lift(payloadWithBucket);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            payloadWithoutOptions: ${payloadWithoutOptions_client},
            payloadWithBucket: ${payloadWithBucket_client},
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
          $Closure1._registerBindObject(payloadWithBucket, host, []);
          $Closure1._registerBindObject(payloadWithoutOptions, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(payloadWithBucket.c, host, ["put"]);
          $Closure1._registerBindObject(payloadWithoutOptions.b, host, []);
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
    const optionalSup = new Super(this,"Super");
    const s = (optionalSup ?? new Sub(this,"Sub"));
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
    const payloadWithoutOptions = {
    "a": "a",}
    ;
    const payloadWithBucket = {
    "a": "a",
    "c": this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"orange bucket"),}
    ;
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:t",new $Closure1(this,"$Closure1"));
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

