# [inflight-subscribers.test.w](../../../../../examples/tests/valid/inflight-subscribers.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
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

## inflight.$Closure2-1.js
```js
"use strict";
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
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "cloudQueue-SetConsumer-86898773_CloudwatchLogGroup_389C274F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-86898773/CloudwatchLogGroup",
            "uniqueId": "cloudQueue-SetConsumer-86898773_CloudwatchLogGroup_389C274F"
          }
        },
        "name": "/aws/lambda/cloud-Queue-SetConsumer-86898773-c8cecfb3",
        "retention_in_days": 30
      },
      "cloudTopic-OnMessage-cdafee6e_CloudwatchLogGroup_DF1BF72A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage-cdafee6e_CloudwatchLogGroup_DF1BF72A"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage-cdafee6e-c814de3f",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudQueue-SetConsumer-86898773_IamRole_36B46149": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-86898773/IamRole",
            "uniqueId": "cloudQueue-SetConsumer-86898773_IamRole_36B46149"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudTopic-OnMessage-cdafee6e_IamRole_54B0303A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/IamRole",
            "uniqueId": "cloudTopic-OnMessage-cdafee6e_IamRole_54B0303A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudQueue-SetConsumer-86898773_IamRolePolicy_719A16F5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-86898773/IamRolePolicy",
            "uniqueId": "cloudQueue-SetConsumer-86898773_IamRolePolicy_719A16F5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudQueue-SetConsumer-86898773_IamRole_36B46149.name}"
      },
      "cloudTopic-OnMessage-cdafee6e_IamRolePolicy_986CF80A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-cdafee6e_IamRolePolicy_986CF80A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-cdafee6e_IamRole_54B0303A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudQueue-SetConsumer-86898773_IamRolePolicyAttachment_6A38F562": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-86898773/IamRolePolicyAttachment",
            "uniqueId": "cloudQueue-SetConsumer-86898773_IamRolePolicyAttachment_6A38F562"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudQueue-SetConsumer-86898773_IamRole_36B46149.name}"
      },
      "cloudTopic-OnMessage-cdafee6e_IamRolePolicyAttachment_32D59DC5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-cdafee6e_IamRolePolicyAttachment_32D59DC5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-cdafee6e_IamRole_54B0303A.name}"
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
        "function_name": "${aws_lambda_function.cloudQueue-SetConsumer-86898773.function_name}"
      }
    },
    "aws_lambda_function": {
      "cloudQueue-SetConsumer-86898773": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-86898773/Default",
            "uniqueId": "cloudQueue-SetConsumer-86898773"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Queue-SetConsumer-86898773-c8cecfb3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-SetConsumer-86898773-c8cecfb3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudQueue-SetConsumer-86898773_IamRole_36B46149.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudQueue-SetConsumer-86898773_S3Object_630353AD.key}",
        "timeout": "${aws_sqs_queue.cloudQueue.visibility_timeout_seconds}",
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudTopic-OnMessage-cdafee6e": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/Default",
            "uniqueId": "cloudTopic-OnMessage-cdafee6e"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-cdafee6e-c814de3f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-cdafee6e-c814de3f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-cdafee6e_IamRole_54B0303A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-cdafee6e_S3Object_59ED9245.key}",
        "timeout": 180,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudTopic-OnMessage-cdafee6e_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_D167648C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-cdafee6e_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_D167648C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-cdafee6e.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudTopic.arn}"
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
      "cloudQueue-SetConsumer-86898773_S3Object_630353AD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-86898773/S3Object",
            "uniqueId": "cloudQueue-SetConsumer-86898773_S3Object_630353AD"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudTopic-OnMessage-cdafee6e_S3Object_59ED9245": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/S3Object",
            "uniqueId": "cloudTopic-OnMessage-cdafee6e_S3Object_59ED9245"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "cloudTopic": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/Default",
            "uniqueId": "cloudTopic"
          }
        },
        "name": "cloud-Topic-c82b57aa"
      }
    },
    "aws_sns_topic_subscription": {
      "cloudTopic_cloudTopic-TopicSubscription-cdafee6e_A58E0350": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-cdafee6e",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-cdafee6e_A58E0350"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-cdafee6e.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
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
        "message_retention_seconds": 3600,
        "name": "cloud-Queue-c86e03d8",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
    }
    (this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this, "cloud.Topic").onMessage(new $Closure1(this, "$Closure1"), { timeout: (std.Duration.fromSeconds(180)) }));
    (this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this, "cloud.Queue").setConsumer(new $Closure2(this, "$Closure2"), { timeout: (std.Duration.fromSeconds(180)) }));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight-subscribers.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

