# [initial.w](../../../../../../examples/tests/sdk_tests/counter/initial.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ counterA }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await counterA.peek()) === 0)'`)})(((await counterA.peek()) === 0))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ counterB }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await counterB.peek()) === 500)'`)})(((await counterB.peek()) === 500))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ counterC }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await counterC.peek()) === (-198))'`)})(((await counterC.peek()) === (-198)))};
    }
  }
  return $Closure3;
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
      "value": "[[\"root/Default/Default/test:initial:default\",\"${aws_lambda_function.root_testinitialdefault_Handler_6C031FD0.arn}\"],[\"root/Default/Default/test:initial:positive-value\",\"${aws_lambda_function.root_testinitialpositivevalue_Handler_11CA4DA1.arn}\"],[\"root/Default/Default/test:initial:negative-value\",\"${aws_lambda_function.root_testinitialnegativevalue_Handler_108DD32C.arn}\"]]"
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
      "root_testinitialdefault_Handler_IamRole_CAD17AD2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/Handler/IamRole",
            "uniqueId": "root_testinitialdefault_Handler_IamRole_CAD17AD2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinitialnegativevalue_Handler_IamRole_B1DCC657": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/Handler/IamRole",
            "uniqueId": "root_testinitialnegativevalue_Handler_IamRole_B1DCC657"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinitialpositivevalue_Handler_IamRole_F254394C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/Handler/IamRole",
            "uniqueId": "root_testinitialpositivevalue_Handler_IamRole_F254394C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinitialdefault_Handler_IamRolePolicy_3A417076": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/Handler/IamRolePolicy",
            "uniqueId": "root_testinitialdefault_Handler_IamRolePolicy_3A417076"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_counterA_FE83A0AC.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testinitialdefault_Handler_IamRole_CAD17AD2.name}"
      },
      "root_testinitialnegativevalue_Handler_IamRolePolicy_8EBB5CE7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/Handler/IamRolePolicy",
            "uniqueId": "root_testinitialnegativevalue_Handler_IamRolePolicy_8EBB5CE7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_counterC_5BAA0CEC.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testinitialnegativevalue_Handler_IamRole_B1DCC657.name}"
      },
      "root_testinitialpositivevalue_Handler_IamRolePolicy_B59A972F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/Handler/IamRolePolicy",
            "uniqueId": "root_testinitialpositivevalue_Handler_IamRolePolicy_B59A972F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_counterB_3EAEEDE1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testinitialpositivevalue_Handler_IamRole_F254394C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinitialdefault_Handler_IamRolePolicyAttachment_6E5E7FDD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinitialdefault_Handler_IamRolePolicyAttachment_6E5E7FDD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinitialdefault_Handler_IamRole_CAD17AD2.name}"
      },
      "root_testinitialnegativevalue_Handler_IamRolePolicyAttachment_6E9FD7AE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinitialnegativevalue_Handler_IamRolePolicyAttachment_6E9FD7AE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinitialnegativevalue_Handler_IamRole_B1DCC657.name}"
      },
      "root_testinitialpositivevalue_Handler_IamRolePolicyAttachment_532DD068": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinitialpositivevalue_Handler_IamRolePolicyAttachment_532DD068"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinitialpositivevalue_Handler_IamRole_F254394C.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinitialdefault_Handler_6C031FD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/Handler/Default",
            "uniqueId": "root_testinitialdefault_Handler_6C031FD0"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_220d28dd": "${aws_dynamodb_table.root_counterA_FE83A0AC.name}",
            "WING_FUNCTION_NAME": "Handler-c88a038b"
          }
        },
        "function_name": "Handler-c88a038b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinitialdefault_Handler_IamRole_CAD17AD2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinitialdefault_Handler_S3Object_A209CD73.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinitialnegativevalue_Handler_108DD32C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/Handler/Default",
            "uniqueId": "root_testinitialnegativevalue_Handler_108DD32C"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_4795370d": "${aws_dynamodb_table.root_counterC_5BAA0CEC.name}",
            "WING_FUNCTION_NAME": "Handler-c88178b6"
          }
        },
        "function_name": "Handler-c88178b6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinitialnegativevalue_Handler_IamRole_B1DCC657.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinitialnegativevalue_Handler_S3Object_8F761E6E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinitialpositivevalue_Handler_11CA4DA1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/Handler/Default",
            "uniqueId": "root_testinitialpositivevalue_Handler_11CA4DA1"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_96df6c3c": "${aws_dynamodb_table.root_counterB_3EAEEDE1.name}",
            "WING_FUNCTION_NAME": "Handler-c835d39a"
          }
        },
        "function_name": "Handler-c835d39a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinitialpositivevalue_Handler_IamRole_F254394C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinitialpositivevalue_Handler_S3Object_B0633AA8.key}",
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
      "root_testinitialdefault_Handler_S3Object_A209CD73": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/Handler/S3Object",
            "uniqueId": "root_testinitialdefault_Handler_S3Object_A209CD73"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinitialnegativevalue_Handler_S3Object_8F761E6E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/Handler/S3Object",
            "uniqueId": "root_testinitialnegativevalue_Handler_S3Object_8F761E6E"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinitialpositivevalue_Handler_S3Object_B0633AA8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/Handler/S3Object",
            "uniqueId": "root_testinitialpositivevalue_Handler_S3Object_B0633AA8"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const counterA_client = context._lift(counterA);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            counterA: ${counterA_client},
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
        if (ops.includes("$inflight_init")) {
          $Closure1._registerBindObject(counterA, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(counterA, host, ["peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const counterB_client = context._lift(counterB);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            counterB: ${counterB_client},
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
        if (ops.includes("$inflight_init")) {
          $Closure2._registerBindObject(counterB, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(counterB, host, ["peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        const counterC_client = context._lift(counterC);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            counterC: ${counterC_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this).text};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Closure3._registerBindObject(counterC, host, []);
        }
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(counterC, host, ["peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const counterA = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"counterA");
    const counterB = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"counterB",{ initial: 500 });
    const counterC = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"counterC",{ initial: (-198) });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:initial:default",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:initial:positive-value",new $Closure2(this,"$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:initial:negative-value",new $Closure3(this,"$Closure3"));
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

