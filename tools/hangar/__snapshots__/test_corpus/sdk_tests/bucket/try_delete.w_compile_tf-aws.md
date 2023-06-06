# [try_delete.w](../../../../../../examples/tests/sdk_tests/bucket/try_delete.w) | compile | tf-aws

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
      const jsonObj2 = Object.freeze({"key2":"value2"});
      (await b.put("file1.txt","Foo"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.tryDelete("file1.txt")) === true)'`)})(((await b.tryDelete("file1.txt")) === true))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.tryDelete("file1.txt")) === false)'`)})(((await b.tryDelete("file1.txt")) === false))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.tryDelete("random")) === false)'`)})(((await b.tryDelete("random")) === false))};
      (await b.put("file2.txt","Bar"));
      (await b.putJson("file2.json",jsonObj2));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.tryDelete("file2.txt")) === true)'`)})(((await b.tryDelete("file2.txt")) === true))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.tryDelete("file2.json")) === true)'`)})(((await b.tryDelete("file2.json")) === true))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.tryDelete("file2.txt")) === false)'`)})(((await b.tryDelete("file2.txt")) === false))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.tryDelete("file2.json")) === false)'`)})(((await b.tryDelete("file2.json")) === false))};
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
      "value": "[[\"root/Default/Default/test:tryDelete\",\"${aws_lambda_function.root_testtryDelete_Handler_5B5B7840.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testtryDelete_Handler_IamRole_F3282D1A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryDelete/Handler/IamRole",
            "uniqueId": "root_testtryDelete_Handler_IamRole_F3282D1A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testtryDelete_Handler_IamRolePolicy_E6E56C4A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryDelete/Handler/IamRolePolicy",
            "uniqueId": "root_testtryDelete_Handler_IamRolePolicy_E6E56C4A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testtryDelete_Handler_IamRole_F3282D1A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testtryDelete_Handler_IamRolePolicyAttachment_080461CD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryDelete/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testtryDelete_Handler_IamRolePolicyAttachment_080461CD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testtryDelete_Handler_IamRole_F3282D1A.name}"
      }
    },
    "aws_lambda_function": {
      "root_testtryDelete_Handler_5B5B7840": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryDelete/Handler/Default",
            "uniqueId": "root_testtryDelete_Handler_5B5B7840"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "Handler-c85151e8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85151e8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testtryDelete_Handler_IamRole_F3282D1A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testtryDelete_Handler_S3Object_8C99824E.key}",
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
      "root_testtryDelete_Handler_S3Object_8C99824E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryDelete/Handler/S3Object",
            "uniqueId": "root_testtryDelete_Handler_S3Object_8C99824E"
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
          $Closure1._registerBindObject(b, host, ["put", "putJson", "tryDelete"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:tryDelete",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "try_delete", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

