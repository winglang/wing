# [bucket_list.w](../../../../../../examples/tests/sdk_tests/bucket/bucket_list.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jsonObj1 = ({"key1": "value1"});
      {((cond) => {if (!cond) throw new Error("assertion failed: b.list().length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.list()).length,1)))};
      (await $b.putJson("file1.json",jsonObj1));
      (await $b.put("file2.txt","Bar"));
      (await $b.put("random","Buz"));
      const objs = (await $b.list());
      const objs2 = (await $b.list("file"));
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.contains(\"file1.json\")")})(objs.includes("file1.json"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.contains(\"file2.txt\")")})(objs.includes("file2.txt"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.contains(\"file3.txt\")")})(objs.includes("file3.txt"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.contains(\"random\")")})(objs.includes("random"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs2.contains(\"file1.json\")")})(objs2.includes("file1.json"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs2.contains(\"file2.txt\")")})(objs2.includes("file2.txt"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs2.contains(\"file3.txt\")")})(objs2.includes("file3.txt"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !objs2.contains(\"random\")")})((!objs2.includes("random")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.length == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(objs.length,4)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs2.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(objs2.length,3)))};
    }
  }
  return $Closure1;
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
      "value": "[[\"root/Default/Default/test:list\",\"${aws_lambda_function.testlist_Handler_58856559.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testlist_Handler_IamRole_1E7E84A8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/IamRole",
            "uniqueId": "testlist_Handler_IamRole_1E7E84A8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testlist_Handler_IamRolePolicy_7EFE6464": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/IamRolePolicy",
            "uniqueId": "testlist_Handler_IamRolePolicy_7EFE6464"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testlist_Handler_IamRole_1E7E84A8.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testlist_Handler_IamRolePolicyAttachment_913EEFDF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/IamRolePolicyAttachment",
            "uniqueId": "testlist_Handler_IamRolePolicyAttachment_913EEFDF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testlist_Handler_IamRole_1E7E84A8.name}"
      }
    },
    "aws_lambda_function": {
      "testlist_Handler_58856559": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/Default",
            "uniqueId": "testlist_Handler_58856559"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8867143",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8867143",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testlist_Handler_IamRole_1E7E84A8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testlist_Handler_S3Object_8A6D3046.key}",
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
      "cloudBucket_S3Object-file3txt_DFC4715B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3Object-file3.txt",
            "uniqueId": "cloudBucket_S3Object-file3txt_DFC4715B"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "content": "Baz",
        "key": "file3.txt"
      },
      "testlist_Handler_S3Object_8A6D3046": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/S3Object",
            "uniqueId": "testlist_Handler_S3Object_8A6D3046"
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $b: ${context._lift(b)},
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
          $Closure1._registerBindObject(b, host, ["list", "put", "putJson"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    (b.addObject("file3.txt","Baz"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:list",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bucket_list", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

