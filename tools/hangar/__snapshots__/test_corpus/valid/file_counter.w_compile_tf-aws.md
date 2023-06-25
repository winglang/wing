# [file_counter.w](../../../../../examples/tests/valid/file_counter.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ counter, bucket }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(body)  {
      const next = (await counter.inc());
      const key = `myfile-${"hi"}.txt`;
      (await bucket.put(key,body));
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
      "version": "0.15.2"
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
      "root_cloudCounter_E0AC1263": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "root_cloudCounter_E0AC1263"
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
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    },
    "aws_iam_role": {
      "root_cloudQueueSetConsumercdafee6e_IamRole_A071D35D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-cdafee6e/IamRole",
            "uniqueId": "root_cloudQueueSetConsumercdafee6e_IamRole_A071D35D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudQueueSetConsumercdafee6e_IamRolePolicy_3A67FB73": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-cdafee6e/IamRolePolicy",
            "uniqueId": "root_cloudQueueSetConsumercdafee6e_IamRolePolicy_3A67FB73"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudQueueSetConsumercdafee6e_IamRole_A071D35D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudQueueSetConsumercdafee6e_IamRolePolicyAttachment_1DECB91B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "root_cloudQueueSetConsumercdafee6e_IamRolePolicyAttachment_1DECB91B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudQueueSetConsumercdafee6e_IamRole_A071D35D.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "root_cloudQueue_EventSourceMapping_A2041279": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/EventSourceMapping",
            "uniqueId": "root_cloudQueue_EventSourceMapping_A2041279"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}",
        "function_name": "${aws_lambda_function.root_cloudQueueSetConsumercdafee6e_E80FF603.function_name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudQueueSetConsumercdafee6e_E80FF603": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-cdafee6e/Default",
            "uniqueId": "root_cloudQueueSetConsumercdafee6e_E80FF603"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "cloud-Queue-SetConsumer-cdafee6e-c8eb6a09",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-SetConsumer-cdafee6e-c8eb6a09",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudQueueSetConsumercdafee6e_IamRole_A071D35D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudQueueSetConsumercdafee6e_S3Object_C4F09C46.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      },
      "root_cloudBucket_4F3C4F53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "root_cloudBucket_4F3C4F53"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_cloudBucket_PublicAccessBlock_319C1C2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_cloudBucket_PublicAccessBlock_319C1C2E"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_cloudBucket_Encryption_8ED0CD9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "root_cloudBucket_Encryption_8ED0CD9C"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
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
      "root_cloudQueueSetConsumercdafee6e_S3Object_C4F09C46": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-cdafee6e/S3Object",
            "uniqueId": "root_cloudQueueSetConsumercdafee6e_S3Object_C4F09C46"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "root_cloudQueue_E3597F7A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/Default",
            "uniqueId": "root_cloudQueue_E3597F7A"
          }
        },
        "name": "cloud-Queue-c86e03d8",
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const counter_client = context._lift(counter);
        const bucket_client = context._lift(bucket);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            counter: ${counter_client},
            bucket: ${bucket_client},
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
        if (ops.includes("$inflight_init")) {
          $Closure1._registerBindObject(bucket, host, []);
          $Closure1._registerBindObject(counter, host, []);
        }
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
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "file_counter", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

