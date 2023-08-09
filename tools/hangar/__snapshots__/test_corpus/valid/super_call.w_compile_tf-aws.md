# [super_call.w](../../../../../examples/tests/valid/super_call.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $InflightB }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const b = new $InflightB();
      {((cond) => {if (!cond) throw new Error("assertion failed: b.description() == \"InflightB extends InflightA\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await b.description()),"InflightB extends InflightA")))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $extended }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: extended.do() == \"value\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $extended.do()),"value")))};
    }
  }
  return $Closure2;
}

```

## inflight.A.js
```js
module.exports = function({  }) {
  class A {
    constructor({  }) {
    }
  }
  return A;
}

```

## inflight.B.js
```js
module.exports = function({ $A }) {
  class B extends $A {
    constructor({  }) {
      super({  });
    }
  }
  return B;
}

```

## inflight.BaseClass.js
```js
module.exports = function({ $b }) {
  class BaseClass {
    constructor({  }) {
    }
    async do() {
      return (await $b.get("k"));
    }
  }
  return BaseClass;
}

```

## inflight.C.js
```js
module.exports = function({ $B }) {
  class C extends $B {
    constructor({  }) {
      super({  });
    }
  }
  return C;
}

```

## inflight.D.js
```js
module.exports = function({ $C }) {
  class D extends $C {
    constructor({  }) {
      super({  });
    }
  }
  return D;
}

```

## inflight.E.js
```js
module.exports = function({ $D }) {
  class E extends $D {
    constructor({  }) {
      super({  });
    }
  }
  return E;
}

```

## inflight.ExtendedClass.js
```js
module.exports = function({ $BaseClass, $b }) {
  class ExtendedClass extends $BaseClass {
    constructor({  }) {
      super({  });
    }
    async do() {
      (await $b.put("k","value"));
      return (await super.do());
    }
  }
  return ExtendedClass;
}

```

## inflight.InflightA.js
```js
module.exports = function({  }) {
  class InflightA {
    async description() {
      return "InflightA";
    }
  }
  return InflightA;
}

```

## inflight.InflightB.js
```js
module.exports = function({ $InflightA }) {
  class InflightB extends $InflightA {
    async description() {
      return String.raw({ raw: ["InflightB extends ", ""] }, (await super.description()));
    }
  }
  return InflightB;
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
      "value": "[[\"root/Default/Default/test:super call inflight\",\"${aws_lambda_function.testsupercallinflight_Handler_8BA833E3.arn}\"],[\"root/Default/Default/test:super call sets binding permissions\",\"${aws_lambda_function.testsupercallsetsbindingpermissions_Handler_094D9398.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testsupercallinflight_Handler_IamRole_BFD5186E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:super call inflight/Handler/IamRole",
            "uniqueId": "testsupercallinflight_Handler_IamRole_BFD5186E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testsupercallsetsbindingpermissions_Handler_IamRole_64C69931": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:super call sets binding permissions/Handler/IamRole",
            "uniqueId": "testsupercallsetsbindingpermissions_Handler_IamRole_64C69931"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testsupercallinflight_Handler_IamRolePolicy_657A4ED2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:super call inflight/Handler/IamRolePolicy",
            "uniqueId": "testsupercallinflight_Handler_IamRolePolicy_657A4ED2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testsupercallinflight_Handler_IamRole_BFD5186E.name}"
      },
      "testsupercallsetsbindingpermissions_Handler_IamRolePolicy_58870805": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:super call sets binding permissions/Handler/IamRolePolicy",
            "uniqueId": "testsupercallsetsbindingpermissions_Handler_IamRolePolicy_58870805"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testsupercallsetsbindingpermissions_Handler_IamRole_64C69931.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testsupercallinflight_Handler_IamRolePolicyAttachment_74E493C1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:super call inflight/Handler/IamRolePolicyAttachment",
            "uniqueId": "testsupercallinflight_Handler_IamRolePolicyAttachment_74E493C1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testsupercallinflight_Handler_IamRole_BFD5186E.name}"
      },
      "testsupercallsetsbindingpermissions_Handler_IamRolePolicyAttachment_FB4798F3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:super call sets binding permissions/Handler/IamRolePolicyAttachment",
            "uniqueId": "testsupercallsetsbindingpermissions_Handler_IamRolePolicyAttachment_FB4798F3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testsupercallsetsbindingpermissions_Handler_IamRole_64C69931.name}"
      }
    },
    "aws_lambda_function": {
      "testsupercallinflight_Handler_8BA833E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:super call inflight/Handler/Default",
            "uniqueId": "testsupercallinflight_Handler_8BA833E3"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c83c6423",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c83c6423",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testsupercallinflight_Handler_IamRole_BFD5186E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testsupercallinflight_Handler_S3Object_83823694.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testsupercallsetsbindingpermissions_Handler_094D9398": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:super call sets binding permissions/Handler/Default",
            "uniqueId": "testsupercallsetsbindingpermissions_Handler_094D9398"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8c1dd55",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8c1dd55",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testsupercallsetsbindingpermissions_Handler_IamRole_64C69931.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testsupercallsetsbindingpermissions_Handler_S3Object_6D280664.key}",
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
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "cloudBucket_PublicAccessBlock_5946CCE8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "cloudBucket_PublicAccessBlock_5946CCE8"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "cloudBucket_Encryption_77B6AEEF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "cloudBucket_Encryption_77B6AEEF"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
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
      "testsupercallinflight_Handler_S3Object_83823694": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:super call inflight/Handler/S3Object",
            "uniqueId": "testsupercallinflight_Handler_S3Object_83823694"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testsupercallsetsbindingpermissions_Handler_S3Object_6D280664": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:super call sets binding permissions/Handler/S3Object",
            "uniqueId": "testsupercallsetsbindingpermissions_Handler_S3Object_6D280664"
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
    class A extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        this.message = "A message from your ancestor";
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.A.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const AClient = ${A._toInflightType(this).text};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class B extends A {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      description() {
        return "B";
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.B.js")({
            $A: ${context._lift(A)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BClient = ${B._toInflightType(this).text};
            const client = new BClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class C extends B {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      description() {
        return String.raw({ raw: ["C extends ", ""] }, (super.description()));
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.C.js")({
            $B: ${context._lift(B)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const CClient = ${C._toInflightType(this).text};
            const client = new CClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class D extends C {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.D.js")({
            $C: ${context._lift(C)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const DClient = ${D._toInflightType(this).text};
            const client = new DClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class E extends D {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      description() {
        return String.raw({ raw: ["E extends ", ""] }, (super.description()));
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.E.js")({
            $D: ${context._lift(D)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const EClient = ${E._toInflightType(this).text};
            const client = new EClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class InflightA extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("description", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.InflightA.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const InflightAClient = ${InflightA._toInflightType(this).text};
            const client = new InflightAClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class InflightB extends InflightA {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("description", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.InflightB.js")({
            $InflightA: ${context._lift(InflightA)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const InflightBClient = ${InflightB._toInflightType(this).text};
            const client = new InflightBClient({
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
          require("./inflight.$Closure1.js")({
            $InflightB: ${context._lift(InflightB)},
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
    }
    class BaseClass extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("do", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.BaseClass.js")({
            $b: ${context._lift(b)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BaseClassClient = ${BaseClass._toInflightType(this).text};
            const client = new BaseClassClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("do")) {
          BaseClass._registerBindObject(b, host, ["get"]);
        }
        super._registerBind(host, ops);
      }
    }
    class ExtendedClass extends BaseClass {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("do", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.ExtendedClass.js")({
            $BaseClass: ${context._lift(BaseClass)},
            $b: ${context._lift(b)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const ExtendedClassClient = ${ExtendedClass._toInflightType(this).text};
            const client = new ExtendedClassClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("do")) {
          ExtendedClass._registerBindObject(b, host, ["put"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            $extended: ${context._lift(extended)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this).text};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(extended, host, ["do"]);
        }
        super._registerBind(host, ops);
      }
    }
    const e = new E(this,"E");
    {((cond) => {if (!cond) throw new Error("assertion failed: e.description() == \"E extends C extends B\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((e.description()),"E extends C extends B")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:super call inflight",new $Closure1(this,"$Closure1"));
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const extended = new ExtendedClass(this,"ExtendedClass");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:super call sets binding permissions",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "super_call", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

