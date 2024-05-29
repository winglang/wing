# [hello.test.w](../../../../../examples/tests/valid/hello.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $bucket }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(message) {
      (await $bucket.put("wing.txt", String.raw({ raw: ["Hello, ", ""] }, message)));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
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
      "Queue-SetConsumer0_CloudwatchLogGroup_56C2891C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/CloudwatchLogGroup",
            "uniqueId": "Queue-SetConsumer0_CloudwatchLogGroup_56C2891C"
          }
        },
        "name": "/aws/lambda/Queue-SetConsumer0-c83c303c",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Queue-SetConsumer0_IamRole_7F9ED9ED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/IamRole",
            "uniqueId": "Queue-SetConsumer0_IamRole_7F9ED9ED"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Queue-SetConsumer0_IamRolePolicy_0299B5AB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/IamRolePolicy",
            "uniqueId": "Queue-SetConsumer0_IamRolePolicy_0299B5AB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.Queue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.Bucket.arn}\",\"${aws_s3_bucket.Bucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Queue-SetConsumer0_IamRole_7F9ED9ED.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Queue-SetConsumer0_IamRolePolicyAttachment_4A4C5C5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/IamRolePolicyAttachment",
            "uniqueId": "Queue-SetConsumer0_IamRolePolicyAttachment_4A4C5C5D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Queue-SetConsumer0_IamRole_7F9ED9ED.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "Queue_EventSourceMapping_8332F7DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/EventSourceMapping",
            "uniqueId": "Queue_EventSourceMapping_8332F7DC"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.Queue.arn}",
        "function_name": "${aws_lambda_function.Queue-SetConsumer0.function_name}",
        "function_response_types": [
          "ReportBatchItemFailures"
        ]
      }
    },
    "aws_lambda_function": {
      "Queue-SetConsumer0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/Default",
            "uniqueId": "Queue-SetConsumer0"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_1357ca3a": "${aws_s3_bucket.Bucket.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Queue-SetConsumer0-c83c303c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Queue-SetConsumer0-c83c303c",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Queue-SetConsumer0_IamRole_7F9ED9ED.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Queue-SetConsumer0_S3Object_2AD0A795.key}",
        "timeout": "${aws_sqs_queue.Queue.visibility_timeout_seconds}",
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
        "force_destroy": false
      },
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
      "Queue-SetConsumer0_S3Object_2AD0A795": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue-SetConsumer0/S3Object",
            "uniqueId": "Queue-SetConsumer0_S3Object_2AD0A795"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "Queue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Default",
            "uniqueId": "Queue"
          }
        },
        "message_retention_seconds": 3600,
        "name": "Queue-c822c726",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $bucket: ${$stdlib.core.liftObject(bucket)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
        };
      }
      get _liftMap() {
        return ({
          "handle": [
            [bucket, ["put"]],
          ],
          "$inflight_init": [
            [bucket, []],
          ],
        });
      }
    }
    const bucket = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    const queue = this.node.root.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "Queue");
    (queue.setConsumer(new $Closure1(this, "$Closure1")));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "hello.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

