# [list.w](../../../../../../examples/tests/sdk_tests/table/list.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ table, std_String }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await table.insert("eyal",Object.freeze({"gender":"male"})));
      (await table.insert("revital",Object.freeze({"gender":"female"})));
      const unorderded = {};
      for (const u of (await table.list())) {
        ((obj, args) => { obj[args[0]] = args[1]; })(unorderded, [((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((u)["name"]),u]);
      }
      const revital = (unorderded)["revital"];
      const eyal = (unorderded)["eyal"];
      {((cond) => {if (!cond) throw new Error(`assertion failed: '("eyal" === ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((eyal)["name"]))'`)})(("eyal" === ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((eyal)["name"])))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '("male" === ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((eyal)["gender"]))'`)})(("male" === ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((eyal)["gender"])))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '("revital" === ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((revital)["name"]))'`)})(("revital" === ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((revital)["name"])))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '("female" === ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((revital)["gender"]))'`)})(("female" === ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((revital)["gender"])))};
    }
  }
  return $Inflight1;
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
      "value": "[[\"root/Default/Default/test:list\",\"${aws_lambda_function.root_testlist_Handler_EFBD85FC.arn}\"]]"
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
    "aws_iam_role": {
      "root_testlist_Handler_IamRole_4D7098F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/IamRole",
            "uniqueId": "root_testlist_Handler_IamRole_4D7098F9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testlist_Handler_IamRolePolicy_039D0595": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/IamRolePolicy",
            "uniqueId": "root_testlist_Handler_IamRolePolicy_039D0595"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:Scan\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testlist_Handler_IamRole_4D7098F9.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testlist_Handler_IamRolePolicyAttachment_59333345": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testlist_Handler_IamRolePolicyAttachment_59333345"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testlist_Handler_IamRole_4D7098F9.name}"
      }
    },
    "aws_lambda_function": {
      "root_testlist_Handler_EFBD85FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/Default",
            "uniqueId": "root_testlist_Handler_EFBD85FC"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"gender\":0}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "name",
            "WING_FUNCTION_NAME": "Handler-c8867143",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8867143",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testlist_Handler_IamRole_4D7098F9.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testlist_Handler_S3Object_68237BDC.key}",
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
      "root_testlist_Handler_S3Object_68237BDC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:list/Handler/S3Object",
            "uniqueId": "root_testlist_Handler_S3Object_68237BDC"
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
        const table_client = context._lift(table);
        const std_StringClient = std.String._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            table: ${table_client},
            std_String: ${std_StringClient.text},
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
          $Inflight1._registerBindObject(table, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(table, host, ["insert", "list"]);
        }
        super._registerBind(host, ops);
      }
    }
    const table = this.node.root.newAbstract("@winglang/sdk.cloud.Table",this,"cloud.Table",{ name: "users", primaryKey: "name", columns: Object.freeze({"gender":cloud.ColumnType.STRING}) });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:list",new $Inflight1(this,"$Inflight1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "list", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

