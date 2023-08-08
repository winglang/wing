# [while_loop_await.w](../../../../../examples/tests/valid/while_loop_await.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(body) {
      const i = 0;
      const iterator = async (j) => {
        return (j + 1);
      }
      ;
      while (((await iterator(i)) < 3)) {
        {console.log(String.raw({ raw: ["", ""] }, i))};
      }
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
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "cloudQueue_cloudQueue-SetConsumer-cdafee6e_IamRole_6B23BD92": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/cloud.Queue-SetConsumer-cdafee6e/IamRole",
            "uniqueId": "cloudQueue_cloudQueue-SetConsumer-cdafee6e_IamRole_6B23BD92"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudQueue_cloudQueue-SetConsumer-cdafee6e_IamRolePolicy_6B41F35C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/cloud.Queue-SetConsumer-cdafee6e/IamRolePolicy",
            "uniqueId": "cloudQueue_cloudQueue-SetConsumer-cdafee6e_IamRolePolicy_6B41F35C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudQueue_cloudQueue-SetConsumer-cdafee6e_IamRole_6B23BD92.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudQueue_cloudQueue-SetConsumer-cdafee6e_IamRolePolicyAttachment_D3EDD43E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/cloud.Queue-SetConsumer-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "cloudQueue_cloudQueue-SetConsumer-cdafee6e_IamRolePolicyAttachment_D3EDD43E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudQueue_cloudQueue-SetConsumer-cdafee6e_IamRole_6B23BD92.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "cloudQueue_EventSourceMapping_41814136": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/EventSourceMapping",
            "uniqueId": "cloudQueue_EventSourceMapping_41814136"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.cloudQueue.arn}",
        "function_name": "${aws_lambda_function.cloudQueue_cloudQueue-SetConsumer-cdafee6e_F7EEEF83.function_name}"
      }
    },
    "aws_lambda_function": {
      "cloudQueue_cloudQueue-SetConsumer-cdafee6e_F7EEEF83": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/cloud.Queue-SetConsumer-cdafee6e/Default",
            "uniqueId": "cloudQueue_cloudQueue-SetConsumer-cdafee6e_F7EEEF83"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Queue-SetConsumer-cdafee6e-c8f86b6b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-SetConsumer-cdafee6e-c8f86b6b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudQueue_cloudQueue-SetConsumer-cdafee6e_IamRole_6B23BD92.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudQueue_cloudQueue-SetConsumer-cdafee6e_S3Object_FFC80B21.key}",
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
      }
    },
    "aws_s3_object": {
      "cloudQueue_cloudQueue-SetConsumer-cdafee6e_S3Object_FFC80B21": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/cloud.Queue-SetConsumer-cdafee6e/S3Object",
            "uniqueId": "cloudQueue_cloudQueue-SetConsumer-cdafee6e_S3Object_FFC80B21"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "cloudQueue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/Default",
            "uniqueId": "cloudQueue"
          }
        },
        "name": "cloud-Queue-c86e03d8"
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
    }
    const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const handler = new $Closure1(this,"$Closure1");
    (queue.setConsumer(handler));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "while_loop_await", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

