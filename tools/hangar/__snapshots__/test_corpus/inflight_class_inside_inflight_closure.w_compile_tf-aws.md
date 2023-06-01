# [inflight_class_inside_inflight_closure.w](../../../../examples/tests/valid/inflight_class_inside_inflight_closure.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ __parent_this }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(payload)  {
      (await __parent_this.b.put("k","v"));
      const InflightClass = require("./InflightClass.inflight.js")({});
      const c = new InflightClass();
      (await c.method());
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ f }) {
  class $Inflight2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await f.invoke("text"));
    }
  }
  return $Inflight2;
}

```

## clients/$Inflight3.inflight.js
```js
module.exports = function({  }) {
  class $Inflight3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const x = 12;
      const Foo = require("./Foo.inflight.js")({x});
      const foo = new Foo();
      const y = (await foo.getX());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(y === 12)'`)})((y === 12))};
    }
  }
  return $Inflight3;
}

```

## clients/Foo.inflight.js
```js
module.exports = function({ x }) {
  class Foo {
     constructor()  {
    }
    async getX()  {
      return x;
    }
  }
  return Foo;
}

```

## clients/InflightClass.inflight.js
```js
module.exports = function({  }) {
  class InflightClass {
     constructor()  {
      this.field = "value";
    }
    async method()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.field === "value")'`)})((this.field === "value"))};
    }
  }
  return InflightClass;
}

