# [while_loop_await.w](../../../../examples/tests/valid/while_loop_await.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({  }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(body)  {
      const i = 0;
      const iterator = async (j) =>  {
        return (j + 1);
      }
      ;
      while (((await iterator(i)) < 3)) {
        {console.log(`${i}`)};
      }
    }
  }
  return $Inflight1;
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
    "aws_iam_role": {
      "root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/IamRole",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudQueueAddConsumere46e5cb7_IamRolePolicy_756548A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/IamRolePolicy",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_IamRolePolicy_756548A7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudQueueAddConsumere46e5cb7_IamRolePolicyAttachment_3625F5B7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/IamRolePolicyAttachment",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_IamRolePolicyAttachment_3625F5B7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE.name}"
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
        "function_name": "${aws_lambda_function.root_cloudQueueAddConsumere46e5cb7_83E71EC8.function_name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudQueueAddConsumere46e5cb7_83E71EC8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/Default",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_83E71EC8"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Queue-AddConsumer-e46e5cb7-c85740a2"
          }
        },
        "function_name": "cloud-Queue-AddConsumer-e46e5cb7-c85740a2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudQueueAddConsumere46e5cb7_S3Object_343EB2E4.key}",
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
      "root_cloudQueueAddConsumere46e5cb7_S3Object_343EB2E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/S3Object",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_S3Object_343EB2E4"
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
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight1Client = ${$Inflight1._toInflightType(this).text};
            const client = new $Inflight1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const handler = new $Inflight1(this,"$Inflight1");
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

