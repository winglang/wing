# [purge.w](../../../../examples/tests/valid/purge.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ q }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await q.push("foo"));
      (await q.push("bar"));
      (await q.push("baz"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await q.approxSize()) === 3)'`)})(((await q.approxSize()) === 3))};
      (await q.purge());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await q.approxSize()) === 0)'`)})(((await q.approxSize()) === 0))};
    }
  }
  return $Inflight1;
}

```

## clients/TestHelper.inflight.js
```js
module.exports = function({  }) {
  class TestHelper {
    constructor({  }) {
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
    async sleep(milli)  {
      return (require("<ABSOLUTE_PATH>/sleep.js")["sleep"])(milli)
    }
  }
  return TestHelper;
}

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.15.2"
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
      "value": "[[\"root/Default/Default/test:purge\",\"${aws_lambda_function.root_testpurge_Handler_4198A730.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testpurge_Handler_IamRole_F6BC8197": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:purge/Handler/IamRole",
            "uniqueId": "root_testpurge_Handler_IamRole_F6BC8197"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testpurge_Handler_IamRolePolicy_E8A7D0E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:purge/Handler/IamRolePolicy",
            "uniqueId": "root_testpurge_Handler_IamRolePolicy_E8A7D0E8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:PurgeQueue\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testpurge_Handler_IamRole_F6BC8197.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testpurge_Handler_IamRolePolicyAttachment_20D88C7F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:purge/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testpurge_Handler_IamRolePolicyAttachment_20D88C7F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testpurge_Handler_IamRole_F6BC8197.name}"
      }
    },
    "aws_lambda_function": {
      "root_testpurge_Handler_4198A730": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:purge/Handler/Default",
            "uniqueId": "root_testpurge_Handler_4198A730"
          }
        },
        "environment": {
          "variables": {
            "QUEUE_URL_31e95cbd": "${aws_sqs_queue.root_cloudQueue_E3597F7A.url}",
            "WING_FUNCTION_NAME": "Handler-c849290f"
          }
        },
        "function_name": "Handler-c849290f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testpurge_Handler_IamRole_F6BC8197.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testpurge_Handler_S3Object_6E5F65FA.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "root_testpurge_Handler_S3Object_6E5F65FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:purge/Handler/S3Object",
            "uniqueId": "root_testpurge_Handler_S3Object_6E5F65FA"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "root_cloudQueue_E3597F7A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/Default",
            "uniqueId": "root_cloudQueue_E3597F7A"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js";
        const q_client = context._lift(q);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            q: ${q_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight1Client = ${$Inflight1._toInflightType(this).text};
            const client = new $Inflight1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight1._registerBindObject(q, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(q, host, ["approxSize", "purge", "push"]);
        }
        super._registerBind(host, ops);
      }
    }
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:purge",new $Inflight1(this,"$Inflight1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "purge", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```

