# [peek.w](../../../../../../examples/tests/sdk_tests/counter/peek.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $c }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: c.peek() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $c.peek()),0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: c.peek() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $c.peek()),0)))};
      (await $c.inc());
      {((cond) => {if (!cond) throw new Error("assertion failed: c.peek() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $c.peek()),1)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $c }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const key = "my-key";
      {((cond) => {if (!cond) throw new Error("assertion failed: c.peek(key) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $c.peek(key)),0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: c.peek(key) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $c.peek(key)),0)))};
      (await $c.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: c.peek(key) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $c.peek(key)),1)))};
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
      "value": "[[\"root/undefined/Default/test:peek\",\"${aws_lambda_function.undefined_testpeek_Handler_15C839EF.arn}\"],[\"root/undefined/Default/test:key peek\",\"${aws_lambda_function.undefined_testkeypeek_Handler_A57A11EB.arn}\"]]"
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
      "undefined_testkeypeek_Handler_IamRole_97134873": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key peek/Handler/IamRole",
            "uniqueId": "undefined_testkeypeek_Handler_IamRole_97134873"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testpeek_Handler_IamRole_90AEC832": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:peek/Handler/IamRole",
            "uniqueId": "undefined_testpeek_Handler_IamRole_90AEC832"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testkeypeek_Handler_IamRolePolicy_887673EC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key peek/Handler/IamRolePolicy",
            "uniqueId": "undefined_testkeypeek_Handler_IamRolePolicy_887673EC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testkeypeek_Handler_IamRole_97134873.name}"
      },
      "undefined_testpeek_Handler_IamRolePolicy_2A0E0446": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:peek/Handler/IamRolePolicy",
            "uniqueId": "undefined_testpeek_Handler_IamRolePolicy_2A0E0446"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testpeek_Handler_IamRole_90AEC832.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testkeypeek_Handler_IamRolePolicyAttachment_333155B0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key peek/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testkeypeek_Handler_IamRolePolicyAttachment_333155B0"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testkeypeek_Handler_IamRole_97134873.name}"
      },
      "undefined_testpeek_Handler_IamRolePolicyAttachment_48D9DF51": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:peek/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testpeek_Handler_IamRolePolicyAttachment_48D9DF51"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testpeek_Handler_IamRole_90AEC832.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testkeypeek_Handler_A57A11EB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key peek/Handler/Default",
            "uniqueId": "undefined_testkeypeek_Handler_A57A11EB"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Handler-c85ee8c8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85ee8c8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testkeypeek_Handler_IamRole_97134873.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testkeypeek_Handler_S3Object_A2321907.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testpeek_Handler_15C839EF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:peek/Handler/Default",
            "uniqueId": "undefined_testpeek_Handler_15C839EF"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Handler-c8678802",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8678802",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testpeek_Handler_IamRole_90AEC832.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testpeek_Handler_S3Object_A6DF7D6C.key}",
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
      "undefined_testkeypeek_Handler_S3Object_A2321907": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key peek/Handler/S3Object",
            "uniqueId": "undefined_testkeypeek_Handler_S3Object_A2321907"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testpeek_Handler_S3Object_A6DF7D6C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:peek/Handler/S3Object",
            "uniqueId": "undefined_testpeek_Handler_S3Object_A6DF7D6C"
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
            $c: ${context._lift(c)},
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
          $Closure1._registerBindObject(c, host, ["inc", "peek"]);
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
            $c: ${context._lift(c)},
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
          $Closure2._registerBindObject(c, host, ["inc", "peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:peek",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:key peek",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "peek", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

