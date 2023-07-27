# [capture_in_binary.w](../../../../../examples/tests/valid/capture_in_binary.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $b, $x }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b.put("file","foo"));
      {((cond) => {if (!cond) throw new Error("assertion failed: b.get(\"file\") == \"foo\"")})(((await $b.get("file")) === "foo"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12 == x")})((12 === $x))};
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
      "value": "[[\"root/Default/Default/test:binary expressions\",\"${aws_lambda_function.testbinaryexpressions_Handler_BDFD91F0.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testbinaryexpressions_Handler_IamRole_175BD041": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:binary expressions/Handler/IamRole",
            "uniqueId": "testbinaryexpressions_Handler_IamRole_175BD041"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testbinaryexpressions_Handler_IamRolePolicy_AB3DBB4A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:binary expressions/Handler/IamRolePolicy",
            "uniqueId": "testbinaryexpressions_Handler_IamRolePolicy_AB3DBB4A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testbinaryexpressions_Handler_IamRole_175BD041.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testbinaryexpressions_Handler_IamRolePolicyAttachment_C4496BC5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:binary expressions/Handler/IamRolePolicyAttachment",
            "uniqueId": "testbinaryexpressions_Handler_IamRolePolicyAttachment_C4496BC5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testbinaryexpressions_Handler_IamRole_175BD041.name}"
      }
    },
    "aws_lambda_function": {
      "testbinaryexpressions_Handler_BDFD91F0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:binary expressions/Handler/Default",
            "uniqueId": "testbinaryexpressions_Handler_BDFD91F0"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c89c8d69",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c89c8d69",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testbinaryexpressions_Handler_IamRole_175BD041.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testbinaryexpressions_Handler_S3Object_38824451.key}",
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
      "testbinaryexpressions_Handler_S3Object_38824451": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:binary expressions/Handler/S3Object",
            "uniqueId": "testbinaryexpressions_Handler_S3Object_38824451"
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
            $x: ${context._lift(x)},
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
          $Closure1._registerBindObject(b, host, ["get", "put"]);
          $Closure1._registerBindObject(x, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const x = 12;
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:binary expressions",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "capture_in_binary", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

