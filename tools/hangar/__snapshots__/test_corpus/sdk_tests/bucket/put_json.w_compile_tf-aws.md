# [put_json.w](../../../../../../examples/tests/sdk_tests/bucket/put_json.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jsonObj1 = ({"test": "test1"});
      const jsonObj2 = ({"test": "test2"});
      (await $b.putJson("test1.txt",jsonObj1));
      (await $b.putJson("test2.txt",jsonObj2));
      const testJson1 = (await $b.getJson("test1.txt"));
      const testJson2 = (await $b.getJson("test2.txt"));
      {((cond) => {if (!cond) throw new Error("assertion failed: testJson1.get(\"test\") == jsonObj1.get(\"test\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Json property does not exist"); return obj[args] })(testJson1, "test"),((obj, args) => { if (obj[args] === undefined) throw new Error("Json property does not exist"); return obj[args] })(jsonObj1, "test"))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: testJson2.get(\"test\") == jsonObj2.get(\"test\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Json property does not exist"); return obj[args] })(testJson2, "test"),((obj, args) => { if (obj[args] === undefined) throw new Error("Json property does not exist"); return obj[args] })(jsonObj2, "test"))))};
      const jsonObj3 = ({"test": "test3"});
      (await $b.putJson("test3.txt",jsonObj3));
      const testJson3 = (await $b.getJson("test3.txt"));
      {((cond) => {if (!cond) throw new Error("assertion failed: testJson3.get(\"test\") == jsonObj3.get(\"test\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error("Json property does not exist"); return obj[args] })(testJson3, "test"),((obj, args) => { if (obj[args] === undefined) throw new Error("Json property does not exist"); return obj[args] })(jsonObj3, "test"))))};
      (await $b.delete("test1.txt"));
      const files = (await $b.list());
      {((cond) => {if (!cond) throw new Error("assertion failed: files.contains(\"test1.txt\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(files.includes("test1.txt"),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: files.contains(\"test2.txt\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(files.includes("test2.txt"),true)))};
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
      "value": "[[\"root/Default/Default/test:putJson\",\"${aws_lambda_function.testputJson_Handler_08BF437F.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testputJson_Handler_IamRole_B9675271": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/Handler/IamRole",
            "uniqueId": "testputJson_Handler_IamRole_B9675271"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testputJson_Handler_IamRolePolicy_0B757023": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/Handler/IamRolePolicy",
            "uniqueId": "testputJson_Handler_IamRolePolicy_0B757023"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testputJson_Handler_IamRole_B9675271.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testputJson_Handler_IamRolePolicyAttachment_B9EC2D2D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/Handler/IamRolePolicyAttachment",
            "uniqueId": "testputJson_Handler_IamRolePolicyAttachment_B9EC2D2D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testputJson_Handler_IamRole_B9675271.name}"
      }
    },
    "aws_lambda_function": {
      "testputJson_Handler_08BF437F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/Handler/Default",
            "uniqueId": "testputJson_Handler_08BF437F"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8cf1c6a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8cf1c6a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testputJson_Handler_IamRole_B9675271.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testputJson_Handler_S3Object_37173600.key}",
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
      "testputJson_Handler_S3Object_37173600": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/Handler/S3Object",
            "uniqueId": "testputJson_Handler_S3Object_37173600"
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
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
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $b: ${context._lift(b)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(b, host, ["delete", "getJson", "list", "putJson"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:putJson",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "put_json", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

