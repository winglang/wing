# [inflight_class_inside_inflight_closure.w](../../../../../examples/tests/valid/inflight_class_inside_inflight_closure.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $__parent_this_1_b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(payload) {
      (await $__parent_this_1_b.put("k","v"));
      class InflightClass {
        async method() {
          {((cond) => {if (!cond) throw new Error("assertion failed: this.field == \"value\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.field,"value")))};
        }
        constructor() {
          this.field = "value";
        }
      }
      const c = new InflightClass();
      (await c.method());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $f }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $f.invoke("text"));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({  }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const x = 12;
      class Foo {
        async getX() {
          return x;
        }
      }
      const foo = new Foo();
      const y = (await foo.getX());
      {((cond) => {if (!cond) throw new Error("assertion failed: y == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y,12)))};
    }
  }
  return $Closure3;
}

```

## inflight.PreflightClass.js
```js
module.exports = function({  }) {
  class PreflightClass {
    constructor({  }) {
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
      "version": "0.17.0"
    },
    "outputs": {
      "root": {
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:it works\",\"${aws_lambda_function.undefined_testitworks_Handler_6CFD1875.arn}\"],[\"root/undefined/Default/test:inflight class inside closure captures from closure\",\"${aws_lambda_function.undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_7067D1CE.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_PreflightClass_cloudFunction_IamRole_B07C368C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PreflightClass/cloud.Function/IamRole",
            "uniqueId": "undefined_PreflightClass_cloudFunction_IamRole_B07C368C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_BCC7FC44": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class inside closure captures from closure/Handler/IamRole",
            "uniqueId": "undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_BCC7FC44"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testitworks_Handler_IamRole_2AEE5A9F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:it works/Handler/IamRole",
            "uniqueId": "undefined_testitworks_Handler_IamRole_2AEE5A9F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_PreflightClass_cloudFunction_IamRolePolicy_D62F7D81": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PreflightClass/cloud.Function/IamRolePolicy",
            "uniqueId": "undefined_PreflightClass_cloudFunction_IamRolePolicy_D62F7D81"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.undefined_PreflightClass_cloudBucket_8098BB25.arn}\",\"${aws_s3_bucket.undefined_PreflightClass_cloudBucket_8098BB25.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_PreflightClass_cloudFunction_IamRole_B07C368C.name}"
      },
      "undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRolePolicy_EBFFD419": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class inside closure captures from closure/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRolePolicy_EBFFD419"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_BCC7FC44.name}"
      },
      "undefined_testitworks_Handler_IamRolePolicy_521A6E5B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:it works/Handler/IamRolePolicy",
            "uniqueId": "undefined_testitworks_Handler_IamRolePolicy_521A6E5B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.undefined_PreflightClass_cloudFunction_3780B982.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testitworks_Handler_IamRole_2AEE5A9F.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_PreflightClass_cloudFunction_IamRolePolicyAttachment_8BCBE35D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PreflightClass/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "undefined_PreflightClass_cloudFunction_IamRolePolicyAttachment_8BCBE35D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_PreflightClass_cloudFunction_IamRole_B07C368C.name}"
      },
      "undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRolePolicyAttachment_C9FC06A2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class inside closure captures from closure/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRolePolicyAttachment_C9FC06A2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_BCC7FC44.name}"
      },
      "undefined_testitworks_Handler_IamRolePolicyAttachment_76744290": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:it works/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testitworks_Handler_IamRolePolicyAttachment_76744290"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testitworks_Handler_IamRole_2AEE5A9F.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_PreflightClass_cloudFunction_3780B982": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PreflightClass/cloud.Function/Default",
            "uniqueId": "undefined_PreflightClass_cloudFunction_3780B982"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_2113838a": "${aws_s3_bucket.undefined_PreflightClass_cloudBucket_8098BB25.bucket}",
            "WING_FUNCTION_NAME": "cloud-Function-c8cc7410",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8cc7410",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_PreflightClass_cloudFunction_IamRole_B07C368C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_PreflightClass_cloudFunction_S3Object_883C3E04.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_7067D1CE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class inside closure captures from closure/Handler/Default",
            "uniqueId": "undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_7067D1CE"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8c38993",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8c38993",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_BCC7FC44.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_S3Object_731D6153.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testitworks_Handler_6CFD1875": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:it works/Handler/Default",
            "uniqueId": "undefined_testitworks_Handler_6CFD1875"
          }
        },
        "environment": {
          "variables": {
            "FUNCTION_NAME_87d21b8c": "${aws_lambda_function.undefined_PreflightClass_cloudFunction_3780B982.arn}",
            "WING_FUNCTION_NAME": "Handler-c8d20d5b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8d20d5b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testitworks_Handler_IamRole_2AEE5A9F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testitworks_Handler_S3Object_4AFFB7CD.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      },
      "undefined_PreflightClass_cloudBucket_8098BB25": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PreflightClass/cloud.Bucket/Default",
            "uniqueId": "undefined_PreflightClass_cloudBucket_8098BB25"
          }
        },
        "bucket_prefix": "cloud-bucket-c8c585f7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "undefined_PreflightClass_cloudBucket_PublicAccessBlock_1B616A28": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PreflightClass/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "undefined_PreflightClass_cloudBucket_PublicAccessBlock_1B616A28"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_PreflightClass_cloudBucket_8098BB25.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "undefined_PreflightClass_cloudBucket_Encryption_D729E99C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PreflightClass/cloud.Bucket/Encryption",
            "uniqueId": "undefined_PreflightClass_cloudBucket_Encryption_D729E99C"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_PreflightClass_cloudBucket_8098BB25.bucket}",
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
      "undefined_PreflightClass_cloudFunction_S3Object_883C3E04": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PreflightClass/cloud.Function/S3Object",
            "uniqueId": "undefined_PreflightClass_cloudFunction_S3Object_883C3E04"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_S3Object_731D6153": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class inside closure captures from closure/Handler/S3Object",
            "uniqueId": "undefined_testinflightclassinsideclosurecapturesfromclosure_Handler_S3Object_731D6153"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testitworks_Handler_S3Object_4AFFB7CD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:it works/Handler/S3Object",
            "uniqueId": "undefined_testitworks_Handler_S3Object_4AFFB7CD"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
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
    class PreflightClass extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
      preflight_method() {
        const __parent_this_1 = this;
        class $Closure1 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle", "$inflight_init");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            return $stdlib.core.NodeJsCode.fromInline(`
              require("./inflight.$Closure1.js")({
                $__parent_this_1_b: ${context._lift(__parent_this_1.b)},
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
              $Closure1._registerBindObject(__parent_this_1.b, host, ["put"]);
            }
            super._registerBind(host, ops);
          }
        }
        const inflight_closure = new $Closure1(this,"$Closure1");
        return this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",inflight_closure);
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.PreflightClass.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const PreflightClassClient = ${PreflightClass._toInflightType(this).text};
            const client = new PreflightClassClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
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
            $f: ${context._lift(f)},
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
          $Closure2._registerBindObject(f, host, ["invoke"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this).text};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    const p = new PreflightClass(this,"PreflightClass");
    const f = (p.preflight_method());
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:it works",new $Closure2(this,"$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight class inside closure captures from closure",new $Closure3(this,"$Closure3"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inflight_class_inside_inflight_closure", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

