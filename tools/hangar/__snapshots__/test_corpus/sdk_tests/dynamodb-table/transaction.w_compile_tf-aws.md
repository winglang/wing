# [transaction.w](../../../../../../examples/tests/sdk_tests/dynamodb-table/transaction.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $t1 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $t1.putItem(({"k1": "key1","k2": "value1","k3": "other-value1"})));
      (await $t1.putItem(({"k1": "key2","k2": "value2","k3": "other-value2"})));
      (await $t1.transactWriteItems({ transactItems: [({"put": ({"item": ({"k1": "key3","k2": "value3","k3": "other-value3"})})}), ({"delete": ({"key": ({"k1": "key2","k2": "value2"})})}), ({"update": ({"key": ({"k1": "key1","k2": "value1"}),"updateExpression": "set k3 = :k3","expressionAttributeValues": ({":k3": "not-other-value1"})})})] }));
      let r = (await $t1.getItem(({"k1": "key1","k2": "value1"})));
      {((cond) => {if (!cond) throw new Error("assertion failed: r.get(\"k1\").asStr() == \"key1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r, "k1")),"key1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: r.get(\"k2\").asStr() == \"value1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r, "k2")),"value1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: r.get(\"k3\").asStr() == \"not-other-value1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r, "k3")),"not-other-value1")))};
      r = (await $t1.getItem(({"k1": "key2","k2": "value2"})));
      {((cond) => {if (!cond) throw new Error("assertion failed: r.tryGet(\"k1\") == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((r)?.["k1"],undefined)))};
      r = (await $t1.getItem(({"k1": "key3","k2": "value3"})));
      {((cond) => {if (!cond) throw new Error("assertion failed: r.get(\"k1\").asStr() == \"key3\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r, "k1")),"key3")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: r.get(\"k2\").asStr() == \"value3\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r, "k2")),"value3")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: r.get(\"k3\").asStr() == \"other-value3\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r, "k3")),"other-value3")))};
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
      "value": "[[\"root/Default/Default/test:transactWriteItems\",\"${aws_lambda_function.testtransactWriteItems_Handler_7D176B37.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "exDynamodbTable": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.DynamodbTable/Default",
            "uniqueId": "exDynamodbTable"
          }
        },
        "attribute": [
          {
            "name": "k1",
            "type": "S"
          },
          {
            "name": "k2",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "k1",
        "name": "test1ex.DynamodbTable-c8d9b5e7",
        "range_key": "k2"
      }
    },
    "aws_iam_role": {
      "testtransactWriteItems_Handler_IamRole_67FC0F69": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:transactWriteItems/Handler/IamRole",
            "uniqueId": "testtransactWriteItems_Handler_IamRole_67FC0F69"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testtransactWriteItems_Handler_IamRolePolicy_C05E42F2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:transactWriteItems/Handler/IamRolePolicy",
            "uniqueId": "testtransactWriteItems_Handler_IamRolePolicy_C05E42F2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exDynamodbTable.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.exDynamodbTable.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exDynamodbTable.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.exDynamodbTable.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:DeleteItem\"],\"Resource\":[\"${aws_dynamodb_table.exDynamodbTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testtransactWriteItems_Handler_IamRole_67FC0F69.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testtransactWriteItems_Handler_IamRolePolicyAttachment_D488CBF6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:transactWriteItems/Handler/IamRolePolicyAttachment",
            "uniqueId": "testtransactWriteItems_Handler_IamRolePolicyAttachment_D488CBF6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testtransactWriteItems_Handler_IamRole_67FC0F69.name}"
      }
    },
    "aws_lambda_function": {
      "testtransactWriteItems_Handler_7D176B37": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:transactWriteItems/Handler/Default",
            "uniqueId": "testtransactWriteItems_Handler_7D176B37"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_c181cf1c": "${aws_dynamodb_table.exDynamodbTable.name}",
            "DYNAMODB_TABLE_NAME_c181cf1c_ATTRIBUTE_DEFINITIONS": "{\"k1\":\"S\",\"k2\":\"S\"}",
            "DYNAMODB_TABLE_NAME_c181cf1c_KEY_SCHEMA": "{\"k1\":\"HASH\",\"k2\":\"RANGE\"}",
            "WING_FUNCTION_NAME": "Handler-c839d4f9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c839d4f9",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testtransactWriteItems_Handler_IamRole_67FC0F69.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testtransactWriteItems_Handler_S3Object_A47FC5E4.key}",
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
      "testtransactWriteItems_Handler_S3Object_A47FC5E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:transactWriteItems/Handler/S3Object",
            "uniqueId": "testtransactWriteItems_Handler_S3Object_A47FC5E4"
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
            $t1: ${context._lift(t1)},
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
          $Closure1._registerBindObject(t1, host, ["getItem", "putItem", "transactWriteItems"]);
        }
        super._registerBind(host, ops);
      }
    }
    const t1 = this.node.root.newAbstract("@winglang/sdk.ex.DynamodbTable",this,"ex.DynamodbTable",{ name: "test1", attributeDefinitions: ({"k1": "S","k2": "S"}), keySchema: ({"k1": "HASH","k2": "RANGE"}) });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:transactWriteItems",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "transaction", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