```

## clients/PreflightClass.inflight.js
```js
module.exports = function({  }) {
  class PreflightClass {
    constructor({ b }) {
      this.b = b;
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
  }
  return PreflightClass;
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
      "value": "[[\"root/Default/Default/test:it works\",\"${aws_lambda_function.root_testitworks_Handler_BEC11FA5.arn}\"],[\"root/Default/Default/test:inflight class inside closure captures from closure\",\"${aws_lambda_function.root_testinflightclassinsideclosurecapturesfromclosure_Handler_2E6525A5.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_PreflightClass_cloudFunction_IamRole_6044475F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/IamRole",
            "uniqueId": "root_PreflightClass_cloudFunction_IamRole_6044475F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_D2DE8C67": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class inside closure captures from closure/Handler/IamRole",
            "uniqueId": "root_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_D2DE8C67"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testitworks_Handler_IamRole_E4B1CB89": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:it works/Handler/IamRole",
            "uniqueId": "root_testitworks_Handler_IamRole_E4B1CB89"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_PreflightClass_cloudFunction_IamRolePolicy_0B855787": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/IamRolePolicy",
            "uniqueId": "root_PreflightClass_cloudFunction_IamRolePolicy_0B855787"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_PreflightClass_cloudBucket_DABE9D2A.arn}\",\"${aws_s3_bucket.root_PreflightClass_cloudBucket_DABE9D2A.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_PreflightClass_cloudFunction_IamRole_6044475F.name}"
      },
      "root_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRolePolicy_D15D8B79": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class inside closure captures from closure/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRolePolicy_D15D8B79"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_D2DE8C67.name}"
      },
      "root_testitworks_Handler_IamRolePolicy_F0EF264C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:it works/Handler/IamRolePolicy",
            "uniqueId": "root_testitworks_Handler_IamRolePolicy_F0EF264C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.root_PreflightClass_cloudFunction_4B293CC7.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testitworks_Handler_IamRole_E4B1CB89.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_PreflightClass_cloudFunction_IamRolePolicyAttachment_05BB360A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "root_PreflightClass_cloudFunction_IamRolePolicyAttachment_05BB360A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_PreflightClass_cloudFunction_IamRole_6044475F.name}"
      },
      "root_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRolePolicyAttachment_8E0DD64E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class inside closure captures from closure/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRolePolicyAttachment_8E0DD64E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_D2DE8C67.name}"
      },
      "root_testitworks_Handler_IamRolePolicyAttachment_75B68906": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:it works/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testitworks_Handler_IamRolePolicyAttachment_75B68906"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testitworks_Handler_IamRole_E4B1CB89.name}"
      }
    },
    "aws_lambda_function": {
      "root_PreflightClass_cloudFunction_4B293CC7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/Default",
            "uniqueId": "root_PreflightClass_cloudFunction_4B293CC7"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_70ca4fed": "${aws_s3_bucket.root_PreflightClass_cloudBucket_DABE9D2A.bucket}",
            "BUCKET_NAME_70ca4fed_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "cloud-Function-c8db99e3"
          }
        },
        "function_name": "cloud-Function-c8db99e3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_PreflightClass_cloudFunction_IamRole_6044475F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_PreflightClass_cloudFunction_S3Object_E6574CBD.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinflightclassinsideclosurecapturesfromclosure_Handler_2E6525A5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class inside closure captures from closure/Handler/Default",
            "uniqueId": "root_testinflightclassinsideclosurecapturesfromclosure_Handler_2E6525A5"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c866c5da"
          }
        },
        "function_name": "Handler-c866c5da",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_D2DE8C67.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightclassinsideclosurecapturesfromclosure_Handler_S3Object_FB0849DF.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testitworks_Handler_BEC11FA5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:it works/Handler/Default",
            "uniqueId": "root_testitworks_Handler_BEC11FA5"
          }
        },
        "environment": {
          "variables": {
            "FUNCTION_NAME_31bff872": "${aws_lambda_function.root_PreflightClass_cloudFunction_4B293CC7.arn}",
            "WING_FUNCTION_NAME": "Handler-c834f611"
          }
        },
        "function_name": "Handler-c834f611",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testitworks_Handler_IamRole_E4B1CB89.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testitworks_Handler_S3Object_4D2EAC45.key}",
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
      "root_PreflightClass_cloudBucket_DABE9D2A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Bucket/Default",
            "uniqueId": "root_PreflightClass_cloudBucket_DABE9D2A"
          }
        },
        "bucket_prefix": "cloud-bucket-c8bbe938-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_PreflightClass_cloudBucket_PublicAccessBlock_CFA4CF58": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_PreflightClass_cloudBucket_PublicAccessBlock_CFA4CF58"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_PreflightClass_cloudBucket_DABE9D2A.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_PreflightClass_cloudBucket_Encryption_833666AF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Bucket/Encryption",
            "uniqueId": "root_PreflightClass_cloudBucket_Encryption_833666AF"
          }
        },
        "bucket": "${aws_s3_bucket.root_PreflightClass_cloudBucket_DABE9D2A.bucket}",
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
      "root_PreflightClass_cloudFunction_S3Object_E6574CBD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/S3Object",
            "uniqueId": "root_PreflightClass_cloudFunction_S3Object_E6574CBD"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinflightclassinsideclosurecapturesfromclosure_Handler_S3Object_FB0849DF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class inside closure captures from closure/Handler/S3Object",
            "uniqueId": "root_testinflightclassinsideclosurecapturesfromclosure_Handler_S3Object_FB0849DF"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testitworks_Handler_S3Object_4D2EAC45": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:it works/Handler/S3Object",
            "uniqueId": "root_testitworks_Handler_S3Object_4D2EAC45"
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
    class PreflightClass extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const __parent_this = this;
        this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
       preflight_method()  {
        const __parent_this = this;
        class $Inflight1 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            const self_client_path = "./clients/$Inflight1.inflight.js";
            const __parent_this_client = context._lift(__parent_this);
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
                __parent_this: ${__parent_this_client},
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
              $Inflight1._registerBindObject(__parent_this, host, []);
            }
            if (ops.includes("handle")) {
              $Inflight1._registerBindObject(__parent_this.b, host, ["put"]);
            }
            super._registerBind(host, ops);
          }
        }
        const inflight_closure = new $Inflight1(this,"$Inflight1");
        return this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",inflight_closure);
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/PreflightClass.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const b_client = this._lift(this.b);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const PreflightClassClient = ${PreflightClass._toInflightType(this).text};
            const client = new PreflightClassClient({
              b: ${b_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          PreflightClass._registerBindObject(this.b, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight2.inflight.js";
        const f_client = context._lift(f);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            f: ${f_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight2Client = ${$Inflight2._toInflightType(this).text};
            const client = new $Inflight2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight2._registerBindObject(f, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight2._registerBindObject(f, host, ["invoke"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight3.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight3Client = ${$Inflight3._toInflightType(this).text};
            const client = new $Inflight3Client({
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
    const p = new PreflightClass(this,"PreflightClass");
    const f = (p.preflight_method());
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:it works",new $Inflight2(this,"$Inflight2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight class inside closure captures from closure",new $Inflight3(this,"$Inflight3"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "inflight_class_inside_inflight_closure", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

