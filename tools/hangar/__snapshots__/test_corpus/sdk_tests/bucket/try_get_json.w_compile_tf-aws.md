# [try_get_json.w](../../../../../../examples/tests/sdk_tests/bucket/try_get_json.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $b, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jsonObj1 = ({"key1": "value1"});
      const jsonObj2 = ({"key2": "value2"});
      (await $b.putJson("file1.json",jsonObj1));
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(b.tryGetJson(\"file1.json\")) == Json.stringify(jsonObj1)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([(await $b.tryGetJson("file1.json"))]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([jsonObj1]))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.tryGetJson(\"file2.json\") == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.tryGetJson("file2.json")),undefined)))};
      (await $b.putJson("file2.json",jsonObj2));
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(b.tryGetJson(\"file2.json\")) == Json.stringify(jsonObj2)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([(await $b.tryGetJson("file2.json"))]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([jsonObj2]))))};
      (await $b.delete("file1.json"));
      (await $b.delete("file2.json"));
      {((cond) => {if (!cond) throw new Error("assertion failed: b.tryGetJson(\"file1.json\") == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.tryGetJson("file1.json")),undefined)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.tryGetJson(\"file2.json\") == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.tryGetJson("file2.json")),undefined)))};
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
      "version": "0.17.3"
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
      "value": "[[\"root/Default/Default/test:tryGetJson\",\"${aws_lambda_function.testtryGetJson_Handler_A244DB7C.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testtryGetJson_Handler_IamRole_AA5E00E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGetJson/Handler/IamRole",
            "uniqueId": "testtryGetJson_Handler_IamRole_AA5E00E8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testtryGetJson_Handler_IamRolePolicy_061A4068": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGetJson/Handler/IamRolePolicy",
            "uniqueId": "testtryGetJson_Handler_IamRolePolicy_061A4068"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testtryGetJson_Handler_IamRole_AA5E00E8.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testtryGetJson_Handler_IamRolePolicyAttachment_4FC81A05": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGetJson/Handler/IamRolePolicyAttachment",
            "uniqueId": "testtryGetJson_Handler_IamRolePolicyAttachment_4FC81A05"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testtryGetJson_Handler_IamRole_AA5E00E8.name}"
      }
    },
    "aws_lambda_function": {
      "testtryGetJson_Handler_A244DB7C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGetJson/Handler/Default",
            "uniqueId": "testtryGetJson_Handler_A244DB7C"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8858898",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8858898",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testtryGetJson_Handler_IamRole_AA5E00E8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testtryGetJson_Handler_S3Object_A843B277.key}",
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
      "testtryGetJson_Handler_S3Object_A843B277": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:tryGetJson/Handler/S3Object",
            "uniqueId": "testtryGetJson_Handler_S3Object_A843B277"
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
            $std_Json: ${context._lift(std.Json)},
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
          $Closure1._registerBindObject(b, host, ["delete", "putJson", "tryGetJson"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:tryGetJson",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "try_get_json", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

