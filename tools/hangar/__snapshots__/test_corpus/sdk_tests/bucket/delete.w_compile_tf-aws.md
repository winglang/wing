# [delete.w](../../../../../../examples/tests/sdk_tests/bucket/delete.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      let error = "";
      const jsonObj1 = Object.freeze({"key1":"value1"});
      (await b.putJson("file1.json",jsonObj1));
      (await b.delete("file1.txt"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await b.exists("file1.json"))'`)})((await b.exists("file1.json")))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await b.exists("file2.txt"))'`)})((await b.exists("file2.txt")))};
      (await b.delete("file1.json",Object.freeze({"mustExist":true})));
      try {
        (await b.delete("file1.json",Object.freeze({"mustExist":true})));
      }
      catch ($error_e) {
        const e = $error_e.message;
        error = e;
      }
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "Object does not exist (key=file1.json).")'`)})((error === "Object does not exist (key=file1.json)."))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await b.exists("file2.txt"))'`)})((await b.exists("file2.txt")))};
      (await b.delete("file2.txt"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(!(await b.exists("file2.txt")))'`)})((!(await b.exists("file2.txt"))))};
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
      "value": "[[\"root/Default/Default/test:delete\",\"${aws_lambda_function.root_testdelete_Handler_398401C7.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testdelete_Handler_IamRole_0F45E7FD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:delete/Handler/IamRole",
            "uniqueId": "root_testdelete_Handler_IamRole_0F45E7FD"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testdelete_Handler_IamRolePolicy_A650187C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:delete/Handler/IamRolePolicy",
            "uniqueId": "root_testdelete_Handler_IamRolePolicy_A650187C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testdelete_Handler_IamRole_0F45E7FD.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testdelete_Handler_IamRolePolicyAttachment_B2FC94EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:delete/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testdelete_Handler_IamRolePolicyAttachment_B2FC94EF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testdelete_Handler_IamRole_0F45E7FD.name}"
      }
    },
    "aws_lambda_function": {
      "root_testdelete_Handler_398401C7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:delete/Handler/Default",
            "uniqueId": "root_testdelete_Handler_398401C7"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "Handler-c8edf1bd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8edf1bd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testdelete_Handler_IamRole_0F45E7FD.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testdelete_Handler_S3Object_B655C36A.key}",
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
      "root_cloudBucket_4F3C4F53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "root_cloudBucket_4F3C4F53"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_cloudBucket_PublicAccessBlock_319C1C2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_cloudBucket_PublicAccessBlock_319C1C2E"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_cloudBucket_Encryption_8ED0CD9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "root_cloudBucket_Encryption_8ED0CD9C"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
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
      "root_cloudBucket_S3Objectfile2txt_2A0B5D22": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3Object-file2.txt",
            "uniqueId": "root_cloudBucket_S3Objectfile2txt_2A0B5D22"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "content": "Bar",
        "key": "file2.txt"
      },
      "root_testdelete_Handler_S3Object_B655C36A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:delete/Handler/S3Object",
            "uniqueId": "root_testdelete_Handler_S3Object_B655C36A"
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            b: ${context._lift(b, ["delete", "exists", "putJson"])},
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
          $Closure1._registerBindObject(b, host, []);
        }
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
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "delete", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

