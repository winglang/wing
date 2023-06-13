# [add_object.w](../../../../../../examples/tests/sdk_tests/bucket/add_object.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ b, jsonObj1, std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.list()).length === 2)'`)})(((await b.list()).length === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { return JSON.stringify(args[0], null, args[1]) })([(await b.getJson("file1.json"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([jsonObj1]))'`)})((((args) => { return JSON.stringify(args[0], null, args[1]) })([(await b.getJson("file1.json"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([jsonObj1])))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.get("file2.txt")) === "Bar")'`)})(((await b.get("file2.txt")) === "Bar"))};
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
      "value": "[[\"root/Default/Default/test:addObject\",\"${aws_lambda_function.root_testaddObject_Handler_F15F7809.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testaddObject_Handler_IamRole_CCB55BBB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addObject/Handler/IamRole",
            "uniqueId": "root_testaddObject_Handler_IamRole_CCB55BBB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testaddObject_Handler_IamRolePolicy_26F3ADD3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addObject/Handler/IamRolePolicy",
            "uniqueId": "root_testaddObject_Handler_IamRolePolicy_26F3ADD3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testaddObject_Handler_IamRole_CCB55BBB.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testaddObject_Handler_IamRolePolicyAttachment_603985A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addObject/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testaddObject_Handler_IamRolePolicyAttachment_603985A4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testaddObject_Handler_IamRole_CCB55BBB.name}"
      }
    },
    "aws_lambda_function": {
      "root_testaddObject_Handler_F15F7809": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addObject/Handler/Default",
            "uniqueId": "root_testaddObject_Handler_F15F7809"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "Handler-c89ea41b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c89ea41b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testaddObject_Handler_IamRole_CCB55BBB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testaddObject_Handler_S3Object_1AADCBC8.key}",
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
      "root_cloudBucket_S3Objectfile1json_2AA43972": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3Object-file1.json",
            "uniqueId": "root_cloudBucket_S3Objectfile1json_2AA43972"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "content": "{\"key1\":\"value1\"}",
        "key": "file1.json"
      },
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
      "root_testaddObject_Handler_S3Object_1AADCBC8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addObject/Handler/S3Object",
            "uniqueId": "root_testaddObject_Handler_S3Object_1AADCBC8"
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
        const std_JsonClient = std.Json._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            b: ${context._lift(b, ["get", "getJson", "list"])},
            jsonObj1: ${context._lift(jsonObj1, [])},
            std_Json: ${std_JsonClient.text},
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
          $Closure1._registerBindObject(jsonObj1, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(b, host, ["get", "getJson", "list"]);
          $Closure1._registerBindObject(jsonObj1, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const jsonObj1 = Object.freeze({"key1":"value1"});
    (b.addObject("file1.json",((args) => { return JSON.stringify(args[0], null, args[1]) })([jsonObj1])));
    (b.addObject("file2.txt","Bar"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:addObject",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "add_object", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

