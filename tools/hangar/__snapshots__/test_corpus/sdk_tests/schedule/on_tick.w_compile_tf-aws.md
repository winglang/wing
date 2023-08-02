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
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/on tick is called both for rate and cron schedules\",\"${aws_lambda_function.ontickiscalledbothforrateandcronschedules_Handler_B4B8DF58.arn}\"]]"
    }
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
      "from_cron_ScheduleTarget-cdafee6e_41C7782A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/ScheduleTarget-cdafee6e",
            "uniqueId": "from_cron_ScheduleTarget-cdafee6e_41C7782A"
          }
        },
        "arn": "${aws_lambda_function.from_cron-OnTick-cdafee6e.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.from_cron_Schedule_6C1613E8.name}"
      },
      "from_rate_ScheduleTarget-86898773_91268C49": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/ScheduleTarget-86898773",
            "uniqueId": "from_rate_ScheduleTarget-86898773_91268C49"
          }
        },
        "arn": "${aws_lambda_function.from_rate-OnTick-86898773.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.from_rate_Schedule_5B82E706.name}"
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
      "from_cron-OnTick-cdafee6e_IamRole_E3633395": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/IamRole",
            "uniqueId": "from_cron-OnTick-cdafee6e_IamRole_E3633395"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "from_rate-OnTick-86898773_IamRole_0C967FAF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/IamRole",
            "uniqueId": "from_rate-OnTick-86898773_IamRole_0C967FAF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "ontickiscalledbothforrateandcronschedules_Handler_IamRole_89BBCA80": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/on tick is called both for rate and cron schedules/Handler/IamRole",
            "uniqueId": "ontickiscalledbothforrateandcronschedules_Handler_IamRole_89BBCA80"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "from_cron-OnTick-cdafee6e_IamRolePolicy_29BCA338": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/IamRolePolicy",
            "uniqueId": "from_cron-OnTick-cdafee6e_IamRolePolicy_29BCA338"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.from_cron-OnTick-cdafee6e_IamRole_E3633395.name}"
      },
      "from_rate-OnTick-86898773_IamRolePolicy_4E5A4115": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/IamRolePolicy",
            "uniqueId": "from_rate-OnTick-86898773_IamRolePolicy_4E5A4115"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.c2.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.from_rate-OnTick-86898773_IamRole_0C967FAF.name}"
      },
      "ontickiscalledbothforrateandcronschedules_Handler_IamRolePolicy_458097AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/on tick is called both for rate and cron schedules/Handler/IamRolePolicy",
            "uniqueId": "ontickiscalledbothforrateandcronschedules_Handler_IamRolePolicy_458097AC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.c1.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.c2.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.ontickiscalledbothforrateandcronschedules_Handler_IamRole_89BBCA80.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "from_cron-OnTick-cdafee6e_IamRolePolicyAttachment_C58E382F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "from_cron-OnTick-cdafee6e_IamRolePolicyAttachment_C58E382F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.from_cron-OnTick-cdafee6e_IamRole_E3633395.name}"
      },
      "from_rate-OnTick-86898773_IamRolePolicyAttachment_A9498CA5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/IamRolePolicyAttachment",
            "uniqueId": "from_rate-OnTick-86898773_IamRolePolicyAttachment_A9498CA5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.from_rate-OnTick-86898773_IamRole_0C967FAF.name}"
      },
      "ontickiscalledbothforrateandcronschedules_Handler_IamRolePolicyAttachment_39063BDF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/on tick is called both for rate and cron schedules/Handler/IamRolePolicyAttachment",
            "uniqueId": "ontickiscalledbothforrateandcronschedules_Handler_IamRolePolicyAttachment_39063BDF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.ontickiscalledbothforrateandcronschedules_Handler_IamRole_89BBCA80.name}"
      }
    },
    "aws_lambda_function": {
      "from_cron-OnTick-cdafee6e": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/Default",
            "uniqueId": "from_cron-OnTick-cdafee6e"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_bca69a1d": "${aws_dynamodb_table.c1.name}",
            "WING_FUNCTION_NAME": "from_cron-OnTick-cdafee6e-c8a82a50",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "from_cron-OnTick-cdafee6e-c8a82a50",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.from_cron-OnTick-cdafee6e_IamRole_E3633395.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.from_cron-OnTick-cdafee6e_S3Object_0845743D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "from_rate-OnTick-86898773": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/Default",
            "uniqueId": "from_rate-OnTick-86898773"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_7ba9f967": "${aws_dynamodb_table.c2.name}",
            "WING_FUNCTION_NAME": "from_rate-OnTick-86898773-c8fb9fa6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "from_rate-OnTick-86898773-c8fb9fa6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.from_rate-OnTick-86898773_IamRole_0C967FAF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.from_rate-OnTick-86898773_S3Object_68EB6CB9.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "ontickiscalledbothforrateandcronschedules_Handler_B4B8DF58": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/on tick is called both for rate and cron schedules/Handler/Default",
            "uniqueId": "ontickiscalledbothforrateandcronschedules_Handler_B4B8DF58"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_7ba9f967": "${aws_dynamodb_table.c2.name}",
            "DYNAMODB_TABLE_NAME_bca69a1d": "${aws_dynamodb_table.c1.name}",
            "WING_FUNCTION_NAME": "Handler-c8fa0698",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8fa0698",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.ontickiscalledbothforrateandcronschedules_Handler_IamRole_89BBCA80.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.ontickiscalledbothforrateandcronschedules_Handler_S3Object_C05D01D6.key}",
        "timeout": 120,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "from_cron-OnTick-cdafee6e_InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9_5F48CFEA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9",
            "uniqueId": "from_cron-OnTick-cdafee6e_InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9_5F48CFEA"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.from_cron-OnTick-cdafee6e.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.from_cron-OnTick-cdafee6e.version}",
        "source_arn": "${aws_cloudwatch_event_rule.from_cron_Schedule_6C1613E8.arn}"
      },
      "from_rate-OnTick-86898773_InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4_50324BC1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4",
            "uniqueId": "from_rate-OnTick-86898773_InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4_50324BC1"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.from_rate-OnTick-86898773.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.from_rate-OnTick-86898773.version}",
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
      "from_cron-OnTick-cdafee6e_S3Object_0845743D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/S3Object",
            "uniqueId": "from_cron-OnTick-cdafee6e_S3Object_0845743D"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "from_rate-OnTick-86898773_S3Object_68EB6CB9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/S3Object",
            "uniqueId": "from_rate-OnTick-86898773_S3Object_68EB6CB9"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "ontickiscalledbothforrateandcronschedules_Handler_S3Object_C05D01D6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/on tick is called both for rate and cron schedules/Handler/S3Object",
            "uniqueId": "ontickiscalledbothforrateandcronschedules_Handler_S3Object_C05D01D6"
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"on tick is called both for rate and cron schedules",new $Closure3(this,"$Closure3"),{
    "timeout": (std.Duration.fromSeconds(120)),}
    );
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "on_tick", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

