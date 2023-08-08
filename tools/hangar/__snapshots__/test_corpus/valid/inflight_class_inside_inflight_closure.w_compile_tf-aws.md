# [inflight_class_inside_inflight_closure.w](../../../../../examples/tests/valid/inflight_class_inside_inflight_closure.w) | compile | tf-aws

## inflight.$Closure1-e09919c2.js
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

## inflight.$Closure2-e09919c2.js
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

## inflight.$Closure3-e09919c2.js
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

## inflight.PreflightClass-e09919c2.js
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
      "value": "[[\"root/Default/Default/test:it works\",\"${aws_lambda_function.testitworks_Handler_FCB0C220.arn}\"],[\"root/Default/Default/test:inflight class inside closure captures from closure\",\"${aws_lambda_function.testinflightclassinsideclosurecapturesfromclosure_Handler_9491D6BF.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "PreflightClass_cloudFunction_IamRole_60AD4A3B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/IamRole",
            "uniqueId": "PreflightClass_cloudFunction_IamRole_60AD4A3B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_64F90E13": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class inside closure captures from closure/Handler/IamRole",
            "uniqueId": "testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_64F90E13"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testitworks_Handler_IamRole_D05BB31A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:it works/Handler/IamRole",
            "uniqueId": "testitworks_Handler_IamRole_D05BB31A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "PreflightClass_cloudFunction_IamRolePolicy_B064DBB3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/IamRolePolicy",
            "uniqueId": "PreflightClass_cloudFunction_IamRolePolicy_B064DBB3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.PreflightClass_cloudBucket_05421049.arn}\",\"${aws_s3_bucket.PreflightClass_cloudBucket_05421049.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.PreflightClass_cloudFunction_IamRole_60AD4A3B.name}"
      },
      "testinflightclassinsideclosurecapturesfromclosure_Handler_IamRolePolicy_BE5614D6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class inside closure captures from closure/Handler/IamRolePolicy",
            "uniqueId": "testinflightclassinsideclosurecapturesfromclosure_Handler_IamRolePolicy_BE5614D6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_64F90E13.name}"
      },
      "testitworks_Handler_IamRolePolicy_266A722B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:it works/Handler/IamRolePolicy",
            "uniqueId": "testitworks_Handler_IamRolePolicy_266A722B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.PreflightClass_cloudFunction_9F7C6688.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testitworks_Handler_IamRole_D05BB31A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "PreflightClass_cloudFunction_IamRolePolicyAttachment_008B87A9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "PreflightClass_cloudFunction_IamRolePolicyAttachment_008B87A9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.PreflightClass_cloudFunction_IamRole_60AD4A3B.name}"
      },
      "testinflightclassinsideclosurecapturesfromclosure_Handler_IamRolePolicyAttachment_E9CAC6A2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class inside closure captures from closure/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightclassinsideclosurecapturesfromclosure_Handler_IamRolePolicyAttachment_E9CAC6A2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_64F90E13.name}"
      },
      "testitworks_Handler_IamRolePolicyAttachment_D4A532DA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:it works/Handler/IamRolePolicyAttachment",
            "uniqueId": "testitworks_Handler_IamRolePolicyAttachment_D4A532DA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testitworks_Handler_IamRole_D05BB31A.name}"
      }
    },
    "aws_lambda_function": {
      "PreflightClass_cloudFunction_9F7C6688": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/Default",
            "uniqueId": "PreflightClass_cloudFunction_9F7C6688"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_70ca4fed": "${aws_s3_bucket.PreflightClass_cloudBucket_05421049.bucket}",
            "WING_FUNCTION_NAME": "cloud-Function-c8db99e3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8db99e3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.PreflightClass_cloudFunction_IamRole_60AD4A3B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.PreflightClass_cloudFunction_S3Object_D4E803CB.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testinflightclassinsideclosurecapturesfromclosure_Handler_9491D6BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class inside closure captures from closure/Handler/Default",
            "uniqueId": "testinflightclassinsideclosurecapturesfromclosure_Handler_9491D6BF"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c866c5da",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c866c5da",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightclassinsideclosurecapturesfromclosure_Handler_IamRole_64F90E13.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightclassinsideclosurecapturesfromclosure_Handler_S3Object_73ACC1FD.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testitworks_Handler_FCB0C220": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:it works/Handler/Default",
            "uniqueId": "testitworks_Handler_FCB0C220"
          }
        },
        "environment": {
          "variables": {
            "FUNCTION_NAME_31bff872": "${aws_lambda_function.PreflightClass_cloudFunction_9F7C6688.arn}",
            "WING_FUNCTION_NAME": "Handler-c834f611",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c834f611",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testitworks_Handler_IamRole_D05BB31A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testitworks_Handler_S3Object_0FB5D970.key}",
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
      "PreflightClass_cloudBucket_05421049": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Bucket/Default",
            "uniqueId": "PreflightClass_cloudBucket_05421049"
          }
        },
        "bucket_prefix": "cloud-bucket-c8bbe938-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "PreflightClass_cloudBucket_PublicAccessBlock_0331EFEC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "PreflightClass_cloudBucket_PublicAccessBlock_0331EFEC"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.PreflightClass_cloudBucket_05421049.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "PreflightClass_cloudBucket_Encryption_30FD2B0E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Bucket/Encryption",
            "uniqueId": "PreflightClass_cloudBucket_Encryption_30FD2B0E"
          }
        },
        "bucket": "${aws_s3_bucket.PreflightClass_cloudBucket_05421049.bucket}",
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
      "PreflightClass_cloudFunction_S3Object_D4E803CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/S3Object",
            "uniqueId": "PreflightClass_cloudFunction_S3Object_D4E803CB"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testinflightclassinsideclosurecapturesfromclosure_Handler_S3Object_73ACC1FD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class inside closure captures from closure/Handler/S3Object",
            "uniqueId": "testinflightclassinsideclosurecapturesfromclosure_Handler_S3Object_73ACC1FD"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testitworks_Handler_S3Object_0FB5D970": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:it works/Handler/S3Object",
            "uniqueId": "testitworks_Handler_S3Object_0FB5D970"
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
              require("./inflight.$Closure1-e09919c2.js")({
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
          require("./inflight.PreflightClass-e09919c2.js")({
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
          require("./inflight.$Closure2-e09919c2.js")({
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
          require("./inflight.$Closure3-e09919c2.js")({
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
new $App({ outdir: $outdir, name: "inflight_class_inside_inflight_closure", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

