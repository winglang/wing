# [purge.w](../../../../../../examples/tests/sdk_tests/queue/purge.w) | compile | tf-aws

## inflight.$Closure1.js
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
      "value": "[[\"root/undefined/Default/test:purge\",\"${aws_lambda_function.undefined_testpurge_Handler_FAD8F26F.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testpurge_Handler_IamRole_0B54994F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:purge/Handler/IamRole",
            "uniqueId": "undefined_testpurge_Handler_IamRole_0B54994F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testpurge_Handler_IamRolePolicy_788C2647": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:purge/Handler/IamRolePolicy",
            "uniqueId": "undefined_testpurge_Handler_IamRolePolicy_788C2647"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.undefined_cloudQueue_98A56968.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:PurgeQueue\"],\"Resource\":[\"${aws_sqs_queue.undefined_cloudQueue_98A56968.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.undefined_cloudQueue_98A56968.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testpurge_Handler_IamRole_0B54994F.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testpurge_Handler_IamRolePolicyAttachment_FBF2353C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:purge/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testpurge_Handler_IamRolePolicyAttachment_FBF2353C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testpurge_Handler_IamRole_0B54994F.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testpurge_Handler_FAD8F26F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:purge/Handler/Default",
            "uniqueId": "undefined_testpurge_Handler_FAD8F26F"
          }
        },
        "environment": {
          "variables": {
            "QUEUE_URL_47c1312d": "${aws_sqs_queue.undefined_cloudQueue_98A56968.url}",
            "WING_FUNCTION_NAME": "Handler-c827db3c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c827db3c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testpurge_Handler_IamRole_0B54994F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testpurge_Handler_S3Object_E433B370.key}",
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
      "undefined_testpurge_Handler_S3Object_E433B370": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:purge/Handler/S3Object",
            "uniqueId": "undefined_testpurge_Handler_S3Object_E433B370"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "undefined_cloudQueue_98A56968": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue/Default",
            "uniqueId": "undefined_cloudQueue_98A56968"
          }
        },
        "name": "cloud-Queue-c873ff25"
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
          require("./inflight.$Closure1.js")({
            $q: ${context._lift(q)},
            $std_Duration: ${context._lift(std.Duration)},
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

