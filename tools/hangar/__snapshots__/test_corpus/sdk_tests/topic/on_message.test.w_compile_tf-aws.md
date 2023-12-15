# [on_message.test.w](../../../../../../examples/tests/sdk_tests/topic/on_message.test.w) | compile | tf-aws

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
    async handle() {
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
module.exports = function({ $c }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $c.inc());
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
module.exports = function({ $c, $std_Duration, $t, $util_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      for (const i of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,5,false)) {
        (await $t.publish("msg"));
      }
      (await $util_Util.waitUntil(async () => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $c.peek()),10));
      }, { timeout: (await $std_Duration.fromSeconds(10)) }));
      {((cond) => {if (!cond) throw new Error("assertion failed: c.peek() == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $c.peek()),10)))};
    }
  }
  return $Closure3;
}
//# sourceMappingURL=./inflight.$Closure3-1.cjs.map
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
      "cloudTopic-OnMessage0_CloudwatchLogGroup_EE5F97B3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage0_CloudwatchLogGroup_EE5F97B3"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage0-c81c4559",
        "retention_in_days": 30
      },
      "cloudTopic-OnMessage1_CloudwatchLogGroup_50FF3467": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage1/CloudwatchLogGroup",
            "uniqueId": "cloudTopic-OnMessage1_CloudwatchLogGroup_50FF3467"
          }
        },
        "name": "/aws/lambda/cloud-Topic-OnMessage1-c8da402d",
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
      "cloudTopic-OnMessage0_IamRole_A9AB13E2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage0/IamRole",
            "uniqueId": "cloudTopic-OnMessage0_IamRole_A9AB13E2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudTopic-OnMessage1_IamRole_8052D72E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage1/IamRole",
            "uniqueId": "cloudTopic-OnMessage1_IamRole_8052D72E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudTopic-OnMessage0_IamRolePolicy_38E6FB0F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage0/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage0_IamRolePolicy_38E6FB0F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage0_IamRole_A9AB13E2.name}"
      },
      "cloudTopic-OnMessage1_IamRolePolicy_B541E262": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage1/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage1_IamRolePolicy_B541E262"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage1_IamRole_8052D72E.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudTopic-OnMessage0_IamRolePolicyAttachment_0E97F0D4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage0_IamRolePolicyAttachment_0E97F0D4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage0_IamRole_A9AB13E2.name}"
      },
      "cloudTopic-OnMessage1_IamRolePolicyAttachment_059688CF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage1/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage1_IamRolePolicyAttachment_059688CF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage1_IamRole_8052D72E.name}"
      }
    },
    "aws_lambda_function": {
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
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
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
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage0_S3Object_751FA064.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudTopic-OnMessage1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage1/Default",
            "uniqueId": "cloudTopic-OnMessage1"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage1-c8da402d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage1-c8da402d",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage1_IamRole_8052D72E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage1_S3Object_C2572EFD.key}",
        "timeout": 60,
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
      },
      "cloudTopic-OnMessage1_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_3F1C0938": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage1/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage1_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_3F1C0938"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage1.function_name}",
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
      },
      "cloudTopic-OnMessage1_S3Object_C2572EFD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage1/S3Object",
            "uniqueId": "cloudTopic-OnMessage1_S3Object_C2572EFD"
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
      },
      "cloudTopic_TopicSubscription1_BD9D6BB9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/TopicSubscription1",
            "uniqueId": "cloudTopic_TopicSubscription1_BD9D6BB9"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage1.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
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
            $c: ${$stdlib.core.liftObject(c)},
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
          $Closure2._registerOnLiftObject(c, host, ["inc"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure3-1.cjs")({
            $c: ${$stdlib.core.liftObject(c)},
            $std_Duration: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
            $t: ${$stdlib.core.liftObject(t)},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
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
          $Closure3._registerOnLiftObject(c, host, ["peek"]);
          $Closure3._registerOnLiftObject(t, host, ["publish"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const t = this.node.root.new("@winglang/sdk.cloud.Topic", cloud.Topic, this, "cloud.Topic");
    const c = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
    (t.onMessage(new $Closure1(this, "$Closure1")));
    (t.onMessage(new $Closure2(this, "$Closure2")));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:onMessage", new $Closure3(this, "$Closure3"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "on_message.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

