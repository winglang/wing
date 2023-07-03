# [try_get.w](../../../../../../examples/tests/sdk_tests/bucket/try_get.w) | compile | tf-aws

## inflight.$Closure1.js

```js
module.exports = function ({ b }) {
  class $Closure1 {
    constructor({}) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init() {}
    async handle() {
      await b.put("test1.txt", "Foo");
      {
        ((cond) => {
          if (!cond)
            throw new Error('assertion failed: b.tryGet("test1.txt") == "Foo"');
        })((await b.tryGet("test1.txt")) === "Foo");
      }
      {
        ((cond) => {
          if (!cond)
            throw new Error('assertion failed: b.tryGet("test2.txt") == nil');
        })((await b.tryGet("test2.txt")) === undefined);
      }
      await b.put("test2.txt", "Bar");
      {
        ((cond) => {
          if (!cond)
            throw new Error('assertion failed: b.tryGet("test2.txt") == "Bar"');
        })((await b.tryGet("test2.txt")) === "Bar");
      }
      await b.delete("test1.txt");
      {
        ((cond) => {
          if (!cond)
            throw new Error('assertion failed: b.tryGet("test1.txt") == nil');
        })((await b.tryGet("test1.txt")) === undefined);
      }
    }
  }
  return $Closure1;
};
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
      "value": "[[\"root/Default/Default/test:tryGet\",\"${aws_lambda_function.testtryGet_Handler_EE8DDBD9.arn}\"]]"
    }
  },
  "provider": {
    "aws": [{}]
  },
  "resource": {
    "aws_iam_role": {
      "testtryGet_Handler_IamRole_04D8F7C5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGet/Handler/IamRole",
            "uniqueId": "testtryGet_Handler_IamRole_04D8F7C5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testtryGet_Handler_IamRolePolicy_23F604C9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGet/Handler/IamRolePolicy",
            "uniqueId": "testtryGet_Handler_IamRolePolicy_23F604C9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testtryGet_Handler_IamRole_04D8F7C5.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testtryGet_Handler_IamRolePolicyAttachment_025C3AD6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGet/Handler/IamRolePolicyAttachment",
            "uniqueId": "testtryGet_Handler_IamRolePolicyAttachment_025C3AD6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testtryGet_Handler_IamRole_04D8F7C5.name}"
      }
    },
    "aws_lambda_function": {
      "testtryGet_Handler_EE8DDBD9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGet/Handler/Default",
            "uniqueId": "testtryGet_Handler_EE8DDBD9"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "Handler-c85da482",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85da482",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testtryGet_Handler_IamRole_04D8F7C5.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testtryGet_Handler_S3Object_2C3F6849.key}",
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
      "testtryGet_Handler_S3Object_2C3F6849": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGet/Handler/S3Object",
            "uniqueId": "testtryGet_Handler_S3Object_2C3F6849"
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
const $stdlib = require("@winglang/sdk");
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require("@winglang/sdk").cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
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
          $Closure1._registerBindObject(b, host, ["delete", "put", "tryGet"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract(
      "@winglang/sdk.cloud.Bucket",
      this,
      "cloud.Bucket"
    );
    this.node.root.new(
      "@winglang/sdk.std.Test",
      std.Test,
      this,
      "test:tryGet",
      new $Closure1(this, "$Closure1")
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({
      outdir: $outdir,
      name: "try_get",
      plugins: $plugins,
      isTestEnvironment: $wing_is_test,
    });
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
