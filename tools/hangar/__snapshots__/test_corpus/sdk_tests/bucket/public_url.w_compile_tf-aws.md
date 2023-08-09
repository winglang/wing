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
        {((cond) => {if (!cond) throw new Error("assertion failed: http.get(publicUrl).body ==  \"Foo\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.get(publicUrl)).body,"Foo")))};
      }
      try {
        (await $privateBucket.publicUrl("file2.txt"));
      }
      catch ($error_e) {
        const e = $error_e.message;
        error = e;
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: error == \"Cannot provide public url for a non-public bucket\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(error,"Cannot provide public url for a non-public bucket")))};
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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:publicUrl\",\"${aws_lambda_function.undefined_testpublicUrl_Handler_D440EA01.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testpublicUrl_Handler_IamRole_8525A89C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:publicUrl/Handler/IamRole",
            "uniqueId": "undefined_testpublicUrl_Handler_IamRole_8525A89C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testpublicUrl_Handler_IamRolePolicy_49291C41": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:publicUrl/Handler/IamRolePolicy",
            "uniqueId": "undefined_testpublicUrl_Handler_IamRolePolicy_49291C41"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.undefined_publicBucket_CA42F957.arn}\",\"${aws_s3_bucket.undefined_publicBucket_CA42F957.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.undefined_privateBucket_0ACAF8A9.arn}\",\"${aws_s3_bucket.undefined_privateBucket_0ACAF8A9.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testpublicUrl_Handler_IamRole_8525A89C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testpublicUrl_Handler_IamRolePolicyAttachment_40F71397": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:publicUrl/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testpublicUrl_Handler_IamRolePolicyAttachment_40F71397"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testpublicUrl_Handler_IamRole_8525A89C.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testpublicUrl_Handler_D440EA01": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:publicUrl/Handler/Default",
            "uniqueId": "undefined_testpublicUrl_Handler_D440EA01"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_70e7a2e8": "${aws_s3_bucket.undefined_privateBucket_0ACAF8A9.bucket}",
            "BUCKET_NAME_ab7d1716": "${aws_s3_bucket.undefined_publicBucket_CA42F957.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8fe8595",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8fe8595",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testpublicUrl_Handler_IamRole_8525A89C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testpublicUrl_Handler_S3Object_BE23C5F2.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      },
      "undefined_privateBucket_0ACAF8A9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/privateBucket/Default",
            "uniqueId": "undefined_privateBucket_0ACAF8A9"
          }
        },
        "bucket_prefix": "privatebucket-c8124dc6-",
        "force_destroy": false
      },
      "undefined_publicBucket_CA42F957": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/publicBucket/Default",
            "uniqueId": "undefined_publicBucket_CA42F957"
          }
        },
        "bucket_prefix": "publicbucket-c8a1aef1-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "undefined_publicBucket_PublicPolicy_A55E695C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/publicBucket/PublicPolicy",
            "uniqueId": "undefined_publicBucket_PublicPolicy_A55E695C"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_publicBucket_CA42F957.bucket}",
        "depends_on": [
          "aws_s3_bucket_public_access_block.undefined_publicBucket_PublicAccessBlock_60F410E8"
        ],
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.undefined_publicBucket_CA42F957.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "undefined_privateBucket_PublicAccessBlock_B07089BB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/privateBucket/PublicAccessBlock",
            "uniqueId": "undefined_privateBucket_PublicAccessBlock_B07089BB"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_privateBucket_0ACAF8A9.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "undefined_publicBucket_PublicAccessBlock_60F410E8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/publicBucket/PublicAccessBlock",
            "uniqueId": "undefined_publicBucket_PublicAccessBlock_60F410E8"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.undefined_publicBucket_CA42F957.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "undefined_privateBucket_Encryption_21A3E282": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/privateBucket/Encryption",
            "uniqueId": "undefined_privateBucket_Encryption_21A3E282"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_privateBucket_0ACAF8A9.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "undefined_publicBucket_Encryption_B35C5AFF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/publicBucket/Encryption",
            "uniqueId": "undefined_publicBucket_Encryption_B35C5AFF"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_publicBucket_CA42F957.bucket}",
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
      "undefined_testpublicUrl_Handler_S3Object_BE23C5F2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:publicUrl/Handler/S3Object",
            "uniqueId": "undefined_testpublicUrl_Handler_S3Object_BE23C5F2"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
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
const http = $stdlib.http;
const util = $stdlib.util;
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
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "public_url", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

