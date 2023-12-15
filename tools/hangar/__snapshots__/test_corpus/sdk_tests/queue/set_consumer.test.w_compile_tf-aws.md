# [set_consumer.test.w](../../../../../../examples/tests/sdk_tests/queue/set_consumer.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $c }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(msg) {
      (await $c.inc());
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $predicate, $q, $std_Duration, $util_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $q.push("hello"));
      (await $q.push("world"));
      let i = 0;
      while ((i < 600)) {
        i = (i + 1);
        if ((await $predicate.test())) {
          {((cond) => {if (!cond) throw new Error("assertion failed: predicate.test()")})((await $predicate.test()))};
          return;
        }
        (await $util_Util.sleep((await $std_Duration.fromSeconds(1))));
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: predicate.test()")})((await $predicate.test()))};
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
```

## inflight.Predicate-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class Predicate {
    constructor({ $this_c }) {
      this.$this_c = $this_c;
    }
    async test() {
      return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await this.$this_c.peek()),2));
    }
  }
  return Predicate;
}
//# sourceMappingURL=./inflight.Predicate-1.cjs.map
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
      "cloudQueue-SetConsumer0_IamRole_968DB138": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/IamRole",
            "uniqueId": "cloudQueue-SetConsumer0_IamRole_968DB138"
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
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudQueue-SetConsumer0_IamRole_968DB138.name}"
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
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
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
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudQueue-SetConsumer0_S3Object_52D070FF.key}",
        "timeout": "${aws_sqs_queue.cloudQueue.visibility_timeout_seconds}",
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
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

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Predicate extends $stdlib.std.Resource {
      constructor($scope, $id, c) {
        super($scope, $id);
        this.c = c;
      }
      static _toInflightType() {
        return `
          require("././inflight.Predicate-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const PredicateClient = ${Predicate._toInflightType(this)};
            const client = new PredicateClient({
              $this_c: ${$stdlib.core.liftObject(this.c)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "test", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          Predicate._registerOnLiftObject(this.c, host, []);
        }
        if (ops.includes("test")) {
          Predicate._registerOnLiftObject(this.c, host, ["peek"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure1-1.cjs")({
            $c: ${$stdlib.core.liftObject(c)},
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
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(c, host, ["inc"]);
        }
        super._registerOnLift(host, ops);
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
          require("././inflight.$Closure2-1.cjs")({
            $predicate: ${$stdlib.core.liftObject(predicate)},
            $q: ${$stdlib.core.liftObject(q)},
            $std_Duration: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
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
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerOnLiftObject(predicate, host, ["test"]);
          $Closure2._registerOnLiftObject(q, host, ["push"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const q = this.node.root.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "cloud.Queue");
    const c = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
    (q.setConsumer(new $Closure1(this, "$Closure1")));
    const predicate = new Predicate(this, "Predicate", c);
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:setConsumer", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "set_consumer.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

