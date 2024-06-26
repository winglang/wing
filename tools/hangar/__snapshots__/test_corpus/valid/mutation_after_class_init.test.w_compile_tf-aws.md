# [mutation_after_class_init.test.w](../../../../../examples/tests/valid/mutation_after_class_init.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
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
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
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
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
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
//# sourceMappingURL=inflight.$Closure3-1.cjs.map
```

## inflight.$Closure4-1.cjs
```cjs
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
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.cjs.map
```

## inflight.Queue-1.cjs
```cjs
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
//# sourceMappingURL=inflight.Queue-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
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
      "Queue_Bucket_OnCreate-OnMessage0_CloudwatchLogGroup_BF038703": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Bucket/OnCreate-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "Queue_Bucket_OnCreate-OnMessage0_CloudwatchLogGroup_BF038703"
          }
        },
        "name": "/aws/lambda/OnCreate-OnMessage0-c8cf52b9",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "Counter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Counter/Default",
            "uniqueId": "Counter"
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
        "name": "wing-counter-Counter-c824ef62"
      }
    },
    "aws_iam_role": {
      "Queue_Bucket_OnCreate-OnMessage0_IamRole_210FCAAB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Bucket/OnCreate-OnMessage0/IamRole",
            "uniqueId": "Queue_Bucket_OnCreate-OnMessage0_IamRole_210FCAAB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Queue_Bucket_OnCreate-OnMessage0_IamRolePolicy_10E86967": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Bucket/OnCreate-OnMessage0/IamRolePolicy",
            "uniqueId": "Queue_Bucket_OnCreate-OnMessage0_IamRolePolicy_10E86967"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Counter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Queue_Bucket_OnCreate-OnMessage0_IamRole_210FCAAB.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Queue_Bucket_OnCreate-OnMessage0_IamRolePolicyAttachment_C6B42DE8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Bucket/OnCreate-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "Queue_Bucket_OnCreate-OnMessage0_IamRolePolicyAttachment_C6B42DE8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Queue_Bucket_OnCreate-OnMessage0_IamRole_210FCAAB.name}"
      }
    },
    "aws_lambda_function": {
      "Queue_Bucket_OnCreate-OnMessage0_F7EE1690": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Bucket/OnCreate-OnMessage0/Default",
            "uniqueId": "Queue_Bucket_OnCreate-OnMessage0_F7EE1690"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_6cb5a3a4": "${aws_dynamodb_table.Counter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "OnCreate-OnMessage0-c8cf52b9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "OnCreate-OnMessage0-c8cf52b9",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Queue_Bucket_OnCreate-OnMessage0_IamRole_210FCAAB.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Queue_Bucket_OnCreate-OnMessage0_S3Object_D3C5CDCB.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Queue_Bucket_OnCreate-OnMessage0_InvokePermission-c858cf97f3e1a27ecdbc73b06b0748fac8d80bfa4e_BD57ACF0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Bucket/OnCreate-OnMessage0/InvokePermission-c858cf97f3e1a27ecdbc73b06b0748fac8d80bfa4e",
            "uniqueId": "Queue_Bucket_OnCreate-OnMessage0_InvokePermission-c858cf97f3e1a27ecdbc73b06b0748fac8d80bfa4e_BD57ACF0"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Queue_Bucket_OnCreate-OnMessage0_F7EE1690.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.Queue_Bucket_OnCreate_DA88E2C3.arn}"
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
      "Queue_Bucket_A87615FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Bucket/Default",
            "uniqueId": "Queue_Bucket_A87615FF"
          }
        },
        "bucket_prefix": "bucket-c81048e6-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_notification": {
      "Queue_Bucket_S3BucketNotification_B826201B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Bucket/S3BucketNotification",
            "uniqueId": "Queue_Bucket_S3BucketNotification_B826201B"
          }
        },
        "bucket": "${aws_s3_bucket.Queue_Bucket_A87615FF.id}",
        "depends_on": [
          "aws_sns_topic_policy.Queue_Bucket_OnCreate_PublishPermission-c81048e6ea798f253db9714095de7ff4c76c443489_3E123A5B"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.Queue_Bucket_OnCreate_DA88E2C3.arn}"
          }
        ]
      }
    },
    "aws_s3_object": {
      "Queue_Bucket_OnCreate-OnMessage0_S3Object_D3C5CDCB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Bucket/OnCreate-OnMessage0/S3Object",
            "uniqueId": "Queue_Bucket_OnCreate-OnMessage0_S3Object_D3C5CDCB"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "Queue_Bucket_OnCreate_DA88E2C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Bucket/OnCreate/Default",
            "uniqueId": "Queue_Bucket_OnCreate_DA88E2C3"
          }
        },
        "name": "OnCreate-c858cf97"
      }
    },
    "aws_sns_topic_policy": {
      "Queue_Bucket_OnCreate_PublishPermission-c81048e6ea798f253db9714095de7ff4c76c443489_3E123A5B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Bucket/OnCreate/PublishPermission-c81048e6ea798f253db9714095de7ff4c76c443489",
            "uniqueId": "Queue_Bucket_OnCreate_PublishPermission-c81048e6ea798f253db9714095de7ff4c76c443489_3E123A5B"
          }
        },
        "arn": "${aws_sns_topic.Queue_Bucket_OnCreate_DA88E2C3.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.Queue_Bucket_OnCreate_DA88E2C3.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.Queue_Bucket_A87615FF.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "Queue_Bucket_OnCreate_TopicSubscription0_9E4D200B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Bucket/OnCreate/TopicSubscription0",
            "uniqueId": "Queue_Bucket_OnCreate_TopicSubscription0_9E4D200B"
          }
        },
        "endpoint": "${aws_lambda_function.Queue_Bucket_OnCreate-OnMessage0_F7EE1690.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.Queue_Bucket_OnCreate_DA88E2C3.arn}"
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
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    const util = $stdlib.util;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class Queue extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.data = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
        class $Closure1 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
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
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
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
                [__parent_this_2.consumer, []],
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
          require("${$helpers.normalPath(__dirname)}/inflight.Queue-1.cjs")({
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.cjs")({
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
            [c, []],
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.cjs")({
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
            [$stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"), []],
            [c, []],
            [q, []],
          ],
        });
      }
    }
    const q = new Queue(this, "Queue");
    const c = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
    (q.setConsumer(new $Closure3(this, "$Closure3")));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:hi", new $Closure4(this, "$Closure4"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "mutation_after_class_init.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

