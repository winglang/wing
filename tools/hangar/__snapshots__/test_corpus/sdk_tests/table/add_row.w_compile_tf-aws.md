# [add_row.w](../../../../../../examples/tests/sdk_tests/table/add_row.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ table, marioInfo, peachInfo, std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { return JSON.stringify(args[0], null, args[1]) })([(await table.get("mario"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([marioInfo]))'`)})((((args) => { return JSON.stringify(args[0], null, args[1]) })([(await table.get("mario"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([marioInfo])))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { return JSON.stringify(args[0], null, args[1]) })([(await table.get("peach"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([peachInfo]))'`)})((((args) => { return JSON.stringify(args[0], null, args[1]) })([(await table.get("peach"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([peachInfo])))};
    }
  }
  return $Closure1;
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
      "value": "[[\"root/Default/Default/test:addRow\",\"${aws_lambda_function.root_testaddRow_Handler_341A155A.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "root_cloudTable_323D7643": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Table/Default",
            "uniqueId": "root_cloudTable_323D7643"
          }
        },
        "attribute": [
          {
            "name": "name",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "name",
        "name": "userscloud.Table-c83b78a7"
      }
    },
    "aws_dynamodb_table_item": {
      "root_cloudTable_DynamodbTableItemmario_B5126782": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Table/DynamodbTableItem-mario",
            "uniqueId": "root_cloudTable_DynamodbTableItemmario_B5126782"
          }
        },
        "hash_key": "mario",
        "item": "{\"gender\":\"male\",\"role\":\"plumber\"}",
        "table_name": "${aws_dynamodb_table.root_cloudTable_323D7643.name}"
      },
      "root_cloudTable_DynamodbTableItempeach_63A97BD4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Table/DynamodbTableItem-peach",
            "uniqueId": "root_cloudTable_DynamodbTableItempeach_63A97BD4"
          }
        },
        "hash_key": "peach",
        "item": "{\"gender\":\"female\",\"role\":\"princess\"}",
        "table_name": "${aws_dynamodb_table.root_cloudTable_323D7643.name}"
      }
    },
    "aws_iam_role": {
      "root_testaddRow_Handler_IamRole_938BAC5C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addRow/Handler/IamRole",
            "uniqueId": "root_testaddRow_Handler_IamRole_938BAC5C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testaddRow_Handler_IamRolePolicy_4078E893": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addRow/Handler/IamRolePolicy",
            "uniqueId": "root_testaddRow_Handler_IamRolePolicy_4078E893"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testaddRow_Handler_IamRole_938BAC5C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testaddRow_Handler_IamRolePolicyAttachment_263D7BE3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addRow/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testaddRow_Handler_IamRolePolicyAttachment_263D7BE3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testaddRow_Handler_IamRole_938BAC5C.name}"
      }
    },
    "aws_lambda_function": {
      "root_testaddRow_Handler_341A155A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addRow/Handler/Default",
            "uniqueId": "root_testaddRow_Handler_341A155A"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"gender\":0}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "name",
            "WING_FUNCTION_NAME": "Handler-c8f74599",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f74599",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testaddRow_Handler_IamRole_938BAC5C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testaddRow_Handler_S3Object_98654367.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
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
      "root_testaddRow_Handler_S3Object_98654367": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addRow/Handler/S3Object",
            "uniqueId": "root_testaddRow_Handler_S3Object_98654367"
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
        const table_client = context._lift(table);
        const marioInfo_client = context._lift(marioInfo);
        const peachInfo_client = context._lift(peachInfo);
        const std_JsonClient = std.Json._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            table: ${table_client},
            marioInfo: ${marioInfo_client},
            peachInfo: ${peachInfo_client},
            std_Json: ${std_JsonClient.text},
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
          $Closure1._registerBindObject(marioInfo, host, []);
          $Closure1._registerBindObject(peachInfo, host, []);
          $Closure1._registerBindObject(table, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(marioInfo, host, []);
          $Closure1._registerBindObject(peachInfo, host, []);
          $Closure1._registerBindObject(table, host, ["get"]);
        }
        super._registerBind(host, ops);
      }
    }
    const table = this.node.root.newAbstract("@winglang/sdk.cloud.Table",this,"cloud.Table",{ name: "users", primaryKey: "name", columns: Object.freeze({"gender":cloud.ColumnType.STRING}) });
    const marioInfo = Object.freeze({"gender":"male","role":"plumber"});
    const peachInfo = Object.freeze({"gender":"female","role":"princess"});
    (table.addRow("mario",marioInfo));
    (table.addRow("peach",peachInfo));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:addRow",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "add_row", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

