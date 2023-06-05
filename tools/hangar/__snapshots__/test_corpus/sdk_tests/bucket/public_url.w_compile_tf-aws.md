# [public_url.w](../../../../../../examples/tests/sdk_tests/bucket/public_url.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ publicBucket, privateBucket }) {
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
      (await publicBucket.put("file1.txt","Foo"));
      (await privateBucket.put("file2.txt","Bar"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await publicBucket.publicUrl("file1.txt")) !== "")'`)})(((await publicBucket.publicUrl("file1.txt")) !== ""))};
      try {
        (await privateBucket.publicUrl("file2.txt"));
      }
      catch ($error_e) {
        const e = $error_e.message;
        error = e;
      }
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "Cannot provide public url for a non-public bucket")'`)})((error === "Cannot provide public url for a non-public bucket"))};
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
      "value": "[[\"root/Default/Default/test:publicUrl\",\"${aws_lambda_function.root_testpublicUrl_Handler_E569A06B.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testpublicUrl_Handler_IamRole_D906F1F6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publicUrl/Handler/IamRole",
            "uniqueId": "root_testpublicUrl_Handler_IamRole_D906F1F6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testpublicUrl_Handler_IamRolePolicy_1DF4CEA8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publicUrl/Handler/IamRolePolicy",
            "uniqueId": "root_testpublicUrl_Handler_IamRolePolicy_1DF4CEA8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_publicBucket_8E082B9B.arn}\",\"${aws_s3_bucket.root_publicBucket_8E082B9B.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_publicBucket_8E082B9B.arn}\",\"${aws_s3_bucket.root_publicBucket_8E082B9B.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_privateBucket_9063F4A1.arn}\",\"${aws_s3_bucket.root_privateBucket_9063F4A1.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_privateBucket_9063F4A1.arn}\",\"${aws_s3_bucket.root_privateBucket_9063F4A1.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testpublicUrl_Handler_IamRole_D906F1F6.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testpublicUrl_Handler_IamRolePolicyAttachment_CBB01CF3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publicUrl/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testpublicUrl_Handler_IamRolePolicyAttachment_CBB01CF3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testpublicUrl_Handler_IamRole_D906F1F6.name}"
      }
    },
    "aws_lambda_function": {
      "root_testpublicUrl_Handler_E569A06B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publicUrl/Handler/Default",
            "uniqueId": "root_testpublicUrl_Handler_E569A06B"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_7c320eda": "${aws_s3_bucket.root_publicBucket_8E082B9B.bucket}",
            "BUCKET_NAME_7c320eda_IS_PUBLIC": "true",
            "BUCKET_NAME_e82f6088": "${aws_s3_bucket.root_privateBucket_9063F4A1.bucket}",
            "BUCKET_NAME_e82f6088_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "Handler-c849898f"
          }
        },
        "function_name": "Handler-c849898f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testpublicUrl_Handler_IamRole_D906F1F6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testpublicUrl_Handler_S3Object_87A5BD2C.key}",
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
      "root_privateBucket_9063F4A1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/privateBucket/Default",
            "uniqueId": "root_privateBucket_9063F4A1"
          }
        },
        "bucket_prefix": "privatebucket-c835fdbc-",
        "force_destroy": false
      },
      "root_publicBucket_8E082B9B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/Default",
            "uniqueId": "root_publicBucket_8E082B9B"
          }
        },
        "bucket_prefix": "publicbucket-c8077f6c-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "root_publicBucket_PublicPolicy_7A47863E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/PublicPolicy",
            "uniqueId": "root_publicBucket_PublicPolicy_7A47863E"
          }
        },
        "bucket": "${aws_s3_bucket.root_publicBucket_8E082B9B.bucket}",
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.root_publicBucket_8E082B9B.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_privateBucket_PublicAccessBlock_78E0CA19": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/privateBucket/PublicAccessBlock",
            "uniqueId": "root_privateBucket_PublicAccessBlock_78E0CA19"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_privateBucket_9063F4A1.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "root_publicBucket_PublicAccessBlock_E6DAFE76": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/PublicAccessBlock",
            "uniqueId": "root_publicBucket_PublicAccessBlock_E6DAFE76"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.root_publicBucket_8E082B9B.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_privateBucket_Encryption_49960E29": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/privateBucket/Encryption",
            "uniqueId": "root_privateBucket_Encryption_49960E29"
          }
        },
        "bucket": "${aws_s3_bucket.root_privateBucket_9063F4A1.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "root_publicBucket_Encryption_0FDD9504": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/Encryption",
            "uniqueId": "root_publicBucket_Encryption_0FDD9504"
          }
        },
        "bucket": "${aws_s3_bucket.root_publicBucket_8E082B9B.bucket}",
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
      "root_testpublicUrl_Handler_S3Object_87A5BD2C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publicUrl/Handler/S3Object",
            "uniqueId": "root_testpublicUrl_Handler_S3Object_87A5BD2C"
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
        const publicBucket_client = context._lift(publicBucket);
        const privateBucket_client = context._lift(privateBucket);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            publicBucket: ${publicBucket_client},
            privateBucket: ${privateBucket_client},
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
          $Closure1._registerBindObject(privateBucket, host, []);
          $Closure1._registerBindObject(publicBucket, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(privateBucket, host, ["publicUrl", "put"]);
          $Closure1._registerBindObject(publicBucket, host, ["publicUrl", "put"]);
        }
        super._registerBind(host, ops);
      }
    }
    const bucketProps = {
    "public": true,}
    ;
    const publicBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"publicBucket",bucketProps);
    const privateBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"privateBucket");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:publicUrl",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "public_url", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

