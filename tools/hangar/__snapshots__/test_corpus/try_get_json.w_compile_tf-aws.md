# [try_get_json.w](../../../../examples/tests/valid/try_get_json.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ b }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const jsonObj1 = Object.freeze({"key1":"value1"});
      const jsonObj2 = Object.freeze({"key2":"value2"});
      (await b.putJson("file1.json",jsonObj1));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { return JSON.stringify(args[0], null, args[1]) })([(await b.tryGetJson("file1.json"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([jsonObj1]))'`)})((((args) => { return JSON.stringify(args[0], null, args[1]) })([(await b.tryGetJson("file1.json"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([jsonObj1])))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.tryGetJson("file2.json")) === undefined)'`)})(((await b.tryGetJson("file2.json")) === undefined))};
      (await b.putJson("file2.json",jsonObj2));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { return JSON.stringify(args[0], null, args[1]) })([(await b.tryGetJson("file2.json"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([jsonObj2]))'`)})((((args) => { return JSON.stringify(args[0], null, args[1]) })([(await b.tryGetJson("file2.json"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([jsonObj2])))};
      (await b.delete("file1.json"));
      (await b.delete("file2.json"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.tryGetJson("file1.json")) === undefined)'`)})(((await b.tryGetJson("file1.json")) === undefined))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.tryGetJson("file2.json")) === undefined)'`)})(((await b.tryGetJson("file2.json")) === undefined))};
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
      "value": "[[\"root/Default/Default/test:tryGetJson\",\"${aws_lambda_function.root_testtryGetJson_Handler_A06B9978.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testtryGetJson_Handler_IamRole_C576788E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGetJson/Handler/IamRole",
            "uniqueId": "root_testtryGetJson_Handler_IamRole_C576788E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testtryGetJson_Handler_IamRolePolicy_3E0C59F3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGetJson/Handler/IamRolePolicy",
            "uniqueId": "root_testtryGetJson_Handler_IamRolePolicy_3E0C59F3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testtryGetJson_Handler_IamRole_C576788E.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testtryGetJson_Handler_IamRolePolicyAttachment_84FA982E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGetJson/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testtryGetJson_Handler_IamRolePolicyAttachment_84FA982E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testtryGetJson_Handler_IamRole_C576788E.name}"
      }
    },
    "aws_lambda_function": {
      "root_testtryGetJson_Handler_A06B9978": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGetJson/Handler/Default",
            "uniqueId": "root_testtryGetJson_Handler_A06B9978"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "Handler-c8858898"
          }
        },
        "function_name": "Handler-c8858898",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testtryGetJson_Handler_IamRole_C576788E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testtryGetJson_Handler_S3Object_9ACD3FFF.key}",
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
      "root_testtryGetJson_Handler_S3Object_9ACD3FFF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGetJson/Handler/S3Object",
            "uniqueId": "root_testtryGetJson_Handler_S3Object_9ACD3FFF"
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
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js";
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
          $Inflight1._registerBindObject(b, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(b, host, ["delete", "putJson", "tryGetJson"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:tryGetJson",new $Inflight1(this,"$Inflight1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "try_get_json", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

