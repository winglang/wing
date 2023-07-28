# [try_delete.w](../../../../../../examples/tests/sdk_tests/bucket/try_delete.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jsonObj2 = Object.freeze({"key2":"value2"});
      (await $b.put("file1.txt","Foo"));
      {((cond) => {if (!cond) throw new Error("assertion failed: b.tryDelete(\"file1.txt\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.tryDelete("file1.txt")),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.tryDelete(\"file1.txt\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.tryDelete("file1.txt")),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.tryDelete(\"random\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.tryDelete("random")),false)))};
      (await $b.put("file2.txt","Bar"));
      (await $b.putJson("file2.json",jsonObj2));
      {((cond) => {if (!cond) throw new Error("assertion failed: b.tryDelete(\"file2.txt\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.tryDelete("file2.txt")),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.tryDelete(\"file2.json\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.tryDelete("file2.json")),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.tryDelete(\"file2.txt\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.tryDelete("file2.txt")),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.tryDelete(\"file2.json\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.tryDelete("file2.json")),false)))};
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
      "value": "[[\"root/Default/Default/test:tryDelete\",\"${aws_lambda_function.testtryDelete_Handler_C4052A94.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testtryDelete_Handler_IamRole_9139123D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryDelete/Handler/IamRole",
            "uniqueId": "testtryDelete_Handler_IamRole_9139123D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testtryDelete_Handler_IamRolePolicy_1DEE72C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryDelete/Handler/IamRolePolicy",
            "uniqueId": "testtryDelete_Handler_IamRolePolicy_1DEE72C3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testtryDelete_Handler_IamRole_9139123D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testtryDelete_Handler_IamRolePolicyAttachment_A43F0399": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryDelete/Handler/IamRolePolicyAttachment",
            "uniqueId": "testtryDelete_Handler_IamRolePolicyAttachment_A43F0399"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testtryDelete_Handler_IamRole_9139123D.name}"
      }
    },
    "aws_lambda_function": {
      "testtryDelete_Handler_C4052A94": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryDelete/Handler/Default",
            "uniqueId": "testtryDelete_Handler_C4052A94"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c85151e8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85151e8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testtryDelete_Handler_IamRole_9139123D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testtryDelete_Handler_S3Object_DD0AB5F1.key}",
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
      "testtryDelete_Handler_S3Object_DD0AB5F1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryDelete/Handler/S3Object",
            "uniqueId": "testtryDelete_Handler_S3Object_DD0AB5F1"
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
const cloud = require('@winglang/sdk').cloud;
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
          $Closure1._registerBindObject(b, host, ["put", "putJson", "tryDelete"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:tryDelete",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "try_delete", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

