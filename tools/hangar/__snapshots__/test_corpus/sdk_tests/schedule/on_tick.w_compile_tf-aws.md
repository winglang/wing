# [on_tick.w](../../../../../../examples/tests/sdk_tests/schedule/on_tick.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ c1 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await c1.inc());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ c2 }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await c2.inc());
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ c1, c2, Utils }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c1.peek()) === 0)'`)})(((await c1.peek()) === 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c2.peek()) === 0)'`)})(((await c2.peek()) === 0))};
      (await Utils.sleep(((60 * 1000) * 1.1)));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c1.peek()) === 1)'`)})(((await c1.peek()) === 1))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c2.peek()) === 1)'`)})(((await c2.peek()) === 1))};
    }
  }
  return $Closure3;
}

```

## inflight.Utils.js
```js
module.exports = function({  }) {
  class Utils {
    constructor({  }) {
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
    static async sleep(milli)  {
      return (require("<ABSOLUTE_PATH>/sleep.js")["sleep"])(milli)
    }
  }
  return Utils;
}

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.15.2"
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
      "value": "[[\"root/Default/Default/on tick is called both for rate and cron schedules\",\"${aws_lambda_function.root_ontickiscalledbothforrateandcronschedules_Handler_C2E1BB5A.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_event_rule": {
      "root_fromcron_Schedule_3D2BEF3C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/Schedule",
            "uniqueId": "root_fromcron_Schedule_3D2BEF3C"
          }
        },
        "is_enabled": true,
        "schedule_expression": "cron(* * * * ? *)"
      },
      "root_fromrate_Schedule_D1B2D87D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/Schedule",
            "uniqueId": "root_fromrate_Schedule_D1B2D87D"
          }
        },
        "is_enabled": true,
        "schedule_expression": "rate(1 minute)"
      }
    },
    "aws_cloudwatch_event_target": {
      "root_fromcron_ScheduleTargetcdafee6e_9F359AC8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/ScheduleTarget-cdafee6e",
            "uniqueId": "root_fromcron_ScheduleTargetcdafee6e_9F359AC8"
          }
        },
        "arn": "${aws_lambda_function.root_fromcronOnTickcdafee6e_5A276243.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.root_fromcron_Schedule_3D2BEF3C.name}"
      },
      "root_fromrate_ScheduleTarget86898773_5D23F273": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/ScheduleTarget-86898773",
            "uniqueId": "root_fromrate_ScheduleTarget86898773_5D23F273"
          }
        },
        "arn": "${aws_lambda_function.root_fromrateOnTick86898773_8DD612E8.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.root_fromrate_Schedule_D1B2D87D.name}"
      }
    },
    "aws_dynamodb_table": {
      "root_c1_078B8EB9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/c1/Default",
            "uniqueId": "root_c1_078B8EB9"
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
      "root_c2_C0DD38D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/c2/Default",
            "uniqueId": "root_c2_C0DD38D7"
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
      "root_fromcronOnTickcdafee6e_IamRole_52B8F8DE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/IamRole",
            "uniqueId": "root_fromcronOnTickcdafee6e_IamRole_52B8F8DE"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_fromrateOnTick86898773_IamRole_071C743E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/IamRole",
            "uniqueId": "root_fromrateOnTick86898773_IamRole_071C743E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_ontickiscalledbothforrateandcronschedules_Handler_IamRole_5E1881E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/on tick is called both for rate and cron schedules/Handler/IamRole",
            "uniqueId": "root_ontickiscalledbothforrateandcronschedules_Handler_IamRole_5E1881E8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_fromcronOnTickcdafee6e_IamRolePolicy_D826D424": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/IamRolePolicy",
            "uniqueId": "root_fromcronOnTickcdafee6e_IamRolePolicy_D826D424"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_c1_078B8EB9.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_fromcronOnTickcdafee6e_IamRole_52B8F8DE.name}"
      },
      "root_fromrateOnTick86898773_IamRolePolicy_D0BE52C2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/IamRolePolicy",
            "uniqueId": "root_fromrateOnTick86898773_IamRolePolicy_D0BE52C2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_c2_C0DD38D7.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_fromrateOnTick86898773_IamRole_071C743E.name}"
      },
      "root_ontickiscalledbothforrateandcronschedules_Handler_IamRolePolicy_E072B7FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/on tick is called both for rate and cron schedules/Handler/IamRolePolicy",
            "uniqueId": "root_ontickiscalledbothforrateandcronschedules_Handler_IamRolePolicy_E072B7FB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_c1_078B8EB9.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_c2_C0DD38D7.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_ontickiscalledbothforrateandcronschedules_Handler_IamRole_5E1881E8.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_fromcronOnTickcdafee6e_IamRolePolicyAttachment_C877A8DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "root_fromcronOnTickcdafee6e_IamRolePolicyAttachment_C877A8DD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_fromcronOnTickcdafee6e_IamRole_52B8F8DE.name}"
      },
      "root_fromrateOnTick86898773_IamRolePolicyAttachment_DDF478CE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/IamRolePolicyAttachment",
            "uniqueId": "root_fromrateOnTick86898773_IamRolePolicyAttachment_DDF478CE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_fromrateOnTick86898773_IamRole_071C743E.name}"
      },
      "root_ontickiscalledbothforrateandcronschedules_Handler_IamRolePolicyAttachment_B37383AB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/on tick is called both for rate and cron schedules/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_ontickiscalledbothforrateandcronschedules_Handler_IamRolePolicyAttachment_B37383AB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_ontickiscalledbothforrateandcronschedules_Handler_IamRole_5E1881E8.name}"
      }
    },
    "aws_lambda_function": {
      "root_fromcronOnTickcdafee6e_5A276243": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/Default",
            "uniqueId": "root_fromcronOnTickcdafee6e_5A276243"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_bca69a1d": "${aws_dynamodb_table.root_c1_078B8EB9.name}",
            "WING_FUNCTION_NAME": "from_cron-OnTick-cdafee6e-c8a82a50",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "from_cron-OnTick-cdafee6e-c8a82a50",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_fromcronOnTickcdafee6e_IamRole_52B8F8DE.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_fromcronOnTickcdafee6e_S3Object_FCA3EA54.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_fromrateOnTick86898773_8DD612E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/Default",
            "uniqueId": "root_fromrateOnTick86898773_8DD612E8"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_7ba9f967": "${aws_dynamodb_table.root_c2_C0DD38D7.name}",
            "WING_FUNCTION_NAME": "from_rate-OnTick-86898773-c8fb9fa6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "from_rate-OnTick-86898773-c8fb9fa6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_fromrateOnTick86898773_IamRole_071C743E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_fromrateOnTick86898773_S3Object_4F54473D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_ontickiscalledbothforrateandcronschedules_Handler_C2E1BB5A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/on tick is called both for rate and cron schedules/Handler/Default",
            "uniqueId": "root_ontickiscalledbothforrateandcronschedules_Handler_C2E1BB5A"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_7ba9f967": "${aws_dynamodb_table.root_c2_C0DD38D7.name}",
            "DYNAMODB_TABLE_NAME_bca69a1d": "${aws_dynamodb_table.root_c1_078B8EB9.name}",
            "WING_FUNCTION_NAME": "Handler-c8fa0698",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8fa0698",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_ontickiscalledbothforrateandcronschedules_Handler_IamRole_5E1881E8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_ontickiscalledbothforrateandcronschedules_Handler_S3Object_D7B071A1.key}",
        "timeout": 120,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_fromcronOnTickcdafee6e_InvokePermissionc87c172627b55591ac07edabd9e505482b7ee436d9_D167F85A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9",
            "uniqueId": "root_fromcronOnTickcdafee6e_InvokePermissionc87c172627b55591ac07edabd9e505482b7ee436d9_D167F85A"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_fromcronOnTickcdafee6e_5A276243.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.root_fromcronOnTickcdafee6e_5A276243.version}",
        "source_arn": "${aws_cloudwatch_event_rule.root_fromcron_Schedule_3D2BEF3C.arn}"
      },
      "root_fromrateOnTick86898773_InvokePermissionc83fb79a39ace0a06023877b9ffa8744f9f18c55e4_59003CAB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4",
            "uniqueId": "root_fromrateOnTick86898773_InvokePermissionc83fb79a39ace0a06023877b9ffa8744f9f18c55e4_59003CAB"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_fromrateOnTick86898773_8DD612E8.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.root_fromrateOnTick86898773_8DD612E8.version}",
        "source_arn": "${aws_cloudwatch_event_rule.root_fromrate_Schedule_D1B2D87D.arn}"
      }
    },
    "aws_s3_bucket": {
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "root_fromcronOnTickcdafee6e_S3Object_FCA3EA54": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-cdafee6e/S3Object",
            "uniqueId": "root_fromcronOnTickcdafee6e_S3Object_FCA3EA54"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_fromrateOnTick86898773_S3Object_4F54473D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-86898773/S3Object",
            "uniqueId": "root_fromrateOnTick86898773_S3Object_4F54473D"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_ontickiscalledbothforrateandcronschedules_Handler_S3Object_D7B071A1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/on tick is called both for rate and cron schedules/Handler/S3Object",
            "uniqueId": "root_ontickiscalledbothforrateandcronschedules_Handler_S3Object_D7B071A1"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const c1_client = context._lift(c1);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            c1: ${c1_client},
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
        if (ops.includes("$inflight_init")) {
          $Closure1._registerBindObject(c1, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(c1, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const c2_client = context._lift(c2);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            c2: ${c2_client},
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
        if (ops.includes("$inflight_init")) {
          $Closure2._registerBindObject(c2, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(c2, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
    }
    class Utils extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("sleep");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Utils.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const UtilsClient = ${Utils._toInflightType(this).text};
            const client = new UtilsClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("sleep")) {
        }
        super._registerTypeBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        const c1_client = context._lift(c1);
        const c2_client = context._lift(c2);
        const UtilsClient = Utils._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            c1: ${c1_client},
            c2: ${c2_client},
            Utils: ${UtilsClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure3._registerBindObject(c1, host, []);
          $Closure3._registerBindObject(c2, host, []);
        }
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(Utils, host, ["sleep"]);
          $Closure3._registerBindObject(c1, host, ["peek"]);
          $Closure3._registerBindObject(c2, host, ["peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const from_cron = this.node.root.newAbstract("@winglang/sdk.cloud.Schedule",this,"from_cron",{ cron: "* * * * ?" });
    const from_rate = this.node.root.newAbstract("@winglang/sdk.cloud.Schedule",this,"from_rate",{ rate: $stdlib.std.Duration.fromSeconds(60) });
    const c1 = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"c1");
    const c2 = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"c2");
    (from_cron.onTick(new $Closure1(this,"$Closure1")));
    (from_rate.onTick(new $Closure2(this,"$Closure2")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"on tick is called both for rate and cron schedules",new $Closure3(this,"$Closure3"),{
    "timeout": $stdlib.std.Duration.fromSeconds(120),}
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "on_tick", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```

