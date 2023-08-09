# [add_object.w](../../../../../../examples/tests/sdk_tests/bucket/add_object.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $b, $jsonObj1, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: b.list().length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.list()).length,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(b.getJson(\"file1.json\")) == Json.stringify(jsonObj1)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]) })([(await $b.getJson("file1.json"))]),((args) => { return JSON.stringify(args[0], null, args[1]) })([$jsonObj1]))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.get(\"file2.txt\") == \"Bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.get("file2.txt")),"Bar")))};
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
      "value": "[[\"root/undefined/Default/test:addObject\",\"${aws_lambda_function.undefined_testaddObject_Handler_E5AF0C75.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testaddObject_Handler_IamRole_2E9A0661": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:addObject/Handler/IamRole",
            "uniqueId": "undefined_testaddObject_Handler_IamRole_2E9A0661"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testaddObject_Handler_IamRolePolicy_02BEDA6D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:addObject/Handler/IamRolePolicy",
            "uniqueId": "undefined_testaddObject_Handler_IamRolePolicy_02BEDA6D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testaddObject_Handler_IamRole_2E9A0661.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testaddObject_Handler_IamRolePolicyAttachment_33152BF6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:addObject/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testaddObject_Handler_IamRolePolicyAttachment_33152BF6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testaddObject_Handler_IamRole_2E9A0661.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testaddObject_Handler_E5AF0C75": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:addObject/Handler/Default",
            "uniqueId": "undefined_testaddObject_Handler_E5AF0C75"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8a23958",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a23958",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testaddObject_Handler_IamRole_2E9A0661.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testaddObject_Handler_S3Object_51803FF3.key}",
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
      "undefined_cloudBucket_7A0DE585": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/Default",
            "uniqueId": "undefined_cloudBucket_7A0DE585"
          }
        },
        "bucket_prefix": "cloud-bucket-c8802ab1-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "undefined_cloudBucket_PublicAccessBlock_A3FBADF2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "undefined_cloudBucket_PublicAccessBlock_A3FBADF2"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "undefined_cloudBucket_Encryption_80E33E4D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/Encryption",
            "uniqueId": "undefined_cloudBucket_Encryption_80E33E4D"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
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
      "undefined_cloudBucket_S3Object-file1json_B35FEFC0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/S3Object-file1.json",
            "uniqueId": "undefined_cloudBucket_S3Object-file1json_B35FEFC0"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
        "content": "{\"key1\":\"value1\"}",
        "key": "file1.json"
      },
      "undefined_cloudBucket_S3Object-file2txt_B3629FE6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/S3Object-file2.txt",
            "uniqueId": "undefined_cloudBucket_S3Object-file2txt_B3629FE6"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
        "content": "Bar",
        "key": "file2.txt"
      },
      "undefined_testaddObject_Handler_S3Object_51803FF3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:addObject/Handler/S3Object",
            "uniqueId": "undefined_testaddObject_Handler_S3Object_51803FF3"
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
            $b: ${context._lift(b)},
            $jsonObj1: ${context._lift(jsonObj1)},
            $std_Json: ${context._lift(std.Json)},
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
          $Closure1._registerBindObject(b, host, ["get", "getJson", "list"]);
          $Closure1._registerBindObject(jsonObj1, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const jsonObj1 = ({"key1": "value1"});
    (b.addObject("file1.json",((args) => { return JSON.stringify(args[0], null, args[1]) })([jsonObj1])));
    (b.addObject("file2.txt","Bar"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:addObject",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "add_object", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

