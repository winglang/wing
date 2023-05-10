# [list.w](../../../../examples/tests/valid/list.w) | compile | tf-aws

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
      "value": "[[\"root/Default/Default/test\",\"${aws_lambda_function.root_test_AAE85061.arn}\"]]"
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
      "root_test_IamRole_6CDC2D16": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRole",
            "uniqueId": "root_test_IamRole_6CDC2D16"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_test_IamRolePolicy_474A6820": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRolePolicy",
            "uniqueId": "root_test_IamRolePolicy_474A6820"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:DeleteItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:Scan\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_test_IamRolePolicyAttachment_1102A28A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRolePolicyAttachment",
            "uniqueId": "root_test_IamRolePolicyAttachment_1102A28A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.name}"
      }
    },
    "aws_lambda_function": {
      "root_test_AAE85061": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/Default",
            "uniqueId": "root_test_AAE85061"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"gender\":0}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "name",
            "WING_FUNCTION_NAME": "test-c8b6eece"
          }
        },
        "function_name": "test-c8b6eece",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_test_S3Object_A16CD789.key}",
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
      "root_test_S3Object_A16CD789": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/S3Object",
            "uniqueId": "root_test_S3Object_A16CD789"
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const table = this.node.root.newAbstract("@winglang/sdk.cloud.Table",this,"cloud.Table",{ name: "users", primaryKey: "name", columns: Object.freeze({"gender":cloud.ColumnType.STRING}) });
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        table: {
          obj: table,
          ops: ["delete","get","insert","list","update"]
        },
      }
    })
    );
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

## proc1/index.js
```js
async handle() {
  const { table } = this;
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

```

