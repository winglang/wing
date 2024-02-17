# [mutation_after_class_init.test.w](../../../../../examples/tests/valid/mutation_after_class_init.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      console.log("dummy code");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $__parent_this_2_consumer }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      (await $__parent_this_2_consumer(key));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.$Closure3-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $c }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(m) {
      console.log(String.raw({ raw: ["received ", ""] }, m));
      (await $c.inc());
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.js.map
```

## inflight.$Closure4-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $c, $q, $util_Util }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $q.push("message1"));
      (await $util_Util.waitUntil((async () => {
        return ((await $c.peek()) > 0);
      })));
      $helpers.assert(((await $c.peek()) > 0), "c.peek() > 0");
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.js.map
```

## inflight.Queue-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Queue {
    constructor({ $this_data }) {
      this.$this_data = $this_data;
    }
    async push(m) {
      (await this.$this_data.put(m, "empty"));
    }
  }
  return Queue;
}
//# sourceMappingURL=inflight.Queue-1.js.map
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
      "Queue_cloudBucket_oncreate-OnMessage0_CloudwatchLogGroup_78BA3607": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/cloud.Bucket/oncreate-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "Queue_cloudBucket_oncreate-OnMessage0_CloudwatchLogGroup_78BA3607"
          }
        },
        "name": "/aws/lambda/oncreate-OnMessage0-c8a3d864",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "cloudCounter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "cloudCounter"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    },
    "aws_iam_role": {
      "Queue_cloudBucket_oncreate-OnMessage0_IamRole_B18EBA00": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/cloud.Bucket/oncreate-OnMessage0/IamRole",
            "uniqueId": "Queue_cloudBucket_oncreate-OnMessage0_IamRole_B18EBA00"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Queue_cloudBucket_oncreate-OnMessage0_IamRolePolicy_BB4A7F9B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/cloud.Bucket/oncreate-OnMessage0/IamRolePolicy",
            "uniqueId": "Queue_cloudBucket_oncreate-OnMessage0_IamRolePolicy_BB4A7F9B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Queue_cloudBucket_oncreate-OnMessage0_IamRole_B18EBA00.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Queue_cloudBucket_oncreate-OnMessage0_IamRolePolicyAttachment_E343A2A6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/cloud.Bucket/oncreate-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "Queue_cloudBucket_oncreate-OnMessage0_IamRolePolicyAttachment_E343A2A6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Queue_cloudBucket_oncreate-OnMessage0_IamRole_B18EBA00.name}"
      }
    },
    "aws_lambda_function": {
      "Queue_cloudBucket_oncreate-OnMessage0_FD912CD5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/cloud.Bucket/oncreate-OnMessage0/Default",
            "uniqueId": "Queue_cloudBucket_oncreate-OnMessage0_FD912CD5"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "oncreate-OnMessage0-c8a3d864",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "oncreate-OnMessage0-c8a3d864",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Queue_cloudBucket_oncreate-OnMessage0_IamRole_B18EBA00.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Queue_cloudBucket_oncreate-OnMessage0_S3Object_B43B9942.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Queue_cloudBucket_oncreate-OnMessage0_InvokePermission-c851fe19a411010d18454128930197e51456417e85_C80FDF61": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/cloud.Bucket/oncreate-OnMessage0/InvokePermission-c851fe19a411010d18454128930197e51456417e85",
            "uniqueId": "Queue_cloudBucket_oncreate-OnMessage0_InvokePermission-c851fe19a411010d18454128930197e51456417e85_C80FDF61"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Queue_cloudBucket_oncreate-OnMessage0_FD912CD5.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Queue_cloudBucket_oncreate_5E96074E.arn}"
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
      },
      "Queue_cloudBucket_D034B6BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/cloud.Bucket/Default",
            "uniqueId": "Queue_cloudBucket_D034B6BF"
          }
        },
        "bucket_prefix": "cloud-bucket-c8060195-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_notification": {
      "Queue_cloudBucket_S3BucketNotification_9CE123DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/cloud.Bucket/S3BucketNotification",
            "uniqueId": "Queue_cloudBucket_S3BucketNotification_9CE123DD"
          }
        },
        "bucket": "${aws_s3_bucket.Queue_cloudBucket_D034B6BF.id}",
        "depends_on": [
          "aws_sns_topic_policy.Queue_cloudBucket_oncreate_PublishPermission-c8060195e8963c2cff1db2c9e82897cfcd8f3f7da7_C9113ED7"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.Queue_cloudBucket_oncreate_5E96074E.arn}"
          }
        ]
      }
    },
    "aws_s3_object": {
      "Queue_cloudBucket_oncreate-OnMessage0_S3Object_B43B9942": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/cloud.Bucket/oncreate-OnMessage0/S3Object",
            "uniqueId": "Queue_cloudBucket_oncreate-OnMessage0_S3Object_B43B9942"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "Queue_cloudBucket_oncreate_5E96074E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/cloud.Bucket/oncreate/Default",
            "uniqueId": "Queue_cloudBucket_oncreate_5E96074E"
          }
        },
        "name": "oncreate-c851fe19"
      }
    },
    "aws_sns_topic_policy": {
      "Queue_cloudBucket_oncreate_PublishPermission-c8060195e8963c2cff1db2c9e82897cfcd8f3f7da7_C9113ED7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/cloud.Bucket/oncreate/PublishPermission-c8060195e8963c2cff1db2c9e82897cfcd8f3f7da7",
            "uniqueId": "Queue_cloudBucket_oncreate_PublishPermission-c8060195e8963c2cff1db2c9e82897cfcd8f3f7da7_C9113ED7"
          }
        },
        "arn": "${aws_sns_topic.Queue_cloudBucket_oncreate_5E96074E.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.Queue_cloudBucket_oncreate_5E96074E.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.Queue_cloudBucket_D034B6BF.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "Queue_cloudBucket_oncreate_TopicSubscription0_019229E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/cloud.Bucket/oncreate/TopicSubscription0",
            "uniqueId": "Queue_cloudBucket_oncreate_TopicSubscription0_019229E8"
          }
        },
        "endpoint": "${aws_lambda_function.Queue_cloudBucket_oncreate-OnMessage0_FD912CD5.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Queue_cloudBucket_oncreate_5E96074E.arn}"
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
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Queue extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.data = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
        const __parent_this_1 = this;
        class $Closure1 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure1Client = ${$Closure1._toInflightType()};
                const client = new $Closure1Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
              ],
              "$inflight_init": [
              ],
            });
          }
        }
        this.consumer = new $Closure1(this, "$Closure1");
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.js")({
                $__parent_this_2_consumer: ${$stdlib.core.liftObject(__parent_this_2.consumer)},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure2Client = ${$Closure2._toInflightType()};
                const client = new $Closure2Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [__parent_this_2.consumer, ["handle"]],
              ],
              "$inflight_init": [
              ],
            });
          }
        }
        (this.data.onCreate(new $Closure2(this, "$Closure2")));
      }
      setConsumer(fn) {
        this.consumer = fn;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Queue-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const QueueClient = ${Queue._toInflightType()};
            const client = new QueueClient({
              $this_data: ${$stdlib.core.liftObject(this.data)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "push": [
            [this.data, ["put"]],
          ],
          "$inflight_init": [
            [this.data, []],
          ],
        });
      }
    }
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.js")({
            $c: ${$stdlib.core.liftObject(c)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType()};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [c, ["inc"]],
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class $Closure4 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.js")({
            $c: ${$stdlib.core.liftObject(c)},
            $q: ${$stdlib.core.liftObject(q)},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType()};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"), ["waitUntil"]],
            [c, ["peek"]],
            [q, ["push"]],
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    const q = new Queue(this, "Queue");
    const c = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
    (q.setConsumer(new $Closure3(this, "$Closure3")));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:hi", new $Closure4(this, "$Closure4"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "mutation_after_class_init.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

