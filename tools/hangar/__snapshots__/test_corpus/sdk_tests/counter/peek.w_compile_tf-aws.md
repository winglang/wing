# [peek.w](../../../../../../examples/tests/sdk_tests/counter/peek.w) | compile | tf-aws

## inflight.$Closure1-0bd956eb.js
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

## inflight.$Closure2-0bd956eb.js
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
      "value": "[[\"root/Default/Default/test:peek\",\"${aws_lambda_function.testpeek_Handler_70E78480.arn}\"],[\"root/Default/Default/test:key peek\",\"${aws_lambda_function.testkeypeek_Handler_03F3EFDE.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "cloudCounter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "cloudCounter"
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
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    },
    "aws_iam_role": {
      "testkeypeek_Handler_IamRole_FD05C484": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key peek/Handler/IamRole",
            "uniqueId": "testkeypeek_Handler_IamRole_FD05C484"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testpeek_Handler_IamRole_25D42825": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:peek/Handler/IamRole",
            "uniqueId": "testpeek_Handler_IamRole_25D42825"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testkeypeek_Handler_IamRolePolicy_C3B6AC0B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key peek/Handler/IamRolePolicy",
            "uniqueId": "testkeypeek_Handler_IamRolePolicy_C3B6AC0B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testkeypeek_Handler_IamRole_FD05C484.name}"
      },
      "testpeek_Handler_IamRolePolicy_DBD6D786": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:peek/Handler/IamRolePolicy",
            "uniqueId": "testpeek_Handler_IamRolePolicy_DBD6D786"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testpeek_Handler_IamRole_25D42825.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testkeypeek_Handler_IamRolePolicyAttachment_D3726FF9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key peek/Handler/IamRolePolicyAttachment",
            "uniqueId": "testkeypeek_Handler_IamRolePolicyAttachment_D3726FF9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testkeypeek_Handler_IamRole_FD05C484.name}"
      },
      "testpeek_Handler_IamRolePolicyAttachment_8A891B50": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:peek/Handler/IamRolePolicyAttachment",
            "uniqueId": "testpeek_Handler_IamRolePolicyAttachment_8A891B50"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testpeek_Handler_IamRole_25D42825.name}"
      }
    },
    "aws_lambda_function": {
      "testkeypeek_Handler_03F3EFDE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key peek/Handler/Default",
            "uniqueId": "testkeypeek_Handler_03F3EFDE"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Handler-c8197eb3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8197eb3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testkeypeek_Handler_IamRole_FD05C484.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testkeypeek_Handler_S3Object_A6C1E1BA.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testpeek_Handler_70E78480": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:peek/Handler/Default",
            "uniqueId": "testpeek_Handler_70E78480"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Handler-c846323d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c846323d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testpeek_Handler_IamRole_25D42825.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testpeek_Handler_S3Object_1C8453A0.key}",
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
      "testkeypeek_Handler_S3Object_A6C1E1BA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key peek/Handler/S3Object",
            "uniqueId": "testkeypeek_Handler_S3Object_A6C1E1BA"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testpeek_Handler_S3Object_1C8453A0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:peek/Handler/S3Object",
            "uniqueId": "testpeek_Handler_S3Object_1C8453A0"
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
          require("./inflight.$Closure1-0bd956eb.js")({
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
          require("./inflight.$Closure2-0bd956eb.js")({
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
new $App({ outdir: $outdir, name: "peek", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

