# [on_tick.w](../../../../examples/tests/valid/on_tick.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ c1 }) {
  class $Inflight1 {
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
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ c2 }) {
  class $Inflight2 {
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
  return $Inflight2;
}

```

## clients/$Inflight3.inflight.js
```js
module.exports = function({ c1, c2, Utils }) {
  class $Inflight3 {
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
  return $Inflight3;
}

```

## clients/Utils.inflight.js
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
      "root_fromcron_ScheduleTargete46e5cb7_44B50440": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/ScheduleTarget-e46e5cb7",
            "uniqueId": "root_fromcron_ScheduleTargete46e5cb7_44B50440"
          }
        },
        "arn": "${aws_lambda_function.root_fromcronOnTicke46e5cb7_A42A8002.qualified_arn}",
        "rule": "${aws_cloudwatch_event_rule.root_fromcron_Schedule_3D2BEF3C.name}"
      },
      "root_fromrate_ScheduleTargetb3f3d188_4188FA30": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/ScheduleTarget-b3f3d188",
            "uniqueId": "root_fromrate_ScheduleTargetb3f3d188_4188FA30"
          }
        },
        "arn": "${aws_lambda_function.root_fromrateOnTickb3f3d188_627D3FA9.qualified_arn}",
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
      "root_fromcronOnTicke46e5cb7_IamRole_8C7D77A2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-e46e5cb7/IamRole",
            "uniqueId": "root_fromcronOnTicke46e5cb7_IamRole_8C7D77A2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_fromrateOnTickb3f3d188_IamRole_F32F287B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-b3f3d188/IamRole",
            "uniqueId": "root_fromrateOnTickb3f3d188_IamRole_F32F287B"
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
      "root_fromcronOnTicke46e5cb7_IamRolePolicy_33567ED6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-e46e5cb7/IamRolePolicy",
            "uniqueId": "root_fromcronOnTicke46e5cb7_IamRolePolicy_33567ED6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_c1_078B8EB9.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_fromcronOnTicke46e5cb7_IamRole_8C7D77A2.name}"
      },
      "root_fromrateOnTickb3f3d188_IamRolePolicy_BF36579F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-b3f3d188/IamRolePolicy",
            "uniqueId": "root_fromrateOnTickb3f3d188_IamRolePolicy_BF36579F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_c2_C0DD38D7.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_fromrateOnTickb3f3d188_IamRole_F32F287B.name}"
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
      "root_fromcronOnTicke46e5cb7_IamRolePolicyAttachment_76A00079": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-e46e5cb7/IamRolePolicyAttachment",
            "uniqueId": "root_fromcronOnTicke46e5cb7_IamRolePolicyAttachment_76A00079"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_fromcronOnTicke46e5cb7_IamRole_8C7D77A2.name}"
      },
      "root_fromrateOnTickb3f3d188_IamRolePolicyAttachment_C6FAC3A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-b3f3d188/IamRolePolicyAttachment",
            "uniqueId": "root_fromrateOnTickb3f3d188_IamRolePolicyAttachment_C6FAC3A4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_fromrateOnTickb3f3d188_IamRole_F32F287B.name}"
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
      "root_fromcronOnTicke46e5cb7_A42A8002": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-e46e5cb7/Default",
            "uniqueId": "root_fromcronOnTicke46e5cb7_A42A8002"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_bca69a1d": "${aws_dynamodb_table.root_c1_078B8EB9.name}",
            "WING_FUNCTION_NAME": "from_cron-OnTick-e46e5cb7-c8bbee93"
          }
        },
        "function_name": "from_cron-OnTick-e46e5cb7-c8bbee93",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_fromcronOnTicke46e5cb7_IamRole_8C7D77A2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_fromcronOnTicke46e5cb7_S3Object_56A665EC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_fromrateOnTickb3f3d188_627D3FA9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-b3f3d188/Default",
            "uniqueId": "root_fromrateOnTickb3f3d188_627D3FA9"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_7ba9f967": "${aws_dynamodb_table.root_c2_C0DD38D7.name}",
            "WING_FUNCTION_NAME": "from_rate-OnTick-b3f3d188-c8793bb2"
          }
        },
        "function_name": "from_rate-OnTick-b3f3d188-c8793bb2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_fromrateOnTickb3f3d188_IamRole_F32F287B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_fromrateOnTickb3f3d188_S3Object_FB1259B3.key}",
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
            "WING_FUNCTION_NAME": "Handler-c8fa0698"
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
      "root_fromcronOnTicke46e5cb7_InvokePermissionc87c172627b55591ac07edabd9e505482b7ee436d9_C2E92402": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-e46e5cb7/InvokePermission-c87c172627b55591ac07edabd9e505482b7ee436d9",
            "uniqueId": "root_fromcronOnTicke46e5cb7_InvokePermissionc87c172627b55591ac07edabd9e505482b7ee436d9_C2E92402"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_fromcronOnTicke46e5cb7_A42A8002.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.root_fromcronOnTicke46e5cb7_A42A8002.version}",
        "source_arn": "${aws_cloudwatch_event_rule.root_fromcron_Schedule_3D2BEF3C.arn}"
      },
      "root_fromrateOnTickb3f3d188_InvokePermissionc83fb79a39ace0a06023877b9ffa8744f9f18c55e4_396CD4E9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-b3f3d188/InvokePermission-c83fb79a39ace0a06023877b9ffa8744f9f18c55e4",
            "uniqueId": "root_fromrateOnTickb3f3d188_InvokePermissionc83fb79a39ace0a06023877b9ffa8744f9f18c55e4_396CD4E9"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_fromrateOnTickb3f3d188_627D3FA9.function_name}",
        "principal": "events.amazonaws.com",
        "qualifier": "${aws_lambda_function.root_fromrateOnTickb3f3d188_627D3FA9.version}",
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
      "root_fromcronOnTicke46e5cb7_S3Object_56A665EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron-OnTick-e46e5cb7/S3Object",
            "uniqueId": "root_fromcronOnTicke46e5cb7_S3Object_56A665EC"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_fromrateOnTickb3f3d188_S3Object_FB1259B3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate-OnTick-b3f3d188/S3Object",
            "uniqueId": "root_fromrateOnTickb3f3d188_S3Object_FB1259B3"
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
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js";
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
            const $Inflight1Client = ${$Inflight1._toInflightType(this).text};
            const client = new $Inflight1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight1._registerBindObject(c1, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(c1, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight2.inflight.js";
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
            const $Inflight2Client = ${$Inflight2._toInflightType(this).text};
            const client = new $Inflight2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight2._registerBindObject(c2, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight2._registerBindObject(c2, host, ["inc"]);
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
        const self_client_path = "./clients/Utils.inflight.js";
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
    class $Inflight3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight3.inflight.js";
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
            const $Inflight3Client = ${$Inflight3._toInflightType(this).text};
            const client = new $Inflight3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight3._registerBindObject(c1, host, []);
          $Inflight3._registerBindObject(c2, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight3._registerBindObject(Utils, host, ["sleep"]);
          $Inflight3._registerBindObject(c1, host, ["peek"]);
          $Inflight3._registerBindObject(c2, host, ["peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const from_cron = this.node.root.newAbstract("@winglang/sdk.cloud.Schedule",this,"from_cron",{ cron: "* * * * ?" });
    const from_rate = this.node.root.newAbstract("@winglang/sdk.cloud.Schedule",this,"from_rate",{ rate: $stdlib.std.Duration.fromSeconds(60) });
    const c1 = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"c1");
    const c2 = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"c2");
    (from_cron.onTick(new $Inflight1(this,"$Inflight1")));
    (from_rate.onTick(new $Inflight2(this,"$Inflight2")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"on tick is called both for rate and cron schedules",new $Inflight3(this,"$Inflight3"),{
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

