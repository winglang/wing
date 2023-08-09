# [on_tick.w](../../../../../../examples/tests/sdk_tests/schedule/on_tick.w) | compile | tf-aws

## inflight.$Closure1.js
```js
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

```

## inflight.$Closure2.js
```js
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

```

## inflight.$Closure3.js
```js
module.exports = function({ $c1, $c2, $std_Duration, $util_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: c1.peek() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $c1.peek()),0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: c2.peek() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $c2.peek()),0)))};
      (await $util_Util.sleep((await $std_Duration.fromSeconds(66))));
      {((cond) => {if (!cond) throw new Error("assertion failed: c1.peek() >= 1")})(((await $c1.peek()) >= 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: c2.peek() >= 1")})(((await $c2.peek()) >= 1))};
    }
  }
  return $Closure3;
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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/on tick is called both for rate and cron schedules\",\"${aws_lambda_function.undefined_ontickiscalledbothforrateandcronschedules_Handler_EF8CDFCF.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_event_rule": {
      "undefined_from_cron_Schedule_9953FC32": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_cron/Schedule",
            "uniqueId": "undefined_from_cron_Schedule_9953FC32"
          }
        },
        "is_enabled": true,
        "schedule_expression": "cron(* * * * ? *)"
      },
      "undefined_from_rate_Schedule_BBE1521A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_rate/Schedule",
            "uniqueId": "undefined_from_rate_Schedule_BBE1521A"
          }
        },
        "is_enabled": true,
        "schedule_expression": "rate(1 minute)"
      }
    },
    "aws_cloudwatch_event_target": {
      "undefined_from_cron_ScheduleTarget-83b2983f_DBD17799": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_cron/ScheduleTarget-83b2983f",
            "uniqueId": "undefined_from_cron_ScheduleTarget-83b2983f_DBD17799"
          }
        },
        "arn": "${aws_lambda_function.undefined_from_cron-OnTick-83b2983f_37F68A0B.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.undefined_from_cron_Schedule_9953FC32.name}"
      },
      "undefined_from_rate_ScheduleTarget-b378226f_B7018477": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_rate/ScheduleTarget-b378226f",
            "uniqueId": "undefined_from_rate_ScheduleTarget-b378226f_B7018477"
          }
        },
        "arn": "${aws_lambda_function.undefined_from_rate-OnTick-b378226f_57743415.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.undefined_from_rate_Schedule_BBE1521A.name}"
      }
    },
    "aws_dynamodb_table": {
      "undefined_c1_2D35B479": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/c1/Default",
            "uniqueId": "undefined_c1_2D35B479"
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
        "name": "wing-counter-c1-c8f2405a"
      },
      "undefined_c2_FB5E193C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/c2/Default",
            "uniqueId": "undefined_c2_FB5E193C"
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
        "name": "wing-counter-c2-c84e7ac3"
      }
    },
    "aws_iam_role": {
      "undefined_from_cron-OnTick-83b2983f_IamRole_1F289D08": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_cron-OnTick-83b2983f/IamRole",
            "uniqueId": "undefined_from_cron-OnTick-83b2983f_IamRole_1F289D08"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_from_rate-OnTick-b378226f_IamRole_5EE016E9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_rate-OnTick-b378226f/IamRole",
            "uniqueId": "undefined_from_rate-OnTick-b378226f_IamRole_5EE016E9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_ontickiscalledbothforrateandcronschedules_Handler_IamRole_E66EC43F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/on tick is called both for rate and cron schedules/Handler/IamRole",
            "uniqueId": "undefined_ontickiscalledbothforrateandcronschedules_Handler_IamRole_E66EC43F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_from_cron-OnTick-83b2983f_IamRolePolicy_2A3D774C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_cron-OnTick-83b2983f/IamRolePolicy",
            "uniqueId": "undefined_from_cron-OnTick-83b2983f_IamRolePolicy_2A3D774C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_c1_2D35B479.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_from_cron-OnTick-83b2983f_IamRole_1F289D08.name}"
      },
      "undefined_from_rate-OnTick-b378226f_IamRolePolicy_3AB7D704": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_rate-OnTick-b378226f/IamRolePolicy",
            "uniqueId": "undefined_from_rate-OnTick-b378226f_IamRolePolicy_3AB7D704"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_c2_FB5E193C.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_from_rate-OnTick-b378226f_IamRole_5EE016E9.name}"
      },
      "undefined_ontickiscalledbothforrateandcronschedules_Handler_IamRolePolicy_C6C6783D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/on tick is called both for rate and cron schedules/Handler/IamRolePolicy",
            "uniqueId": "undefined_ontickiscalledbothforrateandcronschedules_Handler_IamRolePolicy_C6C6783D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_c1_2D35B479.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_c2_FB5E193C.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_ontickiscalledbothforrateandcronschedules_Handler_IamRole_E66EC43F.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_from_cron-OnTick-83b2983f_IamRolePolicyAttachment_88A5F8D8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_cron-OnTick-83b2983f/IamRolePolicyAttachment",
            "uniqueId": "undefined_from_cron-OnTick-83b2983f_IamRolePolicyAttachment_88A5F8D8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_from_cron-OnTick-83b2983f_IamRole_1F289D08.name}"
      },
      "undefined_from_rate-OnTick-b378226f_IamRolePolicyAttachment_07B9B095": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_rate-OnTick-b378226f/IamRolePolicyAttachment",
            "uniqueId": "undefined_from_rate-OnTick-b378226f_IamRolePolicyAttachment_07B9B095"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_from_rate-OnTick-b378226f_IamRole_5EE016E9.name}"
      },
      "undefined_ontickiscalledbothforrateandcronschedules_Handler_IamRolePolicyAttachment_A195A855": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/on tick is called both for rate and cron schedules/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_ontickiscalledbothforrateandcronschedules_Handler_IamRolePolicyAttachment_A195A855"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_ontickiscalledbothforrateandcronschedules_Handler_IamRole_E66EC43F.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_from_cron-OnTick-83b2983f_37F68A0B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_cron-OnTick-83b2983f/Default",
            "uniqueId": "undefined_from_cron-OnTick-83b2983f_37F68A0B"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_ed7f26fd": "${aws_dynamodb_table.undefined_c1_2D35B479.name}",
            "WING_FUNCTION_NAME": "from_cron-OnTick-83b2983f-c88a529c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "from_cron-OnTick-83b2983f-c88a529c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_from_cron-OnTick-83b2983f_IamRole_1F289D08.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_from_cron-OnTick-83b2983f_S3Object_E593D657.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_from_rate-OnTick-b378226f_57743415": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_rate-OnTick-b378226f/Default",
            "uniqueId": "undefined_from_rate-OnTick-b378226f_57743415"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_2411f48d": "${aws_dynamodb_table.undefined_c2_FB5E193C.name}",
            "WING_FUNCTION_NAME": "from_rate-OnTick-b378226f-c8080a1d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "from_rate-OnTick-b378226f-c8080a1d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_from_rate-OnTick-b378226f_IamRole_5EE016E9.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_from_rate-OnTick-b378226f_S3Object_2A9BE2A0.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_ontickiscalledbothforrateandcronschedules_Handler_EF8CDFCF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/on tick is called both for rate and cron schedules/Handler/Default",
            "uniqueId": "undefined_ontickiscalledbothforrateandcronschedules_Handler_EF8CDFCF"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_2411f48d": "${aws_dynamodb_table.undefined_c2_FB5E193C.name}",
            "DYNAMODB_TABLE_NAME_ed7f26fd": "${aws_dynamodb_table.undefined_c1_2D35B479.name}",
            "WING_FUNCTION_NAME": "Handler-c853899b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c853899b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_ontickiscalledbothforrateandcronschedules_Handler_IamRole_E66EC43F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_ontickiscalledbothforrateandcronschedules_Handler_S3Object_829F551D.key}",
        "timeout": 120,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "undefined_from_cron-OnTick-83b2983f_InvokePermission-c8122e350a2cc4dc1cfee1266b36f12c24d655e22e_9F7298FB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_cron-OnTick-83b2983f/InvokePermission-c8122e350a2cc4dc1cfee1266b36f12c24d655e22e",
            "uniqueId": "undefined_from_cron-OnTick-83b2983f_InvokePermission-c8122e350a2cc4dc1cfee1266b36f12c24d655e22e_9F7298FB"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_from_cron-OnTick-83b2983f_37F68A0B.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.undefined_from_cron-OnTick-83b2983f_37F68A0B.version}",
        "source_arn": "${aws_cloudwatch_event_rule.undefined_from_cron_Schedule_9953FC32.arn}"
      },
      "undefined_from_rate-OnTick-b378226f_InvokePermission-c8fae5ec5c55a3e84b5255d807ddc4ce98350398b6_AEA0A4FA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_rate-OnTick-b378226f/InvokePermission-c8fae5ec5c55a3e84b5255d807ddc4ce98350398b6",
            "uniqueId": "undefined_from_rate-OnTick-b378226f_InvokePermission-c8fae5ec5c55a3e84b5255d807ddc4ce98350398b6_AEA0A4FA"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_from_rate-OnTick-b378226f_57743415.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.undefined_from_rate-OnTick-b378226f_57743415.version}",
        "source_arn": "${aws_cloudwatch_event_rule.undefined_from_rate_Schedule_BBE1521A.arn}"
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      }
    },
    "aws_s3_object": {
      "undefined_from_cron-OnTick-83b2983f_S3Object_E593D657": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_cron-OnTick-83b2983f/S3Object",
            "uniqueId": "undefined_from_cron-OnTick-83b2983f_S3Object_E593D657"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_from_rate-OnTick-b378226f_S3Object_2A9BE2A0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/from_rate-OnTick-b378226f/S3Object",
            "uniqueId": "undefined_from_rate-OnTick-b378226f_S3Object_2A9BE2A0"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_ontickiscalledbothforrateandcronschedules_Handler_S3Object_829F551D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/on tick is called both for rate and cron schedules/Handler/S3Object",
            "uniqueId": "undefined_ontickiscalledbothforrateandcronschedules_Handler_S3Object_829F551D"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $c1: ${context._lift(c1)},
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
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(c1, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            $c2: ${context._lift(c2)},
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
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(c2, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3.js")({
            $c1: ${context._lift(c1)},
            $c2: ${context._lift(c2)},
            $std_Duration: ${context._lift(std.Duration)},
            $util_Util: ${context._lift(util.Util)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this).text};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(c1, host, ["peek"]);
          $Closure3._registerBindObject(c2, host, ["peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const from_cron = this.node.root.newAbstract("@winglang/sdk.cloud.Schedule",this,"from_cron",{ cron: "* * * * ?" });
    const from_rate = this.node.root.newAbstract("@winglang/sdk.cloud.Schedule",this,"from_rate",{ rate: (std.Duration.fromSeconds(60)) });
    const c1 = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"c1");
    const c2 = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"c2");
    (from_cron.onTick(new $Closure1(this,"$Closure1")));
    (from_rate.onTick(new $Closure2(this,"$Closure2")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"on tick is called both for rate and cron schedules",new $Closure3(this,"$Closure3"),({"timeout": (std.Duration.fromSeconds(120))}));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "on_tick", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

