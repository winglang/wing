# [file_counter.w](../../../../../examples/tests/valid/file_counter.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $bucket, $counter }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(body) {
      const next = (await $counter.inc());
      const key = String.raw({ raw: ["myfile-", ".txt"] }, "hi");
      (await $bucket.put(key,body));
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
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "undefined_cloudCounter_4B4E77ED": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Counter/Default",
            "uniqueId": "undefined_cloudCounter_4B4E77ED"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-cloud.Counter-c86bae23"
      }
    },
    "aws_iam_role": {
      "undefined_cloudQueue-SetConsumer-83b2983f_IamRole_F2D4B35E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-83b2983f/IamRole",
            "uniqueId": "undefined_cloudQueue-SetConsumer-83b2983f_IamRole_F2D4B35E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_cloudQueue-SetConsumer-83b2983f_IamRolePolicy_F90973A3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-83b2983f/IamRolePolicy",
            "uniqueId": "undefined_cloudQueue-SetConsumer-83b2983f_IamRolePolicy_F90973A3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.undefined_cloudQueue_98A56968.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudQueue-SetConsumer-83b2983f_IamRole_F2D4B35E.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_cloudQueue-SetConsumer-83b2983f_IamRolePolicyAttachment_ED335108": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-83b2983f/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudQueue-SetConsumer-83b2983f_IamRolePolicyAttachment_ED335108"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudQueue-SetConsumer-83b2983f_IamRole_F2D4B35E.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "undefined_cloudQueue_EventSourceMapping_6330B504": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue/EventSourceMapping",
            "uniqueId": "undefined_cloudQueue_EventSourceMapping_6330B504"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.undefined_cloudQueue_98A56968.arn}",
        "function_name": "${aws_lambda_function.undefined_cloudQueue-SetConsumer-83b2983f_6DA5FC0B.function_name}"
      }
    },
    "aws_lambda_function": {
      "undefined_cloudQueue-SetConsumer-83b2983f_6DA5FC0B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-83b2983f/Default",
            "uniqueId": "undefined_cloudQueue-SetConsumer-83b2983f_6DA5FC0B"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "cloud-Queue-SetConsumer-83b2983f-c829c27f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-SetConsumer-83b2983f-c829c27f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudQueue-SetConsumer-83b2983f_IamRole_F2D4B35E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudQueue-SetConsumer-83b2983f_S3Object_231F4D38.key}",
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
      "undefined_cloudQueue-SetConsumer-83b2983f_S3Object_231F4D38": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-83b2983f/S3Object",
            "uniqueId": "undefined_cloudQueue-SetConsumer-83b2983f_S3Object_231F4D38"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "undefined_cloudQueue_98A56968": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue/Default",
            "uniqueId": "undefined_cloudQueue_98A56968"
          }
        },
        "name": "cloud-Queue-c873ff25",
        "visibility_timeout_seconds": 10
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
            $bucket: ${context._lift(bucket)},
            $counter: ${context._lift(counter)},
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
          $Closure1._registerBindObject(bucket, host, ["put"]);
          $Closure1._registerBindObject(counter, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
    }
    const bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter",{ initial: 100 });
    const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue",{ timeout: (std.Duration.fromSeconds(10)) });
    const handler = new $Closure1(this,"$Closure1");
    (queue.setConsumer(handler));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "file_counter", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

