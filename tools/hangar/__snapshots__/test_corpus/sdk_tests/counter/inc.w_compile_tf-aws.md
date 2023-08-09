# [inc.w](../../../../../../examples/tests/sdk_tests/counter/inc.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $counter }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),0)))};
      const r0 = (await $counter.inc());
      {((cond) => {if (!cond) throw new Error("assertion failed: r0 == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r0,0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),1)))};
      const r1 = (await $counter.inc());
      {((cond) => {if (!cond) throw new Error("assertion failed: r1 == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r1,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),2)))};
      const r2 = (await $counter.inc(10));
      {((cond) => {if (!cond) throw new Error("assertion failed: r2 == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r2,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),12)))};
      const r3 = (await $counter.inc());
      {((cond) => {if (!cond) throw new Error("assertion failed: r3 == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r3,12)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $counter }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const key = "my-key";
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),0)))};
      const r0 = (await $counter.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: r0 == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r0,0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),1)))};
      const r1 = (await $counter.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: r1 == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r1,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),2)))};
      const r2 = (await $counter.inc(10,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: r2 == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r2,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),12)))};
      const r3 = (await $counter.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: r3 == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r3,12)))};
    }
  }
  return $Closure2;
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
      "value": "[[\"root/undefined/Default/test:inc\",\"${aws_lambda_function.undefined_testinc_Handler_0D4D98CB.arn}\"],[\"root/undefined/Default/test:key inc\",\"${aws_lambda_function.undefined_testkeyinc_Handler_90AB6360.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "undefined_cloudCounter_4B4E77ED": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Counter/Default",
            "uniqueId": "undefined_cloudCounter_4B4E77ED"
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
        "name": "wing-counter-cloud.Counter-c86bae23"
      }
    },
    "aws_iam_role": {
      "undefined_testinc_Handler_IamRole_994573DB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inc/Handler/IamRole",
            "uniqueId": "undefined_testinc_Handler_IamRole_994573DB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testkeyinc_Handler_IamRole_9E9B2463": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key inc/Handler/IamRole",
            "uniqueId": "undefined_testkeyinc_Handler_IamRole_9E9B2463"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinc_Handler_IamRolePolicy_5DDBF0A4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inc/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinc_Handler_IamRolePolicy_5DDBF0A4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testinc_Handler_IamRole_994573DB.name}"
      },
      "undefined_testkeyinc_Handler_IamRolePolicy_373ECF51": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key inc/Handler/IamRolePolicy",
            "uniqueId": "undefined_testkeyinc_Handler_IamRolePolicy_373ECF51"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testkeyinc_Handler_IamRole_9E9B2463.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinc_Handler_IamRolePolicyAttachment_E774A6B7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inc/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinc_Handler_IamRolePolicyAttachment_E774A6B7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinc_Handler_IamRole_994573DB.name}"
      },
      "undefined_testkeyinc_Handler_IamRolePolicyAttachment_135DD102": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key inc/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testkeyinc_Handler_IamRolePolicyAttachment_135DD102"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testkeyinc_Handler_IamRole_9E9B2463.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinc_Handler_0D4D98CB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inc/Handler/Default",
            "uniqueId": "undefined_testinc_Handler_0D4D98CB"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Handler-c87f4490",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c87f4490",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinc_Handler_IamRole_994573DB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinc_Handler_S3Object_88F34A88.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testkeyinc_Handler_90AB6360": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key inc/Handler/Default",
            "uniqueId": "undefined_testkeyinc_Handler_90AB6360"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Handler-c8108ced",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8108ced",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testkeyinc_Handler_IamRole_9E9B2463.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testkeyinc_Handler_S3Object_B6E3B72B.key}",
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
      "undefined_testinc_Handler_S3Object_88F34A88": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inc/Handler/S3Object",
            "uniqueId": "undefined_testinc_Handler_S3Object_88F34A88"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testkeyinc_Handler_S3Object_B6E3B72B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key inc/Handler/S3Object",
            "uniqueId": "undefined_testkeyinc_Handler_S3Object_B6E3B72B"
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
            $counter: ${context._lift(counter)},
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
          $Closure1._registerBindObject(counter, host, ["inc", "peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            $counter: ${context._lift(counter)},
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
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(counter, host, ["inc", "peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter",{ initial: 0 });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inc",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:key inc",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inc", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

