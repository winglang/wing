# [memoization.w](../../../../examples/tests/valid/memoization.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ c }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(event)  {
      return `${(await c.inc())}`;
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ m, js }) {
  class $Inflight2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await m.invoke("foo")) === "0")'`)})(((await m.invoke("foo")) === "0"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await m.invoke("bar")) === "1")'`)})(((await m.invoke("bar")) === "1"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await m.invoke("foo")) === "0")'`)})(((await m.invoke("foo")) === "0"))};
      (await js.sleep(10000));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await m.invoke("foo")) === "2")'`)})(((await m.invoke("foo")) === "2"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await m.invoke("bar")) === "3")'`)})(((await m.invoke("bar")) === "3"))};
    }
  }
  return $Inflight2;
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
      "value": "[[\"root/Default/Default/test:memoization\",\"${aws_lambda_function.root_testmemoization_Handler_70F635C5.arn}\"]]"
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
      },
      "root_memoization_DefaultMemoization_973A56D2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memoization/DefaultMemoization",
            "uniqueId": "root_memoization_DefaultMemoization_973A56D2"
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
        "name": "wing-memoization-memoization-c878ab93"
      }
    },
    "aws_iam_role": {
      "root_memoization_IamRole_596E16FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memoization/IamRole",
            "uniqueId": "root_memoization_IamRole_596E16FC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testmemoization_Handler_IamRole_8747564D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:memoization/Handler/IamRole",
            "uniqueId": "root_testmemoization_Handler_IamRole_8747564D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_memoization_IamRolePolicy_50B1BCC9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memoization/IamRolePolicy",
            "uniqueId": "root_memoization_IamRolePolicy_50B1BCC9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\",\"dynamodb:PutItem\",\"dynamodb:UpdateItem\",\"dynamodb:DeleteItem\"],\"Resource\":[\"${aws_dynamodb_table.root_memoization_DefaultMemoization_973A56D2.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_memoization_IamRole_596E16FC.name}"
      },
      "root_testmemoization_Handler_IamRolePolicy_35EBDF75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:memoization/Handler/IamRolePolicy",
            "uniqueId": "root_testmemoization_Handler_IamRolePolicy_35EBDF75"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.root_memoization_95C8BF4E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testmemoization_Handler_IamRole_8747564D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_memoization_IamRolePolicyAttachment_69A8F0F4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memoization/IamRolePolicyAttachment",
            "uniqueId": "root_memoization_IamRolePolicyAttachment_69A8F0F4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_memoization_IamRole_596E16FC.name}"
      },
      "root_testmemoization_Handler_IamRolePolicyAttachment_37EE4422": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:memoization/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testmemoization_Handler_IamRolePolicyAttachment_37EE4422"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testmemoization_Handler_IamRole_8747564D.name}"
      }
    },
    "aws_lambda_function": {
      "root_memoization_95C8BF4E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memoization/Default",
            "uniqueId": "root_memoization_95C8BF4E"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "MEMOIZATION_TABLE": "${aws_dynamodb_table.root_memoization_DefaultMemoization_973A56D2.name}",
            "WING_FUNCTION_NAME": "memoization-c878ab93"
          }
        },
        "function_name": "memoization-c878ab93",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_memoization_IamRole_596E16FC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_memoization_S3Object_0FA71686.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testmemoization_Handler_70F635C5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:memoization/Handler/Default",
            "uniqueId": "root_testmemoization_Handler_70F635C5"
          }
        },
        "environment": {
          "variables": {
            "FUNCTION_NAME_46f3a027": "${aws_lambda_function.root_memoization_95C8BF4E.arn}",
            "WING_FUNCTION_NAME": "Handler-c8ce3350"
          }
        },
        "function_name": "Handler-c8ce3350",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testmemoization_Handler_IamRole_8747564D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testmemoization_Handler_S3Object_42E8BB75.key}",
        "timeout": 60,
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
      "root_memoization_S3Object_0FA71686": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memoization/S3Object",
            "uniqueId": "root_memoization_S3Object_0FA71686"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testmemoization_Handler_S3Object_42E8BB75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:memoization/Handler/S3Object",
            "uniqueId": "root_testmemoization_Handler_S3Object_42E8BB75"
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
    class TestHelper extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("sleep");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/TestHelper.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const TestHelperClient = ${TestHelper._toInflightType(this).text};
            const client = new TestHelperClient({
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
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js";
        const c_client = context._lift(c);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            c: ${c_client},
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
          $Inflight1._registerBindObject(c, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(c, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight2.inflight.js";
        const m_client = context._lift(m);
        const js_client = context._lift(js);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            m: ${m_client},
            js: ${js_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight2Client = ${$Inflight2._toInflightType(this).text};
            const client = new $Inflight2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight2._registerBindObject(js, host, []);
          $Inflight2._registerBindObject(m, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight2._registerBindObject(js, host, ["sleep"]);
          $Inflight2._registerBindObject(m, host, ["invoke"]);
        }
        super._registerBind(host, ops);
      }
    }
    const c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const js = new TestHelper(this,"TestHelper");
    const m = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"memoization",new $Inflight1(this,"$Inflight1"),{
    "memoization": $stdlib.std.Duration.fromSeconds(10),}
    );
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:memoization",new $Inflight2(this,"$Inflight2"),{
    "timeout": $stdlib.std.Duration.fromSeconds(60),}
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "memoization", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

