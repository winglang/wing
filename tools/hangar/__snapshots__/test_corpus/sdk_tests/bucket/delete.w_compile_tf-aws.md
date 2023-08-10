# [delete.w](../../../../../../examples/tests/sdk_tests/bucket/delete.w) | compile | tf-aws

## inflight.$Closure1-dc360ab2.js
```js
module.exports = function({ $b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      let error = "";
      const jsonObj1 = ({"key1": "value1"});
      (await $b.putJson("file1.json",jsonObj1));
      (await $b.delete("file1.txt"));
      {((cond) => {if (!cond) throw new Error("assertion failed: b.exists(\"file1.json\")")})((await $b.exists("file1.json")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.exists(\"file2.txt\")")})((await $b.exists("file2.txt")))};
      (await $b.delete("file1.json",{ mustExist: true }));
      try {
        (await $b.delete("file1.json",{ mustExist: true }));
      }
      catch ($error_e) {
        const e = $error_e.message;
        error = e;
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: error == \"Object does not exist (key=file1.json).\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(error,"Object does not exist (key=file1.json).")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.exists(\"file2.txt\")")})((await $b.exists("file2.txt")))};
      (await $b.delete("file2.txt"));
      {((cond) => {if (!cond) throw new Error("assertion failed: !b.exists(\"file2.txt\")")})((!(await $b.exists("file2.txt"))))};
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
      "value": "[[\"root/Default/Default/test:delete\",\"${aws_lambda_function.testdelete_Handler_3DFCE06A.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testdelete_Handler_IamRole_0B29F48A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:delete/Handler/IamRole",
            "uniqueId": "testdelete_Handler_IamRole_0B29F48A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testdelete_Handler_IamRolePolicy_D6FF0B67": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:delete/Handler/IamRolePolicy",
            "uniqueId": "testdelete_Handler_IamRolePolicy_D6FF0B67"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testdelete_Handler_IamRole_0B29F48A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testdelete_Handler_IamRolePolicyAttachment_F5BB5ED1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:delete/Handler/IamRolePolicyAttachment",
            "uniqueId": "testdelete_Handler_IamRolePolicyAttachment_F5BB5ED1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testdelete_Handler_IamRole_0B29F48A.name}"
      }
    },
    "aws_lambda_function": {
      "testdelete_Handler_3DFCE06A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:delete/Handler/Default",
            "uniqueId": "testdelete_Handler_3DFCE06A"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8edf1bd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8edf1bd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testdelete_Handler_IamRole_0B29F48A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testdelete_Handler_S3Object_3216CE50.key}",
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
      "cloudBucket_S3Object-file2txt_C6672D6C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3Object-file2.txt",
            "uniqueId": "cloudBucket_S3Object-file2txt_C6672D6C"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "content": "Bar",
        "key": "file2.txt"
      },
      "testdelete_Handler_S3Object_3216CE50": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:delete/Handler/S3Object",
            "uniqueId": "testdelete_Handler_S3Object_3216CE50"
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
          require("./inflight.$Closure1-dc360ab2.js")({
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
          $Closure1._registerBindObject(b, host, ["delete", "exists", "putJson"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    (b.addObject("file2.txt","Bar"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:delete",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "delete", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

