# [inflight-subscribers.w](../../../../../examples/tests/valid/inflight-subscribers.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {console.log("hello, world")};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({  }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {console.log("hello, world")};
    }
  }
  return $Closure2;
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
      "undefined_cloudQueue-SetConsumer-b378226f_IamRole_FB761559": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-b378226f/IamRole",
            "uniqueId": "undefined_cloudQueue-SetConsumer-b378226f_IamRole_FB761559"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_cloudTopic-OnMessage-83b2983f_IamRole_3F286DA4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-83b2983f/IamRole",
            "uniqueId": "undefined_cloudTopic-OnMessage-83b2983f_IamRole_3F286DA4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_cloudQueue-SetConsumer-b378226f_IamRolePolicy_960DC468": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-b378226f/IamRolePolicy",
            "uniqueId": "undefined_cloudQueue-SetConsumer-b378226f_IamRolePolicy_960DC468"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.undefined_cloudQueue_98A56968.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudQueue-SetConsumer-b378226f_IamRole_FB761559.name}"
      },
      "undefined_cloudTopic-OnMessage-83b2983f_IamRolePolicy_2FBA1C31": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-83b2983f/IamRolePolicy",
            "uniqueId": "undefined_cloudTopic-OnMessage-83b2983f_IamRolePolicy_2FBA1C31"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_cloudTopic-OnMessage-83b2983f_IamRole_3F286DA4.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_cloudQueue-SetConsumer-b378226f_IamRolePolicyAttachment_17D1E233": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-b378226f/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudQueue-SetConsumer-b378226f_IamRolePolicyAttachment_17D1E233"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudQueue-SetConsumer-b378226f_IamRole_FB761559.name}"
      },
      "undefined_cloudTopic-OnMessage-83b2983f_IamRolePolicyAttachment_FFF98ED7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-83b2983f/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudTopic-OnMessage-83b2983f_IamRolePolicyAttachment_FFF98ED7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudTopic-OnMessage-83b2983f_IamRole_3F286DA4.name}"
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
        "function_name": "${aws_lambda_function.undefined_cloudQueue-SetConsumer-b378226f_63A2DB22.function_name}"
      }
    },
    "aws_lambda_function": {
      "undefined_cloudQueue-SetConsumer-b378226f_63A2DB22": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-b378226f/Default",
            "uniqueId": "undefined_cloudQueue-SetConsumer-b378226f_63A2DB22"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Queue-SetConsumer-b378226f-c82058a0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-SetConsumer-b378226f-c82058a0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudQueue-SetConsumer-b378226f_IamRole_FB761559.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudQueue-SetConsumer-b378226f_S3Object_2E1CB56A.key}",
        "timeout": 180,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_cloudTopic-OnMessage-83b2983f_FD502E3A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-83b2983f/Default",
            "uniqueId": "undefined_cloudTopic-OnMessage-83b2983f_FD502E3A"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-83b2983f-c8d1bea0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-83b2983f-c8d1bea0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudTopic-OnMessage-83b2983f_IamRole_3F286DA4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudTopic-OnMessage-83b2983f_S3Object_E9FDE9DA.key}",
        "timeout": 180,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "undefined_cloudTopic-OnMessage-83b2983f_InvokePermission-c8704b0beccd6200f26cd162c2589d941aac12d635_B77BC1F0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-83b2983f/InvokePermission-c8704b0beccd6200f26cd162c2589d941aac12d635",
            "uniqueId": "undefined_cloudTopic-OnMessage-83b2983f_InvokePermission-c8704b0beccd6200f26cd162c2589d941aac12d635_B77BC1F0"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_cloudTopic-OnMessage-83b2983f_FD502E3A.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_cloudTopic_DAC7C38E.arn}"
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
      "undefined_cloudQueue-SetConsumer-b378226f_S3Object_2E1CB56A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-b378226f/S3Object",
            "uniqueId": "undefined_cloudQueue-SetConsumer-b378226f_S3Object_2E1CB56A"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_cloudTopic-OnMessage-83b2983f_S3Object_E9FDE9DA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-83b2983f/S3Object",
            "uniqueId": "undefined_cloudTopic-OnMessage-83b2983f_S3Object_E9FDE9DA"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "undefined_cloudTopic_DAC7C38E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic/Default",
            "uniqueId": "undefined_cloudTopic_DAC7C38E"
          }
        },
        "name": "cloud-Topic-c8704b0b"
      }
    },
    "aws_sns_topic_subscription": {
      "undefined_cloudTopic_cloudTopic-TopicSubscription-83b2983f_1436557A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic/cloud.Topic-TopicSubscription-83b2983f",
            "uniqueId": "undefined_cloudTopic_cloudTopic-TopicSubscription-83b2983f_1436557A"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_cloudTopic-OnMessage-83b2983f_FD502E3A.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_cloudTopic_DAC7C38E.arn}"
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
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this).text};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    (this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this,"cloud.Topic").onMessage(new $Closure1(this,"$Closure1"),{ timeout: (std.Duration.fromSeconds(180)) }));
    (this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue").setConsumer(new $Closure2(this,"$Closure2"),{ timeout: (std.Duration.fromSeconds(180)) }));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inflight-subscribers", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

