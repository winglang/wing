# [get.w](../../../../../../examples/tests/sdk_tests/table/get.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $table }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const COLUMN_NAME = "gender";
      const COLUMN_VALUE = "male";
      const VALID_KEY = "foo";
      const NON_EXISTENT_KEY = "bar";
      const ROW_DOES_NOT_EXIST_ERROR = String.raw({ raw: ["Row does not exist (key=", ")"] }, NON_EXISTENT_KEY);
      const assertThrows = async (expected, block) => {
        let error = false;
        try {
          (await block());
        }
        catch ($error_actual) {
          const actual = $error_actual.message;
          {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected)))};
          error = true;
        }
        {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
      }
      ;
      (await $table.insert(VALID_KEY,({"gender": COLUMN_VALUE})));
      {((cond) => {if (!cond) throw new Error("assertion failed: table.get(VALID_KEY).get(COLUMN_NAME) == COLUMN_VALUE")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((await $table.get(VALID_KEY)))[COLUMN_NAME],COLUMN_VALUE)))};
      (await assertThrows(ROW_DOES_NOT_EXIST_ERROR,async () => {
        (await $table.get(NON_EXISTENT_KEY));
      }
      ));
      let result = (await $table.tryGet(VALID_KEY));
      {((cond) => {if (!cond) throw new Error("assertion failed: result.get(COLUMN_NAME) == COLUMN_VALUE")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((result)[COLUMN_NAME],COLUMN_VALUE)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: table.tryGet(NON_EXISTENT_KEY) == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $table.tryGet(NON_EXISTENT_KEY)),undefined)))};
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
      "value": "[[\"root/Default/Default/test:get\",\"${aws_lambda_function.testget_Handler_67989B36.arn}\"]]"
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
    "aws_iam_role": {
      "testget_Handler_IamRole_AA97A8BA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/Handler/IamRole",
            "uniqueId": "testget_Handler_IamRole_AA97A8BA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testget_Handler_IamRolePolicy_393F6CAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/Handler/IamRolePolicy",
            "uniqueId": "testget_Handler_IamRolePolicy_393F6CAD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testget_Handler_IamRole_AA97A8BA.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testget_Handler_IamRolePolicyAttachment_CF094E80": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/Handler/IamRolePolicyAttachment",
            "uniqueId": "testget_Handler_IamRolePolicyAttachment_CF094E80"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testget_Handler_IamRole_AA97A8BA.name}"
      }
    },
    "aws_lambda_function": {
      "testget_Handler_67989B36": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/Handler/Default",
            "uniqueId": "testget_Handler_67989B36"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"gender\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "name",
            "WING_FUNCTION_NAME": "Handler-c89a33bd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c89a33bd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testget_Handler_IamRole_AA97A8BA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testget_Handler_S3Object_991F0EC4.key}",
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
      "testget_Handler_S3Object_991F0EC4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/Handler/S3Object",
            "uniqueId": "testget_Handler_S3Object_991F0EC4"
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const ex = $stdlib.ex;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $table: ${context._lift(table)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(table, host, ["get", "insert", "tryGet"]);
        }
        super._registerBind(host, ops);
      }
    }
    const table = this.node.root.newAbstract("@winglang/sdk.ex.Table",this,"ex.Table",{ name: "users", primaryKey: "name", columns: ({"gender": ex.ColumnType.STRING}) });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:get",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "get", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

