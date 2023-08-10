# [pop.w](../../../../../../examples/tests/sdk_tests/queue/pop.w) | compile | tf-aws

## inflight.$Closure1-d2a61855.js
```js
module.exports = function({ $NIL, $q }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const msgs = ["Foo", "Bar"];
      for (const msg of msgs) {
        (await $q.push(msg));
      }
      const first = ((await $q.pop()) ?? $NIL);
      const second = ((await $q.pop()) ?? $NIL);
      const third = ((await $q.pop()) ?? $NIL);
      {((cond) => {if (!cond) throw new Error("assertion failed: msgs.contains(first)")})(msgs.includes(first))};
      {((cond) => {if (!cond) throw new Error("assertion failed: msgs.contains(second)")})(msgs.includes(second))};
      {((cond) => {if (!cond) throw new Error("assertion failed: third == NIL")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(third,$NIL)))};
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
      "value": "[[\"root/Default/Default/test:pop\",\"${aws_lambda_function.testpop_Handler_595175BF.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testpop_Handler_IamRole_2CAAA350": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pop/Handler/IamRole",
            "uniqueId": "testpop_Handler_IamRole_2CAAA350"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testpop_Handler_IamRolePolicy_81414D48": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pop/Handler/IamRolePolicy",
            "uniqueId": "testpop_Handler_IamRolePolicy_81414D48"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:ReceiveMessage\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testpop_Handler_IamRole_2CAAA350.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testpop_Handler_IamRolePolicyAttachment_DBFE44D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pop/Handler/IamRolePolicyAttachment",
            "uniqueId": "testpop_Handler_IamRolePolicyAttachment_DBFE44D0"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testpop_Handler_IamRole_2CAAA350.name}"
      }
    },
    "aws_lambda_function": {
      "testpop_Handler_595175BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pop/Handler/Default",
            "uniqueId": "testpop_Handler_595175BF"
          }
        },
        "environment": {
          "variables": {
            "QUEUE_URL_31e95cbd": "${aws_sqs_queue.cloudQueue.url}",
            "WING_FUNCTION_NAME": "Handler-c888e5ca",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c888e5ca",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testpop_Handler_IamRole_2CAAA350.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testpop_Handler_S3Object_35D71FAF.key}",
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
      "testpop_Handler_S3Object_35D71FAF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pop/Handler/S3Object",
            "uniqueId": "testpop_Handler_S3Object_35D71FAF"
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
          require("./inflight.$Closure1-d2a61855.js")({
            $NIL: ${context._lift(NIL)},
            $q: ${context._lift(q)},
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
          $Closure1._registerBindObject(NIL, host, []);
          $Closure1._registerBindObject(q, host, ["pop", "push"]);
        }
        super._registerBind(host, ops);
      }
    }
    const NIL = "<<NIL>>";
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:pop",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "pop", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

