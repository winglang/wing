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
    async $inflight_init()  {
    }
    async handle()  {
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
    async $inflight_init()  {
    }
    async handle()  {
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
      "root_cloudQueueSetConsumer86898773_IamRole_F8B0511B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-86898773/IamRole",
            "uniqueId": "root_cloudQueueSetConsumer86898773_IamRole_F8B0511B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudTopicOnMessagecdafee6e_IamRole_029E78CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/IamRole",
            "uniqueId": "root_cloudTopicOnMessagecdafee6e_IamRole_029E78CB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudQueueSetConsumer86898773_IamRolePolicy_CAD478C5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-86898773/IamRolePolicy",
            "uniqueId": "root_cloudQueueSetConsumer86898773_IamRolePolicy_CAD478C5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudQueueSetConsumer86898773_IamRole_F8B0511B.name}"
      },
      "root_cloudTopicOnMessagecdafee6e_IamRolePolicy_CA04DBA9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/IamRolePolicy",
            "uniqueId": "root_cloudTopicOnMessagecdafee6e_IamRolePolicy_CA04DBA9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_cloudTopicOnMessagecdafee6e_IamRole_029E78CB.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudQueueSetConsumer86898773_IamRolePolicyAttachment_62EC0A23": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-86898773/IamRolePolicyAttachment",
            "uniqueId": "root_cloudQueueSetConsumer86898773_IamRolePolicyAttachment_62EC0A23"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudQueueSetConsumer86898773_IamRole_F8B0511B.name}"
      },
      "root_cloudTopicOnMessagecdafee6e_IamRolePolicyAttachment_1F650C7D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "root_cloudTopicOnMessagecdafee6e_IamRolePolicyAttachment_1F650C7D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudTopicOnMessagecdafee6e_IamRole_029E78CB.name}"
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
        "function_name": "${aws_lambda_function.root_cloudQueueSetConsumer86898773_E4585B49.function_name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudQueueSetConsumer86898773_E4585B49": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-86898773/Default",
            "uniqueId": "root_cloudQueueSetConsumer86898773_E4585B49"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Queue-SetConsumer-86898773-c8cecfb3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-SetConsumer-86898773-c8cecfb3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudQueueSetConsumer86898773_IamRole_F8B0511B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudQueueSetConsumer86898773_S3Object_F2EAA6E5.key}",
        "timeout": 180,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudTopicOnMessagecdafee6e_370CBD55": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/Default",
            "uniqueId": "root_cloudTopicOnMessagecdafee6e_370CBD55"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-cdafee6e-c814de3f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-cdafee6e-c814de3f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudTopicOnMessagecdafee6e_IamRole_029E78CB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudTopicOnMessagecdafee6e_S3Object_9CFEA94C.key}",
        "timeout": 180,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_cloudTopicOnMessagecdafee6e_InvokePermissionc82b57aa3e58b626b884e8374e59ec192cf61df91b_52D09BDF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "root_cloudTopicOnMessagecdafee6e_InvokePermissionc82b57aa3e58b626b884e8374e59ec192cf61df91b_52D09BDF"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudTopicOnMessagecdafee6e_370CBD55.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudTopic_6057BD0C.arn}"
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
      "root_cloudQueueSetConsumer86898773_S3Object_F2EAA6E5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-86898773/S3Object",
            "uniqueId": "root_cloudQueueSetConsumer86898773_S3Object_F2EAA6E5"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudTopicOnMessagecdafee6e_S3Object_9CFEA94C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/S3Object",
            "uniqueId": "root_cloudTopicOnMessagecdafee6e_S3Object_9CFEA94C"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "root_cloudTopic_6057BD0C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/Default",
            "uniqueId": "root_cloudTopic_6057BD0C"
          }
        },
        "name": "cloud-Topic-c82b57aa"
      }
    },
    "aws_sns_topic_subscription": {
      "root_cloudTopic_cloudTopicTopicSubscriptioncdafee6e_B9CB1B70": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-cdafee6e",
            "uniqueId": "root_cloudTopic_cloudTopicTopicSubscriptioncdafee6e_B9CB1B70"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudTopicOnMessagecdafee6e_370CBD55.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudTopic_6057BD0C.arn}"
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    (this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this,"cloud.Topic").onMessage(new $Closure1(this,"$Closure1"),{ timeout: $stdlib.std.Duration.fromSeconds(180) }));
    (this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue").setConsumer(new $Closure2(this,"$Closure2"),{ timeout: $stdlib.std.Duration.fromSeconds(180) }));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "inflight-subscribers", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

