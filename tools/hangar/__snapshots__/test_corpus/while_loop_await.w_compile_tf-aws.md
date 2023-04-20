# [while_loop_await.w](../../../../examples/tests/valid/while_loop_await.w) | compile | tf-aws

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
    "aws_iam_role": {
      "root_cloudQueueAddConsumerb3f3d188_IamRole_DE9F8DCD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-b3f3d188/IamRole",
            "uniqueId": "root_cloudQueueAddConsumerb3f3d188_IamRole_DE9F8DCD"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudQueueAddConsumerb3f3d188_IamRolePolicy_5C4AAB82": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-b3f3d188/IamRolePolicy",
            "uniqueId": "root_cloudQueueAddConsumerb3f3d188_IamRolePolicy_5C4AAB82"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudQueueAddConsumerb3f3d188_IamRole_DE9F8DCD.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudQueueAddConsumerb3f3d188_IamRolePolicyAttachment_9EBE30CE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-b3f3d188/IamRolePolicyAttachment",
            "uniqueId": "root_cloudQueueAddConsumerb3f3d188_IamRolePolicyAttachment_9EBE30CE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudQueueAddConsumerb3f3d188_IamRole_DE9F8DCD.name}"
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
        "function_name": "${aws_lambda_function.root_cloudQueueAddConsumerb3f3d188_BA732820.function_name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudQueueAddConsumerb3f3d188_BA732820": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-b3f3d188/Default",
            "uniqueId": "root_cloudQueueAddConsumerb3f3d188_BA732820"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Queue-AddConsumer-b3f3d188-c80328fd"
          }
        },
        "function_name": "cloud-Queue-AddConsumer-b3f3d188-c80328fd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudQueueAddConsumerb3f3d188_IamRole_DE9F8DCD.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudQueueAddConsumerb3f3d188_S3Object_E185C166.key}",
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
      }
    },
    "aws_s3_object": {
      "root_cloudQueueAddConsumerb3f3d188_S3Object_E185C166": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-b3f3d188/S3Object",
            "uniqueId": "root_cloudQueueAddConsumerb3f3d188_S3Object_E185C166"
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
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const iterator = new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    ;
    const handler = new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    ;
    (queue.addConsumer(handler));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "while_loop_await", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

## proc1/index.js
```js
async handle(j) {
  const {  } = this;
  return (j + 1);
}

```

## proc2/index.js
```js
async handle(body) {
  const {  } = this;
  const i = 0;
  while (((await iterator(i)) < 3)) {
    {console.log(`${i}`)};
  }
}

```

