# [add_row.w](../../../../../../examples/tests/sdk_tests/table/add_row.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $_marioInfo___gender__, $_marioInfo___role__, $_peachInfo___gender__, $_peachInfo___role__, $table }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: table.get(\"mario\").get(\"name\") == \"mario\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((await $table.get("mario")))["name"],"mario")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: table.get(\"mario\").get(\"role\") == marioInfo.get(\"role\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((await $table.get("mario")))["role"],$_marioInfo___role__)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: table.get(\"mario\").get(\"gender\") == marioInfo.get(\"gender\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((await $table.get("mario")))["gender"],$_marioInfo___gender__)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: table.get(\"peach\").get(\"name\") == \"peach\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((await $table.get("peach")))["name"],"peach")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: table.get(\"peach\").get(\"role\") == peachInfo.get(\"role\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((await $table.get("peach")))["role"],$_peachInfo___role__)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: table.get(\"peach\").get(\"gender\") == peachInfo.get(\"gender\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((await $table.get("peach")))["gender"],$_peachInfo___gender__)))};
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
      "exTable": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.Table/Default",
            "uniqueId": "exTable"
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
        "name": "usersex.Table-c840a49c"
      }
    },
    "aws_dynamodb_table_item": {
      "exTable_DynamodbTableItem-mario_1CD163AB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.Table/DynamodbTableItem-mario",
            "uniqueId": "exTable_DynamodbTableItem-mario_1CD163AB"
          }
        },
        "hash_key": "${aws_dynamodb_table.exTable.hash_key}",
        "item": "{\"name\":{\"S\":\"mario\"},\"gender\":{\"S\":\"male\"},\"role\":{\"S\":\"plumber\"}}",
        "table_name": "${aws_dynamodb_table.exTable.name}"
      },
      "exTable_DynamodbTableItem-peach_C3D57BF1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.Table/DynamodbTableItem-peach",
            "uniqueId": "exTable_DynamodbTableItem-peach_C3D57BF1"
          }
        },
        "hash_key": "${aws_dynamodb_table.exTable.hash_key}",
        "item": "{\"name\":{\"S\":\"peach\"},\"gender\":{\"S\":\"female\"},\"role\":{\"S\":\"princess\"}}",
        "table_name": "${aws_dynamodb_table.exTable.name}"
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
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
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
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"gender\":0,\"role\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "name",
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const ex = $stdlib.ex;
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
            $_marioInfo___gender__: ${context._lift((marioInfo)["gender"])},
            $_marioInfo___role__: ${context._lift((marioInfo)["role"])},
            $_peachInfo___gender__: ${context._lift((peachInfo)["gender"])},
            $_peachInfo___role__: ${context._lift((peachInfo)["role"])},
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
          $Closure1._registerBindObject((marioInfo)["gender"], host, []);
          $Closure1._registerBindObject((marioInfo)["role"], host, []);
          $Closure1._registerBindObject((peachInfo)["gender"], host, []);
          $Closure1._registerBindObject((peachInfo)["role"], host, []);
          $Closure1._registerBindObject(table, host, ["get"]);
        }
        super._registerBind(host, ops);
      }
    }
    const table = this.node.root.newAbstract("@winglang/sdk.ex.Table",this,"ex.Table",{ name: "users", primaryKey: "name", columns: ({"gender": ex.ColumnType.STRING,"role": ex.ColumnType.STRING}) });
    const marioInfo = ({"gender": "male","role": "plumber"});
    const peachInfo = ({"gender": "female","role": "princess"});
    (table.addRow("mario",marioInfo));
    (table.addRow("peach",peachInfo));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:addRow",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "add_row", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

