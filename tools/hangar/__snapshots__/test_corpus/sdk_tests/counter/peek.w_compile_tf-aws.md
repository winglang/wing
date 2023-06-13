# [peek.w](../../../../../../examples/tests/sdk_tests/counter/peek.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ c }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c.peek()) === 0)'`)})(((await c.peek()) === 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c.peek()) === 0)'`)})(((await c.peek()) === 0))};
      (await c.inc());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c.peek()) === 1)'`)})(((await c.peek()) === 1))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ c }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const key = "my-key";
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c.peek(key)) === 0)'`)})(((await c.peek(key)) === 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c.peek(key)) === 0)'`)})(((await c.peek(key)) === 0))};
      (await c.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c.peek(key)) === 1)'`)})(((await c.peek(key)) === 1))};
    }
  }
  return $Closure2;
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
      "value": "[[\"root/Default/Default/test:peek\",\"${aws_lambda_function.root_testpeek_Handler_C724F76F.arn}\"],[\"root/Default/Default/test:key peek\",\"${aws_lambda_function.root_testkeypeek_Handler_61C5F573.arn}\"]]"
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
      "root_testkeypeek_Handler_IamRole_B6229A6A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key peek/Handler/IamRole",
            "uniqueId": "root_testkeypeek_Handler_IamRole_B6229A6A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
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
      "root_testkeypeek_Handler_IamRolePolicy_C594AA2A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key peek/Handler/IamRolePolicy",
            "uniqueId": "root_testkeypeek_Handler_IamRolePolicy_C594AA2A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testkeypeek_Handler_IamRole_B6229A6A.name}"
      },
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
      "root_testkeypeek_Handler_IamRolePolicyAttachment_81B04175": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key peek/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testkeypeek_Handler_IamRolePolicyAttachment_81B04175"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testkeypeek_Handler_IamRole_B6229A6A.name}"
      },
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
      "root_testkeypeek_Handler_61C5F573": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key peek/Handler/Default",
            "uniqueId": "root_testkeypeek_Handler_61C5F573"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "Handler-c8197eb3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8197eb3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testkeypeek_Handler_IamRole_B6229A6A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testkeypeek_Handler_S3Object_DC079CB6.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
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
            "WING_FUNCTION_NAME": "Handler-c846323d",
            "WING_TARGET": "tf-aws"
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
      "root_testkeypeek_Handler_S3Object_DC079CB6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key peek/Handler/S3Object",
            "uniqueId": "root_testkeypeek_Handler_S3Object_DC079CB6"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            c: ${context._lift(c, ["inc", "peek"])},
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
          $Closure1._registerBindObject(c, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(c, host, ["inc", "peek"]);
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            c: ${context._lift(c, ["inc", "peek"])},
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
          $Closure2._registerBindObject(c, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(c, host, ["inc", "peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:peek",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:key peek",new $Closure2(this,"$Closure2"));
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

