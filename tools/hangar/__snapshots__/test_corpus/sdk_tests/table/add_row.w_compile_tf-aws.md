# [add_row.w](../../../../../../examples/tests/sdk_tests/table/add_row.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $marioInfo, $peachInfo, $std_Json, $table }) {
  class $Closure1 {
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(table.get(\"mario\")) == Json.stringify(marioInfo)")})((((args) => { return JSON.stringify(args[0], null, args[1]) })([(await $table.get("mario"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([$marioInfo])))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(table.get(\"peach\")) == Json.stringify(peachInfo)")})((((args) => { return JSON.stringify(args[0], null, args[1]) })([(await $table.get("peach"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([$peachInfo])))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
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
      "value": "[[\"root/Default/Default/test:addRow\",\"${aws_lambda_function.testaddRow_Handler_2806A65E.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "cloudTable": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Table/Default",
            "uniqueId": "cloudTable"
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
      "cloudTable_DynamodbTableItem-mario_5D4D17DE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Table/DynamodbTableItem-mario",
            "uniqueId": "cloudTable_DynamodbTableItem-mario_5D4D17DE"
          }
        },
        "hash_key": "${aws_dynamodb_table.cloudTable.hash_key}",
        "item": "{\"name\":{\"S\":\"mario\"},\"gender\":{\"S\":\"male\"},\"role\":{\"S\":\"plumber\"}}",
        "table_name": "${aws_dynamodb_table.cloudTable.name}"
      },
      "cloudTable_DynamodbTableItem-peach_292A8BDE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Table/DynamodbTableItem-peach",
            "uniqueId": "cloudTable_DynamodbTableItem-peach_292A8BDE"
          }
        },
        "hash_key": "${aws_dynamodb_table.cloudTable.hash_key}",
        "item": "{\"name\":{\"S\":\"peach\"},\"gender\":{\"S\":\"female\"},\"role\":{\"S\":\"princess\"}}",
        "table_name": "${aws_dynamodb_table.cloudTable.name}"
      }
    },
    "aws_iam_role": {
      "testaddRow_Handler_IamRole_809942D9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addRow/Handler/IamRole",
            "uniqueId": "testaddRow_Handler_IamRole_809942D9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testaddRow_Handler_IamRolePolicy_CA240997": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addRow/Handler/IamRolePolicy",
            "uniqueId": "testaddRow_Handler_IamRolePolicy_CA240997"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testaddRow_Handler_IamRole_809942D9.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testaddRow_Handler_IamRolePolicyAttachment_0784B360": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addRow/Handler/IamRolePolicyAttachment",
            "uniqueId": "testaddRow_Handler_IamRolePolicyAttachment_0784B360"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testaddRow_Handler_IamRole_809942D9.name}"
      }
    },
    "aws_lambda_function": {
      "testaddRow_Handler_2806A65E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addRow/Handler/Default",
            "uniqueId": "testaddRow_Handler_2806A65E"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.cloudTable.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"gender\":0}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "name",
            "WING_FUNCTION_NAME": "Handler-c8f74599",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f74599",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testaddRow_Handler_IamRole_809942D9.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testaddRow_Handler_S3Object_1B25BFDC.key}",
        "timeout": 30,
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
      "testaddRow_Handler_S3Object_1B25BFDC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addRow/Handler/S3Object",
            "uniqueId": "testaddRow_Handler_S3Object_1B25BFDC"
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $marioInfo: ${context._lift(marioInfo)},
            $peachInfo: ${context._lift(peachInfo)},
            $std_Json: ${context._lift(std.Json)},
            $table: ${context._lift(table)},
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

