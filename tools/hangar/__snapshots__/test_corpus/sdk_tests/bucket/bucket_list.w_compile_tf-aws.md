# [bucket_list.w](../../../../../../examples/tests/sdk_tests/bucket/bucket_list.w) | compile | tf-aws

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
      const jsonObj1 = Object.freeze({"key1":"value1"});
      {((cond) => {if (!cond) throw new Error("assertion failed: b.list().length == 1")})(((await b.list()).length === 1))};
      (await b.putJson("file1.json",jsonObj1));
      (await b.put("file2.txt","Bar"));
      (await b.put("random","Buz"));
      const objs = (await b.list());
      const objs2 = (await b.list("file"));
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.contains(\"file1.json\")")})(objs.includes("file1.json"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.contains(\"file2.txt\")")})(objs.includes("file2.txt"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.contains(\"file3.txt\")")})(objs.includes("file3.txt"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.contains(\"random\")")})(objs.includes("random"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs2.contains(\"file1.json\")")})(objs2.includes("file1.json"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs2.contains(\"file2.txt\")")})(objs2.includes("file2.txt"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs2.contains(\"file3.txt\")")})(objs2.includes("file3.txt"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !objs2.contains(\"random\")")})((!objs2.includes("random")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.length == 4")})((objs.length === 4))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs2.length == 3")})((objs2.length === 3))};
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
      "value": "[[\"root/Default/Default/test:list\",\"${aws_lambda_function.root_testlist_Handler_EFBD85FC.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testlist_Handler_IamRole_4D7098F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/IamRole",
            "uniqueId": "root_testlist_Handler_IamRole_4D7098F9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testlist_Handler_IamRolePolicy_039D0595": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/IamRolePolicy",
            "uniqueId": "root_testlist_Handler_IamRolePolicy_039D0595"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testlist_Handler_IamRole_4D7098F9.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testlist_Handler_IamRolePolicyAttachment_59333345": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testlist_Handler_IamRolePolicyAttachment_59333345"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testlist_Handler_IamRole_4D7098F9.name}"
      }
    },
    "aws_lambda_function": {
      "root_testlist_Handler_EFBD85FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/Default",
            "uniqueId": "root_testlist_Handler_EFBD85FC"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "Handler-c8867143",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8867143",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testlist_Handler_IamRole_4D7098F9.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testlist_Handler_S3Object_68237BDC.key}",
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
      "root_cloudBucket_S3Objectfile3txt_7A4012BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3Object-file3.txt",
            "uniqueId": "root_cloudBucket_S3Objectfile3txt_7A4012BD"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "content": "Baz",
        "key": "file3.txt"
      },
      "root_testlist_Handler_S3Object_68237BDC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/S3Object",
            "uniqueId": "root_testlist_Handler_S3Object_68237BDC"
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
        const self_client_path = "././inflight.$Closure1.js";
        const b_client = context._lift(b);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            b: ${b_client},
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
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "bucket_list", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

