# [set.w](../../../../../../examples/tests/sdk_tests/counter/set.w) | compile | tf-aws

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
      (await $counter.inc());
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),1)))};
      (await $counter.inc());
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),2)))};
      (await $counter.inc(10));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),12)))};
      (await $counter.set(88));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 88")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),88)))};
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
      (await $counter.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),1)))};
      (await $counter.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),2)))};
      (await $counter.inc(10,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),12)))};
      (await $counter.set(88,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 88")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),88)))};
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
      "value": "[[\"root/undefined/Default/test:set\",\"${aws_lambda_function.undefined_testset_Handler_7929926E.arn}\"],[\"root/undefined/Default/test:key set\",\"${aws_lambda_function.undefined_testkeyset_Handler_DCFB08EC.arn}\"]]"
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
      "undefined_testkeyset_Handler_IamRole_87248D66": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key set/Handler/IamRole",
            "uniqueId": "undefined_testkeyset_Handler_IamRole_87248D66"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testset_Handler_IamRole_CC2F0E8D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:set/Handler/IamRole",
            "uniqueId": "undefined_testset_Handler_IamRole_CC2F0E8D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testkeyset_Handler_IamRolePolicy_BFB98460": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key set/Handler/IamRolePolicy",
            "uniqueId": "undefined_testkeyset_Handler_IamRolePolicy_BFB98460"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testkeyset_Handler_IamRole_87248D66.name}"
      },
      "undefined_testset_Handler_IamRolePolicy_2AF358A8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:set/Handler/IamRolePolicy",
            "uniqueId": "undefined_testset_Handler_IamRolePolicy_2AF358A8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testset_Handler_IamRole_CC2F0E8D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testkeyset_Handler_IamRolePolicyAttachment_B3F63729": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key set/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testkeyset_Handler_IamRolePolicyAttachment_B3F63729"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testkeyset_Handler_IamRole_87248D66.name}"
      },
      "undefined_testset_Handler_IamRolePolicyAttachment_A1B18ABD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:set/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testset_Handler_IamRolePolicyAttachment_A1B18ABD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testset_Handler_IamRole_CC2F0E8D.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testkeyset_Handler_DCFB08EC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key set/Handler/Default",
            "uniqueId": "undefined_testkeyset_Handler_DCFB08EC"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Handler-c8cb0a43",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8cb0a43",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testkeyset_Handler_IamRole_87248D66.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testkeyset_Handler_S3Object_C9DFC43D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testset_Handler_7929926E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:set/Handler/Default",
            "uniqueId": "undefined_testset_Handler_7929926E"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Handler-c88395ff",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c88395ff",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testset_Handler_IamRole_CC2F0E8D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testset_Handler_S3Object_4709D18B.key}",
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
      "undefined_testkeyset_Handler_S3Object_C9DFC43D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key set/Handler/S3Object",
            "uniqueId": "undefined_testkeyset_Handler_S3Object_C9DFC43D"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testset_Handler_S3Object_4709D18B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:set/Handler/S3Object",
            "uniqueId": "undefined_testset_Handler_S3Object_4709D18B"
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
          $Closure1._registerBindObject(counter, host, ["inc", "peek", "set"]);
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
          $Closure2._registerBindObject(counter, host, ["inc", "peek", "set"]);
        }
        super._registerBind(host, ops);
      }
    }
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter",{ initial: 0 });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:set",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:key set",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "set", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

