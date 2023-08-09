# [json_bucket.w](../../../../../examples/tests/valid/json_bucket.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $b, $fileName }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(msg) {
      const x = (await $b.getJson($fileName));
      {((cond) => {if (!cond) throw new Error("assertion failed: x.get(\"persons\").getAt(0).get(\"fears\").getAt(1) == \"failure\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((((x)["persons"])[0])["fears"])[1],"failure")))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $b, $fileName, $getJson, $j }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b.putJson($fileName,$j));
      (await $getJson.invoke(""));
    }
  }
  return $Closure2;
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
      "value": "[[\"root/undefined/Default/test:put\",\"${aws_lambda_function.undefined_testput_Handler_8E7B8806.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_cloudFunction_IamRole_092E88B6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/IamRole",
            "uniqueId": "undefined_cloudFunction_IamRole_092E88B6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testput_Handler_IamRole_10D0ADDE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:put/Handler/IamRole",
            "uniqueId": "undefined_testput_Handler_IamRole_10D0ADDE"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_cloudFunction_IamRolePolicy_F10C459A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "undefined_cloudFunction_IamRolePolicy_F10C459A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudFunction_IamRole_092E88B6.name}"
      },
      "undefined_testput_Handler_IamRolePolicy_3BA99B8E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:put/Handler/IamRolePolicy",
            "uniqueId": "undefined_testput_Handler_IamRolePolicy_3BA99B8E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.undefined_cloudFunction_D952FD36.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testput_Handler_IamRole_10D0ADDE.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_cloudFunction_IamRolePolicyAttachment_00616B66": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudFunction_IamRolePolicyAttachment_00616B66"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudFunction_IamRole_092E88B6.name}"
      },
      "undefined_testput_Handler_IamRolePolicyAttachment_475073E6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:put/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testput_Handler_IamRolePolicyAttachment_475073E6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testput_Handler_IamRole_10D0ADDE.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_cloudFunction_D952FD36": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/Default",
            "uniqueId": "undefined_cloudFunction_D952FD36"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "WING_FUNCTION_NAME": "cloud-Function-c82dc107",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c82dc107",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudFunction_IamRole_092E88B6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudFunction_S3Object_8BF8149A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testput_Handler_8E7B8806": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:put/Handler/Default",
            "uniqueId": "undefined_testput_Handler_8E7B8806"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "FUNCTION_NAME_08e34822": "${aws_lambda_function.undefined_cloudFunction_D952FD36.arn}",
            "WING_FUNCTION_NAME": "Handler-c89d812f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c89d812f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testput_Handler_IamRole_10D0ADDE.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testput_Handler_S3Object_0E2850DB.key}",
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
      "undefined_cloudFunction_S3Object_8BF8149A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/S3Object",
            "uniqueId": "undefined_cloudFunction_S3Object_8BF8149A"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testput_Handler_S3Object_0E2850DB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:put/Handler/S3Object",
            "uniqueId": "undefined_testput_Handler_S3Object_0E2850DB"
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
            $fileName: ${context._lift(fileName)},
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
          $Closure1._registerBindObject(b, host, ["getJson"]);
          $Closure1._registerBindObject(fileName, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            $b: ${context._lift(b)},
            $fileName: ${context._lift(fileName)},
            $getJson: ${context._lift(getJson)},
            $j: ${context._lift(j)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this).text};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(b, host, ["putJson"]);
          $Closure2._registerBindObject(fileName, host, []);
          $Closure2._registerBindObject(getJson, host, ["invoke"]);
          $Closure2._registerBindObject(j, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const fileName = "file.json";
    const j = ({"persons": [({"age": 30,"name": "hasan","fears": ["heights", "failure"]})]});
    const getJson = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:put",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "json_bucket", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

