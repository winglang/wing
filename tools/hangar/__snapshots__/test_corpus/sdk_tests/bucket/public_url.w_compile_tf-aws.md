# [public_url.w](../../../../../../examples/tests/sdk_tests/bucket/public_url.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $http_Util, $privateBucket, $publicBucket, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      let error = "";
      (await $publicBucket.put("file1.txt","Foo"));
      (await $privateBucket.put("file2.txt","Bar"));
      const publicUrl = (await $publicBucket.publicUrl("file1.txt"));
      {((cond) => {if (!cond) throw new Error("assertion failed: publicUrl != \"\"")})((publicUrl !== ""))};
      if (((await $util_Util.env("WING_TARGET")) !== "sim")) {
        {((cond) => {if (!cond) throw new Error("assertion failed: http.get(publicUrl).body ==  \"Foo\"")})(((await $http_Util.get(publicUrl)).body === "Foo"))};
      }
      try {
        (await $privateBucket.publicUrl("file2.txt"));
      }
      catch ($error_e) {
        const e = $error_e.message;
        error = e;
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: error == \"Cannot provide public url for a non-public bucket\"")})((error === "Cannot provide public url for a non-public bucket"))};
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
      "value": "[[\"root/Default/Default/test:publicUrl\",\"${aws_lambda_function.testpublicUrl_Handler_E965919F.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testpublicUrl_Handler_IamRole_9C38B5EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publicUrl/Handler/IamRole",
            "uniqueId": "testpublicUrl_Handler_IamRole_9C38B5EF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testpublicUrl_Handler_IamRolePolicy_5664CCF6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publicUrl/Handler/IamRolePolicy",
            "uniqueId": "testpublicUrl_Handler_IamRolePolicy_5664CCF6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.publicBucket.arn}\",\"${aws_s3_bucket.publicBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.privateBucket.arn}\",\"${aws_s3_bucket.privateBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testpublicUrl_Handler_IamRole_9C38B5EF.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testpublicUrl_Handler_IamRolePolicyAttachment_8E7665CA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publicUrl/Handler/IamRolePolicyAttachment",
            "uniqueId": "testpublicUrl_Handler_IamRolePolicyAttachment_8E7665CA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testpublicUrl_Handler_IamRole_9C38B5EF.name}"
      }
    },
    "aws_lambda_function": {
      "testpublicUrl_Handler_E965919F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publicUrl/Handler/Default",
            "uniqueId": "testpublicUrl_Handler_E965919F"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_7c320eda": "${aws_s3_bucket.publicBucket.bucket}",
            "BUCKET_NAME_e82f6088": "${aws_s3_bucket.privateBucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c849898f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c849898f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testpublicUrl_Handler_IamRole_9C38B5EF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testpublicUrl_Handler_S3Object_CF3B31A2.key}",
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
      "privateBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/privateBucket/Default",
            "uniqueId": "privateBucket"
          }
        },
        "bucket_prefix": "privatebucket-c835fdbc-",
        "force_destroy": false
      },
      "publicBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/Default",
            "uniqueId": "publicBucket"
          }
        },
        "bucket_prefix": "publicbucket-c8077f6c-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "publicBucket_PublicPolicy_F7753EC4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/PublicPolicy",
            "uniqueId": "publicBucket_PublicPolicy_F7753EC4"
          }
        },
        "bucket": "${aws_s3_bucket.publicBucket.bucket}",
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.publicBucket.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "privateBucket_PublicAccessBlock_BF0F9FC6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/privateBucket/PublicAccessBlock",
            "uniqueId": "privateBucket_PublicAccessBlock_BF0F9FC6"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.privateBucket.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "publicBucket_PublicAccessBlock_54D9EFBA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/PublicAccessBlock",
            "uniqueId": "publicBucket_PublicAccessBlock_54D9EFBA"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.publicBucket.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "privateBucket_Encryption_0E029000": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/privateBucket/Encryption",
            "uniqueId": "privateBucket_Encryption_0E029000"
          }
        },
        "bucket": "${aws_s3_bucket.privateBucket.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "publicBucket_Encryption_60BD8E69": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/Encryption",
            "uniqueId": "publicBucket_Encryption_60BD8E69"
          }
        },
        "bucket": "${aws_s3_bucket.publicBucket.bucket}",
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
      "testpublicUrl_Handler_S3Object_CF3B31A2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publicUrl/Handler/S3Object",
            "uniqueId": "testpublicUrl_Handler_S3Object_CF3B31A2"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
const http = require('@winglang/sdk').http;
const util = require('@winglang/sdk').util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $http_Util: ${context._lift(http.Util)},
            $privateBucket: ${context._lift(privateBucket)},
            $publicBucket: ${context._lift(publicBucket)},
            $util_Util: ${context._lift(util.Util)},
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
          $Closure1._registerBindObject(privateBucket, host, ["publicUrl", "put"]);
          $Closure1._registerBindObject(publicBucket, host, ["publicUrl", "put"]);
        }
        super._registerBind(host, ops);
      }
    }
    const publicBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"publicBucket",{ public: true });
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

