# [initial.w](../../../../examples/tests/valid/initial.w) | compile | tf-aws

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
      "value": "[[\"root/Default/Default/test:initial:default\",\"${aws_lambda_function.root_testinitialdefault_7AB6A06C.arn}\"],[\"root/Default/Default/test:initial:positive-value\",\"${aws_lambda_function.root_testinitialpositivevalue_7C0AF18B.arn}\"],[\"root/Default/Default/test:initial:negative-value\",\"${aws_lambda_function.root_testinitialnegativevalue_C113FF0B.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "root_counterA_FE83A0AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/counterA/Default",
            "uniqueId": "root_counterA_FE83A0AC"
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
        "name": "wing-counter-counterA-c8aa8342"
      },
      "root_counterB_3EAEEDE1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/counterB/Default",
            "uniqueId": "root_counterB_3EAEEDE1"
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
        "name": "wing-counter-counterB-c8c89cd9"
      },
      "root_counterC_5BAA0CEC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/counterC/Default",
            "uniqueId": "root_counterC_5BAA0CEC"
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
        "name": "wing-counter-counterC-c83ab8ef"
      }
    },
    "aws_iam_role": {
      "root_testinitialdefault_IamRole_0C9F829C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/IamRole",
            "uniqueId": "root_testinitialdefault_IamRole_0C9F829C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinitialnegativevalue_IamRole_1A6EDBCE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/IamRole",
            "uniqueId": "root_testinitialnegativevalue_IamRole_1A6EDBCE"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinitialpositivevalue_IamRole_1BB7220A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/IamRole",
            "uniqueId": "root_testinitialpositivevalue_IamRole_1BB7220A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinitialdefault_IamRolePolicy_4F54C0B2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/IamRolePolicy",
            "uniqueId": "root_testinitialdefault_IamRolePolicy_4F54C0B2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_counterA_FE83A0AC.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_counterA_FE83A0AC.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testinitialdefault_IamRole_0C9F829C.name}"
      },
      "root_testinitialnegativevalue_IamRolePolicy_2F38CD01": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/IamRolePolicy",
            "uniqueId": "root_testinitialnegativevalue_IamRolePolicy_2F38CD01"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_counterC_5BAA0CEC.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_counterC_5BAA0CEC.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testinitialnegativevalue_IamRole_1A6EDBCE.name}"
      },
      "root_testinitialpositivevalue_IamRolePolicy_668CB553": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/IamRolePolicy",
            "uniqueId": "root_testinitialpositivevalue_IamRolePolicy_668CB553"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_counterB_3EAEEDE1.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_counterB_3EAEEDE1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testinitialpositivevalue_IamRole_1BB7220A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinitialdefault_IamRolePolicyAttachment_5D70A5A5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/IamRolePolicyAttachment",
            "uniqueId": "root_testinitialdefault_IamRolePolicyAttachment_5D70A5A5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinitialdefault_IamRole_0C9F829C.name}"
      },
      "root_testinitialnegativevalue_IamRolePolicyAttachment_5A185C0D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/IamRolePolicyAttachment",
            "uniqueId": "root_testinitialnegativevalue_IamRolePolicyAttachment_5A185C0D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinitialnegativevalue_IamRole_1A6EDBCE.name}"
      },
      "root_testinitialpositivevalue_IamRolePolicyAttachment_BBC11CFA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/IamRolePolicyAttachment",
            "uniqueId": "root_testinitialpositivevalue_IamRolePolicyAttachment_BBC11CFA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinitialpositivevalue_IamRole_1BB7220A.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinitialdefault_7AB6A06C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/Default",
            "uniqueId": "root_testinitialdefault_7AB6A06C"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_220d28dd": "${aws_dynamodb_table.root_counterA_FE83A0AC.name}",
            "WING_FUNCTION_NAME": "test-initial-default-c89b4269"
          }
        },
        "function_name": "test-initial-default-c89b4269",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinitialdefault_IamRole_0C9F829C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinitialdefault_S3Object_A9D32834.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinitialnegativevalue_C113FF0B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/Default",
            "uniqueId": "root_testinitialnegativevalue_C113FF0B"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_4795370d": "${aws_dynamodb_table.root_counterC_5BAA0CEC.name}",
            "WING_FUNCTION_NAME": "test-initial-negative-value-c8c9608b"
          }
        },
        "function_name": "test-initial-negative-value-c8c9608b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinitialnegativevalue_IamRole_1A6EDBCE.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinitialnegativevalue_S3Object_B14976BF.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinitialpositivevalue_7C0AF18B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/Default",
            "uniqueId": "root_testinitialpositivevalue_7C0AF18B"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_96df6c3c": "${aws_dynamodb_table.root_counterB_3EAEEDE1.name}",
            "WING_FUNCTION_NAME": "test-initial-positive-value-c81996f7"
          }
        },
        "function_name": "test-initial-positive-value-c81996f7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinitialpositivevalue_IamRole_1BB7220A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinitialpositivevalue_S3Object_067C0CCF.key}",
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
      "root_testinitialdefault_S3Object_A9D32834": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/S3Object",
            "uniqueId": "root_testinitialdefault_S3Object_A9D32834"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinitialnegativevalue_S3Object_B14976BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/S3Object",
            "uniqueId": "root_testinitialnegativevalue_S3Object_B14976BF"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinitialpositivevalue_S3Object_067C0CCF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/S3Object",
            "uniqueId": "root_testinitialpositivevalue_S3Object_067C0CCF"
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
    const counterA = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"counterA");
    const counterB = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"counterB",{ initial: 500 });
    const counterC = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"counterC",{ initial: (-198) });
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:initial:default",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        counterA: {
          obj: counterA,
          ops: ["dec","inc","peek","reset"]
        },
      }
    })
    );
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:initial:positive-value",new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
      bindings: {
        counterB: {
          obj: counterB,
          ops: ["dec","inc","peek","reset"]
        },
      }
    })
    );
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:initial:negative-value",new $stdlib.core.Inflight(this, "$Inflight3", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc3/index.js".replace(/\\/g, "/"))),
      bindings: {
        counterC: {
          obj: counterC,
          ops: ["dec","inc","peek","reset"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "initial", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
  const { counterA } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await counterA.peek()) === 0)'`)})(((await counterA.peek()) === 0))};
}

```

## proc2/index.js
```js
async handle() {
  const { counterB } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await counterB.peek()) === 500)'`)})(((await counterB.peek()) === 500))};
}

```

## proc3/index.js
```js
async handle() {
  const { counterC } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await counterC.peek()) === (-198))'`)})(((await counterC.peek()) === (-198)))};
}

```

