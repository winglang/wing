# [peek.w](../../../../examples/tests/valid/peek.w) | compile | tf-aws

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
      "value": "[[\"root/Default/Default/test:peek\",\"${aws_lambda_function.root_testpeek_Handler_C724F76F.arn}\"]]"
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
      "root_testpeek_Handler_IamRole_4D487D73": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:peek/Handler/IamRole",
            "uniqueId": "root_testpeek_Handler_IamRole_4D487D73"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testpeek_Handler_IamRolePolicy_CDA84D5B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:peek/Handler/IamRolePolicy",
            "uniqueId": "root_testpeek_Handler_IamRolePolicy_CDA84D5B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testpeek_Handler_IamRole_4D487D73.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testpeek_Handler_IamRolePolicyAttachment_6C4AAACF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:peek/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testpeek_Handler_IamRolePolicyAttachment_6C4AAACF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testpeek_Handler_IamRole_4D487D73.name}"
      }
    },
    "aws_lambda_function": {
      "root_testpeek_Handler_C724F76F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:peek/Handler/Default",
            "uniqueId": "root_testpeek_Handler_C724F76F"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "Handler-c846323d"
          }
        },
        "function_name": "Handler-c846323d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testpeek_Handler_IamRole_4D487D73.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testpeek_Handler_S3Object_4BB43D90.key}",
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
      "root_testpeek_Handler_S3Object_4BB43D90": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:peek/Handler/S3Object",
            "uniqueId": "root_testpeek_Handler_S3Object_4BB43D90"
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
    const c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:peek",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        c: {
          obj: c,
          ops: ["dec","inc","peek","reset"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "peek", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
  const { c } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c.peek()) === 0)'`)})(((await c.peek()) === 0))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c.peek()) === 0)'`)})(((await c.peek()) === 0))};
  (await c.inc());
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c.peek()) === 1)'`)})(((await c.peek()) === 1))};
}

```

