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
//# sourceMappingURL=inflight.$Closure1-1.js.map
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
//# sourceMappingURL=inflight.$Closure2-1.js.map
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
      "cloudQueue-SetConsumer-85851f_CloudwatchLogGroup_FA958C19": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-85851f/CloudwatchLogGroup",
            "uniqueId": "cloudQueue-SetConsumer-85851f_CloudwatchLogGroup_FA958C19"
          }
        },
        "name": "/aws/lambda/cloud-Queue-SetConsumer-85851f-c899ba64",
        "retention_in_days": 30
      },
      "cloudTopic-OnMessage-84a3bb_CloudwatchLogGroup_1C5D4563": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-84a3bb/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage-84a3bb_CloudwatchLogGroup_1C5D4563"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage-84a3bb-c8cb3b7c",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudQueue-SetConsumer-85851f_IamRole_56845706": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-85851f/IamRole",
            "uniqueId": "cloudQueue-SetConsumer-85851f_IamRole_56845706"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudTopic-OnMessage-84a3bb_IamRole_34EC3DCB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-84a3bb/IamRole",
            "uniqueId": "cloudTopic-OnMessage-84a3bb_IamRole_34EC3DCB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudQueue-SetConsumer-85851f_IamRolePolicy_9E3E0933": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-85851f/IamRolePolicy",
            "uniqueId": "cloudQueue-SetConsumer-85851f_IamRolePolicy_9E3E0933"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudQueue-SetConsumer-85851f_IamRole_56845706.name}"
      },
      "cloudTopic-OnMessage-84a3bb_IamRolePolicy_EB63B4EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-84a3bb/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-84a3bb_IamRolePolicy_EB63B4EC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-84a3bb_IamRole_34EC3DCB.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudQueue-SetConsumer-85851f_IamRolePolicyAttachment_8C7B5972": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-85851f/IamRolePolicyAttachment",
            "uniqueId": "cloudQueue-SetConsumer-85851f_IamRolePolicyAttachment_8C7B5972"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudQueue-SetConsumer-85851f_IamRole_56845706.name}"
      },
      "cloudTopic-OnMessage-84a3bb_IamRolePolicyAttachment_DF99CBC5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-84a3bb/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-84a3bb_IamRolePolicyAttachment_DF99CBC5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-84a3bb_IamRole_34EC3DCB.name}"
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
        "function_name": "${aws_lambda_function.cloudQueue-SetConsumer-85851f.function_name}"
      }
    },
    "aws_lambda_function": {
      "cloudQueue-SetConsumer-85851f": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-85851f/Default",
            "uniqueId": "cloudQueue-SetConsumer-85851f"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Queue-SetConsumer-85851f-c899ba64",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-SetConsumer-85851f-c899ba64",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudQueue-SetConsumer-85851f_IamRole_56845706.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudQueue-SetConsumer-85851f_S3Object_1C042825.key}",
        "timeout": "${aws_sqs_queue.cloudQueue.visibility_timeout_seconds}",
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudTopic-OnMessage-84a3bb": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-84a3bb/Default",
            "uniqueId": "cloudTopic-OnMessage-84a3bb"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-84a3bb-c8cb3b7c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-84a3bb-c8cb3b7c",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-84a3bb_IamRole_34EC3DCB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-84a3bb_S3Object_2338F78F.key}",
        "timeout": 180,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudTopic-OnMessage-84a3bb_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_331C5290": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-84a3bb/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-84a3bb_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_331C5290"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-84a3bb.function_name}",
        "principal": "sns.amazonaws.com",
        "qualifier": "${aws_lambda_function.cloudTopic-OnMessage-84a3bb.version}",
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
      "cloudQueue-SetConsumer-85851f_S3Object_1C042825": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-85851f/S3Object",
            "uniqueId": "cloudQueue-SetConsumer-85851f_S3Object_1C042825"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudTopic-OnMessage-84a3bb_S3Object_2338F78F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-84a3bb/S3Object",
            "uniqueId": "cloudTopic-OnMessage-84a3bb_S3Object_2338F78F"
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
      "cloudTopic_cloudTopic-TopicSubscription-84a3bb_007E19C7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-84a3bb",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-84a3bb_007E19C7"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-84a3bb.arn}",
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
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
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
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
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
    (this.node.root.new("@winglang/sdk.cloud.Topic", cloud.Topic, this, "cloud.Topic").onMessage(new $Closure1(this, "$Closure1"), { timeout: (std.Duration.fromSeconds(180)) }));
    (this.node.root.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "cloud.Queue").setConsumer(new $Closure2(this, "$Closure2"), { timeout: (std.Duration.fromSeconds(180)) }));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight-subscribers.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

