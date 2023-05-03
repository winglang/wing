# [timeout.w](../../../../examples/tests/valid/timeout.w) | compile | tf-aws

## clients/Helper.inflight.js
```js
module.exports = function() {
  class  Helper {
    constructor({  }) {
    }
    async sleep(time_ms)  {
      return (require("<ABSOLUTE_PATH>/sleep.js")["sleep"])(time_ms)
    }
  }
  return Helper;
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
      "value": "[[\"root/Default/Default/test:function timeout\",\"${aws_lambda_function.root_testfunctiontimeout_8214F6C4.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "root_cloudCounter_E0AC1263": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "root_cloudCounter_E0AC1263"
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
      "root_cloudFunction_IamRole_DAEC3578": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRole",
            "uniqueId": "root_cloudFunction_IamRole_DAEC3578"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testfunctiontimeout_IamRole_10E16804": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function timeout/IamRole",
            "uniqueId": "root_testfunctiontimeout_IamRole_10E16804"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudFunction_IamRolePolicy_AAE6C0C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "root_cloudFunction_IamRolePolicy_AAE6C0C0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.name}"
      },
      "root_testfunctiontimeout_IamRolePolicy_0FB0B317": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function timeout/IamRolePolicy",
            "uniqueId": "root_testfunctiontimeout_IamRolePolicy_0FB0B317"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.root_cloudFunction_6A57BA0A.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testfunctiontimeout_IamRole_10E16804.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudFunction_IamRolePolicyAttachment_FC3D9E7C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "root_cloudFunction_IamRolePolicyAttachment_FC3D9E7C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.name}"
      },
      "root_testfunctiontimeout_IamRolePolicyAttachment_AC7CE105": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function timeout/IamRolePolicyAttachment",
            "uniqueId": "root_testfunctiontimeout_IamRolePolicyAttachment_AC7CE105"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testfunctiontimeout_IamRole_10E16804.name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudFunction_6A57BA0A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/Default",
            "uniqueId": "root_cloudFunction_6A57BA0A"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "cloud-Function-c8d2eca1"
          }
        },
        "function_name": "cloud-Function-c8d2eca1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudFunction_S3Object_C8435368.key}",
        "timeout": 1,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testfunctiontimeout_8214F6C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function timeout/Default",
            "uniqueId": "root_testfunctiontimeout_8214F6C4"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "FUNCTION_NAME_5bb84dfa": "${aws_lambda_function.root_cloudFunction_6A57BA0A.arn}",
            "WING_FUNCTION_NAME": "test-function-timeout-c86a8689"
          }
        },
        "function_name": "test-function-timeout-c86a8689",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testfunctiontimeout_IamRole_10E16804.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testfunctiontimeout_S3Object_03AF7489.key}",
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
      "root_cloudFunction_S3Object_C8435368": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/S3Object",
            "uniqueId": "root_cloudFunction_S3Object_C8435368"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testfunctiontimeout_S3Object_03AF7489": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function timeout/S3Object",
            "uniqueId": "root_testfunctiontimeout_S3Object_03AF7489"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
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
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Helper extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("sleep");
      }
      _toInflight() {
        const self_client_path = "./clients/Helper.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const Helper = require("${self_client_path}")({});
            const client = new Helper({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("sleep")) {
        }
        super._registerBind(host, ops);
      }
    }
    const c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const helper = new Helper(this,"Helper");
    const f = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        c: {
          obj: c,
          ops: ["dec","inc","peek","reset"]
        },
        helper: {
          obj: helper,
          ops: ["sleep"]
        },
      }
    })
    ,{
    "timeout": $stdlib.std.Duration.fromSeconds(1),}
    );
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:function timeout",new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
      bindings: {
        c: {
          obj: c,
          ops: ["dec","inc","peek","reset"]
        },
        f: {
          obj: f,
          ops: ["invoke"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "timeout", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

## proc1/index.js
```js
async handle() {
  const { c, helper } = this;
  (await helper.sleep(1500));
  (await c.inc());
}

```

## proc2/index.js
```js
async handle() {
  const { c, f } = this;
  (await f.invoke(""));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c.peek()) === 0)'`)})(((await c.peek()) === 0))};
}

```

