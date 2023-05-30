# [dec.w](../../../../examples/tests/valid/dec.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ counter }) {
  class  $Inflight1 {
    constructor({  }) {
    }
    async handle()  {
      {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((typeof counter.peek === "function" ? await counter.peek() : await counter.peek.handle()) === 1)'`)})(((typeof counter.peek === "function" ? await counter.peek() : await counter.peek.handle()) === 1))};
        const dec1 = (typeof counter.dec === "function" ? await counter.dec() : await counter.dec.handle());
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((typeof counter.peek === "function" ? await counter.peek() : await counter.peek.handle()) === 0)'`)})(((typeof counter.peek === "function" ? await counter.peek() : await counter.peek.handle()) === 0))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(dec1 === 1)'`)})((dec1 === 1))};
        const dec2 = (typeof counter.dec === "function" ? await counter.dec(2) : await counter.dec.handle(2));
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((typeof counter.peek === "function" ? await counter.peek() : await counter.peek.handle()) === (-2))'`)})(((typeof counter.peek === "function" ? await counter.peek() : await counter.peek.handle()) === (-2)))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(dec2 === 0)'`)})((dec2 === 0))};
      }
    }
  }
  return $Inflight1;
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
      "value": "[[\"root/Default/Default/test:dec\",\"${aws_lambda_function.root_testdec_Handler_AE114D79.arn}\"]]"
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
      "root_testdec_Handler_IamRole_3E911C09": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/IamRole",
            "uniqueId": "root_testdec_Handler_IamRole_3E911C09"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testdec_Handler_IamRolePolicy_26A5726A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/IamRolePolicy",
            "uniqueId": "root_testdec_Handler_IamRolePolicy_26A5726A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testdec_Handler_IamRole_3E911C09.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testdec_Handler_IamRolePolicyAttachment_7CF9599B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testdec_Handler_IamRolePolicyAttachment_7CF9599B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testdec_Handler_IamRole_3E911C09.name}"
      }
    },
    "aws_lambda_function": {
      "root_testdec_Handler_AE114D79": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/Default",
            "uniqueId": "root_testdec_Handler_AE114D79"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "Handler-c8daa879"
          }
        },
        "function_name": "Handler-c8daa879",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testdec_Handler_IamRole_3E911C09.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testdec_Handler_S3Object_E6EDF071.key}",
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
      "root_testdec_Handler_S3Object_E6EDF071": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/S3Object",
            "uniqueId": "root_testdec_Handler_S3Object_E6EDF071"
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
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
        const counter_client = context._lift(counter);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            counter: ${counter_client},
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
          $Inflight1._registerBindObject(counter, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(counter, host, ["dec", "peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter",{ initial: 1 });
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:dec",new $Inflight1(this,"$Inflight1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "dec", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

