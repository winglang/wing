# [list.w](../../../../../../examples/tests/sdk_tests/table/list.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $std_String, $table }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $table.insert("eyal",({"gender": "male"})));
      (await $table.insert("revital",({"gender": "female"})));
      const unorderded = ({});
      for (const u of (await $table.list())) {
        ((obj, args) => { obj[args[0]] = args[1]; })(unorderded, [((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((u)["name"]),u]);
      }
      const revital = (unorderded)["revital"];
      const eyal = (unorderded)["eyal"];
      {((cond) => {if (!cond) throw new Error("assertion failed: \"eyal\" == str.fromJson(eyal.get(\"name\"))")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("eyal",((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((eyal)["name"]))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"male\" == str.fromJson(eyal.get(\"gender\"))")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("male",((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((eyal)["gender"]))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"revital\" == str.fromJson(revital.get(\"name\"))")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("revital",((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((revital)["name"]))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"female\" == str.fromJson(revital.get(\"gender\"))")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("female",((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((revital)["gender"]))))};
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
      "value": "[[\"root/undefined/Default/test:list\",\"${aws_lambda_function.undefined_testlist_Handler_6266A244.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "undefined_exTable_DEFCFB8E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/ex.Table/Default",
            "uniqueId": "undefined_exTable_DEFCFB8E"
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
        "name": "usersex.Table-c8865529"
      }
    },
    "aws_iam_role": {
      "undefined_testlist_Handler_IamRole_9285CC88": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:list/Handler/IamRole",
            "uniqueId": "undefined_testlist_Handler_IamRole_9285CC88"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testlist_Handler_IamRolePolicy_69BDD7EC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:list/Handler/IamRolePolicy",
            "uniqueId": "undefined_testlist_Handler_IamRolePolicy_69BDD7EC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_exTable_DEFCFB8E.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:Scan\"],\"Resource\":[\"${aws_dynamodb_table.undefined_exTable_DEFCFB8E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testlist_Handler_IamRole_9285CC88.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testlist_Handler_IamRolePolicyAttachment_772E9BDC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:list/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testlist_Handler_IamRolePolicyAttachment_772E9BDC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testlist_Handler_IamRole_9285CC88.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testlist_Handler_6266A244": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:list/Handler/Default",
            "uniqueId": "undefined_testlist_Handler_6266A244"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49bbcd6d": "${aws_dynamodb_table.undefined_exTable_DEFCFB8E.name}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_COLUMNS": "{\"gender\":0}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_PRIMARY_KEY": "name",
            "WING_FUNCTION_NAME": "Handler-c8470fe1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8470fe1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testlist_Handler_IamRole_9285CC88.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testlist_Handler_S3Object_CC417708.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
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
      "undefined_testlist_Handler_S3Object_CC417708": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:list/Handler/S3Object",
            "uniqueId": "undefined_testlist_Handler_S3Object_CC417708"
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
const ex = $stdlib.ex;
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
            $std_String: ${context._lift(std.String)},
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
          $Closure1._registerBindObject(table, host, ["insert", "list"]);
        }
        super._registerBind(host, ops);
      }
    }
    const table = this.node.root.newAbstract("@winglang/sdk.ex.Table",this,"ex.Table",{ name: "users", primaryKey: "name", columns: ({"gender": ex.ColumnType.STRING}) });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:list",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "list", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

