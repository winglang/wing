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
      {((cond) => {if (!cond) throw new Error("assertion failed: b.list().length == 2")})(((await $b.list()).length === 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(b.getJson(\"file1.json\")) == Json.stringify(jsonObj1)")})((((args) => { return JSON.stringify(args[0], null, args[1]) })([(await $b.getJson("file1.json"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([$jsonObj1])))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.get(\"file2.txt\") == \"Bar\"")})(((await $b.get("file2.txt")) === "Bar"))};
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
      "value": "[[\"root/Default/Default/test:addObject\",\"${aws_lambda_function.testaddObject_Handler_44ECC49C.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testaddObject_Handler_IamRole_1A9672A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addObject/Handler/IamRole",
            "uniqueId": "testaddObject_Handler_IamRole_1A9672A7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testaddObject_Handler_IamRolePolicy_B5188189": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addObject/Handler/IamRolePolicy",
            "uniqueId": "testaddObject_Handler_IamRolePolicy_B5188189"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testaddObject_Handler_IamRole_1A9672A7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testaddObject_Handler_IamRolePolicyAttachment_DB1EE647": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addObject/Handler/IamRolePolicyAttachment",
            "uniqueId": "testaddObject_Handler_IamRolePolicyAttachment_DB1EE647"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testaddObject_Handler_IamRole_1A9672A7.name}"
      }
    },
    "aws_lambda_function": {
      "testaddObject_Handler_44ECC49C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addObject/Handler/Default",
            "uniqueId": "testaddObject_Handler_44ECC49C"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c89ea41b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c89ea41b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testaddObject_Handler_IamRole_1A9672A7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testaddObject_Handler_S3Object_88DEF745.key}",
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
      "cloudBucket_S3Object-file1json_574A6AAF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3Object-file1.json",
            "uniqueId": "cloudBucket_S3Object-file1json_574A6AAF"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "content": "{\"key1\":\"value1\"}",
        "key": "file1.json"
      },
      "cloudBucket_S3Object-file2txt_C6672D6C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3Object-file2.txt",
            "uniqueId": "cloudBucket_S3Object-file2txt_C6672D6C"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "content": "Bar",
        "key": "file2.txt"
      },
      "testaddObject_Handler_S3Object_88DEF745": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addObject/Handler/S3Object",
            "uniqueId": "testaddObject_Handler_S3Object_88DEF745"
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
    const jsonObj1 = Object.freeze({"key1":"value1"});
    (b.addObject("file1.json",((args) => { return JSON.stringify(args[0], null, args[1]) })([jsonObj1])));
    (b.addObject("file2.txt","Bar"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:addObject",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "add_object", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

