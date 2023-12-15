# [on_tick.test.w](../../../../../../examples/tests/sdk_tests/schedule/on_tick.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $c1 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $c1.inc());
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $c2 }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $c2.inc());
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
module.exports = function({ $c1, $c2, $std_Duration, $util_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const c1Value = (await $c1.peek());
      const c2Value = (await $c2.peek());
      (await $util_Util.sleep((await $std_Duration.fromSeconds(66))));
      {((cond) => {if (!cond) throw new Error("assertion failed: c1.peek() >= c1Value + 1")})(((await $c1.peek()) >= (c1Value + 1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: c2.peek() >= c2Value + 1")})(((await $c2.peek()) >= (c2Value + 1)))};
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
    "aws_cloudwatch_event_rule": {
      "from_cron_Schedule_6C1613E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/Schedule",
            "uniqueId": "from_cron_Schedule_6C1613E8"
          }
        },
        "is_enabled": true,
        "schedule_expression": "cron(* * * * ? *)"
      },
      "from_rate_Schedule_5B82E706": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/Schedule",
            "uniqueId": "from_rate_Schedule_5B82E706"
          }
        },
        "is_enabled": true,
        "schedule_expression": "rate(1 minute)"
      }
    },
    "aws_cloudwatch_event_target": {
      "from_cron_ScheduleTarget0_7A4E7226": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/ScheduleTarget0",
            "uniqueId": "from_cron_ScheduleTarget0_7A4E7226"
          }
        },
        "arn": "${aws_lambda_function.from_cron_OnTick0_6029AF44.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.from_cron_Schedule_6C1613E8.name}"
      },
      "from_rate_ScheduleTarget0_35951CD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/ScheduleTarget0",
            "uniqueId": "from_rate_ScheduleTarget0_35951CD0"
          }
        },
        "arn": "${aws_lambda_function.from_rate_OnTick0_1B33F073.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.from_rate_Schedule_5B82E706.name}"
      }
    },
    "aws_cloudwatch_log_group": {
      "from_cron_OnTick0_CloudwatchLogGroup_2763AA6C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/CloudwatchLogGroup",
            "uniqueId": "from_cron_OnTick0_CloudwatchLogGroup_2763AA6C"
          }
        },
        "name": "/aws/lambda/OnTick0-c82d2f1d",
        "retention_in_days": 30
      },
      "from_rate_OnTick0_CloudwatchLogGroup_051D0516": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/CloudwatchLogGroup",
            "uniqueId": "from_rate_OnTick0_CloudwatchLogGroup_051D0516"
          }
        },
        "name": "/aws/lambda/OnTick0-c82ff92a",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "c1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/c1/Default",
            "uniqueId": "c1"
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
        "name": "wing-counter-c1-c8b6c50f"
      },
      "c2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/c2/Default",
            "uniqueId": "c2"
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
        "name": "wing-counter-c2-c81701d2"
      }
    },
    "aws_iam_role": {
      "from_cron_OnTick0_IamRole_70AA37F2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/IamRole",
            "uniqueId": "from_cron_OnTick0_IamRole_70AA37F2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "from_rate_OnTick0_IamRole_A7066F91": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/IamRole",
            "uniqueId": "from_rate_OnTick0_IamRole_A7066F91"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "from_cron_OnTick0_IamRolePolicy_6E9071E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/IamRolePolicy",
            "uniqueId": "from_cron_OnTick0_IamRolePolicy_6E9071E3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.from_cron_OnTick0_IamRole_70AA37F2.name}"
      },
      "from_rate_OnTick0_IamRolePolicy_5036BC29": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/IamRolePolicy",
            "uniqueId": "from_rate_OnTick0_IamRolePolicy_5036BC29"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c2.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.from_rate_OnTick0_IamRole_A7066F91.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "from_cron_OnTick0_IamRolePolicyAttachment_9E04D949": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/IamRolePolicyAttachment",
            "uniqueId": "from_cron_OnTick0_IamRolePolicyAttachment_9E04D949"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.from_cron_OnTick0_IamRole_70AA37F2.name}"
      },
      "from_rate_OnTick0_IamRolePolicyAttachment_548892FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/IamRolePolicyAttachment",
            "uniqueId": "from_rate_OnTick0_IamRolePolicyAttachment_548892FB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.from_rate_OnTick0_IamRole_A7066F91.name}"
      }
    },
    "aws_lambda_function": {
      "from_cron_OnTick0_6029AF44": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/Default",
            "uniqueId": "from_cron_OnTick0_6029AF44"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_bca69a1d": "${aws_dynamodb_table.c1.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "OnTick0-c82d2f1d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "OnTick0-c82d2f1d",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.from_cron_OnTick0_IamRole_70AA37F2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.from_cron_OnTick0_S3Object_0A802C5C.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "from_rate_OnTick0_1B33F073": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/Default",
            "uniqueId": "from_rate_OnTick0_1B33F073"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_7ba9f967": "${aws_dynamodb_table.c2.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "OnTick0-c82ff92a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "OnTick0-c82ff92a",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.from_rate_OnTick0_IamRole_A7066F91.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.from_rate_OnTick0_S3Object_C6F96441.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "from_cron_OnTick0_InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9_77879B23": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9",
            "uniqueId": "from_cron_OnTick0_InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9_77879B23"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.from_cron_OnTick0_6029AF44.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.from_cron_OnTick0_6029AF44.version}",
        "source_arn": "${aws_cloudwatch_event_rule.from_cron_Schedule_6C1613E8.arn}"
      },
      "from_rate_OnTick0_InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4_FED6D620": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4",
            "uniqueId": "from_rate_OnTick0_InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4_FED6D620"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.from_rate_OnTick0_1B33F073.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.from_rate_OnTick0_1B33F073.version}",
        "source_arn": "${aws_cloudwatch_event_rule.from_rate_Schedule_5B82E706.arn}"
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
      "from_cron_OnTick0_S3Object_0A802C5C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/S3Object",
            "uniqueId": "from_cron_OnTick0_S3Object_0A802C5C"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "from_rate_OnTick0_S3Object_C6F96441": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/S3Object",
            "uniqueId": "from_rate_OnTick0_S3Object_C6F96441"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
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
            $c1: ${$stdlib.core.liftObject(c1)},
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
          $Closure1._registerOnLiftObject(c1, host, ["inc"]);
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
            $c2: ${$stdlib.core.liftObject(c2)},
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
          $Closure2._registerOnLiftObject(c2, host, ["inc"]);
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
            $c1: ${$stdlib.core.liftObject(c1)},
            $c2: ${$stdlib.core.liftObject(c2)},
            $std_Duration: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
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
          $Closure3._registerOnLiftObject(c1, host, ["peek"]);
          $Closure3._registerOnLiftObject(c2, host, ["peek"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const from_cron = this.node.root.new("@winglang/sdk.cloud.Schedule", cloud.Schedule, this, "from_cron", { cron: "* * * * ?" });
    const from_rate = this.node.root.new("@winglang/sdk.cloud.Schedule", cloud.Schedule, this, "from_rate", { rate: (std.Duration.fromSeconds(60)) });
    const c1 = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "c1");
    const c2 = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "c2");
    (from_cron.onTick(new $Closure1(this, "$Closure1")));
    (from_rate.onTick(new $Closure2(this, "$Closure2")));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "on tick is called both for rate and cron schedules", new $Closure3(this, "$Closure3"), { timeout: (std.Duration.fromSeconds(120)) });
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "on_tick.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

