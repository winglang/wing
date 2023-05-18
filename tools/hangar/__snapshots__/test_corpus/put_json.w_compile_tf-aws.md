# [put_json.w](../../../../examples/tests/valid/put_json.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ b }) {
  class  $Inflight1 {
    constructor({  }) {
    }
    async handle()  {
      {
        const jsonObj1 = Object.freeze({"test":"test1"});
        const jsonObj2 = Object.freeze({"test":"test2"});
        (typeof b.putJson === "function" ? await b.putJson("test1.txt",jsonObj1) : await b.putJson.handle("test1.txt",jsonObj1));
        (typeof b.putJson === "function" ? await b.putJson("test2.txt",jsonObj2) : await b.putJson.handle("test2.txt",jsonObj2));
        const testJson1 = (typeof b.getJson === "function" ? await b.getJson("test1.txt") : await b.getJson.handle("test1.txt"));
        const testJson2 = (typeof b.getJson === "function" ? await b.getJson("test2.txt") : await b.getJson.handle("test2.txt"));
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((testJson1)["test"] === (jsonObj1)["test"])'`)})(((testJson1)["test"] === (jsonObj1)["test"]))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((testJson2)["test"] === (jsonObj2)["test"])'`)})(((testJson2)["test"] === (jsonObj2)["test"]))};
        const jsonObj3 = Object.freeze({"test":"test3"});
        (typeof b.putJson === "function" ? await b.putJson("test3.txt",jsonObj3) : await b.putJson.handle("test3.txt",jsonObj3));
        const testJson3 = (typeof b.getJson === "function" ? await b.getJson("test3.txt") : await b.getJson.handle("test3.txt"));
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((testJson3)["test"] === (jsonObj3)["test"])'`)})(((testJson3)["test"] === (jsonObj3)["test"]))};
        (typeof b.delete === "function" ? await b.delete("test1.txt") : await b.delete.handle("test1.txt"));
        const files = (typeof b.list === "function" ? await b.list() : await b.list.handle());
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(files.includes("test1.txt") === false)'`)})((files.includes("test1.txt") === false))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(files.includes("test2.txt") === true)'`)})((files.includes("test2.txt") === true))};
      }
    }
  }
  return $Inflight1;
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
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testputJson_IamRole_CEDB4108": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/IamRole",
            "uniqueId": "root_testputJson_IamRole_CEDB4108"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testputJson_IamRolePolicy_D106D26E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/IamRolePolicy",
            "uniqueId": "root_testputJson_IamRolePolicy_D106D26E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testputJson_IamRole_CEDB4108.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testputJson_IamRolePolicyAttachment_3F78BC95": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/IamRolePolicyAttachment",
            "uniqueId": "root_testputJson_IamRolePolicyAttachment_3F78BC95"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testputJson_IamRole_CEDB4108.name}"
      }
    },
    "aws_lambda_function": {
      "root_testputJson_074D2C39": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/Default",
            "uniqueId": "root_testputJson_074D2C39"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "test-putJson-c8b24c50"
          }
        },
        "function_name": "test-putJson-c8b24c50",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testputJson_IamRole_CEDB4108.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testputJson_S3Object_70486645.key}",
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
      "root_testputJson_S3Object_70486645": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/S3Object",
            "uniqueId": "root_testputJson_S3Object_70486645"
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
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
        }
        if (ops.includes("handle")) {
          this._registerBindObject(b, host, ["delete", "getJson", "list", "putJson"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:putJson",new $Inflight1(this,"$Inflight1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "put_json", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

