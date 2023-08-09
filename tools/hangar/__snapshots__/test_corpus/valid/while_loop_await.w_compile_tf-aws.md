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
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.undefined_cloudQueue_98A56968.arn}\"],\"Effect\":\"Allow\"}]}",
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
        "name": "cloud-Queue-c873ff25"
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
new $App({ outdir: $outdir, name: "while_loop_await", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

