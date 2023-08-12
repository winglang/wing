# [optionals.w](../../../../../examples/tests/valid/optionals.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
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
        (await $payloadWithBucket_c?.put?.("x.txt","something"));
      }
    }
  }
  return $Closure1;
}

```

## inflight.Node-1.js
```js
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
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/test:t\",\"${aws_lambda_function.testt_Handler_FF112F5E.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testt_Handler_IamRole_BF49E95A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:t/Handler/IamRole",
            "uniqueId": "testt_Handler_IamRole_BF49E95A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testt_Handler_IamRolePolicy_F429CB90": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:t/Handler/IamRolePolicy",
            "uniqueId": "testt_Handler_IamRolePolicy_F429CB90"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.orangebucket.arn}\",\"${aws_s3_bucket.orangebucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testt_Handler_IamRole_BF49E95A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testt_Handler_IamRolePolicyAttachment_16BB0DB0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:t/Handler/IamRolePolicyAttachment",
            "uniqueId": "testt_Handler_IamRolePolicyAttachment_16BB0DB0"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testt_Handler_IamRole_BF49E95A.name}"
      }
    },
    "aws_lambda_function": {
      "testt_Handler_FF112F5E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:t/Handler/Default",
            "uniqueId": "testt_Handler_FF112F5E"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_c1491ba5": "${aws_s3_bucket.orangebucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c83c24f9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c83c24f9",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testt_Handler_IamRole_BF49E95A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testt_Handler_S3Object_572CA425.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "Code": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "Code"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      },
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
    },
    "aws_s3_bucket_public_access_block": {
      "orangebucket_PublicAccessBlock_E0BEAC90": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/orange bucket/PublicAccessBlock",
            "uniqueId": "orangebucket_PublicAccessBlock_E0BEAC90"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.orangebucket.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "orangebucket_Encryption_F338E6D4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/orange bucket/Encryption",
            "uniqueId": "orangebucket_Encryption_F338E6D4"
          }
        },
        "bucket": "${aws_s3_bucket.orangebucket.bucket}",
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
      "testt_Handler_S3Object_572CA425": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:t/Handler/S3Object",
            "uniqueId": "testt_Handler_S3Object_572CA425"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Super extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        this.name = "Super";
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Super-1.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const SuperClient = ${Super._toInflightType(this).text};
            const client = new SuperClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class Sub extends Super {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        this.name = "Sub";
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Sub-1.js")({
            $Super: ${context._lift(Super)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const SubClient = ${Sub._toInflightType(this).text};
            const client = new SubClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class Sub1 extends Super {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        this.name = "Sub";
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Sub1-1.js")({
            $Super: ${context._lift(Super)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const Sub1Client = ${Sub1._toInflightType(this).text};
            const client = new Sub1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class Node extends $stdlib.std.Resource {
      constructor(scope, id, value, left, right) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        this.value = value;
        this.left = left;
        this.right = right;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Node-1.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const NodeClient = ${Node._toInflightType(this).text};
            const client = new NodeClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1-1.js")({
            $__payloadWithBucket_c_____null_: ${context._lift(((payloadWithBucket.c) != null))},
            $__payloadWithoutOptions_b_____null_: ${context._lift(((payloadWithoutOptions.b) != null))},
            $payloadWithBucket_c: ${context._lift(payloadWithBucket.c)},
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
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(((payloadWithBucket.c) != null), host, []);
          $Closure1._registerBindObject(((payloadWithoutOptions.b) != null), host, []);
          $Closure1._registerBindObject(payloadWithBucket.c, host, ["put"]);
        }
        super._registerBind(host, ops);
      }
    }
    const x = 4;
    {((cond) => {if (!cond) throw new Error("assertion failed: x? == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((x) != null),true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !x? == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((!((x) != null)),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: x ?? 5 == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((x ?? 5),4)))};
    const y = (x ?? 5);
    {((cond) => {if (!cond) throw new Error("assertion failed: y == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y,4)))};
    const optionalSup = new Super(this,"Super");
    const s = (optionalSup ?? new Sub(this,"Sub"));
    {((cond) => {if (!cond) throw new Error("assertion failed: s.name == \"Super\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s.name,"Super")))};
    let name = ({"first": "John","last": "Doe"});
    {
      const $IF_LET_VALUE = name;
      if ($IF_LET_VALUE != undefined) {
        const n = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error("assertion failed: n.first == \"John\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(n.first,"John")))};
      }
    }
    name = undefined;
    {
      const $IF_LET_VALUE = name;
      if ($IF_LET_VALUE != undefined) {
        const n = $IF_LET_VALUE;
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
    {
      const $IF_LET_VALUE = (tryParseName("Good Name"));
      if ($IF_LET_VALUE != undefined) {
        const parsedName = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error("assertion failed: parsedName.first == \"Good\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(parsedName.first,"Good")))};
        {
          const $IF_LET_VALUE = parsedName.last;
          if ($IF_LET_VALUE != undefined) {
            const lastName = $IF_LET_VALUE;
            {((cond) => {if (!cond) throw new Error("assertion failed: lastName == \"Name\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(lastName,"Name")))};
          }
          else {
            {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
          }
        }
      }
    }
    {
      const $IF_LET_VALUE = (tryParseName("BadName"));
      if ($IF_LET_VALUE != undefined) {
        const parsedName = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error("assertion failed: parsedName.first == \"BadName\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(parsedName.first,"BadName")))};
        {
          const $IF_LET_VALUE = parsedName.last;
          if ($IF_LET_VALUE != undefined) {
            const lastName = $IF_LET_VALUE;
            {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
          }
        }
      }
    }
    const falsy = false;
    {
      const $IF_LET_VALUE = falsy;
      if ($IF_LET_VALUE != undefined) {
        const f = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error("assertion failed: f == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(f,false)))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    const shadow = "root";
    {
      const $IF_LET_VALUE = shadow;
      if ($IF_LET_VALUE != undefined) {
        const shadow = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error("assertion failed: shadow == \"root\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(shadow,"root")))};
        const shadow1 = "nested";
        {
          const $IF_LET_VALUE = shadow1;
          if ($IF_LET_VALUE != undefined) {
            const shadow1 = $IF_LET_VALUE;
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
        const $IF_LET_VALUE = a;
        if ($IF_LET_VALUE != undefined) {
          const y = $IF_LET_VALUE;
          return y;
        }
        else {
          return "default";
        }
      }
    });
    {((cond) => {if (!cond) throw new Error("assertion failed: fun(\"hello\") == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fun("hello")),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: fun(nil) == \"default\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((fun(undefined)),"default")))};
    const tree = new Node(this,"eight",8,new Node(this,"three",3,new Node(this,"one",1,undefined,undefined),new Node(this,"six",6,undefined,undefined)),new Node(this,"ten",10,undefined,new Node(this,"fourteen",14,new Node(this,"thirteen",13,undefined,undefined),undefined)));
    const thirteen = tree.right?.right?.left?.value;
    const notThere = tree.right?.right?.right;
    {((cond) => {if (!cond) throw new Error("assertion failed: thirteen == 13")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(thirteen,13)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: notThere == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(notThere,undefined)))};
    {
      const $IF_LET_VALUE = tree.left?.left;
      if ($IF_LET_VALUE != undefined) {
        const o = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error("assertion failed: o.value == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(o.value,1)))};
      }
    }
    const payloadWithoutOptions = ({"a": "a"});
    const payloadWithBucket = ({"a": "a","c": this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"orange bucket")});
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:t",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "optionals", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

