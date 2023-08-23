# [push.w](../../../../../../examples/tests/sdk_tests/queue/push.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $q, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const obj = ({"k1": 1,"k2": "hello","k3": true,"k4": ({"k1": [1, "a", true, ({})]})});
      (await $q.push("Foo"));
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil((): bool => {\n    return q.approxSize() == 1;\n  })")})((await $util_Util.waitUntil(async () => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $q.approxSize()),1));
      }
      )))};
      (await $q.pop());
      (await $q.push("Bar","Baz"));
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil((): bool => {\n    return q.approxSize() == 2;\n  })")})((await $util_Util.waitUntil(async () => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $q.approxSize()),2));
      }
      )))};
      (await $q.purge());
      (await $q.push("","\r",String.raw({ raw: ["", ""] }, ((e) => typeof e === 'string' ? e : JSON.stringify(e, null, 2))(obj))));
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil((): bool => {\n    return q.approxSize() == 3;\n  })")})((await $util_Util.waitUntil(async () => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $q.approxSize()),3));
      }
      )))};
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
      "value": "[[\"root/Default/Default/test:push\",\"${aws_lambda_function.testpush_Handler_BC309B5D.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testpush_Handler_IamRole_783CBBFD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:push/Handler/IamRole",
            "uniqueId": "testpush_Handler_IamRole_783CBBFD"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testpush_Handler_IamRolePolicy_A3AB647D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:push/Handler/IamRolePolicy",
            "uniqueId": "testpush_Handler_IamRolePolicy_A3AB647D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:PurgeQueue\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:ReceiveMessage\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testpush_Handler_IamRole_783CBBFD.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testpush_Handler_IamRolePolicyAttachment_7BB1B074": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:push/Handler/IamRolePolicyAttachment",
            "uniqueId": "testpush_Handler_IamRolePolicyAttachment_7BB1B074"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testpush_Handler_IamRole_783CBBFD.name}"
      }
    },
    "aws_lambda_function": {
      "testpush_Handler_BC309B5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:push/Handler/Default",
            "uniqueId": "testpush_Handler_BC309B5D"
          }
        },
        "environment": {
          "variables": {
            "QUEUE_URL_31e95cbd": "${aws_sqs_queue.cloudQueue.url}",
            "WING_FUNCTION_NAME": "Handler-c8027ca7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8027ca7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testpush_Handler_IamRole_783CBBFD.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testpush_Handler_S3Object_C6686DB8.key}",
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
      "testpush_Handler_S3Object_C6686DB8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:push/Handler/S3Object",
            "uniqueId": "testpush_Handler_S3Object_C6686DB8"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "cloudQueue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/Default",
            "uniqueId": "cloudQueue"
          }
        },
        "name": "cloud-Queue-c86e03d8"
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
const util = $stdlib.util;
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
          require("./inflight.$Closure1-1.js")({
            $q: ${context._lift(q)},
            $util_Util: ${context._lift(util.Util)},
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
          $Closure1._registerBindObject(q, host, ["approxSize", "pop", "purge", "push"]);
        }
        super._registerBind(host, ops);
      }
    }
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:push",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "push", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

