# [inc.w](../../../../../../examples/tests/sdk_tests/counter/inc.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ counter }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await counter.peek()) === 0)'`)})(((await counter.peek()) === 0))};
      const r0 = (await counter.inc());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(r0 === 0)'`)})((r0 === 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await counter.peek()) === 1)'`)})(((await counter.peek()) === 1))};
      const r1 = (await counter.inc());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(r1 === 1)'`)})((r1 === 1))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await counter.peek()) === 2)'`)})(((await counter.peek()) === 2))};
      const r2 = (await counter.inc(10));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(r2 === 2)'`)})((r2 === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await counter.peek()) === 12)'`)})(((await counter.peek()) === 12))};
      const r3 = (await counter.inc());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(r3 === 12)'`)})((r3 === 12))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ counter }) {
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
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await counter.peek(key)) === 0)'`)})(((await counter.peek(key)) === 0))};
      const r0 = (await counter.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(r0 === 0)'`)})((r0 === 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await counter.peek(key)) === 1)'`)})(((await counter.peek(key)) === 1))};
      const r1 = (await counter.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(r1 === 1)'`)})((r1 === 1))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await counter.peek(key)) === 2)'`)})(((await counter.peek(key)) === 2))};
      const r2 = (await counter.inc(10,key));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(r2 === 2)'`)})((r2 === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await counter.peek(key)) === 12)'`)})(((await counter.peek(key)) === 12))};
      const r3 = (await counter.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(r3 === 12)'`)})((r3 === 12))};
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
      "value": "[[\"root/Default/Default/test:inc\",\"${aws_lambda_function.root_testinc_Handler_A10D3F88.arn}\"],[\"root/Default/Default/test:key inc\",\"${aws_lambda_function.root_testkeyinc_Handler_81AACB2B.arn}\"]]"
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
      "root_testinc_Handler_IamRole_FADF671C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inc/Handler/IamRole",
            "uniqueId": "root_testinc_Handler_IamRole_FADF671C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testkeyinc_Handler_IamRole_3767E961": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key inc/Handler/IamRole",
            "uniqueId": "root_testkeyinc_Handler_IamRole_3767E961"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinc_Handler_IamRolePolicy_C6ED1330": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inc/Handler/IamRolePolicy",
            "uniqueId": "root_testinc_Handler_IamRolePolicy_C6ED1330"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testinc_Handler_IamRole_FADF671C.name}"
      },
      "root_testkeyinc_Handler_IamRolePolicy_ABAD8DBA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key inc/Handler/IamRolePolicy",
            "uniqueId": "root_testkeyinc_Handler_IamRolePolicy_ABAD8DBA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testkeyinc_Handler_IamRole_3767E961.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinc_Handler_IamRolePolicyAttachment_F0CAB67D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inc/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinc_Handler_IamRolePolicyAttachment_F0CAB67D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinc_Handler_IamRole_FADF671C.name}"
      },
      "root_testkeyinc_Handler_IamRolePolicyAttachment_F25A8A4D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key inc/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testkeyinc_Handler_IamRolePolicyAttachment_F25A8A4D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testkeyinc_Handler_IamRole_3767E961.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinc_Handler_A10D3F88": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inc/Handler/Default",
            "uniqueId": "root_testinc_Handler_A10D3F88"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "Handler-c8ddbb5a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8ddbb5a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinc_Handler_IamRole_FADF671C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinc_Handler_S3Object_3A9256BD.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testkeyinc_Handler_81AACB2B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key inc/Handler/Default",
            "uniqueId": "root_testkeyinc_Handler_81AACB2B"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "Handler-c87f92b5",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c87f92b5",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testkeyinc_Handler_IamRole_3767E961.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testkeyinc_Handler_S3Object_38372573.key}",
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
      "root_testinc_Handler_S3Object_3A9256BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inc/Handler/S3Object",
            "uniqueId": "root_testinc_Handler_S3Object_3A9256BD"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testkeyinc_Handler_S3Object_38372573": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key inc/Handler/S3Object",
            "uniqueId": "root_testkeyinc_Handler_S3Object_38372573"
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
            counter: ${context._lift(counter, ["inc", "peek"])},
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
          $Closure1._registerBindObject(counter, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(counter, host, ["inc", "peek"]);
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
            counter: ${context._lift(counter, ["inc", "peek"])},
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
          $Closure2._registerBindObject(counter, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(counter, host, ["inc", "peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter",{ initial: 0 });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inc",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:key inc",new $Closure2(this,"$Closure2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "inc", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

