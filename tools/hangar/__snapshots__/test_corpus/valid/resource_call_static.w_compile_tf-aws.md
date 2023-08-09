# [resource_call_static.w](../../../../../examples/tests/valid/resource_call_static.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $Another }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: Another.myStaticMethod() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $Another.myStaticMethod()),0)))};
    }
  }
  return $Closure1;
}

```

## inflight.Another.js
```js
module.exports = function({ $globalCounter }) {
  class Another {
    constructor({  }) {
    }
    static async myStaticMethod() {
      return (await $globalCounter.peek());
    }
  }
  return Another;
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
      "value": "[[\"root/undefined/Default/test:access cloud resource through static methods only\",\"${aws_lambda_function.undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_9962AA1B.arn}\"]]"
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
      "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_7F3F0BFC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access cloud resource through static methods only/Handler/IamRole",
            "uniqueId": "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_7F3F0BFC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicy_D454F747": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access cloud resource through static methods only/Handler/IamRolePolicy",
            "uniqueId": "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicy_D454F747"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_7F3F0BFC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicyAttachment_B4C3C44B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access cloud resource through static methods only/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicyAttachment_B4C3C44B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_7F3F0BFC.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_9962AA1B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access cloud resource through static methods only/Handler/Default",
            "uniqueId": "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_9962AA1B"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Handler-c8879a05",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8879a05",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_7F3F0BFC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_D05B9F96.key}",
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
      "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_D05B9F96": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access cloud resource through static methods only/Handler/S3Object",
            "uniqueId": "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_D05B9F96"
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
    class Another extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("myStaticMethod", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Another.js")({
            $globalCounter: ${context._lift(globalCounter)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const AnotherClient = ${Another._toInflightType(this).text};
            const client = new AnotherClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("myStaticMethod")) {
          Another._registerBindObject(globalCounter, host, ["peek"]);
        }
        super._registerTypeBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $Another: ${context._lift(Another)},
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
          $Closure1._registerBindObject(Another, host, ["myStaticMethod"]);
        }
        super._registerBind(host, ops);
      }
    }
    const globalCounter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:access cloud resource through static methods only",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "resource_call_static", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

