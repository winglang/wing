# [purge.w](../../../../../../examples/tests/sdk_tests/queue/purge.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $q, $std_Duration, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $q.push("foo"));
      (await $q.push("bar"));
      (await $q.push("baz"));
      const wait = async (pred) => {
        let i = 0;
        while ((i < 60)) {
          if ((await pred())) {
            return true;
          }
          (await $util_Util.sleep((await $std_Duration.fromSeconds(1))));
          i = (i + 1);
        }
        return false;
      }
      ;
      {((cond) => {if (!cond) throw new Error("assertion failed: wait(inflight (): bool => { \n    return q.approxSize() == 3;\n  })")})((await wait(async () => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $q.approxSize()),3));
      }
      )))};
      (await $q.purge());
      {((cond) => {if (!cond) throw new Error("assertion failed: wait(inflight (): bool => {\n    return q.approxSize() == 0;\n  })")})((await wait(async () => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $q.approxSize()),0));
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
      "value": "[[\"root/Default/Default/test:purge\",\"${aws_lambda_function.testpurge_Handler_F7A5D0E5.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testpurge_Handler_IamRole_242BC35C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:purge/Handler/IamRole",
            "uniqueId": "testpurge_Handler_IamRole_242BC35C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testpurge_Handler_IamRolePolicy_DF93FF98": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:purge/Handler/IamRolePolicy",
            "uniqueId": "testpurge_Handler_IamRolePolicy_DF93FF98"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:PurgeQueue\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testpurge_Handler_IamRole_242BC35C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testpurge_Handler_IamRolePolicyAttachment_0261B438": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:purge/Handler/IamRolePolicyAttachment",
            "uniqueId": "testpurge_Handler_IamRolePolicyAttachment_0261B438"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testpurge_Handler_IamRole_242BC35C.name}"
      }
    },
    "aws_lambda_function": {
      "testpurge_Handler_F7A5D0E5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:purge/Handler/Default",
            "uniqueId": "testpurge_Handler_F7A5D0E5"
          }
        },
        "environment": {
          "variables": {
            "QUEUE_URL_31e95cbd": "${aws_sqs_queue.cloudQueue.url}",
            "WING_FUNCTION_NAME": "Handler-c849290f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c849290f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testpurge_Handler_IamRole_242BC35C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testpurge_Handler_S3Object_97CF2166.key}",
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
      "testpurge_Handler_S3Object_97CF2166": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:purge/Handler/S3Object",
            "uniqueId": "testpurge_Handler_S3Object_97CF2166"
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $q: ${context._lift(q)},
            $std_Duration: ${context._lift(std.Duration)},
            $util_Util: ${context._lift(util.Util)},
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
        return ["handle", "$inflight_init"]
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(q, host, ["approxSize", "purge", "push"]);
        }
        super._registerBind(host, ops);
      }
    }
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:purge",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "purge", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

