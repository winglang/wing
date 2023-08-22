# [test_bucket.w](../../../../../examples/tests/valid/test_bucket.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: b.list().length == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.list()).length,0)))};
      (await $b.put("hello.txt","world"));
      {((cond) => {if (!cond) throw new Error("assertion failed: b.list().length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.list()).length,1)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $b }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b.put("hello.txt","world"));
      {((cond) => {if (!cond) throw new Error("assertion failed: b.get(\"hello.txt\") == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.get("hello.txt")),"world")))};
    }
  }
  return $Closure2;
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
      "value": "[[\"root/Default/Default/test:put\",\"${aws_lambda_function.testput_Handler_724F92D5.arn}\"],[\"root/Default/Default/test:get\",\"${aws_lambda_function.testget_Handler_67989B36.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testget_Handler_IamRole_AA97A8BA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/Handler/IamRole",
            "uniqueId": "testget_Handler_IamRole_AA97A8BA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testput_Handler_IamRole_0914AA2F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/Handler/IamRole",
            "uniqueId": "testput_Handler_IamRole_0914AA2F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testget_Handler_IamRolePolicy_393F6CAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/Handler/IamRolePolicy",
            "uniqueId": "testget_Handler_IamRolePolicy_393F6CAD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testget_Handler_IamRole_AA97A8BA.name}"
      },
      "testput_Handler_IamRolePolicy_CB5C72C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/Handler/IamRolePolicy",
            "uniqueId": "testput_Handler_IamRolePolicy_CB5C72C0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testput_Handler_IamRole_0914AA2F.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testget_Handler_IamRolePolicyAttachment_CF094E80": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/Handler/IamRolePolicyAttachment",
            "uniqueId": "testget_Handler_IamRolePolicyAttachment_CF094E80"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testget_Handler_IamRole_AA97A8BA.name}"
      },
      "testput_Handler_IamRolePolicyAttachment_B3A1DDC2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/Handler/IamRolePolicyAttachment",
            "uniqueId": "testput_Handler_IamRolePolicyAttachment_B3A1DDC2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testput_Handler_IamRole_0914AA2F.name}"
      }
    },
    "aws_lambda_function": {
      "testget_Handler_67989B36": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/Handler/Default",
            "uniqueId": "testget_Handler_67989B36"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c89a33bd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c89a33bd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testget_Handler_IamRole_AA97A8BA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testget_Handler_S3Object_991F0EC4.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testput_Handler_724F92D5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/Handler/Default",
            "uniqueId": "testput_Handler_724F92D5"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8a253bd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a253bd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testput_Handler_IamRole_0914AA2F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testput_Handler_S3Object_920402A2.key}",
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
      "testget_Handler_S3Object_991F0EC4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/Handler/S3Object",
            "uniqueId": "testget_Handler_S3Object_991F0EC4"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testput_Handler_S3Object_920402A2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/Handler/S3Object",
            "uniqueId": "testput_Handler_S3Object_920402A2"
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
const $constructs = require('constructs');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $constructs.Construct {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $constructs.Construct {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $b: ${$stdlib.core.Lifting.lift(context, b)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $stdlib.std.Resource._registerBindObject(b, host, ["list", "put"]);
        }
      }
      static _registerTypeBind(host, ops) {
      }
    }
    class $Closure2 extends $constructs.Construct {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $b: ${$stdlib.core.Lifting.lift(context, b)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $stdlib.std.Resource._registerBindObject(b, host, ["get", "put"]);
        }
      }
      static _registerTypeBind(host, ops) {
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:put",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:get",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "test_bucket", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

