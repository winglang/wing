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
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "cloudQueue-SetConsumer0_CloudwatchLogGroup_FCFCF419": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/CloudwatchLogGroup",
            "uniqueId": "cloudQueue-SetConsumer0_CloudwatchLogGroup_FCFCF419"
          }
        },
        "name": "/aws/lambda/cloud-Queue-SetConsumer0-c8b576c9",
        "retention_in_days": 30
      },
      "cloudTopic-OnMessage0_CloudwatchLogGroup_EE5F97B3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage0_CloudwatchLogGroup_EE5F97B3"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage0-c81c4559",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudQueue-SetConsumer0_IamRole_968DB138": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/IamRole",
            "uniqueId": "cloudQueue-SetConsumer0_IamRole_968DB138"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudTopic-OnMessage0_IamRole_A9AB13E2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage0/IamRole",
            "uniqueId": "cloudTopic-OnMessage0_IamRole_A9AB13E2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudQueue-SetConsumer0_IamRolePolicy_3E29E517": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/IamRolePolicy",
            "uniqueId": "cloudQueue-SetConsumer0_IamRolePolicy_3E29E517"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudQueue-SetConsumer0_IamRole_968DB138.name}"
      },
      "cloudTopic-OnMessage0_IamRolePolicy_38E6FB0F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage0/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage0_IamRolePolicy_38E6FB0F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage0_IamRole_A9AB13E2.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudQueue-SetConsumer0_IamRolePolicyAttachment_B207137A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/IamRolePolicyAttachment",
            "uniqueId": "cloudQueue-SetConsumer0_IamRolePolicyAttachment_B207137A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudQueue-SetConsumer0_IamRole_968DB138.name}"
      },
      "cloudTopic-OnMessage0_IamRolePolicyAttachment_0E97F0D4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage0_IamRolePolicyAttachment_0E97F0D4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage0_IamRole_A9AB13E2.name}"
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
        "function_name": "${aws_lambda_function.cloudQueue-SetConsumer0.function_name}"
      }
    },
    "aws_lambda_function": {
      "cloudQueue-SetConsumer0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/Default",
            "uniqueId": "cloudQueue-SetConsumer0"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Queue-SetConsumer0-c8b576c9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-SetConsumer0-c8b576c9",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudQueue-SetConsumer0_IamRole_968DB138.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudQueue-SetConsumer0_S3Object_52D070FF.key}",
        "timeout": "${aws_sqs_queue.cloudQueue.visibility_timeout_seconds}",
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudTopic-OnMessage0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage0/Default",
            "uniqueId": "cloudTopic-OnMessage0"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage0-c81c4559",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage0-c81c4559",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage0_IamRole_A9AB13E2.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage0_S3Object_751FA064.key}",
        "timeout": 180,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudTopic-OnMessage0_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_91E7486D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage0/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage0_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_91E7486D"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage0.function_name}",
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
      "cloudQueue-SetConsumer0_S3Object_52D070FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/S3Object",
            "uniqueId": "cloudQueue-SetConsumer0_S3Object_52D070FF"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudTopic-OnMessage0_S3Object_751FA064": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage0/S3Object",
            "uniqueId": "cloudTopic-OnMessage0_S3Object_751FA064"
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
      "cloudTopic_TopicSubscription0_D19DE229": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/TopicSubscription0",
            "uniqueId": "cloudTopic_TopicSubscription0_D19DE229"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage0.arn}",
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
        return [...super._supportedOps(), "handle", "$inflight_init"];
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
        return [...super._supportedOps(), "handle", "$inflight_init"];
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

